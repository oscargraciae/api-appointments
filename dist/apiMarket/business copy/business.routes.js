"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const isAuthManager_1 = require("../../middleware/isAuthManager");
const business_controller_1 = __importDefault(require("./business.controller"));
const business = new business_controller_1.default();
const router = express_1.Router();
router.get('/', isAuthManager_1.isAuth, business.getBusiness);
router.post('/', isAuthManager_1.isAuth, business.create);
router.put('/:id', isAuthManager_1.isAuth, business.update);
router.post('/:id/hours', isAuthManager_1.isAuth, business.createHours);
router.get('/:id/hours', isAuthManager_1.isAuth, business.getHours);
exports.default = router;
//# sourceMappingURL=business.routes.js.map