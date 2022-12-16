const Koa = require('koa')
const koaStatic = require('koa-static')
const path = require('path')

const app =new Koa()
app.use(koaStatic(path.join(__dirname, 'public')))

app.listen(3000, () => {
    console.log('at port 3000');
})