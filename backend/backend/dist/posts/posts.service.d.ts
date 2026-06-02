import { SupabaseService } from "../supabaseService";
export declare class PostService {
    private readonly supabase;
    constructor(supabase: SupabaseService);
    createPost(postId: string, userId: string, groupId: string, caption: string, mediaUrl: string, mediaType: string, latitude: any, longitude: any): Promise<any>;
    deletePost(postId: string): Promise<void>;
    createUpload(userId: string, postId: string, filePath: string, mediaType: string): Promise<any>;
    deleteUploadFromStorage(postId: string, uploadId: string): Promise<null>;
}
