"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.env = void 0;

//the purpose of this function we want to say if it passes through evn then we expect an environment varible to be set, otherwise stop the test - if no browsers
//are defined, we can't run the tests or the browser doesn't exist
var env = exports.env = function env(key) {
  var value = process.env[key];

  if (!value) {
    throw Error("No environment variable found for ".concat(key));
  }

  return value;
};