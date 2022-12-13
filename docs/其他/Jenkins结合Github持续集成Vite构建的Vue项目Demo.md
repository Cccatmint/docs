# Jenkins Test

windows 系统下使用 Jenkins 实现自动化部署 Vue.js 项目

## 1、安装Jenkins

- 安装需要 JDK [下载页面](https://www.oracle.com/java/technologies/downloads/#java11-windows)

- Jenkins [下载页面](https://www.jenkins.io/download/)

- 下载安装包后进行安装

- 进入配置的网址按提示解锁Jenkins(服务器防火墙打开对应端口便于远程)

- 安装推荐的插件

## 2、github 生成Personal Access Token

**github > settings > Developer settings > Personal access tokens > tokens(classic)**

进入上述页面后点击`Generate new token`

输入`Note`描述该token的用途，并在`Select scopes`下勾选`repo`和`admin:repo_hook`点击生成，生成的token只显示一次需要保存好。

## 3、GitHub设置GitHub Webhooks

在需要进行持续集成的项目仓库中选择settings -> webhooks 点击`Add webhook`添加钩子,其中Payload URL 为 部署Jenkins的服务器IP+端口+'github-webhook/',例如`http://11.111.111.111:8899/github-webhook/`


## 4、设置Jenkins的GitHub配置

- 需要的插件`Github Plugin`在Jenkins安装时推荐插件里已经安装过了

- 在浏览器中输入输入Jenkins的网址,新建项目，选择构建自由风格的软件项目

- 关联GitHub: 
    **Manage Jenkins > Configure System** 的GitHub选项中配置GitHub Servers 的 `Credentials` 选择添加新的凭证，类型为`Secret text`，将之前生成的`Personal Access Token`填写到`Secrect`中并完成添加，勾选Manage hooks, 可以点击`Test connection`按钮测试连接情况


## 5、进行Jenkins项目的配置

Dashboard > myProjectName > General

- 勾选`Discard old builds` 填写Days to keep builds 和 Max # of builds to keep 以减少旧构建的保存

- 勾选GitHub project 填写Project url ,例如`https://github.com/Cccatmint/jenkins_test/`

- Source Code Management 源码管理
  
  勾选 `Git`

  `Repository URL` 填写例如`git@github.com:Cccatmint/jenkins_test.git`

  `Credentials` 添加凭证，比如用户名和密码类型的凭证，添加后选中

  `Branches to build` 选择用于构建的分支，例如`main`

  `Repository browser` 源码浏览器选择`githubweb`,填写URL如`https://github.com/Cccatmint/jenkins_test`

- Build Triggers 构建触发器
  
  勾选`GitHub hook trigger for GITScm polling`

- Build Environment 构建环境
  
  勾选`Add timestamps to the Console Output`打印内容添加时间戳便于查看


- Build Steps 构建步骤
  
  windows 系统 选择 `Execute Windows batch command` 编写对应的命令，例如:

    ```bat
    :: windows 系统下使用 Jenkins 实现自动化部署 Vue.js 项目
    @echo off
    :: 安装依赖并且打包
    call npm ci && call npm run build
    :: MY_NGINX_PROJECT_HOME 为 系统变量，已手动设置为nginx的目录   C:\Users\Administrator\Desktop\nginx-1.23.2\html\jenkins_test
    echo %MY_NGINX_PROJECT_HOME%
    :: 赋值dist下打包好的文件到对应的目录 /E 表示不仅复制子文件，且复制子文件夹的内容 /Y    用于确认覆盖重名文件
    xcopy dist\*.* %MY_NGINX_PROJECT_HOME% /E /Y
    echo finished.
    ```    

## 6、其他

此时向GitHub目标仓库提交代码将触发Jenkins自动拉取源码并执行构建步骤

- 此Vue项目 使用Vite构建

    **vite.config.js**
    ```js
    import { defineConfig, loadEnv } from 'vite'
    import vue from '@vitejs/plugin-vue'

    export default ({ mode }) => {
      process.env = { ...process.env, ...loadEnv(mode, process.cwd  ()) }
      return defineConfig({
        plugins: [vue()],
        base: process.env.VITE_APP_BASE,
        build: {
          outDir: process.env.VITE_APP_DIR
        }
      })
    }
    ```

    **.env.production**
    ```
    VITE_APP_DIR=dist
    VITE_APP_BASE=/jenkins_test/
    ```

- Nginx 配置
  ```
        ...

        location /jenkins_test {
           alias   html/jenkins_test;
           index index.html;
        }

        ...
    ```
