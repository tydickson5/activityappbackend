import { Module } from "@nestjs/common";
import { GroupController } from "./groups.controller";
import { GroupService } from "./groups.service";
import { SupabaseModule } from "src/supabaseModule";

@Module({
    imports: [SupabaseModule],
    controllers: [
        GroupController
    ],
    providers: [
        GroupService
    ]
})

export class GroupModule{}