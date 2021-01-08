
import business from '../apiMarket/business/business.routes';



const URL_V1 = '/api/v1';

export default (app: any) => {
  app.use(`${URL_V1}/businesses`, business);
}