'use strict';

import angular from 'angular';

export default angular.module('oomg.constants', [])
  .constant('appConfig',  require('../../server/config/environment/shared'))
  .constant('gameConfig', {
    answersByQuestion: 3,
    questionsByGame: 8,
    timeLimit: 10000,
    nextDelay: 1500,
    answerTypes: ['comparison_text', 'numerical_form', 'written_form']
  })
  .constant('formConfig', {
    genders: [ 'Female', 'Male', 'Other'],
    ages: [ 'Under 20', '20-30', '31-40', '41-50', '51-60', 'Over 60'],
    occupations: [ 'Accountant', 'Computer developer',  'Journalist', 'Public sector professional',  'Other']
  })
  .name;
