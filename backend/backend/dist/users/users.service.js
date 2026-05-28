"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
let UserService = class UserService {
    supabaseClient = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
    async getProfile(userId) {
        const { data, error } = await this.supabaseClient
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();
        if (error) {
            throw error;
        }
        return data;
    }
    async onboardUser(userId, email) {
        const { data: existingProfile } = await this.supabaseClient
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .maybeSingle();
        if (existingProfile) {
            return existingProfile;
        }
        const { data, error } = await this.supabaseClient
            .from('profiles')
            .insert({
            id: userId,
            username: email.split('@')[0]
        })
            .select()
            .single();
        if (error) {
            throw error;
        }
        return data;
    }
    async addToWaitlist(email) {
        const { data, error } = await this.supabaseClient
            .from('waitlist')
            .insert({
            email: email
        })
            .select()
            .single();
        if (error) {
            throw error;
        }
        return data;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)()
], UserService);
//# sourceMappingURL=users.service.js.map