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

    @Post("deleteRequest")
    async deleteRequest(
        @Body()
        body: {
            friendRequestId: string
        }
    ){
        return this.friendService.deleteFriendRequest(body.friendRequestId)
    }

    @Post("acceptRequest")
    async acceptRequest(
        @Body()
        body: {
            friendRequestId: string,
            userId: string,
            friendId: string,
            friendUsername: string,
        }
    ){
        return this.friendService.acceptFriendRequest(body.friendRequestId, body.userId,body.friendId,body.friendUsername)
    }

    @Post("deleteFriend")
    async deleteFriend(
        @Body()
        body:{
            userId: string,
            friendId: string
        }
    ){
        return this.friendService.deleteFriend(body.userId,body.friendId)
    }

}