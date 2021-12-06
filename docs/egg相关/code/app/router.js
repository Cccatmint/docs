module.exports = app => {
    const { router, controller } = app
    router.get('/', controller.home.index)
    router.get('/news', controller.news.list)
    router.get('/ejs', controller.ejs.index)

    // 操作cookie相关的路由
    router.post('/add', controller.cookie.add)
    router.post('/del', controller.cookie.del)
    router.post('/edit', controller.cookie.edit)
    router.post('/search', controller.cookie.search)


    // 操作session
    router.post('/session_setmail', controller.session.addSession)
    router.post('/session_getmail', controller.session.getSession)

    // router级别中间件
    const counter = app.middleware.counter()
    router.get('/counter', counter, controller.home.index)
}