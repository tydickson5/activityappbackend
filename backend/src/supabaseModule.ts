import { Module } from '@nestjs/common'
import { SupabaseService } from './supabaseService';

@Module({
  providers: [SupabaseService],
  exports: [SupabaseService],
})
export class SupabaseModule {}