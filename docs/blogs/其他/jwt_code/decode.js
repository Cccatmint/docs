// 同步 解码 不会验证是否有效
// 详情访问 https://www.npmjs.com/package/jsonwebtoken
const { decode } = require('jsonwebtoken')

const Info = decode('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNjY2F0bWludCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYyNTAxNjg1OSwiZXhwIjoxNjI1MDIwNDU5fQ.6vOTzb6NN0soAIZDOsrzONHOFD7DRxZaPaNytmqNFQU')

console.log(Info);

// {
//   username: 'cccatmint',
//   role: 'admin',
//   iat: 1625016859,
//   exp: 1625020459
// }