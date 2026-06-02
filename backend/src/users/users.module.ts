import { Module } from "@nestjs/common";
import { UserController } from "./users.controller";
import { UserService } from "./users.service";
import { SupabaseModule } from "src/supabaseModule";

@Module({
    imports: [SupabaseModule],
    controllers: [
        UserController
    ],
    providers: [
        UserService
    ]
})

export class UserModule{}