import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { PostService } from "./posts.service";
import { JWTStrategy } from "src/auth/jwt.strategy";

@Controller('posts')
@UseGuards(JWTStrategy)
export class PostController {
    constructor(private postsService: PostService){}

    @Post('create')
    async create(
        @Body()
        body: {
            postId: string,
            userId: string,
            groupId: string,
            caption: string,
            mediaUrl: string,
            mediaType: string,
            videoUrl: string,
            latitude,
            longitude,
            isPublic: boolean
        }
    ){
        return this.postsService.createPost(body.postId,body.userId, body.groupId,body.caption,body.mediaUrl,body.mediaType,body.videoUrl,body.latitude,body.longitude, body.isPublic)
    }

    @Post('delete')
    async join(
        @Body()
        body: {
            post_id: string
        }
    ){
        return this.postsService.deletePost(body.post_id)
    }
}