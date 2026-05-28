import { ApnsService } from "./apns.service";
export declare class NotificationService {
    private readonly apnsService;
    private supabaseClient;
    constructor(apnsService: ApnsService);
    createNotification(userId: string, title: string, body: string): Promise<any>;
    updateNotification(notificationId: string, title: string, body: string): Promise<any>;
    deleteNotification(notificationId: string): Promise<{
        success: boolean;
    }>;
}
