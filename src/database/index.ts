import { createConnection } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { Business } from '../entity/Business';
import { BusinessCategory } from '../entity/BusinessCategory';
import { BusinessAddress } from '../entity/BusinessAddress';
import { BusinessUser } from '../entity/BusinessUser';
import { User } from '../entity/User';
import { BusinessFile } from '../entity/BusinessFile';
import { BusinessService } from '../entity/BusinessService';
import { Booking } from '../entity/Booking';
import { BookingStatus } from '../entity/BookingStatus';
import { BookingService } from '../entity/BookingService';
import { Review } from '../entity/Review';
import { BusinessHour } from '../entity/BusinessHour';

import { __prod__ } from '../config/constants';

const setupDB = async () => {
  await createConnection({
    type: 'postgres',
    database: 'boombook_dev',
    username: 'postgres',
    password: 'desarrollo',
    logging: true,
    synchronize: !__prod__ ? true : false,
    namingStrategy: new SnakeNamingStrategy(),
    entities: [
      User,
      Business,
      BusinessCategory,
      BusinessAddress,
      BusinessUser,
      BusinessFile,
      BusinessService,
      Booking,
      BookingStatus,
      BookingService,
      Review,
      BusinessHour,
    ],
  });

  // conn.runMigrations();

}

export default setupDB;