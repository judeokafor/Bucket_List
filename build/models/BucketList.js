"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var bucketListSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 255
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    name: {
      type: String
    },
    done: {
      type: Boolean,
      "default": false
    }
  }, {
    timestamps: true
  }]
}, {
  timestamps: true
});

var BucketList = _mongoose["default"].model('BucketList', bucketListSchema);

var _default = BucketList;
exports["default"] = _default;