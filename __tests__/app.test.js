const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService.js');

let user;

describe('GISAENGCHUNG-BE routes', () => {
  beforeEach(async() => {
    await pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
    return user = await UserService.create({
      email: 'test@test.com',
      password: 'password',
    });
  });

  afterAll(() => {
    return pool.end();
  });

  it('/POST signup', async() => {
    const res = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'test2@test.com',
        password: 'password',
      });

    expect(res.body).toEqual({
      userId: expect.any(String),
      email: 'test2@test.com',
    });
  });

  it('/POST login', async() => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'test@test.com',
        password: 'password'
      });

    expect(res.body).toEqual({
      userId: user.userId,
      email: 'test@test.com',
    });
  });

  it('/GET verify', async() => {
    const agent = request.agent(app);
    
    await agent
      .post('/api/v1/auth/login')
      .send({
        email: 'test@test.com',
        password: 'password'
      });

    const res = await agent 
      .get('/api/v1/auth/verify');

    expect(res.body).toEqual({
      userId: user.userId,
      email: 'test@test.com',
    });
  });
});
