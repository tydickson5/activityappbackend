import { Injectable } from "@nestjs/common";
import { ApnsService } from "./apns.service";
import { createClient } from "@supabase/supabase-js";

@Injectable()
export class NotificationService {

    private supabaseClient = createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    constructor(private readonly apnsService: ApnsService){

    }

    async createNotification(userId: string, title: string, body: string,){
        const {data: notification} = await this.supabaseClient
            .from('notifications')
            .insert({
                user_id: userId,
                title,
                body,
            })
            .select()
            .single()

        const {data: tokens} = await this.supabaseClient
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
        const {data: existing} = await this.supabaseClient
            .from('notifications')
            .select('*')
            .eq('id', notificationId)
            .single()

        const version = existing.version + 1

        const {data: updated} = await this.supabaseClient
            .from('notifications')
            .update({
                title,
                body,
                version,
            })
            .eq('id', notificationId)
            .select()
            .single()

        const {data: tokens } = await this.supabaseClient
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
        const {data:existing} = await this.supabaseClient
            .from('notifications')
            .select('*')
            .eq('id', notificationId)
            .single()

        const{data:tokens} = await this.supabaseClient
            .from('device_tokens')
            .select('*')
            .eq('user_id', existing.user_id)

        for(const token of tokens || []){
            await this.apnsService.sendSilentDelete(token.device_token, notificationId)
        }

        await this.supabaseClient
            .from('notifications')
            .delete()
            .eq('id', notificationId)

        return {
            success: true
        }
    }
}