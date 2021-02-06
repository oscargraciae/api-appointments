"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const isAuthManager_1 = require("../../middleware/isAuthManager");
const booking_controller_1 = require("./booking.controller");
const router = express_1.Router();
const booking = new booking_controller_1.BookingController();
router.post('/', isAuthManager_1.isAuth, booking.create);
router.get('/', isAuthManager_1.isAuth, booking.getAll);
exports.default = router;
//# sourceMappingURL=booking.routes.js.map