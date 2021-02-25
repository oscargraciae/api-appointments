"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDateLG = exports.formatDate = void 0;
const moment_timezone_1 = __importDefault(require("moment-timezone"));
require("moment/locale/es-mx");
moment_timezone_1.default.locale('es-mx');
const formatDate = (date, format) => {
    if (!format) {
        return moment_timezone_1.default(date).tz('America/Monterrey').format('DD/MM/YYYY HH:mm');
    }
    return moment_timezone_1.default(date).format(format);
};
exports.formatDate = formatDate;
const formatDateLG = (date) => {
    return moment_timezone_1.default(date).tz('America/Monterrey').format('dddd DD [de] MMMM [de] YYYY HH:mm');
};
exports.formatDateLG = formatDateLG;
//# sourceMappingURL=formatDate.js.map