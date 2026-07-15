import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { JWTStrategy } from "src/auth/jwt.strategy";
import { CommentService } from "./comments.service";

@Controller('comments')
@UseGuards(JWTStrategy)
export class CommentController {
    constructor(
        private commentServce: CommentService
    ){}

    @Post('create')
    async comment(
        @Body()
        body: {
            user_id: string,
            post_id: string,
            comment: string
        }
    ){
        return this.commentServce.addComment(body.user_id, body.post_id, body.comment)
    }
}