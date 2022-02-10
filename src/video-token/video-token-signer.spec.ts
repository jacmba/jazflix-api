import { Test, TestingModule } from '@nestjs/testing';
import { VideoTokenSigner } from './video-token-signer';
import { VideoTokenHasher } from './video-token-hasher';

describe('VideoTokenSigner', () => {
  let provider: VideoTokenSigner;

  const idToken =
    'eyJhbGciOiJSUzI1NiIsImtpZCI6IjllYWEwMjZmNjM1MTU3ZGZhZDUzMmU0MTgzYTZiODIzZDc1MmFkMWQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiJjbGllbnRJZCIsImF1ZCI6ImNsaWVudElkIiwic3ViIjoiMTE2MTg3MDQxMzM3NDUyNTYwMDAzIiwiZW1haWwiOiJqZG9lQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiYWJjYWJjYWJjWFlaIiwibmFtZSI6IkpvaG4gRG9lIiwicGljdHVyZSI6Imh0dHA6Ly9leGFtcGxlLmNvbS9qZG9lLnBuZyIsImdpdmVuX25hbWUiOiJKb2huIiwiZmFtaWx5X25hbWUiOiJEb2UiLCJsb2NhbGUiOiJlcyIsImlhdCI6MTY0MzgwNzQwOCwiZXhwIjo5OTk5OTk5OTk5fQ.cCgbvfdNzoJZU1Puzqbe0IWaaNQFNLKFR2Aucfm7rDc6dtu4GL8jkFfkYf2RKrHarYCgwEKqx4uvifJNIbn3RJkDbZ3HIklU2VsFdtVTjBR_nYzdFrFS0A6zVn9pVN9uKomf729S0KEGGTK0H_ZNmh-oH2MhTCXmY99T466k6nWHDxQhRI8dgW9Vg5YZMhxBfE55xjb3X-MYd8F7XZhXCPpe5grqGfNJuLfvay9QAzYQSlKiI4eVN-xbbGKbaVCWn11RlE5Eko6m4kYwY-XUHKQm33-a2bnzkT_tmsewOBTHBqSqxggZVUj_18ZHLC4jA2I-IiGPsyt21RF3Suj9jw';

  const mockHasher = {
    getObject: jest.fn().mockReturnValue({
      iss: 'someISS',
      azp: 'someAZP',
      aud: 'someAud',
      email: 'jdoe@gmail.com',
      email_verified: 'true',
      name: 'John Doe',
      picture: 'some pic',
      given_name: 'John',
      family_name: 'Doe',
    }),
    getHash: jest.fn().mockReturnValue('my mock hash'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VideoTokenSigner,
        {
          provide: VideoTokenHasher,
          useValue: mockHasher,
        },
      ],
    }).compile();

    provider = module.get<VideoTokenSigner>(VideoTokenSigner);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('Should return a signed token', () => {
    Date.now = jest.fn(() => 1516239022000);
    const token = provider.getToken(idToken);
    const expected =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiamRvZUBnbWFpbC5jb20iLCJoYXNoIjoibXkgbW9jayBoYXNoIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MTYyNjA2MjJ9.OKiaCFolAmJf0z2RR9Bm7jLL_9caBLwzUhB-Yn-amgc';

    expect(mockHasher.getObject).toHaveBeenCalledWith(idToken);
    expect(mockHasher.getHash).toHaveBeenCalledWith({
      iss: 'someISS',
      azp: 'someAZP',
      aud: 'someAud',
      email: 'jdoe@gmail.com',
      email_verified: 'true',
      name: 'John Doe',
      picture: 'some pic',
      given_name: 'John',
      family_name: 'Doe',
    });
    expect(token).toBe(expected);
  });
});
