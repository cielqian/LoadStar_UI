<template>
  <el-container style="height:100%">
      <el-aside width="215px">
        <LSHeader/>
      </el-aside>
      <el-container>
        <el-main height="100%">
          <router-view/>
        </el-main>
        <!-- <el-footer height="50" class="ls_text_center ls_text_mini ls_padding_5_l">
          <img class="ls_logo_word_mini" src="../assets/new-logo.png">
          <span>Copyright ©2019 Ciel.Qian All rights reserved.</span>
        </el-footer> -->
      </el-container>
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
