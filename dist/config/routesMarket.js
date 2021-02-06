"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const business_routes_1 = __importDefault(require("../apiMarket/business/business.routes"));
const user_routes_1 = __importDefault(require("../apiMarket/user/user.routes"));
const booking_routes_1 = __importDefault(require("../apiMarket/booking/booking.routes"));
const category_routes_1 = __importDefault(require("../apiMarket/category/category.routes"));
const URL_V1 = '/api/v1';
exports.default = (app) => {
    app.use(`${URL_V1}/businesses`, business_routes_1.default);
    app.use(`${URL_V1}/users`, user_routes_1.default);
    app.use(`${URL_V1}/bookings`, booking_routes_1.default);
    app.use(`${URL_V1}/categories`, category_routes_1.default);
};
//# sourceMappingURL=routesMarket.js.map