import { Request } from 'express';
import { Session, SessionData } from 'express-session';
import { BusinessUser } from '../entity/BusinessUser';

interface IGetUserAuthInfoRequest extends Request {
  businessUser: BusinessUser
}

interface ISesionParams extends SessionData {
  userId: number
}

export type MyRequest = IGetUserAuthInfoRequest & { session: Session & Partial<ISesionParams> }

// export type MyContext = {
//   req: 
//   res: Response
// }