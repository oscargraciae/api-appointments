import { Router } from "express";

import BusinessController from './business.controller';

const business = new BusinessController();

const router = Router();

router.get('/', business.getBusiness)
router.get('/:id', business.get)

export default router;