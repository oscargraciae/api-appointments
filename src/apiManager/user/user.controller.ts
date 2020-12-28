import { Response } from 'express';
import { getConnection } from 'typeorm';

import { auth } from "../../service/auth";
import { User } from "../../entity/User";
import { BusinessUser } from '../../entity/BusinessUser';
import { MyRequest } from "../../config/types";
import { COOKIE_NAME } from '../../config/constants';

class UserController {
  async login(req: MyRequest, res: Response) {
    try {
      const { email, password } = req.body;
      const { user, isAuth, message } = await auth(email, password);
      if (!isAuth || !user) {
        return res.json({ success: false, message });
      }
      
      req.session!.userId = user.id;
      
      return res.json({ success: true });
    } catch (error) {
      return res.json({
        success: false,
        message: error.message,
      });
    }
  }
  
  async logout(req: MyRequest, res: Response) {
    try {
      req.session.destroy(err => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          res.status(400).send('Unable to log out')
        } else {
          res.send('Logout successful')
        }
      });
    } catch (error) {
      return res.json({ success: false, message: error.message });
    }
  }

  async getUser(req: MyRequest, res: Response) {
    try {
      if (!req.session.userId) return res.status(401).json({ success: false, message: 'Unauthorized' });
      const user = await User.findOne({
        where: { id: req.session.userId },
        relations: ['businessUser']
      });

      
      // const user = await getConnection()
      //   .getRepository(BusinessUser)
      //   .createQueryBuilder("businessUser")
      //   .leftJoinAndSelect("businessUser.user", "user")
      //   .getOne();

      // const user = await getConnection()
      //   .getRepository(User)
      //   .createQueryBuilder("user")
      //   .leftJoinAndSelect("user.businessUser", "businessUser")
      //   .getOne();
      if (!user) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }
      return res.json({ success: true, user });
    } catch (error) {
     return  res.json({ success: false, message: error.message });
    }
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