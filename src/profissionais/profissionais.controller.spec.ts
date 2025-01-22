import { Test, TestingModule } from '@nestjs/testing';
import { ProfissionaisController } from './profissionais.controller';
import { ProfissionaisService } from './profissionais.service';

describe('ProfissionaisController', () => {
  let controller: ProfissionaisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfissionaisController],
      providers: [ProfissionaisService],
    }).compile();

    controller = module.get<ProfissionaisController>(ProfissionaisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
