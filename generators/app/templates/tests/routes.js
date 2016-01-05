'use strict';

const request = require('supertest');
const app = require('../server');

describe('Requests to the root path', () => {
  it('Returns a 200 status code', (done) => {
    request(app)
      .get('/')
      .expect(200, done);
  });

  it('Returns HTML format', (done) => {
    request(app)
      .get('/')
      .expect('Content-Type', /html/, done);
  });
});
