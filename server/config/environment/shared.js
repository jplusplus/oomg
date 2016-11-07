'use strict';

exports = module.exports = {
  // List of user roles
  userRoles: ['guest', 'user', 'admin'],
  gameConfig: {
    answersByQuestion: 3,
    questionsByGame: 8,
    timeLimit: 15000,
    nextDelay: 1500,
    answerTypes: ['comparison_text', 'numerical_form', 'written_form']
  },
  formConfig: {
    genders: [ 'Female', 'Male', 'Other'],
    ages: [ 'Under 20', '20-30', '31-40', '41-50', '51-60', 'Over 60'],
    occupations: [ 'Accountant', 'Computer developer',  'Journalist', 'Public sector professional',  'Other']
  }
};
