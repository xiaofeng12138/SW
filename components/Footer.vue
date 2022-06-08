<template>
  <div class="index_wrap">
     <div class="footer_box">
        <div class="footer_left">
             <div class="footer_left_left">
               <div class="footer_left_left_top">
                 <img src="../assets/banner/footerlogo.png" alt="">
               </div>
              <div class="footer_left_left_bot">
                <div style="display:flex">
                  <img src="../assets/banner/phoneIcon.png" alt="">
                  <span class="phone_title">人工委托电话:</span>
                </div>
                <span class="phone_num">021-50581255 / 021-50581055 </span>
              </div>
             </div>
             <div class="footer_left_right">
               <span class="footer_left_right_title">关于申万</span>
                <a href="https://www.sywgqh.com.cn/Pc/Aboutus/Us_Head/Company_Profile.html"  target="_blank"  >
                   <span class="footer_left_right_item">公司简介</span>
                </a>
                <a href="https://www.sywgqh.com.cn/Pc/Aboutus/Us_Head/History.html"  target="_blank"  >
                    <span class="footer_left_right_item">发展历程</span>
                </a>
                <a href="https://www.sywgqh.com.cn/Pc/Aboutus/Public_Info/fzhjg.html"  target="_blank"  >
               <span class="footer_left_right_item">分支机构</span>
                </a>
                <a href="https://www.sywgqh.com.cn/Pc/Aboutus/Contact_Us"  target="_blank"  >
               <span class="footer_left_right_item">联系我们</span>
                </a>
               <!-- <span class="footer_left_right_item">公司简介</span>
               <span class="footer_left_right_item">发展历程</span>
               <span class="footer_left_right_item">分支机构</span>
               <span class="footer_left_right_item">联系我们</span> -->
             </div>
        </div>
        <div class="footer_right">
          <div class="footer_right_left">
               <span class="footer_right_left_title">友情链接</span>
              <div class="select_item">
                <a-select
                  v-model:value="linkValueOne"
                  style="width: 200px;"
                >
                  <a-select-option v-for="(item,index) in linkValueOneArray" :value="item.value" :key="index" @click="handleChange(item)">{{item.label}}</a-select-option>
                  
                </a-select>
              </div>
              <div class="select_item">
                  <a-select
                    v-model:value="linkValueTwo"
                    style="width: 200px"
                  >
                    <a-select-option  v-for="(item,index) in linkValueTwoArray" :value="item.value" :key="index" @click="handleChangeTwo(item)">{{item.label}}</a-select-option>
                  </a-select>
              </div>
          </div>
          <div class="footer_right_right">
             <div class="qrcode_wrap_left">
                 <img src="../assets/banner/qrcode1.png" alt="">
                 <span class="qr_title">微信扫一扫下载</span>
                 <span class="qr_desc">申银万国期货APP</span>
             </div>
             <div class="qrcode_wrap_right">
                 <img src="../assets/banner/gzhh.jpg" alt="">
                 <span class="qr_title">微信扫一扫添加</span>
                 <span class="qr_desc">申银万国期货官方服务号</span>
             </div>
          </div>
        </div>
     </div>
     <div class="footer_mid_box">
        <div style="width:100%">
           <li>投资者可通过<a href="http://www.cfachina.org/" target="_blank" style="font-weight:bold;color:#ccc">中国期货业协会</a>网站或<a href="http://www.cfachina.org/" target="_blank" style="font-weight:bold;color:#ccc">点击此处</a>查阅公司从业人员信息情况，市场有风险，投资需谨慎</li>
           <li>网站访问量：{{readNum}} 次</li>
        </div>
        <div>
           <li style="text-align:right">联系方式：上海浦东新区东方路800号宝安大厦7、8、10楼</li>
           <li style="text-align:right">投诉电话：021-50581005</li>
        </div>
     </div>
     <div class="footer_bot_box">
        <li>版权所有 © 2020 申银万国期货有限公司 本网站支持IPv6</li>
        <li>统一社会信用代码：91310000621608721G 期货经纪业务许可证号码：31770000 </li>
        <!-- <img src="../assets/banner/beian.png" alt="">
        <li>
          <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31011502014597"  target="_blank"  >
              <span class="link_title">沪公网安备 31011502014597号</span>
          </a>
        </li> -->
        <li>
           <a href="https://beian.miit.gov.cn/#/Integrated/index"  target="_blank"  >
              <span class="link_title">沪ICP备08003072号</span>
          </a>
        </li>
     </div>
  </div>
</template>

