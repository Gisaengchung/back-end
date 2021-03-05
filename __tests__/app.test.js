const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService.js');
const Project = require('../lib/models/Project');
const statesList = require('../testData/state');
const genreList = require('../testData/genre');


let user;
let project;

describe('GISAENGCHUNG-BE routes', () => {
  beforeAll(async() => {
    await pool.query(fs.readFileSync('./sql/states.sql', 'utf-8'));
    await pool.query(fs.readFileSync('./sql/genres.sql', 'utf-8'));
  });

  beforeEach(async() => {
    await pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
    await pool.query(fs.readFileSync('./sql/projects.sql', 'utf-8'));
    project = await Project.insert({
      projectTitle: 'Richards Toes',
      projectSubtitle: 'Smell',
      projectDescription: 'This is about Richards toes',
      projectGenre: 'Romance',
      projectLocState: 'OR',
      projectLocCity: 'Talent',
      projectMainImage: 'https://www.dictionary.com/e/wp-content/uploads/2019/02/foot-emoji-3-300x191.png',
      projectFundingGoal: '$100',
      projectFundingExDate: '3/31/2021',
      projectRiskChallenge: 'The smell',
      projectDiversity: 'None'
    });
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
    
    await agent
      .post('/api/v1/auth/login')
      .send({
        email: 'sydney@richard.kT',
        password: 'password'
      });

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


  it('/PUT by user id', async() => {
    const agent = request.agent(app);

    await agent
      .post('/api/v1/auth/login')
      .send({
        email: 'sydney@richard.kT',
        password: 'password',
      });
    
    const res = await agent 
      .put('/api/v1/user')
      .send({
        userId: user.userId,
        email: 'sydney@richard.kT',
        firstName: 'kevdog',
        lastName: 'fiero',
        tagline: 'here is the BETTER tagline',
        userRole: 'Director',
        profileImageUrl: 'https://cdn.searchenginejournal.com/wp-content/uploads/2019/08/c573bf41-6a7c-4927-845c-4ca0260aad6b-760x400.jpeg',
        paymentHandle: '@allthoselimes',
        userState: 'MI',
        userCity: 'Ann Arbor'
      });

    expect(res.body).toEqual({
      userId: user.userId,
      email: 'sydney@richard.kT',
      firstName: 'kevdog',
      lastName: 'fiero',
      tagline: 'here is the BETTER tagline',
      userRole: 'Director',
      profileImageUrl: 'https://cdn.searchenginejournal.com/wp-content/uploads/2019/08/c573bf41-6a7c-4927-845c-4ca0260aad6b-760x400.jpeg',
      paymentHandle: '@allthoselimes',
      userState: 'MI',
      userCity: 'Ann Arbor'
    });
  });

  it('/GET all states', async() => {
    const agent = request.agent(app);
    
    const res = await agent 
      .get('/api/v1/state');

    expect(res.body).toEqual(statesList);
  });

  it('/GET all genres', async() => {
    const agent = request.agent(app);
    
    const res = await agent 
      .get('/api/v1/genre');

    expect(res.body).toEqual(genreList);
  });

  it('/POST project', async() => {
    const agent = request.agent(app);

    await agent
      .post('/api/v1/auth/login')
      .send({
        email: 'sydney@richard.kT',
        password: 'password',
      });

    const res = await request(app)
      .post('/api/v1/project')
      .send({
        projectTitle: 'Richards Toe Hair',
        projectSubtitle: 'Smell',
        projectDescription: 'This is about Richards toes',
        projectGenre: 'Romance',
        projectLocState: 'OR',
        projectLocCity: 'Talent',
        projectMainImage: 'https://www.dictionary.com/e/wp-content/uploads/2019/02/foot-emoji-3-300x191.png',
        projectFundingGoal: '$100',
        projectFundingExDate: '3/31/2021',
        projectRiskChallenge: 'The smell',
        projectDiversity: 'None'
      });

    expect(res.body).toEqual({
      projectId: '2',
      projectTitle: 'Richards Toe Hair',
      projectSubtitle: 'Smell',
      projectDescription: 'This is about Richards toes',
      projectGenre: 'Romance',
      projectLocState: 'OR',
      projectLocCity: 'Talent',
      projectMainImage: 'https://www.dictionary.com/e/wp-content/uploads/2019/02/foot-emoji-3-300x191.png',
      projectFundingGoal: '$100',
      projectFundingExDate: '3/31/2021',
      projectRiskChallenge: 'The smell',
      projectDiversity: 'None'
    });
  });

});
