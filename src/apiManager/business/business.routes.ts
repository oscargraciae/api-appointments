import { S3 } from "aws-sdk";
import { Router } from "express";
import multer from 'multer';
import multerS3 from 'multer-s3'
import path from 'path';
import { MyRequest } from "src/config/types";
import { v4 as uuidv4 } from 'uuid';

import { isAuth } from "../../middleware/isAuthManager";

import BusinessController from './business.controller';

const business = new BusinessController();

const router = Router();

// const s3 = new S3({ region: 'us-east-2', credentials: { accessKeyId: 'AKIAX64L7XCVTA7JXFEM', secretAccessKey: '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' } });

// var upload = multer({ 
//     storage: multerS3({
//     s3: s3,
//     bucket: 'reserly-dev',
//     acl: 'public-read',
//     metadata: function (req :MyRequest, file, cb) {
//       cb(null, {fieldName: file.originalname});
//     },
//     key: function (req, file, cb) {
//       const { businessId } = req.user.businessUser;
//       const fileName = `${businessId}-${uuidv4()}${path.extname(file.originalname)}`
//       cb(null, `${businessId}/${fileName}`)
//     },
//   }),
//   limits: { fileSize: 10 },
  
//   // fileFilter: () => {

//   // }
// })
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