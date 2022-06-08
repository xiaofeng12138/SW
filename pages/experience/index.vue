<template>
    <div class="knowledeg_wrap">
       <div class="knowledge_bgc">
           <img src="~/assets/banner/riskbgc.png" alt="">
           <div class="tabbar">
               <li v-for="(item,index) in tabNav" :key="index" @click="changeTab(item)">
                   <span :class="item.checked ? 'checked' : ''">{{item.label}}</span>
               </li>
           </div>
       </div>
       <div class="table_list">
          <li v-for="(item,index) in tableList" class="age mt_10" ::key="index">
                <div class="question_wrap">
                    <span class="question_bgc">Q{{index+1}}</span>
                    <span class="question_title">{{item.questionContent}}</span>
                </div>
                <div class="question_item" v-if="item.optionType == 1">
                    <a-radio-group name="radioGroup" v-model:value="FormData[item.id]">
                            <a-radio v-for="(params,index1) in item.options "  :key="index1" :style="radioStyle" :value="params.id">{{params.optionContent}}</a-radio>
                    </a-radio-group>
                </div>
                 <div class="question_item" v-else>
                     <a-checkbox-group v-model:value="FormData[item.id]">
                           <a-row>
                               <template v-for="(params,index1) in item.options ">
                                    <a-col :span="23" style="margin-left:38px" >
                                        <a-checkbox :style="radioStyle" :value="params.id">{{params.optionContent}}</a-checkbox>
                                    </a-col>
                               </template>
                            </a-row>
                        </a-checkbox-group>
                </div>
            </li>
             <a-button v-if="tableList && tableList.length > 0"  type="primary"  class="submit_btn"  @click="submit" :loading ="WJLoading">提交 </a-button>
             <div v-else>
                 <li class="no_info">暂无数据</li>
             </div>
       </div>

       <a-modal v-model="visibleFlag" :width="500"  centered title="风险测评结果" :footer= "null" :maskClosable = "false" :closable = "false">
            <div class="modal_con"  style="width:100%;height:130px;">
                <span style="display:block;font-size:23px">您的得分总计为：<strong>{{score}}</strong> 分</span>
                <span style="display:block;font-size:23px">我司评估意见：您的风险承受能力属于<strong>C{{fxNum}}型</strong>(<strong>{{fxCName}}</strong>)</span>
            </div>
            <div style="cursor: pointer;width:200px;height:50px;text-align:center;font-size:16px;background:#1890FF;color:#fff;line-height:50px;margin-left:120px" @click="visibleFlag = false">
               确  定
            </div>
      </a-modal>
    </div>
</template>

<script>

