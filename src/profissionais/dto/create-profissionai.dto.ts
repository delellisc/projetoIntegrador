import { IsNotEmpty } from "class-validator";
import { Especializacao } from "src/especializacoes/entities/especializacoe.entity";

export class CreateProfissionaiDto {
    @IsNotEmpty()
    nome: string;

    @IsNotEmpty()
    registro_profissional: string;

    @IsNotEmpty()
    status: string;

    @IsNotEmpty()
    especializacao: Especializacao;
}
