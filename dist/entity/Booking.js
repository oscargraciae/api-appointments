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
exports.Booking = void 0;
const typeorm_1 = require("typeorm");
const BookingService_1 = require("./BookingService");
const BookingStatus_1 = require("./BookingStatus");
const Business_1 = require("./Business");
const User_1 = require("./User");
let Booking = class Booking extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Booking.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('timestamp with time zone'),
    __metadata("design:type", Date)
], Booking.prototype, "bookingDate", void 0);
__decorate([
    typeorm_1.Column('time with time zone'),
    __metadata("design:type", Date)
], Booking.prototype, "bookingTime", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Booking.prototype, "message", void 0);
__decorate([
    typeorm_1.Column({ default: true }),
    __metadata("design:type", Boolean)
], Booking.prototype, "isActive", void 0);
__decorate([
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], Booking.prototype, "totalTime", void 0);
__decorate([
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], Booking.prototype, "totalPrice", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, user => user.bookings),
    typeorm_1.JoinColumn(),
    __metadata("design:type", User_1.User)
], Booking.prototype, "customer", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Booking.prototype, "customerId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Business_1.Business),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Business_1.Business)
], Booking.prototype, "business", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Booking.prototype, "businessId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => BookingStatus_1.BookingStatus, bookingStatus => bookingStatus.bookings),
    __metadata("design:type", BookingStatus_1.BookingStatus)
], Booking.prototype, "bookingStatus", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Booking.prototype, "bookingStatusId", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Object)
], Booking.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Object)
], Booking.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.OneToMany(() => BookingService_1.BookingService, bookingService => bookingService.booking),
    __metadata("design:type", BookingService_1.BookingService)
], Booking.prototype, "bookingService", void 0);
Booking = __decorate([
    typeorm_1.Entity({ name: 'bookings' })
], Booking);
exports.Booking = Booking;
//# sourceMappingURL=Booking.js.map