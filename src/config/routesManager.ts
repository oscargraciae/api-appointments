import user from '../apiManager/user/user.routes';
import business from '../apiManager/business/business.routes';
import service from '../apiManager/service/service.routes';

const URL_V1 = '/api/v1';

export default (app: any) => {
  app.use(`${URL_V1}/users`, user);
  app.use(`${URL_V1}/businesses`, business);
  app.use(`${URL_V1}/businesses/services`, service);
}