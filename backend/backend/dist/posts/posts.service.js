"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
let PostService = class PostService {
    supabaseClient = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
    async createPost(postId, userId, groupId, caption, mediaUrl, mediaType, latitude, longitude) {
        const { data, error } = await this.supabaseClient
            .from('posts')
            .insert({
            id: postId,
            user_id: userId,
            group_id: groupId,
            caption: caption,
            media_url: mediaUrl,
            media_type: mediaType,
            latitude: latitude,
            longitude: longitude
        })
            .select()
            .single();
        if (error) {
            throw error;
        }
        await this.createUpload(userId, data.id, mediaUrl, mediaType);
        return data;
    }
    async deletePost(postId) {
        const { error } = await this.supabaseClient
            .from('posts')
            .delete()
            .eq('id', postId);
        if (error) {
            throw error;
        }
    }
    async createUpload(userId, postId, filePath, mediaType) {
        const { data, error } = await this.supabaseClient
            .from('uploads')
            .insert({
            post_id: postId,
            user_id: userId,
            file_url: filePath,
            media_type: mediaType,
        })
            .select()
            .single();
        if (error) {
            throw error;
        }
        return data;
    }
    async deleteUploadFromStorage(postId, uploadId) {
        return null;
    }
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)()
], PostService);
//# sourceMappingURL=posts.service.js.map