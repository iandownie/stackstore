/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

Refer to the q documentation for why and how q.invoke is used.

*/

var mongoose = require('mongoose');
var connectToDb = require('./server/db');
var User = mongoose.model('User');
var Product = mongoose.model('Product');
var Store = mongoose.model('Store');
var Order = mongoose.model('Order');
var Review = mongoose.model('Review');
var Admin = mongoose .model('Admin');
var LineItem = mongoose.model('LineItem');
var Category = mongoose.model('Category');

var q = require('q');
var chalk = require('chalk');

var getCurrentAdminData = function () {
    return q.ninvoke(Admin, 'find', {});
};
var getCurrentUserData = function () {
    return q.ninvoke(User, 'find', {});
};
var getCurrentCategoryData = function () {
    return q.ninvoke(Category, 'find', {});
};
var getCurrentStoreData = function () {
    return q.ninvoke(Store, 'find', {});
};
var getCurrentProductData = function () {
    return q.ninvoke(Product, 'find', {});
};
var getCurrentReviewData = function () {
    return q.ninvoke(Review, 'find', {});
};
var getCurrentOrderData = function () {
    return q.ninvoke(Order, 'find', {});
};
var getCurrentLineItemData = function () {
    return q.ninvoke(LineItem, 'find', {});
};

var seedAdmin = function(){

    var admin = [{
        firstName : 'Worlds',
        lastName : 'Greatest',
        email : 'me@thetop.com',
        password : 'secure'
    }];

    return q.invoke(Admin, 'create', admin);
};

var seedUsers = function () {

    var users = [
        {
            firstName: 'Trash',
            lastName : 'Miner',
            email: 'treasure@trashheap.com',
            password: 'garbage'
        },
        {
            firstName: 'Black',
            lastName : 'Hat',
            email : 'lurk@shadows.com',
            password: 'hack'
        },
        {
            firstName: 'Tyrion',
            lastName: 'Lannister',
            email: 'halfman@greathouse.com',
            password: 'bazaar'
        },
        {
            firstName: 'Mocha',
            lastName: 'Chai',
            email: 'testing@fsa.com',
            password: 'password'
        },
        {
            firstName: 'Gaius',
            lastName: 'Baltar',
            email: 'cylon@galatica.com',
            password: 'need2jump'
        },
        {
            firstName: 'Sheogorath',
            lastName: 'Parrallax',
            email: 'Sheogorath@Parrallax.com',
            password: 'Parallax'
        },
    ];

    return q.invoke(User, 'create', users);

};

var seedCategories = function(){
    var categories = [{
        name : 'Trash'
    },
    {
        name : 'Accounts'
    },
    {
        name : 'Weaponry'
    },
    {
        name : 'Madness'
    }];

    return q.invoke(Category, 'create', categories);
};

var seedStores = function(userIDArray){
    var stores = [{
        user: userIDArray[0], //user Trash Miner
        name : 'Trashy',
        url : 'trashy',
        logo : 'http://www.melissa-popp.com/wp-content/uploads/2014/11/pro-disposal-review.jpg'
    },
    {
        user : userIDArray[1], //user Black Hat
        name : 'Mother Lode',
        url : 'motherlode',
        logo : 'http://motherlode.com.au/wp-content/uploads/2014/03/motherlode-logo-black-code-on-trans-landscape.png'
    },
    {
        user : userIDArray[2], //user Tyrion Lannister
        name: 'Tyrion\'s Armory',
        logo: 'http://dailycampus.com/wp-content/uploads/2015/03/03-30-2015-Armory-logo.jpg'
    },
    {
        user: userIDArray[5], //user Trash Miner
        name : "Cheese Monger\'s Hollow",
        url : 'madness',
        logo : 'http://www.ufunk.net/wp-content/uploads/2014/03/David-Szakaly-animated-GIFs-4.gif'
    }];

    return q.invoke(Store, 'create', stores);
};

