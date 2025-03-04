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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const pacientes_service_1 = require("../pacientes/pacientes.service");
const profissionais_service_1 = require("../profissionais/profissionais.service");
let AuthController = class AuthController {
    constructor(authService, pacienteService, profissionalService) {
        this.authService = authService;
        this.pacienteService = pacienteService;
        this.profissionalService = profissionalService;
    }
    login() {
        return { url: this.authService.getAuthUrl() };
    }
    async logout(res, session) {
        if (session) {
            session.destroy((erro) => {
                if (erro) {
                    return res.status(500).json({ error: "erro ao encerrar a sessão" });
                }
                return res.redirect('/home');
            });
        }
        else {
            return res.redirect('/home');
        }
    }
    async renderHome(res, session) {
        if (!session || !session.user) {
            return res.redirect('/auth/login');
        }
        const pacienteId = session.user.matricula;
        const atendimentos = await this.pacienteService.findAtendimentos(pacienteId);
        return res.render('pagina_inicial_logado', { user: session.user, id: session.user.matricula });
    }
    async callback(code, res, session) {
        if (!code) {
            return res.status(400).json({ error: 'Código de autorização ausente' });
        }
        if (!session) {
            console.error("Erro: sessão não foi inicializada!");
            return res.status(500).json({ error: 'Sessão não inicializada' });
        }
        try {
            const token = await this.authService.exchangeCodeForToken(code);
            session.token = token;
            const userData = await this.authService.getUserData(token);
            session.user = userData;
            let redirectURL;
            const isProfissional = await this.profissionalService.isRegistered(userData.matricula);
            if (!isProfissional) {
                const pacienteDto = {
                    id: userData.matricula,
                    nome: userData.nome_usual,
                    data_nascimento: userData.data_nascimento,
                    contato: userData.email
                };
                await this.pacienteService.findOrCreate(pacienteDto);
                redirectURL = "http://localhost:3000/auth/pagina_inicial_logado";
            }
            else {
                redirectURL = "http://localhost:3000/agendamentos";
            }
            return res.redirect(302, redirectURL);
        }
        catch (error) {
            console.log("erro:", error);
            return res.status(401).json({ error: 'Falha ao autenticar' });
        }
    }
    getUser(session) {
        if (!session.user) {
            throw new common_1.UnauthorizedException('Usuário não autenticado');
        }
        return session.user;
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Get)('login'),
    (0, common_1.Redirect)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('logout'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)('pagina_inicial_logado'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "renderHome", null);
__decorate([
    (0, common_1.Get)('callback'),
    __param(0, (0, common_1.Query)('code')),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "callback", null);
__decorate([
    (0, common_1.Get)('user'),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getUser", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        pacientes_service_1.PacientesService,
        profissionais_service_1.ProfissionaisService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map