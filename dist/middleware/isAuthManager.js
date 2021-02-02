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
exports.isAuth = void 0;
const User_1 = require("../entity/User");
const isAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.session.userId) {
            return res.status(401).json({ success: false, message: 'Unauthorizedd' });
        }
        const user = yield User_1.User.findOne({
            where: { id: req.session.userId },
            relations: ['businessUser']
        });
        if (!user) {
            return res.status(401).json({ success: false, message: 'User not found.' });
        }
        req.user = user;
        return next();
    }
    catch (error) {
        return res.json({ success: true, message: error.message });
    }
});
exports.isAuth = isAuth;
//# sourceMappingURL=isAuthManager.js.map