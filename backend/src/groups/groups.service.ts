import { Injectable } from "@nestjs/common";
import { createClient } from "@supabase/supabase-js";

@Injectable()
export class GroupService{
    private supabaseClient = createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    async createGroup(userId: string, name: String){
        const {data, error} = await this.supabaseClient
            .from('groups')
            .insert({
                user_id: userId,
                name: name
            })
            .select()
            .single()

        if(error){
            throw error
        }

        //join the group
        var newgroupid = data.id
        var response = this.joinGroup(userId, newgroupid)

        return response
    }

    async joinGroup(userId: string, groupId: string){

        if(!this.groupExists(groupId)){
            success: false
        }

        const {data: existingMember} = await this.supabaseClient
            .from('group_memberships')
            .select('*')
            .eq('user_id', userId)
            .eq('group_id', groupId)
            .maybeSingle()

        if(existingMember){
            return existingMember
        }

        //join group
        const {data, error} = await this.supabaseClient
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

        return data
    }

    async groupExists(groupId: string){
        const {data: existingGroup} = await this.supabaseClient
            .from('groups')
            .select('*')
            .eq('group_id', groupId)
            .maybeSingle()
        
        if(existingGroup){
            return true
        }

        return false
    }
}