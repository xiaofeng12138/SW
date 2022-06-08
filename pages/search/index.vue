<template>
    <div class="knowledeg_wrap">
       <div class="table_list">
         <div class="search_box">
             <a-input
                v-model:value ="searchValue"
                placeholder="请输入搜索关键词"
                enter-button="搜索"
                size="large"
                @search="onSearch"
                class="ml-6"
                >
                 <a-icon slot="prefix" type="search" />
                 <a-button slot="suffix" type="primary" class="btn_style" @click="serachFn" :loading="btnLoading" :disable="btnDisabled">
                    搜索
                </a-button>
            </a-input>
         </div>
         <div class="search_history" v-if="searchHisArr && searchHisArr.length > 0">
             历史搜索：
             <span class="search_item" v-for="(item,index) in searchHisArr" :key="index" @click="searchItemClick(item)" >{{item.searchLabel}}</span>
         </div>
         <div class="search_tab">
            <div v-for="(item,index) in tabType" @click="changeTab(item)" :class="item.checked ? 'checked':''">{{item.label}}({{item.allCount}})</div>
         </div>
         <div class="search_list_wrap">
             <template v-if="checkKey == 1">
                 <template v-if="articleList && articleList.length > 0">
                    <li class="art_item" v-for="(item,index) in articleList" :key="index + item.id" @click="goArtDetailed(item)">
                        <div class="search_item_title" v-html="item.title.replaceAll(replaceValue,`<span style='color:red;font-weight:bold'>${replaceValue}</span>`)"></div>
                        <div class="search_item_content" v-html="item.content.replaceAll(replaceValue,`<span style='color:red;font-weight:bold'>${replaceValue}</span>`)" ></div>
                        <div class="search_item_bottom">{{ item.columnName}}｜{{item.publishTime ? item.publishTime.split(" ")[0] : ""}} </div>
                    </li>
                    <div class="page_wrap">
                        <div class="list_page"> 
                                <a-config-provider :locale="locale" >
                                <a-pagination show-quick-jumper   :total="articleTotal" @change="onChange" />
                                </a-config-provider>
                        <div class="total">共 {{ articleTotal }} 条</div>
                        </div>
                    </div>
                 </template>
                 <template v-else>
                      <li class="no_info">暂无数据</li>
                 </template>
                
             </template>
             <template v-else>
                 <template v-if="videoList && videoList.length > 0">
                      <div class="video_wrap">
                            <li class="video_item" v-for="(item,index) in videoList" :key="index" @click="goArtDetailed(item)">
                                    <img :src="item.bigPicurl" alt="">
                                    <span class="video_title" :title="item.title" v-html="item.title.replace(replaceValue,`<span  style='color:red;font-weight:bold'>${replaceValue}</span>`)"></span>
                                    <span class="video_desc">{{ item.columnName}} ｜ {{item.publishTime ? item.publishTime.split(" ")[0] : ""}}</span>
                            </li>
                        </div>
                        <div class="page_wrap">
                                <div class="list_page"> 
                                        <a-config-provider :locale="locale" >
                                        <a-pagination :defaultPageSize=12 show-quick-jumper :total="videoTotal" @change="onChangeVideo" />
                                        </a-config-provider>
                                <div class="total">共 {{ videoTotal }} 条</div>
                            </div>
                        </div>
                 </template>
                 <template v-else>
                      <li class="no_info">暂无数据</li>
                 </template>
             </template>
         
         </div>
        
         
       </div>
    </div>
</template>

