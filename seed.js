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

var q = require('q');
var chalk = require('chalk');

var getCurrentUserData = function () {
    return q.ninvoke(User, 'find', {});
};
var getCurrentProductsData = function () {
    return q.ninvoke(Product, 'find', {});
};
var getCurrentStoresData = function () {
    return q.ninvoke(Store, 'find', {});
};

var seedUsers = function () {

    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password'
        },
        {
            email: 'obama@gmail.com',
            password: 'potus'
        }
    ];

    return q.invoke(User, 'create', users);

};

var seedProducts = function () {

    var products = [
        {
            name: 'Glass of Red Wine',
            price: "6.99",
            description: 'A delicious glass of red wine.',
            quantity:1
        },
        {
            name: 'Broadsword',
            price: "199.99",
            description: 'This shit is sharp.',
            quantity:1
        },
        {
            name: 'A Glass of Ale',
            price: "4.99",
            description: 'This shit is delicous.',
            quantity:1
        },
        {
            name: 'Axe',
            price: "99.99",
            description: 'This shit is sharp.',
            quantity:1
        },
    ];

    return q.invoke(Product, 'create', products);

};
var seedStores = function (productsArray) {

    var stores = [
        {
            userName: 'ImpishDelights',
            storeName: "Tyrion's Wine Shop",
            logo: 'http://www.bootcamps.in/wp-content/uploads/2014/12/fullstack-academy.png',
            products : productsArray
        }
        // {
        //     userName: 'SnowMan123',
        //     storeName: "Snow\'s Swords",
        //     products: ,
        //     logo: 'http://www.bootcamps.in/wp-content/uploads/2014/12/fullstack-academy.png'
        // }
    ];

    return q.invoke(Store, 'create', stores);

};

connectToDb.then(function () {
    getCurrentUserData().then(function (users) {
        if (users.length === 0) {
            return seedUsers();
        } else {
            console.log(chalk.magenta('Seems to already be user data, exiting!'));
        }
    }).then(function () {
        console.log(chalk.green('User Seed Successful!'));
    }).catch(function (err) {
        console.error(err);
    });

    getCurrentProductsData().then(function (products) {
        if (products.length === 0) {
            return seedProducts();
        } else {
            console.log(chalk.magenta('Seems to already be products data, exiting!'));
            return products;
        }
    }).then(function (products) {
        console.log(chalk.green('Product Seed Successful!'));

        getCurrentStoresData().then(function (stores) {
            if (stores.length === 0) {
                //randomly generates an array of ObjectIds of products for a store
                var productIDs = products.map(function(product){
                    return product._id;
                }).filter(function(productId){
                    if (Math.random() > 0.6){
                        return true;
                    } else {
                        return false;
                    }
                });
                //passes array of ObjectIds of products to be seeded into the stores
                return seedStores(productIDs);
            } else {
                console.log(chalk.magenta('Seems to already be store data, exiting!'));
            }
        }).then(function () {
            console.log(chalk.green('Store Seed Successful!'));
        }).catch(function (err) {
            throw new Error(err);
        });
    }).catch(function (err) {
        console.error(err);
    });
});


// connectToDb.then(function () {
//     getCurrentProductData().then(function (products) {
//         if (users.length === 0) {
//             return seedProducts();
//         } else {
//             console.log(chalk.magenta('Seems to already be products data, exiting!'));
//         }
//     }).then(function () {
//         console.log(chalk.green('Product Seed Successful!'));
//     }).catch(function (err) {
//         console.error(err);
//     });
// });
// connectToDb.then(function () {
//     getCurrentStoreData().then(function (stores) {
//         if (users.length === 0) {
//             return seedStore();
//         } else {
//             console.log(chalk.magenta('Seems to already be store data, exiting!'));
//         }
//     }).then(function () {
//         console.log(chalk.green('Store Seed Successful!'));
//     }).catch(function (err) {
//         console.error(err);
//         process.kill(1);
//     });
// });
