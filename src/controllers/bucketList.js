/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
import Joi from 'joi';

import errorHandler from '../lib/helpers/errorHandler';
import validation from '../lib/validations/bucketlist';
import { BucketList, BucketItem } from '../models/BucketList';

export default class bucketListController {
  static async postBucketList(req, res) {
    try {
      const { name, bucketName } = req.body;
      const result = Joi.validate({ name, bucketName }, validation.bucketList, {
        convert: false,
      });
      if (result.error === null) {
        const bucketLists = new BucketList({
          name,
          created_by: req.user.id,
        });
        await bucketLists.save();
        return res.status(201).json({
          message: 'save success',
        });
      }
      return errorHandler.validationError(res, result);
    } catch (error) {
      errorHandler.tryCatchError(res, error);
    }
  }

  static async getBucketList(req, res) {
    try {
      const { name } = req.query;
      let { page, limit } = req.query;
      let doc;
      page = parseInt(page, 10) || 1;
      limit = parseInt(limit, 10) || 20;
      const skip = limit * (page - 1);
      if (name) {
        doc = await BucketList.find({ name });
      }
      if (page && limit) {
        if (page === 0 || page < 0) {
          return res.status(400).json({
            message: 'Page must be 1 and above',
          });
        }
        doc = await BucketList.find({ created_by: req.user.id })
          .limit(limit)
          .skip(skip)
          .exec();
      } else if (!req.query) {
        doc = await BucketList.find({});
      }
      return res.status(200).json({
        message: 'success',
        doc,
        size: doc.length,
      });
    } catch (error) {
      errorHandler.tryCatchError(res, error);
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const doc = await BucketList.find({ _id: id })
        .populate('created_by')
        .exec();
      return res.status(200).json({
        message: 'Success',
        doc,
      });
    } catch (error) {
      errorHandler.tryCatchError(res, error);
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
      errorHandler.tryCatchError(res, error);
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
      errorHandler.tryCatchError(res, error);
    }
  }

  static async postBucketListItems(req, res) {
    try {
      const { id } = req.params;
      const { bucketName } = req.body;
      const result = Joi.validate({ bucketName }, validation.bucketListItem, {
        convert: false,
      });
      if (result.error === null) {
        const items = new BucketItem({
          bucketName,
        });
        const doc = await BucketList.findOneAndUpdate(
          { _id: id },
          {
            $push: {
              items,
            },
          },
        ).exec();
        return res.status(200).json({ doc });
      }
      return errorHandler.validationError(res, result);
    } catch (error) {
      errorHandler.tryCatchError(res, error);
    }
  }

  // static async updateBucketListItems(req, res) {
  //   try {
  //     const { id } = req.params;
  //     const { bucketName } = req.body;
  //     const result = Joi.validate({ bucketName }, validation.bucketListItem, {
  //       convert: false,
  //     });
  //     if (result.error === null) {
  //       const list = await BucketList.findOneAndUpdate({ _id: id });
  //       if (list) {
  //         const items = {
  //           bucketName,
  //         };

  //         return res.status(200).json({
  //           items,
  //         });
  //       }
  //       return res.status(404).json({ message: 'No Bucklist available' });
  //     }
  //     return errorHandler.validationError(res, result);
  //   } catch (error) {
  //     errorHandler.tryCatchError(res, error);
  //   }
  // }
}
