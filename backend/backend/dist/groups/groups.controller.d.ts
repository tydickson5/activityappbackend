import { GroupService } from "./groups.service";
export declare class GroupController {
    private groupsService;
    constructor(groupsService: GroupService);
    create(body: {
        userId: string;
        name: string;
    }): Promise<any>;
    join(body: {
        userId: string;
        groupId: string;
    }): Promise<any>;
}
