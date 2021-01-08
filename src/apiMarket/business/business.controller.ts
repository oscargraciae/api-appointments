import { Response } from "express";

import { Business } from "../../entity/Business";

import { MyRequest } from "../../config/types";

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

}

export default BusinessController;