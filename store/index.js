import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = () => new Vuex.Store({
    state: {
        MenuTab: 0
    },
    mutations: {
        SET_MENUTAB(state,value){
            state.MenuTab = value
        }
    }
})

export default store