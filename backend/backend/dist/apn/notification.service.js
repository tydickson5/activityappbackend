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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const apns_service_1 = require("./apns.service");
const supabaseService_1 = require("../supabaseService");
let NotificationService = class NotificationService {
    supabase;
    apnsService;
    constructor(supabase, apnsService) {
        this.supabase = supabase;
        this.apnsService = apnsService;
    }
    async createNotification(userId, title, body) {
        const { data: notification } = await this.supabase.client
            .from('notifications')
            .insert({
            user_id: userId,
            title,
            body,
        })
            .select()
            .single();
        const { data: tokens } = await this.supabase.client
            .from('device_tokens')
            .select('*')
            .eq('user_id', userId);
        for (const token of tokens || []) {
            await this.apnsService.sendNotification(token.device_token, {
                notificationId: notification.id,
                title,
                body,
                type: 'notification_created',
                version: 1,
            });
        }
        return notification;
    }
    async updateNotification(notificationId, title, body) {
        const { data: existing } = await this.supabase.client
            .from('notifications')
            .select('*')
            .eq('id', notificationId)
            .single();
        const version = existing.version + 1;
        const { data: updated } = await this.supabase.client
            .from('notifications')
            .update({
            title,
            body,
            version,
        })
            .eq('id', notificationId)
            .select()
            .single();
        const { data: tokens } = await this.supabase.client
            .from('device_tokens')
            .select('*')
            .eq('user_id', existing.user_id);
        for (const token of tokens || []) {
            await this.apnsService.sendNotification(token.device_token, {
                notificationId,
                title,
                body,
                type: 'notification_updated',
                version,
            });
        }
        return updated;
    }
    async deleteNotification(notificationId) {
        const { data: existing } = await this.supabase.client
            .from('notifications')
            .select('*')
            .eq('id', notificationId)
            .single();
        const { data: tokens } = await this.supabase.client
            .from('device_tokens')
            .select('*')
            .eq('user_id', existing.user_id);
        for (const token of tokens || []) {
            await this.apnsService.sendSilentDelete(token.device_token, notificationId);
        }
        await this.supabase.client
            .from('notifications')
            .delete()
            .eq('id', notificationId);
        return {
            success: true
        };
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabaseService_1.SupabaseService,
        apns_service_1.ApnsService])
], NotificationService);
//# sourceMappingURL=notification.service.js.map