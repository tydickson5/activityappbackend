import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SupabaseModule } from './supabase/supabase.module';
import { AuthModule } from './auth/auth.service';
import { UserModule } from './users/users.module';
import { NotificationsModule } from './apn/notifications.module';
import { DeviceTokenController } from './apn/device-token.controller';


@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }), 
        SupabaseModule,
        AuthModule,
        UserModule,
        NotificationsModule
    ],
    controllers: [AppController,DeviceTokenController],
    providers: [AppService],
})
export class AppModule {}
