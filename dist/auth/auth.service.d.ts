export declare class AuthService {
    private readonly suapAuthUrl;
    private readonly suapTokenUrl;
    private readonly clientId;
    private readonly clientSecret;
    private readonly redirectUri;
    getAuthUrl(): string;
    exchangeCodeForToken(code: string): Promise<any>;
}
