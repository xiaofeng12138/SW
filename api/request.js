import axios from 'axios'

const service = axios.create({
    baseURL: process.env.baseUrl,    // 请求地址  /apiLogin/getCode/
    timeout: 5000,  // 超时
});

//请求拦截
service.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    return response
    
}, function (error) {
    
    console.log(error)
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default service
