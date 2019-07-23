"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _env = _interopRequireDefault(require("../lib/config/env"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Schema = _mongoose["default"].Schema;
var userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
    maxlength: 100
  },
  lastname: {
    type: String,
    required: true,
    maxlength: 100
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  token: {
    type: String,
    "default": ''
  }
});
userSchema.pre('save',
/*#__PURE__*/
function () {
  var _hashPassword = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(next) {
    var salt, hash;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            if (!this.isModified('password')) {
              _context.next = 12;
              break;
            }

            _context.next = 4;
            return _bcryptjs["default"].genSaltSync(_env["default"].SALT);

          case 4:
            salt = _context.sent;
            _context.next = 7;
            return _bcryptjs["default"].hashSync(this.password, salt);

          case 7:
            hash = _context.sent;
            this.password = hash;
            next();
            _context.next = 13;
            break;

          case 12:
            next();

          case 13:
            _context.next = 18;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", next(_context.t0));

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 15]]);
  }));

  function hashPassword(_x) {
    return _hashPassword.apply(this, arguments);
  }

  return hashPassword;
}());

userSchema.methods.comparePassword =
/*#__PURE__*/
function () {
  var _passComp = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(plainPassword) {
    var isMatch;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _bcryptjs["default"].compareSync(plainPassword, this.password);

          case 3:
            isMatch = _context2.sent;
            return _context2.abrupt("return", isMatch);

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 7]]);
  }));

  function passComp(_x2) {
    return _passComp.apply(this, arguments);
  }

  return passComp;
}();

userSchema.methods.generateToken =
/*#__PURE__*/
function () {
  var _genToken = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3() {
    var payload, token, doc;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            payload = {
              id: this._id,
              email: this.email,
              isAdmin: this.isAdmin
            };
            _context3.next = 4;
            return _jsonwebtoken["default"].sign(payload, _env["default"].SECRET_KEY);

          case 4:
            token = _context3.sent;
            this.token = token;
            _context3.next = 8;
            return this.save();

          case 8:
            doc = _context3.sent;
            return _context3.abrupt("return", doc);

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this, [[0, 12]]);
  }));

  function genToken() {
    return _genToken.apply(this, arguments);
  }

  return genToken;
}();

var User = _mongoose["default"].model('User', userSchema);

var _default = User;
exports["default"] = _default;