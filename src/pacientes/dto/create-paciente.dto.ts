import { IsNotEmpty } from "class-validator";

export class CreatePacienteDto {
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    nome: string;

    // @IsNotEmpty()
    // sexo: string;

    @IsNotEmpty()
    data_nascimento: Date;

    @IsNotEmpty()
    contato: string;
}
