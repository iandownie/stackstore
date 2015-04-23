var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

 require('../../../server/db/models/user');
 require('../../../server/db/models/store');


 var Store = mongoose.model('Store');
 var User = mongoose.model('User');


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
		    return Store.create({ name: 'My Store' });
		};
		var createUser = function () {
		    return User.create({ email: 'obama@gmail.com', password: 'potus' });
		};

		it('must belong to a user', function (done){
			var store = new Store({ name: 'My Store' });
			store.save(function(err){
				expect(err.message).to.equal('Store validation failed');
				done();
			});
			
		})

		it('can be created with valid data', function (done) {
			var user = new User({ email: 'obama@gmail.com', password: 'potus' });
			var store = new Store({ name: 'My Store' });
			user.save(function (err, data){
				store.user = data._id
				store.save(function( err, store){
					expect(store.user).to.equal(data._id)
					done()
				})
			})
		});

	})

	describe('Store model statics:', function(){
		var user = new User({ email: 'obama@gmail.com', password: 'potus' });
		var store = new Store({ name: 'My Store' });
		user.save(function (err, data){
			store.user = data._id
			store.save(function( err, store){
				done()
			})
		})

		it('has a static method to findAndPopulate that returns all stores with populated fields', function (done){
		    Store.findAndPopulate().then( function (stores){
		    	console.log(stores);
		    	// stores.should.equal();
		    	done();
		    })
        })
			
	})
})





