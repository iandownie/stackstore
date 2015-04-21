var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

require('../../../server/db/models/store');

var Store = mongoose.model('Store');

describe('Store model', function(){

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
		var createStore = function () {
		    return User.create({ email: '', password: 'potus' });
		};
		it('the store must belong to a user', function () {
		    createStore().then
		    expect(Store).user.to.not.equal(null);
		});	
	})
})