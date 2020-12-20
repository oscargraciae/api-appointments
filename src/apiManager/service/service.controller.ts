import { Response } from "express";

import { MyRequest } from "../../config/types";

import { BusinessUser } from "../../entity/BusinessUser";
import { BusinessService } from "../../entity/BusinessService";

export class ServiceController {
  async create(req: MyRequest, res: Response)  {
    try {
      const body : BusinessService = req.body;
      const bussinesUser = await BusinessUser.findOne({ where: { userId: req.session.userId } });
      if(!bussinesUser) {
        return res.json({ success: false, message: 'User not found in this business.' });
      }
      
      const service = await BusinessService.create({...body, businessId: bussinesUser.businessId }).save();
      return res.json({ success: true, service })
    } catch (error) {
      return res.json({ success: false, message: error.message });
    }
  }

  async getAll(req: MyRequest, res: Response) {
    try {
      const services = await BusinessService.find({ where: { businessId: req.businessUser.businessId } });

      return res.json({ success: true, services });
    } catch (error) {
      return res.json({
        success: false,
        message: error.messsage,
      });
    }
  }
}