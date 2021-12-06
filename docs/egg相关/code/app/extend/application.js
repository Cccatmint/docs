module.exports = {
    currentTime () {
        return getTime()
    },
    get staticString () {
        return 'application 扩展属性'
    }
}

function getTime () {
    return  new Date()
}