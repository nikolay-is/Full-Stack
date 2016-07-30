'use strict';

const Hapi = require('hapi');
const Good = require('good');

const MongoClient = require('mongodb').MongoClient;

const userRoutes = require('./user.routes');
const adsRoutes = require('./ads.routes');
const categoryRoutes = require('./category.routes');
const allRoutes = userRoutes.concat(adsRoutes).concat(categoryRoutes);

//Connection URL to db
const url = 'mongodb://localhost:27017/adsdb';

//Use connect to connect to db
MongoClient.connect(url, { db: { w: 1 } }).then( (db) => {
    // assert.equal(null, err);
    console.log(`Successfully connected to MongoDB server at: ${url}`);

    //Create hapi server
    const server = new Hapi.Server();
    server.connection({ port: 9000 });

    server.bind({ db: db });
    
    // Registering the Good plugin
    server.register([{
        register: Good,
        options: {
            reporters: {
                console: [{
                    module: 'good-squeeze',
                    name: 'Squeeze',
                    args: [{
                        error: '*',
                        log: '*'
                    }]
                }, {
                    module: 'good-console'
                }, 'stdout']
            }
        }
    }], (err) => {
        if (err) {
            throw err;
        }

        // Starting the server
        server.start((err) => {
            if (err) {
                throw err;
            }
            console.log('Server running at:', server.info.uri);
        });
    });

    // Registering roots
    server.route(allRoutes);
})
    .catch( (err) => {throw err;});