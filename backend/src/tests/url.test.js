const request = require('supertest');
const app = require('../app');
const urlService = require('../services/urlService');

describe('URL Shortener API', () => {
  const testUrl = 'https://indicina.co';
  let shortUrl;

  test('POST /api/encode - should encode a URL', async () => {
    const response = await request(app)
      .post('/api/encode')
      .send({ originalUrl: testUrl })
      .expect(200);
    
    expect(response.body).toHaveProperty('originalUrl', testUrl);
    expect(response.body).toHaveProperty('shortUrl');
    expect(response.body.shortUrl).toMatch(/http:\/\/localhost:3001\/\w+/);
    
    shortUrl = response.body.shortUrl;
  });

  test('POST /api/decode - should decode a short URL', async () => {
    const response = await request(app)
      .post('/api/decode')
      .send({ shortUrl })
      .expect(200);
    
    expect(response.body).toHaveProperty('originalUrl', testUrl);
  });

  test('GET /api/statistic/:url_path - should return URL statistics', async () => {
    const shortCode = shortUrl.split('/').pop();
    const response = await request(app)
      .get(`/api/statistic/${shortCode}`)
      .expect(200);
    
    expect(response.body).toHaveProperty('visits');
    expect(response.body).toHaveProperty('lastAccessed');
    expect(response.body).toHaveProperty('createdAt');
  });

  test('GET /api/list - should return all URLs', async () => {
    const response = await request(app)
      .get('/api/list')
      .expect(200);
    
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('GET /api/search - should search URLs', async () => {
    const query = 'indicina';
    const response = await request(app)
      .get(`/api/search?query=${query}`)
      .expect(200);
    
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toHaveProperty('originalUrl');
  });

  test('GET /:url_path - should redirect to original URL', async () => {
    const shortCode = shortUrl.split('/').pop();
    await request(app)
      .get(`/${shortCode}`)
      .expect(302)
      .expect('Location', testUrl);
  });
});