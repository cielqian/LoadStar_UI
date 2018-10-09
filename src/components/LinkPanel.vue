<template>
  <div class="ls_container">
    <el-row>
      <el-alert
          :title="$t('global.pasteTitle')"
          type="info"
          show-icon>
      </el-alert>
      <div v-if="theme.listTypeEnum == 'Card'">
        <el-col class="ls_link_item" v-for="link in links" :key="link.id" :span="4">
          <div class="remove">
            <i @click="removeLink(link.id)" class="iconfont icon-close-circle"></i>
          </div>
          <el-tooltip class="ls_link_item_content" effect="dark" :content="link.title" placement="top">
            <transition name="el-zoom-in-center">
              <div @click="redirect(link)" class="transition-box">
                <div v-if="link.icon != null" class="icon">
                  <img :src="link.icon">
                </div>
                <div style="padding-top:10px;"><span class="label ls_in_line">{{link.name}}</span></div>
                <!-- <div><span class="title ls_in_line">{{link.title.substr(0,10)}}</span></div> -->
              </div>
            </transition>
          </el-tooltip>
        </el-col>
      </div>
      <div v-if="theme.listTypeEnum == 'List'">
        <el-col v-if="theme.listTypeEnum == 'List'" :span="24">
          <el-table
            :data="links"
            @cell-click="(row,column) => {if(column.property =='title') redirect(row);}"
            class="ls_center"
            style="width: 90%">
            <el-table-column
              prop="title">
            </el-table-column>
             <el-table-column 
              width="50px">
                <template slot-scope="scope">
                   <i @click="removeLink(scope.row.id)" class="iconfont icon-close-circle"></i>
                </template>
              </el-table-column>
          </el-table>
        </el-col>
      </div>
      <div v-if="links.length == 0">
        <el-col class="ls_text_center" style="margin-top:200px;">
            <h2>Try Ctrl+V To Create New Link</h2>
        </el-col>
      </div>
    </el-row>
    <el-dialog
      title="New Link"
      :visible.sync="dialog.addLinkDialogVisiable"
      width="40%"
      @close="dialog.addLinkDialogVisiable = false">
      <el-row class="ls_text_center">
        <el-col :span="24">      
          <el-form :model="newLink" ref="form" label-width="80px">
            <el-form-item label="URL">
              <el-input ref="newLinkUrl" v-model="newLink.url" @blur="onNewLinkUrlBlur"></el-input>
            </el-form-item>
            <el-form-item label="Name">
              <el-input v-model="newLink.name"></el-input>
            </el-form-item>
            <el-form-item label="Title">
              <el-input v-model="newLink.title"></el-input>
            </el-form-item>
          </el-form>
          </el-col>
      </el-row>
      
      <span slot="footer">
        <el-button @click="dialog.addLinkDialogVisiable = false">Cancel</el-button>
        <el-button type="primary" @click="createNewLink">Create</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import apis from "../assets/repository/apis";
import { mapGetters, mapState } from "vuex";

function isUrl(text) {
  return text.indexOf("http") >= 0 || text.indexOf("https") >= 0;
}

export default {
  name: "LinkPanel",
  data() {
    return {
      dialog: {
        addLinkDialogVisiable: false
      },
      newLink: {
        name: "",
        title: "",
        url: ""
      }
    };
  },
  computed: {
    ...mapState({
      title: state => state.home.title,
      links: state => state.link.allLink,
      theme: state => state.setting.theme
    })
  },
  methods: {
    redirect: function(link) {
      this.$store.dispatch('visitLink', link.id);
      window.open(link.url);
    },
    openAddLinkDialog: function() {
      this.newLink.name = "";
      this.newLink.title = "";
      this.newLink.icon = "";
      this.dialog.addLinkDialogVisiable = true;
    },
    onNewLinkUrlBlur: function() {
      var _this = this;
      if (!isUrl(_this.newLink.url)) {
        _this.$message.error("不是有效的链接格式");
      }
      var d = {
        url: this.newLink.url
      };

      _this.$store.dispatch('analysisLink', d).then((response) => {
        _this.newLink.name = response.data.name;
        _this.newLink.title = response.data.title;
        _this.newLink.icon = response.data.icon;
      });
    },
    createNewLink: function() {
      this.dialog.addLinkDialogVisiable = false;

      var d = {
        name: this.newLink.name,
        title: this.newLink.title,
        url: this.newLink.url,
        icon: this.newLink.icon
      }

      this.$store.dispatch('createLink', d)
      
      this.newLink.name = "";
      this.newLink.title = "";
      this.newLink.url = "";
      this.newLink.icon = "";
    },
    getTheme: function() {
      this.$store.dispatch('getTheme');
    },
    removeLink: function(linkId) {
      this.$store.dispatch('removeLink', linkId)
    }
  },
  mounted() {
    let _this = this;
    _this.$store.dispatch('getAllLink');

    document.addEventListener("paste", function(event) {
      var clipText = event.clipboardData.getData("Text");
      if (!isUrl(clipText)) {
        _this.$message.error("不是有效的链接格式");
      } else {
        _this.newLink.url = clipText;
        _this.openAddLinkDialog();
        _this.onNewLinkUrlBlur();
      }
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.ls_text_center {
  text-align: center;
}

.ls_link_item {
  text-align: center;
  min-height: 80px;
  cursor: pointer;
  border: 1px solid #c5c5c5;
  margin-top: 20px;
  margin-left: 15px;
  padding: 20px 15px;
  position: relative;
}

.ls_link_item_content {
  min-height: 80px;
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
  color: #555;
  font-size: 18px;
}

.ls_link_item .title {
  color: #999;
  font-size: 16px;
  margin-top: 5px;
}

.ls_in_line {
  display: inline-block;
}

.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
