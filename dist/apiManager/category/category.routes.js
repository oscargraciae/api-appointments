"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = require("./category.controller");
const category = new category_controller_1.CategoryController();
const router = express_1.Router();
router.get('/', category.getAll);
exports.default = router;
//# sourceMappingURL=category.routes.js.map