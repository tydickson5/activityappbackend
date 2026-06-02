import { Injectable } from "@nestjs/common";
import { createClient } from "@supabase/supabase-js";
import WebSocket from 'ws';

// supabase.service.ts
@Injectable()
export class SupabaseService {
  readonly client = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      realtime: {
        transport: WebSocket as any,
      },
    }
  );
}