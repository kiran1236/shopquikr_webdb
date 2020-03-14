
const {sessionValidator} = require('../build/middleware/sessionValidator');
const chai = require('chai');
const expect = chai.expect;

const sinon = require('sinon');
const httpMocks = require('node-mocks-http');


describe('SessionValidatorMiddleware tests', function () {
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

    it('Response should  have status code of 200 since required cookie is set to false', function () {
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
});


