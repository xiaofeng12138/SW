<template>
    <div class="knowledeg_wrap">
       <div class="knowledge_bgc">
           <img src="~/assets/banner/zxhd.png" alt="">
           <div class="tabbar">
               <li v-for="(item,index) in tabNav" :key="index" @click="changeTab(item)">
                   <span :class="item.checked ? 'checked' : ''">{{item.label}}</span>
               </li>
           </div>
       </div>
       <div class="table_list">
          <template v-if="tabValue == 1">
             
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
             <a-button v-if="tableList && tableList.length > 0" type="primary"  class="submit_btn"  @click="submit" :loading ="WJLoading">提交 </a-button>
             <div v-else>
                 <li class="no_info">暂无数据</li>
             </div>
          </template>
          <template v-else >
              <div class="form_sub_wrap">
                    <div class="form_title">我要提建议</div>
                    <div class="form_wrap">
                            <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
                                <a-form-item label="姓名">
                                <a-input placeholder="请输入您的姓名" :maxLength = 20    v-decorator="['name', { rules: [{ required: true, message: '请输入您的姓名' }] }]" style="width:400px;background:#F2F2F2" />
                                </a-form-item>
                                <a-form-item label="手机号码">
                                <a-input placeholder="请输入您的手机号码" :maxLength = 11 v-decorator="['mobile', {
                                    rules: [
                                                {
                                                    required: true,
                                                    validator: (rule, value, cbfn) => {
                                                        const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
                                                        if (!value) {
                                                            cbfn('请输入您的手机号码')
                                                            return false
                                                        }
                                                        if (!reg.test(value)) {
                                                            cbfn('请输入正确的手机号码')
                                                            return false
                                                        }
                                                        cbfn()
                                                    },
                                                },
                                            ],
                                }]" style="width:400px;background:#F2F2F2"  />
                                </a-form-item>
                                
                                <a-form-item label="内容">
                                <a-textarea placeholder="请输入您的建议内容"  :maxLength =255  :auto-size="{ minRows: 6, maxRows: 6 }" style="width:400px;background:#F2F2F2"  v-decorator="['content', { rules: [{ required: true, message: '请输入您的建议内容' }] }]"  />
                                </a-form-item>
                                <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
                                <a-button type="primary" html-type="submit" class="submit_btn_form" :loading="btnLoading">
                                    提交
                                </a-button>
                                <a-button type="primary"  class="reset_btn" @click="handleReset">
                                    重置
                                </a-button>
                                </a-form-item>
                            </a-form>
                    </div>
              </div>
          </template>
       </div>
    </div>
</template>

<script>
import env from '@/env.js'
import { addSuggestion,getWJlist,submitWj} from '@/api/api.js'
export default {
    data(){
        return{
            btnLoading:false,
            formLayout: 'horizontal',
            form: this.$form.createForm(this, { name: 'coordinated' }),
            tabValue:1,
            radioStyle:{ 
                display: 'block',
                height: '30px',
                lineHeight: '30px',
            },


            FormData:{},
            total:0,
            tabNav:[
                {
                    label:"满意度调查",
                    value:1,
                    checked:true
                },
                {
                    label:"意见反馈",
                    value:2,
                    checked:false
                },
            ],
            tableList:[],
            questionId:"",
            WJLoading:false
        }
    },

    head(){ 
      return {
         title:'在线互动'
      }
   },

    mounted() {
        this.getWJlistFn()
        let paramsId = this.$route.params.tabId
        if(paramsId){
           this.tabValue = this.$route.params.tabId
        }
        if(paramsId){
            this.tabNav.forEach((item)=>{
                if(item.value == paramsId){
                    item.checked = true
                }else{
                    item.checked = false
                }
            })
        }
        this.getVisit()
    },
     watch:{
         "$store.state.MenuTab":{
                handler(nv,ov){
                      this.tabValue = nv
                        this.tabNav.forEach((item)=>{
                            if(item.value == nv){
                              item.checked = true
                            }else{
                             item.checked = false
                        }
                    })
                },
             deep:true
         }
    },
    

    methods:{
        //访问记录
        getVisit() {
            let _paq = (window._paq = window._paq || []);
            // /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
            _paq.push(["setCustomUrl",'online']);
            _paq.push(["trackPageView", "在线互动"]);
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
            let requestData = {type:2}
            getWJlist(requestData).then(res=>{
               if(res.data.code == 200){
                  this.tableList = res.data.result.problem  
                  this.questionId = res.data.result.questionnaire.id
               }
            })
        },

        //tab切换
        changeTab(params){
            this.tabValue = params.value
            this.tabNav.forEach((item)=>{
                if(item.value == params.value){
                    item.checked = true
                }else{
                    item.checked = false
                }
            })
        },

        //分页
        onChange(page){
            console.log(page);
        },
        
        //问卷提交
        submit(){
             this.WJLoading = true
             let checkLeng = 0  
             for(var ever in this.FormData) {
                checkLeng ++;
             }

            let tableLength = this.tableList.length
            if(checkLeng < tableLength){
                this.$message.error('您的问卷未填写完整！') 
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
                submitWj(requestData).then(res=>{
                    console.log(res);
                    if(res.data.code ==200 ){
                        this.$message.success(res.data.message)
                        this.WJLoading = false
                        this.FormData = {}
                    }else{
                         this.$message.error('提交失败')
                         this.WJLoading = false 
                    }
                }).catch((error)=>{
                        this.$message.error('提交失败')
                        this.WJLoading = false 
                })
            }
                
        },
        


        //form表单提交函数
         handleSubmit(e) {
            e.preventDefault();
            this.form.validateFields((err, values) => {
                if (!err) {
                    this.btnLoading = true
                    let requestData = {...values,...{email:''}}
                    addSuggestion(requestData).then(res=>{
                        let respData = res.data
                        if(respData.code == 200){
                            this.$message.success(respData.message)
                            this.btnLoading = false
                            this.handleReset()
                        }else{
                            this.btnLoading = false
                            this.$message.error('添加失败，请重试')
                        }
                    }).catch((error)=>{
                         this.btnLoading = false
                         this.$message.error('添加失败，请重试')
                    })
                }
                
            });
            },
        handleReset() {
            this.form.resetFields();
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
        .submit_btn_form{
                width: 160px;
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
                margin-left:20px;
        }
        .reset_btn{
               width: 160px;
                height: 48px;
                text-align: center;
                line-height: 48px;
                font-size: 16px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #2D67B1;
                margin:30px auto;
                cursor: pointer;
                border:1px solid #2D67B1;
                background: #fff;
                margin-left:40px;
        }
        .form_sub_wrap{
           width:100%;

            .form_title{
                    width:100%;
                    font-size: 24px;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: #333333;
                    margin-top:40px;
                    text-align: center;
                }
                .form_wrap{
                    height:400px;
                    margin-top:20px; 
                    margin-left: 20%;
                }

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


