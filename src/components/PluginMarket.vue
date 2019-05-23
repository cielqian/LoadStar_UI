<template>
  <div class="ls_text_right">
    <el-popover placement="right" width="300" trigger="manual" v-model="visible">
      <el-row>
        <el-row :key="plugin.code" v-for="plugin in plugins">
          <el-col>
            <el-divider content-position="center">{{plugin.name}}</el-divider>
            <div :is="plugin.code"></div>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col>
            <el-divider content-position="center">天气</el-divider>
            <p-weather></p-weather>
          </el-col>
        </el-row> -->
      </el-row>
      <el-button
        slot="reference"
        :icon="visible ? 'el-icon-close':'el-icon-s-opportunity'"
        circle
        @click="visible = !visible"
      ></el-button>
    </el-popover>
  </div>
</template>

<script>
import vueCtx from "../main";
import Vue from "Vue";
import { mapGetters, mapState } from "vuex";
import pyoudao from '../plugins/YoudaoDict';
import pweather from '../plugins/Weather';
export default {
  name: "PluginMarket",
  components:{pyoudao, pweather},
  data() {
    return {
      visible: false,
      plugins: []
    };
  },
  computed: {},
  methods: {},
  created() {
    let _this = this;
    console.log(vueCtx);
    // Vue.component('pyoudao', () => import("../plugins/YoudaoDict"))
    this.$store.dispatch("getAllPlugin").then(res => {
      res.data.forEach(item => {
        console.log(item.code);
        
        _this.plugins.push(item);
      });
      console.log(_this);
    });
  }
};
</script>

<style scoped>
</style>

