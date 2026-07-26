import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { JWTStrategy } from "src/auth/jwt.strategy";
import { FriendsService } from "./friends.service";

@Controller('friends')
@UseGuards(JWTStrategy)
export class FriendController {
    constructor(
        private friendService: FriendsService
    ){}

    @Post("sendRequest")
    async sendRequest(
        @Body()
        body: {
            userId: string,
            friendId: string,
            friendUsername: string,
        }
    ){
        return this.friendService.sendFriendRequest(body.userId,body.friendId,body.friendUsername)
    }
}