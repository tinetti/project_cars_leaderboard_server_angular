const path = require('path');
const hapi = require('hapi');
const inert = require('inert');

const server = new hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: path.join(__dirname, 'public')
            }
        }
    }
});
server.connection({ port: 3000 });

server.register(inert, () => {});

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: '.',
            redirectToSlash: true,
            index: true
        }
    }
});

server.start((err) => {
    if (err) {
        throw err;
    }

    console.log('Server running at: http://localhost:', server.info.port);
});