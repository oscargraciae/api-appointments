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
exports.SeedCategory1608408956016 = void 0;
const BusinessCategory_1 = require("src/entity/BusinessCategory");
class SeedCategory1608408956016 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            BusinessCategory_1.BusinessCategory.create({ name: 'Pendiente' }).save();
            BusinessCategory_1.BusinessCategory.create({ name: 'Aceptada' }).save();
            BusinessCategory_1.BusinessCategory.create({ name: 'Terminada' }).save();
            BusinessCategory_1.BusinessCategory.create({ name: 'Cancelada' }).save();
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.SeedCategory1608408956016 = SeedCategory1608408956016;
//# sourceMappingURL=1608408956016-SeedCategory.js.map