const app = require('koa')();
const router = require('koa-router')();
const db = require('./db.json');

// Log requests
app.use(function* (next) {
	const start = new Date;
	yield next;
	const ms = new Date - start;
	console.log('%s %s - %s', this.method, this.url, `${ms}ms`);
});

router.get('/api/threads', function* () {
	this.body = db.threads;
});

router.get('/api/threads/:threadId', function* () {
	this.body = db.threads.find((thread) => thread.id == this.params.threadId);
});

router.get('/api/', function* () {
	this.body = "API ready to receive requests";
});

router.get('/', function* () {
	this.body = "Ready to receive requests";
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);

console.log('Threads worker started');
