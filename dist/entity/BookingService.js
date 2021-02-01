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
exports.BookingService = void 0;
const typeorm_1 = require("typeorm");
const Booking_1 = require("./Booking");
const BusinessService_1 = require("./BusinessService");
let BookingService = class BookingService extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], BookingService.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], BookingService.prototype, "nameService", void 0);
__decorate([
    typeorm_1.Column("decimal", { precision: 10, scale: 0, default: 0 }),
    __metadata("design:type", Number)
], BookingService.prototype, "priceService", void 0);
__decorate([
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], BookingService.prototype, "timeService", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], BookingService.prototype, "bookingId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Booking_1.Booking, booking => booking.bookingService),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Booking_1.Booking)
], BookingService.prototype, "booking", void 0);
__decorate([
    typeorm_1.ManyToOne(() => BusinessService_1.BusinessService),
    typeorm_1.JoinColumn(),
    __metadata("design:type", BusinessService_1.BusinessService)
], BookingService.prototype, "businessService", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], BookingService.prototype, "businessServiceId", void 0);
BookingService = __decorate([
    typeorm_1.Entity({ name: 'booking_services' })
], BookingService);
exports.BookingService = BookingService;
//# sourceMappingURL=BookingService.js.map