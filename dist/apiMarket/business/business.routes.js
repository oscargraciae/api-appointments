"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const business_controller_1 = __importDefault(require("./business.controller"));
const business = new business_controller_1.default();
const router = express_1.Router();
router.get('/', business.getBusiness);
router.get('/:id', business.get);
router.get('/:id/photos', business.getPhotos);
exports.default = router;
//# sourceMappingURL=business.routes.js.map