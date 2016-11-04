import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {
  constructor(formConfig, gameConfig, $http, $state, $interval) {
    'ngInject';
    // Bind methods to this instance
    ['ready', 'prepare', 'doPick', 'isCurrent', 'play', 'next', 'startTimer',
     'stopTimer', 'checkTimer', 'answer'].map(n=> this.bind(this, n));
    // Merge form config with the current scope
    angular.extend(this, formConfig);
    // Services available in this class and initial question index
    angular.extend(this, { $http, $state, $interval, gameConfig });
    // Prepare the form
    this.prepare();
  }
  bind(context, method) {
    context[method] = context[method].bind(context);
  }
  ready() {
    return this.questionsPromise && this.questionsPromise.$$state.status === 1;
  }
  prepare() {
    // Start downloading the question
    this.questionsPromise = this.$http.get('assets/questions.json')
    // Save the result as a attribute
    this.questionsPromise.then(res => {
      this.questions = res.data;
    });
  }
  play() {
    // Start a new question pick!
    this.pick = this.doPick(this.questions);
    // Start with question 0
    this.currentQuestion = 0;
    // Start the timer
    this.startTimer();
    // Move to the new state
    this.$state.go('main.question');
  }
  startTimer() {
    // Save the timestamp
    this.lastCheckpoint = Date.now();
    // The previous answer was correct
    if(this.previous && this.previous.answerIsCorrect) {
      // Add some bonus time
      this.lastCheckpoint += this.remainingTime;
    }
    // Clear existing timer
    this.stopTimer();
    // Empty interval to force
    this.timer = this.$interval(this.checkTimer, 500);
  }
  stopTimer() {
    // Clear existing timer
    this.$interval.cancel(this.timer);
  }
  checkTimer() {
    // THE END OF TIME !!
    if(this.remainingTime === 0) {
      // Answer "nothing" to the question
      this.answer(this.current, null);
    }
  }
  get elapsedTime() {
    return this.lastCheckpoint ? Date.now() - this.lastCheckpoint : this.gameConfig.timeLimit;
  }
  get remainingTime() {
    return Math.max(this.gameConfig.timeLimit - this.elapsedTime, 0);
  }
  get locked() {
    return this.current.answerIsCorrect !== undefined;
  }
  get correctAnswers() {
    return _.filter(this.pick, { answerIsCorrect: true });
  }
  get points() {
    return this.correctAnswers.reduce( (total, question)=> {
      return total + question.remainingTime
    }, 0);
  }
  get current() {
    return this.pick ? this.pick[this.currentQuestion] : null;
  }
  isCurrent(question, index) {
    return index === this.currentQuestion;
  }
  answer(question, answerIsCorrect) {
    // Stop the timer
    this.stopTimer();
    // Save the status of the answer and the elasped time
    angular.extend(question, { answerIsCorrect, remainingTime: this.remainingTime });
    // Next question in after a short delay
    this.$interval(this.next, this.gameConfig.nextDelay, /* once */ 1);
  }
  next() {
    // Game is not over yet!
    if( this.currentQuestion + 1 < this.gameConfig.questionsByGame) {
      // Start with question 0
      this.currentQuestion++;
      // Start the timer
      this.startTimer();
    } else {
      // This is the end
      this.$state.go('main.result');
    }
  }
  doPick(questions) {
    // Answers limut by question
    let limit = this.gameConfig.answersByQuestion;
    // Only 8 "prepared" questions
    return this.shuffle(questions).slice(0, this.gameConfig.questionsByGame).map( question=> {
      // Avoid modifing the original object
      question = angular.copy(question);
      // Only 3 answers from a random point (the one in the middle is always right)
      question.answers = question.answers.slice(~~(Math.random() * limit));
      question.answers = question.answers.slice(0, limit);
      question.answers = this.shuffle(question.answers);
      // Pick an answer type for this question
      question.type = this.gameConfig.answerTypes[ ~~(Math.random() * 2) ];
      // Add the images dir to there path
      question.image = `assets/images/questions/${question.image}`;
      // Create an image2x field for retina screen
      question.image2x = question.image.replace(/(\.\w+)$/i, '@2x$1')
      // Return the prepared question
      return question;
    });
  }
  shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  }
}

export default angular.module('oomg.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.pug'),
    controller: MainController,
    controllerAs: '$ctrl'
  })
  .name;
