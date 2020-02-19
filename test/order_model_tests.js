

const chai = require('chai');
const expect = chai.expect;

const Mongoose = require('mongoose');
const {Order} = require('../build/persistance/Order');
const {Product} = require('../build/persistance/Product');
const {User} = require('../build/persistance/User');

describe('Order model tests', function () {
    before(async function () {
        await Mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});
    });

    beforeEach(async function () {
        await User.deleteMany({});
        await Product.deleteMany({});
        await Order.deleteMany({});

    });

    describe('Order id attribute tests', function () {
        it('Order id should not accept duplicate values', async function () {
            // Instantiate a new product (don't save yet!)

            const user = await new User({
                firstName: 'testcase',
                lastName: 'one',
                email: 'testcase1@gmail.com',
                password: 'iambcryptpasswordhash'
            });

            const product = await new Product({
                productId: 'product1',
                name: 'product1',
                price: '30',
                quantity: '25'
            });

            const user1 = await new User({
                firstName: 'testcase',
                lastName: 'one',
                email: 'testcase11@gmail.com',
                password: 'iambcryptpasswordhash'
            });

            const product1 = await new Product({
                productId: 'product11',
                name: 'product11',
                price: '30',
                quantity: '25'
            });

            const order = await new Order({
                orderId: 'O1231',
                userId: user,
                productId: product,
                price: '30',
                quantity: '25'
            });
            const order1 = await new Order({
                orderId: 'O1231',
                userId: user1,
                productId: product1,
                price: '30',
                quantity: '25'
            });



            try {
                // Saving the user should not throw an exception
                const saveduser = await user.save();
                const saveduser1 = await user1.save();
                // Saving the product should not throw an exception
                const savedproduct = await product.save();
                const savedproduct1 = await product1.save();
                // Saving the same product twice should throw an exception
                await order.save();
                await order1.save();
                // Minor gotcha, if no errors are thrown the test will pass.
                // If user.save() doesn't throw an error, hard fail the test
                expect.fail("Expected error not thrown");

            } catch (error) {

                // Ensure the expected error was thrown
                expect(error.message).to.equal('order validation failed: orderId: Order already in database')
            }

        });
    });

    describe('Order userid attribute tests', function () {

        it('Restrict not to take an order from the users who are not in database', async function () {
            const user = await new User({
                firstName: 'testcase',
                lastName: 'two',
                email: 'testcase2@gmail.com',
                password: 'iambcryptpasswordhash'
            });

            const product = await new Product({
                productId: 'product2',
                name: 'product2',
                price: '30',
                quantity: '25'
            });

            const order = await new Order({
                orderId: 'O1232',
                userId: user,
                productId: product,
                price: '30',
                quantity: '25'
            });



            try {
                // Not Saving the user, should throw an exception
                //const saveduser = await user.save();
                // Saving the product should not throw an exception
                const savedproduct = await product.save();
                // Saving the same product twice should throw an exception
                await order.save();

                // Minor gotcha, if no errors are thrown the test will pass.
                // If user.save() doesn't throw an error, hard fail the test
                expect.fail("Expected error not thrown");

            } catch (error) {

                // Ensure the expected error was thrown
                expect(error.message).to.equal('order validation failed: userId: User not in database')
            }

        });
    });

    describe('Order productid attribute tests', function () {

        it('Restrict not to take an order if the products are not in database', async function () {
            const user = await new User({
                firstName: 'testcase',
                lastName: 'three',
                email: 'testcase3@gmail.com',
                password: 'iambcryptpasswordhash'
            });

            const product = await new Product({
                productId: 'product3',
                name: 'product3',
                price: '30',
                quantity: '25'
            });

            const order = await new Order({
                orderId: 'O1233',
                userId: user,
                productId: product,
                price: '30',
                quantity: '25'
            });



            try {
                // Saving the user, should not throw an exception
                const saveduser = await user.save();
                // Not Saving the product, should throw an exception
                //const savedproduct = await product.save();
                // Saving the same product twice should throw an exception
                await order.save();

                // Minor gotcha, if no errors are thrown the test will pass.
                // If user.save() doesn't throw an error, hard fail the test
                expect.fail("Expected error not thrown");

            } catch (error) {

                // Ensure the expected error was thrown
                expect(error.message).to.equal('order validation failed: productId: Product not in database')
            }

        });
    });

    describe('Price validation tests', function () {

        it('Should prevent setting a alpha value to price', async function () {

            const user = await new User({
                firstName: 'testcase',
                lastName: 'six',
                email: 'testcase5@gmail.com',
                password: 'iambcryptpasswordhash'
            });

            const product = await new Product({
                productId: 'product5',
                name: 'product5',
                price: '30',
                quantity: '25'
            });

            const order = await new Order({
                orderId: 'O1238',
                userId: user,
                productId: product,
                price: '30@',
                quantity: '25'
            });

            try {
                // Saving the user should not throw an exception
                const saveduser = await user.save();
                // Saving the product should not throw an exception
                const savedproduct = await product.save();
                // Saving the price with special characters or alpha values should throw an exception
                await order.save();
                // Minor gotcha, if no errors are thrown the test will pass.
                // If order.save() doesn't throw an error, hard fail the test
                expect.fail("Expected error not thrown");

            } catch (error) {

                // Ensure the expected error was thrown
                expect(error.message).to.equal('order validation failed: price: Price may only contain numbers')
            }
        });
    });

    describe('Quantity validation tests', function () {

        it('Should prevent setting a alpha value to quantity', async function () {

            const user = await new User({
                firstName: 'testcase',
                lastName: 'six',
                email: 'testcase6@gmail.com',
                password: 'iambcryptpasswordhash'
            });

            const product = await new Product({
                productId: 'product6',
                name: 'product6',
                price: '30',
                quantity: '25'
            });

            const order = await new Order({
                orderId: 'O1237',
                userId: user,
                productId: product,
                price: '30',
                quantity: '25@'
            });

            try {
                // Saving the user should not throw an exception
                const saveduser = await user.save();
                // Saving the product should not throw an exception
                const savedproduct = await product.save();
                // Saving the quantity with special characters or alpha values should throw an exception
                await order.save();
                // Minor gotcha, if no errors are thrown the test will pass.
                // If user.save() doesn't throw an error, hard fail the test
                expect.fail("Expected error not thrown");

            } catch (error) {

                // Ensure the expected error was thrown
                expect(error.message).to.equal('order validation failed: quantity: Quantity may only contain numbers')
            }
        });
    });

    describe('Passed all validations', function () {

        it('Should be able to add a product', async function () {

            const user = await new User({
                firstName: 'testcase',
                lastName: 'seven',
                email: 'testcase7@gmail.com',
                password: 'iambcryptpasswordhash'
            });

            const product = await new Product({
                productId: 'product',
                name: 'product',
                price: '30',
                quantity: '25'
            });

            const order = await new Order({
                orderId: 'O1236',
                userId: user,
                productId: product,
                price: '30',
                quantity: '25'
            });

            // Saving the user should not throw an exception
            const saveduser = await user.save();
            // Saving the product should not throw an exception
            const savedproduct = await product.save();
            const savedorder = await order.save();
            expect(savedorder.quantity).to.equal('25');
        });
    });

});
