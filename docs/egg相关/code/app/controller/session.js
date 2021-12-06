const { Controller } = require('egg')

class SessionController extends Controller {
    async addSession () {
        const { ctx }  = this
        ctx.session.mail = 'cao9710@outlook.com'
        ctx.body = {
            status: 200,
            data: 'session 设置成功'
        }
    }

    async getSession () {
        const { ctx }  = this
        const mail = ctx.session.mail
        ctx.body = {
            status: 200,
            data: mail
        }
    }
}

module.exports = SessionController