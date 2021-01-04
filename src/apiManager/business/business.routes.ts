import { Router } from "express";
import { isAuth } from "../../middleware/isAuthManager";

import BusinessController from './business.controller';

const business = new BusinessController();

const router = Router();

router.get('/', isAuth, business.getBusiness)
router.post('/', isAuth, business.create)
router.put('/:id', isAuth, business.update)

router.post('/:id/hours', isAuth, business.createHours)
router.get('/:id/hours', isAuth, business.getHours)

export default router;