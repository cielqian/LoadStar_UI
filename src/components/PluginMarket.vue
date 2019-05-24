<template>
  <div class="ls_text_right">
    <el-popover placement="right" width="300" trigger="manual" v-model="visible">
      <el-row class="plugin_container">
        <el-row class="plugin_item" :key="plugin.code" v-for="plugin in plugins">
          <el-col>
            <el-divider content-position="center">{{plugin.name}}</el-divider>
            <div :is="plugin.code"></div>
          </el-col>
        </el-row>
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
    this.$store.dispatch("getAllPlugin").then(res => {
      res.data.forEach(item => {
        _this.plugins.push(item);
      });
    });
  }
};
</script>

<style scoped>
  .plugin_container{
    padding: 0px 0px 10px 0px;
  }

  .plugin_item{
    padding: 0px 10px;
  }
</style>

