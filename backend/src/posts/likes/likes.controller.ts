import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { JWTStrategy } from "src/auth/jwt.strategy";
import { LikeService } from "./likes.service";

@Controller('likes')
@UseGuards(JWTStrategy)
export class LikeController {
    constructor(
        private likeService: LikeService
    ){}

    @Post("create")
    async create(
        @Body()
        body: {
            postId: string,
            userId: string,
            postLikes
        }
    ){
        return this.likeService.addLike(body.postId, body.userId, body.postLikes)
    }

    @Post("delete")
    async delete(
        @Body()
        body: {
            postId: string,
            likeId: string,
            postLikes
        }
    ){
        return this.likeService.removeLike(body.postId, body.likeId, body.postLikes)
    }
}