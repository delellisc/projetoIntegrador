import { AuthService } from './auth.service';
import { Response } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(): {
        url: string;
    };
    callback(code: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
