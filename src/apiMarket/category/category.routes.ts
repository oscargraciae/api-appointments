import { Router } from "express";

import { CategoryController } from "./category.controller";

const category = new CategoryController();

const router = Router();

router.get('/', category.getAll)

export default router;