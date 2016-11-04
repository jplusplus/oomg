'use strict';

export default function routes($stateProvider) {
  'ngInject';
  // Main state with several children
  $stateProvider.state('main', {
    url: '/',
    template: '<main></main>'
  });
  // Declare children states
  $stateProvider.state('main.form', {});
  $stateProvider.state('main.question', {});
  $stateProvider.state('main.result', {});
}
