"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProfissionaiDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_profissionai_dto_1 = require("./create-profissionai.dto");
class UpdateProfissionaiDto extends (0, mapped_types_1.PartialType)(create_profissionai_dto_1.CreateProfissionaiDto) {
}
exports.UpdateProfissionaiDto = UpdateProfissionaiDto;
//# sourceMappingURL=update-profissionai.dto.js.map