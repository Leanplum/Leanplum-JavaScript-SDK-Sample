'use strict';

import angular from 'angular';
// import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';
import leanplum from 'leanplum';

import 'angular-socket-io';

import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
// eslint-disable-next-line no-unused-vars
import ngValidationMatch from 'angular-validation-match';

import {
  routeConfig
} from './app.config';

import _Auth from '../components/auth/auth.module';
import account from './account';
import admin from './admin';
import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import main from './main/main.component';
import constants from './app.constants';
import util from '../components/util/util.module';
import socket from '../components/socket/socket.service';

import './app.scss';

leanplum.setAppIdForDevelopmentMode('app_BWTRIgOs0OoevDfSsBtabRiGffu5wOFU3mkxIxA7NBs', 'dev_Bx8i3Bbz1OJBTBAu63NIifr3UwWqUBU5OhHtywo58RY');
leanplum.start();
leanplum.track('start');

angular.module('leanplumJavaScriptSdkSampleApp', [ngCookies, ngResource, ngSanitize,
  'btford.socket-io', uiRouter, uiBootstrap, _Auth, account, admin, 'validation.match', navbar,
  footer, main, constants, socket, util
])
  .config(routeConfig)
  .run(function($rootScope, $location, Auth) {
    'ngInject';
    // Redirect to login if route requires auth and you're not logged in

    $rootScope.$on('$stateChangeStart', function(event, next) {
      Auth.isLoggedIn(function(loggedIn) {
        if(next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['leanplumJavaScriptSdkSampleApp'], {
      strictDi: true
    });
  });
