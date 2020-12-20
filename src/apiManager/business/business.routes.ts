import { Router } from "express";

import BusinessController from './business.controller';

const business = new BusinessController();

const router = Router();

router.get('/', business.getBusiness)
router.post('/', business.create)
router.put('/:id', business.update)

export default router;