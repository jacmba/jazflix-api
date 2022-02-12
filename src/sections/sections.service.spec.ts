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

  it('Should return sections list sorted by order field', async () => {
    mockRepo.find.mockReturnValueOnce([
      {
        id: '1',
        icon: 'test-icon',
        title: 'Test section 1',
        to: 'test',
        order: 2,
      },
      {
        id: '2',
        icon: 'test-icon',
        title: 'Test section 2',
        to: 'test',
        order: 0,
      },
      {
        id: '3',
        icon: 'test-icon',
        title: 'Test section 3',
        to: 'test',
        order: 1,
      },
    ]);

    const sections = await service.find();
    expect(sections.length).toBe(3);
    expect(sections[0].title).toBe('Test section 2');
    expect(sections[1].title).toBe('Test section 3');
    expect(sections[2].title).toBe('Test section 1');
  });
});
