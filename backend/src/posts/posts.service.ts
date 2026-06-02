import { Injectable } from "@nestjs/common";
import { createClient } from "@supabase/supabase-js";

@Injectable()
export class PostService{
    private supabaseClient = createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    async createPost(postId: string, userId: string, groupId: string, caption:string, mediaUrl: string, mediaType: string, latitude, longitude){
        
        const{data, error} = await this.supabaseClient
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

        //createupload
        await this.createUpload(userId, data.id, mediaUrl, mediaType)


        return data
    }

    async deletePost(postId: string){

        const {error} = await this.supabaseClient
            .from('posts')
            .delete()
            .eq('id', postId)

        if(error){
            throw error
        }
    }

    async createUpload(userId: string, postId: string, filePath: string, mediaType: string){

        const {data, error} = await this.supabaseClient
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
}