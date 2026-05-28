import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "dist/auth/jwt-auth.gaurd";
import { GroupService } from "./groups.service";

@Controller('groups')
@UseGuards(JwtAuthGuard)
export class GroupController {
    constructor(private groupsService: GroupService){}

    @Post('create')
    async create(
        @Body()
        body: {
            userId: string
            name: string
        },
    ){
        return this.groupsService.createGroup(body.userId, body.name)
    }

    @Post('join')
    async join(
        @Body()
        body: {
            userId: string,
            groupId: string
        },
    ){
        return this.groupsService.joinGroup(body.userId, body.groupId)
    }
}