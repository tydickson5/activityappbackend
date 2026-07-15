import { Module } from "@nestjs/common";
import { NotificationsModule } from "src/apn/notifications.module";
import { SupabaseModule } from "src/supabaseModule";
import { LikeController } from "./likes.controller";
import { LikeService } from "./likes.service";

@Module({
    imports: [SupabaseModule, NotificationsModule],
    controllers: [
        LikeController
    ],
    providers: [
        LikeService
    ]
})

export class LikeModule{}