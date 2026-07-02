import { Injectable } from "@nestjs/common";
import { GroupService } from "src/groups/groups.service";
import { SupabaseService } from "src/supabaseService";

@Injectable()
export class UserService{

    constructor(
    private readonly supabase: SupabaseService,
    private readonly groupService: GroupService,
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

        //join main group
        try {
            await this.joinPublicGroup(
                userId,
                "6ce9c8f8-2ff2-4f12-8f74-19671fcfb265"
            )
        } catch (error) {
            console.error(error)
        }

        return data
    }

    async joinPublicGroup(userId: string, groupId: string){
        const {data, error} = await this.supabase.client
            .from('group_memberships')
            .insert({
                user_id: userId,
                group_id: groupId
            })
            .select()
            .single()

        if(error){
            throw error
        }
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