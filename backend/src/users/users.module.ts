import { Module } from "@nestjs/common";
import { UserController } from "./users.controller";
import { UserService } from "./users.service";
import { SupabaseModule } from "src/supabaseModule";
import { GroupModule } from "src/groups/groups.module";

@Module({
    imports: [SupabaseModule, GroupModule],
    controllers: [
        UserController
    ],
    providers: [
        UserService
    ]
})

export class UserModule{}