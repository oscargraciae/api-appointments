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
const BookingService_1 = require("../../entity/BookingService");
const Booking_1 = require("../../entity/Booking");
class BookingController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const bodyServices = req.body.businessServices;
                const bodyBooking = req.body;
                const totalPrice = bodyServices.reduce((total, service) => total + Number(service.price), 0);
                console.log('PRECIO TOTAL', totalPrice);
                const booking = yield Booking_1.Booking.create(Object.assign(Object.assign({}, bodyBooking), { customerId: req.session.userId, bookingStatusId: 1, totalPrice: totalPrice })).save();
                bodyServices.forEach((item) => {
                    BookingService_1.BookingService.create({ businessServiceId: item.id, bookingId: booking.id, nameService: item.name, priceService: item.price, timeService: item.time }).save();
                });
                if (req.app.socketIo && bodyBooking.businessId) {
                    console.log('Emitiendo una reservacion', bodyBooking.businessId);
                    req.app.socketIo.in(bodyBooking.businessId).emit('new-booking', { booking });
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