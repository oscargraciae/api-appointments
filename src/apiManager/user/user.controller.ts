import { Response } from 'express';

import { auth } from "../../service/auth";
import { User } from "../../entity/User";
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
      
      return res.json({ success: true, user });
    } catch (error) {
      return res.json({
        success: false,
        message: error.message,
      });
    }
  }

  async create(req: MyRequest, res: Response) {
    try {
      const userBody: User = req.body;
      const user = await User.create(userBody).save();
      if (!user) {
        return res.json({ success: false, message: 'No error al registrar el usuario.' })
      }
      
      req.session!.userId = user.id;
      return res.json({ success: true, user });
    } catch (error) {
      return res.json({
        success: false,
        message: error.message,
      })
    }
  }
  
  async logout(req: MyRequest, res: Response) {
    try {
      return req.session.destroy(err => {
        res.clearCookie(COOKIE_NAME, { domain: 'reserly.mx' });
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
        relations: ['businessUser', 'businessUser.business']
      });

      // if (req.app.socketIo) {
      //   req.app.socketIo.in(user?.businessUser.businessId).emit('saludo', { menssage: 'Nueva notificacion' });
      // }

      // if (req.socketIo) {
      //   req.socketIo.emit('saludo', { message: 'Hola mundo' });
      // }

      
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
}

export default UserController;