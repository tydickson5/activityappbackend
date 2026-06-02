"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupService = void 0;
const common_1 = require("@nestjs/common");
const supabaseService_1 = require("../supabaseService");
let GroupService = class GroupService {
    supabase;
    constructor(supabase) {
        this.supabase = supabase;
    }
    async createGroup(userId, name) {
        const { data, error } = await this.supabase.client
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
        const { data: existingMember } = await this.supabase.client
            .from('group_memberships')
            .select('*')
            .eq('user_id', userId)
            .eq('group_id', groupId)
            .maybeSingle();
        if (existingMember) {
            return existingMember;
        }
        const { data, error } = await this.supabase.client
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
        const { data: existingGroup } = await this.supabase.client
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
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabaseService_1.SupabaseService])
], GroupService);
//# sourceMappingURL=groups.service.js.map