import { Response } from "express";

import { Business } from "../../entity/Business";

import { MyRequest } from "../../config/types";
import { getConnection } from "typeorm";

class BusinessController {

  async getBusiness(_: MyRequest, res: Response) {
    try {
      const business = await Business.find({
        where: { isActive: true },
        relations: ['businessAddress']
      });
      return res.json({
        success: true,
        business,
      })
    } catch (error) {
      return res.json({ success: false, message: error.message });
    }
  }
  
  async get(req: MyRequest, res: Response) {
    try {
      const id : number = Number(req.params.id);
      // const business = await Business.findOne({
      //   where: { id },
      //   relations: ['businessAddress', 'businessCategory', 'hours', 'bussinessService'],
      // });
      const business = await getConnection()
        .getRepository(Business)
        .createQueryBuilder('business')
        .leftJoinAndSelect('business.businessAddress', 'businessAddress')
        .leftJoinAndSelect('business.businessCategory', 'businessCategory')
        .leftJoinAndSelect('business.businessService', 'businessService', 'businessService.isActive = true')
        .leftJoinAndSelect('business.hours', 'hours')
        .where("business.id = :id", { id })
        .getOne();

      return res.json({
        success: true,
        business,
        mensaje: 'Hola prueba cambio de docker r'
      })
    } catch (error) {
      return res.json({ success: false, message: error.message });
    }
  }

}

export default BusinessController;