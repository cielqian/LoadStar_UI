<template>
    <div>
        <el-tree :data="folders" :props="folderProps"></el-tree>
    </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "LSFolder",
  data(){
    return {
      folderProps:{
        children: 'childs',
        label: 'name'
      }
    };
  },
  computed:{
    ...mapState({
      folders: state => state.folder.allFolder
    })
  }
};
</script>

