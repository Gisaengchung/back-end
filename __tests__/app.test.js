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
      email: 'sydney@richard.kT',
      password: 'password',
      firstName: 'kevin',
      lastName: 'fiero',
      userRole: 'Movie Goer',
      tagline: 'here is the tagline',
      profileImageUrl: 'https://cdn.searchenginejournal.com/wp-content/uploads/2019/08/c573bf41-6a7c-4927-845c-4ca0260aad6b-760x400.jpeg',
      paymentHandle: '@allthoselimes',
      userState: 'OR',
      userCity: 'Portland'
    });
  });

  afterAll(() => {
    return pool.end();
  });

  it('/POST signup', async() => {
    const res = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'sydney@richard.kT',
        password: 'password',
        firstName: 'kevin',
        lastName: 'fiero',
        userRole: 'Movie Goer',
        tagline: 'here is the tagline',
        profileImageUrl: 'https://cdn.searchenginejournal.com/wp-content/uploads/2019/08/c573bf41-6a7c-4927-845c-4ca0260aad6b-760x400.jpeg',
        paymentHandle: '@allthoselimes',
        userState: 'OR',
        userCity: 'Portland'
      });

    expect(res.body).toEqual({
      userId: expect.any(String),
      email: 'sydney@richard.kT',
      firstName: 'kevin',
      lastName: 'fiero',
      userRole: 'Movie Goer',
      tagline: 'here is the tagline',
      profileImageUrl: 'https://cdn.searchenginejournal.com/wp-content/uploads/2019/08/c573bf41-6a7c-4927-845c-4ca0260aad6b-760x400.jpeg',
      paymentHandle: '@allthoselimes',
      userState: 'OR',
      userCity: 'Portland'
    });
  });

  it('/POST login', async() => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'sydney@richard.kT',
        password: 'password',
      });

    expect(res.body).toEqual({
      userId: user.userId,
      email: 'sydney@richard.kT',
      firstName: 'kevin',
      lastName: 'fiero',
      userRole: 'Movie Goer',
      tagline: 'here is the tagline',
      profileImageUrl: 'https://cdn.searchenginejournal.com/wp-content/uploads/2019/08/c573bf41-6a7c-4927-845c-4ca0260aad6b-760x400.jpeg',
      paymentHandle: '@allthoselimes',
      userState: 'OR',
      userCity: 'Portland'
    });
  });

  it('/GET verify', async() => {
    const agent = request.agent(app);
    
    const a = await agent
      .post('/api/v1/auth/login')
      .send({
        email: 'sydney@richard.kT',
        password: 'password'
      });

      console.log(a.body);

    const res = await agent 
      .get('/api/v1/auth/verify');

    expect(res.body).toEqual({
      userId: user.userId,
      email: 'sydney@richard.kT',
      firstName: 'kevin',
      lastName: 'fiero',
      tagline: 'here is the tagline',
      userRole: 'Movie Goer',
      profileImageUrl: 'https://cdn.searchenginejournal.com/wp-content/uploads/2019/08/c573bf41-6a7c-4927-845c-4ca0260aad6b-760x400.jpeg',
      paymentHandle: '@allthoselimes',
      userState: 'OR',
      userCity: 'Portland'
    });
  });


  it('/GET user by id', async() => {
    const agent = request.agent(app);

    await agent
      .post('/api/v1/auth/login')
      .send({
        email: 'sydney@richard.kT',
        password: 'password',
      });
    
    const res = await agent 
      .get('/api/v1/user/1');

    expect(res.body).toEqual({
      userId: user.userId,
      email: 'sydney@richard.kT',
      firstName: 'kevin',
      lastName: 'fiero',
      tagline: 'here is the tagline',
      userRole: 'Movie Goer',
      profileImageUrl: 'https://cdn.searchenginejournal.com/wp-content/uploads/2019/08/c573bf41-6a7c-4927-845c-4ca0260aad6b-760x400.jpeg',
      paymentHandle: '@allthoselimes',
      userState: 'OR',
      userCity: 'Portland'
    });
  });



});
