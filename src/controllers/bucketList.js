/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
import Joi from 'joi';

import errorHandler from '../lib/helpers/errorHandler';
import validation from '../lib/validations/bucketlist';
import BucketList from '../models/BucketList';

export default class bucketListController {
  static async postBucketList(req, res) {
    try {
      const { name } = req.body;
      const { id } = req.user;
      const result = Joi.validate({ name }, validation.bucketList, {
        convert: false,
      });
      if (result.error === null) {
        const bucketLists = new BucketList({
          name,
          created_by: id,
        });
        await bucketLists.save();
        return res.status(201).json({
          message: 'save success',
        });
      }
      return errorHandler.validationError(res, result);
    } catch (error) {
      errorHandler.tryCatchError(res, error.message);
    }
  }

  static async getBucketList(req, res) {
    try {
      const { name } = req.query;
      const { id } = req.user;
      let { page, limit } = req.query;
      let doc;

      if (name) {
        doc = await BucketList.find({ name, created_by: id });
      } else if (page && limit) {
        page = parseInt(page, 10) || 1;
        limit = parseInt(limit, 10) || 20;
        const skip = limit * (page - 1);
        if (page === 0 || page < 0) {
          return res.status(400).json({
            message: 'Page must be 1 and above',
          });
        }
        doc = await BucketList.find({ created_by: id })
          .limit(limit)
          .skip(skip)
          .exec();
      } else {
        doc = await BucketList.find({ created_by: id });
      }

      return res.status(200).json({
        message: 'success',
        doc,
        size: doc.length,
      });
    } catch (error) {
      errorHandler.tryCatchError(res, error.message);
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const doc = await BucketList.findOne({ _id: id })
        .populate('created_by')
        .exec();
      return res.status(200).json({
        message: 'Success',
        doc,
      });
    } catch (error) {
      errorHandler.tryCatchError(res, error.message);
    }
  }

  static async updateById(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      await BucketList.findOneAndUpdate({ _id: id }, { name });
      return res.status(204).json({
        message: 'Success',
      });
    } catch (error) {
      errorHandler.tryCatchError(res, error.message);
    }
  }

  static async deleteById(req, res) {
    try {
      const { id } = req.params;
      await BucketList.findOneAndDelete({ _id: id });
      return res.status(200).json({
        message: 'Deleted Successfully',
      });
    } catch (error) {
      errorHandler.tryCatchError(res, error.message);
    }
  }

  static async postBucketListItems(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const result = Joi.validate({ name }, validation.bucketListItem, {
        convert: false,
      });
      const option = {
        name,
      };
      if (result.error === null) {
        const doc = await BucketList.findOneAndUpdate(
          { _id: id },
          {
            $push: {
              items: option,
            },
          },
          { upsert: true },
        ).exec();
        return res.status(200).json({ doc });
      }
      return errorHandler.validationError(res, result);
    } catch (error) {
      errorHandler.tryCatchError(res, error.message);
    }
  }

  static async updateBucketListItems(req, res) {
    try {
      // eslint-disable-next-line camelcase
      const { bucket_id, item_id } = req.params;
      const { name, done } = req.body;
      const { id } = req.user;
      const result = Joi.validate({ name }, validation.bucketListItem, {
        convert: false,
      });
      if (result.error === null) {
        const updateItem = await BucketList.findOneAndUpdate(
          { created_by: id, _id: bucket_id, 'items._id': item_id },
          {
            $set: { 'items.$.name': name, 'items.$.done': done || false },
          },
        );

        if (updateItem) return res.status(200).json({ message: 'Successfully updated' });
        return res.status(400).json({ message: 'Invalid ID' });
      }
      return errorHandler.validationError(res, result);
    } catch (error) {
      errorHandler.tryCatchError(res, error.message);
    }
  }

  static async deleteBucketListItems(req, res) {
    try {
      // eslint-disable-next-line camelcase
      const { bucket_id, item_id } = req.params;
      const { id } = req.user;

      const deleteItem = await BucketList.findOneAndUpdate(
        { created_by: id, _id: bucket_id, 'items._id': item_id },
        {
          $pull: { items: { _id: item_id } },
        },
      );

      if (deleteItem) return res.status(200).json({ message: 'Successfully deleted' });
      return res.status(400).json({ message: 'Invalid ID' });
    } catch (error) {
      errorHandler.tryCatchError(res, error.message);
    }
  }
}
