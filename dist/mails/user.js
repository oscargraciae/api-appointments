"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMailReservation = exports.sendMailWelcomeUser = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
const formatDate_1 = require("../utils/formatDate");
const minutesToHour_1 = require("../utils/minutesToHour");
const sendMailWelcomeUser = (user) => {
    const msg = {
        from: 'Reserly <hola@reserly.mx>',
        to: user.email,
        templateId: 'd-26e72218c47145bcbdccaffa5d741d11',
        dynamicTemplateData: {
            name: user.firstName,
        }
    };
    mail_1.default.send(msg).then(() => {
        console.log('Email sent');
    }).catch((error) => {
        console.log('Email ERROR', error.message);
        console.error(error);
    });
};
exports.sendMailWelcomeUser = sendMailWelcomeUser;
const sendMailReservation = (booking) => {
    const msg = {
        from: 'Reserly <hola@reserly.mx>',
        to: booking.business.businessUser[0].user.email,
        templateId: 'd-a7359a9f17f64692a28c15093c7ea0b7',
        dynamicTemplateData: {
            customerName: `${booking.customer.firstName} ${booking.customer.lastName}`,
            createdAt: formatDate_1.formatDate(booking.createdAt),
            bookingDate: formatDate_1.formatDateLG(booking.bookingDate),
            time: minutesToHour_1.minutesToHour(booking.totalTime),
            price: `$${booking.totalPrice}MXN`,
            urlDetail: `https://reserly.mx/manager/bookings/${booking.id}`
        }
    };
    mail_1.default.send(msg).then(() => {
        console.log('Email sent to', booking.business.businessUser[0].user.email);
    }).catch((error) => {
        console.log('Email ERROR', error.message);
        console.error(error);
    });
};
exports.sendMailReservation = sendMailReservation;
//# sourceMappingURL=user.js.map