import { Injectable } from "@nestjs/common";
import { ApnsService } from "./apns.service";
import { createClient } from "@supabase/supabase-js";
import { SupabaseService } from "src/supabaseService";

@Injectable()
export class NotificationService {

    constructor(
            private readonly supabase: SupabaseService,
            private readonly apnsService: ApnsService
        ) {}


    async createNotification(userId: string, title: string, body: string,){
        const {data: notification} = await this.supabase.client
            .from('notifications')
            .insert({
                user_id: userId,
                title,
                body,
            })
            .select()
            .single()

        const {data: tokens} = await this.supabase.client
            .from('device_tokens')
            .select('*')
            .eq('user_id', userId)

        for (const token of tokens || []){
            await this.apnsService.sendNotification(
                token.device_token,
                {
                    notificationId: notification.id,
                    title,
                    body,
                    type: 'notification_created',
                    version: 1,
                }
            )
        }

        return notification
    }

    async updateNotification(notificationId: string, title: string, body: string){
        const {data: existing} = await this.supabase.client
            .from('notifications')
            .select('*')
            .eq('id', notificationId)
            .single()

        const version = existing.version + 1

        const {data: updated} = await this.supabase.client
            .from('notifications')
            .update({
                title,
                body,
                version,
            })
            .eq('id', notificationId)
            .select()
            .single()

        const {data: tokens } = await this.supabase.client
            .from('device_tokens')
            .select('*')
            .eq('user_id', existing.user_id)

        for (const token of tokens || []){
            await this.apnsService.sendNotification(
                token.device_token,
                {
                    notificationId,
                    title,
                    body,
                    type: 'notification_updated',
                    version,
                }
            )
        }

        return updated
    }

    async deleteNotification(notificationId: string){
        const {data:existing} = await this.supabase.client
            .from('notifications')
            .select('*')
            .eq('id', notificationId)
            .single()

        const{data:tokens} = await this.supabase.client
            .from('device_tokens')
            .select('*')
            .eq('user_id', existing.user_id)

        for(const token of tokens || []){
            await this.apnsService.sendSilentDelete(token.device_token, notificationId)
        }

        await this.supabase.client
            .from('notifications')
            .delete()
            .eq('id', notificationId)

        return {
            success: true
        }
    }
}