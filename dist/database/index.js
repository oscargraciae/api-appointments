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
const typeorm_1 = require("typeorm");
const typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
const Business_1 = require("../entity/Business");
const BusinessCategory_1 = require("../entity/BusinessCategory");
const BusinessAddress_1 = require("../entity/BusinessAddress");
const BusinessUser_1 = require("../entity/BusinessUser");
const User_1 = require("../entity/User");
const BusinessFile_1 = require("../entity/BusinessFile");
const BusinessService_1 = require("../entity/BusinessService");
const Booking_1 = require("../entity/Booking");
const BookingStatus_1 = require("../entity/BookingStatus");
const BookingService_1 = require("../entity/BookingService");
const Review_1 = require("../entity/Review");
const BusinessHour_1 = require("../entity/BusinessHour");
const constants_1 = require("../config/constants");
const setupDB = () => __awaiter(void 0, void 0, void 0, function* () {
    yield typeorm_1.createConnection({
        host: 'reserlydb.czvygimgfy02.us-east-2.rds.amazonaws.com',
        type: 'postgres',
        database: 'boombook_dev',
        username: 'postgres',
        password: 'NXzPzL38HTT9wOG2Lyea',
        logging: true,
        synchronize: !constants_1.__prod__ ? true : false,
        namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy(),
        entities: [
            User_1.User,
            Business_1.Business,
            BusinessCategory_1.BusinessCategory,
            BusinessAddress_1.BusinessAddress,
            BusinessUser_1.BusinessUser,
            BusinessFile_1.BusinessFile,
            BusinessService_1.BusinessService,
            Booking_1.Booking,
            BookingStatus_1.BookingStatus,
            BookingService_1.BookingService,
            Review_1.Review,
            BusinessHour_1.BusinessHour,
        ],
    });
});
exports.default = setupDB;
//# sourceMappingURL=index.js.map