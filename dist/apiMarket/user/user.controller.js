"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const auth_1 = require("../../service/auth");
const User_1 = require("../../entity/User");
const constants_1 = require("../../config/constants");
const mails_1 = require("../../mails/mails");
const uuid_1 = require("uuid");
const argon2_1 = require("argon2");
class UserController {
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.session.userId)
                    return res.json({ success: false, message: 'Unauthorized' });
                const user = yield User_1.User.findOne({
                    where: { id: req.session.userId },
                    relations: ['businessUser'],
                });
                if (!user) {
                    return res.json({ success: false, message: 'Unauthorized' });
                }
                return res.json({ success: true, user });
            }
            catch (error) {
                return res.json({ success: false, message: error.message });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const { user, isAuth, message } = yield auth_1.auth(email, password);
                if (!isAuth || !user) {
                    return res.json({ success: false, message });
                }
                req.session.userId = user.id;
                return res.json({ success: true, user });
            }
            catch (error) {
                return res.json({
                    success: false,
                    message: error.message,
                });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userBody = req.body;
                const us = yield User_1.User.findOne({ where: { email: userBody.email } });
                if (us) {
                    return res.json({ success: false, message: 'Lo sentimos, este correo electrónico ya esta registrado.' });
                }
                const user = yield User_1.User.create(userBody).save();
                if (!user) {
                    return res.json({ success: false, message: 'Error al registrar el usuario.' });
                }
                req.session.userId = user.id;
                if (user) {
                    mails_1.sendMailWelcomeUser(user);
                    mails_1.addContact(user);
                }
                return res.json({ success: true, user });
            }
            catch (error) {
                return res.json({
                    success: false,
                    message: error.message,
                });
            }
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return req.session.destroy(err => {
                    res.clearCookie(constants_1.COOKIE_NAME, { domain: constants_1.DOMAIN_NAME });
                    if (err) {
                        res.status(400).send('Unable to log out');
                    }
                    else {
                        res.send('Logout successful');
                    }
                });
            }
            catch (error) {
                return res.json({ success: false, message: error.message });
            }
        });
    }
    forgotPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('req.params.email', req.body.email);
                const redis = new ioredis_1.default();
                const email = req.body.email;
                const user = yield User_1.User.findOne({ where: { email } });
                if (user) {
                    const token = uuid_1.v4();
                    const time = 1000 * 60 * 60 * 24;
                    yield redis.set(`forgot-password: ${token}`, user.id.toString(), 'ex', time);
                    mails_1.sendMailChangePassword(user, token);
                }
                else {
                    return res.json({ success: false, message: 'Este correo electrónico no está registrado.' });
                }
                return res.json({ success: true });
            }
            catch (error) {
                return res.json({ success: false, message: error.message });
            }
        });
    }
    changePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const redis = new ioredis_1.default();
                const { token, password } = req.body;
                const userId = yield redis.get(`forgot-password: ${token}`);
                if (userId) {
                    const passordHash = yield argon2_1.hash(password);
                    yield User_1.User.update({ id: parseInt(userId) }, { password: passordHash });
                }
                else {
                    return res.json({ success: false, message: 'Este enlace ya no esta disponible.' });
                }
                return res.json({ success: true, token, userId });
            }
            catch (error) {
                return res.json({ success: false, message: error.message });
            }
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map