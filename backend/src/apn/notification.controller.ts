import { Body, Controller, Delete, Param, Patch, Post } from "@nestjs/common";
import { NotificationService } from "./notification.service";

@Controller('notifications')
export class NotificationController {
    constructor(private readonly notificationsService: NotificationService){}

    @Post()
    create(
        @Body()
        body: {
            userId: string,
            title: string,
            body: string,
        },
    ) {
        return this.notificationsService.createNotification(body.userId,body.title,body.body)
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body()
        body: {
            title: string;
            body: string;
        },
    ){
        return this.notificationsService.updateNotification(id, body.title, body.body)
    }

    @Delete(':id')
    delete(@Param('id') id: string){
        return this.notificationsService.deleteNotification(id)
    }
}