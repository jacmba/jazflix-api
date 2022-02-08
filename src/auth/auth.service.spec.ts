import { Test, TestingModule } from '@nestjs/testing';
import axios from 'axios';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import User from '../model/entity/user.entity';
import { HttpException } from '@nestjs/common';
import { TokenValidatorService } from '../token-validator/token-validator.service';

jest.mock('axios');

describe('AuthService', () => {
  let service: AuthService;

  const mockRepo = {
    findOne: jest.fn(),
  };

  const mockValidator = {
    validate: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepo,
        },
        {
          provide: TokenValidatorService,
          useValue: mockValidator,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should return built query string', () => {
    const authUri = service.requestAuth();
    const expected =
      'https://accounts.google.com/o/oauth2/v2/auth?response_type=code&scope=profile+email&client_id=clientId&redirect_uri=http%3A%2F%2Flocalhost%3A3000&access_type=offline&prompt=consent';

    expect(authUri).toBe(expected);
  });

  it('Should return token data', async () => {
    (axios.post as jest.Mock).mockResolvedValue({
      data: { id_token: 'foo', refresh_token: 'bar' },
    });
    mockValidator.validate.mockReturnValue('jdoe');
    mockRepo.findOne.mockReturnValue({ allowed: true });

    const result = await service.getToken('mycode');
    expect(mockValidator.validate).toBeCalledWith('foo');
    expect(mockRepo.findOne).toBeCalledWith({ name: 'jdoe' });
    expect(result.token).toBe('foo');
    expect(result.refresh_token).toBe('bar');
  });

  it('Should return refreshed token', async () => {
    (axios.post as jest.Mock).mockResolvedValue({
      data: { id_token: 'ey123myNewFreshToken' },
    });

    const result = await service.refreshToken('myCode');
    expect(result).toBe('ey123myNewFreshToken');
  });

  it('Should throw unauthorized error when token is not valid', async () => {
    (axios.post as jest.Mock).mockResolvedValue({
      data: { id_token: 'eymock', refresh_token: 'foobar' },
    });

    mockValidator.validate.mockReturnValue(false);
    expect.assertions(4);
    try {
      await service.getToken('anyCode');
    } catch (e) {
      expect(mockValidator.validate).toHaveBeenCalledWith('eymock');
      expect(e).toBeInstanceOf(HttpException);
      const err = e as HttpException;
      expect(err.message).toBe('Invalid ID token');
      expect(err.getStatus()).toBe(401);
    }
  });

  it('Should throw unauthorized error when user is not found', async () => {
    (axios.post as jest.Mock).mockResolvedValue({
      data: { id_token: 'eyMock' },
    });
    mockValidator.validate.mockReturnValue('jdoe');
    mockRepo.findOne.mockResolvedValue(null);
    expect.assertions(4);
    try {
      await service.getToken('someCode');
    } catch (e) {
      expect(mockRepo.findOne).toHaveBeenCalledWith({ name: 'jdoe' });
      expect(e).toBeInstanceOf(HttpException);
      const err = e as HttpException;
      expect(err.message).toBe('User jdoe not found');
      expect(err.getStatus()).toBe(401);
    }
  });

  it('Should throw unauthorized error when user is not allowed', async () => {
    (axios.post as jest.Mock).mockResolvedValue({
      data: { id_token: 'eyMock' },
    });
    mockValidator.validate.mockReturnValue('jdoe');
    mockRepo.findOne.mockResolvedValue({ allowed: false });
    expect.assertions(4);
    try {
      await service.getToken('anotherCode');
    } catch (e) {
      expect(mockRepo.findOne).toHaveBeenCalledWith({ name: 'jdoe' });
      expect(e).toBeInstanceOf(HttpException);
      const err = e as HttpException;
      expect(err.message).toBe('User jdoe not allowed');
      expect(err.getStatus()).toBe(401);
    }
  });
});
