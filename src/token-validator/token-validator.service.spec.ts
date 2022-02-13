import { Test, TestingModule } from '@nestjs/testing';
import axios from 'axios';
import { TokenValidatorService } from './token-validator.service';

jest.mock('axios');

describe('TokenValidator', () => {
  let provider: TokenValidatorService;

  const mockCerts = {
    '182e450a35a2081faa1d9ae1d2d75a0f23d91df8':
      '-----BEGIN CERTIFICATE-----\nMIIDJjCCAg6gAwIBAgIIHmGieIRAf8cwDQYJKoZIhvcNAQEFBQAwNjE0MDIGA1UE\nAxMrZmVkZXJhdGVkLXNpZ25vbi5zeXN0ZW0uZ3NlcnZpY2VhY2NvdW50LmNvbTAe\nFw0yMjAxMzExNTIxMzVaFw0yMjAyMTcwMzM2MzVaMDYxNDAyBgNVBAMTK2ZlZGVy\nYXRlZC1zaWdub24uc3lzdGVtLmdzZXJ2aWNlYWNjb3VudC5jb20wggEiMA0GCSqG\nSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCLTyfnyin6v9HZNrcBvue0R1ksL8htzGQv\nD+XFbNcsnIPM7j8z8Z90zu/HNXODtXSj6AzFijZOYVnPUSLfCaYhj6ccte3nQEY4\nHJ/j+4ieZqwkN6XXT9Nfm1TU9Yf6CY+vPxSGPrWclV6cdKy5l0xUfR+3g6KThnRy\nj5pkLOktxOruUNsqrDXgzB5WEyHqMbLrIUXZMikM0CIogAeta5k0zuO7NYhFdpSf\nPCu4VM3bfGHLZZOYCQzIL/EOSQ6BbJnwqQNNCVRqU6HeNRzM5UuCWim56GY0GIBs\nhnDeYZtTPqcOGRuTjtx01a7WsKdygrrwjLRDTBEICo7xbrEIUNZjAgMBAAGjODA2\nMAwGA1UdEwEB/wQCMAAwDgYDVR0PAQH/BAQDAgeAMBYGA1UdJQEB/wQMMAoGCCsG\nAQUFBwMCMA0GCSqGSIb3DQEBBQUAA4IBAQBCgUPbbDqC0TBK6GUeky9cEdm7S7Z/\nHlemVBNUwkYa5zHte2QIA4IVAhAnLcD5CkU67bgxYWvpBpkZY2xEdh7An9FBs2YB\nNP2e5VPyvH9Y8e4lGoAx7N4Swad+tYCK3815kCjZXDeoK7YQxlm7nDdCa5eRT5ZM\nbVjFtOsUSIqqqQsikqQHRPwJqywrRfQPlbKcbregNQyR93bISVzTPmn3T9VP4O0W\n3GN+5/4dnSLPnsz7O3qDOEVojh7SpLvyoxnqpDgE+LtIEMxLVjdwCksJ9jKW+B75\nhIggTCmZpqyymHh2rcgMdrVrpiYwaxqEXxn7A40xuwaeyREPC/7uXyyv\n-----END CERTIFICATE-----\n',
    '9eaa026f635157dfad532e4183a6b823d752ad1d':
      '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAu1SU1LfVLPHCozMxH2Mo\n4lgOEePzNm0tRgeLezV6ffAt0gunVTLw7onLRnrq0/IzW7yWR7QkrmBL7jTKEn5u\n+qKhbwKfBstIs+bMY2Zkp18gnTxKLxoS2tFczGkPLPgizskuemMghRniWaoLcyeh\nkd3qqGElvW/VDL5AaWTg0nLVkjRo9z+40RQzuVaE8AkAFmxZzow3x+VJYKdjykkJ\n0iT9wCS0DRTXu269V264Vf/3jvredZiKRkgwlL9xNAwxXFg0x/XFw005UWVRIkdg\ncKWTjpBP2dPwVZ4WWC+9aGVd+Gyn1o0CLelf4rEjGoXbAAEgAqeGUxrcIlbjXfbc\nmwIDAQAB\n-----END PUBLIC KEY-----',
  };

  (axios.get as jest.Mock).mockResolvedValue({ data: mockCerts });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokenValidatorService],
    }).compile();

    provider = module.get<TokenValidatorService>(TokenValidatorService);
    await provider.onModuleInit();
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('Should have certificates', () => {
    const key = '182e450a35a2081faa1d9ae1d2d75a0f23d91df8';
    const expected =
      '-----BEGIN CERTIFICATE-----\nMIIDJjCCAg6gAwIBAgIIHmGieIRAf8cwDQYJKoZIhvcNAQEFBQAwNjE0MDIGA1UE\nAxMrZmVkZXJhdGVkLXNpZ25vbi5zeXN0ZW0uZ3NlcnZpY2VhY2NvdW50LmNvbTAe\nFw0yMjAxMzExNTIxMzVaFw0yMjAyMTcwMzM2MzVaMDYxNDAyBgNVBAMTK2ZlZGVy\nYXRlZC1zaWdub24uc3lzdGVtLmdzZXJ2aWNlYWNjb3VudC5jb20wggEiMA0GCSqG\nSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCLTyfnyin6v9HZNrcBvue0R1ksL8htzGQv\nD+XFbNcsnIPM7j8z8Z90zu/HNXODtXSj6AzFijZOYVnPUSLfCaYhj6ccte3nQEY4\nHJ/j+4ieZqwkN6XXT9Nfm1TU9Yf6CY+vPxSGPrWclV6cdKy5l0xUfR+3g6KThnRy\nj5pkLOktxOruUNsqrDXgzB5WEyHqMbLrIUXZMikM0CIogAeta5k0zuO7NYhFdpSf\nPCu4VM3bfGHLZZOYCQzIL/EOSQ6BbJnwqQNNCVRqU6HeNRzM5UuCWim56GY0GIBs\nhnDeYZtTPqcOGRuTjtx01a7WsKdygrrwjLRDTBEICo7xbrEIUNZjAgMBAAGjODA2\nMAwGA1UdEwEB/wQCMAAwDgYDVR0PAQH/BAQDAgeAMBYGA1UdJQEB/wQMMAoGCCsG\nAQUFBwMCMA0GCSqGSIb3DQEBBQUAA4IBAQBCgUPbbDqC0TBK6GUeky9cEdm7S7Z/\nHlemVBNUwkYa5zHte2QIA4IVAhAnLcD5CkU67bgxYWvpBpkZY2xEdh7An9FBs2YB\nNP2e5VPyvH9Y8e4lGoAx7N4Swad+tYCK3815kCjZXDeoK7YQxlm7nDdCa5eRT5ZM\nbVjFtOsUSIqqqQsikqQHRPwJqywrRfQPlbKcbregNQyR93bISVzTPmn3T9VP4O0W\n3GN+5/4dnSLPnsz7O3qDOEVojh7SpLvyoxnqpDgE+LtIEMxLVjdwCksJ9jKW+B75\nhIggTCmZpqyymHh2rcgMdrVrpiYwaxqEXxn7A40xuwaeyREPC/7uXyyv\n-----END CERTIFICATE-----\n';

    expect(Object.keys(provider.certs).length).toBe(2);
    expect(provider.certs[key]).toBe(expected);
  });

  it('Test validation', () => {
    const token =
      'eyJhbGciOiJSUzI1NiIsImtpZCI6IjllYWEwMjZmNjM1MTU3ZGZhZDUzMmU0MTgzYTZiODIzZDc1MmFkMWQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiJjbGllbnRJZCIsImF1ZCI6ImNsaWVudElkIiwic3ViIjoiMTE2MTg3MDQxMzM3NDUyNTYwMDAzIiwiZW1haWwiOiJqZG9lQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiYWJjYWJjYWJjWFlaIiwibmFtZSI6IkpvaG4gRG9lIiwicGljdHVyZSI6Imh0dHA6Ly9leGFtcGxlLmNvbS9qZG9lLnBuZyIsImdpdmVuX25hbWUiOiJKb2huIiwiZmFtaWx5X25hbWUiOiJEb2UiLCJsb2NhbGUiOiJlcyIsImlhdCI6MTY0MzgwNzQwOCwiZXhwIjo5OTk5OTk5OTk5fQ.cCgbvfdNzoJZU1Puzqbe0IWaaNQFNLKFR2Aucfm7rDc6dtu4GL8jkFfkYf2RKrHarYCgwEKqx4uvifJNIbn3RJkDbZ3HIklU2VsFdtVTjBR_nYzdFrFS0A6zVn9pVN9uKomf729S0KEGGTK0H_ZNmh-oH2MhTCXmY99T466k6nWHDxQhRI8dgW9Vg5YZMhxBfE55xjb3X-MYd8F7XZhXCPpe5grqGfNJuLfvay9QAzYQSlKiI4eVN-xbbGKbaVCWn11RlE5Eko6m4kYwY-XUHKQm33-a2bnzkT_tmsewOBTHBqSqxggZVUj_18ZHLC4jA2I-IiGPsyt21RF3Suj9jw';
    const username = provider.validate(token);
    expect(username).toBe('jdoe@gmail.com');
  });

  it('Test expired token', () => {
    const token =
      'eyJhbGciOiJSUzI1NiIsImtpZCI6IjllYWEwMjZmNjM1MTU3ZGZhZDUzMmU0MTgzYTZiODIzZDc1MmFkMWQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiJjbGllbnRJZCIsImF1ZCI6ImNsaWVudElkIiwic3ViIjoiMTE2MTg3MDQxMzM3NDUyNTYwMDAzIiwiZW1haWwiOiJqZG9lQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiYWJjYWJjYWJjWFlaIiwibmFtZSI6IkpvaG4gRG9lIiwicGljdHVyZSI6Imh0dHA6Ly9leGFtcGxlLmNvbS9qZG9lLnBuZyIsImdpdmVuX25hbWUiOiJKb2huIiwiZmFtaWx5X25hbWUiOiJEb2UiLCJsb2NhbGUiOiJlcyIsImlhdCI6MTY0MzgwNzQwOCwiZXhwIjoxMDB9.Yv2LkICak5ToGBB_Ljzpk7-C4Vcz9JIFJd_TIP4okPfIG3O37ck7Vt4HPvmAf0Bb1MrtflGUa67U0-QnXkWT1XWmq_vKnOAbIQ2iqAQeyig3Ttt0Wrqqz14T-L41wNhzDN5nJjlmIoemFDDCumk4gRjkUZz305ld19QZnSDhElngr7n0HzBuXiuq9y_sYf8kbGxwgNKJyZnNzPeGKP5XN_MQir_-Bc-UnZVtpV_Qg7ZNZ2QoStp6nUtnTxa86G7ZPmThS5IA4SOcw8zuNa7_VUBO8l1OQd04Q7RDZzO1jLjWps_xJcO-eiMPrjD98wkAEmlq1EP8rOu0tcdC_fQ5Cg';
    const isValid = provider.validate(token);
    expect(isValid).toBeFalsy();
  });

  it('Test token without validated email', () => {
    const token =
      'eyJhbGciOiJSUzI1NiIsImtpZCI6IjllYWEwMjZmNjM1MTU3ZGZhZDUzMmU0MTgzYTZiODIzZDc1MmFkMWQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiJjbGllbnRJZCIsImF1ZCI6ImNsaWVudElkIiwic3ViIjoiMTE2MTg3MDQxMzM3NDUyNTYwMDAzIiwiZW1haWwiOiJqZG9lQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiYXRfaGFzaCI6ImFiY2FiY2FiY1hZWiIsIm5hbWUiOiJKb2huIERvZSIsInBpY3R1cmUiOiJodHRwOi8vZXhhbXBsZS5jb20vamRvZS5wbmciLCJnaXZlbl9uYW1lIjoiSm9obiIsImZhbWlseV9uYW1lIjoiRG9lIiwibG9jYWxlIjoiZXMiLCJpYXQiOjE2NDM4MDc0MDgsImV4cCI6OTk5OTk5OTk5OX0.FzICAuk5pkbyjG0Ptk1Z_fe5XPZv7j6y_SXgSAxbHNHv69BHzPvYDVZpqAOQs_Ru9nJ0YYz9vqkgsmmLKefPP0V4yLrUWf_oMhXh_eLK0BBPMf3kJIFi9ctwOi9LBo8m-DC2WqP6Psdgoj6HgMp4GoXOkpFf6xS989i0ZNg2eo3P-oZkMP-YSn9C4l-1RdBHu_-Y7jNyXKui8C6SLUSTuRkA3sNC5-Hf1I0ifEUCULqkXOumLAvheUeaopKOGuKvMq2-XH9gHDrOLQr448n5ktdwTL1Si3K7aWbhkYiiBcnoxlVUSWZjsm87XVJbucWYGY5ooMLBgTRT6m8IzQA6iw';
    const isValid = provider.validate(token);
    expect(isValid).toBeFalsy();
  });
});
