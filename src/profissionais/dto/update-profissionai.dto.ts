import { PartialType } from '@nestjs/mapped-types';
import { CreateProfissionaiDto } from './create-profissionai.dto';

export class UpdateProfissionaiDto extends PartialType(CreateProfissionaiDto) {}
