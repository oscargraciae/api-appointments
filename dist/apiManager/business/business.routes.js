"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const isAuthManager_1 = require("../../middleware/isAuthManager");
const business_controller_1 = __importDefault(require("./business.controller"));
const business = new business_controller_1.default();
const router = express_1.Router();
const inMemoryStorage = multer_1.default.memoryStorage();
var upload = multer_1.default({ storage: inMemoryStorage });
router.get('/', isAuthManager_1.isAuth, business.getBusiness);
router.post('/', isAuthManager_1.isAuth, business.create);
router.put('/:id', isAuthManager_1.isAuth, business.update);
router.post('/:id/hours', isAuthManager_1.isAuth, business.createHours);
router.get('/:id/hours', isAuthManager_1.isAuth, business.getHours);
router.get('/upload/photos', isAuthManager_1.isAuth, business.getPhotos);
router.delete('/upload/photos/:id', isAuthManager_1.isAuth, business.deletePhoto);
router.post('/upload/cover', isAuthManager_1.isAuth, upload.single('file'), business.uploadCover);
router.post('/upload/photos', isAuthManager_1.isAuth, upload.array('files'), business.uploadPhotos);
exports.default = router;
//# sourceMappingURL=business.routes.js.map