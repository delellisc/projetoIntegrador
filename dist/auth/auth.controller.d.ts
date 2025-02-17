import { AuthService } from './auth.service';
import { Response } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(): {
        url: string;
    };
    renderHome(res: Response, session?: Record<string, any>): void;
    callback(code: string, res: Response, session?: Record<string, any>): Promise<void | Response<any, Record<string, any>>>;
    getUser(session: Record<string, any>): any;
}
