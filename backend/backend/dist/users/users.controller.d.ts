import { UserService } from "./users.service";
export declare class UserController {
    private usersService;
    constructor(usersService: UserService);
    GetMe(request: any): Promise<any>;
    PostOnboard(request: any): Promise<any>;
    create(body: {
        email: string;
    }): Promise<any>;
}
