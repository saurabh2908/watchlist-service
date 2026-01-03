import request from 'supertest';
import { expect } from 'chai';
import app from '../app';

describe('Watchlist API Integration Tests', () => {
  before(async function() {
    this.timeout(10000);
  });

  it('should return empty watchlist initially', async () => {
    const res = await request(app).get('/api/watchlist');
    expect(res.status).to.equal(200);
    expect(res.body.items).to.be.an('array');
    expect(res.body.total).to.equal(0);
  });

  it('should add item to watchlist', async () => {
    const res = await request(app)
      .post('/api/watchlist')
      .send({
        contentId: 'movie-1',
        contentType: 'MOVIE'
      });

    expect(res.status).to.equal(201);
  });

  it('should not add duplicate item', async () => {
    await request(app)
      .post('/api/watchlist')
      .send({
        contentId: 'movie-1',
        contentType: 'MOVIE'
      });

       await request(app)
      .post('/api/watchlist')
      .send({
        contentId: 'movie-1',
        contentType: 'MOVIE'
      });

    const res = await request(app).get('/api/watchlist');
    expect(res.body.total).to.equal(1);
  });

  it('should remove item from watchlist', async () => {
        await request(app)
      .post('/api/watchlist')
      .send({
        contentId: 'movie-1',
        contentType: 'MOVIE'
      });

    const res = await request(app)
      .delete('/api/watchlist/movie-1');

    expect(res.status).to.equal(200);

    const res_get = await request(app).get('/api/watchlist');
    expect(res_get.body.total).to.equal(0);
  });
});
