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

        this.tripStartedNotification(userId, username)

        return data
    }

    async tripStartedNotification(userId: string, username: string){

    }

    async endTrip(tripId: string, ){
        //update ended_at to timestamp and active -> false + notification
        const { data, error } = await this.supabase.client
            .from("trips")
            .update({
                ended_at: Date,
                active: false
            })
            .eq("id", tripId)

        if(error){
            throw error
        }

        await this.tripEndNotification()

    }

    async tripEndNotification(){

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