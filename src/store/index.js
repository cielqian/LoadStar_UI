import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home'
import auth from './modules/auth'
import link from './modules/link'
import setting from './modules/setting'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        home,
        auth,
        link,
        setting
    }
})