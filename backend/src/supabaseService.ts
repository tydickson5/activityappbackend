import 'dotenv/config';
import { Injectable } from "@nestjs/common";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import ws from 'ws';

const DEV = true;  // flip this to switch environments

const CONFIGS = {
    staging: {
        url: 'https://coeythfyfwzrwzuqowfe.supabase.co',
        key: process.env.SUPABASE_SERVICE_ROLE_KEY_DEV!,
    },
    production: {
        url: 'https://vdxqfhrsuhmqdbpeqtbt.supabase.co',
        key: process.env.SUPABASE_SERVICE_ROLE_KEY!,
    },
};

@Injectable()
export class SupabaseService {

    readonly client: SupabaseClient;

    constructor() {
        const config = DEV ? CONFIGS.staging : CONFIGS.production;
        console.log(`🔌 Supabase connected: ${config.url} (${DEV ? 'STAGING' : 'PRODUCTION'})`);
        this.client = createClient(config.url, config.key);
    }
}