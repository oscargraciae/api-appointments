"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const morgan_1 = __importDefault(require("morgan"));
const mail_1 = __importDefault(require("@sendgrid/mail"));
const client_1 = __importDefault(require("@sendgrid/client"));
const database_1 = __importDefault(require("./database"));
const routesManager_1 = __importDefault(require("./config/routesManager"));
const constants_1 = require("./config/constants");
const routesMarket_1 = __importDefault(require("./config/routesMarket"));
const sockets_1 = __importDefault(require("./config/sockets"));
require('dotenv-flow').config();
if (process.env.SENDGRID_API_KEY) {
    mail_1.default.setApiKey(process.env.SENDGRID_API_KEY);
    client_1.default.setApiKey(process.env.SENDGRID_API_KEY);
}
const main = () => {
    database_1.default();
    const app = express_1.default();
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use(cors_1.default({ origin: '*' }));
    app.use(morgan_1.default('dev'));
    app.set("trust proxy", 1);
    app.use(express_session_1.default({
        name: constants_1.COOKIE_NAME,
        secret: 'secretkey',
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: false,
            secure: constants_1.__prod__,
            domain: constants_1.DOMAIN_NAME,
        },
        saveUninitialized: false,
        resave: false,
    }));
    routesManager_1.default(app);
    routesMarket_1.default(app);
    const port = process.env.PORT || 8001;
    const server = http_1.default.createServer(app);
    sockets_1.default(server, app);
    server.listen(port, () => {
        console.log(`Server listen on port: ${port}`);
    });
};
main();
//# sourceMappingURL=index.js.map