import { Router } from "express";
import multer from 'multer';

import { isAuth } from "../../middleware/isAuthManager";

import BusinessController from './business.controller';

const business = new BusinessController();

const router = Router();

const inMemoryStorage = multer.memoryStorage();
var upload = multer({ storage: inMemoryStorage })

router.get('/', isAuth, business.getBusiness)
router.post('/', isAuth, business.create)
router.put('/:id', isAuth, business.update)

router.post('/:id/hours', isAuth, business.createHours)
router.get('/:id/hours', isAuth, business.getHours)

router.get('/upload/photos', isAuth, business.getPhotos)
router.delete('/upload/photos/:id', isAuth, business.deletePhoto)
router.post('/upload/cover',isAuth, upload.single('file'), business.uploadCover)
router.post('/upload/photos',isAuth, upload.array('files'), business.uploadPhotos)

export default router;