var seedProducts = function (storeIDArray, categoriesIDArray) {

    var products = [
        {
            name : 'Dozen of Hand Teared Candy Wrapper',
            price : 29.99,
            quantity : 5,
            description : 'Personally teared candy wrappers while watching TV, lying on my bed, sitting in the bathroom',
            categories : [categoriesIDArray[0]],
            store: storeIDArray[0],
            images : ['http://thesingingnurse.com/wp-content/uploads/2012/02/16-x-15-papers-IMG_0051_1282.jpg', 'http://texturetaddka.com/wp-content/uploads/2012/10/Golden_chocolate_candy_wrapper_texture_1.jpg']
        },
        {
            name : 'Sock with Holes',
             price : 39.99,
             quantity : 2,
             description: 'The holes were slowly impressed on the socks through continuous long walks along the urban beaches',
             categories : [categoriesIDArray[0]],
             store: storeIDArray[0],
             images : ['http://www.makingthishome.com/wp-content/uploads/2009/10/sock-hole.jpg', 'https://c1.staticflickr.com/9/8458/7935235656_091438ae30.jpg', 'http://www.alwaysonholladays.com/wp-content/uploads/2011/07/IMG_3844.jpg']
        },
        {
            name : 'Stained White Tees',
            price : 69.99,
            quantity : 2,
            description: 'Traveled the world with these shirts. Some of these stains may be from quinoa/kale',
            categories : [categoriesIDArray[0]],
            store: storeIDArray[0],
            images : ['http://divasanddorks.com/wp-content/uploads/2013/04/sclothing.jpg', 'http://photo.blogpressapp.com/photos/12/03/25/s_4122.jpg']
        },
        {
            name: 'joedotjs\'s Codewar Account',
            price: "89.99",
            description: 'You know you want it.',
            quantity: 1,
            categories : [categoriesIDArray[1]],
            store: storeIDArray[1],
            images: ['http://joselcontreras.com/wp-content/uploads/2014/06/codewars.jpg']
        },
        {
            name: 'gtelljohann\'s Codewar Account',
            price: "99.99",
            description: 'You know you want it.',
            quantity: 1,
            categories : [categoriesIDArray[1]],
            store: storeIDArray[1],
            images: ['http://joselcontreras.com/wp-content/uploads/2014/06/codewars.jpg']
        },
        {
            name: 'heythisisdave\'s Codewar Account',
            price: "109.99",
            description: 'You know you want it.',
            quantity: 1,
            categories : [categoriesIDArray[1]],
            store: storeIDArray[1],
            images: ['http://joselcontreras.com/wp-content/uploads/2014/06/codewars.jpg']
        },
        {
            name: 'Broadsword',
            price: "199.99",
            description: 'Freshly Forged',
            quantity : 5,
            categories : [categoriesIDArray[2]],
            store: storeIDArray[2],
            images: ['http://www.cuttingedgecombat.co.uk/userfiles/image/singlehanded%20broadsword.JPG']
        },
        {
            name: 'Axe',
            price: "99.99",
            description: 'Whack',
            quantity:1,
            categories : [categoriesIDArray[2]],
            store: storeIDArray[2],
            images : ['https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQ8NE9Q7JGTgt2EMoKjxN4062FXtR0RsxQ2yHFeqY4DcuJbqfI&usqp=CAE']
        },
        {
            name: 'Swiss',
            price: "6.99",
            description: 'Holiest of Holy Cheeses',
            quantity:2,
            categories : [categoriesIDArray[3]],
            store: storeIDArray[3],
            images : ['http://www.ufunk.net/wp-content/uploads/2014/03/David-Szakaly-animated-GIFs-9.gif']
        },
        {
            name: 'Cheddar',
            price: "4.99",
            description: 'Show me the Cheddar!!!!',
            quantity:5,
            categories : [categoriesIDArray[3]],
            store: storeIDArray[3],
            images : ['http://www.ufunk.net/wp-content/uploads/2014/03/David-Szakaly-animated-GIFs-2.gif']
        },
        {
            name: 'limburger',
            price: "9.99",
            description: 'Smells delicious!',
            quantity:1,
            categories : [categoriesIDArray[3]],
            store: storeIDArray[3],
            images : ['http://www.ufunk.net/wp-content/uploads/2014/03/David-Szakaly-animated-GIFs-5.gif']
        }
    ];

    return q.invoke(Product, 'create', products);

};

