import { Test, TestingModule } from '@nestjs/testing';
import { SectionsController } from './sections.controller';
import { SectionsService } from './sections.service';
import SectionDto from '../model/dto/section.dto';
import { AuthGuard } from '../auth/auth-guard';
import { getRepositoryToken } from '@nestjs/typeorm';
import User from '../model/entity/user.entity';
import { TokenValidatorService } from '../token-validator/token-validator.service';
import { IpBypasserService } from '../auth/ip-bypasser/ip-bypasser.service';

describe('SectionsController', () => {
  let controller: SectionsController;

  const mockService = {
    find: jest.fn().mockImplementation((): Promise<SectionDto[]> => {
      return Promise.resolve([
        {
          id: '1',
          title: 'My test section',
          icon: 'test-section',
          to: '/test',
        },
      ]);
    }),
  };

  const mockAuthGuard = {};

  const mockUserRepo = {};

  const mockTokenValidator = {};

  const mockBypass = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SectionsController],
      providers: [
        {
          provide: SectionsService,
          useValue: mockService,
        },
        {
          provide: AuthGuard,
          useValue: mockAuthGuard,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepo,
        },
        {
          provide: TokenValidatorService,
          useValue: mockTokenValidator,
        },
        {
          provide: IpBypasserService,
          useValue: mockBypass,
        },
      ],
    }).compile();

    controller = module.get<SectionsController>(SectionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Should get a sections list', async () => {
    const sections = await controller.getSections();

    expect(sections).toBeDefined();
    expect(sections.length).toBe(1);
    expect(sections[0].to).toBe('/test');
    expect(sections[0].title).toBe('My test section');
  });
});