<script>
import env from '@/env.js'
import {setSearchHistory,getSearchHistory} from '@/utils/cookie.js'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import {articleSearch} from '@/api/api.js'
export default {
    data(){
        return{
            replaceValue:"",
            btnLoading:false,
            btnDisabled:false,
            searchHistory:[],
            total:0,
            locale: zhCN,
            searchValue:"",
            tabType:[
                {
                    label:"资讯内容",
                    value:1,
                    checked:true,
                    allCount:0
                },
                 {
                    label:"视频内容",
                    value:2,
                    checked:false,
                    allCount:0
                },
            ],
            checkKey:1,
            videoList:[],

            articleList:[],
            searchHisArr:[],
            articleTotal:0,
            videoTotal:0,
            Flag:0
        }
    },

    computed:{
        // formatColumn(){
        //     return function (params) {
        //         let str = []
        //         params.forEach((ele)=>{
        //             str.push(ele.columnName)
        //         })
        //         return str.join(' 、 ')
        //     }
           
        // }
    },
    head(){ 
      return {
         title:'在线搜索'
      }
   },
    methods:{
         //访问记录
        getVisit() {
            let _paq = (window._paq = window._paq || []);
            // /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
            _paq.push(["setCustomUrl", 'search']);
            _paq.push(["trackPageView", "在线搜索"]);
            _paq.push(["enableLinkTracking"]);
            (function() {
                let u = env[process.env.NODE_ENV].BASE_URL_MTO;
                _paq.push(["setTrackerUrl", u + "matomo.php"]);
                _paq.push(["setSiteId", "1"]);
                let d = document,
                    g = d.createElement("script"),
                    s = d.getElementsByTagName("script")[0];
                g.async = true;
                g.src = u + "matomo.js";
                s.parentNode.insertBefore(g, s);
            })();
        },

        //搜索历史搜索
        searchItemClick(params){
            this.searchValue = params.searchLabel
            this.replaceValue = params.searchLabel
            this.queryArtList({
                    page:1,
                    title:params.searchLabel,
                    articleType:1
                })
                this.queryVideoList({
                    page:1,
                    title:params.searchLabel,
                    articleType:2
                })
            
        },

        //文章查看详情
        goArtDetailed(params){
             this.$router.push({
                path:`search/${params.id}`
            })
        },

        //文章查询函数
        queryArtList(params){
                let requestData ={
                  pageNo: params.page,
                  pageSize: 10,
                  title:params.title,
                  articleType:1
            }
            articleSearch(requestData).then(res=>{
                 let respData = res.data.result
                 console.log(123,respData);
                 
                if(respData && respData.records.length > 0){
                        this.articleList = respData.records
                        this.articleTotal = respData.total
                        this.tabType[0].allCount =  respData.total
                    }else{
                        this.articleTotal = 0
                        this.articleList  = []
                        this.tabType[0].allCount =  0
                    }
                
            }) 

        },

        //视频查询函数
        queryVideoList(params){
                let requestData ={
                  pageNo: params.page,
                  pageSize: 12,
                  title:params.title,
                  articleType:2
            }
            articleSearch(requestData).then(res=>{
               let respData = res.data.result
               if(respData && respData.records.length > 0){
                    this.videoList = respData.records
                    this.videoTotal = respData.total
                    this.tabType[1].allCount =  respData.total
                }else{
                    this.videoTotal = 0
                    this.videoList  = []
                    this.tabType[1].allCount =  0
                }
            }) 
        },
      

        //搜索函数
        serachFn(){

            this.btnLoading = true
            this.btnDisabled = true
            if(this.searchValue.length == 0){
               this.$message.error('请输入需要搜索的关键字')
                setTimeout(() => {
                        this.btnLoading = false
                        this.btnDisabled = false
                }, 1000);
             return false
            }else{
                setTimeout(() => {
                    this.btnLoading = false
                    this.btnDisabled = false
                }, 1000);
                  
                this.replaceValue = this.searchValue
                if(this.searchHisArr && this.searchHisArr.length > 0){
                    let newSearchHisArr = this.searchHisArr
                    let searchItem = {searchLabel:this.searchValue}

                    for(let i = 0 ;i<newSearchHisArr.length;i++){
                        if(newSearchHisArr[i].searchLabel == this.searchValue ){
                          this.Flag = -1
                          break;
                        }else{
                           this.Flag = 1
                        }
                    }

                    if(this.Flag > 0){
                          newSearchHisArr.unshift(searchItem) 
                    }
                    setSearchHistory(JSON.stringify(newSearchHisArr))
                    this.searchHisArr = newSearchHisArr
                }else{
                    let newSearchHisArr = []
                    let searchItem = {searchLabel:this.searchValue}
                    newSearchHisArr.unshift(searchItem) 
                    setSearchHistory(JSON.stringify(newSearchHisArr))
                    this.searchHisArr = newSearchHisArr 
                }

                this.queryArtList({
                    page:1,
                    title:this.searchValue,
                    articleType:1
                })
                this.queryVideoList({
                    page:1,
                    title:this.searchValue,
                    articleType:2
                })
                
            }
        },
        //查看文章详情
        goDetailed(item){
            // localStorage.setItem('ZSTab',this.activeTab)
            this.$router.push({
                path:`video/${item.id}`
            })
        },
        //分页
        onChange(page){
             this.queryArtList({page:page,title:this.searchValue})
        },

        onChangeVideo(page){
            this.queryVideoList({page:page,title:this.searchValue})
        },
         changeTab(params){
            this.checkKey = params.value
            this.tabType.forEach((item)=>{
                if(item.value == params.value){
                    item.checked = true
                    // this.activeTab = item.artType
                    // this.getArtFn({pageNo:1,artType:item.artType})
                }else{
                    item.checked = false
                }
            })
        },
        //搜索函数
        onSearch(){

        }
    },
    mounted() {
        let searchHisObj = getSearchHistory()
        if(searchHisObj){
            this.searchHisArr =  JSON.parse(getSearchHistory())
        }
        this.getVisit()
        
       
    },
}
</script>