var seedReviews = function (productIDArray, userIDArray) {

    var reviews = [{
        product : productIDArray[0],
        user: userIDArray[3],
        rating : 3,
        title : 'It is ok.',
        description : 'I expected more.'
    },
    {
        product : productIDArray[0],
        user : userIDArray[4],
        rating : 4,
        title : 'Absolutely love it',
        description: 'It tastes great'
    },
    {
        product : productIDArray[1],
        user : userIDArray[5],
        rating : 1,
        title : 'Wat',
        description : 'Did I receive the wrong product? Because it doesn\'t work the way they say it would'
    },
    {
        product : productIDArray[11],
        user : userIDArray[5],
        rating : 5,
        title : 'Cheesey Review',
        description : 'Brain-meltingly good!'
    }];

    return q.invoke(Review, 'create', reviews);

};

connectToDb.then(function () {

    var firstStep = [
        //Seed Admin
        getCurrentAdminData().then(function (admin) { // seed user
            if (admin.length === 0) {
                return seedAdmin();
            } else {
                console.log(chalk.magenta('Seems to already be admin data, exiting!'));
            }
        }).then(function(data){
            console.log(chalk.green('Admin Seed Successful!'));
            return data;
        }).catch(function (err) {
            console.error(err);
            throw new Error(err);
        }),
        //Seed Users
        getCurrentUserData().then(function (users) { // seed user
            if (users.length === 0) {
                return seedUsers();
            } else {
                console.log(chalk.magenta('Seems to already be user data, exiting!'));
            }
        }).then(function (data) {
            console.log(chalk.green('User Seed Successful!'));
            return data;
        }).catch(function (err) {
            console.error(err);
            throw new Error(err);
        }),
        //Seed Categories
        getCurrentCategoryData().then(function (categories) { // seed user
            if (categories.length === 0) {
                return seedCategories();
            } else {
                console.log(chalk.magenta('Seems to already be categories data, exiting!'));
            }
        }).then(function (data) {
            console.log(chalk.green('Categories Seed Successful!'));
            return data;
        }).catch(function (err) {
            console.error(err);
            throw new Error(err);
        })
    ];

    q.all(firstStep).spread(function(admin, users, categories){
        return users.map(function(el){
            return el._id;
        });
    }).then(function(userIDArray){
        //checks to see if there are stores and then if not, it will seed
        return getCurrentStoreData().then(function(stores){
            if(stores.length === 0){
                return seedStores(userIDArray);
            } else {
                console.log(chalk.magenta('Seems to already be stores data, exiting!'));
            }
        }).then(function (data) {
            console.log(chalk.green('Stores Seed Successful!'));
            return data;
        }).catch(function (err) {
            console.error(err);
            throw new Error(err);
        });

    })
    .then(function(storeArray){
        //Linking Stores to Users
        var storeUserArray = storeArray.map(function(el){
            return User.findByIdAndUpdate(el.user, {store : el._id}, function(err, data){
                    if(err) throw new Error(err);
                    return data;
                }).exec();
        });

        return q.all(storeUserArray).then(function(dataArr){
            return storeArray;
        }).catch(function(err){
            throw new Error(err);
        });
    })
    .then(function(storeArray){
        var storeIDArray = storeArray.map(function(el){
            return el._id;
        });
        //Seeds Products
        return q.all([getCurrentCategoryData(), getCurrentProductData()]).spread(function(categories, products){
            if (products.length === 0){
                var categoriesIDArray = categories.map(function(el){
                    return el._id;
                });
                return seedProducts(storeIDArray, categoriesIDArray);
            } else {
                console.log(chalk.magenta('Seems to already be products data, exiting!'));
                return products;
            }
        }).then(function(data) {
            console.log(chalk.green('Product Seed Successful!'));
            return data;
        }).catch(function (err) {
            console.error(err);
            throw new Error(err);
        });
    }).then(function(productArray){
        var productIDArray = productArray.map(function(el){
            return el._id;
        });
        //Seeds Reviews
        return q.all([getCurrentUserData(),getCurrentReviewData()]).spread(function(users, reviews){
            if (reviews.length === 0){
                var usersIDArray = users.map(function(el){
                    return el._id;
                });
                return seedReviews(productIDArray, usersIDArray);
            } else {
                console.log(chalk.magenta('Seems to already be reviews data, exiting!'));
            }
        }).then(function() {
            console.log(chalk.green('Review Seed Successful!'));
        }).catch(function (err) {
            console.error(err);
            throw new Error(err);
        });
    });
});