var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

require('../../../server/db/models/store');

var Store = mongoose.model('Store');

describe('Store model', function(){
	it('should exist', function () {
	    expect(Store).to.be.a('function');
	});	

	beforeEach('Establish DB connection', function (done) {
	    if (mongoose.connection.db) return done();
	    mongoose.connect(dbURI, done);
	});

	afterEach('Clear test database', function (done) {
	    clearDB(done);
	});

	it('should exist', function () {
	    expect(Store).to.be.a('function');
	});	

	describe('on creation...', function(){

		it('can be created with valid data', function (done) {
		var store = new Store({name: "My Store", user: "2814709872398471"});
			console.log(store)
			expect(store.name).to.equal("My Store");
			expect(store.user).to.equal("2814709872398471");
		});
	})
})