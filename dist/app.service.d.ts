import { AuthService } from './auth/auth.service';
export declare class AppService {
    private readonly authService;
    constructor(authService: AuthService);
    getHello(): string;
    getSuapUserProfile(token: string): Promise<any>;
    getTokenFromAuthCode(code: string): Promise<any>;
}
