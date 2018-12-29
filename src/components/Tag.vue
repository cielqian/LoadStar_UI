<template>
  <div>
    <el-row>
      <el-col :span="5">
        <el-row>
      <el-col :span="24">
        <el-input
          placeholder="创建标签"
          suffix-icon="el-icon-circle-plus-outline"
          v-model="newTagName"
          @keyup.enter.native="createTag">
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-tag
      :key="tag.id"
      v-for="tag in tags"
      :type="tag.type"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)">
      <span @click="nodeClick(tag)" class="ls_pointer">{{tag.name}}({{tag.linkCount}})</span>
    </el-tag>
    </el-row>
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
  name: "LSTag",
  data(){
    return {
      newTagName:'',
      selectedTagId:0,
      visible1: false,
      links:[]
    };
  },
  methods:{
    createTag(){
      if (!this.newTagName) {
        return;
      }
      let d = {name:this.newTagName};
      this.$store.dispatch("createTag", d);
      this.newTagName = '';
    },
    handleClose(tag){
      this.$store.dispatch("removeTag", tag.id);
    },
    nodeClick(node){
      let _this = this;
      if (_this.selectedTagId == node.id) {
        return;
      }
      _this.selectedTagId = node.id;
      api.getAllLinksUnderTag(node.id)
      .then(res => {
        _this.visible1 = true;
        _this.links = res.data;
      });
    },
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
  },
  computed:{
    ...mapState({
      tags: state => state.tag.allTag
    })
  },
  mounted() {
    let _this = this;
    
    _this.$store.dispatch("getAllTag")
  }
};
</script>
<style>
  .el-tag {
    margin-left: 10px;
    margin-top: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>


