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
exports.ServiceController = void 0;
const BusinessService_1 = require("../../entity/BusinessService");
class ServiceController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const businessId = Number(req.params.businessId);
                const services = yield BusinessService_1.BusinessService.find({ where: { businessId, isActive: true }, order: { id: 'DESC' } });
                return res.json({ success: true, services });
            }
            catch (error) {
                return res.json({
                    success: false,
                    message: error.messsage,
                });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const businessId = Number(req.params.businessId);
                const service = yield BusinessService_1.BusinessService.create(Object.assign(Object.assign({}, body), { businessId })).save();
                return res.json({ success: true, service });
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
                const service = yield BusinessService_1.BusinessService.update({ id }, body);
                return res.json({ success: true, service });
            }
            catch (error) {
                return res.json({ success: false, message: error.message });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                yield BusinessService_1.BusinessService.update({ id }, { isActive: false });
                return res.json({ success: true });
            }
            catch (error) {
                return res.json({ success: false, message: error.message });
            }
        });
    }
}
exports.ServiceController = ServiceController;
//# sourceMappingURL=service.controller.js.map