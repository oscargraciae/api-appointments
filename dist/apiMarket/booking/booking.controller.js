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
const BookingService_1 = require("../../entity/BookingService");
const Booking_1 = require("../../entity/Booking");
const mails_1 = require("../../mails/mails");
class BookingController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { endDate, startDate, statuses } = req.query;
                let where = {};
                if (endDate) {
                    where.bookingDate = typeorm_1.MoreThanOrEqual(endDate);
                }
                if (startDate) {
                    where.bookingDate = typeorm_1.LessThan(startDate);
                }
                if (statuses) {
                    where.bookingStatusId = typeorm_1.In(statuses);
                }
                const bookings = yield Booking_1.Booking.find({
                    where: Object.assign({ customerId: req.session.userId }, where),
                    relations: ['business'],
                    order: { createdAt: 'DESC' },
                });
                return res.json({ success: true, bookings });
            }
            catch (error) {
                return res.json({ succes: false, message: error.message });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bodyServices = req.body.businessServices;
                const bodyBooking = req.body;
                const totalPrice = bodyServices.reduce((total, service) => total + Number(service.price), 0);
                const booking = yield Booking_1.Booking.create(Object.assign(Object.assign({}, bodyBooking), { customerId: req.session.userId, bookingStatusId: 1, totalPrice: totalPrice })).save();
                bodyServices.forEach((item) => {
                    BookingService_1.BookingService.create({ businessServiceId: item.id, bookingId: booking.id, nameService: item.name, priceService: item.price, timeService: item.time }).save();
                });
                if (booking) {
                    const data = yield Booking_1.Booking.findOne({
                        where: { id: booking.id },
                        relations: ['customer', 'business', 'business.businessUser', 'business.businessUser.user'],
                    });
                    console.log('Datos de negocio', JSON.stringify(data));
                    if (data) {
                        mails_1.sendMailReservation(data);
                    }
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