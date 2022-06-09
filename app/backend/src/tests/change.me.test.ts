import * as sinon from 'sinon';
import * as chai from 'chai';
import User from '../database/models/User';
import Team from '../database/models/Team';
import Match from '../database/models/Match';
import userMock from '../tests/mocks/userMock';
import teamsMock from './mocks/teamsMock';
import teamMock from './mocks/teamMock';
import matchesMock from './mocks/matchesMock';
import matchMock from './mocks/matchMock';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests the route post/login', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves({...userMock} as User);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('if login is successfull, returns status 200', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'garrincha@botafogo.com',
        password: 'botafogo',
    });
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body.user).have.property('id');
    expect(chaiHttpResponse.body.user).have.property('username');
    expect(chaiHttpResponse.body.user).have.property('email');
    expect(chaiHttpResponse.body.user).have.property('role');
    expect(chaiHttpResponse.body).have.property('token');
    expect(chaiHttpResponse.body).not.to.have.property('id');
  });

  it('if the email is incorrect, returns status 401', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({
      email: 'garrincha@botafogo.com',
      password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW', 
    });
    expect(chaiHttpResponse).to.have.status(401);
  });

  it('if the password is incorrect, returns status 401', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({
      email: 'garrincha@botafogo.com',
      password: '$2a$08$xi.Hxk1czAO0nZR', 
    });    
    expect(chaiHttpResponse).to.have.status(401);
  });

  it('if email is missing returns status 400', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({
      email: '',
      password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW', 
    });
    expect(chaiHttpResponse).to.have.status(400);
  });

  it('if password is missing returns status 400', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({
      email: 'garrincha@botafogo.com',
      password: '', 
    });
    expect(chaiHttpResponse).to.have.status(400);
  });

  it('if the login fails, it returns status 401', async () => {
    before(async () => {
      sinon
        .stub(User, "findOne")
        .resolves(null);
    });
    after(()=>{
      (User.findOne as sinon.SinonStub).restore();
    })

    chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({
      email: 'garrincha@botafogo.com',
      password: '$2a$12$hOMKmxbxPPEgKVHOY0Vf.uWjsYig2nbFWHlF1p4XfJDoVbqklZlX2', 
    });
    expect(chaiHttpResponse).to.have.status(401);
  });
});

describe('Test the route get /teams', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Team, "findAll")
      .resolves(teamsMock as Team[]);
  });

  after(()=>{
    (Team.findAll as sinon.SinonStub).restore();
  })

  it ('if successfull, returns all teams and a status 200', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams');
      // console.log(chaiHttpResponse.body);  // BODY EXAMPLE BELLOW
      // [
      //   { id: 1, teamName: 'Botafogo de Futebol e Regatas' },
      //   { id: 2, teamName: 'Botafogo Football Club' },
      //   { id: 3, teamName: 'Clube de Regatas Botafogo' }
      // ]
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(teamsMock);
  });
});

describe('Test the route get /teams/:id', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Team, "findOne")
      .resolves(teamMock as Team);
  });

  after(()=>{
    (Team.findOne as sinon.SinonStub).restore();
  })

  it ('if successfull, returns one team and a status 200', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams/1');
      expect(chaiHttpResponse.status).to.be.equal(200);
      // retornam no json id e o teamName
      expect(chaiHttpResponse.body.id).to.be.deep.equal(teamMock.id);
      expect(chaiHttpResponse.body.teamName).to.be.deep.equal(teamMock.teamName);
  });
});

describe('Test the route get /matches', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Match, "findAll")
      .resolves(matchesMock as unknown as Match[]);
  });

  after(()=>{
    (Match.findAll as sinon.SinonStub).restore();
  })

  it ('if successfull, returns all matches and a status 200', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/matches');
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(matchesMock);
  });

  it('it is possible to filter matches in progress', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .get('/matches?inProgress=true');
    const inProgressMatch = matchesMock.filter((match) => match.inProgress === true);
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(inProgressMatch);
  });

  it('it is possible to filter matches NOT in progress', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .get('/matches?inProgress=false');
    const notInProgressMatch = matchesMock.filter((match) => match.inProgress === false);
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(notInProgressMatch);
  });

});

describe('Test the route get /matches', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Match, "create")
      .resolves({ ...matchMock } as Match);
  });

  after(()=>{
    (Match.create as sinon.SinonStub).restore();
  });

  it('it is possible to create a match in progress', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .post('/matches')
    .set(
      'authorization',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20ifSwiaWF0IjoxNjU0NTM5OTgyfQ.OsrQiFCqxfspIuCmj6hKNYAtK1BnfubkeaEUEzdWKTw'
    )
    .send(matchMock);
    expect(chaiHttpResponse.status).to.be.equal(201);
    expect(chaiHttpResponse.body).to.be.deep.equal(matchMock)
  });

});
