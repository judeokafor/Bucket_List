"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _errorHandler = _interopRequireDefault(require("../lib/helpers/errorHandler"));

var _user = _interopRequireDefault(require("../lib/validations/user"));

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var userController =
/*#__PURE__*/
function () {
  function userController() {
    _classCallCheck(this, userController);
  }

  _createClass(userController, null, [{
    key: "signUp",
    value: function () {
      var _signUp = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var result, email, existUser, user;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                result = _joi["default"].validate(req.body, _user["default"].userSchema, {
                  convert: false
                });

                if (!(result.error === null)) {
                  _context.next = 13;
                  break;
                }

                email = req.body.email;
                _context.next = 6;
                return _User["default"].findOne({
                  email: email
                });

              case 6:
                existUser = _context.sent;

                if (existUser) {
                  _context.next = 12;
                  break;
                }

                user = new _User["default"](req.body);
                _context.next = 11;
                return user.save();

              case 11:
                return _context.abrupt("return", res.status(201).json({
                  success: true
                }));

              case 12:
                return _context.abrupt("return", res.status(400).json({
                  success: false,
                  message: 'Email Already Exist'
                }));

              case 13:
                return _context.abrupt("return", _errorHandler["default"].validationError(res, result));

              case 16:
                _context.prev = 16;
                _context.t0 = _context["catch"](0);

                _errorHandler["default"].tryCatchError(res, _context.t0);

              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 16]]);
      }));

      function signUp(_x, _x2) {
        return _signUp.apply(this, arguments);
      }

      return signUp;
    }()
  }, {
    key: "signIn",
    value: function () {
      var _signIn = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var _req$body, email, password, result, user, isMatch, _ref, token;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _req$body = req.body, email = _req$body.email, password = _req$body.password;
                result = _joi["default"].validate(req.body, _user["default"].signInUser, {
                  convert: false
                });

                if (!(result.error === null)) {
                  _context2.next = 19;
                  break;
                }

                _context2.next = 6;
                return _User["default"].findOne({
                  email: email
                });

              case 6:
                user = _context2.sent;

                if (!user) {
                  _context2.next = 18;
                  break;
                }

                _context2.next = 10;
                return user.comparePassword(password);

              case 10:
                isMatch = _context2.sent;

                if (!isMatch) {
                  _context2.next = 17;
                  break;
                }

                _context2.next = 14;
                return user.generateToken();

              case 14:
                _ref = _context2.sent;
                token = _ref.token;
                return _context2.abrupt("return", res.status(201).json({
                  loginSuccess: true,
                  token: "Bearer ".concat(token)
                }));

              case 17:
                return _context2.abrupt("return", res.status(400).json({
                  loginSuccess: false,
                  message: 'Password Incorrect'
                }));

              case 18:
                return _context2.abrupt("return", res.status(404).json({
                  loginSuccess: false,
                  message: 'User Not Found'
                }));

              case 19:
                return _context2.abrupt("return", _errorHandler["default"].validationError(res, result));

              case 22:
                _context2.prev = 22;
                _context2.t0 = _context2["catch"](0);

                _errorHandler["default"].tryCatchError(res, _context2.t0);

              case 25:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 22]]);
      }));

      function signIn(_x3, _x4) {
        return _signIn.apply(this, arguments);
      }

      return signIn;
    }()
  }, {
    key: "currentProfile",
    value: function currentProfile(req, res) {
      if (req.user) {
        var _req$user = req.user,
            isAdmin = _req$user.isAdmin,
            email = _req$user.email,
            firstname = _req$user.firstname,
            lastname = _req$user.lastname;
        return res.status(200).json({
          isAdmin: isAdmin,
          isAuth: true,
          email: email,
          firstname: firstname,
          lastname: lastname
        });
      }
    }
  }, {
    key: "logOut",
    value: function () {
      var _logOut = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var _ref2, token;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _User["default"].findOneAndUpdate({
                  _id: req.user._id
                }, {
                  token: ''
                });

              case 3:
                _ref2 = _context3.sent;
                token = _ref2.token;

                if (!(token === '')) {
                  _context3.next = 8;
                  break;
                }

                req.logOut();
                return _context3.abrupt("return", res.status(200).json({
                  success: true,
                  message: 'Log out succesfully'
                }));

              case 8:
                _context3.next = 13;
                break;

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3["catch"](0);

                _errorHandler["default"].tryCatchError(res, _context3.t0);

              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 10]]);
      }));

      function logOut(_x5, _x6) {
        return _logOut.apply(this, arguments);
      }

      return logOut;
    }()
  }]);

  return userController;
}();

exports["default"] = userController;