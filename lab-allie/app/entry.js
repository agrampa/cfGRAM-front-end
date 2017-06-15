'use strict';

require('./scss/base/main.scss');

const path = require('path');
const camelcase = require('camelcase');
const pascalcase = require('pascalcase');
const angular = require('angular');
const ngTouch = require('angular-touch');
const ngAnimate = require('angular-animate');

require('@uirouter/angularjs');
require('angular-ui-bootstrap');
require('ng-file-upload');

const routesApp = angular.module('routesApp', ['ui.router', 'ngFileUpload', 'ngTouch', 'ngAnimate', 'ui.bootstrap']);

let context = require.context('./config/', true, /\.js$/);
context.keys().forEach(key => routesApp.config(context(key)));

context = require.context('./view/', true, /\.js$/);
context.keys().forEach(key => {
  let name = pascalcase(path.basename(key, '.js'));
  routesApp.controller(name, context(key));
});

context = require.context('./service/', true, /\.js$/);
context.keys().forEach(key => {
  let name = camelcase(path.basename(key, '.js'));
  let module = context(key);
  routesApp.service(name, module);
});

context = require.context('./component/', true, /\.js$/);
context.keys().forEach(key => {
  let name = camelcase(path.basename(key, '.js'));
  let module = context(key);
  routesApp.component(name, module);
});

context = require.context('./filter/', true, /\.js$/);
context.keys().forEach(key => {
  let name = camelcase(path.basename(key, '.js'));
  let module = context(key);
  routesApp.filter(name, module);
});