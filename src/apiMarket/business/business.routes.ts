import { Router } from "express";

import BusinessController from './business.controller';

const business = new BusinessController();

const router = Router();

router.get('/', business.getBusiness)
router.get('/:id', business.get)

router.get('/:id/photos', business.getPhotos)

export default router;