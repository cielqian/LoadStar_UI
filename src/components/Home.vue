<template>
  <div>
    <LSHeader/>
    <router-view/>
  </div>
</template>

<script>
import LSHeader from './Header.vue';
import apis from "../assets/repository/apis";
import { mapGetters, mapState } from "vuex";

export default {
  name: "Home",
  components:{LSHeader},
  mounted(){
  }
};
</script>
