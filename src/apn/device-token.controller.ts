import { Body, Controller, Post } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Controller()
export class DeviceTokenController {
    private supabaseClient = createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    @Post('device-token')
    async register(
        @Body()
        body: {
            userId: string;
            deviceToken: string;
        },
    ) {

        console.log('REGISTER TOKEN BODY:', body);

        const result = await this.supabaseClient
        .from('device_tokens')
        .upsert({
            user_id: body.userId,
            device_token: body.deviceToken,
        });

        console.log(result);

        return result;
    }
}