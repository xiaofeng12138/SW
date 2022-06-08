<template>
    <div class="head_wrap" >
          <a-carousel arrows autoplay >
              <div
                slot="prevArrow"
                slot-scope="props"
                class="custom-slick-arrow cur_desc"
            >
            <a-icon type="left-circle" />
            </div>
            <div slot="nextArrow" slot-scope="props" class="custom-slick-arrow r-10" >
            <a-icon type="right-circle" />
            </div>
            <div @click="bannerClick(item)" v-for="(item,index) in bannerList" :key="index">
                <div v-if="item.bigPicurl" class="imgSrc" >
                <img :src="item.bigPicurl" alt="" /> 
                </div>
            </div>
     
        </a-carousel>

    </div>
</template>

<script>

import {GetBannerList} from '@/api/index.js'
export default {
    data() {
        return {
            bannerList:[
                {
                    bigPicurl:[]
                }
            ]
        };
    },


    mounted() {
      this.getBannerListFn()
    },
    methods: {
        //轮播图点击
        bannerClick(item){
            if(item.hrefUrl){
                window.open( item.hrefUrl)
            }
        },


        async fetch(){

        },




      async getBannerListFn(){
            let params = new FormData()
            params.append('bannerType',99)
            GetBannerList(params).then(res=>{
                if(res.data.code == 0){
                    this.bannerList = res.data.result
                }
            })
        }
    }
};
</script>

<style lang="less" scoped>
.head_wrap{
    width:100%;
    height:500px;
    margin: 0 auto;
}
.imgSrc{
    width: 100%;
    height: 500px;
    img{
        display: inline-block;
        width: 100%;
        min-height: 0;
        max-height: 100%;
        // height: 100%;
    }
}
.ant-carousel .slick-slide {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}
.r-10{
    right:10px;
}

.cur_desc {
    left: 10px;
    z-index:1
}

.ant-carousel .custom-slick-arrow {
  width: 30px;
  height: 30px;
  font-size: 25px;
  color: #fff;
//   background-color: #ccc;
//   opacity: 0.3;
}
.ant-carousel .custom-slick-arrow:before {
  display: none;
}
.ant-carousel .custom-slick-arrow:hover {
  opacity: 0.5;
}

.ant-carousel .slick-slide h3 {
  color: #fff;
}

</style>
