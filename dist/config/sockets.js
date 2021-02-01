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
const socket_io_1 = require("socket.io");
const setupSocket = (server, app) => {
    const io = new socket_io_1.Server(server);
    io.on("connection", (socket) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('Conectando sockets', socket.id);
        app.socketIo = io;
        app.socket = socket;
        socket.on('disconnect', () => {
            console.log('Disconnected', socket.id);
            socket.disconnect(true);
        });
    }));
};
exports.default = setupSocket;
//# sourceMappingURL=sockets.js.map