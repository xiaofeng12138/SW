<template>
    <div class="header_wrap">
        <div class="header_box">
            <div class="header_logo">
                <img class="logo_img" src="../assets/banner/header_logo.png" alt="" @click="goHome">
                <img class="logo_img2" src="../assets/banner/header_logo2.png" alt="">
            </div>
                <div class="header_nav">
                    <div class="label">
                            <div
                                v-for="(item,index) in navTab"
                                :key="item.label"
                                @mouseover="showToggle(index)"
                                @mouseout="handleHide"
                                :class="['sort','mouse']"
                                >
                                <div class="title" @click="changeTab(item)" :class="{'checked':(index == checkedTab )}">
                                       {{item.label}}
                                    <!-- <nuxt-link :to="item.name" :title="item.title">
                                       {{item.label}}
                                    </nuxt-link> -->

                                </div>
                                <div v-show="index === isShow" style="z-index:999">
                                    <div v-for="(item1,idx) in item.list" :key="idx" class="hoverShow">
                                    <div  @click="dianji(item1)">
                                        {{item1.label}}
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                </div>
           </div>
            <div class="search">
              <img  style="margin-top:24px" src="~/assets/banner/search.png" alt="" @click="goSearch">
          </div>
    </div>
       
    </div>
</template>

<script>
import {getTab,setTab,setTabItem,getTabItem} from '@/utils/cookie.js'

