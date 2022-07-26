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
exports.BookingStatus = void 0;
const typeorm_1 = require("typeorm");
const Booking_1 = require("./Booking");
let BookingStatus = class BookingStatus extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], BookingStatus.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BookingStatus.prototype, "name", void 0);
__decorate([
    typeorm_1.OneToMany(() => Booking_1.Booking, booking => booking.bookingStatus),
    __metadata("design:type", Array)
], BookingStatus.prototype, "bookings", void 0);
BookingStatus = __decorate([
    typeorm_1.Entity({ name: 'booking_statuses' })
], BookingStatus);
exports.BookingStatus = BookingStatus;
//# sourceMappingURL=BookingStatus.js.map