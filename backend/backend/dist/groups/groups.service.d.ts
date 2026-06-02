import { SupabaseService } from "../supabaseService";
export declare class GroupService {
    private readonly supabase;
    constructor(supabase: SupabaseService);
    createGroup(userId: string, name: String): Promise<any>;
    joinGroup(userId: string, groupId: string): Promise<any>;
    groupExists(groupId: string): Promise<boolean>;
}
