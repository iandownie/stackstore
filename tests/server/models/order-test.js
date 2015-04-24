var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var expect = require('chai').expect;
var mongoose = require('mongoose');

require('../../../server/db/models/order');

var Order = mongoose.model('Order');

describe('Order model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Order).to.be.a('function');
    });

    describe('create an order', function () {
    	it('can be created with valid data', function (done) {
    	var createOrder = function () {
    	    return Order.create({name: "common product", price: 10.00, quantity: 1, store: "2814709872398471", category: "something", decription: "something else"});
    	    };
    	var product = new Product({name: "this product", price: 10.00, quantity: 1, store: "2814709872398471"});
    	    expect(product.name).to.equal("this product");
    	    expect(product.price).to.equal(10.00);
    	    done();
    	});
    	it('can\'t be created without required data', function (done) {
    	var myProduct = new Product({store: "2814709872398472"});
    	    myProduct.save(function(err){
    	        var error = err.message
    	        expect(error).to.equal('Product validation failed')
    	        done();
    	    });
    	});
    
    });

    describe('update an order status', function(){

    });
});