import env from '@/env.js'
import { addSuggestion,getWJlist,submitWj,submitRiskQuestion} from '@/api/api.js'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import {Message} from 'ant-design-vue'
export default {
    data(){
        return{
            score:0,
            fxCName:"",
            fxNum:"",
            fxTypeArr:[
                {
                    label:'保守型',
                    value:1
                },
                {
                    label:'谨慎性',
                    value:2
                },
                {
                    label:'稳健性',
                    value:3
                },
                {
                    label:'积极型',
                    value:4
                },
                {
                    label:'激进型',
                    value:5
                },
            ],
            visibleFlag:false,
            radioStyle:{ 
                display: 'block',
                height: '30px',
                lineHeight: '30px',
            },
            value:"",

            FormData:{},
            total:0,
            locale: zhCN,
            tabNav:[
                {
                    label:"风险测评",
                    value:1,
                    checked:true
                },
                {
                    label:"模拟交易",
                    value:2,
                    checked:false
                },
            ],
            tableList:[],
            WJLoading:false,
        }
    },
    
    mounted() {
        this.getWJlistFn()
        this.getVisit()
    },
    head(){ 
      return {
         title:'模拟体验'
      }
   },

    methods:{
        //访问记录
        getVisit() {
            let _paq = (window._paq = window._paq || []);
            // /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
            _paq.push(["setCustomUrl", 'experience']);
            _paq.push(["trackPageView", "模拟体验"]);
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
         //获取问卷列表
        getWJlistFn(){
            let requestData = {type:1}
            getWJlist(requestData).then(res=>{
               if(res.data.code == 200){
                  this.tableList = res.data.result.problem  
                  this.questionId = res.data.result.questionnaire.id
               }else{
                  this.tableList = []  
                  this.questionId = ""
               }
            })
        },

        changeTab(params){
            if(params.value == 2){
                window.open('https://www.sywgqh.com.cn/Pc/Option/Option_Simu')
            }
            // this.tabNav.forEach((item)=>{
            //     if(item.value == params.value){
            //         item.checked = true
            //     }else{
            //         item.checked = false
            //     }
            // })
        },
        onChange(page){
            console.log(page);
        },
            //问卷提交
        submit(){
            // console.log(this.FormData);
            // return false
            
            
             this.WJLoading = true
             let checkLeng = 0  
             for(var ever in this.FormData) {
                checkLeng ++;
             }
            let tableLength = this.tableList.length
            if(checkLeng < tableLength){
                Message.error('您的问卷未填写完整！') 
                this.WJLoading = false
                return false
            }else{
                let requestData = {problem:[],id:this.questionId}
                let problem = []
                for(var ever in this.FormData) {
                    let obj = {
                        option:{
                            ids:[]
                        },
                        pid:""
                    }
                    
                   if(Array.isArray(this.FormData[ever])){  //是数组
                        
                        for(let index = 0 ;index<this.FormData[ever].length;index++){
                             obj.option.ids = []
                             obj.option.ids.push(this.FormData[ever][index])
                             obj.pid = ever
                             problem.push({option:{ids:[...obj.option.ids]},pid:ever})
                        }
                    }else{
                      obj.option.ids.push(this.FormData[ever])
                      obj.pid = ever
                      problem.push(obj)
                    }
                }
              
                
                requestData.problem = problem
                submitRiskQuestion(requestData).then(res=>{
                    console.log(res);
                    if(res.data.code ==200 ){
                        Message.success(res.data.message) 
                        this.WJLoading = false
                        this.FormData = {}
                        let respCode = res.data.result.riskLevel
                        this.fxNum = res.data.result.riskLevel
                        this.score = res.data.result.totalScore
                        this.fxTypeArr.forEach((item)=>{
                         if(item.value == respCode){
                             this.fxCName = item.label
                         }
                       })
                       this.visibleFlag = true

                    }else{
                         Message.error('提交失败') 
                         this.WJLoading = false 
                    }
                }).catch((error)=>{
                         Message.error('提交失败') 
                         this.WJLoading = false 
                })
            }
                
        },

        //查看文章详情
        goDetailed(item){
            this.$router.push({
                path:`knowledge/${item.id}`
            })
        },
    }
    
}
</script>

<style lang="less" scoped>
.knowledeg_wrap{
    width:100%;
    min-width: 1400px;
    margin: 30px auto 0;
    background-color: #F5F5F5;
    padding-bottom:20px;
    .knowledge_bgc{
        height: 380px;
        img{
            width: 100%;
            height: 320px;
        }
        .tabbar{
            display: flex;
            width: 100%;
            height: 60px;
            background-color:#fff;
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
        width: 80%;
        margin-left: 10%;
        margin-top: 20px;
        padding: 40px;
        background-color: #fff;
        .age{
            width: 100%;
            background-color: #F8F8F8;
            padding: 20px 30px;
            .question_wrap{
                display: flex;
                span{
                    display: inline-block;
                }
                .question_bgc{
                    width: 40px;
                    height: 38px;
                    background: url("~/assets/banner/qbgc.png");
                    text-align: center;
                    margin-top: 5px;
                    color: #fff;
                    font-size: 18px;
                }
                .question_title{
                    font-size: 20px;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: #333333;
                    margin-top: 3px;
                    margin-left: 5px;
                }
                
            }
            .question_item{
                    margin-top: 10px;
            }
        }
         .submit_btn{
                display:block;
                width: 260px;
                height: 48px;
                background: #2D67B1;
                text-align: center;
                line-height: 48px;
                font-size: 16px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #FFFFFF;
                margin:30px auto;
                cursor: pointer;
        }
       
    }
    .modal_con{
        width: 300px;
        height: 200px;
        background-color: pink;
        span{
            display: block;
        }
    }
    .no_info{
            display:flex;
            height:100px;
            width:100%;
            font-size:20px;
             justify-content:center;
             line-height:100px;
        }
    .ant-radio-wrapper{
        margin-left: 40px !important;
    }
    .mt_10{
        margin-top: 20px;
    }
    
}
</style>


