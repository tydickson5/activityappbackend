"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApnsService = void 0;
const common_1 = require("@nestjs/common");
const node_apn_1 = __importDefault(require("@parse/node-apn"));
let ApnsService = class ApnsService {
    provider;
    constructor() {
        this.provider = new node_apn_1.default.Provider({
            token: {
                key: process.env.APPLE_APNS_KEY_PATH,
                keyId: process.env.APPLE_KEY_ID,
                teamId: process.env.APPLE_TEAM_ID,
            },
            production: false,
        });
    }
    async sendNotification(devideToken, payload) {
        const note = new node_apn_1.default.Notification();
        note.topic = process.env.APPLE_BUNDLE_ID;
        if (payload.title || payload.body) {
            note.alert = {
                title: payload.title ?? '',
                body: payload.body ?? '',
            };
        }
        note.sound = 'default';
        note.collapseId = payload.notificationId;
        note.payload = {
            notificationId: payload.notificationId,
            type: payload.type,
            version: payload.version || 1,
        };
        return this.provider.send(note, devideToken);
    }
    async sendSilentDelete(deviceToken, notificationId) {
        const note = new node_apn_1.default.Notification();
        note.topic = process.env.APPLE_BUNDLE_ID;
        note.contentAvailable = true;
        note.payload = {
            type: 'notification_deleted',
            notificationId,
        };
        return this.provider.send(note, deviceToken);
    }
};
exports.ApnsService = ApnsService;
exports.ApnsService = ApnsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ApnsService);
//# sourceMappingURL=apns.service.js.map