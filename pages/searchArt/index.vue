<template>
    <div class="knowledeg_wrap">
       <div class="knowledge_bgc">
           <div class="tabbar">
            <div class="to_home">
                <img src="~/assets/banner/home.png" alt="">
                <nuxt-link :to="{name:'index'}">首页 </nuxt-link> &nbsp;
                <nuxt-link :to="{name:'search'}">> 文件搜索 </nuxt-link> &nbsp;
                <span style="color:#1976BE"> > {{articleObj.title}}</span>
            </div>
           </div>
       </div>

       <div class="article_wrap">
           <span class="article_title">{{articleObj.title}}</span>
           <div class="second_title">
               <span>发布于： {{articleObj.publishTime}}</span>
               <span style="margin-left:20px">阅读量： {{articleObj.accessStatistics}}</span>
               <span style="margin-left:20px">来源： {{articleObj.author ? articleObj.author : '申银万国期货'}}</span>
           </div>
           <div class="line"></div>
           <div class="fwb_content" v-html= articleObj.content>
           </div>
           <div class="file_list" v-if="articleObj.attachments && articleObj.attachments.length > 0">
                <span>附件列表</span>
                <li v-for="(item,index) in articleObj.attachments" :key="index" @click="dowbLoadFile(item)">{{item.attachmentName}}</li>
               
            </div>
           <div class="line"></div>
       </div>
       
    </div>
</template>

<script>
import { getArticleInfo,getArticleList } from '@/api/api.js'
export default {
    data(){
        return{
            articleObj:{},
            allArtList:[], // 所有文章列表
            currentIndex:0,
            nextItem:{},
            previousItem:{},
            showNextFlag:true

        }
    },

    methods:{



        //文件下载
        dowbLoadFile(item){
            window.open(item.attachmentPath)
        },
        //获取文章详情的函数
        getArtDetFn(params){
            getArticleInfo({id:params}).then(res=>{
                if(res.data.code == 0){
                   this.articleObj = res.data.result
                }
            })
        },
    },

    mounted() {
         let paramsId = this.$route.params.id
         this.getArtDetFn(paramsId)
    },
    
}
</script>
<style lang="less">
    .fwb_content{
       word-break:break-all;
    }
</style>

<style lang="less" scoped>
.knowledeg_wrap{
    max-width: 1600px;
    min-width: 1400px;
    margin: 30px auto 0;
    
    background-color:#f5f5f5;
    padding-bottom:20px;
    .knowledge_bgc{
        height: 380px;
        background-color:#fff;
        img{
            width: 100%;
            height: 320px;
        }
        .tabbar{
            width: 80%;
            margin-left: 10%;
            height: 60px;
            .to_home{
                    display: flex;
                    height: 20px;
                    margin:20px auto;
                    background-color:#fff;
                    img{
                        margin-top: 2px;
                        width: 15px;
                        height: 15px;
                        line-height: 15px;
                        margin-right: 10px;
                    
                    }
                    a{
                        color: #333333;
                        font-size: 12px;
                        line-height: 20px;
                    }
                    a:hover{
                        color: #333333;
                        font-size: 12px;
                        line-height: 20px;
                    }
                    span{
                        font-size: 12px;
                        color: #333333;
                        line-height: 20px;
                    }
                
                }
        }
    }
    .article_wrap{
        width: 80%;
        margin-left: 10%;
        padding: 40px;
        margin-top:20px;
        background-color:#fff;
        .article_title{
            width: 100%;
            font-size: 24px;
            font-family: Microsoft YaHei;
            font-weight: bold;
            color: #000000;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .second_title{
            display: flex;
            margin-top: 20px;
            span{
                font-size: 12px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #555555;
            }
        }
        .line{
            margin-top: 30px;
            width: 100%;
            height: 1px;
            border: 1px solid #eaeaea;
            margin-bottom:20px;
        }
        .content{
            margin-top: 20px;
        }
         .file_list{
                margin-top: 20px;
                span{
                   font-size: 18px;
                   font-weight: bold;
                }
                li{
                    height: 30px;
                    font-size: 14px;
                    line-height: 30px;
                    cursor: pointer;
                    padding-left: 20px;
                }
                li:hover{
                    color: #21A2F1;
                }
            }
        .article_bottom{
            width: 100%;
            height: 40px;
            margin-top: 20px;
            div{
                font-size: 14px;
                color: #333;
                height: 30px;
                line-height: 30px;
                span{
                    cursor: pointer;
                    color:#1976BE;
                    font-size:14px;
                    margin-left: 10px;
                }
            }
        }
    }
}
</style>


