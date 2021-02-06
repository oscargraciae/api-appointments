import { Response } from 'express';
import Redis from 'ioredis';

import { auth } from "../../service/auth";
import { User } from "../../entity/User";
import { MyRequest } from "../../config/types";
import { COOKIE_NAME, DOMAIN_NAME } from '../../config/constants';
import { addContact, sendMailChangePassword, sendMailWelcomeUser } from '../../mails/mails';
import { v4 } from 'uuid';
import { hash } from 'argon2';

class UserController {
  async getUser(req: MyRequest, res: Response) {
    try {
      if (!req.session.userId) return res.json({ success: false, message: 'Unauthorized' });
      const user = await User.findOne({
        where: { id: req.session.userId },
        relations: ['businessUser'],
      });
      if (!user) {
        return res.json({ success: false, message: 'Unauthorized' });
      }
      return res.json({ success: true, user });
    } catch (error) {
     return  res.json({ success: false, message: error.message });
    }
  }  

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
      const us = await User.findOne({ where: { email: userBody.email } });
      if (us) {
        return res.json({ success: false, message: 'Lo sentimos, este correo electrónico ya esta registrado.' })
      }

      const user = await User.create(userBody).save();
      if (!user) {
        return res.json({ success: false, message: 'Error al registrar el usuario.' })
      }
      
      req.session!.userId = user.id;

      if (user) {
        sendMailWelcomeUser(user);
        addContact(user);
      }

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
        res.clearCookie(COOKIE_NAME, { domain: DOMAIN_NAME });
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

  async forgotPassword(req: MyRequest, res: Response) {
    try {
      console.log('req.params.email', req.body.email);
      // const client = redis;
      const redis = new Redis();
      
      const email = req.body.email;
      const user = await User.findOne({ where: { email } })
      
      // client.get("key", redis.print);

      if (user) {
        const token = v4();
        const time  = 1000 * 60 * 60 * 24;
        await redis.set(`forgot-password: ${token}`, user.id.toString(), 'ex', time);
        sendMailChangePassword(user, token);
      } else {
        return res.json({ success: false, message: 'Este correo electrónico no está registrado.' });  
      }
      return res.json({ success: true });
    } catch (error) {
      return res.json({ success: false, message: error.message });
    }
  }

  async changePassword(req: MyRequest, res: Response) {
    try {
      const redis = new Redis();
      const { token, password } = req.body;
      // const userId = await client.get(`forgot-password: ${token}`);
      const userId = await redis.get(`forgot-password: ${token}`);
      if (userId) {
        const passordHash = await hash(password);
        await User.update({ id: parseInt(userId) }, { password: passordHash });
      } else {
        return res.json({ success: false, message: 'Este enlace ya no esta disponible.' });  
      }
      

      return res.json({ success: true, token, userId });
    } catch (error) {
      return res.json({ success: false, message: error.message });
    }
  }

}

export default UserController;