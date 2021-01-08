import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import redis from 'redis';
import session from 'express-session';
import morgan from 'morgan';

import setupDB from './database';
import routesManager from './config/routesManager';
import { COOKIE_NAME } from './config/constants';
import routesMarket from './config/routesMarket';
import setupSocket from './config/sockets';

const RedisStore = require('connect-redis')(session);

// declare namespace Express {
//   export interface Request {
//     customProperty?: string
//   }
// }

const main = () => {
  setupDB();

  const app = express();
  
  app.disable('etag');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors({
    origin: ['http://localhost:8002', 'http://localhost:8000'],
    credentials: true
  }));
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
      httpOnly: false,
      sameSite: 'lax',
      secure: false, // only works https,
    },
    saveUninitialized: false,
    resave: false,
  }))

  routesManager(app);
  routesMarket(app);

  const port = process.env.PORT || 8001;
  const server = app.listen(port, () =>{
    console.log('Listening on port: ', port);
  })

  setupSocket(server);
}

main();