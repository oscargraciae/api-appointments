import { Response } from "express";

import { MyRequest } from "../../config/types";
import { BusinessService } from "../../entity/BusinessService";

export class ServiceController {
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

  async create(req: MyRequest, res: Response)  {
    try {
      const body : BusinessService = req.body;
  
      const service = await BusinessService.create({...body, businessId: req.businessUser.businessId }).save();
      return res.json({ success: true, service })
    } catch (error) {
      return res.json({ success: false, message: error.message });
    }
  }

  async update(req: MyRequest, res: Response) {
    try {
      const id: number = Number(req.params.id);
      const service = await BusinessService.update({ id }, req.body);
      return res.json({ success: true, service });
    } catch (error) {
      return res.json({ success: false, message: error.message });
    }
  }
  
}