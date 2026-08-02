import { Injectable } from "@nestjs/common";
import { SupabaseService } from "src/supabaseService";

@Injectable()
export class ThreadService{
    constructor(
        private readonly supabase: SupabaseService
    ){}

    async createThread(){
        
    }
}