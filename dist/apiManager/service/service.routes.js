"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const isAuthManager_1 = require("../../middleware/isAuthManager");
const service_controller_1 = require("./service.controller");
const router = express_1.Router({ mergeParams: true });
const service = new service_controller_1.ServiceController();
router.get('/', isAuthManager_1.isAuth, service.getAll);
router.post('/', isAuthManager_1.isAuth, service.create);
router.put('/:id', isAuthManager_1.isAuth, service.update);
router.delete('/:id', isAuthManager_1.isAuth, service.delete);
exports.default = router;
//# sourceMappingURL=service.routes.js.map