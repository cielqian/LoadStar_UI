<template>
  <div class="ls_container">
    <el-row type="flex" justify="center">
      <el-col :span="12"  class="ls_center">
        <el-card>
          <div slot="header" class="clearfix">
            <span>{{$t('setting.lblAppearance')}}</span>
          </div>
          <el-row>
            <el-col>
              <el-radio v-model="listTypeRadio" label="List">{{$t('setting.lblAppearanceList')}}</el-radio>
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
      </el-col>
    </el-row>
    
  </div>
</template>

<script>
import LSHeader from './Header.vue';
import { mapGetters, mapState } from "vuex";

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
    }
  },
  methods: {
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
