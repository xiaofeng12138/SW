<template>
    <div class="knowledeg_wrap">
       <div class="knowledge_bgc">
           <img src="~/assets/banner/videotabbgc.png" alt="">
           <div class="tabbar">
            <!-- <div class="to_home">
                <img src="~/assets/banner/home.png" alt="">
                <nuxt-link :to="{name:'index'}">首页 </nuxt-link> &nbsp;
                <nuxt-link :to="{name:'video'}">> 视频讲堂 </nuxt-link> &nbsp;
                <span style="color:#1976BE"> > {{articleObj.title}}</span>
            </div> -->
             <div class="to_home">
                <img src="~/assets/banner/home.png" alt="">
                <nuxt-link :to="{name:'index'}">首页 </nuxt-link> &nbsp;
                <nuxt-link :to="{name:'video'}">> 视频讲堂 </nuxt-link> &nbsp;
                <span style="color:#1976BE"> > {{articleObj.title}}</span>
            </div>
           </div>
       </div>

       <div class="article_wrap">
           <span class="article_title">{{articleObj.title}}</span>
           <div class="second_title">
               <span>发布于： {{articleObj.publishTime}}</span>
               <span style="margin-left:20px">阅读量： {{articleObj.accessStatistics}}</span>
               <span style="margin-left:20px">来源： {{articleObj.author ? articleObj.author : ''}}</span>
           </div>
           <div class="line" style="margin-bottom:10px;"></div>
           <div v-html= articleObj.content style="word-break:break-all"></div>
           <div class="video_view">
              <div id="video_item" ref="video_wrap_box" ></div>
            </div>
           <div class="file_list" v-if="articleObj.attachments && articleObj.attachments.length > 0">
                <span>附件列表</span>
                <li v-for="(item,index) in articleObj.attachments" :key="index" @click="dowbLoadFile(item)">{{item.attachmentName}}</li>
            </div>
           <div class="line"></div>
           <div class="article_bottom">
               <div v-if="currentIndex != 0">上一篇：<span @click="previousFn(previousItem)">{{previousItem.title}}</span></div>
               <div v-if="showNextFlag">下一篇：<span @click="nextFn(nextItem)">{{nextItem.title}}</span></div>
           </div>
       </div>
       
    </div>
</template>

<script>
import env from '@/env.js'
import Axios from 'axios'
import { getArticleInfo,getArticleList } from '@/api/api.js'
export default {
    data(){
        return{
            playerJs: 'https://player.polyv.net/script/player.js',  //保利威视的js
            articleObj:{},
            allArtList:[], // 所有文章列表
            currentIndex:0,
            nextItem:{},
            previousItem:{},
            showNextFlag:true,
            videoSrc:"",
            video_vid:""

        }
    },
    head() {
        return {
             title:this.articleObj.title
        };
    },

    methods:{
         loadPlayerScript(callback) {
                if (!window.polyvPlayer) {
                    const myScript = document.createElement('script');
                    myScript.setAttribute('src', this.playerJs);
                    // myScript.onload = callback;
                    document.body.appendChild(myScript);
                } else {
                    callback && callback();
                }
        },
     //获取视频地址
        loadPlayer(params) {
            const polyvPlayer = window.polyvPlayer;
            this.player = polyvPlayer({
                wrap: '#video_item',
                width: 800,
                height: 420,
                autoplay:false, //是否自动播放
                vid:this.video_vid,
                ts:params.ts,
                sign:params.sign,
                token:params.token
            });
        },
           //获取视频的Token
        getVideoToken(params){
            Axios.get(`${env[process.env.NODE_ENV].BASE_URL_TOKEN}/polyv/getToken?vid=${params}`).then(res=>{
            if(res.data.code == '0000'){
                let respData = res.data.data
                this.loadPlayer(respData)
            }
          })
        },
        //获取所有文章列表
         getAllArtList(params){
             let requestData ={
                pageNo:1,
                pageSize:100,
                channelCode:"pc_service",
                columnCode:params.artType,
                articleType:2
             }
             getArticleList(requestData).then(res=>{
                let respData = res.data.result.records
                this.allArtList = respData
                respData.forEach((ele,index)=>{
                     if(ele.id ==params.artId){
                         this.currentIndex = index
                         if(this.currentIndex == (respData.length - 1) ){
                            this.showNextFlag = false
                            this.previousItem = respData[ index - 1]
                            this.nextItem = respData[index]
                         }else if(index == 0){
                            this.showNextFlag = true
                            this.previousItem = {title:""}
                            this.nextItem = respData[ index +1]
                         }else{
                            this.showNextFlag = true
                            this.previousItem = respData[ index - 1]
                            this.nextItem = respData[ index + 1]
                         }
                     }
                })
             })
         },

        //上一篇函数
        previousFn(item){
            this.$refs.video_wrap_box.innerHTML  = ""
            let index = this.currentIndex - 1
            this.currentIndex = this.currentIndex - 1
            if(index == 0){
              this.showNextFlag = true
              this.previousItem = {title:""}
              this.nextItem = this.allArtList[ index + 1]
            }else{
                this.showNextFlag = true
                this.previousItem = this.allArtList[index - 1]
                this.nextItem = this.allArtList[index + 1]
            }

           this.getArtDetFn(item.id)
        },

        //下一篇
        nextFn(item){
            
           this.$refs.video_wrap_box.innerHTML  = ""
           let index = this.currentIndex 
           this.currentIndex = this.currentIndex + 1
           if(this.currentIndex > this.allArtList.length - 1){
              this.currentIndex = this.allArtList.length - 1
           }
          
                this.showNextFlag = true
                this.previousItem = this.allArtList[index]

                if(index >= this.allArtList.length - 2){
                  this.nextItem = this.allArtList[ index + 1]
                  this.showNextFlag = false
                }else{
                   this.nextItem = this.allArtList[ index + 2]
                }

           this.getArtDetFn(item.id)
        },

        //初始化处理上一篇下一篇函数
        

        //文件下载
        dowbLoadFile(item){
            window.open(item.attachmentPath)
        },
        //获取文章详情的函数
        getArtDetFn(params){
            getArticleInfo({id:params}).then(res=>{
                if(res.data.code == 0){
                   this.articleObj = res.data.result
                   this.video_vid = res.data.result.sourceUrl
                   this.getVideoToken(res.data.result.sourceUrl)
                }
            })
        },
    },

    mounted() {
                let paramsId = this.$route.params.id
                this.getArtDetFn(paramsId)
                this.getAllArtList({artType:localStorage.getItem('ZSTab'),artId:paramsId})
                this.loadPlayerScript()
              
        
    },
    
}
</script>

<style lang="less" scoped>
.knowledeg_wrap{
    width:100%;
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
        padding: 40px 40px 0 40px;
        background-color:#fff;
        margin-top:20px;
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
        }
        .video_view{
            display:flex;
            justify-content:center;
            margin-top: 20px;
            text-align: center;

            #video_item{
                width:800px;
                height:420px;
                overflow:hidden;

            }
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
            height: 100px;
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


