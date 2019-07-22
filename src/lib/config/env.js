import dotenv from 'dotenv';

dotenv.config();

export default {
  DATABASE_URL: process.env.DATABASE_URL,
  DATABASE_URL_DEV: process.env.DATABASE_URL_DEV,
  SECRET_KEY: process.env.SECRET_KEY,
  SALT: process.env.SALT,
};
