import { IsNotEmpty } from "class-validator";

export class CreateEspecializacoeDto {
    @IsNotEmpty()
    nome: string;
}
