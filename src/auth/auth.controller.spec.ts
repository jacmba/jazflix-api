import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import User from '../model/entity/user.entity';
import { TokenValidatorService } from '../token-validator/token-validator.service';
import { AuthGuard } from './auth-guard';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { IpBypasserService } from './ip-bypasser/ip-bypasser.service';

describe('AuthController', () => {
  let controller: AuthController;

  const mockService = {
    requestAuth: jest
      .fn()
      .mockImplementation(() => 'http://auth.com?client_id=123'),
    getToken: jest.fn().mockResolvedValue({
      token: 'myMockToken',
      refresh_token: 'myMockRefreshToken',
    }),
    refreshToken: jest.fn().mockResolvedValue('eyFreshToken'),
    getVideoToken: jest.fn().mockReturnValue('eyMockVideoToken'),
  };

  const mockAuthGuard = {};
  const mockUserRepo = {};
  const mockTokenValidator = {};
  const mockBypass = {
    bypass: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
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
    expect(token.token).toBe('myMockToken');
    expect(token.refresh_token).toBe('myMockRefreshToken');
  });

  it('Should return a refresh token', async () => {
    const token = await controller.getRefreshToken('myCode');
    expect(token).toBe('eyFreshToken');
  });

  it('Should get a video token', () => {
    const req = {
      headers: {
        authorization: 'Bearer eyMockIDToken',
      },
    };
    const token = controller.getVideoToken(req as any);
    expect(mockService.getVideoToken).toHaveBeenCalledWith('eyMockIDToken');
    expect(token).toBe('eyMockVideoToken');
  });

  it('Should bypass given IP', () => {
    mockBypass.bypass.mockReturnValue(true);

    const bypass = controller.getBypass('1.1.1.1');

    expect(mockBypass.bypass).toHaveBeenCalledWith('1.1.1.1');
    expect(bypass).toBeTruthy();
  });

  it('Should not bypass given IP', () => {
    mockBypass.bypass.mockReturnValue(false);

    const bypass = controller.getBypass('3.3.3.3');

    expect(mockBypass.bypass).toHaveBeenCalledWith('3.3.3.3');
    expect(bypass).toBeFalsy();
  });
});
