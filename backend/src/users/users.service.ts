import { Injectable } from "@nestjs/common";
import { SupabaseService } from "src/supabaseService";

@Injectable()
export class UserService{

    constructor(
    private readonly supabase: SupabaseService,
    ) {}


    async getProfile(userId: String){
        const {data, error} = await 
            this.supabase.client.from('profiles')
            .select('*')
            .eq('id', userId)
            .single()

        if (error){
            throw error
        }
        return data
    }

    async onboardUser(userId: string, email: string){
        //check for existing user
        const {data: existingProfile} = await this.supabase.client
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .maybeSingle()

        if(existingProfile){
            return existingProfile
        }

        //create new user
        const {data, error} = await this.supabase.client
            .from('profiles')
            .insert({
                id: userId,
                username: email.split('@')[0]
            })
            .select()
            .single()

        if(error) {
            throw error;
        }

        return data
    }

    async addToWaitlist(email: string){
        const {data, error} = await this.supabase.client
            .from('waitlist')
            .insert({
                email: email
            })
            .select()
            .single()
        
        if(error){
            throw error;
        }

        return data
    }

}