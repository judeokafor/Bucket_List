import Joi from 'joi';

export default class bucketList {
  static get bucketList() {
    return Joi.object({
      name: Joi.string()
        .max(255)
        .required(),
      bucketName: Joi.string().max(255),
    });
  }
}
