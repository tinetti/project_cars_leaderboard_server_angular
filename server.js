const Path = require('path');
const Hapi = require('hapi');
const Boom = require('boom');
const Inert = require('inert');
const MongoClient = require('mongodb').MongoClient

const config = require('./config')
const mongoUrl = config.mongo.url
const serverPort = config.server.port

const server = new Hapi.Server({});

server.connection({ port: serverPort });
server.log(['debug', 'error', 'database', 'read']);

var db;
var lapsCollection;

server.register([Inert], config.hapi.options, (err) => {
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
        if (!lapsCollection) {
            return reply(Boom.create(503, 'Database Unavailable'));
        }

        lapsCollection.find({}).toArray(function (err, laps) {
            if (err) {
                return reply(Boom.wrap(err));
            }

            return reply({ laps: laps });
        });
    }
});

server.route({
    method: 'GET',
    path: '/api/laps/{_id}',
    handler: function (request, reply) {
        if (!lapsCollection) {
            return reply(Boom.create(503, 'Database Unavailable'));
        }

        lapsCollection.find({ _id: request.params._id }).toArray(function (err, laps) {
            if (err) {
                return reply(Boom.wrap(err));
            }

            if (!laps.length) {
                return reply(Boom.notFound('Lap not found'));
            }
            
            return reply(laps);
        });
    }
});

server.route({
    method: 'PUT',
    path: '/api/laps/{_id}',
    handler: function (request, reply) {
        if (!lapsCollection) {
            return reply(Boom.create(503, 'Database Unavailable'));
        }

        lapsCollection.updateOne({_id: request.params._id}, request.payload, function (err, result) {
            if (err) {
                return reply(Boom.wrap(err));
            }            

            console.log("saved lap: " + JSON.stringify(request.payload));
            return reply(request.payload);
        });
    }
});

MongoClient.connect(mongoUrl, function (err, db) {
    if (err) {
        console.log("Error connecting to mongo server", mongoUrl);
        return;
    }

    db = db;
    lapsCollection = db.collection("laps");
});

server.start((err) => {
    if (err) {
        throw err;
    }

    console.log(`Server running at: http://localhost:${server.info.port}`);
});