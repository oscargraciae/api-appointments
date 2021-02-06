"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DOMAIN_NAME = exports.COOKIE_NAME = exports.__prod__ = void 0;
exports.__prod__ = process.env.NODE_ENV === 'production';
exports.COOKIE_NAME = 'qid';
exports.DOMAIN_NAME = exports.__prod__ ? 'reserly.mx' : 'localhost';
//# sourceMappingURL=constants.js.map