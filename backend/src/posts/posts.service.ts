import { Injectable } from "@nestjs/common";
import { NotificationService } from "src/apn/notification.service";
import { SupabaseService } from "src/supabaseService";

@Injectable()
export class PostService{
    constructor(
        private readonly supabase: SupabaseService,
        private readonly notificationService: NotificationService
    ) {}

    async createPost(postId: string, userId: string, groupId: string, caption:string, mediaUrl: string, mediaType: string, latitude, longitude){

        console.log("post creating")
        const{data, error} = await this.supabase.client
            .from('posts')
            .insert({
                id: postId,
                user_id: userId,
                group_id: groupId,
                caption: caption,
                media_url: mediaUrl,
                media_type: mediaType,
                latitude: latitude,
                longitude: longitude
            })
            .select()
            .single()

        if(error){
            throw error
        }


        await this.sendNotificaitonToUsers(groupId, userId,latitude,longitude)
        console.log("post notified")

        return data
    }

    async deletePost(postId: string){

        const {error} = await this.supabase.client
            .from('posts')
            .delete()
            .eq('id', postId)

        if(error){
            throw error
        }
    }

    async createUpload(userId: string, postId: string, filePath: string, mediaType: string){

        const {data, error} = await this.supabase.client
            .from('uploads')
            .insert({
                post_id: postId,
                user_id: userId,
                file_url: filePath,
                media_type: mediaType,
            })
            .select()
            .single()

        if(error){
            throw error
        }

        return data

    }

    async deleteUploadFromStorage(postId: string, uploadId: string){
        return null;
    }

    async sendNotificaitonToUsers(groupId: string, userId: string, latitude, longitude){
        console.log("test")
        const {data, error} = await this.supabase.client
            .from('group_memberships')
            .select("*")
            .eq('group_id', groupId)

        if(error){
            throw error
        }

        const {data: m, error: e} = await this.supabase.client.from('profiles')
            .select('*')
            .eq('id', userId)
            .single()

        var title = m.username + " posted"
        var text = "@ " + longitude + ", " + latitude

        for(let member of data){
            if(member.user_id != userId){

                

                await this.notificationService.createNotification(member.user_id,title, text)
            }
        }
    }
}