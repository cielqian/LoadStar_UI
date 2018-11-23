<template>
  <el-container style="height:100%">
    <el-aside style="width:151px">
      <LSHeader/>
    </el-aside>
    <el-main style="background-color:#f9f9f9">
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
import LSHeader from './Nav.vue';
import apis from "../assets/repository/apis";
import { mapGetters, mapState } from "vuex";

export default {
  name: "Home",
  components:{LSHeader},
  mounted(){
  }
};
</script>
