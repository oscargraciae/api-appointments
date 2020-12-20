import { Response } from "express";

import { BusinessUser } from "../../entity/BusinessUser";
import { Business } from "../../entity/Business";

import { MyRequest } from "../../config/types";

class BusinessController {

  async getBusiness(req: MyRequest, res: Response) {
    try {
      const business = await BusinessUser.findOne({
        where: { userId: req.session.userId },
        relations: ['business']
      });

      return res.json({
        success: true,
        business,
      })
    } catch (error) {
      return res.json({ success: false, message: error.message });
    }
  }

  async create(req: MyRequest, res: Response) {
    try {
      const body: Business = req.body;
      const business = await Business.create(body).save();
      if (!business) {
        return res.json({ success: false });
      }

      await BusinessUser.create({ userId: req.session.userId, businessId: business.id }).save();

      return res.json({ success: true, business })
    } catch (error) {
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
      
      return res.json({ business });
    } catch (error) {
      return res.json({
        success: false,
        message: error.message,
      })
    }
  }

}

export default BusinessController;