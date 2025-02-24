import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    root(): {
        message: string;
    };
    getAgendamentosProfisisonal(): {
        id: number;
    };
    getAgendamentosPaciente(): {
        id: number;
    };
    getPerfil(): {
        message: string;
    };
}
