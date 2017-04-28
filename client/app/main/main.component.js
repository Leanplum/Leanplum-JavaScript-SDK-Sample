import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';
import leanplum from 'leanplum';

export class MainController {
  $http;
  socket;
  awesomeThings = [];
  newThing = '';

  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;
    this.settings = {
      isWebPushSupported: false,
      isWebPushSubscribed: false,
    };

    this.settings.isWebPushSupported = leanplum.isWebPushSupported();
    if (this.settings.isWebPushSupported) {
      leanplum.isWebPushSubscribed().then(subscriptionStatus => {
        this.settings.isWebPushSubscribed = subscriptionStatus;
        $scope.$apply();
      });
    }

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
  }

  $onInit() {
    this.$http.get('/api/things')
      .then(response => {
        this.awesomeThings = response.data;
        this.socket.syncUpdates('thing', this.awesomeThings);
      });
  }

  addThing() {
    if (this.newThing) {
      leanplum.track('add_thing', undefined, {
        thingName: this.newThing
      });
      this.$http.post('/api/things', {
        name: this.newThing
      });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    leanplum.track('delete_thing', undefined, {
      thingName: thing.name
    });
    this.$http.delete(`/api/things/${thing._id}`);
  }

  toggleWebPush() {
    console.log('WebPush is ', this.settings.isWebPushSubscribed);
    if (!this.settings.isWebPushSubscribed) {
      console.log('Webpush unsubscribing user...');
      leanplum.unregisterFromWebPush();
    } else {
      console.log('Webpush subscribing user...');
      leanplum.registerForWebPush('/sw.min.js', subscriptionStatus => {
        console.log('Subscription status: %s', subscriptionStatus);
      });
    }
  }
}

export default angular.module('leanplumJavaScriptSdkSampleApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
