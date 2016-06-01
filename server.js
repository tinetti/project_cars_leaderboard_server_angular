const Hapi = require('hapi');
const Boom = require('boom');
const Inert = require('inert');
const MongoClient = require('mongodb').MongoClient;

const config = require('./config');
const mongoUrl = config.mongo.url;
const serverPort = config.server.port;

const server = new Hapi.Server({});

server.connection({port: serverPort});
server.log(['debug', 'error', 'database', 'read']);


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
    handler: (request, reply) => {
        if (!lapsCollection) {
            return reply(Boom.create(503, 'Database Unavailable'));
        }

        lapsCollection.find({}).toArray((err, laps) => {
            if (err) {
                return reply(Boom.wrap(err));
            }

            var sorted = laps.sort((a, b) => {
                var dateA = Date.parse(a.lapTimestamp);
                var dateB = Date.parse(b.lapTimestamp);
                return dateA ?
                    (dateB ? dateB - dateA : -1) :
                    (dateB ? 1 : 0);
            });

            return reply({laps: sorted});
        });
    }
});

server.route({
    method: 'GET',
    path: '/api/laps/{_id}',
    handler: (request, reply) => {
        if (!lapsCollection) {
            return reply(Boom.create(503, 'Database Unavailable'));
        }

        lapsCollection.find({_id: request.params._id}).toArray((err, laps) => {
            if (err) {
                return reply(Boom.wrap(err));
            }

            if (!laps.length) {
                return reply(Boom.notFound('Lap not found'));
            }

            return reply(laps[0]);
        });
    }
});

server.route({
    method: 'POST',
    path: '/api/laps',
    handler: (request, reply) => {
        if (!lapsCollection) {
            return reply(Boom.create(503, 'Database Unavailable'));
        }

        if (request.payload._id) {
            return reply(Boom.create(400, '_id should not be present for insert'));
        }

        var lap = JSON.parse(JSON.stringify(request.payload));
        lap.lapTimestamp = Date.parse(lap.lapTimestamp) || new Date();
        lap.createdTimestamp = new Date();
        lap.modifiedTimestamp = new Date();
        lapsCollection.insertOne(lap, (err, result) => {
            if (err) {
                return reply(Boom.wrap(err));
            }

            console.log("inserted lap: " + JSON.stringify(lap));
            return reply({result: result.result, lap: lap});
        });
    }
});

server.route({
    method: 'PUT',
    path: '/api/laps/{_id}',
    handler: (request, reply) => {
        if (!lapsCollection) {
            return reply(Boom.create(503, 'Database Unavailable'));
        }

        var _id = request.params._id;
        if (request.payload._id != _id) {
            return reply(Boom.create(400, '_id in url should match payload'));
        }

        var lap = JSON.parse(JSON.stringify(request.payload));
        lap.lapTimestamp = Date.parse(lap.lapTimestamp) || new Date();
        lap.createdTimestamp = Date.parse(lap.createdTimestamp) || new Date();
        lap.modifiedTimestamp = new Date();
        lapsCollection.updateOne({_id: _id}, lap, (err, result) => {
            if (err) {
                return reply(Boom.wrap(err));
            }

            console.log("updated lap: " + JSON.stringify(lap));
            return reply({result: result.result, lap: lap});
        });
    }
});

server.on('response', function (request) {
    console.log(request.info.remoteAddress + ': ' + request.method.toUpperCase() + ' ' + request.url.path + ' --> ' + request.response.statusCode);
});

MongoClient.connect(mongoUrl, (err, db) => {
    if (err) {
        console.log("Error connecting to mongo server", mongoUrl);
        return;
    }

    lapsCollection = db.collection("laps");
});

server.start((err) => {
    if (err) {
        throw err;
    }

    console.log(`Server running at: http://localhost:${server.info.port}`);
});