const router = require('koa-router')()
const { sendMail } = require('../src/utils/sendEmail.js')

const testCallback = result => {
  console.log(`发送邮件的结果是${result}`)
}

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/sendmail', async (ctx, next) => {

  sendMail(testCallback)
  ctx.body = 'sendmailPage'
})

module.exports = router
