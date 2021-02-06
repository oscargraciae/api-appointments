"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMailWelcomeUser = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
const sendMailWelcomeUser = (user) => {
    console.log('Enviando correo', user);
    const msg = {
        from: 'hola@reserly.mx',
        to: 'oscar.graciae@gmail.com',
        templateId: 'd-26e72218c47145bcbdccaffa5d741d11',
    };
    mail_1.default.send(msg).then(() => {
        console.log('Email sent');
    }).catch((error) => {
        console.log('Email ERROR', error.message);
        console.error(error);
    });
};
exports.sendMailWelcomeUser = sendMailWelcomeUser;
//# sourceMappingURL=index.js.map