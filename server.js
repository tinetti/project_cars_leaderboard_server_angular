const Path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');
const MongoClient = require('mongodb').MongoClient

const server = new Hapi.Server();

const config = require('./config')
const mongoUrl = config.mongo.url
const serverPort = config.server.port

server.connection({ port: serverPort });

server.register(Inert, (err) => {
    if (err) {
        throw err;
    }
    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: 'public'
            }
        }
    });
});

server.route({
    method: 'GET',
    path: '/api/laps',
    handler: function (request, reply) {
        if (!server.app.db) {
            console.log("not connected to mongo");
            reply({ laps: [] });
            return;
        }
        
        var collection = server.app.db.collection("laps");
        collection.find({}).toArray(function (err, laps) {
            if (err) {
                reply({ error: err });
                return;
            }
            
            reply({ laps: laps });
        });
    }
});

MongoClient.connect(mongoUrl, function (err, db) {
    if (err) {
        console.log("Error connecting to mongo server", mongoUrl);
        return;
    }

    server.app.db = db;
});

server.start((err) => {
    if (err) {
        throw err;
    }

    console.log(`Server running at: http://localhost:${server.info.port}`);
});
