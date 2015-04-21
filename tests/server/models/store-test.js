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
})