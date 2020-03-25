const {Session} = require("../build/persistance/Session");

const {sessionValidator} = require('../build/middleware/sessionValidator');
const chai = require('chai');
const expect = chai.expect;

const sinon = require('sinon');
const httpMocks = require('node-mocks-http');
const {User} = require('../build/persistance/User');
const bcrypt = require("bcryptjs");
const Mongoose = require('mongoose');
describe('SessionValidatorMiddleware tests', function () {
    // Connecting to the database
    before(async function () {
        await Mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});
    });
    // Clearing the data before every run.
    beforeEach(async function () {
        await User.deleteMany({});
        await Session.deleteMany({});
    });

    it('SessionValidator middleware should accept three parameters', function () {
        const request  = httpMocks.createRequest({
            method: 'DELETE',
            url: '/logout',
        });
        const response = httpMocks.createResponse();
        const next = sinon.spy();
        const par = {email: 'string', password: 'string'};
        const middleware = sessionValidator(true);
        expect(middleware.length).to.equal(3);
    });

    it('SessionValidator should call next at least once', function () {
        const request  = httpMocks.createRequest({
            method: 'DELETE',
            url: '/logout',
        });
        const response = httpMocks.createResponse();
        const next = sinon.spy();
        sessionValidator(true)(request, response, next);
        expect(next.calledOnce).to.equal(true);
    });

    it('Response should not have session id value assigned to it', function () {
        const request  = httpMocks.createRequest({
            method: 'DELETE',
            url: '/logout'
        });
        const response = httpMocks.createResponse();
        const next = sinon.spy();
        const par = {email: 'string', password: 'string'};
        sessionValidator(true)(request, response, () => {
            expect(response.locals.sessionId).to.have.property(undefined);
        });
    });

    it('Response should  have status code of 200, required cookie is set to false', function () {
        const request  = httpMocks.createRequest({
            method: 'DELETE',
            url: '/logout',
            sessionCookie: '1234'
        });
        const response = httpMocks.createResponse();
        const next = sinon.spy();
        sessionValidator(false)(request, response, next);
        expect(response.statusCode).to.equal(200);
    });

    it('Successfull TestCase with mandatory cookie', async function () {
        // Creating a new user
        const user = await new User({
            firstName: 'testcase',
            lastName: 'seven',
            email: 'testcase7@gmail.com',
            password: bcrypt.hashSync("testing", 10)
        });
        const savedUser = await user.save();
        // Creating a new session with the newly created user
        const newUserSession = await new Session({userId: savedUser});
        const userSession = await newUserSession.save();
        const request  = httpMocks.createRequest({
            method: 'DELETE',
            url: '/logout',
            sessionCookie: userSession.sessionID
        });
        const response = httpMocks.createResponse();
        const next = sinon.spy();
        const result = sessionValidator(true)(request, response, next);
        expect(response.locals.sessionId).to.equal(userSession.sessionID);
    });

    it('Successfull TestCase without mandatory cookie', async function () {
        // Creating a new user
        const user = await new User({
            firstName: 'testcase',
            lastName: 'seven',
            email: 'testcase7@gmail.com',
            password: bcrypt.hashSync("testing", 10)
        });
        const savedUser = await user.save();
        // Creating a new session with the newly created user
        const newUserSession = await new Session({userId: savedUser});
        const userSession = await newUserSession.save();
        const request  = httpMocks.createRequest({
            method: 'DELETE',
            url: '/logout',
            sessionCookie: userSession.sessionID
        });
        const response = httpMocks.createResponse();
        const next = sinon.spy();
        const result = sessionValidator(false)(request, response, next);
        expect(response.locals.sessionId).to.equal(userSession.sessionID);
    });
});


