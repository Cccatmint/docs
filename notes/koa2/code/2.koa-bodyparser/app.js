const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const app = new Koa()
app.use(bodyParser())

app.use(async ctx => {
    console.log(ctx.request.body)
})

app.listen(3000, () => {
    console.log("listening at port 3000")
})