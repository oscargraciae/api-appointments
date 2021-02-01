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
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const argon2_1 = require("argon2");
const User_1 = require("../entity/User");
const auth = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.User.findOne({ email }, { select: ['id', 'email', 'password'] });
    if (!user) {
        return {
            isAuth: false,
            message: 'No pudimos encontrar una cuenta con el correo electrónico que ingresaste.'
        };
    }
    if (!(yield argon2_1.verify(user.password, password))) {
        return {
            isAuth: false,
            message: 'La contraseña que ingresaste es incorrecta.'
        };
    }
    console.log('Todo correcto');
    return {
        isAuth: true,
        user,
    };
});
exports.auth = auth;
//# sourceMappingURL=auth.js.map