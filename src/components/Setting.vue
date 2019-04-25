<template>
  <div class="ls_container">
    <el-row type="flex" justify="center">
      <el-col :span="12"  class="ls_center">
        <el-row>
          <el-col>
            <h2>{{getUserInfo.username}}({{getUserInfo.nickname}})</h2>
          </el-col>
        </el-row>
        <el-card class="ls_margin_top_15">
          <div slot="header" class="clearfix">
            <span>{{$t('setting.lblAppearance')}}</span>
          </div>
          <el-row>
            <el-col>
              <el-radio v-model="listTypeRadio" label="List1">{{$t('setting.lblAppearanceList')}}</el-radio>
              <el-radio v-model="listTypeRadio" label="Card">{{$t('setting.lblAppearanceCard')}}</el-radio>
            </el-col>
          </el-row>
        </el-card>
        <el-card class="ls_margin_top_15">
          <div slot="header" class="clearfix">
            <span>{{$t('setting.lblLanguage')}}</span>
          </div>
          <el-row>
            <el-col>
              <el-radio v-model="languageRadio" label="en">English</el-radio>
              <el-radio v-model="languageRadio" label="zhCHS">中文</el-radio>
            </el-col>
          </el-row>
        </el-card>
        <el-card class="ls_margin_top_15">
          <div slot="header" class="clearfix">
            <span>{{$t('setting.lblModule')}}</span>
          </div>
          <el-row>
            <el-col v-for="(item,index) in modules" v-bind:key="item.module" v-bind:class="{'ls_margin_top_10':index>0}">
              <el-switch
                v-model="item.show"
                :active-text="item.module"
                @change="triggerModuleShow(item)">
              </el-switch>
            </el-col>
          </el-row>
        </el-card>
        <el-row class="ls_margin_top_45 ls_text_center ls_text_mini ls_padding_5_l">
          <img class="ls_logo_word_mini" src="../assets/new-logo.png">
          <span>Copyright ©2019 Ciel.Qian All rights reserved.</span>
        </el-row>
        <el-row class="ls_margin_top_15 ">
            <el-col class="ls_text_center">
              <el-button style="width:300px" type="danger" @click="signOutAccount">{{$t('menu.lblSignOut ')}}</el-button>
            </el-col>
          </el-row>
      </el-col>
    </el-row>
    
  </div>
</template>

<script>
import LSHeader from './Header.vue';
import { mapGetters, mapState, mapActions } from "vuex";

export default {
  name: "Setting",
  data() {
    return {
    };
  },
  computed:{
    listTypeRadio:{
      get () {
        return this.$store.state.setting.theme.listTypeEnum;
      },
      set (value) {
        this.$store.dispatch('setListTypeEnum', value)
      }
    },
    languageRadio:{
      get () {
        return this.$store.state.setting.theme.language;
      },
      set (value) {
        this.$store.dispatch('setLanguage', value);
        this.$i18n.locale = value;
      }
    },
    ...mapGetters([
      'isShowModule',
      'getUserInfo'
    ]),
    modules:{
      get () {
        return this.$store.state.setting.theme.modules;
      }
    },
  },
  methods: {
    triggerModuleShow(e){
      this.$store.dispatch('triggerModule', e.module);
    },
    signOutAccount: function() {
      this.$store.dispatch('signOut');
    }
  },
  mounted() {
    let _this = this;
  },
  components:{LSHeader}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
