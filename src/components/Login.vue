<template>
  <div class="ls_container">
    <el-row class="slogan">
      <el-col>
        <img class="ls_logo_large" src="../assets/logo.png">
        <h1>{{ $t("global.title") }}</h1>
      </el-col>
      <el-col>
        <el-button type="text" @click="openSignInDialog">{{$t('signIn.btnSignIn')}}</el-button>
        &nbsp;&nbsp;/
        <el-button type="text" @click="openSignUpDialog">{{$t('signUp.btnSignUp')}}</el-button>
      </el-col>
    </el-row>

    <el-dialog
      :title="$t('signUp.lblDialog')"
      :visible.sync="dialog.signUpDialogVisiable"
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
        <el-button type="primary" :disabled="disabled.form" @click="signUpAccount">{{$t('signUp.btnSignUp')}}</el-button>
      </span>
    </el-dialog>

    <el-dialog
      :title="$t('signIn.lblDialog')"
      :visible.sync="dialog.signInDialogVisiable"
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
            <el-form-item :label="$t('signIn.lblUserName')">
              <el-input v-model="account.username" :disabled="disabled.form"  placeholder="Pick a username"></el-input>
            </el-form-item>
            <el-form-item :label="$t('signIn.lblPassword')">
              <el-input type="password" v-model="account.password" :disabled="disabled.form" placeholder="Create a password"></el-input>
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
      _this.disabled.form = true;
      let d = {
        username: this.account.username,
        password: this.account.password,
        nickname: this.account.nickname
      };

      this.$http.post(apis.auth.signUp, d).then(res => {
        _this.disabled.form = false;
        _this.openSignInDialog();
      }).catch(x => {
        _this.disabled.form = false;  
      });
    },
    signInAccount: function() {
      var _this = this;
      _this.disabled.form = true;
      let d = {
        username: this.account.username,
        password: this.account.password,
        scope: "ui",
        grant_type: "password"
      };
      this.$store
        .dispatch("signIn", this.account)
        .catch(x => {
          _this.disabled.form = false;
          _this.$message.error(x)});
    }
  },
  mounted() {
    // if (this.$store.getters.hasLogined) {
    //   this.$router.push('Home');
    // }
  }
};
</script>
<style scoped>
.slogan {
  padding-top: 200px;
  text-align: center;
}
</style>