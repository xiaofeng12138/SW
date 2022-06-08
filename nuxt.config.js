import env from './env'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  mode: env[process.env.NODE_ENV],
  head: {
    // title: '申银万国期货-投资者教育网站',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      { "http-equiv": "X-UA-Compatible", content:'ie=edge'}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/logo.ico' }
    ],
    script:[
      {src:"/static/flexable.js",type:"text/javascript",charset:'utf-8'},
    ]
  },
  
  
  env: {
    baseUrl: env[process.env.NODE_ENV].BASE_API,
    NODE_ENV: env[process.env.NODE_ENV].NODE_ENV
  },

  // router:{
  //   middleware:"checked"
  // },

  presets: [
    [
      "env",
        {
          "modules": false,
          "useBuiltIns": "entry"
        }
    ],
    "stage-3"
  ],

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "~assets/css/common.less",
    'ant-design-vue/dist/antd.css'

  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    
    '~/plugins/poly',
    '~/plugins/core',
    '~/plugins/ant-ui',
    '~/plugins/myInject.js',
    '~/api/index.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
  ],


  axios: {
    proxy: true,
    prefix: '',
    credentials: true
  },

  //   proxy: {
  //   '/api': {
  //     target: process.env.baseUrl, // 目标接口域名
  //     changeOrigin: true, // 表示是否跨域
  //     pathRewrite: {
  //     '^/api': '',
  //     }}
  //  },


  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {

     postcss: [
      require('postcss-px2rem')({
        remUnit: 16 
      })
    ],


    extend(config, ctx) {
      config.output.globalObject = 'this'
      config.module.rules.push(
        {
          test: /\.pdf$/,
          loader: 'url-loader'
        }
      )
    },
    loaders: {
      less: {
        javascriptEnabled: true
      }
    },
    transpile: [/^ant-design-vue/,'axios'],
    babel: {
      plugins: [
        [
          'import',
          {
            libraryName: 'ant-design-vue',
            libraryDirectory: 'es',
            style: 'css'
            // style: true
            // 默认不使用该选项，即不导入样式 , 注意 ant-design-vue 使用 js 文件引入样式
            // true 表示 import  'ant-design-vue/es/component/style'
            // 'css' 表示 import 'ant-design-vue/es/component/style/css'
          },
        ],
        ["@babel/plugin-proposal-private-methods", { "loose": true }],
        ["@babel/plugin-proposal-private-property-in-object", { "loose": true }]
      ]
    }
  }
}
