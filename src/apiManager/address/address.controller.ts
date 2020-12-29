import { Response } from "express";
import { MyRequest } from "src/config/types";
import { BusinessAddress } from "../../entity/BusinessAddress";

export class AddressController {
  async create(req: MyRequest, res: Response) {
    try {
      const body : BusinessAddress = req.body;
      const businessId :number = Number(req.params.businessId);
      const address = await BusinessAddress.create({ ...body, businessId }).save();
      return res.json({ success: true, address })
    } catch (error) {
      return res.json({ success: false, message: error.message });
    }
  }

  async update(req: MyRequest, res: Response) {
    try {
      const body : BusinessAddress = req.body;
      const id :number = Number(req.params.id);
      await BusinessAddress.update({ id }, body);
      return res.json({ success: true });
    } catch (error) {
      return res.json({ success: false, message: error.message });
    }
  }

  async get(req: MyRequest, res: Response) {
    try {
      const businessId :number = Number(req.params.businessId);
      const address = await BusinessAddress.findOne({ where: { businessId } });
      return res.json({ success: true, address });
    } catch (error) {
      return res.json({ success: false, message: error.message });
    }
  }
}