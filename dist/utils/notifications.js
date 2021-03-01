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
exports.createNotification = void 0;
const onesignal_node_1 = __importDefault(require("onesignal-node"));
const createNotification = (booking) => __awaiter(void 0, void 0, void 0, function* () {
    const client = new onesignal_node_1.default.Client('21792b91-5514-4525-8925-fef85c09b43a', 'NjA1YmVmOGEtMTYzYy00YmI5LTlmNDUtMGE0OTY5MDAwOGQw');
    console.log('Enviando notificación PUSH', booking.createdAt);
    const notification = {
        contents: {
            'tr': 'Yeni bildirim',
            'en': 'New notification',
        },
        included_segments: ['Subscribed Users'],
        filters: [
            { field: 'tag', key: 'level', relation: '>', value: 10 }
        ]
    };
    const response = yield client.createNotification(notification);
    console.log(response.body.id);
});
exports.createNotification = createNotification;
//# sourceMappingURL=notifications.js.map