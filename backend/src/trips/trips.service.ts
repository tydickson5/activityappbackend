import { Injectable } from "@nestjs/common";
import { NotificationService } from "src/apn/notification.service";
import { SupabaseService } from "src/supabaseService";

@Injectable()
export class tripsService{
    constructor(
        private readonly supabase: SupabaseService,
        private readonly notificationService: NotificationService
    ){}

    async startTrip(userId: string, username: string, name: string){
        //create trip + notification
        const { data, error } = await this.supabase.client
            .from("trips")
            .insert({
                user_id: userId,
                name: name
            })
            .select()
            .single()

        if(error){
            throw error
        }

        var title = username + " just started a trip!"
        var body = ""

        await this.notificationService.createNotification(userId, title, body, data.id, "trip")

        return data
    }

    async endTrip(){
        //update ended_at to timestamp and active -> false + notification

    }

    async post(){
        //call addTripToPost for all active trips to post

    }

    async addTripToPost(){


    }

    async removeTripFromPost(){

    }

    async deleteTrip(){
        //delete trip -> will delete all tripitems

    }
}