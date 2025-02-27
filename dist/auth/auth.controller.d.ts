import { AuthService } from './auth.service';
import { Response } from 'express';
import { PacientesService } from '../pacientes/pacientes.service';
import { ProfissionaisService } from '../profissionais/profissionais.service';
export declare class AuthController {
    private readonly authService;
    private readonly pacienteService;
    private readonly profissionalService;
    constructor(authService: AuthService, pacienteService: PacientesService, profissionalService: ProfissionaisService);
    login(): {
        url: string;
    };
    logout(res: Response, session?: Record<string, any>): Promise<void>;
    renderHome(res: Response, session?: Record<string, any>): Promise<void>;
    callback(code: string, res: Response, session?: Record<string, any>): Promise<void | Response<any, Record<string, any>>>;
    getUser(session: Record<string, any>): any;
}
