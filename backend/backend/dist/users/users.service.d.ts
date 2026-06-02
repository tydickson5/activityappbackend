import { SupabaseService } from "../supabaseService";
export declare class UserService {
    private readonly supabase;
    constructor(supabase: SupabaseService);
    getProfile(userId: String): Promise<any>;
    onboardUser(userId: string, email: string): Promise<any>;
    addToWaitlist(email: string): Promise<any>;
}
