`npm i joi`



```js
...

const Joi = require('joi')

router.post('/pwd/reset', async (ctx, next) => {
    const schema = Joi.object({
      remember_token: Joi.string().length(pwdResetCodeLength).required(),
      password: Joi.string()
        .regex(/^[a-zA-Z]\w{5,17}$/)
        .required(),
      username: Joi.string()
        .regex(/^[a-zA-Z]\w{3,18}$/)
        .required(),
    })

    const valid = schema.validate(ctx.request.body)

    if (valid.error) return ctx.res.$error(valid.error, -1)

    try {
      await pwdController.resetPwd(valid.value)
      ctx.res.$success()
    } catch (error) {
      ctx.res.$error(error.message, -1)
    }
  })

...
```

