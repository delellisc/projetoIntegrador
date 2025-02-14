import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
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
