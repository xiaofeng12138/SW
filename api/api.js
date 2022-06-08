import service from "./request";



//建议提交的接口
export function addSuggestion(data){
    return service.request({
        method: "post",
        url: '/wechatwork-content-biz/front/api/suggestion/add',
        data
    })
}

//获取问卷列表接口
export function getWJlist(data){
    return service.request({
        method: "get",
        url: '/wechatwork-content-biz/front/api/questionnaire/satisfaction/list',
        params:data
    })
}

//问卷提交接口
export function submitWj(data){
    return service.request({
        method: "post",
        url: '/wechatwork-content-biz/front/api/questionnaire/satisfaction/answer',
        data
    })
}

//风险测评借口

export function submitRiskQuestion(data){
    return service.request({
        method: "post",
        url: '/wechatwork-content-biz/front/api/questionnaire/answer',
        data
    })
}



//获取文章列表的接口
export function getArticleList(data){
    return service.request({
        method: "post",
        url: '/wechatwork-content-biz/front/api/article/list',
        data
    })
}

//获取文章详情
export function getArticleInfo(data){
    return service.request({
        method: "get",
        url: '/wechatwork-content-biz/front/api/article/info',
        params:data
    })
}


///front/api/article/search

//文章搜索接口
export function articleSearch(data){
    return service.request({
        method: "post",
        url: '/wechatwork-content-biz/front/api/article/search',
        data
    })
}