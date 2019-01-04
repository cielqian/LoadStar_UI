<template>
  <div class="ls_container">
    <el-row class="searcher">
      <el-input
        clearable
        v-model="searchContent"
        maxlength="20"
        @keyup.enter.native="search"
        ref="searchInputCtrl"
        placeholder="请输入内容，并按回车确认"
        class="input-with-select ls_bd_black"
      >
        <el-select v-model="searchType" slot="prepend" placeholder="请选择" class="ls_no_border">
          <el-option label="全部" value="0"></el-option>
          <el-option label="百度" value="1"></el-option>
          <el-option label="必应" value="2"></el-option>
          <el-option label="书签" value="3"></el-option>
        </el-select>
      </el-input>
    </el-row>
    <el-row v-show="visible.searchResult" class="ls_bg_white ls_padding_all_15">
      <el-row>
        <el-col :span="8" class="ls_padding_all_15">
          <el-row>
            <el-col :span="12"><span class="ls_h3">百度</span>
            <span class="ls_margin_left_15 ls_text_d ls_pointer" @click="jumpSearch('baidu')">跳转</span></el-col>
          </el-row>
          <iframe id="baiduIframe" width="100%" height="500px" class="searchIframe ls_no_border" src=""></iframe>
        </el-col>
        <el-col :span="8" class="ls_padding_all_15">
          <el-row>
            <el-col :span="12"><span class="ls_h3">必应</span>
            <span class="ls_margin_left_15 ls_text_d ls_pointer" @click="jumpSearch('bing')">跳转</span></el-col>
          </el-row>
          <iframe id="bingIframe"  width="100%" height="500px" class="searchIframe ls_no_border" src=""></iframe>
        </el-col>
        <!-- <el-col :span="8" class="ls_padding_all_15">
          <el-row>
            <el-col :span="12"><span class="ls_h3">禅道</span>
            <span class="ls_margin_left_15 ls_text_d ls_pointer" @click="jumpSearch('zhihu')">跳转</span></el-col>
          </el-row>
          <iframe id="zhihuIframe"  width="100%" height="500px" class="searchIframe ls_no_border" src=""></iframe>
        </el-col>-->
        <el-col :span="8"> 
          <el-row>
            <el-col :span="12"><span class="ls_h3">书签</span></el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-table :data="searchLinks">
                <el-table-column prop="title">
                  <template slot-scope="scope">
                    <div v-html="renderTitle(scope.row.title)"></div>
                  </template>
                </el-table-column>
              </el-table>
              
            </el-col>
          </el-row>
          
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="ls_text_center ls_pointer" @click.native="hiddenSearch"><i class="el-icon-arrow-up"></i>收起</el-col>
      </el-row>
      
    </el-row>
    
    <el-row>
      <el-col :span="24">
        <!-- <el-alert
            :title="$t('global.pasteTitle')"
            type="info"
            show-icon>
        </el-alert>-->
        <LSRecentLink
          v-if="showModule('Recently')"
          @on-click="redirect"
          @on-remove="removeLink"
          @on-up="upLink"
          @on-down="downLink"
        ></LSRecentLink>
        <LSTopLink
          v-if="showModule('Top')"
          @on-click="redirect"
          @on-remove="removeLink"
          @on-up="upLink"
          @on-down="downLink"
        ></LSTopLink>
        <LinkCardItem
          v-loading="loading.allLinkLoading"
          :links="links"
          :listType="theme.listTypeEnum"
          @on-click="redirect"
          @on-remove="removeLink"
          @on-up="upLink"
          @on-down="downLink"
        ></LinkCardItem>
        <div v-if="links.length == 0">
          <el-col class="ls_text_center" style="margin-top:200px;">
            <h2>Try Ctrl+V To Create New Link</h2>
          </el-col>
        </div>
      </el-col>
    </el-row>
    <el-dialog
      title="New Link"
      :visible.sync="dialog.addLinkDialogVisiable"
      width="40%"
      @close="dialog.addLinkDialogVisiable = false">
      <!-- <el-row class="ls_text_center">
        <el-col :span="24">
          <el-form :model="newLink" ref="form" label-width="80px">
            <el-form-item label="链接">
              <el-input ref="newLinkUrl" v-model="newLink.url" @blur="onNewLinkUrlBlur"></el-input>
            </el-form-item>
            <el-form-item label="名称">
              <el-input v-model="newLink.name"></el-input>
            </el-form-item>
            <el-form-item label="标题">
              <el-input v-model="newLink.title"></el-input>
            </el-form-item>
            <el-form-item label="文件夹">
              <el-select
                class="ls_pull_left"
                style="width:50%"
                v-model="newLink.folderId"
                filterable
                placeholder="请选择文件夹"
              >
                <el-option
                  v-for="item in folders"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="标签">
              <el-row>
                <el-col :span="24" class="ls_text_left">
                  <el-tag
                    class="ls_pointer"
                    @close="unSelectTag(item)"
                    closable
                    v-for="item in selectedTag"
                    :key="item.id"
                  >{{item.name}}</el-tag>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24" class="ls_text_left">
                  <el-tag
                    type="info"
                    class="ls_pointer"
                    @click.native="selectTag(item)"
                    v-for="item in unSelectedTag"
                    :key="item.id"
                  >{{item.name}}</el-tag>
                  <el-input
                    v-if="visible.inputVisible"
                    v-model="newTag.name"
                    class="input-new-tag"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="createTag"
                    @blur="createTag"
                  ></el-input>
                  <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新标签</el-button>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row> -->
      <LinkDetail v-bind:linkUrl="newLink.url"></LinkDetail>
      <span slot="footer">
        <el-button @click="dialog.addLinkDialogVisiable = false">Cancel</el-button>
        <el-button type="primary" @click="createNewLink">Create</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import _ from "vue";
