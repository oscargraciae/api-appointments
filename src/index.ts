
import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
// import redis from 'ioredis';
// import Redis from "ioredis";
import session from 'express-session';
import morgan from 'morgan';
import sgMail from '@sendgrid/mail';
import sgClient from '@sendgrid/client';

import setupDB from './database';
import routesManager from './config/routesManager';
import { COOKIE_NAME, DOMAIN_NAME, __prod__ } from './config/constants';
import routesMarket from './config/routesMarket';
import setupSocket from './config/sockets';

// const RedisStore = require('connect-redis')(session);

require('dotenv-flow').config();

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  sgClient.setApiKey(process.env.SENDGRID_API_KEY);
}

const main = () => {
  setupDB();

  const app = express();
  
  // app.disable('etag');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  
  app.use(cors({ origin: '*' }));
  // app.use(cors({
  //   origin: ['http://localhost:8002', 'http://localhost:8000', 'https://reserly.mx',],
  //   credentials: true,
  // }));

  app.use(morgan('dev'));
  
  app.set("trust proxy", 1);
  // const redisClient = redis.createClient({ host: 'redis' });
  // const redisClient = redis.createClient();
  // const redis = new Redis();
  app.use(session({
    // proxy: true, // NODE_ENV === 'production'
    name: COOKIE_NAME,
    secret: 'secretkey',
    // store: __prod__ ? new RedisStore({ 
    //   client: redis,
    //   disableTouch: true,
    // }) : MemoryStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
      httpOnly: false,
      secure: __prod__, // production true
      domain: DOMAIN_NAME,
      // httpOnly: false, // No afecta
      // sameSite: "lax", // csrf
      // secure: false, // cookie only works in https. -> En true mo me almaneca la sesion
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