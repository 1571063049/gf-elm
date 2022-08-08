const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin') //去除console.log,注释
let isProd = process.env.NODE_ENV === 'production'
//定义resolve方法，把相对路径转换成绝对路径
const resolve = (dir) => path.join(__dirname, dir)
// CDN外链，会插入到index.html中
const cdn = {
  // 开发环境
  dev: {
    css: [],
    js: []
  },
  // 生产环境
  build: {
    css: [],
    js: [
      'https://cdn.bootcdn.net/ajax/libs/vue/2.6.11/vue.min.js',
      'https://cdn.bootcss.com/vue-router/3.2.0/vue-router.min.js',
      'https://cdn.bootcss.com/axios/0.26.1/axios.min.js'
    ]
  }
}

module.exports = {
  productionSourceMap: !isProd,
  lintOnSave: false,
  // 开发服务器配置
  devServer: {
    open: false, // 自动启动浏览器
    host: '0.0.0.0', // localhost
    port: 8080, // 端口号
    https: false,
    hotOnly: false, // 热更新
    proxy: {
      //配置跨域
      '^/api': {
        target: process.env.VUE_APP_BASE_URL, // 接口的域名
        ws: true, // 是否启用websockets
        changOrigin: true, // 开启代理，在本地创建一个虚拟服务端
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  chainWebpack: (config) => {
    // 公共配置
    /*别名配置*/
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('views', resolve('src/views'))
      .set('components', resolve('src/components'))
      .set('utils', resolve('src/utils'))
    /*
     * 添加CDN参数到htmlWebpackPlugin配置中
     */
    config.plugin('html').tap((args) => {
      if (isProd) {
        args[0].cdn = cdn.build
      } else {
        args[0].cdn = cdn.dev
      }
      return args
    })
    // 生产环境配置
    config.when(process.env.NODE_ENV === 'production', (config) => {
      config.entry('app').clear().add('./src/main-prod.js')
      // cdn优化配置
      config.set('externals', {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios'
      })
      // 图片压缩
      config.module.rule('images').use('image-webpack-loader').loader('image-webpack-loader').options({
        bypassOnDebug: true
      })
      // webpack 会默认给commonChunk打进chunk-vendors，所以需要对webpack的配置进行delete
      // config.optimization.delete('splitChunks')
    })
    // 开发模式配置
    config.when(!isProd, (config) => {
      config.entry('app').clear().add('./src/main-dev.js')
    })
  },
  configureWebpack: (config) => {
    const plugins = []
    if (isProd) {
      // 为生产环境修改配置...
      plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            output: {
              comments: false // 去掉注释
            },
            warnings: false,
            compress: {
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ['console.log'] //移除console
            }
          }
        })
      )
      // 开启分离js(公共代码分离)
      config.optimization = {
        runtimeChunk: 'single', //生成runtime文件记录文件hash值(依赖关系)加快二次打包速度
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: 30,
          minSize: 1000 * 20,
          cacheGroups: {
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                // 排除node_modules 然后吧 @ 替换为空 ,考虑到服务器的兼容
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                return `npm.${packageName.replace(/@/g, '')}`
              }
            }
          }
        }
      }
    }
    return {
      plugins
    }
  }
}
