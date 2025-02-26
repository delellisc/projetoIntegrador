import { PacientesService } from './pacientes/pacientes.service';
import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    private readonly pacientesService;
    constructor(appService: AppService, pacientesService: PacientesService);
    getPaciente(id: number): Promise<{
        paciente: import("./pacientes/entities/paciente.entity").Paciente;
    }>;
    getAgendamentos(): {
        message: string;
    };
    getPerfil(session: Record<string, any>): {
        message: string;
        user?: undefined;
    } | {
        user: any;
        message?: undefined;
    };
    getHistorico(): {
        message: string;
    };
    getIndex(): {};
    getAdmin(): {};
}
