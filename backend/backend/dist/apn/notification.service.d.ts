import { ApnsService } from "./apns.service";
import { SupabaseService } from "../supabaseService";
export declare class NotificationService {
    private readonly supabase;
    private readonly apnsService;
    constructor(supabase: SupabaseService, apnsService: ApnsService);
    createNotification(userId: string, title: string, body: string): Promise<any>;
    updateNotification(notificationId: string, title: string, body: string): Promise<any>;
    deleteNotification(notificationId: string): Promise<{
        success: boolean;
    }>;
}
