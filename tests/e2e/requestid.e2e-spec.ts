import { Server } from 'http';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as uuid from 'uuid';
import * as request from 'supertest';
import { RequestIdFormatType } from '../../lib';
import {
  ApplicationModuleDefault,
  ApplicationModuleWithRandom,
  ApplicationModuleWithRandomLength,
  ApplicationModuleWithUUIDV1,
  ApplicationModuleWithUUIDV4,
} from '../src';
import { RANDOM_EDITED_LENGTH } from '../config/test.config';

describe('Request ID', () => {
  let app: INestApplication;
  let server: Server;

  describe('Multiple Requests - Different Request ID', () => {
    let requestId1: string;
    let requestId2: string;

    beforeEach(async () => {
      const moduleFixture = await Test.createTestingModule({
        imports: [ApplicationModuleDefault],
      }).compile();

      app = moduleFixture.createNestApplication();
      server = app.getHttpServer();

      await app.init();
    });

    it('should return different request IDs for multiple requests', async () => {
      const response1 = await request(server).get('/what-is-my-request-id');
      requestId1 = response1.text;

      const response2 = await request(server).get('/what-is-my-request-id');
      requestId2 = response2.text;

      expect(response1.statusCode).toBe(200);
      expect(response2.statusCode).toBe(200);
      expect(requestId1).toBeDefined();
      expect(requestId2).toBeDefined();
      expect(requestId1).not.toBe(requestId2);
    });

    afterEach(async () => {
      await app.close();
    });
  });

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

  describe('Random', () => {
    beforeEach(async () => {
      const moduleFixture = await Test.createTestingModule({
        imports: [ApplicationModuleWithRandom],
      }).compile();

      app = moduleFixture.createNestApplication();
      server = app.getHttpServer();

      await app.init();
    });

    it('should return default length number', async () => {
      const response = await request(server).get(
        '/what-is-my-request-id-length',
      );

      expect(response.statusCode).toBe(200);
      expect(response.text).toBeDefined();
      expect(response.text).toBe(String(21));
    });

    it('should return current request ID format type', async () => {
      const response = await request(server).get('/what-is-my-request-id-type');

      expect(response.statusCode).toBe(200);
      expect(response.text).toBeDefined();
      expect(response.text).toBe(RequestIdFormatType.RANDOM);
    });

    it('should return current request ID', async () => {
      const response = await request(server).get('/what-is-my-request-id');

      expect(response.statusCode).toBe(200);
      expect(response.text).toBeDefined();
      expect(response.text.length).toBe(21);
    });

    afterEach(async () => {
      await app.close();
    });
  });

  describe('Random - length', () => {
    beforeEach(async () => {
      const moduleFixture = await Test.createTestingModule({
        imports: [ApplicationModuleWithRandomLength],
      }).compile();

      app = moduleFixture.createNestApplication();
      server = app.getHttpServer();

      await app.init();
    });

    it('should return passed length number', async () => {
      const response = await request(server).get(
        '/what-is-my-request-id-length',
      );

      expect(response.statusCode).toBe(200);
      expect(response.text).toBeDefined();
      expect(response.text).toBe(String(RANDOM_EDITED_LENGTH));
    });

    it('should return current request ID format type', async () => {
      const response = await request(server).get('/what-is-my-request-id-type');

      expect(response.statusCode).toBe(200);
      expect(response.text).toBeDefined();
      expect(response.text).toBe(RequestIdFormatType.RANDOM);
    });

    it('should return current request ID', async () => {
      const response = await request(server).get('/what-is-my-request-id');

      expect(response.statusCode).toBe(200);
      expect(response.text).toBeDefined();
      expect(response.text.length).toBe(RANDOM_EDITED_LENGTH);
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
