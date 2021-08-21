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
const mails_1 = require("../../mails/mails");
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
                const { status, statuses, dateEnd, startDate } = req.query;
                const where = {};
                console.log('req.user.businessUser.businessId', req.user.businessUser.businessId);
                where.businessId = req.user.businessUser.businessId;
                if (statuses) {
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
                    relations: ['customer', 'bookingStatus'],
                    order: { id: 'DESC' }
                });
                console.log('bookings', bookings);
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
                    relations: ['customer', 'bookingStatus', 'bookingService', 'bookingService.businessService'],
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
    bookingAccepted(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const booking = yield Booking_1.Booking.update({ id }, { bookingStatusId: 2 });
                const bookingDetail = yield Booking_1.Booking.findOne({
                    where: { id },
                    relations: ['customer', 'business'],
                });
                if (bookingDetail) {
                    mails_1.sendMailNotificationCustomer(bookingDetail, bookingDetail.customer.email, 'Aceptada');
                }
                return res.json({ success: true, booking });
            }
            catch (error) {
                return res.json({ success: false, message: error.message });
            }
        });
    }
    bookingCanceled(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const booking = yield Booking_1.Booking.update({ id }, { bookingStatusId: 3 });
                const bookingDetail = yield Booking_1.Booking.findOne({
                    where: { id },
                    relations: ['customer', 'business'],
                });
                if (bookingDetail) {
                    mails_1.sendMailNotificationCustomer(bookingDetail, bookingDetail.customer.email, 'Cancelada');
                }
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