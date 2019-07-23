"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _env = _interopRequireDefault(require("./env"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var connectionString;

if (process.env.NODE_ENV === 'test') {
  connectionString = _env["default"].DATABASE_URL;
} else {
  connectionString = _env["default"].DATABASE_URL_DEV; // connectionString = env.DATABASE_URL;
}

_mongoose["default"].connect(connectionString, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(function () {
  console.log("MongoDB connected to ".concat(connectionString));
})["catch"](function (err) {
  console.log(err);
});