<style lang="less" scoped>
.knowledeg_wrap{
    max-width: 1600px;
    min-width: 1400px;
    margin: 30px auto 0;
    background-color: #F5F5F5;
    padding-bottom:20px;
    padding-top: 20px;
    .table_list{
        width: 80%;
        margin-left: 10%;
        margin-top: 20px;
        padding: 23px 30px;
        background-color: #fff;
        z-index:999;
        .search_box{
            width: 100%;
            height: 50px;
        }
        .search_history{
            width: 100%;
            // height: 45px;
            color: #666;
            font-size:14px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;  // 控制多行的行数
            -webkit-box-orient: vertical;
            .search_item{
                margin:0 10px;
                cursor:pointer;
            }
        }
        .search_tab{
            display:flex;
            width:100%;
            height:40px;
            margin-top:40px;
            border-bottom:1px solid #EAEAEA;
            margin-bottom:20px;
            div{
                display: flex;
                align-items: center;
                justify-content: center;
                width:160px;
                height:100%;
                line-height:40px;
                font-size:18px;
                cursor:pointer;
                color:#333;
                text-align:center;
            }
            .checked{
                color:#0067B7;
                border-bottom:3px solid #0067B7;
            }
            
        }
        .search_list_wrap{
            width:100%;
            .no_info{
                display:flex;
                height:100px;
                width:100%;
                font-size:20px;
                justify-content:center;
                line-height:100px;
            }
            .art_item{
                width:100%;
                padding:10px 0;
                border-bottom:1px solid #EAEAEA;
                cursor:pointer;
                .search_item_title{
                    height:30px;
                    width:100%;
                    font-size: 20px;
                    font-family: Microsoft YaHei;
                    font-weight: bold;
                    color: #000000;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    
                }
                .search_item_content{
                    margin-top:10px;
                    font-size: 16px;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: #666666;
                    line-height: 30px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;  // 控制多行的行数
                    -webkit-box-orient: vertical;
                     word-break:break-all;
                }
                .red{
                        color:red;
                        font-weight:bold;
                }
                .search_item_bottom{
                    margin-top:10px;
                    font-size: 16px;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: #333333;
                    line-height: 30px;
                }
            } 
            .video_wrap{
                display: flex;
                flex-wrap: wrap;
                width: 100%;
                margin-top: 20px;
                padding: 10px 0 30px 0;
                background-color: #fff;
                border-bottom: 1px solid #eaeaea;
                .video_item{
                    width:22%;
                    min-height:210px;
                    margin:15px 16px 0 18px;
                    cursor: pointer;
                    img{
                        display:inline-block;
                        width:268px;
                        height:160px;
                    }
                    span{
                        display: block;
                    }
                    .video_title{
                        font-size: 16px;
                        font-family: Microsoft YaHei;
                        font-weight: 400;
                        color: #333333;
                        margin-top: 3px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    .video_desc{
                        font-size: 14px;
                        font-family: Microsoft YaHei;
                        font-weight: 400;
                        color: #999999;
                        margin-top:5px;
                    }
                }

            }
            

        }

        .page_wrap{
                    height: 50px;
                    line-height: 30px;
                    margin-left: 10%;
                    background-color:#fff;
                    margin-top:20px;
                    .list_page{
                        display:flex;
                        flex-direction:row-reverse;
                        .total{
                          margin-right:30px;
                        }
                        width: 100%;
                        height:30px;
                    }          
                }
    }
    .ant-radio-wrapper{
        margin-left: 40px !important;
        
    }
    .mt_10{
        margin-top: 20px;
    }
    .btn_style{
        color:#fff;
        margin-right:-12px;
        width: 100px;
        height: 40px;
    }
    
}
</style>


