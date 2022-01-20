import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { doesNotMatch } from 'assert';

describe('AppController (e2e)', () => {
  let app: INestApplication;

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
      .expect(200)
      .then((resp) => {
        expect(resp.body).toBeDefined();
        expect(resp.body).toBeGreaterThan(1);
      });
  });
});
