import { Test, TestingModule } from '@nestjs/testing';
import { VideoTokenValidator } from './video-token-validator';
import { VideoTokenHasher } from './video-token-hasher';

describe('VideoTokenValidator', () => {
  let provider: VideoTokenValidator;

  const mockHasher = {
    getObject: jest.fn().mockReturnValue({
      iss: 'https://accounts.google.com',
      azp: 'clientId',
      aud: 'clientId',
      email: 'jdoe@gmail.com',
      email_verified: true,
      name: 'John Doe',
      picture: 'http://example.com/jdoe.png',
      given_name: 'John',
      family_name: 'Doe',
    }),

    getHash: jest.fn().mockReturnValue('$a$mockHash'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VideoTokenValidator,
        {
          provide: VideoTokenHasher,
          useValue: mockHasher,
        },
      ],
    }).compile();

    jest.clearAllMocks();

    provider = module.get<VideoTokenValidator>(VideoTokenValidator);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('Validation should be successful for valid token', () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiamRvZUBnbWFpbC5jb20iLCJoYXNoIjoiJDJhJDEyJDhDRXc1eUVRS05seURYSGNVcUVWNGV3YWwyUGh0anJIcjhScWU0VjFLdDZMaWI2cmg3VnIuIiwiaWF0IjoxNjQ0NTMyMzYyLCJleHAiOjk5OTk5OTk5OTl9.h0ZO_jWAEZjQYPaR-ioVp6mWV-IJfR335F_gBYxJfLw$$$$$eyMockToken';

    const isValid = provider.validate(token);
    expect(mockHasher.getObject).toHaveBeenCalledWith('eyMockToken');
    expect(isValid).toBe('jdoe@gmail.com');
  });

  it('Validation should fail with empty token', () => {
    const isValid = provider.validate('');
    expect(mockHasher.getObject).toHaveBeenCalledTimes(0);
    expect(isValid).toBeFalsy();
  });

  it('Validation should fail when video token is not provided', () => {
    const token = '$$$$$eyMockToken';
    const isValid = provider.validate(token);
    expect(mockHasher.getObject).toHaveBeenCalledTimes(0);
    expect(isValid).toBeFalsy();
  });

  it('Validation should fail when ID hash token is not provided', () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiamRvZUBnbWFpbC5jb20iLCJoYXNoIjoiJDJhJDEyJDhDRXc1eUVRS05seURYSGNVcUVWNGV3YWwyUGh0anJIcjhScWU0VjFLdDZMaWI2cmg3VnIuIiwiaWF0IjoxNjQ0NTMyMzYyLCJleHAiOjk5OTk5OTk5OTl9.h0ZO_jWAEZjQYPaR-ioVp6mWV-IJfR335F_gBYxJfLw';

    const isValid = provider.validate(token);
    expect(mockHasher.getObject).toHaveBeenCalledTimes(0);
    expect(isValid).toBeFalsy();
  });

  it('Validation should fail on token user mismatch', () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiam9lQGdtYWlsLmNvbSIsImhhc2giOiIkMmEkMTIkOENFdzV5RVFLTmx5RFhIY1VxRVY0ZXdhbDJQaHRqckhyOFJxZTRWMUt0NkxpYjZyaDdWci4iLCJpYXQiOjE2NDQ1MzIzNjIsImV4cCI6OTk5OTk5OTk5OX0.61WE5xi2eFSmk49KGKGFP_8PxNi3DdJt_GpPS91-Rko$$$$$eyMockToken';

    const isValid = provider.validate(token);
    expect(mockHasher.getObject).toHaveBeenCalledWith('eyMockToken');
    expect(isValid).toBeFalsy();
  });

  it('Validation should fail when hash does not match', () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiamRvZUBnbWFpbC5jb20iLCJoYXNoIjoiJDJhJDEyJDhDRXc1eUVRS05seURYSGNVcUVWNGV3YWwyUGh0anJIcjhScWU0VjFLdDZMaWI2cmg3VnIucyIsImlhdCI6MTY0NDUzMjM2MiwiZXhwIjo5OTk5OTk5OTk5fQ.HDov1wM9R1t5GutSuqLXYIix7thyAV7mKdvwK3UHsUY$$$$$eyMockToken';

    const isValid = provider.validate(token);
    expect(mockHasher.getObject).toHaveBeenCalledWith('eyMockToken');
    expect(isValid).toBeFalsy();
  });

  it('Validation should fail with expired token', () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiamRvZUBnbWFpbC5jb20iLCJoYXNoIjoiJDJhJDEyJDhDRXc1eUVRS05seURYSGNVcUVWNGV3YWwyUGh0anJIcjhScWU0VjFLdDZMaWI2cmg3VnIuIiwiaWF0IjoxNjQ0NTMyMzYyLCJleHAiOjEwMDAwMDAwMDB9.qhirTwxyZ9tFupF-rdlDo8QwX2PaNopxHbMpnIqjQ1E$$$$$eyMockToken';

    const isValid = provider.validate(token);
    expect(mockHasher.getObject).toHaveBeenCalledWith('eyMockToken');
    expect(isValid).toBeFalsy();
  });
});
