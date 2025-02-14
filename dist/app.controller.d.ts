import { PacientesService } from './pacientes/pacientes.service';
import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    private readonly pacientesService;
    constructor(appService: AppService, pacientesService: PacientesService);
    root(): {
        msg1: string;
        msg2: string;
    };
    getAgendamentos(): {
        message: string;
    };
    getPerfil(): {
        message: string;
    };
    getHistorico(): {
        message: string;
    };
}
