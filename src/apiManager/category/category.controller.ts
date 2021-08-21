import { Response } from "express";

import { BusinessCategory } from "../../entity/BusinessCategory";
import { MyRequest } from "../../config/types";

export class CategoryController {

  async getAll(_req: MyRequest, res: Response) {
    try {
      const categories = await BusinessCategory.find({ order: { id: "ASC" } });
      return res.json({
        success: true,
        categories,
      });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message, categories: [] });
    }
  }
}