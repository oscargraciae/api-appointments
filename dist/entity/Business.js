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
exports.Business = void 0;
const typeorm_1 = require("typeorm");
const BusinessAddress_1 = require("./BusinessAddress");
const BusinessCategory_1 = require("./BusinessCategory");
const BusinessFile_1 = require("./BusinessFile");
const BusinessHour_1 = require("./BusinessHour");
const BusinessService_1 = require("./BusinessService");
const BusinessUser_1 = require("./BusinessUser");
let Business = class Business extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Business.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Business.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Business.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, default: 'https://reserly-dev.s3.us-east-2.amazonaws.com/11-71e78474-351c-4407-88f5-2788c79e9ff2.jpg' }),
    __metadata("design:type", String)
], Business.prototype, "cover", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Business.prototype, "phone", void 0);
__decorate([
    typeorm_1.Column({ default: true }),
    __metadata("design:type", Boolean)
], Business.prototype, "isActive", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], Business.prototype, "isPublic", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], Business.prototype, "isCompleted", void 0);
__decorate([
    typeorm_1.ManyToOne(() => BusinessCategory_1.BusinessCategory, businessCategory => businessCategory.business),
    typeorm_1.JoinColumn(),
    __metadata("design:type", BusinessCategory_1.BusinessCategory)
], Business.prototype, "businessCategory", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Business.prototype, "businessCategoryId", void 0);
__decorate([
    typeorm_1.OneToOne(() => BusinessAddress_1.BusinessAddress, businessAddress => businessAddress.business),
    __metadata("design:type", BusinessAddress_1.BusinessAddress)
], Business.prototype, "businessAddress", void 0);
__decorate([
    typeorm_1.OneToMany(() => BusinessHour_1.BusinessHour, businessHour => businessHour.business),
    __metadata("design:type", Array)
], Business.prototype, "hours", void 0);
__decorate([
    typeorm_1.OneToMany(() => BusinessFile_1.BusinessFile, businessFiles => businessFiles.business),
    __metadata("design:type", Array)
], Business.prototype, "files", void 0);
__decorate([
    typeorm_1.OneToMany(() => BusinessService_1.BusinessService, businessService => businessService.business),
    __metadata("design:type", BusinessService_1.BusinessService)
], Business.prototype, "businessService", void 0);
__decorate([
    typeorm_1.OneToMany(() => BusinessUser_1.BusinessUser, businessUser => businessUser.business),
    __metadata("design:type", Array)
], Business.prototype, "businessUser", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Object)
], Business.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Object)
], Business.prototype, "updatedAt", void 0);
Business = __decorate([
    typeorm_1.Entity({ name: 'businesses' })
], Business);
exports.Business = Business;
//# sourceMappingURL=Business.js.map