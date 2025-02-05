import { PartialType } from '@nestjs/mapped-types';
import { CreateEspecializacoeDto } from './create-especializacoe.dto';

export class UpdateEspecializacoeDto extends PartialType(CreateEspecializacoeDto) {}
