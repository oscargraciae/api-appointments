import { NextFunction, Response } from "express";
import { MyRequest } from "../config/types";
import { User } from "../entity/User";

export const isAuth = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    if(!req.session.userId) {
      return res.status(401).json({ success: false, message: 'Unauthorizedd' });
    }
  
    // const businessUser = await BusinessUser.findOne({ where: { userId: req.session.userId } });
    const user = await User.findOne({
      where: { id: req.session.userId },
      relations: ['businessUser']
    });
  
    if(!user) {
      return res.status(401).json({ success: false, message: 'User not found.' });
    }
    
    req.user = user;
  
    return next();
  } catch (error) {
    return res.json({success: true, message: error.message });
  }
}