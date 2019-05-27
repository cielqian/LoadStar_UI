<template>
    <div id="header">
      <el-row>
          <el-col>
              <div class="ls_text_left ls_inline ls_pull_left">
              <img class="ls_logo_mid ls_inline" src="../assets/logo.png">
              <h1 class="ls_inline">{{ $t('global.title') }}</h1>
              </div>
              <div class="ls_text_right ls_inline ls_pull_right">
              <router-link class="ls_fg_blue" to="/Home">{{$t('menu.lblHome')}}</router-link>
              <router-link class="ls_fg_blue ls_margin_left_15" to="/Home">{{$t('menu.lblHistory')}}</router-link>
              <el-dropdown @command="handleCommand">
                  <span class="ls_pointer el-dropdown-link">
                  {{loginInfo.nickname}}<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                      <router-link to="/Home">{{$t('menu.lblHome')}}</router-link>
                  </el-dropdown-item>
                  <el-dropdown-item>
                      <router-link to="/Setting">{{$t('menu.lblSetting ')}}</router-link>
                  </el-dropdown-item>
                  <el-dropdown-item divided command="signOut">
                    {{$t('menu.lblSignOut ')}}
                  </el-dropdown-item>
                  </el-dropdown-menu>
              </el-dropdown>
              </div>
          </el-col>
      </el-row>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "LSHeader",
  data(){
     return {
    };
  },
  computed: mapState({
    title: state => state.home.title,
    loginInfo: state => state.auth.loginInfo
  }),
  methods: {
    handleCommand(command) {
      switch (command) {
        case "signOut":
          this.signOutAccount();
          break;

        default:
          break;
      }
    },
    signOutAccount: function() {
      this.$store.dispatch('signOut');
    },
    getCurrentInfo: function() {
      var _this = this;
      _this.$http.get(apis.auth.userInfo).then(response => {
        _this.loginInfo = {
          hasLogined: true,
          username: response.data.username,
          nickname: response.data.nickname
        };
      });
    }
  },
  created(){
  }
};
</script>

