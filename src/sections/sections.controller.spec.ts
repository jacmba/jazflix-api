import { Test, TestingModule } from '@nestjs/testing';
import Section from '../model/section.entity';
import { SectionsController } from './sections.controller';
import { SectionsService } from './sections.service';

describe('SectionsController', () => {
  let controller: SectionsController;

  const mockService = {
    find: jest.fn().mockImplementation((): Promise<Section[]> => {
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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SectionsController],
      providers: [
        {
          provide: SectionsService,
          useValue: mockService,
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
    expect(sections[0].id).toBe('1');
    expect(sections[0].title).toBe('My test section');
  });
});
