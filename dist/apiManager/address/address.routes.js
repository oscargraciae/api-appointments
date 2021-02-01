"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const address_controller_1 = require("./address.controller");
const isAuthManager_1 = require("../../middleware/isAuthManager");
const router = express_1.Router({ mergeParams: true });
const address = new address_controller_1.AddressController();
router.post('/', isAuthManager_1.isAuth, address.create);
router.put('/:id', isAuthManager_1.isAuth, address.update);
router.get('/', isAuthManager_1.isAuth, address.get);
exports.default = router;
//# sourceMappingURL=address.routes.js.map