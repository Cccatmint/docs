const { Controller } = require('egg')

class EjsController extends Controller {
    async index() {
        const { ctx } = this

        const renderData = {
            title: 'Web 性能优化：控制关键请求的优先级',
            time: this.app.currentTime(), // 自定义的application扩展方法,
            staticString: this.app.staticString, // 自定义的application扩展属性
            content: [
                '什么是资产优先级？',
                'Chrome 如何安排资源优先级？',
                '什么样的请求是关键的？',
                'Lighthouse 审计：避免关键请求的依赖链。',
                '技术：控制请求优先级。',
                '技术：图片懒加载。',
                '技术：font-display',
                '关键请求检查清单。'
            ]
        }
        await ctx.render('ejs_page/ejsdemo.html', renderData)
    }
}

module.exports = EjsController