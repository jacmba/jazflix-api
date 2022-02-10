import { Test, TestingModule } from '@nestjs/testing';
import { VideoTokenHasher } from './video-token-hasher';
import HashableObjectDto from '../../dist/src/model/dto/hashableObject.dto';
import * as bcrypt from 'bcrypt';

describe('VideoTokenHasher', () => {
  let provider: VideoTokenHasher;

  const idToken =
    'eyJhbGciOiJSUzI1NiIsImtpZCI6IjllYWEwMjZmNjM1MTU3ZGZhZDUzMmU0MTgzYTZiODIzZDc1MmFkMWQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiJjbGllbnRJZCIsImF1ZCI6ImNsaWVudElkIiwic3ViIjoiMTE2MTg3MDQxMzM3NDUyNTYwMDAzIiwiZW1haWwiOiJqZG9lQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiYWJjYWJjYWJjWFlaIiwibmFtZSI6IkpvaG4gRG9lIiwicGljdHVyZSI6Imh0dHA6Ly9leGFtcGxlLmNvbS9qZG9lLnBuZyIsImdpdmVuX25hbWUiOiJKb2huIiwiZmFtaWx5X25hbWUiOiJEb2UiLCJsb2NhbGUiOiJlcyIsImlhdCI6MTY0MzgwNzQwOCwiZXhwIjo5OTk5OTk5OTk5fQ.cCgbvfdNzoJZU1Puzqbe0IWaaNQFNLKFR2Aucfm7rDc6dtu4GL8jkFfkYf2RKrHarYCgwEKqx4uvifJNIbn3RJkDbZ3HIklU2VsFdtVTjBR_nYzdFrFS0A6zVn9pVN9uKomf729S0KEGGTK0H_ZNmh-oH2MhTCXmY99T466k6nWHDxQhRI8dgW9Vg5YZMhxBfE55xjb3X-MYd8F7XZhXCPpe5grqGfNJuLfvay9QAzYQSlKiI4eVN-xbbGKbaVCWn11RlE5Eko6m4kYwY-XUHKQm33-a2bnzkT_tmsewOBTHBqSqxggZVUj_18ZHLC4jA2I-IiGPsyt21RF3Suj9jw';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VideoTokenHasher],
    }).compile();

    provider = module.get<VideoTokenHasher>(VideoTokenHasher);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('Should get an ID token hashable object', () => {
    const result = provider.getObject(idToken);
    const expected: HashableObjectDto = {
      iss: 'https://accounts.google.com',
      azp: 'clientId',
      aud: 'clientId',
      email: 'jdoe@gmail.com',
      email_verified: true,
      name: 'John Doe',
      picture: 'http://example.com/jdoe.png',
      given_name: 'John',
      family_name: 'Doe',
    };

    expect(result).toStrictEqual(expected);
  });

  it('Should get a Bcrypt hash based on given object', () => {
    const obj: HashableObjectDto = {
      iss: 'https://accounts.google.com',
      azp: 'clientId',
      aud: 'clientId',
      email: 'jdoe@gmail.com',
      email_verified: true,
      name: 'John Doe',
      picture: 'http://example.com/jdoe.png',
      given_name: 'John',
      family_name: 'Doe',
    };
    const expected = /^\$2/;
    const result = provider.getHash(obj);

    expect(result).toMatch(expected);

    const testHash = bcrypt.compareSync(JSON.stringify(obj), result);
    expect(testHash).toBeTruthy();
  });
});
