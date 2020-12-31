import { Response } from "express";

import { BusinessUser } from "../../entity/BusinessUser";
import { Business } from "../../entity/Business";
import { BusinessHour } from "../../entity/BusinessHour";

import { MyRequest } from "../../config/types";
import { getConnection } from "typeorm";

class BusinessController {

  async getBusiness(req: MyRequest, res: Response) {
    try {
      // const business = await BusinessUser.findOne({
      //   where: { userId: req.session.userId },
      //   relations: ['business']
      // });

      // const business = await Business.findOne({
      //   // where: { userId: req.session.userId },
      //   relations: ['businessUser'],
      //   where: {
      //     businessUser: {
      //       userId: req.session.userId,
      //     }
      // }
      //   // where: { 'businessUser.userId': req.session.id },
      // });

      const business = await getConnection()
        .getRepository(Business)
        .createQueryBuilder('business')
        .leftJoinAndSelect('business.businessUser', 'businessUser')
        // .where('businessUser.userId', req.session.userId)
        .where("businessUser.userId = :userId", { userId: req.session.userId })
        .getOne();

      return res.json({
        success: true,
        business,
      })
    } catch (error) {
      return res.json({ success: false, message: error.message });
    }
  }

  async create(req: MyRequest, res: Response) {
    let business : Business;
    try {
      const body: Business = req.body;
      business = await Business.create(body).save();
      if (!business) {
        return res.json({ success: false });
      }

      await BusinessUser.create({ userId: req.session.userId, businessId: business.id }).save();

      return res.json({ success: true, business })
    } catch (error) {
      await Business.delete({ id: business.id })
      return res.json({ success: false, message: error.message });
    }
  }

  async update(req: MyRequest, res: Response) {
    try {
      // Con este query se consulta el negocio realacionado al usuario que esta en sesion
      // const business = await getConnection()
      //   .getRepository(Business)
      //   .createQueryBuilder("businesses")
      //   .leftJoinAndSelect("businesses.businessUser", "business_user")
      //   .where("business_user.user = :id", { id: req.session.userId })
      //   .getOne();

      
      // Actualizacion con Typeorm Repository
      // const business = await getConnection()
      //   .getRepository(Business)
      //   .update({ id: 5 }, { name: 'Esta es una prueba para actualizar' })
      
      const id : number = Number(req.params.id);
      const business = await Business.update({ id }, { ...req.body });
      
      return res.json({success: true, business });
    } catch (error) {
      return res.json({
        success: false,
        message: error.message,
      })
    }
  }

  async createHours(req: MyRequest, res: Response) {
    try {
      console.log('Body', req.body);
      
      const values : BusinessHour[] = req.body.days;
      const businessId : number = Number(req.params.id);
      const businessHrs = await BusinessHour.findOne({ where: { businessId } })
      if (businessHrs) {
        await BusinessHour.delete({ businessId });
      }

      console.log('Valores a insertar', values);
      
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(BusinessHour)
        .values(values)
        .execute();
      return res.json({ success: true, values });
    } catch (error) {
      return res.json({ success: false, message: error.message });
    }
  }

}

export default BusinessController;