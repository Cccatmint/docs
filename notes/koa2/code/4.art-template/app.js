const Koa = require('koa');
const render = require('koa-art-template');
const path = require('path')
const router = require('koa-router')()

const app = new Koa();

render(app, {
    root: path.join(__dirname, 'view'),
    extname: '.art',
    debug: process.env.NODE_ENV !== 'production'
  });

router.get('/x', async (ctx, next) => {
    ctx.render('x')
})




app.use(router.routes())

app.listen(3000, () => {
    console.log('at port 3000');
});