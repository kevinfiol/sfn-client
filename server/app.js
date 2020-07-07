import config from './config.js';
import { Application, Snelm, oakCors } from './deps.js';

const app = new Application();
const snelm = new Snelm('oak');

app.addEventListener("error", (evt) => {
  // Will log the thrown error to the console.
  console.log(evt.error);
});

// Middleware
app.use(async (ctx, next) => {
    await next();
    console.log(`${ctx.request.method} ${ctx.request.url}`);
});

app.use(async (ctx, next) => {
    ctx.response = snelm.snelm(ctx.request, ctx.response);
    await next();
});

app.use(oakCors());

// Routes
import router from './router.js';
app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Listening on port ${config.port}...`);
await app.listen(`127.0.0.1:${config.port}`);