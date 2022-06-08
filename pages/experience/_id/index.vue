<template>
    <div class="knowledeg_wrap">
       <div class="knowledge_bgc">
           <img src="~/assets/banner/actionbgc.png" alt="">
           <div class="tabbar">
            <div class="to_home">
                <img src="~/assets/banner/home.png" alt="">
                <nuxt-link :to="{name:'index'}">首页 </nuxt-link> &nbsp;
                <nuxt-link :to="{name:'knowledge'}">> 投保专区 </nuxt-link> &nbsp;
                <span style="color:#1976BE"> > 文章标题呀</span>
            </div>
           </div>
       </div>

       <div class="article_wrap">
           <span class="article_title"></span>
           <div class="second_title">
               <span>发布于： 2021年1月19日  18:27:00   </span>
               <span style="margin-left:20px">阅读量： {{articleObj.accessStatistics}}</span>
               <span style="margin-left:20px">来源： {{articleObj.author ? articleObj.author : '申银万国期货'}}</span>
           </div>
           <div class="line"></div>
           <div class="content">
               文章的内容
           </div>
           <div class="line"></div>

           <div class="article_bottom">
               <div>上一篇：<span>上一篇文章的标题</span></div>
               <div>下一篇：<span>下一篇文章的标题</span></div>
           </div>
       </div>
       
    </div>
</template>

<script>
export default {
    data(){
        return{
            total:0,
            tabNav:[
                {
                    label:"新手入门",
                    value:1,
                    checked:true
                },
                {
                    label:"品种介绍",
                    value:2,
                    checked:false
                },
                {
                    label:"法律法规",
                    value:3,
                    checked:false
                },
            ],
            tableList:[
                {
                    title:"这是一篇很正经的文章标题",
                    date:"2021-12-23",
                    id:"1"
                },
                {
                    title:"这是一篇很有意思的文章",
                    date:"2021-12-23",
                    id:"2"
                },
                {
                    title:"这是一篇很有好玩的文章",
                    date:"2021-12-23",
                    id:"3"
                }
            ]
        }
    },
      head(){ 
      return {
         title:'模拟体验'
      }
   },

     head() {
        return {
             title:this.articleObj.title
        };
    },

    methods:{
        changeTab(params){
            this.tabNav.forEach((item)=>{
                if(item.value == params.value){
                    item.checked = true
                }else{
                    item.checked = false
                }
            })
        },
        onChange(page){
            console.log(page);
        },
    }
    
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
    margin: 30px auto;
    padding-bottom:20px;
    background-color:#f5f5f5;
    .knowledge_bgc{
        height: 380px;
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
        padding: 40px;
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
                margin-bottom:20px;
            }
        }
        .line{
            margin-top: 30px;
            width: 100%;
            height: 1px;
            border: 1px solid #eaeaea;
        }
        .content{
            margin-top: 20px;
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


