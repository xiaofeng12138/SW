<template>
    <div class="knowledeg_wrap">
       <div class="knowledge_bgc">
           <img src="~/assets/banner/videotabbgc.png" alt="">
           <div class="tabbar">
               <li v-for="(item,index) in tabNav" :key="index" @click="changeTab(item)">
                   <span :class="{'checked':( index  == checkTabItem )}" >{{item.label}}</span>
               </li>
           </div>
       </div>
        <template v-if="videoList && videoList.length > 0">
            <div class="table_list">
                    <li v-for="(item,index) in videoList" :key="index" @click="goDetailed(item)">
                        <img :src="item.bigPicurl" alt="">
                        <span class="video_title" :title="item.title">{{item.title}}</span>
                        <span class="video_desc">{{item.publishTime ? item.publishTime.split(" ")[0] : ""}}</span>
                    </li>
                    <div class="page_wrap">
                        <div class="list_page"> 
                            <div class="total">共 {{ total }} 条</div>
                            <a-config-provider :locale="locale" >
                                <a-pagination show-quick-jumper   :total="total" @change="onChange" />
                            </a-config-provider>
                            
                         </div>
                    </div>
                    
            </div>
          
        </template>
        <template v-else>
            <div class="table_list">
                <div class="no_info">暂无数据</div>
            </div>
       </template>
    </div>
</template>

<script>
import env from '@/env.js'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import {setMeunTab,getMeunTab,setTabItem,getTabItem} from '@/utils/cookie.js'
import {getArticleList} from '@/api/api.js'
export default {
    data(){
        return{
            total:0,
            locale: zhCN,
            tabNav:[
                {
                    label:"期货讲堂",
                    value:1,
                    checked:true,
                    artType:"futuresLectureHall"
                },
                {
                    label:"期权讲堂",
                    value:2,
                    checked:false,
                    artType:"optionsLectureHall"
                },
                {
                    label:"投教讲堂",
                    value:3,
                    checked:false,
                    artType:"teachingHall"
                },
            ],
            videoList:[],
            activeTab:"",  //当前选中的tab
            checkTabItem:getTabItem() ? getTabItem():0,  //当前选中的tab
        }
    },

    methods:{

        getVisit(params) {

            console.log(111,params);
            
            let _paq = (window._paq = window._paq || []);
            // /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
            _paq.push(["setCustomUrl",`video/${params.id}`]);
            _paq.push(["trackPageView", params.title]);
            _paq.push(["enableLinkTracking"]);
            (function() {
                let u = env[process.env.NODE_ENV].BASE_URL_MTO;
                _paq.push(["setTrackerUrl", u + "matomo.php"]);
                _paq.push(["setSiteId", "1"]);
                let d = document,
                    g = d.createElement("script"),
                    s = d.getElementsByTagName("script")[0];
                g.async = false;
                g.src = u + "matomo.js";
                s.parentNode.insertBefore(g, s);
            })();
        },

         //获取文章列表的函数
        getArtFn(params){
          let requestData ={
              pageNo:params.pageNo,
              pageSize:12,
              channelCode:"pc_service",
              columnCode:params.artType,
              articleType:2
          }
          getArticleList(requestData).then(res=>{
              let respData = res.data.result
              if(respData){
                  this.total = respData.total
                 this.videoList = respData.records
              } 
          })
        },

         changeTab(params){
            this.total = 0
            this.videoList = []
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
                path:`video/${item.id}`
            })
        }
    },
    head(){ 
      return {
         title:'视频讲堂'
      }
   },

     mounted(){
        let paramsId = this.$route.params.tabId
        if(paramsId){
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
            if(checkItemTab){
                 this.getArtFn({pageNo:1,artType:this.tabNav[checkItemTab].artType})
                 this.activeTab = this.tabNav[checkItemTab].artType
            }else{
                this.getArtFn({pageNo:1,artType:"antiNonPublicity"})
                this.activeTab = 'antiNonPublicity'
            }
        }
        
        this.getVisit({title:'视频讲堂',id:''});
    },
    watch:{
         "$store.state.MenuTab":{
                handler(nv,ov){
                    console.log(nv);
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
    }
    
}
</script>

<style lang="less" scoped>
.knowledeg_wrap{
    width:100%;
    min-width: 1400px;
    margin: 30px auto 0;
    background-color: #f5f5f5;
    padding-bottom: 20px;
    .knowledge_bgc{
        height: 380px;
        background-color: #fff;
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
        display: flex;
        flex-wrap: wrap;
        width: 80%;
        margin-left: 10%;
        margin-top: 20px;
        padding: 35px;
        background-color: #fff;
        border-bottom: 1px solid #eaeaea;
        li{
            width:22%;
            min-height:210px;
            margin:15px 16px 0 18px;
            cursor: pointer;
            img{
                display:inline-block;
                width:268px;
                height:160px;
                image-rendering: -moz-crisp-edges;
                image-rendering: -o-crisp-edges;
                image-rendering: -webkit-optimize-contrast;
                image-rendering: crisp-edges;
                -ms-interpolation-mode: nearest-neighbor;
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
            }
        }
        .no_info{
            display:flex;
            width:100%;
            font-size:20px;
             justify-content:center;
             line-height:20px;
             cursor:normal;
        }
        .clear{
            clear: both;
        }
       
    }
     .page_wrap{
                    height: 50px;
                    line-height: 30px;
                    background-color:#fff;
                    margin-top:30px;
                    width: 100%;
                    .list_page{
                        width: 100%;
                        display:flex;
                        justify-content: flex-end;
                        .total{
                          margin-right:30px;
                        }
                        width: 100%;
                        height:30px;
                    }          
                }
}
</style>