export default {
    data() {
        return {
            isShow: -1,
            navTab:[
                {
                    value:0,
                    label:"首页",
                    checked:true,
                    name:"index"
                },
                {
                    value:1,
                    label:"知识中心",
                    checked:false,
                    name:"knowledge",
                    list: [
                        {
                            value:1,
                            label:"新手入门",
                            checked:false,
                            name:"knowledge",
                        },
                        {
                            value:2,
                            label:"品种介绍",
                            checked:false,
                            name:"knowledge",
                        },
                        {
                            value:3,
                            label:"法律法规",
                            checked:false,
                            name:"knowledge",
                        },
                    ],
                },
                {
                    value:2,
                    label:"视频讲堂",
                    checked:false,
                    name:"video",
                    list: [
                        {
                            value:1,
                            label:"期货讲堂",
                            checked:false,
                            name:"video",
                        },
                        {
                            value:2,
                            label:"期权讲堂",
                            checked:false,
                            name:"video",
                        },
                        {
                            value:3,
                            label:"投教讲堂",
                            checked:false,
                            name:"video",
                        },
                    ],
                },
                {
                    value:3,
                    label:"投保专区",
                    checked:false,
                    name:"action",
                    list: [
                        {
                            value:1,
                            label:"防非宣传",
                            checked:false,
                            name:"action",
                        },
                        {
                            value:2,
                            label:"反洗钱",
                            checked:false,
                            name:"action",
                        },
                        {
                            value:3,
                            label:"适当性管理",
                            checked:false,
                            name:"action",
                        },
                        {
                            value:4,
                            label:"典型案例",
                            checked:false,
                            name:"action",
                        },
                        {
                            value:5,
                            label:"投资者保护",
                            checked:false,
                            name:"action",
                        },
                        {
                            value:6,
                            label:"投教活动",
                            checked:false,
                            name:"action",
                        },
                    ],
                },
                {
                    value:4,
                    label:"模拟体验",
                    checked:false,
                    name:"experience",
                      list: [
                        {
                            value:1,
                            label:"风险测评",
                            checked:false,
                            name:"experience",
                        },
                        {
                            value:'jmp',
                            label:"模拟交易",
                            checked:false,
                            name:"knowledge",
                        },
                    ],
                },
                {
                    value:5,
                    label:"商品指数",
                    checked:false,
                    name:"exponent",
                    list: [
                        {
                            value:1,
                            label:"商品指数",
                            checked:false,
                            name:"exponent",
                        },
                        {
                            value:2,
                            label:"申万指数",
                            checked:false,
                            name:"exponent",
                        },
                    ],
                },
                {
                    value:6,
                    label:"期权学院",
                    checked:false,
                    name:"optionSchool",
                     list: [
                        {
                            value:1,
                            label:"期权知识",
                            checked:false,
                            name:"optionSchool",
                        },
                        {
                            value:2,
                            label:"期权策略",
                            checked:false,
                            name:"optionSchool",
                        },
                        {
                            value:3,
                            label:"每日期权",
                            checked:false,
                            name:"optionSchool",
                        },
                    ],
                },
                {
                    value:7,
                    label:"在线互动",
                    checked:false,
                    name:"online",
                    list: [
                        {
                            value:1,
                            label:"满意度调查",
                            checked:false,
                            name:"online",
                        },
                        {
                            value:2,
                            label:"意见反馈",
                            checked:false,
                            name:"online",
                        },
                    ],
                },
            ],
            searchValue:"",
            checkedTab:getTab() ? getTab() : 0
        };
    },

    
    methods: {
        
        //跳转搜索页面
        goSearch(){ 
            this.$router.push({
                name:'search'
            })
        },


    //跳转函数
        jumpFn(params){
            if(params.tab){
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
        showToggle(index) {
          this.isShow = index;
        },
        handleHide() {
          this.isShow = !this.isShow;
        },
        dianji(e) {
         this.isShow = !this.isShow;
         sessionStorage.setItem('MenuTab',e.value)
         this.$store.commit('SET_MENUTAB',e.value)
          if(e.value == 'jmp'){
             window.open('https://www.sywgqh.com.cn/Pc/Option/Option_Simu')
          }else{
            this.jumpFn({name:e.name,tab:e.value})
            setTabItem(e.value - 1)
          }
        },
        changeTab(params){
            setTabItem(0)
            this.$router.push({
                 name:params.name
            })
        },

        onSearch(){
            console.log(444);
        },


        //返回首页
        goHome(){
             this.$router.push({
                name:'index'
            })
        }
    },

    watch:{
        $route(to,form){
            let toRouter = to.name
            if(toRouter == 'search-id' || toRouter == 'search'){
               this.checkedTab = 10
                setTab(10) 
            }else{
                 this.navTab.forEach((item,index)=>{
                    if(toRouter.indexOf(item.name) > -1){
                        // item.checked = true
                        this.checkedTab = index
                        setTab(index)
                    }
               }) 
            }
        }
    }
};
</script>

<style lang="less" scoped>
.header_wrap{
    a{
        color:#000;
    }
    display: flex;
    justify-content: center;
    width: 100%;
    min-width: 1400px;
    height: 60px;
    margin: 0 auto;
    padding-top: 10px;
    background-color:#fff;
    .header_box{
        width: 80%;
        height: 60px;
        display: flex;
        background-color: #fff;
        .header_logo{
            display: flex;
            text-align: center;
            flex: 2;
            .logo_img{
                display: inline-block;
                width: 165px;
                height: 45px;
                margin-top: 8px;
                cursor: pointer;
            }
            .logo_img2{
                display: inline-block;
                width: 134px;
                height: 20px;
                margin-left: 20px;
                margin-top: 23px;
            }
        }
        .header_nav{
            flex:5;
            .label {
                display: flex;
            }
            .mouse {
                flex:1;
                display: flex;
                justify-content:space-between;
                flex-direction: column;
                align-items: center;
                // border-right: 1px solid #fff;
            }
           
            .title {
                flex:1;
                // padding: 10px;
                color: #000;
                cursor:pointer;
                // margin:20px 25px;
                margin-top:20px;
                margin-bottom:20px;
            }
             .checked{
                border-bottom: 3px solid #0067B7;
                color: #0065B6;
            }
            .title:hover {
               color: #000;
            }
            .hoverShow {
                display: flex;
                flex-direction: column;
                z-index:999;
            }
            .hoverShow div {
                padding: 10px;
                box-sizing: border-box;
                background-color: #f5f5f5;
                color: #000;
                cursor:pointer;
            }
            .hoverShow div:hover {
                background-color: #fff;
                color: #0067B7;
            }
            
        }
    }
    .search{
        height: 60px;
        img{
            display: inline-block;
            width: 16px;
            height: 16px;
            // margin-top: 22px;
            cursor: pointer;
        }
        .left_img{
            width: 16px;
            height: 16px;
            cursor: pointer;
        }
    }

   
}
</style>
