import Vue from 'vue'

Vue.prototype.$myInjectedFunction=function(params){
    console.log('插件注入到vue实例中',params)
}