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
const typeorm_1 = require("typeorm");
const Booking_1 = require("../../entity/Booking");
const Business_1 = require("../../entity/Business");
const BusinessFile_1 = require("../../entity/BusinessFile");
const business_service_1 = require("./business.service");
class BusinessController {
    getBusiness(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { lat, lng, categoryId, zoom } = req.query;
                let kms = 5;
                if (zoom) {
                    kms = 40000 / Math.pow(2, zoom) * 2;
                    console.log('kms', kms);
                }
                if (!lat && lng) {
                    lat = 25.6866142;
                    lng = -100.3161126;
                }
                const business = yield new business_service_1.BusinessService().getAll(kms, { lat, lng }, categoryId);
                return res.json({
                    success: true,
                    business,
                });
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
                const business = yield typeorm_1.getConnection()
                    .getRepository(Business_1.Business)
                    .createQueryBuilder('business')
                    .leftJoinAndSelect('business.businessAddress', 'businessAddress')
                    .leftJoinAndSelect('business.businessCategory', 'businessCategory')
                    .leftJoinAndSelect('business.businessService', 'businessService', 'businessService.isActive = true')
                    .leftJoinAndSelect('business.hours', 'hours')
                    .where("business.id = :id", { id })
                    .getOne();
                return res.json({ success: true, business });
            }
            catch (error) {
                return res.json({ success: false, message: error.message });
            }
        });
    }
    getAvailableTime(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { startTime, endTime } = req.query;
                const bookings = yield Booking_1.Booking.find({ where: { businessId: req.params.id, bookingDate: typeorm_1.Between(startTime, endTime) } });
                return res.json({ bookings });
            }
            catch (error) {
                return res.json({ success: false, message: error.message });
            }
        });
    }
    getPhotos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const businessId = Number(req.params.id);
                const photos = yield BusinessFile_1.BusinessFile.find({ where: { businessId } });
                return res.json({ success: true, photos });
            }
            catch (error) {
                return res.json({ success: false, message: error.message });
            }
        });
    }
}
exports.default = BusinessController;
//# sourceMappingURL=business.controller.js.map