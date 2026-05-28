import { Controller, UseGuards, Get, Req, Body, Post } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.gaurd";
import { UserService } from "./users.service";
import { request } from "node:http";


@Controller('users')
export class UserController {
    constructor(private usersService: UserService){}

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async GetMe(@Req() request){
        return this.usersService.getProfile(request.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('onboard')
    async PostOnboard(@Req() request){
        return this.usersService.onboardUser(request.user.id, request.user.email)
    }

    @Post('waitlist')
    create(
        @Body()
        body: {
            email: string
        }
    ){
        return this.usersService.addToWaitlist(body.email)
    }

}
