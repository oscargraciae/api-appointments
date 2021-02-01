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
exports.AddressController = void 0;
const BusinessAddress_1 = require("../../entity/BusinessAddress");
class AddressController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const businessId = Number(req.params.businessId);
                const address = yield BusinessAddress_1.BusinessAddress.create(Object.assign(Object.assign({}, body), { businessId })).save();
                return res.json({ success: true, address });
            }
            catch (error) {
                return res.json({ success: false, message: error.message });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const id = Number(req.params.id);
                yield BusinessAddress_1.BusinessAddress.update({ id }, body);
                return res.json({ success: true });
            }
            catch (error) {
                return res.json({ success: false, message: error.message });
            }
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const businessId = Number(req.params.businessId);
                const address = yield BusinessAddress_1.BusinessAddress.findOne({ where: { businessId } });
                return res.json({ success: true, address });
            }
            catch (error) {
                return res.json({ success: false, message: error.message });
            }
        });
    }
}
exports.AddressController = AddressController;
//# sourceMappingURL=address.controller.js.map