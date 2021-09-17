const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
  //node_modules/nodemailer/lib/well-known/services.json  查看相关的配置，如果使用qq邮箱，就查看qq邮箱的相关配置
  host: "smtp.163.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'sendmail_cccatmint@163.com',
    pass: 'WACKSSYPVNBMZFWX', // POP3/SMTP服务-获取stmp授权码
  },
})

/**
 * 
 * @param {Object} mailOptions 邮件信息配置
 * @param {Function} callback 回调函数
 */
function sendMail(mailOptions, callback) {
  /* 配置项 */
  let mailOptions = {
    from: 'sendmail_cccatmint@163.com', // 发送方
    to: '344341207@qq.com', //接收者邮箱，多个邮箱用逗号间隔
    subject: '这里是测试标题"', // 标题
    text: '此处为text文本内容', // 文本内容
    html: '<h1>这里是html内容的标题</h1><br/><p>Cccatmint !</p><a href="https://www.baidu.com">跳转到百度</a>', //页面内容
    // /* 附件 */
    // attachments: [{
    //      filename: 'index.html', //文件名字
    //      path: './index.html' //文件路径
    //  },
    //  {
    //      filename: '../sendEmail.js', //文件名字
    //      content: '../sendEmail.js' //文件路径
    //  }
    // ]
  }

  // 发送
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      // 利用回调函数接收发送的成功与否
      callback(false)
    } else {
      callback(true)
    }
    console.log(error)
    console.log(info)
  });
}


module.exports = {
  sendMail
}
