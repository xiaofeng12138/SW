<template>
<div>
    <div class="introduction_wrap">
        <div class="company_introduction">
            该页面不存在
        </div>
    </div>
    </div>
</template>

<script>


import {GetHonerList} from '@/api/index.js'
import Footer from '@/components/Footer'
export default {
    components:{Footer},
    data(){
        return{
            navName:"introduction",
        }
    },
    
}
</script>

<style lang="less" scoped>
.introduction_wrap{
    width: 1200px;
    margin: auto;
    .company_introduction{
       margin-top: 20px;
        height: 650px;
        background-color: #fff;
        text-align: center;
        line-height: 650px;
        text-shadow: 0 1px 0 #fff;
        color: #666;
        font-family: cursive;
        font-size: 20px;
        margin-bottom: 20px;
        }
}
</style>

