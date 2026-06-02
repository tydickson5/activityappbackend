import { PostService } from "./posts.service";
export declare class PostController {
    private postsService;
    constructor(postsService: PostService);
    create(body: {
        postId: string;
        userId: string;
        groupId: string;
        caption: string;
        mediaUrl: string;
        mediaType: string;
        latitude: any;
        longitude: any;
    }): Promise<any>;
    join(body: {
        post_id: string;
    }): Promise<void>;
}
