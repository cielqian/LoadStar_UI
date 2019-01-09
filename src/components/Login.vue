<template>
    <div class="ls_container">
        <el-row class="slogan">
            <el-col>
                <img class="ls_logo_large" src="../assets/logo.png">
                <h1>{{ $t("global.title")  }}</h1>
            </el-col>
            <el-col>
                <el-button type="text" @click="openSignInDialog">{{$t('login.btnSignIn')}}</el-button>
                /
                <el-button type="text" @click="openSignUpDialog">{{$t('login.btnSignUp')}}</el-button>
            </el-col>
        </el-row>

        <el-dialog
      :title="$t('login.lblSignUp')"
      :visible.sync="dialog.signUpDialogVisiable"
      width="25%"
      >
      <el-row>
        <el-col>
          <el-form class="ls_text_left" label-position="top" :model="account" ref="form" label-width="80px">
            <el-form-item :label="$t('login.lblUserName')">
              <el-input v-model="account.username" placeholder="Pick a username"></el-input>
            </el-form-item>
            <el-form-item :label="$t('login.lblPassword')">
              <el-input type="password" v-model="account.password" placeholder="Create a password"></el-input>
            </el-form-item>
            <el-form-item :label="$t('login.lblNickName')">
              <el-input v-model="account.nickname" placeholder="Pick a nickname"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <span slot="footer">
        <el-button type="text" @click="openSignInDialog">{{$t('login.btnSignIn')}}</el-button>
        <el-button type="primary" @click="signUpAccount">{{$t('login.btnSignUp')}}</el-button>
      </span>
    </el-dialog>

    <el-dialog
      :title="$t('login.lblSignIn')"
      :visible.sync="dialog.signInDialogVisiable"
      width="25%"
      >
      <el-row>
        <el-col>
          <el-form class="ls_text_left" label-position="top" :model="account" ref="form" label-width="80px">
            <el-form-item :label="$t('login.lblUserName')">
              <el-input v-model="account.username" placeholder="Pick a username"></el-input>
            </el-form-item>
            <el-form-item :label="$t('login.lblPassword')">
              <el-input type="password" v-model="account.password" placeholder="Create a password"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <span slot="footer">
        <el-button type="text" @click="openSignUpDialog">{{$t('login.btnSignUp')}}</el-button>
        <el-button type="primary" @click="signInAccount">{{$t('login.lblSignIn')}}</el-button>
      </span>
    </el-dialog>
    </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import apis from "../assets/repository/apis";

export default {
  name: "Login",
  data() {
    return {
      dialog: {
        addLinkDialogVisiable: false,
        signUpDialogVisiable: false,
        signInDialogVisiable: false
      },
      account: {
        username: "",
        password: "",
        nickname: ""
      }
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
      let d = {
        username: this.account.username,
        password: this.account.password,
        nickname: this.account.nickname
      };

      this.$http.post(apis.auth.signUp, d).then(() => {
        _this.openSignInDialog();
      });
    },
    signInAccount: function() {
      var _this = this;
      let d = {
        username: this.account.username,
        password: this.account.password,
        scope: "ui",
        grant_type: "password"
      };
      this.$store.dispatch("signIn", this.account)
      .catch(x => _this.$message.error('用户名或密码不正确'));
    }
  },
  mounted(){
    // if (this.$store.getters.hasLogined) {
    //   this.$router.push('Home');
    // }
  }
};
</script>
<style scoped>
    .slogan{
        padding-top:200px;
        text-align: center;
    }
</style>


