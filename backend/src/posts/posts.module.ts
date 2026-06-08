import { Module } from "@nestjs/common";
import { PostController } from "./posts.controller";
import { PostService } from "./posts.service";
import { SupabaseModule } from "src/supabaseModule";
import { NotificationsModule } from "src/apn/notifications.module";

@Module({
    imports: [SupabaseModule, NotificationsModule],
    controllers: [
        PostController
    ],
    providers: [
        PostService
    ]
})

export class PostModule{}