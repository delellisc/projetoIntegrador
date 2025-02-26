import { PacientesService } from './pacientes/pacientes.service';
import { ProfissionaisService } from './profissionais/profissionais.service';
import { AppService } from './app.service';
import { Response } from 'express';
export declare class AppController {
    private readonly appService;
    private readonly pacientesService;
    private readonly profissionalService;
    constructor(appService: AppService, pacientesService: PacientesService, profissionalService: ProfissionaisService);
    getPaciente(id: number): Promise<{
        paciente: import("./pacientes/entities/paciente.entity").Paciente;
    }>;
    getAgendamentos(session: Record<string, any>, res: Response): Promise<void>;
    getPerfil(session: Record<string, any>): {
        error: string;
        user?: undefined;
        message?: undefined;
    } | {
        user: any;
        message: string;
        error?: undefined;
    };
    getHistorico(session: Record<string, any>): {
        error: string;
        user?: undefined;
        message?: undefined;
    } | {
        user: any;
        message: string;
        error?: undefined;
    };
    getIndex(): {};
    getAdmin(): {};
}