<script>
import env from '@/env.js'
import Axios from 'axios'
export default {
  data(){
    return{
      readNum:0,
      linkValueOne:"1",
      linkValueTwo:"1",
      linkValueOneArray:[
        {
          label:"申万宏源证券",
          value:"1",
          src:"https://www.swhysc.com/swhysc/"
        },
         {
          label:"中投公司",
          value:"2",
          src:"http://www.china-inv.cn"
        },
        {
          label:"中央汇金公司",
          value:"3",
          src:"http://www.huijin-inv.cn"
        },
      ],
      linkValueTwoArray:[
         {
          label:"中国证监会",
          value:"1",
          src:"http://www.csrc.gov.cn"
        },
         {
          label:"中国期货业协会",
          value:"2",
          src:"http://www.cfachina.org/"
        },
        {
          label:"钢之家",
          value:"3",
          src:"https://www.steelhome.cn/index.php"
        },
        {
          label:"东方财富",
          value:"4",
          src:"https://www.eastmoney.com/"
        },
      ]
    }
  },

  mounted() {
    this.getNum()
  },

  methods:{
    ttt(p){
      console.log(p);
      
    },
    //获取访问量
    getNum(){
      Axios.get(
        `${env[process.env.NODE_ENV].BASE_URL_D}/matomo/index.php?module=API&method=VisitsSummary.get&idSite=1&period=range&date=2021-01-01,today&format=json&token_auth=a3d3f2c4c5be9b03840d18903a2d19b9`,
       ).then(res=>{
        if(res.data){
          this.readNum = res.data.nb_actions
        }
      })
    },
     handleChange(e){
       this.linkValueOneArray.forEach((item)=>{
         if(item.value == e.value){
           window.open(item.src)
         }
       })
     },
      handleChangeTwo(e){
       this.linkValueTwoArray.forEach((item)=>{
         if(item.value == e.value){
           window.open(item.src)
         }
       })
     },

  },
  
  
}
</script>


<style lang="less" scoped>
.index_wrap{
    width:100%;
    height: 370px;
    margin: 0 auto;
    background-color: #282A2B;
    padding-top: 20px;
    .footer_box{
      display: flex;
      width: 80%;
      height: 180px;
      margin-left: 10%;
      .footer_left{
        display: flex;
        flex: 1;
        .footer_left_left{
          height: 100%;
          width: 60%;
          .footer_left_left_top{
            height: 40%;
            width: 100%;
            img{
               display: inline-block;
               width: 212px;
               height: 57px;
            }
          }
          span{
            display: block;
          }
          .footer_left_left_bot{
            height: 60%;
            width: 100%;
            margin-top: 15px;
            img{
              display: inline-block;
              width: 20px;
              height: 20px;
              margin-top: 3px;
            }
            .phone_title{
              margin-left: 5px;
              font-size: 16px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #FEFEFE;
            }
            .phone_num{
              margin-top: 10px;
              margin-left: 25px;
              font-size: 16px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #FEFEFE;
            }
          }
        }
        .footer_left_right{
          width: 40%;
          height: 100%;
          span{
            display: block;
          }
          .footer_left_right_title{
            
            text-align: center;
            margin-bottom: 10px;
            font-size: 18px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #FFFFFF;
          }
          .footer_left_right_item{
            text-align: center;
            line-height: 30px;
            cursor: pointer;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #CCCCCC;
          }
          .footer_left_right_item:hover{
            color: #0079C4;
          }
        }
      }
      .footer_right{
        display: flex;
        flex: 1;
        .footer_right_left{
          width: 45%;
          height: 100%;
          .footer_right_left_title{
            text-align: center;
            margin-bottom: 10px;
            font-size: 18px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #FFFFFF;

          }
          .select_item{
            margin-top: 20px;
          }
        }
        .footer_right_right{
          display: flex;
          width: 50%;
          height: 100%;
          div{
            width: 50%;
            height: 100%;
            text-align: center;
            img{
              display: inline-block;
              width: 100px;
              height: 100px;
              margin-top: 10px;
            }
            span{
              display: block;
            }
            .qr_title{
              margin-top: 10px;
              font-size: 16px;
              color: #fff;
            }
            .qr_desc{
              font-size: 12px;
              color: #fff;
            }
          }
        }
      }
    }
    .footer_mid_box{
      width: 80%;
      height: 80px;
      margin-left: 10%;
      display: flex;
      border-bottom: 2px solid #4D4D4D;
      div{
        width: 60%;
        height: 100%;
        li{
          width:100%;
          height: 30px;
          text-align: left;
          line-height: 30px;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #CCCCCC;
          white:nowrap;
        }
      }
    }
    .footer_bot_box{
      width: 80%;
      height: 30px;
      margin-left: 10%;
      display: flex;
      justify-content: space-around;
      line-height: 30px;
      margin-top: 20px;
      li{
        font-size: 12px;
        color: #ccc;
        a{
          .link_title{
            color: #ccc;
          }
        }
      }
      img{
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-top: 5px;
        margin-right: 5px;
      }
    }
}
.ant-select-selection-selected-value{
  font-weight: bold;
}

</style>
