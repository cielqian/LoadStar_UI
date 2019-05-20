import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home'
import auth from './modules/auth'
import link from './modules/link'
import folder from './modules/folder'
import setting from './modules/setting'
import tag from './modules/tag'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        home,
        auth,
        link,
        folder,
        setting,
        tag,
        user
    }
})