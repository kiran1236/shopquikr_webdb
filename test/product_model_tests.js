const chai = require('chai');
const expect = chai.expect;

const Mongoose = require('mongoose');

const {Product} = require('../build/persistance/Product');

describe('Product model tests', function () {
    before(async function () {
        await Mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});
    });

    beforeEach(async function () {
        await Product.deleteMany({});
    });

    describe('Product id attribute tests', function () {
        it('Product id should not accept duplicate values', async function () {
            // Instantiate a new product (don't save yet!)
            const product = await new Product({
                productId: 'product1',
                name: 'product1',
                price: '30',
                quantity: '25'
            });
            try {
                // Saving the same product twice should throw an exception
                await product.save();
                await product.save();
                // Minor gotcha, if no errors are thrown the test will pass.
                // If user.save() doesn't throw an error, hard fail the test
                expect.fail("Expected error not thrown");

            } catch (error) {

                // Ensure the expected error was thrown
                expect(error.message).to.equal('product validation failed: productId: Product already in database')
            }

        });
    });

    describe('Product name attribute tests', function () {

        it('Restrict setting special characters to product name ', async function () {
            const product = await new Product({
                productId: 'product2',
                name: 'product2@',
                price: '30',
                quantity: '25'
            });
            try {
                // Saving the product name with special characters should throw an exception
                await product.save();
                // Minor gotcha, if no errors are thrown the test will pass.
                // If user.save() doesn't throw an error, hard fail the test
                expect.fail("Expected error not thrown");

            } catch (error) {

                // Ensure the expected error was thrown
                expect(error.message).to.equal('product validation failed: name: Special characters not allowed in Product name')
            }
        });
    });

    describe('Price validation tests', function () {

        it('Should prevent setting a alpha value to price', async function () {

            const product = await new Product({
                productId: 'product3',
                name: 'product3',
                price: '30a',
                quantity: '25'
            });
            try {
                // Saving the price with special characters or alpha values should throw an exception
                await product.save();
                // Minor gotcha, if no errors are thrown the test will pass.
                // If user.save() doesn't throw an error, hard fail the test
                expect.fail("Expected error not thrown");

            } catch (error) {

                // Ensure the expected error was thrown
                expect(error.message).to.equal('product validation failed: price: Price may only contain numbers')
            }
        });
    });

    describe('Quantity validation tests', function () {

        it('Should prevent setting a alpha value to quantity', async function () {

            const product = await new Product({
                productId: 'product3',
                name: 'product3',
                price: '30',
                quantity: '25@'
            });
            try {
                // Saving the quantity with special characters or alpha values should throw an exception
                await product.save();
                // Minor gotcha, if no errors are thrown the test will pass.
                // If user.save() doesn't throw an error, hard fail the test
                expect.fail("Expected error not thrown");

            } catch (error) {

                // Ensure the expected error was thrown
                expect(error.message).to.equal('product validation failed: quantity: Quantity may only contain numbers')
            }
        });
    });

    describe('Passed all validations', function () {

        it('Should be able to add a product', async function () {

            const product = await new Product({
                productId: 'product',
                name: 'product',
                price: '30',
                quantity: '25'
            });
            // Saving the product should not throw an exception
            const savedproduct = await product.save();
            expect(savedproduct.productId).to.equal('product');
        });
    });

});
