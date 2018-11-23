<template>
    <div>
        <el-row>
          <el-col :span="5">
            <el-tree ref="folderTree" :data="folders" :props="folderProps"  :render-content="renderContent" @node-click="nodeClick"></el-tree>
          </el-col>
          <el-col v-show="visible1" :span="18" class="ls_content ls_bg_white ls_margin_left_15" >
            <el-table highlight-current-row :data="links" :show-header="false" @row-dblclick="redirect">
               <el-table-column
                  prop="title">
                </el-table-column>
                <el-table-column width="50">
                  <template slot-scope="scope">
                    <el-popover
                      placement="bottom"
                      width="50"
                      trigger="click">
                      <ul style="list-style: none; padding-left:20px">
                        <li class="ls_pointer" @click="removeLink(scope.row)">删除</li>
                        <li class="ls_pointer">编辑</li>
                      </ul>
                      <i slot="reference" class="el-icon-more ls_pointer"></i>
                    </el-popover>
                    
                  </template>
                </el-table-column>
            </el-table>
          </el-col>
        </el-row>
    </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import api from '../api/link';
export default {
  name: "LSFolder",
  data(){
    return {
      visible1: false,
      folderProps:{
        children: 'childs',
        label: 'name'
      },
      selectedFolderId:0,
      links:[]
    };
  },
  computed:{
    ...mapState({
      folders: state => state.folder.allFolder
    })
  },
  methods:{
    redirect(row){
      this.$store.dispatch("visitLink", row.id);
      window.open(row.url);
    },
    renderContent(h, { node, data, store }){
       return (
          <span class="custom-tree-node">
            <i class="el-icon-news"></i>
            <span>{node.label}</span>
          </span>);
    },
    nodeClick(node){
      let _this = this;
      if (_this.selectedFolderId == node.id) {
        return;
      }
      _this.selectedFolderId = node.id;
      api.getAllLinksUnderFolder(node.id)
      .then(res => {
        _this.visible1 = true;
        _this.links = res.data;
      });
    },
    removeLink(row){
      let _this = this;
      _this.$confirm('' + row.name,'确认删除').then(()=>{
        _this.$store
          .dispatch("removeLink", row.id).then(() => {
            api.getAllLinksUnderFolder(_this.selectedFolderId)
            .then(res => {
              _this.links = res.data;
            });
          });
      });
    }
  },
  mounted(){
    let _this = this;
    
    _this.$store.dispatch("getAllFolder");

  }
};
</script>
<style>
.el-tree-node{
  padding:3px;
}

.el-tree-node:focus>.el-tree-node__content, .is-current{
  background-color: #000;
  color: #FFF;
}

.is-current>.el-tree-node__content:hover{
  background-color: #000;
  color: #FFF;
}

.el-tree-node__content:hover{
  background-color: #FFF;
  color: #CCC;
}

.el-tree-node__content{
  padding:3px;
}

.custom-tree-node span{
  padding-left: 5px; 
}

.el-popover{
  padding:0px;
}
</style>


