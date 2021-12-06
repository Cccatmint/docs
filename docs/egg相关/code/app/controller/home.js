const Controller =require('egg').Controller

class HomeController extends Controller {
    async index() {
        this.ctx.body = `counter: ${this.ctx.session.counter}`

    }

}

module.exports = HomeController