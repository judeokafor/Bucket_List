"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _errorHandler = _interopRequireDefault(require("../lib/helpers/errorHandler"));

var _bucketlist = _interopRequireDefault(require("../lib/validations/bucketlist"));

var _BucketList = _interopRequireDefault(require("../models/BucketList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var bucketListController =
/*#__PURE__*/
function () {
  function bucketListController() {
    _classCallCheck(this, bucketListController);
  }

  _createClass(bucketListController, null, [{
    key: "postBucketList",
    value: function () {
      var _postBucketList = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var name, id, result, bucketLists;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                name = req.body.name;
                id = req.user.id;
                result = _joi["default"].validate({
                  name: name
                }, _bucketlist["default"].bucketList, {
                  convert: false
                });

                if (!(result.error === null)) {
                  _context.next = 9;
                  break;
                }

                bucketLists = new _BucketList["default"]({
                  name: name,
                  created_by: id
                });
                _context.next = 8;
                return bucketLists.save();

              case 8:
                return _context.abrupt("return", res.status(201).json({
                  message: 'save success'
                }));

              case 9:
                return _context.abrupt("return", _errorHandler["default"].validationError(res, result));

              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](0);

                _errorHandler["default"].tryCatchError(res, _context.t0.message);

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 12]]);
      }));

      function postBucketList(_x, _x2) {
        return _postBucketList.apply(this, arguments);
      }

      return postBucketList;
    }()
  }, {
    key: "getBucketList",
    value: function () {
      var _getBucketList = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var name, id, _req$query, page, limit, doc, skip;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                name = req.query.name;
                id = req.user.id;
                _req$query = req.query, page = _req$query.page, limit = _req$query.limit;

                if (!name) {
                  _context2.next = 10;
                  break;
                }

                _context2.next = 7;
                return _BucketList["default"].find({
                  name: name,
                  created_by: id
                });

              case 7:
                doc = _context2.sent;
                _context2.next = 24;
                break;

              case 10:
                if (!(page && limit)) {
                  _context2.next = 21;
                  break;
                }

                page = parseInt(page, 10) || 1;
                limit = parseInt(limit, 10) || 20;
                skip = limit * (page - 1);

                if (!(page === 0 || page < 0)) {
                  _context2.next = 16;
                  break;
                }

                return _context2.abrupt("return", res.status(400).json({
                  message: 'Page must be 1 and above'
                }));

              case 16:
                _context2.next = 18;
                return _BucketList["default"].find({
                  created_by: id
                }).limit(limit).skip(skip).exec();

              case 18:
                doc = _context2.sent;
                _context2.next = 24;
                break;

              case 21:
                _context2.next = 23;
                return _BucketList["default"].find({
                  created_by: id
                });

              case 23:
                doc = _context2.sent;

              case 24:
                return _context2.abrupt("return", res.status(200).json({
                  message: 'success',
                  doc: doc,
                  size: doc.length
                }));

              case 27:
                _context2.prev = 27;
                _context2.t0 = _context2["catch"](0);

                _errorHandler["default"].tryCatchError(res, _context2.t0.message);

              case 30:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 27]]);
      }));

      function getBucketList(_x3, _x4) {
        return _getBucketList.apply(this, arguments);
      }

      return getBucketList;
    }()
  }, {
    key: "getById",
    value: function () {
      var _getById = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var id, doc;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                id = req.params.id;
                _context3.next = 4;
                return _BucketList["default"].findOne({
                  _id: id
                }).populate('created_by').exec();

              case 4:
                doc = _context3.sent;
                return _context3.abrupt("return", res.status(200).json({
                  message: 'Success',
                  doc: doc
                }));

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3["catch"](0);

                _errorHandler["default"].tryCatchError(res, _context3.t0.message);

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 8]]);
      }));

      function getById(_x5, _x6) {
        return _getById.apply(this, arguments);
      }

      return getById;
    }()
  }, {
    key: "updateById",
    value: function () {
      var _updateById = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(req, res) {
        var id, name;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                id = req.params.id;
                name = req.body.name;
                _context4.next = 5;
                return _BucketList["default"].findOneAndUpdate({
                  _id: id
                }, {
                  name: name
                });

              case 5:
                return _context4.abrupt("return", res.status(204).json({
                  message: 'Success'
                }));

              case 8:
                _context4.prev = 8;
                _context4.t0 = _context4["catch"](0);

                _errorHandler["default"].tryCatchError(res, _context4.t0.message);

              case 11:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 8]]);
      }));

      function updateById(_x7, _x8) {
        return _updateById.apply(this, arguments);
      }

      return updateById;
    }()
  }, {
    key: "deleteById",
    value: function () {
      var _deleteById = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(req, res) {
        var id;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                id = req.params.id;
                _context5.next = 4;
                return _BucketList["default"].findOneAndDelete({
                  _id: id
                });

              case 4:
                return _context5.abrupt("return", res.status(200).json({
                  message: 'Deleted Successfully'
                }));

              case 7:
                _context5.prev = 7;
                _context5.t0 = _context5["catch"](0);

                _errorHandler["default"].tryCatchError(res, _context5.t0.message);

              case 10:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 7]]);
      }));

      function deleteById(_x9, _x10) {
        return _deleteById.apply(this, arguments);
      }

      return deleteById;
    }()
  }, {
    key: "postBucketListItems",
    value: function () {
      var _postBucketListItems = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(req, res) {
        var id, name, result, option, doc;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                id = req.params.id;
                name = req.body.name;
                result = _joi["default"].validate({
                  name: name
                }, _bucketlist["default"].bucketListItem, {
                  convert: false
                });
                option = {
                  name: name
                };

                if (!(result.error === null)) {
                  _context6.next = 10;
                  break;
                }

                _context6.next = 8;
                return _BucketList["default"].findOneAndUpdate({
                  _id: id
                }, {
                  $push: {
                    items: option
                  }
                }, {
                  upsert: true
                }).exec();

              case 8:
                doc = _context6.sent;
                return _context6.abrupt("return", res.status(200).json({
                  doc: doc
                }));

              case 10:
                return _context6.abrupt("return", _errorHandler["default"].validationError(res, result));

              case 13:
                _context6.prev = 13;
                _context6.t0 = _context6["catch"](0);

                _errorHandler["default"].tryCatchError(res, _context6.t0.message);

              case 16:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[0, 13]]);
      }));

      function postBucketListItems(_x11, _x12) {
        return _postBucketListItems.apply(this, arguments);
      }

      return postBucketListItems;
    }()
  }, {
    key: "updateBucketListItems",
    value: function () {
      var _updateBucketListItems = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(req, res) {
        var _req$params, bucket_id, item_id, _req$body, name, done, id, result, updateItem;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                // eslint-disable-next-line camelcase
                _req$params = req.params, bucket_id = _req$params.bucket_id, item_id = _req$params.item_id;
                _req$body = req.body, name = _req$body.name, done = _req$body.done;
                id = req.user.id;
                result = _joi["default"].validate({
                  name: name
                }, _bucketlist["default"].bucketListItem, {
                  convert: false
                });

                if (!(result.error === null)) {
                  _context7.next = 12;
                  break;
                }

                _context7.next = 8;
                return _BucketList["default"].findOneAndUpdate({
                  created_by: id,
                  _id: bucket_id,
                  'items._id': item_id
                }, {
                  $set: {
                    'items.$.name': name,
                    'items.$.done': done || false
                  }
                });

              case 8:
                updateItem = _context7.sent;

                if (!updateItem) {
                  _context7.next = 11;
                  break;
                }

                return _context7.abrupt("return", res.status(200).json({
                  message: 'Successfully updated'
                }));

              case 11:
                return _context7.abrupt("return", res.status(400).json({
                  message: 'Invalid ID'
                }));

              case 12:
                return _context7.abrupt("return", _errorHandler["default"].validationError(res, result));

              case 15:
                _context7.prev = 15;
                _context7.t0 = _context7["catch"](0);

                _errorHandler["default"].tryCatchError(res, _context7.t0.message);

              case 18:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[0, 15]]);
      }));

      function updateBucketListItems(_x13, _x14) {
        return _updateBucketListItems.apply(this, arguments);
      }

      return updateBucketListItems;
    }()
  }, {
    key: "deleteBucketListItems",
    value: function () {
      var _deleteBucketListItems = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8(req, res) {
        var _req$params2, bucket_id, item_id, id, deleteItem;

        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.prev = 0;
                // eslint-disable-next-line camelcase
                _req$params2 = req.params, bucket_id = _req$params2.bucket_id, item_id = _req$params2.item_id;
                id = req.user.id;
                _context8.next = 5;
                return _BucketList["default"].findOneAndUpdate({
                  created_by: id,
                  _id: bucket_id,
                  'items._id': item_id
                }, {
                  $pull: {
                    items: {
                      _id: item_id
                    }
                  }
                });

              case 5:
                deleteItem = _context8.sent;

                if (!deleteItem) {
                  _context8.next = 8;
                  break;
                }

                return _context8.abrupt("return", res.status(200).json({
                  message: 'Successfully deleted'
                }));

              case 8:
                return _context8.abrupt("return", res.status(400).json({
                  message: 'Invalid ID'
                }));

              case 11:
                _context8.prev = 11;
                _context8.t0 = _context8["catch"](0);

                _errorHandler["default"].tryCatchError(res, _context8.t0.message);

              case 14:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, null, [[0, 11]]);
      }));

      function deleteBucketListItems(_x15, _x16) {
        return _deleteBucketListItems.apply(this, arguments);
      }

      return deleteBucketListItems;
    }()
  }]);

  return bucketListController;
}();

exports["default"] = bucketListController;