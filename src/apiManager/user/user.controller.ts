import { Response } from 'express';

import { auth } from "../../service/auth";
import { User } from "../../entity/User";
import { MyRequest } from "../../config/types";

class UserController {
  async login(req: MyRequest, res: Response) {
    try {
      const { email, password } = req.body;
      const { user, isAuth, message } = await auth(email, password);
      if (!isAuth || !user) {
        return res.json({ success: false, message });
      }
      
      req.session!.userId = user.id;
      
      return res.json({ success: true, user });
      // req.session!.userId = user.id;

    } catch (error) {
      return res.json({
        success: false,
        message: error.message,
      });
    }
  }

  async getUser(req: MyRequest, res: Response) {
    if (!req.session.userId) return res.status(401).json({ success: false, message: 'Unauthorized' });
    // Get de usuario en Manager se consulta con el token
    const user = await User.findOne({ where: { id: req.session.userId } });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    return res.json({ success: true, user });
  }

  async create(req: MyRequest, res: Response) {
    try {
      const userBody: User = req.body;
      const user = await User.create(userBody).save();
      res.json({ success: true, user });
    } catch (error) {
      res.json({
        success: false,
        message: error.message,
      })
    }
  }
}

export default UserController;