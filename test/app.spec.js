const request = require('supertest')
const app = require('../')

describe('/api/', () => {
  it ('기본 api 연결 테스트', (done) => {
    request(app).get('/status').then((response) => {
      expect(response.text).toBe('world!');
      done();
    });
  });
});