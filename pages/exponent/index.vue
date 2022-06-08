<template>
    <div class="knowledeg_wrap">
       <div class="knowledge_bgc">
           <img src="~/assets/banner/spzsbgc.png" alt="">
           <div class="tabbar">
               <li v-for="(item,index) in tabNav" :key="index" @click="changeTab(item)">
                   <span :class="{'checked':( index  == checkTabItem )}" >{{item.label}}</span>
               </li>
           </div>
       </div>
       <div class="table_list" v-if="tabValue == 1">
           <template >
               <iframe :src="iframeUrl" frameborder="0" style="width:100%;height:500px"></iframe>
           </template>
        </div>
            <template v-else>
                 <template v-if="tableList && tableList.length> 0">
            <div class="table_list">
                <li v-for="(item,index) in tableList" :key="index" @click="goDetailed(item)">
                    <span class="table_point"></span>
                    <span class="table_title">{{item.title}}</span>
                    <span class="table_date">{{item.publishTime ? item.publishTime.split(" ")[0] : ""}}</span>
                </li>
            </div>
            <div class="page_wrap">
                            <div class="list_page"> 
                                <a-config-provider :locale="locale" >
                                    <a-pagination show-quick-jumper   :total="total" @change="onChange" />
                                </a-config-provider>
                            <div class="total">共 {{ total }} 条</div>
            </div>
              </div>
       </template>
       <template v-else>
            <div class="table_list">
                <li class="no_info">暂无数据</li>
            </div>
       </template>
            </template>
        
    </div>
</template>

<script>
import env from '@/env.js'
import {getArticleList} from '@/api/api.js'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import {setMeunTab,getMeunTab,setTabItem,getTabItem} from '@/utils/cookie.js'
export default {
    data(){
        return{
            iframeUrl:env[process.env.NODE_ENV].BASE_URL_IFRAME,
            total:"",
            tabValue:"1",
            total:0,
            locale: zhCN,
            tabNav:[
                {
                    label:"商品指数",
                    value:1,
                    checked:true,
                    artType:""
                },
                {
                    label:"申万指数",
                    value:2,
                    checked:false,
                    artType:"shenwanIndex"
                },
            ],
              tableList:[],
              activeTab:"",  //当前选中的tab
              checkTabItem:getTabItem() ? getTabItem():0,  //当前选中的tab
        }
    },
    head(){ 
      return {
         title:'商品指数'
      }
   },


    methods:{

        //访问记录
        getVisit(params) {
            let _paq = (window._paq = window._paq || []);
            // /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
             _paq.push(["setCustomUrl",`exponent/${params.id}`]);
             _paq.push(["trackPageView", params.title]);
           
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
        //获取文章列表的函数
        getArtFn(params){
          let requestData ={
              pageNo:params.pageNo,
              pageSize:10,
              channelCode:"pc_service",
              columnCode:params.artType
          }
          getArticleList(requestData).then(res=>{
              let respData = res.data.result
              if(respData){
                  this.total = respData.total
                  this.tableList = respData.records
              }else{
                  this.total = 0
                  this.tableList = []
              }
          })
        },
        changeTab(params){
            this.total = 0
            this.tableList = []
            this.tabValue = params.value
            this.tabNav.forEach((item,index)=>{
                if(item.value == params.value){
                    item.checked = true
                    this.activeTab = item.artType
                    this.getArtFn({pageNo:1,artType:item.artType})
                    setTabItem(index)
                    this.checkTabItem = index
                }else{
                    item.checked = false
                }
            })
        },

       //分页
        onChange(page){
             this.getArtFn({pageNo:page,artType:this.activeTab})
        },

        //查看文章详情
        goDetailed(item){
            this.getVisit({title:item.title,id:item.id})
            localStorage.setItem('ZSTab',this.activeTab)
            this.$router.push({
                path:`exponent/${item.id}`
            })
        },
    },
     mounted(){
            let paramsId = this.$route.params.tabId
            console.log(11,paramsId);
            
            if(paramsId){
                this.tabValue = paramsId
                this.tabNav.forEach((item)=>{
                    if(item.value == paramsId){
                        item.checked = true
                        this.getArtFn({pageNo:1,artType:item.artType})
                        this.activeTab = item.artType
                    }else{
                        item.checked = false
                    }
                })
            }else{
                 let checkItemTab = getTabItem()
                 if(checkItemTab == 1){
                     this.tabValue = 2
                 }
                if(checkItemTab){
                    this.getArtFn({pageNo:1,artType:this.tabNav[checkItemTab].artType})
                    this.activeTab = this.tabNav[checkItemTab].artType
                }
            }

             this.getVisit({title:'商品指数',id:''});
        },

     watch:{
         "$store.state.MenuTab":{
                handler(nv,ov){
                        this.tabValue = nv
                        this.tabNav.forEach((item,index)=>{
                            if(item.value == nv){
                            item.checked = true
                            this.getArtFn({pageNo:1,artType:item.artType})
                            this.activeTab = item.artType
                            this.checkTabItem = index
                            }else{
                               item.checked = false
                        }
                    })
                },
             deep:true
         }
    },
    
}
</script>

<style lang="less" scoped>
.knowledeg_wrap{
    width:100%;
    min-width: 1400px;
    margin: 30px auto 0;
    padding-bottom:20px;
    background-color:#f5f5f5;
    .knowledge_bgc{
    background-color: #fff;
        height: 380px;
        img{
            width: 100%;
            height: 320px;
        }
        .tabbar{
            display: flex;
            width: 80%;
            margin-left: 10%;
            height: 60px;
            li{
                flex: 1;
                text-align: center;
                span{
                    display: inline-block;
                    width: 100px;
                    height: 40px;
                    margin-top: 20px;
                    font-size: 18px;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: #333333;
                    cursor: pointer;
                }
                .checked{
                    font-weight: bold;
                    border-bottom: 3px solid #0067B7;
                }
            }
        }
    }
     .table_list{
        width: 80%;
        margin-left: 10%;
        margin-top: 20px;
        padding: 20px;
        background-color:#fff;
        li{
            display: flex;
            width: 100%;
            height: 50px;
            background-color: #fff;
            cursor: pointer;
            .table_point{
                display:block;
                width: 5px;
                height: 5px;
                background-color: #333;
                margin-top: 22px;
                margin-left: 20px;
            }
            .table_title{
                display: block;
                line-height: 50px;
                font-size: 14px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #333333;
                width: 86%;
                margin-left: 20px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .table_date{
                width: 100px;
                line-height: 50px;
                font-size: 14px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #666666;
                text-align: right;
            }
        }
        .no_info{
            display:flex;
            height:100px;
            width:100%;
            font-size:20px;
             justify-content:center;
             line-height:100px;
             cursor:normal;
        }
        li:hover{
            span{
                color: #0067B7;
            }
        }
        li:nth-child(odd){
            background-color: #f5f5f5;
        }
        li:nth-child(even){
            background-color: #fff;
        }
    }
    .page_wrap{
        height: 50px;
        width: 80%;
        line-height: 30px;
        margin-left: 10%;
        background-color:#fff;
        .list_page{
            display:flex;
            flex-direction:row-reverse;
            padding-right:20px;
            .total{
              margin-right:30px;
            }
            width: 100%;
            height:30px;
            ul{
                float:right;
              }
        }          
    }
    .ant-radio-wrapper{
        margin-left: 40px !important;
    }
    .mt_10{
        margin-top: 20px;
    }
    
}
</style>


