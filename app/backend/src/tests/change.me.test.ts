import * as mocha from 'mocha';
import * as sinon from 'sinon';
import * as chai from 'chai';
import User from '../database/models/User'
import userMock from '../tests/mocks/userMock';
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
      .resolves(userMock as User);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('if login is successfull, returns status 200', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com',
        password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
    });
    console.log(chaiHttpResponse.body);
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).have.property('user');
    expect(chaiHttpResponse.body).have.property('token');
  });
});

describe('Tests the route post/login', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves({...userMock } as User);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

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

});
