"use strict";

var _cucumber = require("@cucumber/cucumber");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

(0, _cucumber.Given)(/^I am on the "([^"]*)" page$/,
/*#__PURE__*/
//we added a regex here that takes a string inside a set of double quotes "([^"]*)"
function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(pageId) {
    var page;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          //we declare that the function takes one parameter here, the type of the parameter is string
          page = this.screen.page; // In Cucumber step definitions, 'this' is bound to the current instance fo the 'World' class

          console.log("I am on the ".concat(pageId, " page")); // The console logs a message declaring the name of the page that is passed as a parameter in the home-page.feature

          _context.next = 4;
          return page.goto("http://localhost:3000/");

        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee, this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());