import { Module } from "@nestjs/common";
import { GroupController } from "./groups.controller";
import { GroupService } from "./groups.service";

@Module({
    controllers: [
        GroupController
    ],
    providers: [
        GroupService
    ]
})

export class GroupModule{}