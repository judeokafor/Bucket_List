import mongoose from 'mongoose';
import env from './env';
let connectionString;
if (process.env.NODE_ENV === 'test') {
  connectionString = env.DATABASE_URL;
} else {
  connectionString = env.DATABASE_URL_DEV;
  // connectionString = env.DATABASE_URL;
}
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log(`MongoDB connected to ${connectionString}`);
  })
  .catch((err) => {
    console.log(err);
  });
