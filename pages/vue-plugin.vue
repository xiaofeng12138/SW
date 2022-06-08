<template>
    <div>
        <div v-for="(item,index) in mountains" :key="index">
            
            <ul>
                <li>
                    <h1>{{item.title}}</h1>
                    <p>{{item.description}}</p>
                </li>
            </ul>
        </div>
        
    </div>
</template>
<script>
export default {
    data(){
        return{
            mountains:[]
        }
    },
    
    //加载组件之前服务端会调用
    //方式1:return 
    // asyncData({ $axios }) {
    //     return $axios.$get('https://api.nuxtjs.dev/mountains').then((result) => {
    //         const mountains = result;
    //         console.log('mountains',mountains)
    //         return { mountains }
    //     }).catch((err) => {
            
    //     });
    // },
    //方式2:通过 async await返回
    // async asyncData({ $axios }) {
    //     const mountains = await $axios.$get('https://api.nuxtjs.dev/mountains')
    //     return { mountains }
    // },
    //方式3:插件方式解耦在nuxtjs中调用api
    // async asyncData({ $axios ,app}) {
    //     const mountains = await app.$getData();
    //     console.log('mountains',mountains)
    //     return { mountains }
    // },
    //client
    // async mounted(){
    //     this.$myInjectedFunction('test');
    //     this.mountains = await this.$getData();
    // },
    mounted(){
        this.initData()
    },
    methods:{
        async initData(){
            this.mountains = await this.$getData();
            console.log('this.mountains',this.mountains)
        }
    }
}
</script>