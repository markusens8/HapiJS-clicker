'use strict';
const counts = new Map();

const Hapi = require('@hapi/hapi');

const init = async () => {
    const server = Hapi.server({ port:3000, host: '0.0.0.0' });
    await server.register(require('@hapi/inert'));

	server.route({
		method: 'GET',
		path: '/{param*}',
		handler: {
			directory: { path: './public' } 
		}
	});

	server.route({
		method: 'GET',
		path: '/click',
		handler: (request) => {
			const ip = request.info.remoteAddress;
			const current = counts.get(ip) || 0;
			counts.set(ip, current + 1);
			console.log(counts);
			return { count: current+1 };
		}
	});

	server.route({
		method: 'GET',
		path: '/leaderboard',
		handler: () => {
			return [...counts]
				.sort((a,b) => b[1] - a[1])
				.map(([ip,  clicks]) =>  ({ip: ip, clicks: clicks}));
		}
	})
	
	await server.start();

    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