import LSRecentLink from "./RecentLink.vue";
import LSTopLink from "./TopLink.vue";
import LinkDetail from "./LinkDetail.vue";
import LinkCardItem from "./LinkItems.vue";
import Folder from "./Folder.vue";
import apis from "../assets/repository/apis";
import tagApi from "../api/tag";
import linkApi from "../api/link";
import { mapGetters, mapState } from "vuex";

function isUrl(text) {
  return text.indexOf("http") >= 0 || text.indexOf("https") >= 0;
}

export default {
  name: "LinkPanel",
  components: { LSRecentLink, LinkDetail, LSTopLink, LinkCardItem, Folder },
  data() {
    return {
      searchType: "0",
      searchContent: "",
      searchEngine:{
        baidu:'https://www.baidu.com/s?wd=',
        mbaidu:'https://m.baidu.com/s?wd=',
        bing:'https://bing.com/search?q=',
        zhihu: 'http://www.zhihu.com/search?type=content&q=',
        chandao: 'http://ztpm.goldwind.com.cn:9898/pro/search-index.html?words='
      },
      dialog: {
        addLinkDialogVisiable: false
      },
      loading: {
        allLinkLoading: false,
        tagSearch: false
      },
      visible: {
        inputVisible: false,
        searchResult: false
      },
      newLink: {
        folderId: "",
        name: "",
        title: "",
        url: "",
        tags: ""
      },
      newTag: {
        name: ""
      },
      selectedTag: [],
      unSelectedTag: [],
      edit: false,
      recentLinks: [],
      searchLinks: []
    };
  },
  computed: {
    ...mapState({
      title: state => state.home.title,
      links: state => state.link.allLink,
      theme: state => state.setting.theme,
      folders: state => state.folder.allFolder,
      tags: state => state.tag.allTag
    })
  },
  methods: {
    showInput() {
      this.visible.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    selectTag: function(tag) {
      this.unSelectedTag = this._.filter(this.unSelectedTag, function(n) {
        return n.id != tag.id;
      });
      this.selectedTag.push(tag);
    },
    unSelectTag: function(tag) {
      this.selectedTag = this._.filter(this.selectedTag, function(n) {
        return n.id != tag.id;
      });

      this.unSelectedTag.push(tag);
    },
    redirect: function(link) {
      this.$store.dispatch("visitLink", link.id);
      window.open(link.url);
    },
    search: function() {
      let _this = this;
      this.visible.searchResult = false;
      if (!!this.searchContent) {
        switch (this.searchType) {
          case "0":
            this.visible.searchResult = true;
            document.getElementById("baiduIframe").src = this.searchEngine.mbaidu + this.searchContent;
            document.getElementById("bingIframe").src = this.searchEngine.bing+ this.searchContent;
            linkApi.queryLinks(this.searchContent).then(res => {_this.searchLinks = res.data.items});
            break;
          case "1":
            window.open(this.searchEngine.baidu + this.searchContent);
            break;
          case "2":
            window.open(this.searchEngine.bing + this.searchContent);
            break;
          default:
            window.open("https://www.baidu.com/s?wd=" + this.searchContent);
            break;
        }
      }
    },
    jumpSearch: function(engine) {
      window.open(this.searchEngine[engine] + this.searchContent);
    },
    renderTitle: function (title) {
      let titleString = title;
      let replaceReg = new RegExp(this.searchContent, 'gi');
      let replaceString = '<span class="highlight">' + this.searchContent + '</span>';
      titleString = titleString.replace(replaceReg, replaceString);
      return titleString;
    },
    hiddenSearch: function () {
      this.visible.searchResult = false;
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
        // _this.$message.error("不是有效的链接格式");
        return;
      }
      var d = {
        url: this.newLink.url
      };

      _this.$store.dispatch("analysisLink", d).then(response => {
        _this.newLink.name = response.data.name;
        _this.newLink.title = response.data.title;
        _this.newLink.icon = response.data.icon;
      });
    },
    createNewLink: function() {
      this.dialog.addLinkDialogVisiable = false;

      let tagsId = [];
      this.selectedTag.forEach(element => {
        tagsId.push(element.id);
      });

      var d = {
        name: this.newLink.name,
        title: this.newLink.title,
        folderId: this.newLink.folderId=='未归档'?'':this.newLink.folderId,
        url: this.newLink.url,
        icon: this.newLink.icon,
        tags: tagsId
      };

      this.$store.dispatch("createLink", d);

      this.newLink.name = "";
      this.newLink.title = "";
      this.newLink.url = "";
      this.newLink.icon = "";
    },
    getTheme: function() {
      this.$store.dispatch("getTheme");
    },
    removeLink: function(link) {
      let _this = this;
      this.loading.allLinkLoading = true;
      this.$store
        .dispatch("removeLink", link.id)
        .finally(x => (_this.loading.allLinkLoading = false));
    },
    upLink: function(link) {
      let _this = this;
      this.loading.allLinkLoading = true;
      this.$store
        .dispatch("upLink", link.id)
        .then(response => {
          this.$store.dispatch("getAllLink");
        })
        .finally(e => (_this.loading.allLinkLoading = false));
    },
    downLink: function(link) {
      let _this = this;
      this.loading.allLinkLoading = true;
      this.$store
        .dispatch("downLink", link.id)
        .then(response => {
          this.$store.dispatch("getAllLink");
        })
        .finally(e => (_this.loading.allLinkLoading = false));
    },
    showModule: function(moduleName) {
      return this.$store.getters.isShowModule(moduleName);
    },
    queryTag: function(keyword) {
      let _this = this;
      this.loading.tagSearch = true;
      tagApi.queryTag(keyword).then(res => {
        _this.loading.tagSearch = false;
        _this.options4 = res.data;
      });
    },
    createTag: function() {
      let _this = this;
      this.visible.inputVisible = false;
      if (!this.newTag.name) {
        return;
      }
      let d = { name: this.newTag.name };
      this.$store.dispatch("createTag", d).then(tag => {
        _this.unSelectedTag.push(tag);
      });
      this.newTag.name = "";
    }
  },
  mounted() {
    let _this = this;
    _this.loading.allLinkLoading = true;
    _this.$store
      .dispatch("getAllLink")
      .then(x => (_this.loading.allLinkLoading = false));
    _this.$store.dispatch("getAllFolder");
    _this.$store.dispatch("getAllTag").then(() => {
      _this.unSelectedTag = [..._this.$store.state.tag.allTag];
    });

    document.addEventListener("paste", function(event) {
      var clipText = event.clipboardData.getData("Text");
      if (!isUrl(clipText)) {
        // _this.$message.error("不是有效的链接格式");
        _this.searchContent = '';
        _this.searchContent = clipText;
        _this.$refs.searchInputCtrl.$refs[0].focus();

      } else {
        _this.newLink.url = clipText;
        _this.newLink.folderId = "未归档";
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

.ls_in_line {
  display: inline-block;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}



</style>
<style>
.highlight{
  color: #c00;
}

.searcher .el-select .el-input {
  width: 130px;
}

.el-input__inner:focus {
  border: 1px solid #dcdfe6;
}

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
