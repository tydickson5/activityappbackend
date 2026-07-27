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
        return requestData


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
        }

        //delete friend request
        this.deleteFriendRequest(friendRequestId)

        //notifications

        return data
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