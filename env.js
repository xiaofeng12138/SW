/**
 * NODE_ENV:环境变量
 * BASE_API：接口请求的地址 
 * BASE_URL_D: 网站访问统计的接口
 * BASE_URL_TOKEN:保利威视获取token的地址
 * BASE_URL_MAT:matomo地址
 * BASE_URL_EXPONENT:申万指数接口
 * BASE_URL_IFRAME:申万指数iframe嵌套地址
 * 
 * 
 * 
 * **/

 module.exports = {
  // 开发环境
  development: {
    NODE_ENV: 'development' ,
    BASE_API: 'https://edu.sywgqh.com.cn/jrzt/middle-platform-gateway', // 开发服务器地址
    BASE_URL_D:"https://edu.sywgqh.com.cn",   
    BASE_URL_TOKEN:'https://www.sywgqh.com.cn',
    BASE_URL_MTO:"//edu.sywgqh.com.cn/matomo/",
    BASE_URL_EXPONENT:"wss://sywg-u.shinnytech.com/t/sywg/front/mobile",
    BASE_URL_IFRAME:"https://www.sywgqh.com.cn/webspzs"
    //BASE_API: 'http://frp.104300.xyz:19999' // 开发服务器地址
    // BASE_API:"http://172.16.8.88:9999/"
    //BASE_API:"http://aresoft.ngrok.aresoft.com/middle-platform-gateway/"
    //BASE_API: 'https://edu.sywgqh.com.cn/jrzt/middle-platform-gateway' // 测试服务器地址
    
  },
  // 测试环境
  test: {
    NODE_ENV: 'test',
    BASE_API: 'https://edu.sywgqh.com.cn/jrzt/middle-platform-gateway', // 开发服务器地址
    BASE_URL_D:"https://edu.sywgqh.com.cn",   
    BASE_URL_TOKEN:'https://www.sywgqh.com.cn',
  },

  // 生产环境
  pro: {
    NODE_ENV: 'production',
    BASE_API: 'https://edu.sywgqh.com.cn/jrzt/middle-platform-gateway', // 开发服务器地址
    BASE_URL_D:"https://edu.sywgqh.com.cn",   
    BASE_URL_TOKEN:'https://www.sywgqh.com.cn',
    BASE_URL_MTO:"//edu.sywgqh.com.cn/matomo/",
    BASE_URL_EXPONENT:"wss://sywg-u.shinnytech.com/t/sywg/front/mobile",
    BASE_URL_IFRAME:"https://www.sywgqh.com.cn/webspzs"
  },

  //打包上线环境
  production: {
    NODE_ENV: 'production',
    BASE_API: 'https://edu.sywgqh.com.cn/jrzt/middle-platform-gateway', // 开发服务器地址
    BASE_URL_D:"https://edu.sywgqh.com.cn",   
    BASE_URL_TOKEN:'https://www.sywgqh.com.cn',
    BASE_URL_MTO:"//edu.sywgqh.com.cn/matomo/",
    BASE_URL_EXPONENT:"wss://sywg-u.shinnytech.com/t/sywg/front/mobile",
    BASE_URL_IFRAME:"https://www.sywgqh.com.cn/webspzs"
  },
}
