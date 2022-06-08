<template>
  <div class="home">
    <Head></Head>
    <Fixed></Fixed>
    <Nuxt></Nuxt>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
import Head from "@/components/Head.vue";
import Fixed from '@/components/fixed/Fixed.vue'
export default {
  name: "home",
  data() {
    return {
      idns: 0,
      visible: false,
    };
  },
  components: {
    Footer,
    Head,
    Fixed
  },
  created() {},
  mounted() {
    // this.getVisit()
  },
  methods: {
    getVisit(){
      
         let _paq = window._paq = window._paq || [];
        /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
        _paq.push(['trackPageView',document.title]);
        _paq.push(['enableLinkTracking']);
        (function() {
           let u = "//edutest.sywgqh.com.cn/matomo/";
          _paq.push(['setTrackerUrl', u+'matomo.php']);
          _paq.push(['setSiteId', '1']);
          let d=document, g=d.createElement('script'),
          s=d.getElementsByTagName('script')[0];
          g.async=true; 
          g.src=u+'matomo.js'; 
          s.parentNode.insertBefore(g,s);
        })();
    },
  },
    watch:{
        $route(to,form){
          //  this.getVisit()
        }
    }
};
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background-color: #FFFFFF;
}
</style>
