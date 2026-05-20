import { NotificationService } from "./notification.service";
export declare class NotificationController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationService);
    create(body: {
        userId: string;
        title: string;
        body: string;
    }): Promise<any>;
    update(id: string, body: {
        title: string;
        body: string;
    }): Promise<any>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
}
