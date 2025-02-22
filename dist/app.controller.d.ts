import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    root(): {
        message: string;
    };
    getAgendamentosProfisisonal(): {
        message: string;
    };
    getAgendamentosPaciente(): {
        message: string;
    };
    getPerfil(): {
        message: string;
    };
}
