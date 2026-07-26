import { Module } from "@nestjs/common";
import { NotificationsModule } from "src/apn/notifications.module";
import { SupabaseModule } from "src/supabaseModule";
import { FriendController } from "./friends.controller";
import { FriendsService } from "./friends.service";

@Module({
    imports: [SupabaseModule, NotificationsModule],
    controllers: [
        FriendController
    ],
    providers: [
        FriendsService
    ]
})

export class FriendModule{}