# webhook实践

后端接口

- 路由

```
router.post('/webhook', controller.webhook.index);
```

- controller

  其中`webhookSecret`为Github设置的Secret

```js
'use strict';

const { Controller } = require('egg');
const crypto = require('crypto');
const path = require('path');
const { exec } = require('child_process');

const SUCCESSBODY = {
  code: 200,
  msg: 'Success',
};

const updateBlog = () => {
  console.log('updateBlog...');
  exec(path.join(__dirname, 'test.bat'), (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
};

class WebhookController extends Controller {
  async index() {
    const { ctx } = this;

    const requestData = ctx.request.body;

    const sig = ctx.headers['x-hub-signature'];
    const event = ctx.headers['x-github-event'];
    const id = ctx.headers['x-github-delivery'];

    if (!sig || !event || !id) {
      ctx.status = 310;
      ctx.body = {
        reason: 'No Github hook headers',
      };
      return;
    }

    const clientSig = `sha1=${crypto
      .createHmac('sha1', this.config.webhookSecret)
      .update(JSON.stringify(requestData))
      .digest('hex')}`;

    if (sig !== clientSig) {
      ctx.status = 313;
      ctx.body = {
        reason: 'X-Hub-Signature does not match',
      };
      return;
    }

    if (![ 'ping', 'push' ].includes(event)) {
      ctx.status = 311;
      ctx.body = {
        reason: 'Gihub Hook events not allow',
      };
      return;
    }

    const { repository, sender } = requestData;
    if (!repository || !sender) {
      ctx.status = 312;
      ctx.body = {
        reason: 'Missing essential parameters',
      };
      return;
    }

    const { name: repositoryName } = repository;
    if (event === 'ping') {
      ctx.body = SUCCESSBODY;
    } else if (event === 'push') {
      ctx.body = {
        code: 200,
        msg: `toupdate ${repositoryName}`,
      };
      if (repositoryName === 'jenkins_test') {
        updateBlog();
      }
    }


  }
}

module.exports = WebhookController;
```

  