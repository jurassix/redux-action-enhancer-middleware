'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isSimpleAction = function isSimpleAction(action) {
  if (typeof action === 'function') {
    return false;
  }
  if (action === null || action === undefined || (typeof action === 'undefined' ? 'undefined' : _typeof(action)) !== 'object') {
    return false;
  }
  return true;
};

var actionEnhancerMiddleware = function actionEnhancerMiddleware(options) {
  var filter = options.filter;
  var enhancer = options.enhancer;

  (0, _invariant2.default)(typeof filter === 'function', 'actionEnhancerMiddleware filter option must be a function');
  (0, _invariant2.default)(typeof enhancer === 'function' || typeof enhancer === 'undefined', 'actionEnhancerMiddleware enhancer option must be a function');

  if (typeof filter !== 'function') filter = function filter() {
    return true;
  };

  return function (store) {
    return function (next) {
      return function (action) {
        if (isSimpleAction(action) && filter(action)) {
          var dispatch = store.dispatch;
          var getState = store.getState;

          return next(enhancer(dispatch, getState, action));
        }
        return next(action);
      };
    };
  };
};
exports.default = actionEnhancerMiddleware;