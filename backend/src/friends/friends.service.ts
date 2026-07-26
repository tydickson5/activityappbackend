import { Injectable } from "@nestjs/common";
import { NotificationService } from "src/apn/notification.service";
import { SupabaseService } from "src/supabaseService";

@Injectable()
export class FriendsService{
    constructor(
        private readonly supabase: SupabaseService,
        private readonly notificationService: NotificationService
    ){}

    async sendFriendRequest(userId: string, friendUserId: string, friendUserName){
        //create request
        const { data: requestData, error: requestError } = await this.supabase.client
            .from("friend_request")
            .upsert({
                user_id: userId,
                friend_id: friendUserId,
                friend_username: friendUserName
            })
            .select().single()

        if(requestError){
            throw requestError
        }

        //notification to create/update notification
        return requestData


    }

    async deleteFriendRequest(friendRequestId: string){

    }

    async acceptFriendRequest(){
        //if no friend the make no one



        //else mark active

    }

    async denyFriendRequest(){

    }

    async deleteFriend(){
        //mark as inactive friend
    }
}