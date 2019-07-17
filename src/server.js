import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import passport from 'passport';
import '@babel/polyfill/noConflict';

import './lib/config/dbConfig';
import passportFunction from './lib/config/passportConfig';

import users from './routes/user';
import bucklists from './routes/bucketlist';

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use(morgan('dev'));

app.use(passport.initialize());
passportFunction(passport);

app.use('/api/v1', bucklists);
app.use('/api/v1/auth', users);

const PORT = process.env.PORT || 6060;
const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
export default server;
