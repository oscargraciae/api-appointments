"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const BusinessUser_1 = require("../../entity/BusinessUser");
const Business_1 = require("../../entity/Business");
const BusinessHour_1 = require("../../entity/BusinessHour");
const typeorm_1 = require("typeorm");
class BusinessController {
    getBusiness(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const business = yield typeorm_1.getConnection()
                    .getRepository(Business_1.Business)
                    .createQueryBuilder('business')
                    .leftJoinAndSelect('business.businessUser', 'businessUser')
                    .where("businessUser.userId = :userId", { userId: req.session.userId })
                    .getOne();
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
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let business;
            var bussinessId = 0;
            try {
                const body = req.body;
                business = yield Business_1.Business.create(body).save();
                if (!business) {
                    return res.json({ success: false });
                }
                bussinessId = business.id;
                yield BusinessUser_1.BusinessUser.create({ userId: req.session.userId, businessId: business.id }).save();
                return res.json({ success: true, business });
            }
            catch (error) {
                yield Business_1.Business.delete({ id: bussinessId });
                return res.json({ success: false, message: error.message });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const business = yield Business_1.Business.update({ id }, Object.assign({}, req.body));
                return res.json({ success: true, business });
            }
            catch (error) {
                return res.json({
                    success: false,
                    message: error.message,
                });
            }
        });
    }
    createHours(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('Body', req.body);
                const values = req.body.days;
                const businessId = Number(req.params.id);
                const businessHrs = yield BusinessHour_1.BusinessHour.findOne({ where: { businessId } });
                if (businessHrs) {
                    yield BusinessHour_1.BusinessHour.delete({ businessId });
                }
                console.log('Valores a insertar', values);
                yield typeorm_1.getConnection()
                    .createQueryBuilder()
                    .insert()
                    .into(BusinessHour_1.BusinessHour)
                    .values(values)
                    .execute();
                return res.json({ success: true, values });
            }
            catch (error) {
                return res.json({ success: false, message: error.message });
            }
        });
    }
    getHours(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const businessId = Number(req.params.id);
                const hours = yield BusinessHour_1.BusinessHour.find({ where: { businessId }, order: { dayOfWeek: 'ASC' } });
                return res.json({ success: true, hours });
            }
            catch (error) {
                return res.json({ success: false, message: error.messahe });
            }
        });
    }
}
exports.default = BusinessController;
//# sourceMappingURL=business.controller.js.map