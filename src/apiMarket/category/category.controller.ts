import { Response } from "express";

import { BusinessCategory } from "../../entity/BusinessCategory";
import { MyRequest } from "../../config/types";

export class CategoryController {
  async getAll(req: MyRequest, res: Response) {
    try {
      const categories = await BusinessCategory.find();
      return res.json({
        success: true,
        categories,
      });
    } catch (error) {
      return res.json({ success: false, message: error.message, categories: [] });
    }
  }
}