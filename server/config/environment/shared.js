'use strict';

exports = module.exports = {
  gameConfig: {
    answersByQuestion: 3,
    questionsByGame: 8,
    timeLimit: 15000,
    nextDelay: 1500,
    answerTypes: ['comparison_text', 'numerical_form', 'written_form']
  },
  formConfig: {
    ages: [ 'Under 20', '20-30', '31-40', '41-50', '51-60', 'Over 60'],
    countries: [ 'Austria', 'Belgium', 'Czech Republic', 'France', 'Germany',
                 'Greece', 'Hungary', 'Italy', 'Netherlands', 'Poland',
                 'Portugal', 'Romania', 'Spain', 'Sweden', 'United Kingdom',
                 'Other EU', 'Other Non-EU' ],
    occupations: [ 'Armed forces', 'Private sector professional',
                   'Civil servant', 'Computer scientist/developer',
                   'Journalist', 'Lawyer', 'Manual worker, craftsman/woman',
                   'Medical doctor, dentist, optician', 'Public relations',
                   'Teacher', 'University professor', 'Student',
                   'No occupation', 'Other' ]
  }
};
