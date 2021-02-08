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
exports.CustomerController = void 0;
const typeorm_1 = require("typeorm");
const Booking_1 = require("../../entity/Booking");
const User_1 = require("../../entity/User");
class CustomerController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customers = yield typeorm_1.getConnection()
                    .getRepository(User_1.User)
                    .createQueryBuilder("user")
                    .leftJoinAndSelect(Booking_1.Booking, "booking", "booking.customer_id = user.id")
                    .select('user.firstName as "firstName", user.lastName as "lastName", user.phone, booking.createdAt as "bookingCreatedAt"')
                    .distinctOn(['user.id'])
                    .where('booking.businessId = :businessId', { businessId: req.user.businessUser.businessId })
                    .orderBy('user.id, booking.createdAt', 'DESC')
                    .getRawMany();
                console.log('customers', customers);
                return res.json({
                    success: true,
                    customers,
                });
            }
            catch (error) {
                return res.json({ success: false, message: error.message, customers: [] });
            }
        });
    }
}
exports.CustomerController = CustomerController;
//# sourceMappingURL=customer.controller.js.map