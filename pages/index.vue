<template>
  <div>
    <!-- <Head /> -->
    <div class="main_wrap">
     <Swiper></Swiper>
     <div class="type_nav">
        <div class="type_box">
          <li @mouseenter="xsFlag = true" @mouseleave="xsFlag = false" @click="jumpFn({name:'knowledge',tab:1,checkItemValue:0})">
              <img v-if="xsFlag" src="../assets/banner/xs1.png" alt="">
              <img v-else src="../assets/banner/xs.png" alt="">
              <span class="type_title">新手入门</span>
              <span class="type_desc">期货初学者必看</span>
          </li>
          <li @mouseenter="pzFlag = true" @mouseleave="pzFlag = false" @click="jumpFn({name:'knowledge',tab:2,checkItemValue:1})">
                <img v-if="pzFlag" src="../assets/banner/pz1.png" alt="">
                <img v-else src="../assets/banner/pz.png" alt="">
                <span class="type_title">品种介绍</span>
                <span class="type_desc">期货品种知多少</span>
          </li>
         <li @mouseenter="qqFlag = true" @mouseleave="qqFlag = false" @click="jumpFn({name:'optionSchool',tab:1,checkItemValue:0})">
              <img v-if="qqFlag" src="../assets/banner/qq1.png" alt="">
              <img v-else src="../assets/banner/qq.png" alt="">
              <span class="type_title">期权知识</span>
              <span class="type_desc">学点期权很有必要</span>
          </li>
         <li @mouseenter="mrFlag = true" @mouseleave="mrFlag = false" @click="jumpFn({name:'optionSchool',tab:3,checkItemValue:2})">
              <img v-if="mrFlag" src="../assets/banner/mr1.png" alt="">
              <img v-else src="../assets/banner/mr.png" alt="">
              <span class="type_title">每日期权</span>
              <span class="type_desc">场内期权市场日报</span>
          </li>
        </div>
     </div>

     <div class="video_wrap">
         <div class="video_box">
           <div class="video_header">
              <span class="video_header_title">视频讲堂</span>
              <span class="video_header_desc">优质、免费视频资源，点燃投资者学习热情</span>
           </div>
           <div class="video_mid">
              <div class="video_left">
                <div class="video_view" id="video_wrap_box" ref="video_wrap_box">
                </div>
                <div class="video_title"> {{showLeftTitle}}</div>
              </div>
              <div class="video_right">
                <div class="tabList">
                  <li v-for="(params,index) in videoNav" :class= " params.checked ? 'current' : ''" :key="index" @click="getArtFn(params)">{{params.label}}</li>
                </div>
                <div class="video_list" v-if="videoList && videoList.length > 0">
                   <li v-for="(item,index) in videoList">
                      <div class="video_img">
                         <img :src="item.bigPicurl" alt="">
                      </div>
                      <div class="video_content">
                        <span class="video_con_title" :title="item.title">{{item.title}}</span>
                        <span class="video_con_time">{{item.publishTime ? item.publishTime.split(" ")[0] : ""}}</span>
                      </div>
                      <div class="video_play" @click="playVideo(item)">
                         <img src="../assets/banner/play.png" alt="">
                      </div>
                   </li>
                </div>
                 <div class="video_list" v-else style="text-align:center;line-height:100px;font-size:20px">
                    暂无数据
                </div>
                <div class="video_more" v-if="videoList && videoList.length > 0">
                   <div class="more_btn" @click="goMore">查看更多</div>
                </div>
              </div>

           </div>
          

         </div>
     </div>

     <div class="demo_wrap">
       <div class="demo_box">
          <div class="demo_header">
              <span class="demo_header_title">投保专区</span>
              <span class="demo_header_desc">识别投资风险，争做理性投资人</span>
          </div>
         <div class="demo_box_item">
           <li v-for="(item,index) in demoListTop" :key="index" @click="jumpFn({name:'action',tab:item.value,checkItemValue:(item.value - 1)})">
             <img :src="item.imgSrc" alt="">
             <div class="box_bot">
               <span class="demo_box_title" >{{item.title}}</span>
               <span class="demo_box_desc">{{item.desc}}</span>
             </div>
           </li>
         </div>
         <div class="demo_box_item">
            <li v-for="(item,index) in demoListBot" :key="index"  @click="jumpFn({name:'action',tab:item.value,checkItemValue:(item.value - 1)})">
             <img :src="item.imgSrc" alt="">
             <div class="box_bot">
               <span class="demo_box_title">{{item.title}}</span>
               <span class="demo_box_desc">{{item.desc}}</span>
             </div>
           </li>
         </div>
       </div>
     </div>

     <!-- 指数部分 -->

     <div class="exponent_wrap">
       <div class="exponent_header">
              <span class="exponent_header_title">申万商品指数</span>
              <span class="exponent_header_desc">反映商品走势，为投资者提供信息指引</span>
          </div>
       <div class="exponent_box">
         <li @click="jumpFn({name:'exponent',tab:1,checkItemValue:0})">
             <span class="exponent_title">商品指数</span>
             <span class="exponent_num" v-if="spNum.last_price - spNum.pre_close >= 0 ">{{spNum.last_price}}</span>
             <span class="exponent_num color_green" v-else>{{spNum.last_price}}</span>
             <div class="exponent_bot">
               <span class="exponent_bot_left" v-if="spNum.last_price - spNum.pre_close >= 0 ">{{(spNum.last_price - spNum.pre_close).toFixed(2)}}</span>
               <span class="exponent_bot_left color_green" v-else >{{(spNum.last_price - spNum.pre_close).toFixed(2)}}</span>
               <span class="exponent_bot_right" v-if="spNum.last_price - spNum.pre_close >= 0 ">{{((spNum.last_price - spNum.pre_close) / spNum.pre_close *100 ).toFixed(2)+'%'}}</span>
               <span class="exponent_bot_right color_green " v-else >{{((spNum.last_price - spNum.pre_close) / spNum.pre_close *100 ).toFixed(2)+'%'}}</span>
              </div>
         </li>
          <li @click="jumpFn({name:'exponent',tab:1,checkItemValue:0})">
             <span class="exponent_title">黑色指数</span>
             <span class="exponent_num" v-if="blackNum.last_price - blackNum.pre_close >= 0">{{blackNum.last_price}}</span>
             <span class="exponent_num color_green" v-else >{{blackNum.last_price}}</span>
             <div class="exponent_bot">
               <span class="exponent_bot_left" v-if="blackNum.last_price - blackNum.pre_close >= 0">{{(blackNum.last_price - blackNum.pre_close).toFixed(2)}}</span>
               <span class="exponent_bot_left color_green" v-else >{{(blackNum.last_price - blackNum.pre_close).toFixed(2)}}</span>

               <span class="exponent_bot_right" v-if="blackNum.last_price - blackNum.pre_close >= 0">{{((blackNum.last_price - blackNum.pre_close) / blackNum.pre_close *100 ).toFixed(2)+'%'}}</span>
               <span class="exponent_bot_right color_green" v-else>{{((blackNum.last_price - blackNum.pre_close) / blackNum.pre_close *100 ).toFixed(2)+'%'}}</span>
              
             </div>
         </li>
         <li @click="jumpFn({name:'exponent',tab:1,checkItemValue:0})">
             <span class="exponent_title">农产品指数</span>
             <span class="exponent_num"  v-if="ncpNum.last_price - ncpNum.pre_close >= 0">{{ncpNum.last_price}}</span>
             <span class="exponent_num color_green" v-else>{{ncpNum.last_price}}</span>
             <div class="exponent_bot">
              <span class="exponent_bot_left" v-if="ncpNum.last_price - ncpNum.pre_close >= 0">{{(ncpNum.last_price - ncpNum.pre_close).toFixed(2)}}</span>
              <span class="exponent_bot_left color_green" v-else>{{(ncpNum.last_price - ncpNum.pre_close).toFixed(2)}}</span>
              <span class="exponent_bot_right" v-if="ncpNum.last_price - ncpNum.pre_close >= 0">{{((ncpNum.last_price - ncpNum.pre_close) / ncpNum.pre_close *100 ).toFixed(2)+'%'}}</span>
              <span class="exponent_bot_right color_green" v-else >{{((ncpNum.last_price - ncpNum.pre_close) / ncpNum.pre_close *100 ).toFixed(2)+'%'}}</span>
              
             </div>
         </li>
       </div>
     </div>


     <!-- 操作部分 -->
     <div class="operate_wrap">
       <div class="operate_box">
          <li @mouseenter="fxcpFlag = true" @mouseleave="fxcpFlag = false" @click="jumpFn({name:'experience'})" >
             <div class="operate_img_wrap"> 
               <img v-if="fxcpFlag" src="../assets/banner/fxcp1.png" alt="">
               <img v-else src="../assets/banner/fxcp.png" alt="">
             </div>
             <span v-if="fxcpFlag" class="operate_title" style="color:#0067B7">风险测评</span>
             <span v-else class="operate_title">风险测评</span>
          </li>

           <li @mouseenter="mnjyFlag = true" @mouseleave="mnjyFlag = false" @click="MNFn">
             <div class="operate_img_wrap"> 
               <img v-if="mnjyFlag" src="../assets/banner/mnjy1.png" alt="">
               <img v-else src="../assets/banner/mnjy.png" alt="">
             </div>
             <span v-if="mnjyFlag" class="operate_title" style="color:#0067B7">模拟交易</span>
             <span v-else class="operate_title">模拟交易</span>
          </li>

           <li @mouseenter="myddcFlag = true" @mouseleave="myddcFlag = false" @click="jumpFn({name:'online',tab:1})">
             <div class="operate_img_wrap"> 
               <img v-if="myddcFlag" src="../assets/banner/myddc1.png" alt="">
               <img v-else src="../assets/banner/myddc.png" alt="">
             </div>
             <span v-if="myddcFlag" class="operate_title" style="color:#0067B7">满意度调查</span>
             <span v-else class="operate_title">满意度调查</span>
          </li>
           <li @mouseenter="yyjyFlag = true" @mouseleave="yyjyFlag = false" @click="jumpFn({name:'online',tab:2})">
             <div class="operate_img_wrap"> 
               <img v-if="yyjyFlag" src="../assets/banner/yjjy1.png" alt="">
               <img v-else src="../assets/banner/yjjy.png" alt="">
             </div>
             <span v-if="yyjyFlag" class="operate_title" style="color:#0067B7">意见建议</span>
             <span v-else class="operate_title">意见建议</span>
          </li>
          
       </div>
     </div>
  </div>
  </div>
