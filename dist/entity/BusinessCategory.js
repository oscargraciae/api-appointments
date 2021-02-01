"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessCategory = void 0;
const typeorm_1 = require("typeorm");
const Business_1 = require("./Business");
let BusinessCategory = class BusinessCategory extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], BusinessCategory.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BusinessCategory.prototype, "name", void 0);
__decorate([
    typeorm_1.OneToMany(() => Business_1.Business, business => business.businessCategory),
    __metadata("design:type", Array)
], BusinessCategory.prototype, "business", void 0);
BusinessCategory = __decorate([
    typeorm_1.Entity({ name: 'business_categories' })
], BusinessCategory);
exports.BusinessCategory = BusinessCategory;
//# sourceMappingURL=BusinessCategory.js.map