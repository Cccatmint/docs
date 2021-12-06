const { Controller } = require('egg')

class CookieController extends Controller {
    async add () {
        const { ctx } = this
        ctx.cookies.set('user', 'cccatmint', {
            // cookie 配置
            // maxAge: 10 * 1000, // cookie有效事件10s
            // httpOnly: false, // 关闭 仅允许服务端操作cookie 以能 document.cookie

        })
        ctx.body = {
            status: 200,
            data: 'add cookie success.'
        }
    }

    async del () {
        const { ctx } = this
        ctx.cookies.set('user', null)
        ctx.body = {
            status: 200,
            data: 'delete cookie success.'
        }
    }

    async edit () {
        const { ctx } = this
        ctx.cookies.set('user', '中文cookie', {
            encrypt: true // 加密
        })
        ctx.body = {
            status: 200,
            data: 'edit cookie success.'
        }
    }

    async search () {
        const { ctx } = this
        ctx.body = {
            status: 200,
            data: ctx.cookies.get('user', {
                encrypt: true // 若加密过 获取时要解密
            })
        }
    }
}

module.exports = CookieController