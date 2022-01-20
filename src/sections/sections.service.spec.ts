import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import Section from '../model/entity/section.entity';
import { SectionsService } from './sections.service';

describe('SectionsService', () => {
  let service: SectionsService;

  const mockRepo = {
    find: jest.fn().mockImplementation((): Promise<Section[]> => {
      return Promise.resolve([
        {
          id: '1',
          icon: 'test-icon',
          title: 'Test section',
          to: 'test',
        },
      ]);
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SectionsService,
        {
          provide: getRepositoryToken(Section),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<SectionsService>(SectionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a sections list', async () => {
    const sections = await service.find();

    expect(sections).toBeDefined();
    expect(sections.length).toBe(1);
    expect(sections[0].to).toBe('test');
    expect(sections[0].icon).toBe('test-icon');
  });
});
