var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var expect = require('chai').expect;
var mongoose = require('mongoose');

require('../../../server/db/models/product');

var Product = mongoose.model('Product');

describe('Product model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Product).to.be.a('function');
    });
    it("Should have a name key", function () {
        expect(Product.name).to.exist;
    });
 

    describe('search products by category', function () {

    });

describe('create/editing/deleting a product', function(){
    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });
    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('can be created with valid data', function (done) {
    var product = new Product({name: "this product", price: 10.00, quantity: 1, store: "2814709872398471"});
        expect(product.name).to.equal("this product");
        expect(product.price).to.equal(10.00);
        done();
    });
    it('can\'t be created without required data', function (done) {
    var myProduct = new Product({store: "2814709872398472"});
        expect(myProduct).to.not.exist;
        done();
    });
    it('can\'t be created with a name already in use', function (done) {
    var product = new Product({name: "common product", price: 10.00, quantity: 1, store: "2814709872398471"});
    var productTwo = new Product({name: "common product", price: 10.00, quantity: 1, store: "2814709872398471"});
        expect(productTwo).to.not.exist;
        done();
    });
    it('uses placeholder photo if no image is set', function (done) {
    var productTwo = new Product({name: "common product", price: 10.00, quantity: 1, store: "2814709872398471"});
        console.log(product)
        expect(product.image[0]).to.not.equal("http://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2000px-No_image_available.svg.png");
        done();
    });

    });
});