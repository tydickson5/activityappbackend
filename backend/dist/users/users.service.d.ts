export declare class UserService {
    private supabaseClient;
    getProfile(userId: String): Promise<any>;
    onboardUser(userId: string, email: string): Promise<any>;
}
