import { Injectable } from "@nestjs/common";
import { SupabaseService } from "src/supabaseService";
import { NotificationService } from "src/apn/notification.service";

@Injectable()
export class CommentService{
    constructor(
        private readonly supabase: SupabaseService,
        private readonly notificationService: NotificationService
    ){}

    

    async addComment(userId: string, postId: string, comment: string){

        //add comment
        const {data, error} = await this.supabase.client
            .from("post_comments")
            .insert({
                user_id: userId,
                post_id: postId,
                comment: comment
            })
            .select()
            .single()

        if(error){
            throw error
        }

        await this.commentNotification(userId, postId, comment)

        return data

    }

    async commentNotification(userId: string, postId: string, comment: string){

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

        //get user comment notification settings
        const {data: postUserData, error: postUserError} = await this.supabase.client
            .from("profiles")
            .select("*")
            .eq("id", postData.user_id)
            .single()

        if(postUserError){
            throw postUserError
        }

        //notify user
        var title = userData.username + " commented on your post"
        var text = comment

        if(postUserData.commentNotification){
            await this.notificationService.createNotification(postUserData.id, title, text, postData.id)
        }

    }
}