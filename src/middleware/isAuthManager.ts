import { NextFunction, Response } from "express";
import { BusinessUser } from "../entity/BusinessUser";
import { MyRequest } from "../config/types";

export const isAuth = async (req: MyRequest, res: Response, next: NextFunction) => {
  if(!req.session.userId) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const businessUser = await BusinessUser.findOne({ where: { userId: req.session.userId } });

  if(!businessUser) {
    return res.status(401).json({ success: false, message: 'User not found.' });
  }
  
  req.businessUser = businessUser;

  return next();
}