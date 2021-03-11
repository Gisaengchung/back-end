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

    user = await UserService.create({
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
    return project = await Project.insert({
      projectTitle: 'Richards Toes',
      projectSubtitle: 'Smell',
      projectDescription: 'This is about Richards toes',
      projectGenre: 'Romance',
      projectLocState: 'OR',
      projectLocCity: 'Talent',
      projectMainImage: 'https://www.dictionary.com/e/wp-content/uploads/2019/02/foot-emoji-3-300x191.png',
      projectFundingGoal: '100',
      projectFundingExDate: '2021-03-31',
      projectRiskChallenge: 'The smell',
      projectDiversity: 'None',
      userId: '1'
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
    
    const res = await agent.get('/api/v1/user/1');

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

  it('/GET all users', async() => {
    const agent = request.agent(app);

    const a = await UserService.create({
      email: 'kevin@sydney.kT',
      password: 'anotherpassword',
      firstName: 'richard',
      lastName: 'hillman',
      userRole: 'director',
      tagline: 'aaahere is the tagline',
      profileImageUrl: 'https://cdn.searchenginejournal.com/wp-content/uploads/2019/08/c573bf41-6a7c-4927-845c-4ca0260aad6b-760x400.jpeg',
      paymentHandle: 'aaa@allthoselimes',
      userState: 'MI',
      userCity: 'Ann Arbor'
    });

    const res = await agent.get('/api/v1/user');
    
    expect(res.body).toEqual([{
      userId: '1',
      email: 'sydney@richard.kT',
      firstName: 'kevin',
      lastName: 'fiero',
      tagline: 'here is the tagline',
      userRole: 'Movie Goer',
      profileImageUrl: 'https://cdn.searchenginejournal.com/wp-content/uploads/2019/08/c573bf41-6a7c-4927-845c-4ca0260aad6b-760x400.jpeg',
      paymentHandle: '@allthoselimes',
      userState: 'OR',
      userCity: 'Portland'
    },
    {
      userId: '2',
      email: 'kevin@sydney.kT',
      firstName: 'richard',
      lastName: 'hillman',
      userRole: 'director',
      tagline: 'aaahere is the tagline',
      profileImageUrl: 'https://cdn.searchenginejournal.com/wp-content/uploads/2019/08/c573bf41-6a7c-4927-845c-4ca0260aad6b-760x400.jpeg',
      paymentHandle: 'aaa@allthoselimes',
      userState: 'MI',
      userCity: 'Ann Arbor'
    }]);
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
        projectFundingGoal: '100',
        projectFundingExDate: '2021-03-31',
        projectRiskChallenge: 'The smell',
        projectDiversity: 'None',
        userId: '1'
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
      projectDonations: '0',
      projectFundingGoal: '100',
      projectFundingExDate: '2021-03-31',
      projectRiskChallenge: 'The smell',
      projectDiversity: 'None',
      userId: '1'
    });
  });


  it('/PUT project', async() => {
    const agent = request.agent(app);

    await agent
      .post('/api/v1/auth/login')
      .send({
        email: 'sydney@richard.kT',
        password: 'password',
      });

    const res = await request(app)
      .put('/api/v1/project')
      .send({
        projectTitle: 'Richards Finger Hair',
        projectSubtitle: 'Smell',
        projectDescription: 'This is about Richards fingers',
        projectGenre: 'Romance',
        projectLocState: 'OR',
        projectLocCity: 'Talent',
        projectMainImage: 'https://www.dictionary.com/e/wp-content/uploads/2019/02/foot-emoji-3-300x191.png',
        projectFundingGoal: '200',
        projectFundingExDate: '2021-03-31',
        projectRiskChallenge: 'The smell',
        projectDiversity: 'None',
        userId: '1',
        projectId: '1'
      });

    expect(res.body).toEqual({
      projectTitle: 'Richards Finger Hair',
      projectSubtitle: 'Smell',
      projectDescription: 'This is about Richards fingers',
      projectGenre: 'Romance',
      projectLocState: 'OR',
      projectLocCity: 'Talent',
      projectMainImage: 'https://www.dictionary.com/e/wp-content/uploads/2019/02/foot-emoji-3-300x191.png',
      projectDonations: '0',
      projectFundingGoal: '200',
      projectFundingExDate: '2021-03-31',
      projectRiskChallenge: 'The smell',
      projectDiversity: 'None',
      userId: '1',
      projectId: '1'
    });
  });

  it('/GET all projects', async() => {
    const agent = request.agent(app);

    await Project.insert({
      projectTitle: 'Richards Toe Hair',
      projectSubtitle: 'Smell',
      projectDescription: 'This is about Richards toes',
      projectGenre: 'Romance',
      projectLocState: 'OR',
      projectLocCity: 'Talent',
      projectMainImage: 'https://www.dictionary.com/e/wp-content/uploads/2019/02/foot-emoji-3-300x191.png',
      projectFundingGoal: '100',
      projectFundingExDate: '2021-03-31',
      projectRiskChallenge: 'The smell',
      projectDiversity: 'None',
      userId: '1'
    });

    const res = await agent.get('/api/v1/project/');

    expect(res.body).toEqual([
      {
        projectId: '2',
        projectTitle: 'Richards Toe Hair',
        projectSubtitle: 'Smell',
        projectDescription: 'This is about Richards toes',
        projectGenre: 'Romance',
        projectLocState: 'OR',
        projectLocCity: 'Talent',
        projectMainImage: 'https://www.dictionary.com/e/wp-content/uploads/2019/02/foot-emoji-3-300x191.png',
        projectDonations: '0',
        projectFundingGoal: '100',
        projectFundingExDate: '2021-03-31',
        projectRiskChallenge: 'The smell',
        projectDiversity: 'None',
        userId: '1'
      },
      {
        projectId: '1',
        projectTitle: 'Richards Toes',
        projectSubtitle: 'Smell',
        projectDescription: 'This is about Richards toes',
        projectGenre: 'Romance',
        projectLocState: 'OR',
        projectLocCity: 'Talent',
        projectMainImage: 'https://www.dictionary.com/e/wp-content/uploads/2019/02/foot-emoji-3-300x191.png',
        projectDonations: '0',
        projectFundingGoal: '100',
        projectFundingExDate: '2021-03-31',
        projectRiskChallenge: 'The smell',
        projectDiversity: 'None',
        userId: '1'
      }]);
  });

  it('/PUT donation increment', async() => {
    const agent = request.agent(app);

    await agent
      .post('/api/v1/auth/login')
      .send({
        email: 'sydney@richard.kT',
        password: 'password',
      });

    const res = await request(app)
      .put('/api/v1/project/donate')
      .send({
        increment: '5',
        projectId: '1'
      });

    expect(res.body).toEqual({
      projectId: '1',
      projectDonations: '5',
      projectFundingGoal: '100',
      projectFundingExDate: '2021-03-31',
    });
  });

  it('/GET donation info', async() => {
    const agent = request.agent(app);

    await agent
      .post('/api/v1/auth/login')
      .send({
        email: 'sydney@richard.kT',
        password: 'password',
      });

    const res = await request(app)
      .get('/api/v1/project/donate/1');

    expect(res.body).toEqual({
      projectId: '1',
      projectDonations: '0',
      projectFundingGoal: '100',
      projectFundingExDate: '03/31/2021',
    });
  });

});
