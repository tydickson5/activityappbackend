import { Module } from "@nestjs/common";
import { NotificationsModule } from "src/apn/notifications.module";
import { SupabaseModule } from "src/supabaseModule";
import { CommentController } from "./comments.controller";
import { CommentService } from "./comments.service";

@Module({
    imports: [SupabaseModule, NotificationsModule],
    controllers: [
        CommentController
    ],
    providers: [
        CommentService
    ]
})

export class CommentModule{}