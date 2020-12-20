import { Request, Response } from 'express';
import { Session, SessionData } from 'express-session';

interface IGetUserAuthInfoRequest extends Request {
  userId: string // or any other type
}

interface ISesionParams extends SessionData {
  userId: number
}

export type MyContext = {
  req: IGetUserAuthInfoRequest & { session: Session & Partial<ISesionParams> }
  res: Response
}