/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
import Joi from 'joi';

import errorHandler from '../lib/helpers/errorHandler';
import validation from '../lib/validations/bucketlist';
import { BucketList, BucketItem } from '../models/BucketList';

export default class bucketListController {
  static async postBucketList(req, res) {
    try {
      const { name, bucketName, createdBy } = req.body;
      const result = Joi.validate({ name, bucketName }, validation.bucketList, {
        convert: false,
      });
      if (result.error === null) {
        const items = new BucketItem({
          bucketName,
        });
        const bucketLists = new BucketList({
          name,
          created_by: createdBy,
          // items,
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
      const doc = await BucketList.find({});
      return res.status(200).json({
        message: 'Success',
        doc,
      });
    } catch (error) {
      errorHandler.tryCatchError(res, error);
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const doc = await BucketList.findById(id);
      return res.status(200).json({
        message: 'Success',
        doc,
      });
    } catch (error) {
      errorHandler.tryCatchError(res, error);
    }
  }
}
