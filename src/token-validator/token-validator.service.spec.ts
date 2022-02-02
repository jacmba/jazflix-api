import { Test, TestingModule } from '@nestjs/testing';
import axios from 'axios';
import exp from 'constants';
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
      'eyJhbGciOiJSUzI1NiIsImtpZCI6IjllYWEwMjZmNjM1MTU3ZGZhZDUzMmU0MTgzYTZiODIzZDc1MmFkMWQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiJtb2NrLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoibW9jay5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjExNjE4NzA0MTMzNzQ1MjU2MDAwMyIsImVtYWlsIjoiamRvZUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6ImFiY2FiY2FiY1hZWiIsIm5hbWUiOiJKb2huIERvZSIsInBpY3R1cmUiOiJodHRwOi8vZXhhbXBsZS5jb20vamRvZS5wbmciLCJnaXZlbl9uYW1lIjoiSm9obiIsImZhbWlseV9uYW1lIjoiRG9lIiwibG9jYWxlIjoiZXMiLCJpYXQiOjE2NDM4MDc0MDgsImV4cCI6OTk5OTk5OTk5OX0.hT9iLso4P3Dk5tkPGfAUS9e_r8K3S_MWhPEPb-bpbQOxcx0rhGGNGC622vvtzr2TfaXoSFutvV_IEf2YUuzEV73bkpZyMPUPu9NzsaonWOpnn4TPPwpct6p3Hgp03Um9pOzWIQqxYRbfCURjmBjGrrrbZ-yjrkkY2_Pqk0Bz9TbW8m82bWA9cQaKw_SVxOcpu31R4s8Bx4rIsVMR1MwVJZ8e04nBx_tga0aLu61lgpM6_bxHS4Z83iY9Bb75g_PFr3dOR4C_49--VzhygVtSDSStadRAHfektnLjVcv98iYy19PhNCMCod_yb1OQZ4cpVTdyfFvrmV7-FzMZBCGSJA';
    const isValid = provider.validate(token);
    expect(isValid).toBeTruthy();
  });

  it('Test expired token', () => {
    const token =
      'eyJhbGciOiJSUzI1NiIsImtpZCI6IjllYWEwMjZmNjM1MTU3ZGZhZDUzMmU0MTgzYTZiODIzZDc1MmFkMWQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiJtb2NrLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoibW9jay5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjExNjE4NzA0MTMzNzQ1MjU2MDAwMyIsImVtYWlsIjoiamRvZUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6ImFiY2FiY2FiY1hZWiIsIm5hbWUiOiJKb2huIERvZSIsInBpY3R1cmUiOiJodHRwOi8vZXhhbXBsZS5jb20vamRvZS5wbmciLCJnaXZlbl9uYW1lIjoiSm9obiIsImZhbWlseV9uYW1lIjoiRG9lIiwibG9jYWxlIjoiZXMiLCJpYXQiOjE2NDM4MDc0MDgsImV4cCI6MTAwfQ.FZhpQosNSnivhDPAsCadLKIZdfdoKYq-Poq13tPxFltwqDTjeedToaE785bQ-K9gwLqITJxhob0ydBgnsLp3C-JIvTKklufiaWoBEGm_w24AUa6-FgrvHZPOH9z_jyPzlGbEfbPwwWb7zoSk80-_Wx2txWbb3hPZvr1g40MjciO09enmyCdor-Hhp8MK9xb7hmPUuz4gexjcv8WAd3030HpOZ2DoY3hgO6y-9BvSar5_nZUPsvY1-NcatTiInRLD-hB3ypChxFBio7Za0E3dWHQ73loRBAruNOxYC56p02uC8UrBszbcr6ATUK4BTD-vebZrXhFlAEIGtEaHT3u6-g';
    const isValid = provider.validate(token);
    expect(isValid).toBeFalsy();
  });
});
