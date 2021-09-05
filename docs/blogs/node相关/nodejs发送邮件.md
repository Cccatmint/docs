# 使用Nodemailer发送邮件

插件安装`npm install nodemailer --save`

> 官网 https://nodemailer.com/

 

## 自己封装发送邮件的工具函数

./utils/sendEmails.js

此处需要注意`auth.user`需要与配置项的`from`相同，否则会报错

`Error: Unexpected socket close`

```js
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
  // /* 配置项 */
  // let mailOptions = {
  //   from: 'sendmail_cccatmint@163.com', // 发送方
  //   to: '344341207@qq.com', //接收者邮箱，多个邮箱用逗号间隔
  //   subject: '这里是测试标题"', // 标题
  //   text: '此处为text文本内容', // 文本内容
  //   html: '<h1>这里是html内容的标题</h1><br/><p>Cccatmint !</p><a href="https://www.baidu.com">跳转到百度</a>', //页面内容
  //   // /* 附件 */
  //   // attachments: [{
  //   //      filename: 'index.html', //文件名字
  //   //      path: './index.html' //文件路径
  //   //  },
  //   //  {
  //   //      filename: '../sendEmail.js', //文件名字
  //   //      content: '../sendEmail.js' //文件路径
  //   //  }
  //   // ]
  // }

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

```



## 官网例子（仅供参考）

```js
"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);
```

