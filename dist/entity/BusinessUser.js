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
exports.BusinessUser = void 0;
const typeorm_1 = require("typeorm");
const Business_1 = require("./Business");
const User_1 = require("./User");
let BusinessUser = class BusinessUser extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], BusinessUser.prototype, "id", void 0);
__decorate([
    typeorm_1.OneToOne(() => User_1.User, user => user.businessUser),
    typeorm_1.JoinColumn(),
    __metadata("design:type", User_1.User)
], BusinessUser.prototype, "user", void 0);
__decorate([
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", Number)
], BusinessUser.prototype, "userId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Business_1.Business, business => business.businessUser),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Business_1.Business)
], BusinessUser.prototype, "business", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], BusinessUser.prototype, "businessId", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Object)
], BusinessUser.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Object)
], BusinessUser.prototype, "updatedAt", void 0);
BusinessUser = __decorate([
    typeorm_1.Entity({ name: 'business_users' })
], BusinessUser);
exports.BusinessUser = BusinessUser;
//# sourceMappingURL=BusinessUser.js.map