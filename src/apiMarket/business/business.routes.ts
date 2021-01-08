import { Router } from "express";

import BusinessController from './business.controller';

const business = new BusinessController();

const router = Router();

router.get('/', business.getBusiness)

export default router;