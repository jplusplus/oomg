'use strict';

import angular     from 'angular';
import ngAnimate   from 'angular-animate';
import ngCookies   from 'angular-cookies';
import ngResource  from 'angular-resource';
import ngSanitize  from 'angular-sanitize';
import uiRouter    from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';

import { routeConfig } from './app.config';

import main      from './main/main.component';
import constants from './app.constants';
import util      from '../components/util/util.module';

import './app.scss';

angular.module('oomg', [
  ngCookies, ngResource, ngSanitize, ngAnimate, uiRouter, uiBootstrap,
  main, constants
])
.config(routeConfig);

angular.element(document).ready(() => {
  angular.bootstrap(document, ['oomg'], { strictDi: true });
});
