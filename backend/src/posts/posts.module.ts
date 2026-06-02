import { Module } from "@nestjs/common";
import { PostController } from "./posts.controller";
import { PostService } from "./posts.service";
import { SupabaseModule } from "src/supabaseModule";

@Module({
    imports: [SupabaseModule],
    controllers: [
        PostController
    ],
    providers: [
        PostService
    ]
})

export class PostModule{}