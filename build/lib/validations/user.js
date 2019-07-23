"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var User =
/*#__PURE__*/
function () {
  function User() {
    _classCallCheck(this, User);
  }

  _createClass(User, null, [{
    key: "userSchema",
    get: function get() {
      return _joi["default"].object({
        firstname: _joi["default"].string().max(100).required(),
        lastname: _joi["default"].string().max(100).required(),
        email: _joi["default"].string().email().min(3).max(150).trim().required(),
        password: _joi["default"].string().alphanum().min(5).max(30).required(),
        isAdmin: _joi["default"].string()
      });
    }
  }, {
    key: "signInUser",
    get: function get() {
      return _joi["default"].object({
        email: _joi["default"].string().email().trim().min(3).max(150).required(),
        password: _joi["default"].string().min(2).max(30).required()
      });
    }
  }]);

  return User;
}();

exports["default"] = User;