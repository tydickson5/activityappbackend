import { Injectable } from "@nestjs/common";
import { BigIntOptions } from "node:fs";
import { title } from "node:process";
import { NotificationService } from "src/apn/notification.service";
import { SupabaseService } from "src/supabaseService";

@Injectable()
export class LikeService{
    constructor(
        private readonly supabase: SupabaseService,
        private readonly notificationService: NotificationService
    ){}

    async addLike(postId: string, userId: string, likes: string){

        //add like
        const {data,error} = await this.supabase.client
            .from("post_likes")
            .insert({
                user_id: userId,
                post_id: postId
            })
            .select()
            .single()

        if(error){
            throw error
        }

        //update like count
        const {data: updatePost, error: updatePostError} = await this.supabase.client
            .from("posts").update(["post_likes", likes]).eq("id", postId)

        //notify
        await this.sendNotificationForLike(postId, userId)

            
    }

    async removeLike(postId: string, likeId: string, likes){

        //remove like
        const {error} = await this.supabase.client
            .from("post_likes")
            .delete()
            .eq("id", likeId)

        //update like count
        const {data: updatePost, error: updatePostError} = await this.supabase.client
            .from("posts").update(["post_likes", likes]).eq("id", postId)
    }

    async sendNotificationForLike(postId: string, userId: string){

        //get post user id
        const {data: postData, error: postError} = await this.supabase.client
            .from("posts")
            .select("*")
            .eq("id", postId)
            .single()

        if(postError){
            throw postError
        }

        //get user name
        const {data: userData, error: userError} = await this.supabase.client
            .from("profiles")
            .select("*")
            .eq("id", userId)
            .single()

        
        if(userError){
            throw userError
        }

        //get user like notification settings
        const {data: postUserData, error: postUserError} = await this.supabase.client
            .from("profiles")
            .select("*")
            .eq("id", postData.user_id)
            .single()

        if(postUserError){
            throw postUserError
        }

        var title = userData.username + " liked your post"
        var text = ""

        if(postUserData.likeNotification){
            await this.notificationService.createNotification(postUserData, title, text, postData.id)
        }

    }
}