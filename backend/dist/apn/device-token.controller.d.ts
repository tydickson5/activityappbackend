export declare class DeviceTokenController {
    private supabaseClient;
    register(body: {
        userId: string;
        deviceToken: string;
    }): Promise<import("@supabase/postgrest-js").PostgrestSingleResponse<null>>;
}
