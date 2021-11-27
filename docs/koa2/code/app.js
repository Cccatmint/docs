const koa = require('koa')
const app = new koa()
const router = require('koa-router')()

const views = require('koa-views');

// ! 指定模板引擎方式1
const render = views('views', { extension: 'ejs' })

// // ! 指定模板引擎方式2
// const render = views(__dirname + '/views', {
//     map: {
//         html: 'ejs'
//     }
// })

app.use(render)

app.use(async (ctx, next) => {
    ctx.state.userInfo = {
        name: 'userName',
        age: 999
    }
    console.log(ctx.state)
    await next()
})



router.get('/', async (ctx, next) => {
    await ctx.render('index.ejs')
})




app.use(router.routes())

app.use(router.allowedMethods())

app.listen(3000, () => {
    console.log('listening at port 3000')
})