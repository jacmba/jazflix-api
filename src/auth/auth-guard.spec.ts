import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from './auth-guard';
import { TokenValidatorService } from '../token-validator/token-validator.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import User from '../model/entity/user.entity';
import { ExecutionContext } from '@nestjs/common';
import { IpBypasserService } from './ip-bypasser/ip-bypasser.service';

describe('AuthGuard', () => {
  let provider: AuthGuard;

  const validatorMock = {
    validate: jest.fn(),
  };

  const mockRepo = {
    findOne: jest.fn(),
  };

  const bypassMock = {
    bypass: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthGuard,
        {
          provide: TokenValidatorService,
          useValue: validatorMock,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockRepo,
        },
        {
          provide: IpBypasserService,
          useValue: bypassMock,
        },
      ],
    }).compile();

    provider = module.get<AuthGuard>(AuthGuard);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('Should validate jdoe account', async () => {
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
          headers: {
            authorization: 'Bearer eythisIsAMockToken',
          },
        }),
      }),
    };

    validatorMock.validate.mockReturnValue('jdoe');
    mockRepo.findOne.mockResolvedValue({
      id: 'myId',
      name: 'jdoe',
      allowed: true,
    });

    const canDo = await provider.canActivate(context);
    expect(canDo).toBeTruthy();
  });

  it('Should reject a non valid token', async () => {
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
          headers: {
            authorization: 'Bearer thisIsAMockTokenNotValid',
          },
        }),
      }),
    };

    const canDo = await provider.canActivate(context);
    expect(canDo).toBeFalsy();
  });

  it('Should reject jdoe account when not allowed', async () => {
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
          headers: {
            authorization: 'Bearer eythisIsAMockToken',
          },
        }),
      }),
    };

    validatorMock.validate.mockReturnValue('jdoe');
    mockRepo.findOne.mockResolvedValue({
      id: 'myId',
      name: 'jdoe',
      allowed: false,
    });

    const canDo = await provider.canActivate(context);
    expect(canDo).toBeFalsy();
  });

  it('Should reject jdoe account when not found', async () => {
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
          headers: {
            authorization: 'Bearer eythisIsAMockToken',
          },
        }),
      }),
    };

    validatorMock.validate.mockReturnValue('jdoe');
    mockRepo.findOne.mockResolvedValue(undefined);

    const canDo = await provider.canActivate(context);
    expect(canDo).toBeFalsy();
  });

  it('Should not allow token provied by query params', async () => {
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
            token: 'eythisIsAMockToken',
          },
          headers: {},
        }),
      }),
    };

    validatorMock.validate.mockReturnValue('jdoe');
    mockRepo.findOne.mockResolvedValue({
      id: 'myId',
      name: 'jdoe',
      allowed: true,
    });

    const canDo = await provider.canActivate(context);
    expect(canDo).toBeFalsy();
  });

  it('Should allow reject request with missing token', async () => {
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
          query: {},
          headers: {},
        }),
      }),
    };

    const canDo = await provider.canActivate(context);
    expect(canDo).toBeFalsy();
  });

  it('Should allow a bypassed IP', async () => {
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
          query: {},
          headers: {},
          ip: '1.1.1.1',
        }),
      }),
    };

    bypassMock.bypass.mockReturnValue(true);

    const canDo = await provider.canActivate(context);
    expect(canDo).toBeTruthy();
  });

  it('Should fail with a non bypassed IP', async () => {
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
          query: {},
          headers: {},
          ip: '1.1.1.1',
        }),
      }),
    };

    bypassMock.bypass.mockReturnValue(false);

    const canDo = await provider.canActivate(context);
    expect(canDo).toBeFalsy();
  });
});
