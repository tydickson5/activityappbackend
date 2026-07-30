import { Injectable } from "@nestjs/common";
import { freemem } from "os";
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
        this.sendFriendRequestNotification(requestData.id, friendUserId, friendUserName)


        return requestData


    }

    async sendFriendRequestNotification(friendRequestId: string, friendUserId: string, friendUsername: string){

        var title = friendUsername + " sent you a friend request"
        var body = "Click to accept"

        this.notificationService.createNotification(friendUserId, title, body, friendRequestId, "friend request")
    }

    async deleteFriendRequest(friendRequestId: string){
        const {error} = await this.supabase.client
            .from("friend_request")
            .delete()
            .eq("id", friendRequestId)

        if(error){
            throw error
        }

        return true
    }

    async acceptFriendRequest(friendRequestId: string, userId: string, friendId: string, friendUsername: string){
        
        const {data: friendExistsData, error: friendExistsError} = await this.supabase.client
            .from("friends")
            .select("*")
            .eq("user_id", userId)
            .eq("friend_id", friendId)

        if(friendExistsError){
            throw friendExistsError
        }

        var data = null;

        if(friendExistsData.length > 0){
            //friend exists --> mark active for both directions
            const{ data: updateUserToFriendData, error: updateUserToFriendError} = await this.supabase.client
                .from("friends")
                .update({"active": true})
                .eq("user_id", userId)
                .eq("friend_id", friendId)
                .select()
                .single()

            if(updateUserToFriendError){
                throw updateUserToFriendError
            }

            const{ error: updateFriendToUserError} = await this.supabase.client
                .from("friends")
                .update({"active": true})
                .eq("user_id", friendId)
                .eq("friend_id", userId)

            if(updateFriendToUserError){
                throw updateFriendToUserError
            }

            this.sendAcceptFriendRequestNotification(updateUserToFriendData.id, friendId, friendUsername)
            data = updateUserToFriendData
            

        } else {

            //friend does not exist --> create for both directions
            const { data: createUserToFriendData, error: createUserToFriendError } = await this.supabase.client
                .from("friends")
                .insert({
                    user_id: userId,
                    friend_id: friendId,

                })
                .select()
                .single()

            if(createUserToFriendError){
                throw createUserToFriendError
            }

            const { data: createFriendToUserData, error: createFriendToUserError} = await this.supabase.client
                .from("friends")
                .insert({
                    user_id: friendId,
                    friend_id: userId,

                })


            if(createFriendToUserError){
                throw createFriendToUserError
            }

            data = createUserToFriendData

            this.sendAcceptFriendRequestNotification(createUserToFriendData.id, friendId, friendUsername)
        }

        //delete friend request
        this.deleteFriendRequest(friendRequestId)

        //notifications
        
        

        return data
    }

    async sendAcceptFriendRequestNotification(friendId: string, friendUserId: string, friendUsername: string){
        var title = friendUsername + " accepted your friend reqeust"
        var body = ""

        await this.notificationService.createNotification(friendUserId, title, body, friendId, "friend")
    }

    async denyFriendRequest(friendRequestId){

        this.deleteFriendRequest(friendRequestId)


    }

    async deleteFriend(userId: string, friendId: string){
        //mark as inactive friend
        const{ data: updateUserToFriendData, error: updateUserToFriendError} = await this.supabase.client
            .from("friends")
            .update({"active": true})
            .eq("user_id", userId)
            .eq("friend_id", friendId)
            .select()
            .single()

        if(updateUserToFriendError){
            throw updateUserToFriendError
        }

        const{ error: updateFriendToUserError} = await this.supabase.client
            .from("friends")
            .update({"active": true})
            .eq("user_id", friendId)
            .eq("friend_id", userId)

        if(updateFriendToUserError){
            throw updateFriendToUserError
        }

       return updateUserToFriendData
    }
}