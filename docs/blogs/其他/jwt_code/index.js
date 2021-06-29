const jsonwebtoken = require('jsonwebtoken')

const user = {
  username: 'cccatmint',
  password: 'mypassword',
  _id: '0015015'
}

const SECRET = 'anyString_abc'

const token = jsonwebtoken.sign(
  { username: user.username, id: user._id },
  SECRET,
  { expiresIn: '1h' } // 有效时间

)

console.log(token)

console.log(jsonwebtoken.decode(token))
