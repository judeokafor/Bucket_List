/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
import Joi from 'joi';

import errorHandler from '../lib/helpers/errorHandler';
import validation from '../lib/validations/user';
import User from '../models/User';

export default class userController {
  static async signUp(req, res) {
    try {
      const result = Joi.validate(req.body, validation.userSchema, {
        convert: false,
      });
      if (result.error === null) {
        const { email } = req.body;
        const existUser = await User.findOne({ email });
        if (!existUser) {
          const user = new User(req.body);
          await user.save();
          return res.status(201).json({ success: true });
        }
        return res
          .status(400)
          .json({ success: false, message: 'Email Already Exist' });
      }
      return errorHandler.validationError(res, result);
    } catch (error) {
      errorHandler.tryCatchError(res, error);
    }
  }

  static async signIn(req, res) {
    try {
      const { email, password } = req.body;
      const result = Joi.validate(req.body, validation.signInUser, {
        convert: false,
      });
      if (result.error === null) {
        const user = await User.findOne({ email });
        if (user) {
          const isMatch = await user.comparePassword(password);
          if (isMatch) {
            const { token } = await user.generateToken();
            return res.status(201).json({
              loginSuccess: true,
              token: `Bearer ${token}`,
            });
          }
          return res
            .status(400)
            .json({ loginSuccess: false, message: 'Password Incorrect' });
        }
        return res
          .status(404)
          .json({ loginSuccess: false, message: 'User Not Found' });
      }
      return errorHandler.validationError(res, result);
    } catch (error) {
      errorHandler.tryCatchError(res, error);
    }
  }

  static currentProfile(req, res) {
    if (req.user) {
      return res.status(200).json({
        ...req.user,
        isAuth: true,
      });
    }
  }

  static async logOut(req, res) {
    try {
      const response = await User.findOneAndUpdate(
        { _id: req.user._id },
        { token: '' },
      );
      if (response) {
        req.logOut();
        return res.status(200).json({
          success: true,
          message: 'Log out succesfully',
        });
      }
    } catch (error) {
      errorHandler.tryCatchError(res, error);
    }
  }
}
