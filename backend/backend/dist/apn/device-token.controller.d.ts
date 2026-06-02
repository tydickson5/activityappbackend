import { SupabaseService } from "../supabaseService";
export declare class DeviceTokenController {
    private readonly supabase;
    constructor(supabase: SupabaseService);
    register(body: {
        userId: string;
        deviceToken: string;
    }): Promise<import("@supabase/postgrest-js").PostgrestSingleResponse<null>>;
}
