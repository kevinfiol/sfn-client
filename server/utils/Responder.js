const Responder = {
    json(ctx, obj) {
        ctx.response.headers.set('Content-Type', 'application/json');
        ctx.response.body = JSON.stringify(obj);
        return ctx;
    }
};

export default Responder;