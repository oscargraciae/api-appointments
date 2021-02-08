"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const isAuthManager_1 = require("../../middleware/isAuthManager");
const booking_controller_1 = require("./booking.controller");
const router = express_1.Router();
const booking = new booking_controller_1.BookingController();
router.post('/', booking.create);
router.get('/', isAuthManager_1.isAuth, booking.getAll);
router.get('/:id', isAuthManager_1.isAuth, booking.get);
router.put('/:id', isAuthManager_1.isAuth, booking.update);
router.put('/:id/accepted', isAuthManager_1.isAuth, booking.bookingAccepted);
router.put('/:id/canceled', isAuthManager_1.isAuth, booking.bookingCanceled);
exports.default = router;
//# sourceMappingURL=booking.routes.js.map