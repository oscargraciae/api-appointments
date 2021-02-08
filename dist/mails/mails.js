"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addContactBusiness = exports.addContact = exports.sendMailChangePassword = exports.sendMailNotificationCustomer = exports.sendMailReservation = exports.sendMailWelcomeStore = exports.sendMailWelcomeUser = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
const client_1 = __importDefault(require("@sendgrid/client"));
const formatDate_1 = require("../utils/formatDate");
const minutesToHour_1 = require("../utils/minutesToHour");
const sendMailWelcomeUser = (user) => {
    const msg = {
        from: 'Reserly <hola@reserly.mx>',
        to: user.email,
        templateId: 'd-26e72218c47145bcbdccaffa5d741d11',
        dynamicTemplateData: {
            name: user.firstName,
        },
    };
    mail_1.default.send(msg).then(() => {
        console.log('Email sent');
    }).catch((error) => {
        console.log('Email ERROR', error.message);
        console.error(error);
    });
};
exports.sendMailWelcomeUser = sendMailWelcomeUser;
const sendMailWelcomeStore = (email) => {
    const msg = {
        from: 'Reserly <hola@reserly.mx>',
        to: email,
        templateId: 'd-244b404bc2ab4ba08b8d283a302dafff',
    };
    mail_1.default.send(msg).then(() => {
        console.log('Email sent', email);
    }).catch((error) => {
        console.log('Email ERROR', error.message);
        console.error(error);
    });
};
exports.sendMailWelcomeStore = sendMailWelcomeStore;
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
const sendMailNotificationCustomer = (booking, to, status) => {
    console.log('booking email', booking);
    console.log('booking TO', to);
    const msg = {
        from: 'Reserly <hola@reserly.mx>',
        to,
        templateId: 'd-d90e2c1ff1a3489693fe135d0b2180da',
        dynamicTemplateData: {
            subject: `Notificación: Tu reservación fue ${status}`,
            businessName: booking.business.name,
            customerName: `${booking.customer.firstName}`,
            bookingDate: formatDate_1.formatDateLG(booking.bookingDate),
            time: minutesToHour_1.minutesToHour(booking.totalTime),
            price: `$${booking.totalPrice}MXN`,
            urlDetail: `https://reserly.mx/bookings`,
            status: status,
        }
    };
    mail_1.default.send(msg).then(() => {
        console.log('Email sent to', to);
    }).catch((error) => {
        console.log('Email ERROR', error.message);
        console.error(error);
    });
};
exports.sendMailNotificationCustomer = sendMailNotificationCustomer;
const sendMailChangePassword = (user, token) => {
    const msg = {
        from: 'Reserly <hola@reserly.mx>',
        to: user.email,
        templateId: 'd-7146674ba15c432196fceaadd2ef990d',
        dynamicTemplateData: {
            name: `${user.firstName}`,
            url: `https://reserly.mx/change-password/${token}`
        }
    };
    mail_1.default.send(msg).then(() => {
        console.log('Email sent to', user.email);
    }).catch((error) => {
        console.log('Email ERROR', error.message);
        console.error(error);
    });
};
exports.sendMailChangePassword = sendMailChangePassword;
const addContact = (user) => {
    const request = {
        method: 'PUT',
        url: '/v3/marketing/contacts',
        body: {
            list_ids: ['83afac0f-14e3-460e-abd8-55efc7eafa1a'],
            contacts: [
                {
                    first_name: user.firstName,
                    last_name: user.lastName,
                    email: user.email
                }
            ]
        }
    };
    client_1.default.request(request)
        .then(([response, body]) => {
        console.log(response.statusCode);
        console.log(body);
    }).catch((error) => {
        console.log('ERror add cliente', error);
    });
};
exports.addContact = addContact;
const addContactBusiness = (user) => {
    const request = {
        method: 'PUT',
        url: '/v3/marketing/contacts',
        body: {
            list_ids: ['d3daf161-1187-4cc1-b7b6-8b7fd107999f'],
            contacts: [
                {
                    first_name: user.firstName,
                    last_name: user.lastName,
                    email: user.email
                }
            ]
        }
    };
    client_1.default.request(request)
        .then(([response, body]) => {
        console.log(response.statusCode);
        console.log(body);
    }).catch((error) => {
        console.log('ERror add cliente', error);
    });
};
exports.addContactBusiness = addContactBusiness;
//# sourceMappingURL=mails.js.map