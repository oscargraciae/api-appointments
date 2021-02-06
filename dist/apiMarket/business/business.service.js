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
exports.BusinessService = void 0;
const typeorm_1 = require("typeorm");
const Business_1 = require("../../entity/Business");
class BusinessService {
    getAll(coords, categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { lat, lng } = coords;
            return yield typeorm_1.getConnection()
                .getRepository(Business_1.Business)
                .createQueryBuilder('business')
                .where(categoryId ? `business.businessCategoryId = :categoryId` : '1=1', { categoryId })
                .andWhere('business.isPublic = true')
                .innerJoinAndSelect('business.businessCategory', 'businessCategory')
                .innerJoinAndSelect('business.businessAddress', 'businessAddress', '(6371 * acos(cos(radians(:lat)) * cos(radians(lat)) * cos(radians(:lng) - radians(lng)) + sin(radians(:lat)) * sin(radians(lat)))) <= 5', { lat, lng })
                .getMany();
        });
    }
}
exports.BusinessService = BusinessService;
//# sourceMappingURL=business.service.js.map