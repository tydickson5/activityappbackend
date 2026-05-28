export declare class GroupService {
    private supabaseClient;
    createGroup(userId: string, name: String): Promise<any>;
    joinGroup(userId: string, groupId: string): Promise<any>;
    groupExists(groupId: string): Promise<boolean>;
}
