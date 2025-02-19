import { AuthService } from './auth.service';
import { Response } from 'express';
import { PacientesService } from 'src/pacientes/pacientes.service';
export declare class AuthController {
    private readonly authService;
    private readonly pacienteService;
    constructor(authService: AuthService, pacienteService: PacientesService);
    login(): {
        url: string;
    };
    renderHome(res: Response, session?: Record<string, any>): Promise<void>;
    callback(code: string, res: Response, session?: Record<string, any>): Promise<Response<any, Record<string, any>>>;
    getUser(session: Record<string, any>): any;
}
