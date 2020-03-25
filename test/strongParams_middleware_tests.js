
const {strongParamsMiddleware} = require('../build/middleware/strongParamsMiddleware');
const chai = require('chai');
const expect = chai.expect;

const sinon = require('sinon');
const httpMocks = require('node-mocks-http');


describe('StrongParamsMiddleware tests', function () {
    it('StrongParamsMiddleware should accept three parameters', function () {
        // Creating a http mocks request
        const request  = httpMocks.createRequest({
                method: 'POST',
                url: '/login',
                body: {email: "kiran@gmail.com", password: 'kiran1234'}
            });
            const response = httpMocks.createResponse();
            const next = sinon.spy();
            const par = {email: 'string', password: 'string'};
            // Calling middleware with the parameters
            const middleware = strongParamsMiddleware(par, true);
            expect(middleware.length).to.equal(3);
        });

    it('StrongParamsMiddleware should call next at least once', function () {
        // Creating a http mocks request
        const request  = httpMocks.createRequest({
            method: 'POST',
            url: '/login',
            body: {email: "testing@gmail.com", password: 'test1234'}
        });
        const response = httpMocks.createResponse();
        const next = sinon.spy();
        const par = {email: 'string', password: 'string'};
        // Calling middleware with the parameters
        strongParamsMiddleware(par, true)(request, response, next);
        expect(next.calledOnce).to.equal(true);
    });


    it('Response should have strongParams value assigned to it', function () {
            // Creating a http mocks request
            const request  = httpMocks.createRequest({
                method: 'POST',
                url: '/login',
                body: {email: "kiran@gmail.com", password: 'kiran1234'}
            });
            const response = httpMocks.createResponse();
            const next = sinon.spy();
            const par = {email: 'string', password: 'string'};
        // Calling middleware with the parameters
            strongParamsMiddleware(par, true)(request, response, () => {
                expect(response.locals).to.have.property('strongParams');
            });
        });

    it('Response should have strongParams locals email same as in the request', function () {
        // Creating a http mocks request
        const request  = httpMocks.createRequest({
            method: 'POST',
            url: '/login',
            body: {email: "kiran@gmail.com", password: 'kiran1234'}
        });
        const response = httpMocks.createResponse();
        const next = sinon.spy();
        const par = {email: 'string', password: 'string'};
        // Calling middleware with the parameters
        strongParamsMiddleware(par, true)(request, response, () => {
            expect(response.locals.strongParams.get('email')).to.equal('kiran@gmail.com');
        });
    });

    it('Response should have strongParams locals password same as in the request', function () {
        // Creating a http mocks request
        const request  = httpMocks.createRequest({
            method: 'POST',
            url: '/login',
            body: {email: "kiran@gmail.com", password: 'kiran1234'}
        });
        const response = httpMocks.createResponse();
        const next = sinon.spy();
        const par = {email: 'string', password: 'string'};
        // Calling middleware with the parameters
        strongParamsMiddleware(par, true)(request, response, () => {
            expect(response.locals.strongParams.get('password')).to.equal('kiran1234');
        });
    });

    it('Response should not have strongParams locals email if the input is wrong in the request', function () {
        // Creating a http mocks request
        const request  = httpMocks.createRequest({
            method: 'POST',
            url: '/login',
            body: {email: 1234, password: 'kiran1234'}
        });
        const response = httpMocks.createResponse();
        const next = sinon.spy();
        const par = {email: 'string', password: 'string'};
        // Calling middleware with the parameters
        strongParamsMiddleware(par, false)(request, response, () => {
            expect(response.locals.strongParams.get('email')).to.equal(undefined);
        });
    });

    it('Response should not have strongParams locals password if the input is wrong in the request', function () {
        // Creating a http mocks request
        const request  = httpMocks.createRequest({
            method: 'POST',
            url: '/login',
            body: {email: "kiran@gmail.com", password: 1234}
        });
        const response = httpMocks.createResponse();
        const next = sinon.spy();
        const par = {email: 'string', password: 'string'};
        // Calling middleware with the parameters
        strongParamsMiddleware(par, false)(request, response, () => {
            expect(response.locals.strongParams.get('password')).to.equal(undefined);
        });
    });

    it('Response should get status 200', function () {
        // Creating a http mocks request
        const request  = httpMocks.createRequest({
            method: 'POST',
            url: '/login',
            body: {email: 'kiran@gmail.com', password: 'kiran1234'}
        });
        const response = httpMocks.createResponse();
        const next = sinon.spy();
        const par = {email: 'string', password: 'string'};
        // Calling middleware with the parameters
        strongParamsMiddleware(par, true)(request, response, next);
            expect(response.statusCode).to.equal(200);
    });

    it('Request body should be null', function () {
        // Creating a http mocks request
        const request  = httpMocks.createRequest({
            method: 'POST',
            url: '/login',
            body: {email: "kiran@gmail.com", password: 'kiran1234'}
        });
        const response = httpMocks.createResponse();
        const next = sinon.spy();
        const par = {email: 'string', password: 'string'};
        // Calling middleware with the parameters
        strongParamsMiddleware(par, true)(request, response, next);
        expect(request.body).to.equal(null);
    });


    it('StrongParamsMiddleware should call next with zero parameters', function () {
        // Creating a http mocks request
        const request  = httpMocks.createRequest({
            method: 'POST',
            url: '/login',
            body: {email: "kiran@gmail.com", password: 'kiran1234'}
        });
        const response = httpMocks.createResponse();
        const next = sinon.spy();
        const par = {email: 'string', password: 'string'};
        // Calling middleware with the parameters
        strongParamsMiddleware(par, true)(request, response, next);
        expect(next.getCall(0).args[0]).to.equal(undefined);
     });

    it('StrongParamsMiddleware next call should not be equal to zero parameters in case of wrong input', function () {
        // Creating a http mocks request
        const request  = httpMocks.createRequest({
            method: 'POST',
            url: '/login',
            body: {email: "kiran@gmail.com", password: 123}
        });
        const response = httpMocks.createResponse();
        const next = sinon.spy();
        const par = {email: 'string', password: 'string'};
        // Calling middleware with the parameters
        strongParamsMiddleware(par, true)(request, response, next);
        expect(next.getCall(0).args[0]).to.not.equal(undefined);
    });

});


