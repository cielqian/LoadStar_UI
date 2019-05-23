<template>
  <div id="app" v-loading.fullscreen.lock="fullscreenLoading">
    <router-view/>
  </div>
</template>

<script>
import { mapGetters, mapState} from 'vuex';

export default {
  name: 'App',
  computed: mapState({
    hasLogined: state => state.auth.loginInfo.hasLogined,
    fullscreenLoading: state => state.home.fullscreenLoading
  }),
  mounted(){
    this.$store.dispatch('checkLoginInfo');
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #201F1E;
  font-family: Helvetica,Arial,"PingFang SC","Microsoft YaHei","WenQuanYi Micro Hei","tohoma,sans-serif"
}

html, body, #app{
  height: 100%;
  min-width: 1000px;
}

#nprogress .bar {
  background: #000 !important;
}

</style>
