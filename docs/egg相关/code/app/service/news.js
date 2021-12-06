// 在实际应用中，Controller 一般不会自己产出数据，也不会包含复杂的逻辑
// 复杂的过程应抽象为业务逻辑层 Service
const Service = require('egg').Service

class NewsService extends Service {
    async list (page=1) {
        // read config
        const { serverUrl, pageSize } = this.config.news

        // 使用内置的http client 去获取hacker-news 的api
        const { data: idList } = await this.ctx.curl(`${serverUrl}/topstories.json}`, {
            data: {
                orderBy: '"$key"',
                startAt: `${pageSize * (page - 1)}`,
                endAt: `${pageSize * page - 1}`
            },
            dataType: 'json'
        })

        // get detail
        const newsList = await Promise.all(
            Object.keys(idList).map(key => {
                const url = `${serverUrl}/item/${idList[key]}.json`
                return this.ctx.curl(url, { dataType: 'json'})
            })
        )

        return newsList.map(res=> res.data)
    }
}

module.exports = NewsService;