<template>
  <div class="ls_container">
    <el-row class="slogan">
      <el-col>
        <img class="logo ls_logo_large" src="../assets/logo.png">
        <span class="title">{{ $t("global.title") }}</span>
      </el-col>
      <el-col>
        <el-link type="primary" @click="openSignUpDialog">{{$t('signUp.btnSignUp')}}</el-link>
        <!-- <el-button type="text" @click="openSignInDialog">{{$t('signIn.btnSignIn')}}</el-button> -->
        &nbsp;&nbsp;/&nbsp;&nbsp;
        <el-link type="primary" @click="openSignInDialog">{{$t('signIn.btnSignIn')}}</el-link>
      </el-col>
    </el-row>
    <el-row class="ls_footer">
      <img class="ls_logo_word_mini" src="../assets/new-logo.png">
      <span>Copyright ©2019 Ciel.Qian All rights reserved.</span>
    </el-row>
    <el-dialog
      :title="$t('signUp.lblDialog')"
      :visible.sync="dialog.signUpDialogVisiable"
      :close-on-click-modal="false"
      width="500px"
    >
      <el-row>
        <el-col>
          <el-form
            class="ls_text_left"
            label-position="top"
            :disabled="disabled.form"
            :model="account"
            ref="form"
            label-width="80px"
          >
            <el-form-item :label="$t('signUp.lblUserName')">
              <el-input v-model="account.username" placeholder="Pick a username"></el-input>
            </el-form-item>
            <el-form-item :label="$t('signUp.lblPassword')">
              <el-input type="password" v-model="account.password" placeholder="Create a password"></el-input>
            </el-form-item>
            <el-form-item :label="$t('signUp.lblNickName')">
              <el-input v-model="account.nickname" placeholder="Pick a nickname"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <span slot="footer">
        <el-button type="text" @click="openSignInDialog">{{$t('signUp.btnChangeToSignIn')}}</el-button>
        <el-button
          type="primary"
          :disabled="disabled.form"
          @click="signUpAccount"
        >{{$t('signUp.btnSignUp')}}</el-button>
      </span>
    </el-dialog>

    <el-dialog
      :title="$t('signIn.lblDialog')"
      :visible.sync="dialog.signInDialogVisiable"
      :close-on-click-modal="false"
      width="500px"
    >
      <el-row>
        <el-col>
          <el-form
            class="ls_text_left"
            label-position="top"
            :model="account"
            :disabled="disabled.form"
            ref="form"
            label-width="80px"
          >
            <el-form-item :label="$t('signIn.lblUserName')" style="margin-bottom:0px">
              <el-input
                v-model="account.username"
                :disabled="disabled.form"
                placeholder="Pick a username"
              ></el-input>
              <el-checkbox v-model="rememberme">{{$t('signIn.lblRememberMe')}}</el-checkbox>
            </el-form-item>
            <el-form-item :label="$t('signIn.lblPassword')">
              <el-input
                type="password"
                v-model="account.password"
                :disabled="disabled.form"
                placeholder="Create a password"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <span slot="footer">
        <el-button type="text" @click="openSignUpDialog">{{$t('signIn.btnChangeToSignUp')}}</el-button>
        <el-button
          type="primary"
          :disabled="disabled.form"
          @click="signInAccount"
        >{{$t('signIn.btnSignIn')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import "../js/ribbon";
import { mapGetters, mapState } from "vuex";
import apis from "../assets/repository/apis";
import utils from "../utils/commonUtils";

export default {
  name: "Login",
  data() {
    return {
      dialog: {
        addLinkDialogVisiable: false,
        signUpDialogVisiable: false,
        signInDialogVisiable: false
      },
      disabled: {
        form: false
      },
      account: {
        username: "",
        password: "",
        nickname: ""
      },
      rememberme: false
    };
  },
  computed: {
    ...mapState({
      title: state => state.home.title
    })
  },
  methods: {
    openSignUpDialog: function() {
      this.dialog.signUpDialogVisiable = true;
      this.dialog.signInDialogVisiable = false;
    },
    openSignInDialog: function() {
      this.dialog.signUpDialogVisiable = false;
      this.dialog.signInDialogVisiable = true;
    },
    signUpAccount: function() {
      var _this = this;
      _this.disabled.form = true;
      let d = {
        username: this.account.username,
        password: this.account.password,
        nickname: this.account.nickname
      };

      this.$http
        .post(apis.auth.signUp, d)
        .then(res => {
          _this.disabled.form = false;
          _this.openSignInDialog();
        })
        .catch(x => {
          _this.disabled.form = false;
          _this.$message.error(x.message);
        });
    },
    signInAccount: function() {
      var _this = this;
      if (!this.account.username || !this.account.password) {
        _this.$message.error("用户名或密码不能为空");
        return;
      }

      _this.disabled.form = true;
      if (this.rememberme) {
        localStorage.setItem("ls_username", this.account.username);
      } else {
        localStorage.removeItem("ls_username");
      }

      let d = {
        username: this.account.username,
        password: this.account.password,
        scope: "ui",
        grant_type: "password"
      };
      this.$store.dispatch("signIn", this.account).catch(x => {
        _this.disabled.form = false;
        if (x.data.error == "invalid_grant" || x.data.error == 'unauthorized') {
          _this.$message.error("用户名或密码错误");
        }
      });
    }
  },
  mounted() {
    // if (this.$store.getters.hasLogined) {
    //   this.$router.push('Home');
    // }
    let username = localStorage.getItem("ls_username");
    if (!!username) {
      this.account.username = username;
      this.rememberme = true;
    }
    window.RibbonsInstance = new Ribbons();
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/base.scss";
.slogan {
  padding-top: 200px;
  text-align: center;

  .logo {
  }

  .title {
    padding: 15px 0px;
    display: block;
    font-size: 2rem;
  }
}
</style>