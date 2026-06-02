import { Module } from "@nestjs/common";
import { NotificationController } from "./notification.controller";
import { NotificationService } from "./notification.service";
import { ApnsService } from "./apns.service";
import { SupabaseModule } from "src/supabaseModule";

@Module({
    imports: [SupabaseModule],
    controllers: [NotificationController],
    providers: [
        NotificationService,
        ApnsService
    ]
})
export class NotificationsModule {}