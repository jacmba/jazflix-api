import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should return built query string', () => {
    const authUri = service.requestAuth();
    const expected =
      'https://accounts.google.com/o/oauth2/v2/auth?response_type=code&scope=profile+email&client_id=clientId&redirect_uri=http%3A%2F%2Flocalhost%3A3000&access_type=offline';

    expect(authUri).toBe(expected);
  });
});
