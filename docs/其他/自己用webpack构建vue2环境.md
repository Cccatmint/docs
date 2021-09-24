# 使用webpack@4 构建vue2开发环境

参考掘金上的一篇文章

> https://juejin.cn/post/6844903833160646663#heading-10

感觉坑点主要是webpack和各个loader和plugin的版本不兼容导致的

这里说明一下怎么查看各个loader依赖的webpack版本，参考下面的文章

，主要是进入对应的github仓库通过tag选择对应版本然后开看package.json的peerDependencies

> https://juejin.cn/post/6898889812741210125

gitee仓库地址

> https://gitee.com/cccatmint/webpack_vue_dev_env

目录结构

```
webpack_vue_dev_env
├── package-lock.json
├── package.json
├── postcss.config.js
├── public
│   └── index.html
├── README.md
├── src
│   ├── App.vue
│   ├── main.js
│   ├── router
│   │   └── index.js
│   ├── store
│   │   └── index.js
│   └── views
│       ├── About.vue
│       └── Home.vue
├── webpack.config.js
├── webpack.dev.js
└── webpack.prod.js
```

在package.json中添加脚本，并为不同的命令指定不同的webpack配置文件

```
  "scripts": {
    "build": "webpack --config webpack.prod.js",
    "serve": "webpack-dev-server --open --config webpack.dev.js"
  },
```

## webpack.config.js 公共配置

```js
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require('webpack');
module.exports = {
  // 指定打包模式
  mode: 'development',
  // 配置入口文件
  entry:  ["@babel/polyfill", './src/main.js'],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './dist'),
    // 输出文件的文件名 将根据资源内容创建出唯一 hash
    filename: 'js/[name].[hash].js',
    // 与 output.filename 相同，不过应用于 Asset Modules
    chunkFilename: 'js/[name].[hash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      // 处理.vue
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'cache-loader'
          },
          {
            loader: 'thread-loader'
          },
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false
              },
            }
          }
        ]
      },
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'cache-loader'
          },
          {
            loader: 'thread-loader'
          },
          {
            loader: 'babel-loader'
          }
        ]
      },
      // ES6/7/8 语法转 ES5
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      // 处理CSS
      {
        test: /\.css$/,
        use: [
          "style-loader", "css-loader"
        ]
      },
      // 处理SASS | SCSS
      {
        test: /\.(scss|sass)$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader",
        }, {
          loader: "sass-loader",
          options: {
            // 可以直接在此配置dart-sass 还是node-sass ,dart-sass 被重命名为sass
            implementation: require("sass")
          }
        },
        {
          // 结合配置文件实现自动添加CSS3 浏览器前缀
          loader: 'postcss-loader'
        }
      ]
      },
      // 处理图片
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                    name: 'img/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      // 处理音视频
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'media/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      // 处理字体
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'fonts/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      }
    ]
  },
  devServer: {
    // 开启热更新
    hot: true,
    port: 8080
  },
  plugins: [
    new CleanWebpackPlugin(),
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html')
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin()
  ]
};

```

## webpack.dev.js 开发配置

```js
// mode: development
const merge = require('webpack-merge')
const commonWebpackConfig = require('./webpack.config')
const webpack = require('webpack')
module.exports = merge(commonWebpackConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    // 定义环境变量
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
  ]
})

```

## webpack.prod.js 生产配置

```js
// mode: production
const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const commonWebpackConfig = require('./webpack.config.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssnanoPlugin = require('@intervolga/optimize-cssnano-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(commonWebpackConfig, {
  mode: 'production',
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'chunk-vendors',
          test: /[\\\/]node_modules[\\\/]/,
          priority: -10,
          chunks: 'initial'
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: 'production'
      }
    }),
    // 用于提取css到文件中
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[name].[hash].css'
    }),
    // 用于压缩css代码
    new OptimizeCssnanoPlugin({
      sourceMap: true,
      cssnanoOptions: {
        preset: [
          'default',
          {
            mergeLonghand: false,
            cssDeclarationSorter: false
          }
        ]
      }
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, './public'),
        to: path.resolve(__dirname, './dist')
      }
    ]),
    new CleanWebpackPlugin(),
    // 打包分析工具
    new BundleAnalyzerPlugin({
      analyzerMode: 'server', // 启动HTTP服务器显示报告 
      analyzerHost:'127.0.0.1',
      analyzerPort: 8888,
      openAnalyzer: true // 自动在默认浏览器中打开
    })
  ]
})


```

通过`webpack-merge`合并公共配置文件

### package.json

版本能跑通，版本比较低，所以仅供参考，实际使用版本

```json
{
  "name": "webpack_vue_dev_env",
  "version": "1.0.0",
  "description": "使用webpack@4 搭建vue开发环境",
  "scripts": {
    "build": "webpack --config webpack.prod.js",
    "serve": "webpack-dev-server --open --config webpack.dev.js"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.15.5",
    "@babel/preset-env": "^7.15.6",
    "@intervolga/optimize-cssnano-plugin": "^1.0.6",
    "autoprefixer": "^10.3.5",
    "babel-loader": "^8.2.2",
    "cache-loader": "^4.1.0",
    "clean-webpack-plugin": "^4.0.0",
    "copy-webpack-plugin": "^5.0.2",
    "css-loader": "^5.2.0",
    "file-loader": "^6.2.0",
    "html-webpack-plugin": "^4.5.0",
    "mini-css-extract-plugin": "^1.6.2",
    "postcss-loader": "^4.3.0",
    "sass": "^1.42.1",
    "sass-loader": "^7.3.1",
    "style-loader": "^1.3.0",
    "thread-loader": "^3.0.4",
    "url-loader": "^4.1.1",
    "vue-loader": "^15.9.8",
    "vue-template-compiler": "^2.6.14",
    "webpack": "^4.35.3",
    "webpack-bundle-analyzer": "^4.4.2",
    "webpack-cli": "^3.3.6",
    "webpack-dev-server": "^3.11.0",
    "webpack-merge": "^4.2.2"
  },
  "dependencies": {
    "@babel/polyfill": "^7.12.1",
    "vue": "^2.6.14",
    "vue-router": "^3.5.2",
    "vuex": "^3.6.2"
  }
}

```

### postcss.config.js

```js
// postcss loader的配置文件
module.exports = {
  plugin: {
    autoprefixer: {}
  }
}
```

