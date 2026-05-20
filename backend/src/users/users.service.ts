import { Injectable } from "@nestjs/common";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { throwError } from "rxjs";

@Injectable()
export class UserService{
    private supabaseClient = createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    async getProfile(userId: String){
        const {data, error} = await this.supabaseClient
            .from('profiles')
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
        const {data: existingProfile} = await this.supabaseClient
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .maybeSingle()

        if(existingProfile){
            return existingProfile
        }

        //create new user
        const {data, error} = await this.supabaseClient
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

}