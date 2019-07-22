import Joi from 'joi';

export default class bucketList {
  static get bucketList() {
    return Joi.object({
      name: Joi.string()
        .min(4)
        .max(255)
        .required(),
    });
  }

  static get bucketListItem() {
    return Joi.object({
      name: Joi.string()
        .min(4)
        .max(255)
        .required(),
    });
  }
}
