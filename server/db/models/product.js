'use strict';

var Promise = require('q');
var mongoose = require('mongoose');
var Store = mongoose.model('Store');
var Review = mongoose.model('Review');
var User = mongoose.model('User');

var schema = new mongoose.Schema({
	name:{
		type: String,
		required:true,
		unique: true
	},
	price:{
		type: Number, required:true, min: 0
	},
	quantity:{
		type: Number, required: true, min: 0
	},
	store: {
	    type:  mongoose.Schema.Types.ObjectId, ref: 'Store',
	    required: true
	},
	description:{
		type: String, required: true
	},
	categories:[{
		type: mongoose.Schema.Types.ObjectId, ref: 'Category',
		required: true
	}],
	images:[{
		type: String, default: '/images/default-image.png'
	}]
});

schema.pre('save', function (next) {
  // handles if images does not have an image
  if(!this.images) this.images = ['/images/default-image.png'];
  next();
});

var storeQuery = [{path: 'store', select: 'name logo'}];

schema.statics.createProduct = function(product){
	return this.create(product).then(function(productData){
		return Store.findByIdAndUpdate(product.store, {
			$push: {
				products: {
						$each : [productData._id],
						$position : 0
					}
				}
			}).exec(function(err, store){
				if (err) throw new Error(err);
				return store;
		});
	});
};

schema.statics.deleteProduct = function(productID){
	return this.findByIdAndRemove(productID, function(err, productData){
		if (err) throw new Error(err);
		//delete all reviews that are associated with the product
		return Review.remove({product : productID}, function(err, reviewData){
			if (err) throw new Error(err);
			console.log(reviewData);
			return productData;
		});
	});
};

schema.statics.deleteProductsAndStore = function(storeID){
	//still needs to be worked on
	var self = this;
	return this.find({store: storeID}).exec(function(err, storeProductArr){
		if(err) throw new Error(err);

		var removedProductsArr = storeProductArr.map(function(product){
			return product._id;
		});

		var dependencyArr = [
			User.findOneAndUpdate({store : storeID}, {store:undefined}).exec(),
			self.remove({store: storeID}),
			Review.remove({product : {$in : removedProductsArr}}),
			Store.findByIdAndRemove(storeID).exec()
		];

		return Promise.all(dependencyArr).then(function(data){
			return data;
		}).catch(function(err){
			throw new Error(err);
		});
	});
};

schema.statics.editProduct = function(productID, product){
	return this.findByIdAndUpdate(productID, product)
				.populate(storeQuery)
				.exec(function(err, data){
					if(err) throw new Error(err);
					return data;
				});
};

schema.statics.getProductById = function(productID, cb){
	return this.findById(productID)
		.populate(storeQuery)
		.exec(function(err, productData){
	    	if(err) throw new Error(err);
	    	Review.getReviewByQuery({product: productData._id})
					.then(function(reviewData){
						cb(productData, reviewData);
					});
				});
};

schema.statics.getProductsByQuery = function(query){
	return this.find(query)
				.populate(storeQuery)
				.exec(function(err, dataArr){
					if(err) throw new Error(err);
					return dataArr;
				}
	);
};

schema.statics.findStoreProductsByCategory = function (storeUrl, query, cb){
    var self = this;
    Store.findOne({url: storeUrl}, function(err, storeData){
					    			if(err) throw new Error(err);
					    			query.store = storeData._id;
					    			self.find(query, function(err, data){
					    				var obj = {
					    					store : storeData,
					    					products : data
					    				};
					    				cb(err, obj);
					    			});
				});
};

schema.statics.updateQuantities = function (order, cb) {
	//update quantities will affect orders/lineitems/products
	var self = this;
	order.products.forEach( function(e){
		return self.findByIdAndUpdate(e.product, {$inc : {quantity : -e.quantity}}, function(err, data){
			if(err) throw new Error(err);
			cb(err, data);
		});
	});

};

var Product = mongoose.model('Product', schema);

Product.schema.path('categories').validate(function (value) {
	if(!value) return false;
  	return value.length > 0;
}, 'Must have at least one Category');