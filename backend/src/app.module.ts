import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.service';
import { UserModule } from './users/users.module';
import { NotificationsModule } from './apn/notifications.module';
import { DeviceTokenController } from './apn/device-token.controller';
import { GroupModule } from './groups/groups.module';
import { PostModule } from './posts/posts.module';
import { SupabaseService } from './supabaseService';
import { SupabaseModule } from './supabaseModule';
import { CommentModule } from './posts/comments/comments.module';
import { LikeModule } from './posts/likes/likes.module';


@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }), 
        SupabaseModule,
        AuthModule,
        UserModule,
        NotificationsModule,
        GroupModule,
        PostModule,
        CommentModule,
        LikeModule
    ],
    controllers: [AppController,DeviceTokenController],
    providers: [AppService, SupabaseService],
})
export class AppModule {}
