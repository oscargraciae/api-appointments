import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import redis from 'redis';
import session from 'express-session';
import morgan from 'morgan';

import setupDB from './database';
import routesManager from './config/routesManager';
import { COOKIE_NAME } from './config/constants';

const RedisStore = require('connect-redis')(session);

const main = () => {
  setupDB();

  const app = express();
  
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());
  app.use(morgan('dev'));

  const redisClient = redis.createClient();
  app.use(session({
    name: COOKIE_NAME,
    secret: 'secretkey',
    store: new RedisStore({ 
      client: redisClient,
      disableTouch: true,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
      httpOnly: true,
      sameSite: 'lax',
      secure: false, // only works https,
    },
    saveUninitialized: false,
    resave: false,
  }))

  routesManager(app);

  const port = process.env.PORT || 8001;
  app.listen(port, () =>{
    console.log('Listening on port: ', port);
  })
}

main();