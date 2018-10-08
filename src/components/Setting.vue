<template>
  <div class="ls_container">
    <el-row>
      <el-col>
        <el-card>
          <div slot="header" class="clearfix">
            <span>Appearance</span>
          </div>
          <el-row>
            <el-col>
              <el-radio v-model="radio" label="List">List</el-radio>
              <el-radio v-model="radio" label="Card">Card</el-radio>
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
    radio:{
      get () {
        return this.$store.state.setting.theme.listTypeEnum
      },
      set (value) {
        this.$store.dispatch('setListTypeEnum', value)
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
