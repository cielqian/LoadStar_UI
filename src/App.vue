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
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 15px;
}
</style>
