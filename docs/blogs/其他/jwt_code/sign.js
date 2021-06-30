const { sign } = require('jsonwebtoken')
const SECRET = '自定义随机字符串'

const user = { username: 'cccatmint', role: 'admin'}
// 签发token
const token = sign(user, SECRET, { expiresIn: '1h' })
console.log(token)
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNjY2F0bWludCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYyNTAxNjg1OSwiZXhwIjoxNjI1MDIwNDU5fQ.6vOTzb6NN0soAIZDOsrzONHOFD7DRxZaPaNytmqNFQU