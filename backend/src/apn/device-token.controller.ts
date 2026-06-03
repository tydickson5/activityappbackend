import { Body, Controller, Post } from '@nestjs/common';
import { SupabaseService } from 'src/supabaseService';

@Controller()
export class DeviceTokenController {
    constructor(
            private readonly supabase: SupabaseService,
        ) {}

    @Post('device-token')
    async register(
        @Body()
        body: {
            userId: string;
            deviceToken: string;
        },
    ) {

        console.log('REGISTER TOKEN BODY:', body);

        const result = await this.supabase.client
        .from('device_tokens')
        .upsert({
            user_id: body.userId,
            device_token: body.deviceToken,
        });

        console.log(result);

        return result;
    }
}