import { IsNotEmpty } from "class-validator";
import { Profissional } from "src/profissionais/entities/profissionai.entity";

export class CreateAtendimentoDto {
    @IsNotEmpty()
    horario: Date;

    @IsNotEmpty()
    status: string;

    @IsNotEmpty()
    profissional: Profissional;
}
