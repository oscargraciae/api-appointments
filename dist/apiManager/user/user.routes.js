"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const isAuthManager_1 = require("../../middleware/isAuthManager");
const user_controller_1 = __importDefault(require("./user.controller"));
const router = express_1.Router();
const user = new user_controller_1.default();
router.get('/', isAuthManager_1.isAuth, user.getUser);
router.post('/', user.create);
router.get('/auth/logout', isAuthManager_1.isAuth, user.logout);
router.post('/auth', user.login);
exports.default = router;
//# sourceMappingURL=user.routes.js.map