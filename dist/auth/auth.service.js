"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const dotenv = require("dotenv");
dotenv.config();
let AuthService = class AuthService {
    constructor() {
        this.suapAuthUrl = 'https://suap.ifrn.edu.br/o/authorize/';
        this.suapTokenUrl = 'https://suap.ifrn.edu.br/o/token/';
        this.clientId = process.env.SUAP_CLIENT_ID;
        this.clientSecret = process.env.SUAP_CLIENT_SECRET;
        this.redirectUri = 'http://localhost:3000/auth/callback';
    }
    getAuthUrl() {
        return `${this.suapAuthUrl}?response_type=code&client_id=${this.clientId}&redirect_uri=${encodeURIComponent(this.redirectUri)}`;
    }
    async exchangeCodeForToken(code) {
        try {
            const response = await axios_1.default.post(this.suapTokenUrl, new URLSearchParams({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: this.redirectUri,
                client_id: this.clientId,
                client_secret: this.clientSecret,
            }), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
            return response.data;
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Erro ao trocar código por token');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)()
], AuthService);
//# sourceMappingURL=auth.service.js.map