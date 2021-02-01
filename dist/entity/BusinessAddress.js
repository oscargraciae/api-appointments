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
exports.BusinessAddress = void 0;
const typeorm_1 = require("typeorm");
const Business_1 = require("./Business");
let BusinessAddress = class BusinessAddress extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], BusinessAddress.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], BusinessAddress.prototype, "street", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], BusinessAddress.prototype, "area", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], BusinessAddress.prototype, "zipcode", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], BusinessAddress.prototype, "city", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], BusinessAddress.prototype, "state", void 0);
__decorate([
    typeorm_1.Column("float"),
    __metadata("design:type", Number)
], BusinessAddress.prototype, "lat", void 0);
__decorate([
    typeorm_1.Column("float"),
    __metadata("design:type", Number)
], BusinessAddress.prototype, "lng", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BusinessAddress.prototype, "addressMap", void 0);
__decorate([
    typeorm_1.OneToOne(() => Business_1.Business, business => business.businessAddress),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Business_1.Business)
], BusinessAddress.prototype, "business", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], BusinessAddress.prototype, "businessId", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Object)
], BusinessAddress.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Object)
], BusinessAddress.prototype, "updatedAt", void 0);
BusinessAddress = __decorate([
    typeorm_1.Entity({ name: 'business_addresses' })
], BusinessAddress);
exports.BusinessAddress = BusinessAddress;
//# sourceMappingURL=BusinessAddress.js.map