</template>


<script>
import {getArticleList} from '@/api/api.js'
import {GetBannerList} from '@/api/index.js'
import env from '@/env.js'
import Axios from 'axios'
import Swiper from '@/components/swiper/Swiper.vue'
import {setTab,getTab,setTabItem,getTabItem} from '@/utils/cookie.js'
import Head from '@/components/Head'
export default {
  components:{
    Swiper,Head
  },
 
 
  data(){
    return {
        videoTabIndex:0,
        playerJs: 'https://player.polyv.net/script/player.js',  //保利威视的js
        fxcpFlag:false,
        mnjyFlag:false,
        myddcFlag:false,
        yyjyFlag:false,

        //图片切换标识
        xsFlag:false,  
        pzFlag:false,
        qqFlag:false,
        mrFlag:false,
        demoListTop:[
          {
            title:"投教活动",
            desc:"聚焦新鲜、有趣的投教活动",
            imgSrc:require("../assets/banner/tjhd.png"),
            value:6
          },
           {
            title:"防非宣传",
            desc:"知晓风险，理性投资",
            imgSrc:require("../assets/banner/ffxc.png"),
            value:1
          },
          {
            title:"典型案例",
            desc:"经典案例、投资分享、理财故事",
            imgSrc:require("../assets/banner/dxal.png"),
            value:4
          },
        ],
        demoListBot:[
          {
            title:"适当性管理",
            desc:"知晓风险，理性投资",
            imgSrc:require("../assets/banner/sdxgl.png"),
            value:3
          },
          {
            title:"投资者保护",
            desc:"深入了解交易规则",
            imgSrc:require("../assets/banner/tzzbh.png"),
            value:5
          },
          {
            title:"反洗钱",
            desc:"预防和打击洗钱犯罪",
            imgSrc:require("../assets/banner/fxq.png"),
            value:2
          },
        ],

        expoentData:{},
        activeKey:1,
        videoNav:[
          {
            label:"期货讲堂",
            value:'1',
            checked:true,
            artType:"futuresLectureHall"
          },
           {
            label:"期权讲堂",
            value:'2',
            checked:false,
            artType:"optionsLectureHall"
          },
          {
            label:"投教讲堂",
            value:'3',
            checked:false,
            artType:"teachingHall"
          },
        ],
        spNum:{},
        blackNum:{},
        ncpNum:{},
        videoList:[],
        showLeftTitle:"",
        video_vid:""

    }
  },
   head(){ 
      return {
         title:'申银万国期货-投资者教育网站'
      }
   },
  methods:{
     //访问记录
        getVisit() {
          
            let _paq = (window._paq = window._paq || []);
            // /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
            
            _paq.push(["setCustomUrl",'index']);
            _paq.push(["trackPageView", "申银万国期货-投资者教育网站"]);
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
    //获取文章视频列表
    getArtFn(params){
        this.showLeftTitle = ""
        this.videoNav.forEach((item,index)=>{
          this.activeKey = params.value
         
          if(item.value == params.value){ 
            this.videoTabIndex = index
            item.checked = true
          }else{
            item.checked = false
          }
        })
          let requestData ={
              pageNo:1,
              pageSize:4,
              channelCode:"pc_service",
              columnCode:params.artType,
              articleType:2
          }
          getArticleList(requestData).then(res=>{
              let respData = res.data.result
              if(respData){
                 this.videoList = respData.records
                 if(respData.records && respData.records.length > 0){
                    this.showLeftTitle = respData.records[0].title
                    this.playVideo({sourceUrl:respData.records[0].sourceUrl,title:respData.records[0].title})
                 }
              } else{
                  this.videoList = []
              }
          })
        },

    //播放视频
    playVideo(params){
      this.showLeftTitle = params.title
      this.$refs.video_wrap_box.innerHTML  = ""
      this.video_vid = params.sourceUrl
      this.getVideoToken(params.sourceUrl)
    },


    //视频部分
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
        wrap: '#video_wrap_box',
        width: '100%',
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


    initWebSocket(){ //初始化weosocket
      const wsuri = env[process.env.NODE_ENV].BASE_URL_EXPONENT;
      this.websock = new WebSocket(wsuri);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
    websocketonopen(){ //连接建立之后执行send方法发送数据
      let actions = {
        "aid":"subscribe_quote",
        "ins_list":"SYWG.SW1000,SYWG.SW1050,SYWG.SW1010"
      };
      this.websocketsend(JSON.stringify(actions));
    },
    websocketonerror(){//连接建立失败重连
      this.initWebSocket();
    },
    websocketonmessage(e){ //数据接收
      const redata = JSON.parse(e.data);
       if(redata.aid && redata.data){
         this.spNum = redata.data[0].quotes['SYWG.SW1000']
         this.blackNum = redata.data[0].quotes['SYWG.SW1050']
         this.ncpNum = redata.data[0].quotes['SYWG.SW1010']
       }
      if(redata.aid==='rsp_login'){
        let actions = {
          "aid":"peek_message"
        };
        this.websocketsend(JSON.stringify(actions));
      }else if(redata.aid==='rtn_data'){
        let actions = {
          "aid":"peek_message"
        };
        this.websocketsend(JSON.stringify(actions));
      }
    },
    websocketsend(Data){//数据发送
      this.websock.send(Data);
    },
    websocketclose(e){  //关闭
      console.log('断开连接',e);
    },


    //跳转函数
    jumpFn(params){
      console.log(params);
      
       if(params.tab){
         setTabItem(params.checkItemValue)
         this.$router.push({
                name:params.name,
                params:{
                  tabId:params.tab
              }
          })
       }else{
          this.$router.push({
                name:params.name
          })
       }
    },


    //模拟体验跳转
    MNFn(){
      window.open('https://www.sywgqh.com.cn/Pc/Option/Option_Simu')
    },
    //查看更多
    goMore(){
      this.jumpFn({name:'video',tab:this.activeKey,checkItemValue:this.videoTabIndex})
    },
  },

  mounted() {
     this.$refs.video_wrap_box.innerHTML  = ""
     this.loadPlayerScript()
     this.getArtFn({ label:"期货讲堂",value:'1',checked:true,artType:"futuresLectureHall"})
     this.initWebSocket()
     this.getVisit()
  },
  
}
</script>

<style lang="less" scoped>
.main_wrap{
    width:100%;
    min-width:1400px;
    margin: 20px auto;
    .type_nav{
      display: flex;
      justify-content: center;
      width: 100%;
      height: 180px;
      .type_box{
        display: flex;
        width: 80%;
        height: 100%;
        li{
          flex: 1;
          height: 160px;
          margin:20px 10px 20px 10px;
          background-color: #fff;
          cursor: pointer;
          text-align: center;
          img{
            display: inline-block;
            width: 50px;
            height: 40px;
            margin-top: 20px;
          }
          span{
            display: block;
          }
          .type_title{
            margin-top: 15px;
            font-size: 20px;
            font-weight: bold;
            color: #333;
          }
          .type_desc{
            font-size: 16px;
            margin-top: 10px;
            color: #999;
          }
        }
        li:hover{
          box-shadow: 0px 0px 5px 5px #F9F9F9;
        }
      }
    }
    .video_wrap{
      max-width:100%;
      min-width:1400px;
      margin: 30px auto;
      height: 675px;
      background: url("../assets/banner/videobgc.png") no-repeat;
      background-size:100% 100%;
      .video_box{
        width: 80%;
        height: 100%;
        margin-left: 10%;
        padding-top: 50px;
        .video_header{
          width: 100%;
          height: 130px;
          text-align: center;
          .video_header_title{
            display: block;
            font-size: 40px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #333333;
          }
          .video_header_desc{
            display: block;
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #666666;
            margin-top: 19px;
          }
        }
        .video_mid{
          width: 100%;
          height: 480px;
          display: flex;
          .video_left{
            width: 60%;
            height: 100%;
            background-color: #fff;
            .video_view{
              width: 100%;
              height:420px;
              overflow:hidden;
            }
            .video_title{
              padding:0 10px;
              width: 100%;
              text-align: center;
              height: 72px;
              line-height: 60px;
              font-size: 20px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #333333;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
          .video_right{
            width: 38%;
            margin-left: 30px;
            background-color: #fff;
            .tabList{
              width: 90%;
              height: 55px;
              display: flex;
               justify-content: space-around;
              li{
                width: 90%;
                height: 100%;
                text-align: center;
                line-height: 50px;
                font-size: 18px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #333333;
                cursor: pointer;
                margin-left: 40px;
              }
              .current{
                font-weight: bold;
                font-size: 20px;
                border-bottom: 3px solid #0067B7;
                border-width: 80%;
              }
            }
            .video_list{
              width: 90%;
              margin-left: 5%;
              margin-top: 10px;
              li{
                display: flex;
                height: 75px;
                width: 100%;
                margin: 5px;
                border-bottom: 1px solid #EAEAEA;
                .video_img{
                  width: 25%;
                  height: 100%;
                   img{
                     display: block;
                     width: 100%;
                     height: 100%;
                     image-rendering: -moz-crisp-edges;
                     image-rendering: -o-crisp-edges;
                     image-rendering: -webkit-optimize-contrast;
                     image-rendering: crisp-edges;
                     -ms-interpolation-mode: nearest-neighbor;

                     
                    //  margin-top: 5px;
                    //  margin-left: 5px;
                   }
                }
                .video_content{
                   width: 60%;
                   height: 100%;
                   margin-left:5%;
                   span{
                     display: block;
                     height: 30%;
                     width: 100%;
                   }
                   .video_con_title{
                      font-size: 16px;
                      font-family: Microsoft YaHei;
                      font-weight: 400;
                      color: #333333;
                      white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      margin-top: 10px;
                   }
                   .video_con_time{
                      font-size: 12px;
                      font-family: Microsoft YaHei;
                      font-weight: 400;
                      color: #999999;
                      margin-top: 5px;
                   }
                }
                .video_play{
                  width: 40px;
                  height: 100%;
                  text-align: center;
                  margin-left: 10px;
                  cursor: pointer;
                 img{
                    display: inline-block;
                    width: 32px;
                    height: 32px;
                    margin-top: 18px;
                 }
                }

              }
              li:last-child{
                border-bottom:none
              }
            }
            .video_more{
              width: 100%;
              margin-top: 30px;
              div{
                float: right;
                width: 96px;
                height: 30px;
                background: rgba(255, 255, 255, 0);
                border: 1px solid #EAEAEA;
                border-radius: 15px;
                text-align: center;
                line-height: 30px;
                color: #999;
                margin-right: 60px;
                cursor: pointer;
              }
              div:hover{
                color: #0067B7;
                border: 1px solid #0067B7;
              }
            }
          }
        }
      }
    }
    .demo_wrap{
        display: flex;
        justify-content: center;
        width:100%;
        // height: 600px;
        margin: 20px auto 0;
        
        .demo_box{
            width: 80%;
            height: 100%;
             .demo_header{
              width: 100%;
              height: 110px;
              text-align: center;
                .demo_header_title{
                  display: block;
                  font-size: 40px;
                  font-family: Microsoft YaHei;
                  font-weight: 400;
                  color: #333333;
                }
                .demo_header_desc{
                  display: block;
                  font-size: 16px;
                  font-family: Microsoft YaHei;
                  font-weight: 400;
                  color: #666666;
                  margin-top: 19px;
                }
             }
            .demo_box_item{
              display: flex;
              width: 100%;
              height: 50%;
              margin-top: 20px;
              li{
                flex: 1;
                margin: 0px 10px 0px 10px;
                background-color: #fff;
                text-align: center;
                cursor: pointer;
                img{
                  display: inline-block;
                  width: 100%;
                  height: 200px;
                }
                .box_bot{
                  span{
                    display: block;
                  }
                  .demo_box_title{
                     margin-top: 5px;
                     font-size: 20px;
                     font-family: Microsoft YaHei;
                     font-weight: bold;
                     color: #333333;
                     margin-top: 15px;
                  }
                  .demo_box_desc{
                      font-size: 16px;
                      font-family: Microsoft YaHei;
                      font-weight: 400;
                      color: #999999;
                      margin-top: 5px;
                  }
                }
              }
            }
        }
        .demo_box_top{
          margin-top: 20px;
        }
    }
    .exponent_wrap{
       margin-top: 50px;
       width: 100%;
       height: 465px;
       background: url("../assets/banner/zhishubgc.png") no-repeat;
       background-size:100% 100%;
       padding-top: 50px;
       .exponent_header{
              width: 80%;
              height: 110px;
              text-align: center;
              margin-left: 10%;
                .exponent_header_title{
                  display: block;
                  font-size: 40px;
                  font-family: Microsoft YaHei;
                  font-weight: 400;
                  color: #333333;
                }
                .exponent_header_desc{
                  display: block;
                  font-size: 16px;
                  font-family: Microsoft YaHei;
                  font-weight: 400;
                  color: #666666;
                  margin-top: 19px;
                }
       }
      .exponent_box{
        display: flex;
        justify-content: center;
        width: 80%;
        height: 100%;
        margin-left: 10%;
        li{
            flex: 1;
            height: 220px;
            text-align: center;
            margin: 20px 10px 20px 10px;
            background-color: #fff;
            cursor:pointer;
            .exponent_title{
              font-size: 22px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #333333;
              margin-top: 40px;
            }
            span{
              display: block;
            }
            .exponent_num{
              font-size: 36px;
              font-family: Microsoft YaHei;
              font-weight: bold;
              color: #F43400;
              margin-top: 10px;
            }
            .exponent_bot{
              display: flex;
              width: 40%;
              margin-left: 30%;
              text-align: center;
              span{
                flex: 1;
                font-size: 18px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #F43400;
                margin-top: 5px;
              }
              .color_green{
                color:#26943B;
              }
            }
            .color_green{
                color:#26943B;
              }
        }
        .line{
          display: block;
          width: 2px;
          height: 80px;
          border: 1px solid #fff;
          margin-top: 35px;
        }
      }
    }
    .operate_wrap{
      width: 100%;
      display: flex;
      justify-content: center;
      background-color: #fff;
      margin-top:20px;
      .operate_box{
        width: 80%;
        height: 230px;
        display: flex;
        li{
          flex: 1;
          margin: 20px 10px 20px 10px;
          cursor:pointer;
          .operate_img_wrap{
            text-align: center;
            img{
              display: inline-block;
              margin-top: 30px;
              width: 120px;
              height: 120px;
            }
          }
          span{
            display: block;
            text-align: center;
          }
          .operate_title{
            margin-top: 10px;
            font-weight: bold;
            font-size: 18px;
          }
          .operate_desc{
            margin-top: 10px;
            font-size: 20px;
            color: #979797;
          }
        }
      }
    }
}
</style>


