"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAtendimentoDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_atendimento_dto_1 = require("./create-atendimento.dto");
class UpdateAtendimentoDto extends (0, mapped_types_1.PartialType)(create_atendimento_dto_1.CreateAtendimentoDto) {
}
exports.UpdateAtendimentoDto = UpdateAtendimentoDto;
//# sourceMappingURL=update-atendimento.dto.js.map