"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = void 0;
const typeorm_1 = require("typeorm");
const Booking_1 = require("../../entity/Booking");
class BookingController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const booking = yield Booking_1.Booking.create(Object.assign(Object.assign({}, body), { customerId: req.session.userId, bookingStatusId: 1 })).save();
                return res.json({
                    success: true,
                    booking,
                });
            }
            catch (error) {
                return res.json({ success: false, message: error.message });
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('STATUS', req.query);
                const { status, statuses, dateEnd, startDate } = req.query;
                const where = {};
                where.businessId = req.user.businessUser.businessId;
                if (statuses) {
                    console.log('STATUS', status);
                    console.log('tipo de status', typeof status);
                    where.bookingStatusId = typeorm_1.In(statuses);
                }
                if (status) {
                    where.bookingStatusId = status;
                }
                if (dateEnd) {
                    where.bookingDate = typeorm_1.MoreThanOrEqual(dateEnd);
                }
                if (startDate) {
                    where.bookingDate = typeorm_1.LessThan(startDate);
                }
                const bookings = yield Booking_1.Booking.find({
                    where,
                    relations: ['customer'],
                    order: { id: 'DESC' }
                });
                return res.json({ success: true, bookings });
            }
            catch (error) {
                return res.json({ success: false, message: error.message });
            }
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const booking = yield Booking_1.Booking.findOne({
                    where: { id },
                    relations: ['customer', 'bookingService', 'bookingService.businessService'],
                });
                return res.json({ success: true, booking });
            }
            catch (error) {
                return res.json({ success: false, message: error.message });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const body = req.body;
                const booking = yield Booking_1.Booking.update({ id }, body);
                return res.json({ success: true, booking });
            }
            catch (error) {
                return res.json({ success: false, message: error.message });
            }
        });
    }
}
exports.BookingController = BookingController;
//# sourceMappingURL=booking.controller.js.map