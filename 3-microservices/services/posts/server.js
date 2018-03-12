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

router.get('/api/posts', function* () {
	this.body = db.posts;
});

router.get('/api/posts/in-thread/:threadId', function* () {
	this.body = db.posts.filter((post) => post.thread == this.params.threadId);
});

router.get('/api/posts/by-user/:userId', function* () {
	this.body = db.posts.filter((post) => post.user == this.params.userId);
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

console.log('Posts worker started');
