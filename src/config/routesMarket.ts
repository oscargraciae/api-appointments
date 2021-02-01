
import business from '../apiMarket/business/business.routes';
import user from '../apiMarket/user/user.routes';
import booking from '../apiMarket/booking/booking.routes';
import category from '../apiMarket/category/category.routes';

const URL_V1 = '/api/v1';

export default (app: any) => {
  app.use(`${URL_V1}/businesses`, business);
  app.use(`${URL_V1}/users`, user);
  app.use(`${URL_V1}/booking`, booking);
  app.use(`${URL_V1}/categories`, category);
}