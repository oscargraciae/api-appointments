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
exports.CategoryController = void 0;
const BusinessCategory_1 = require("../../entity/BusinessCategory");
class CategoryController {
    getAll(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield BusinessCategory_1.BusinessCategory.find({ order: { id: "ASC" } });
                return res.json({
                    success: true,
                    categories,
                });
            }
            catch (error) {
                return res.status(400).json({ success: false, message: error.message, categories: [] });
            }
        });
    }
}
exports.CategoryController = CategoryController;
//# sourceMappingURL=category.controller.js.map