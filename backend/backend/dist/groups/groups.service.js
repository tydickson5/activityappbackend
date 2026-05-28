"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
let GroupService = class GroupService {
    supabaseClient = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
    async createGroup(userId, name) {
        const { data, error } = await this.supabaseClient
            .from('groups')
            .insert({
            user_id: userId,
            name: name
        })
            .select()
            .single();
        if (error) {
            throw error;
        }
        var newgroupid = data.id;
        var response = this.joinGroup(userId, newgroupid);
        return response;
    }
    async joinGroup(userId, groupId) {
        if (!this.groupExists(groupId)) {
            success: false;
        }
        const { data: existingMember } = await this.supabaseClient
            .from('group_memberships')
            .select('*')
            .eq('user_id', userId)
            .eq('group_id', groupId)
            .maybeSingle();
        if (existingMember) {
            return existingMember;
        }
        const { data, error } = await this.supabaseClient
            .from('group_memberships')
            .insert({
            user_id: userId,
            group_id: groupId
        })
            .select()
            .single();
        if (error) {
            throw error;
        }
        return data;
    }
    async groupExists(groupId) {
        const { data: existingGroup } = await this.supabaseClient
            .from('groups')
            .select('*')
            .eq('group_id', groupId)
            .maybeSingle();
        if (existingGroup) {
            return true;
        }
        return false;
    }
};
exports.GroupService = GroupService;
exports.GroupService = GroupService = __decorate([
    (0, common_1.Injectable)()
], GroupService);
//# sourceMappingURL=groups.service.js.map