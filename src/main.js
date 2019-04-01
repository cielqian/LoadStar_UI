// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios' 
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/iconfont.css'
import './assets/ls_global.css'
import apis from './api/apis'
// import store from "./assets/store/store";
import store from "./store";
import VueI18n from 'vue-i18n';
import LangEn from '../static/lang/en'
import LangZhCHS from '../static/lang/zhCHS'
import _ from 'lodash'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import ContentMenu from 'v-contextmenu'
import 'v-contextmenu/dist/index.css'
import LSContentMenu from "./components/ContentMenu.vue";
//import LSLinkDetail from "./components/LinkDetail.vue";
import packageInfo from '../package.json'

console.log('version:' + packageInfo.version)

Vue.config.productionTip = false;
axios.defaults.baseURL = apis.baseHost;
axios.interceptors.request.use(
  function (config) {
      NProgress.start();
      if(config.url.indexOf(apis.auth.signIn) >= 0){
        config.headers.Authorization = 'Basic YnJvd3Nlcjo=';
      }else{
        let token = store.getters.getAccessToken;
        if(!!token){
          config.headers.Authorization = 'Bearer ' + token;
        }
      }
      return config;
  },
  function (err) {
      return Promise.reject(err);
  }
);
axios.interceptors.response.use(
  function (response) {
    NProgress.done();
      var res = response.data;
      if(response.request.responseURL.indexOf(apis.auth.signIn) >= 0){
      }else{
        if (res.status == 401) {
          router.push('Login');
        }
        if (res.status != 200) {
          Vue.prototype.$message.error(res.message);
          //return Promise.reject(res.message);
        }
      }
      return res;
  },
  function (error) {
    NProgress.done();
    if (!error.response) {
      Vue.prototype.$message.error('服务暂时不可用');
      return Promise.reject(error)
    }
    else{
      if (error.response.status == 400) {
        Vue.prototype.$message.error(error.response.message);
        return Promise.reject(error.response)
      }
      else if(error.response.status == 401){
        if (error.request.responseURL.indexOf("/oauth/token") > 0) {
          return Promise.reject(error.response);
        }
        store.dispatch('signOut');
        return Promise.reject(error)
      }
      return Promise.reject(error)
    }
  }
);

Vue.prototype.$http = axios;
Vue.prototype._ = _;

Vue.use(ElementUI);

Vue.use(ContentMenu)

Vue.component('LSContentMenu',LSContentMenu)
// Vue.component('LSLinkDetail',LSLinkDetail)

if (location.href.indexOf('zh') > 0) {
  store.dispatch('setLanguage', 'zhCHS');
}else{
  store.dispatch('setLanguage', 'en');
}

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: store.getters.getLanguage, 
  messages:{
    'en': LangEn,
    'zhCHS': LangZhCHS
  }
})

new Vue({
  store,
  router,
  i18n,
  components: {App},
  template: '<App/>'
}).$mount('#app');