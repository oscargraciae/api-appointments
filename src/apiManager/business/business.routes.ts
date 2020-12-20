import { Router } from "express";
import { isAuth } from "../../middleware/isAuthManager";

import BusinessController from './business.controller';

const business = new BusinessController();

const router = Router();

router.get('/', isAuth, business.getBusiness)
router.post('/', isAuth, business.create)
router.put('/:id', isAuth, business.update)

export default router;