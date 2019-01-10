// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios' 
// import ElementUI from 'element-ui';
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

Vue.config.productionTip = false;
axios.defaults.baseURL = apis.baseHost;
axios.interceptors.request.use(
  function (config) {
      NProgress.start();
      if(config.url.indexOf(apis.auth.signIn) >= 0){
        config.headers.Authorization = 'Basic YnJvd3Nlcjo=';
      }else{
        let token = store.getters.getAccessToken;
        if(token != null && token!= '' && token != 'null')
          config.headers.Authorization = 'Bearer ' + token;
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
          return Promise.reject(res.message);
        }
      }
      return res;
  },
  function (error) {
    if (error.response.status == 401) {
      store.dispatch('signOut');
      // router.push('Login');
    }
    NProgress.done();
    console.log(error);
    return Promise.reject(error)
  }
);

Vue.prototype.$http = axios;
Vue.prototype._ = _;

// Vue.use(ElementUI);

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


// let theBoyFriend = new BoyFriend();
// theBoyFriend
//   .with(new Money(9999999999999))
//   .with(new Car('BMW'), new Car('Benz'), new Car('Tesla'))
//   .with(new Car('BMW'), new Car('Benz'), new Car('Tesla'))
//   .with(new Food('Morning noodles'), new Food('Cherries'));
