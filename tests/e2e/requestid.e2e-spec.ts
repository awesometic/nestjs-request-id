import { Server } from 'http';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as uuid from 'uuid';
import * as request from 'supertest';
import { RequestIdFormatType } from '../../lib';
import {
  ApplicationModuleDefault,
  ApplicationModuleWithUUIDV1,
  ApplicationModuleWithUUIDV4,
} from '../src';

describe('Request ID', () => {
  let app: INestApplication;
  let server: Server;

  describe('Default - UUID v4', () => {
    beforeEach(async () => {
      const moduleFixture = await Test.createTestingModule({
        imports: [ApplicationModuleDefault],
      }).compile();

      app = moduleFixture.createNestApplication();
      server = app.getHttpServer();

      await app.init();
    });

    it('should return current request ID format type', async () => {
      const response = await request(server).get('/what-is-my-request-id-type');

      expect(response.statusCode).toBe(200);
      expect(response.text).toBeDefined();
      expect(response.text).toBe(RequestIdFormatType.UUID_V4);
    });

    it('should return current request ID', async () => {
      const response = await request(server).get('/what-is-my-request-id');

      expect(response.statusCode).toBe(200);
      expect(response.text).toBeDefined();
      expect(uuid.validate(response.text)).toBe(true);
    });

    afterEach(async () => {
      await app.close();
    });
  });

  describe('UUID v1', () => {
    beforeEach(async () => {
      const moduleFixture = await Test.createTestingModule({
        imports: [ApplicationModuleWithUUIDV1],
      }).compile();

      app = moduleFixture.createNestApplication();
      server = app.getHttpServer();

      await app.init();
    });

    it('should return current request ID format type', async () => {
      const response = await request(server).get('/what-is-my-request-id-type');

      expect(response.statusCode).toBe(200);
      expect(response.text).toBeDefined();
      expect(response.text).toBe(RequestIdFormatType.UUID_V1);
    });

    it('should return current request ID', async () => {
      const response = await request(server).get('/what-is-my-request-id');

      expect(response.statusCode).toBe(200);
      expect(response.text).toBeDefined();
      expect(uuid.validate(response.text)).toBe(true);
    });

    afterEach(async () => {
      await app.close();
    });
  });

  describe('UUID v4', () => {
    beforeEach(async () => {
      const moduleFixture = await Test.createTestingModule({
        imports: [ApplicationModuleWithUUIDV4],
      }).compile();

      app = moduleFixture.createNestApplication();
      server = app.getHttpServer();

      await app.init();
    });

    it('should return current request ID format type', async () => {
      const response = await request(server).get('/what-is-my-request-id-type');

      expect(response.statusCode).toBe(200);
      expect(response.text).toBeDefined();
      expect(response.text).toBe(RequestIdFormatType.UUID_V4);
    });

    it('should return current request ID', async () => {
      const response = await request(server).get('/what-is-my-request-id');

      expect(response.statusCode).toBe(200);
      expect(response.text).toBeDefined();
      expect(uuid.validate(response.text)).toBe(true);
    });

    afterEach(async () => {
      await app.close();
    });
  });
});
