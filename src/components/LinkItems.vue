<template>
    <div class="ls_link_list ls_padding_15_1 ls_overflow">
      <div v-if="links.length == 0 && loading" style="width:100%;height:150px">
        <el-col class="ls_link_item" :xs="24" :sm="11" :md="5" v-for="n in 4" :key="n">
          <content-loader class="ls_bg_white"
            :height="120"
            :width="400"
            :speed="2"
            primaryColor="#f3f3f3"
            secondaryColor="#ecebeb">
            <rect x="100" y="50" rx="3" ry="3" :width="120 + n*12" height="12" /> 
            <rect x="100" y="80" rx="3" ry="3" :width="200 - n*6" height="12" /> 
            <circle cx="180" cy="20" r="20" />
          </content-loader>
        </el-col>
      </div>
      <!-- <el-col class="title">
        <span class="ls_inline">{{title}}</span>
        <i class="el-icon-edit-outline ls_pull_right ls_pointer" @click="edit = !edit"></i>
      </el-col> -->
      <div v-if="listType == 'List'">
        <el-col :span="24">
          <el-table
            :data="links"
            @cell-click="(row,column) => {if(column.property =='title') onClick(row);}"
            class="ls_center"
            :show-header="false">
            <el-table-column 
              width="50px">
                <template slot-scope="scope">
                    <img style="height:20px;width:20px;" :src="scope.row.icon">
                </template>
              </el-table-column>
            <el-table-column
              prop="title">
            </el-table-column>
             <el-table-column 
              width="150px"
              v-if="edit">
                <template slot-scope="scope">
                   <i @click="onRemove(scope.row)" class="ls_inline ls_pointer ls_margin_left_15 iconfont icon-close-circle"></i>
                   <i v-show="scope.row.sortIndex != 1" @click="onUp(scope.row)" class="ls_inline ls_pointer ls_margin_left_15 el-icon-caret-top"></i>
                   <i v-show="scope.row.sortIndex != links.length" @click="onDown(scope.row)" class="ls_inline ls_pointer ls_margin_left_15 el-icon-caret-bottom"></i>
                </template>
              </el-table-column>
          </el-table>
        </el-col>
      </div>
      <div v-else>
        <el-col class="ls_link_item ls_link_item_card" v-for="link in links" :key="link.id" :xs="24" :sm="11" :md="5">
          <div v-show="edit" class="operate ls_fg_white">
            <el-col class="operate_btn">
              <i class="el-icon-delete" @click="onRemove(link)"></i>
            </el-col>
            <el-col class="operate_btn">
              <i class="el-icon-view" ></i>
            </el-col>
            <el-col class="operate_btn">
              <i class="el-icon-caret-top" @click="onUp(link)"></i>
            </el-col>
            <el-col class="operate_btn">
              <i class="el-icon-caret-bottom" @click="onDown(link)"></i>
            </el-col>
            
          </div>
          <el-tooltip class="ls_link_item_content" effect="dark" :open-delay="1000" :content="link.title" placement="top">
            <transition name="el-zoom-in-center">
              <div @click="onClick(link)" class="transition-box">
                <div v-if="link.icon != null" class="icon">
                  <img :src="link.icon" onerror="javascript:this.src='/static/logo.png'">
                </div>
                <div style="padding-top:10px;"><span class="label ls_in_line">{{link.name}}</span></div>
              </div>
            </transition>
          </el-tooltip>
        </el-col>
        <!-- <div style="clear:both"></div>  -->
      </div>
    </div>
</template>
<script>
import { ContentLoader,FacebookLoader } from 'vue-content-loader'

export default {
  name: "LinkItems",
  props: ['links', 'title', 'listType', 'loading'],
  components: {
    ContentLoader,
    FacebookLoader
  },
  data() {
    return {
      edit: false,
    };
  },
  methods:{
    onClick: function (row) {
      this.$emit('on-click', row);
    },
    onRemove: function (row){
      this.$emit('on-remove', row);
    },
    onUp: function (row) {
      this.$emit('on-up', row);      
    },
    onDown: function (row) {
      this.$emit('on-down', row);      
    }
  }
};
</script>

<style lang="scss" scoped>

.ls_link_list{
  .title{
    font-weight: bold;
    color: #929292
  }

  .ls_link_item{
    text-align: center;
    height: 130px;
    cursor: pointer;
    margin-top: 20px;
    margin-right: 20px;
    padding: 20px 15px;
    position: relative;
    background-color: #FFF;
  }

  .ls_link_item_card{
    .operate{
      position: absolute;
      top: 0px;
      width: 50%;
      right: 0px;
      height: 100%;
      color: #555;
      background-color: #000;
      opacity:0.6;
      filter:alpha(opacity=60);

      .operate_btn:first-child{
        margin-top: 5px;
      }

      .operate_btn{
        padding: 5px;
        min-height: 20px;
      }

      .operate_btn:hover{
        background-color: #FFF;
        color: #000;
      }
    }
  }

  .ls_link_item_card:hover{
    color: #5e5e5e;
    background-color: #EEE;
  }
}

.ls_link_item_content {
  min-height: 70px;
}

.ls_link_item_content:focus{
  outline: none;
}

.ls_link_item .remove {
  height: 20px;
  width: 20px;
  position: absolute;
  top: -15px;
  right: -8px;
  font-size: 24px;
  color: #c5c5c5;
}

.ls_link_item .remove i {
  font-size: 24px;
}

.ls_link_item .icon img {
  height: 25px;
  width: 25px;
}

.ls_link_item .label {
  // font-size: 14px;
}

.ls_link_item .title {
  color: #999;
  font-size: 16px;
  margin-top: 5px;
}
</style>


