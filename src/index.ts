import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import redis from 'redis';
import session from 'express-session';
import morgan from 'morgan';

import setupDB from './database';
import routesManager from './config/routesManager';
import { COOKIE_NAME, __prod__ } from './config/constants';
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
  

  // app.disable('etag');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.set("trust proxy", 1);
  app.use(cors({
    origin: ['http://localhost:8002', 'http://localhost:8000', 'http://localhost', 'https://reserly.mx',],
    // origin: "*",
    credentials: true,
  }));
  
  app.use(morgan('dev'));
  

  // const redisClient = redis.createClient({ host: 'redis' });
  const redisClient = redis.createClient();
  app.use(session({
    proxy: true, // NODE_ENV === 'production'
    name: COOKIE_NAME,
    secret: 'secretkey',
    store: new RedisStore({ 
      client: redisClient,
      disableTouch: true,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
      // httpOnly: true,
      sameSite: "lax", // csrf
      secure: __prod__, // cookie only works in https
    },
    saveUninitialized: false,
    resave: false,
  }))

  routesManager(app);
  routesMarket(app);

  const port = process.env.PORT || 8001;
  
  const server = http.createServer(app);

  setupSocket(server, app);

  server.listen(port, () => {
    console.log(`Server listen on port: ${port}`);
  });

  // const server = app.listen(port, () =>{
  //   console.log('Listening on port: ', port);
  // })

  
}

main();