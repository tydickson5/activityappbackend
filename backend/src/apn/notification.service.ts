import { Injectable } from "@nestjs/common";
import { ApnsService } from "./apns.service";
import { SupabaseService } from "src/supabaseService";

@Injectable()
export class NotificationService {

    constructor(
            private readonly supabase: SupabaseService,
            private readonly apnsService: ApnsService
        ) {}


    async createNotification(userId: string, title: string, body: string) {
        console.log("STEP 1: entered function", userId)

        const { data: notification, error } = await this.supabase.client
            .from('notifications')
            .insert({
                user_id: userId,
                title,
                body,
            })
            .select()
            .single()

        console.log("STEP 2: after insert")

        if (error) {
            console.log("INSERT ERROR:", error)
            throw error
        }

        console.log("STEP 3: notification created", notification)

        const { data: tokens, error: tokenError } = await this.supabase.client
            .from('device_tokens')
            .select('*')
            .eq('user_id', userId)

        console.log("STEP 4: tokens fetched", tokens, tokenError)

        for (const token of tokens || []) {
            console.log("STEP 5: sending to", token.device_token)

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

        console.log("STEP 6: done")

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