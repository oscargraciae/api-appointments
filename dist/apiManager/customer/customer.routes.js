"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const isAuthManager_1 = require("../../middleware/isAuthManager");
const customer_controller_1 = require("./customer.controller");
const router = express_1.Router();
const service = new customer_controller_1.CustomerController();
router.get('/', isAuthManager_1.isAuth, service.getAll);
exports.default = router;
//# sourceMappingURL=customer.routes.js.map