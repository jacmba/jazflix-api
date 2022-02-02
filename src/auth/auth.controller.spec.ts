import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  const mockService = {
    requestAuth: jest
      .fn()
      .mockImplementation(() => 'http://auth.com?client_id=123'),
    getToken: jest.fn().mockResolvedValue('myMockToken'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Should return uri given by service', () => {
    const result = controller.getAuth();
    expect(result).toBe('http://auth.com?client_id=123');
  });

  it('Should return a mock jwt', async () => {
    const token = await controller.getAuthToken('myMockCode');
    expect(token).toBe('myMockToken');
  });
});
