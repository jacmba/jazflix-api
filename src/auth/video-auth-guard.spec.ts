import { Test, TestingModule } from '@nestjs/testing';
import { VideoAuthGuard } from './video-auth-guard';
import { VideoTokenValidator } from '../video-token/video-token-validator';
import { getRepositoryToken } from '@nestjs/typeorm';
import User from '../model/entity/user.entity';
import { ExecutionContext } from '@nestjs/common';
import { IpBypasserService } from './ip-bypasser/ip-bypasser.service';

describe('VideoAuthGuard', () => {
  let provider: VideoAuthGuard;

  const mockValidator = {
    validate: jest.fn(),
  };

  const mockRepo = {
    findOne: jest.fn(),
  };

  const mockBypass = {
    bypass: jest.fn(),
  };

  const context: ExecutionContext = {
    getClass: jest.fn(),
    getArgByIndex: jest.fn(),
    getArgs: jest.fn(),
    getHandler: jest.fn(),
    getType: jest.fn(),
    switchToRpc: jest.fn(),
    switchToWs: jest.fn(),
    switchToHttp: jest.fn().mockReturnValue({
      getRequest: jest.fn().mockReturnValue({
        query: {
          token: 'mockToken',
        },
        ip: '1.2.3.4',
      }),
    }),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VideoAuthGuard,
        {
          provide: VideoTokenValidator,
          useValue: mockValidator,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockRepo,
        },
        {
          provide: IpBypasserService,
          useValue: mockBypass,
        },
      ],
    }).compile();

    provider = module.get<VideoAuthGuard>(VideoAuthGuard);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('Should validate a right token', async () => {
    mockValidator.validate.mockReturnValue('jdoe');
    mockRepo.findOne.mockResolvedValue({
      name: 'jdoe',
      allowed: true,
    });

    const canActivate = await provider.canActivate(context);
    expect(mockValidator.validate).toHaveBeenCalledWith('mockToken');
    expect(mockRepo.findOne).toHaveBeenCalledWith({ name: 'jdoe' });
    expect(canActivate).toBeTruthy();
  });

  it('Should not validate when token is wrong', async () => {
    mockValidator.validate.mockReturnValue(false);

    const canActivate = await provider.canActivate(context);
    expect(mockValidator.validate).toHaveBeenCalledWith('mockToken');
    expect(mockRepo.findOne).toHaveBeenCalledTimes(0);
    expect(canActivate).toBeFalsy();
  });

  it('Should not validate when user does not exist', async () => {
    mockValidator.validate.mockReturnValue('jdoe');
    mockRepo.findOne.mockResolvedValue(undefined);

    const canActivate = await provider.canActivate(context);
    expect(mockValidator.validate).toHaveBeenCalledWith('mockToken');
    expect(mockRepo.findOne).toHaveBeenCalledWith({ name: 'jdoe' });
    expect(canActivate).toBeFalsy();
  });

  it('Should not validate when user is not allowed', async () => {
    mockValidator.validate.mockReturnValue('jdoe');
    mockRepo.findOne.mockResolvedValue({
      name: 'jdoe',
      allowed: false,
    });

    const canActivate = await provider.canActivate(context);
    expect(mockValidator.validate).toHaveBeenCalledWith('mockToken');
    expect(mockRepo.findOne).toHaveBeenCalledWith({ name: 'jdoe' });
    expect(canActivate).toBeFalsy();
  });

  it('Should validate for an allowed ip', async () => {
    mockBypass.bypass.mockReturnValue(true);

    const canActivate = await provider.canActivate(context);
    expect(mockBypass.bypass).toHaveBeenCalledWith('1.2.3.4');
    expect(mockValidator.validate).toHaveBeenCalledTimes(0);
    expect(canActivate).toBeTruthy();
  });
});
