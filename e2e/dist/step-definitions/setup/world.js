"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScenarioWorld = void 0;

var _playwright = _interopRequireDefault(require("playwright"));

var _parseEnv = require("../../env/parseEnv");

var _cucumber = require("@cucumber/cucumber");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _callSuper(_this, derived, args) {
  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    } catch (e) {
      return false;
    }
  }

  derived = _getPrototypeOf(derived);
  return _possibleConstructorReturn(_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf(_this).constructor) : derived.apply(_this, args));
}

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ScenarioWorld = exports.ScenarioWorld = /*#__PURE__*/function (_World) {
  // this is inheritance - a fundamental concept of OOP; 
  //SW inherits all the properties and methods from the 'World' class but also adds its own properties or methods or modifies existings ones
  function ScenarioWorld(options) {
    var _this2;

    _classCallCheck(this, ScenarioWorld);

    _this2 = _callSuper(this, ScenarioWorld, [options]);

    _defineProperty(_this2, "screen", void 0);

    _defineProperty(_this2, "newBrowser", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var automationBrowsers, automationBrowser, browserType, browser;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            automationBrowsers = ['chromium', 'firefox', 'webkit']; // Using typeof with indexed access to get the type of an element in the array

            // 'chromium' | 'firefox' | 'webkit'
            // The use of typeof automationBrowsers[number] ensures that the type of automationBrowser can only be one of the three valid browser strings. 
            // This type safety is crucial because it restricts automationBrowser to valid inputs, 
            // which aligns with what Playwright expects when we later use it to index playwright[automationBrowser] to get a specific BrowserType
            automationBrowser = (0, _parseEnv.env)('UI_AUTOMATION_BROWSER');
            browserType = _playwright.default[automationBrowser];
            _context.next = 5;
            return browserType.launch({
              headless: process.env.HEADLESS !== 'false',
              args: ['--disable-web-security', '--disable-features=IsolateOrigins, site-per-process']
            });

          case 5:
            browser = _context.sent;
            return _context.abrupt("return", browser);

          case 7:
          case "end":
            return _context.stop();
        }
      }, _callee);
    })));

    return _this2;
  }

  _inherits(ScenarioWorld, _World);

  return _createClass(ScenarioWorld, [{
    key: "init",
    value: function () {
      var _init = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(contextOptions) {
        var _this$screen, _this$screen2, _this$screen3;

        var browser, context, page;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return (_this$screen = this.screen) === null || _this$screen === void 0 || (_this$screen = _this$screen.page) === null || _this$screen === void 0 ? void 0 : _this$screen.close();

            case 2:
              _context2.next = 4;
              return (_this$screen2 = this.screen) === null || _this$screen2 === void 0 || (_this$screen2 = _this$screen2.context) === null || _this$screen2 === void 0 ? void 0 : _this$screen2.close();

            case 4:
              _context2.next = 6;
              return (_this$screen3 = this.screen) === null || _this$screen3 === void 0 || (_this$screen3 = _this$screen3.browser) === null || _this$screen3 === void 0 ? void 0 : _this$screen3.close();

            case 6:
              _context2.next = 8;
              return this.newBrowser();

            case 8:
              browser = _context2.sent;
              _context2.next = 11;
              return browser.newContext(contextOptions);

            case 11:
              context = _context2.sent;
              _context2.next = 14;
              return context.newPage();

            case 14:
              page = _context2.sent;
              this.screen = {
                browser: browser,
                context: context,
                page: page
              };
              return _context2.abrupt("return", this.screen);

            case 17:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));

      function init(_x) {
        return _init.apply(this, arguments);
      }

      return init;
    }()
  }]);
}(_cucumber.World);

(0, _cucumber.setWorldConstructor)(ScenarioWorld);