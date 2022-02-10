import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  const token =
    'eyJhbGciOiJSUzI1NiIsImtpZCI6IjllYWEwMjZmNjM1MTU3ZGZhZDUzMmU0MTgzYTZiODIzZDc1MmFkMWQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiJjbGllbnRJZCIsImF1ZCI6ImNsaWVudElkIiwic3ViIjoiMTE2MTg3MDQxMzM3NDUyNTYwMDAzIiwiZW1haWwiOiJqZG9lQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiYWJjYWJjYWJjWFlaIiwibmFtZSI6IkpvaG4gRG9lIiwicGljdHVyZSI6Imh0dHA6Ly9leGFtcGxlLmNvbS9qZG9lLnBuZyIsImdpdmVuX25hbWUiOiJKb2huIiwiZmFtaWx5X25hbWUiOiJEb2UiLCJsb2NhbGUiOiJlcyIsImlhdCI6MTY0MzgwNzQwOCwiZXhwIjo5OTk5OTk5OTk5fQ.cCgbvfdNzoJZU1Puzqbe0IWaaNQFNLKFR2Aucfm7rDc6dtu4GL8jkFfkYf2RKrHarYCgwEKqx4uvifJNIbn3RJkDbZ3HIklU2VsFdtVTjBR_nYzdFrFS0A6zVn9pVN9uKomf729S0KEGGTK0H_ZNmh-oH2MhTCXmY99T466k6nWHDxQhRI8dgW9Vg5YZMhxBfE55xjb3X-MYd8F7XZhXCPpe5grqGfNJuLfvay9QAzYQSlKiI4eVN-xbbGKbaVCWn11RlE5Eko6m4kYwY-XUHKQm33-a2bnzkT_tmsewOBTHBqSqxggZVUj_18ZHLC4jA2I-IiGPsyt21RF3Suj9jw';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/sections (GET)', () => {
    return request(app.getHttpServer())
      .get('/sections')
      .auth(token, { type: 'bearer' })
      .expect(200)
      .then((resp) => {
        expect(resp.body).toBeDefined();
        expect(resp.body.length).toBeGreaterThan(1);

        const section = resp.body[0];

        expect(section.title).toBe('Inicio');
        expect(section.icon).toBe('mdi-home');
        expect(section.to).toBe('/');
      });
  });

  it('/movies (GET)', () => {
    return request(app.getHttpServer())
      .get('/movies')
      .auth(token, { type: 'bearer' })
      .expect(200)
      .then((resp) => {
        expect(resp.body).toBeDefined();
        expect(resp.body).toBeGreaterThan(1);
      });
  });
});
