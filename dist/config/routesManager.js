"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_routes_1 = __importDefault(require("../apiManager/user/user.routes"));
const business_routes_1 = __importDefault(require("../apiManager/business/business.routes"));
const service_routes_1 = __importDefault(require("../apiManager/service/service.routes"));
const address_routes_1 = __importDefault(require("../apiManager/address/address.routes"));
const booking_routes_1 = __importDefault(require("../apiManager/booking/booking.routes"));
const customer_routes_1 = __importDefault(require("../apiManager/customer/customer.routes"));
const URL_V1 = '/api/manager_v1';
exports.default = (app) => {
    app.use(`${URL_V1}/users`, user_routes_1.default);
    app.use(`${URL_V1}/businesses`, business_routes_1.default);
    app.use(`${URL_V1}/businesses/:businessId/services`, service_routes_1.default);
    app.use(`${URL_V1}/businesses/:businessId/addresses`, address_routes_1.default);
    app.use(`${URL_V1}/bookings`, booking_routes_1.default);
    app.use(`${URL_V1}/customers`, customer_routes_1.default);
};
//# sourceMappingURL=routesManager.js.map