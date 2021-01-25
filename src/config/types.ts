import { Request } from 'express';
import { Session, SessionData } from 'express-session';
import { Socket } from 'socket.io';

// interface IGetUserAuthInfoRequest extends Request {
//   userId: string // or any other type
// }

interface ISesionParams extends SessionData {
  userId: number
}

export type MyRequest = Request & { session: Session & Partial<ISesionParams> } & { user?: any, socketIo?: Socket }

// export type MyContext = {
//   req: 
//   res: Response
// }