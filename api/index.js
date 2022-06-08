import service from "./request";




// 内容部分接口


//获取轮播图接口
export function GetBannerList(data){
    return service.request({
        method: "post",
        url: '/wechatwork-content-biz/front/api/banner/list',
        data
    })
}

//荣誉列表
export function GetHonerList(data){
    return service.request({
        method: "post",
        url: '/wechatwork-content-biz/front/api/honer/list',
        data
    })
}


//产品公告列表查询
export function GetNoticeList(data){
    return service.request({
        method: "post",
        url: '/wechatwork-content-biz/front/api/notice/list',
        data
    })
}


//基金文章列表查询接口

export function GetArticleList(data){
    return service.request({
        method: "post",
        url: '/wechatwork-content-biz/front/api/article/list',
        data
    })
}







// 产品的接口如下




//基金产品通知公告列表

export function GetProNoticeList(data){
    return service.request({
        method: "post",
        url: '/wechatwork-product-biz/front/api/protocol/list',
        data
    })
}




//产品详情-产品概况查询接口
export function GetFundSummary(data){
    return service.request({
        method: "post",
        url: '/wechatwork-product-biz/front/api/summary/info',
        data
    })
}

//基金要素表查询
export function GetFundTable(data){
    return service.request({
        method: "post",
        url: '/wechatwork-product-biz/front/api/fund/list/info',
        data
    })
}


//基金要素表-当日单位净值信息
export function GetDailyFund(data){
    return service.request({
        method: "post",
        url: '/wechatwork-product-biz/front/api/fund/daily/info',
        data
    })
}

//获取基金详情接口
export function GetFundInfo(data){
    return service.request({
        method: "post",
        url: '/wechatwork-product-biz/front/api/fund/info',
        data
    })
}


//基金要素表-历史单位净值导出

export function ExportExcel(data){
    return service.request({
        method: "post",
        url: '/wechatwork-product-biz/front/api/exportXls',
        data,
        responseType:'blob',
    })
}


//产品费率查询

export function GetRate(data){
    return service.request({
        method: "post",
        url: '/wechatwork-product-biz/front/api/rate/list',
        data,
    })
}

