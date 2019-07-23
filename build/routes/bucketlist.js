"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _passport = _interopRequireDefault(require("passport"));

var _bucketList = _interopRequireDefault(require("../controllers/bucketList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/bucketlists', _passport["default"].authenticate('jwt', {
  session: false
}), _bucketList["default"].postBucketList);
router.get('/bucketlists', _passport["default"].authenticate('jwt', {
  session: false
}), _bucketList["default"].getBucketList);
router.get('/bucketlists/:id', _passport["default"].authenticate('jwt', {
  session: false
}), _bucketList["default"].getById);
router.put('/bucketlists/:id', _passport["default"].authenticate('jwt', {
  session: false
}), _bucketList["default"].updateById);
router["delete"]('/bucketlists/:id', _passport["default"].authenticate('jwt', {
  session: false
}), _bucketList["default"].deleteById);
router.post('/bucketlists/:id/items', _passport["default"].authenticate('jwt', {
  session: false
}), _bucketList["default"].postBucketListItems);
router.put('/bucketlists/:bucket_id/items/:item_id', _passport["default"].authenticate('jwt', {
  session: false
}), _bucketList["default"].updateBucketListItems);
router["delete"]('/bucketlists/:bucket_id/items/:item_id', _passport["default"].authenticate('jwt', {
  session: false
}), _bucketList["default"].deleteBucketListItems);
var _default = router;
exports["default"] = _default;