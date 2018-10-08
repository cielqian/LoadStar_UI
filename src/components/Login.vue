<template>
    <div class="ls_container">
        <el-row class="slogan">
            <el-col>
                <img class="ls_logo_large" src="../assets/logo.png">
                <h1>{{ title }}</h1>
            </el-col>
            <el-col>
                <el-button type="text" @click="openSignInDialog">Sign in</el-button>
                /
                <el-button type="text" @click="openSignUpDialog">Sign up</el-button>
            </el-col>
        </el-row>

        <el-dialog
      title="Sign up"
      :visible.sync="dialog.signUpDialogVisiable"
      width="25%"
      >
      <el-row>
        <el-col>
          <el-form class="ls_text_left" label-position="top" :model="account" ref="form" label-width="80px">
            <el-form-item label="Username">
              <el-input v-model="account.username" placeholder="Pick a username"></el-input>
            </el-form-item>
            <el-form-item label="Password">
              <el-input type="password" v-model="account.password" placeholder="Create a password"></el-input>
            </el-form-item>
            <el-form-item label="Nickname">
              <el-input v-model="account.nickname" placeholder="Pick a nickname"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <span slot="footer">
        <el-button type="text" @click="openSignInDialog">Sign in</el-button>
        <el-button type="primary" @click="signUpAccount">Sign up</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="Sign in"
      :visible.sync="dialog.signInDialogVisiable"
      width="25%"
      >
      <el-row>
        <el-col>
          <el-form class="ls_text_left" label-position="top" :model="account" ref="form" label-width="80px">
            <el-form-item label="Username">
              <el-input v-model="account.username" placeholder="Pick a username"></el-input>
            </el-form-item>
            <el-form-item label="Password">
              <el-input type="password" v-model="account.password" placeholder="Create a password"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <span slot="footer">
        <el-button type="text" @click="openSignUpDialog">Sign up</el-button>
        <el-button type="primary" @click="signInAccount">Sign in</el-button>
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
      this.$store.dispatch("signIn", this.account);
    }
  },
  mounted(){
    if (this.$store.getters.hasLogined) {
      this.$router.push('Home');
    }
  }
};
</script>
<style scoped>
    .slogan{
        margin-top:150px;
        text-align: center;
    }
</style>


