const chai = require('chai');
const expect = chai.expect;

const Mongoose = require('mongoose');

const {User} = require('../build/persistance/User');

describe('User model tests', function () {
    before(async function () {
        await Mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});
    });

    beforeEach(async function () {
        await User.deleteMany({});
    });

    describe('Full name virtual attribute tests', function () {
        it('Should allow setting a full name virtual', async function () {
            // Instantiate a new user (don't save yet!)
            const user = await new User({
                firstName: 'FIRST_NAME',
                lastName: 'LAST_NAME',
                email: 'testcase1@gmail.com',
                password: 'iambcryptpasswordhash'
            });

            // User should have the initial field values provided above
            expect(user.firstName).to.equal('FIRST_NAME');
            expect(user.lastName).to.equal('LAST_NAME');

            // Set the fullName virtual which should change the first and last name
            user.fullName = 'Hubert-Farnsworth';

            // Ensure the virtual attribute did its job setting the first and last name
            expect(user.firstName).to.equal('Hubert');
            expect(user.lastName).to.equal('Farnsworth');

            // Save the user
            const savedUser = await user.save();

            // Ensure that by the modified first and last name values were persisted
            expect(savedUser.firstName).to.equal('Hubert');
            expect(savedUser.lastName).to.equal('Farnsworth');
        });
    });

    describe('User name virtual attribute tests', function () {

        it('Allow setting user name virtual ', async function () {
            // Instantiate a new user
            const user = await new User({
                firstName: 'testcase',
                lastName: 'username',
                email: 'testcase2@gmail.com',
                password: 'iambcryptpasswordhash'
            });
            // User should have the initial field values provided above
            expect(user.username).to.equal('testcase2');
            expect(user.email).to.equal('testcase2@gmail.com');
            // Set the username virtual which should change the email
            user.username = 'testing';
            // Save the user
            const savedUser = await user.save();
            // Ensure that by the modified first and last name values were persisted
            expect(savedUser.email).to.equal('testing@gmail.com');
        });
    });

    describe('First name validation tests', function () {

        it('Should prevent setting a non-alpha first name', async function () {

            // Instantiate a new user with a bad first name (don't save yet!)
            const user = await new User({
                firstName: '12345',
                lastName: 'LAST_NAME',
                email: 'testcase3@gmail.com',
                password: 'iambcryptpasswordhash'
            });

            try {

                // Saving the user should throw an exception
                await user.save();

                // If user.save() doesn't throw an error, hard fail the test
                expect.fail("Expected error not thrown");

            } catch (error) {

                // Ensure the expected error was thrown
                expect(error.message).to.equal('user validation failed: firstName: First name may only contain letters')
            }
        });
    });

    describe('Email validation tests', function () {

        it('Should prevent adding an invalid email', async function () {

            // Instantiate a new user with email missing @ symbol
            const user = await new User({
                firstName: 'testcase',
                lastName: 'four',
                email: 'testcase4gmail.com',
                password: 'iambcryptpasswordhash'
            });

            try {

                // Saving the user should throw an exception
                await user.save();

                // Minor gotcha, if no errors are thrown the test will pass.
                // If user.save() doesn't throw an error, hard fail the test
                expect.fail("Expected error not thrown");

            } catch (error) {

                // Ensure the expected error was thrown
                expect(error.message).to.equal('user validation failed: email: Email id is not valid')
            }
        });


        it('Should prevent adding the user with existing email id again', async function () {

            // Instantiate a new user with same email
            const user = await new User({
                firstName: 'testcase',
                lastName: 'five',
                email: 'testcase5@gmail.com',
                password: 'iambcryptpasswordhash'
            });

            try {

                // Saving the user twice should throw an exception
                await user.save();
                await user.save();

                // Minor gotcha, if no errors are thrown the test will pass.
                // If user.save() doesn't throw an error, hard fail the test
                expect.fail("Expected error not thrown");

            } catch (error) {

                // Ensure the expected error was thrown
                expect(error.message).to.equal('User already registered with that email')
            }
        });
    });

    describe('Last name validation tests', function () {

        it('Should prevent setting less than or equal to two characters for last name', async function () {

            // Instantiate a new user with a last name less than two characters
            const user = await new User({
                firstName: 'testcase',
                lastName: '6',
                email: 'testcase6@gmail.com',
                password: 'iambcryptpasswordhash'
            });

            try {

                // Saving the user should throw an exception
                await user.save();

                // Minor gotcha, if no errors are thrown the test will pass.
                // If user.save() doesn't throw an error, hard fail the test
                expect.fail("Expected error not thrown");

            } catch (error) {

                // Ensure the expected error was thrown
                expect(error.message).to.equal('user validation failed: lastName: Last name name must have more than two characters')
            }
        });
    });
    describe('Passed all validations', function () {

        it('Should be able to add a user', async function () {

            const user = await new User({
                firstName: 'testcase',
                lastName: 'seven',
                email: 'testcase7@gmail.com',
                password: 'iambcryptpasswordhash'
            });

            // Saving the user should not throw an exception
            const saveduser = await user.save();
            expect(saveduser.username).to.equal('testcase7');
        });
    });

});
