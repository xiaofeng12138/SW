<template>
  <div class="new_float"  v-show="btnFlag">
    <div class="wj_wrap" @mouseenter="wjFlag = true"  @mouseleave="wjFlag = false" @click="goRisk">
      <img v-if="wjFlag" src="../../assets/banner/wjdc3.png" alt="">
      <img v-else src="../../assets/banner/wjdc2.png" alt="">
      
    </div>
    <div class="top" @mouseenter="downloadFlag = true"  @mouseleave="downloadFlag = false">
      <img v-if="downloadFlag" src="../../assets/banner/sj1.png" alt="" />
      <img v-else src="../../assets/banner/sj.png" alt="" />
      <p v-if="downloadFlag" class="font_color">APP下载</p>
      <p v-else class="font_color_oc">APP下载</p>
    </div>

     <div class="top" @mouseenter="wxFlag = true"  @mouseleave="wxFlag = false">
      <img v-if="wxFlag" src="../../assets/banner/wx1.png" alt="" style="width:27px;height:22px" />
      <img v-else src="../../assets/banner/wx.png" alt=""  style="width:27px;height:22px"  />
      <p v-if="wxFlag" class="font_color">微信公众号</p>
      <p v-else class="font_color_oc">微信公众号</p>
    </div>
    <div class="mid" @mouseenter="zxkfFlag = true"  @mouseleave="zxkfFlag = false" @click="openKF">
      <img v-if="zxkfFlag" src="../../assets/banner/kf1.png" alt="" />
      <img v-else src="../../assets/banner/kf.png" alt="" />
      <p  v-if="zxkfFlag" class="font_color" >在线客服</p>
      <p v-else class="font_color_oc">在线客服</p>
    </div>

    <div class="mid" @click="toTop" @mouseenter="goTopFlag = true"  @mouseleave="goTopFlag = false">
      <img v-if="goTopFlag" src="../../assets/banner/db1.png" alt="" />
      <img v-else src="../../assets/banner/db.png" alt="" />
      <p  v-if="goTopFlag" class="font_color">返回顶部</p>
      <p v-else class="font_color_oc">返回顶部</p>
    </div>

    <div class="ewm" v-if="wxFlag">
      <div class="ewm_item">
        <img src="../../assets/banner/gzhh.jpg" alt="" style="margin-left:8px" />
        <span>申银万国官方公众号</span>
      </div>
    </div>

    <div class="ewm1" v-if="downloadFlag">
      <div class="ewm_item">
        <img src="../../assets/banner/qrcode1.png" alt=""  style="margin-left:8px" />
        <span>申银万国期货APP</span>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      isTop: false,
      isKf: false,
      btnFlag: false,
      istoTop: false,
      wjFlag:false, //问卷
      downloadFlag:false,
      wxFlag:false,
      zxkfFlag:false,
      goTopFlag:false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.scrollToTop)
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollToTop)
  },
  methods: {
    // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
    scrollToTop() {
      const that = this
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      that.scrollTop = scrollTop
      if (that.scrollTop > 60) {
        that.btnFlag = true
      } else {
        that.btnFlag = false
      }
    },

    toTop() {
      let top = document.documentElement.scrollTop || document.body.scrollTop;
      // 实现滚动效果 
      const timeTop = setInterval(() => {
        document.body.scrollTop = document.documentElement.scrollTop = top -= 50;
        if (top <= 0) {
          clearInterval(timeTop);
        }
      }, 10);
    },

    //打开客服
    openKF(){
      window.open('http://im.sywgqh.com.cn/hxkf/consult/pc/m3/consult/views/center/chat.html')
    },

    //跳转风险
    goRisk(){
       this.$router.push({
                name:'online'
          })
    }
  },
}
</script>
 
<style scoped lang = "less">
.new_float {
  position: fixed;
  bottom: 40%;
  right: 0%;
  z-index: 99999999;
  cursor: pointer;
  text-align: center;
  
  .wj_wrap{
    img{
      display: block;
      width: 80px;
      height: 80px;
    }
  }
  
  .ewm {
    position: absolute;
    top: 100px;
    left: -180px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 160px;
    height: 134px;
    box-sizing: border-box;
    padding: 14px;
    background: #fff;
    .ewm_item {
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        width: 85px;
        height: 85px;
      }
    }
  }
    .ewm1 {
    position: absolute;
    top: 60px;
    left: -180px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 160px;
    height: 134px;
    box-sizing: border-box;
    padding: 14px;
    background: #fff;
    .ewm_item {
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        width: 85px;
        height: 85px;
      }
    }
  }
  .top {
    width: 72px;
    height: 72px;
    border: 1px solid #eee;
    margin-bottom: 7px;
    padding-top: 6px;
    /* padding: 8px 5px 0; */
    box-sizing: border-box;
    text-align: center;
    background-color: #fff;
    img {
      display: inline-block;
      width: 16px;
      height: 25px;
      margin-top: 5px;
    }
    p{
      font-size: 12px;
      margin-top: 10px;
      
    }
  }
  .mid {
    width: 70px;
    height: 60px;
    border: 1px solid #eee;
    margin-bottom: 7px;
    padding: 8px 5px 0;
    box-sizing: border-box;
    text-align: center;
    background-color: #fff;
    img {
      display: inline-block;
      width: 27px;
      height: 24px;
    }
    p {
      font-size: 10px;
      margin-top: 3px;
    }
  }
  .bot {
    width: 70px;
    height: 60px;
    border: 1px solid #eee;
    padding-top: 6px;
    text-align: center;
    box-sizing: border-box;
    background-color: #fff;
    img {
      display: inline-block;
      width: 24px;
      height: 18px;
      margin-top: 5px;
    }
  }
  .font_color{
    color:#0067B7
  }
   .font_color_oc{
    color:#FC9F28
  }
}
</style>