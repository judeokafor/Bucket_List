"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _morgan = _interopRequireDefault(require("morgan"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _passport = _interopRequireDefault(require("passport"));

require("@babel/polyfill/noConflict");

require("./lib/config/dbConfig");

var _passportConfig = _interopRequireDefault(require("./lib/config/passportConfig"));

var _user = _interopRequireDefault(require("./routes/user"));

var _bucketlist = _interopRequireDefault(require("./routes/bucketlist"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var app = (0, _express["default"])();
app.use(_express["default"]["static"]('../dist'));
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use((0, _cors["default"])());
app.use((0, _morgan["default"])('dev'));
app.use(_passport["default"].initialize());
(0, _passportConfig["default"])(_passport["default"]);
app.use('/api/v1', _bucketlist["default"]);
app.use('/api/v1/auth', _user["default"]);
var PORT = process.env.PORT || 6066;
var server = app.listen(PORT, function () {
  console.log("Server started on port ".concat(PORT));
});
var _default = server;
exports["default"] = _default;