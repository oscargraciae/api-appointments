import user from '../apiManager/user/user.routes';
import business from '../apiManager/business/business.routes';
import service from '../apiManager/service/service.routes';
import address from '../apiManager/address/address.routes';
import booking from '../apiManager/booking/booking.routes';
import customer from '../apiManager/customer/customer.routes';
import category from '../apiManager/category/category.routes';

const URL_V1 = '/api/manager_v1';

export default (app: any) => {
  app.use(`${URL_V1}/users`, user);
  app.use(`${URL_V1}/businesses`, business);
  app.use(`${URL_V1}/businesses/:businessId/services`, service);
  app.use(`${URL_V1}/businesses/:businessId/addresses`, address);
  app.use(`${URL_V1}/bookings`, booking);
  app.use(`${URL_V1}/customers`, customer);
  app.use(`${URL_V1}/categories`, category);
}