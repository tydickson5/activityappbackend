import { Controller, UseGuards, Get, Req, Body, Post } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.gaurd";
import { UserService } from "./users.service";
import { request } from "node:http";

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
    constructor(private usersService: UserService){}

    @Get('me')
    async GetMe(@Req() request){
        return this.usersService.getProfile(request.user.id);
    }

    @Get('onboard')
    async PostOnboard(@Req() request){
        return this.usersService.onboardUser(request.user.id, request.user.email)
    }

    

}
