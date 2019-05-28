<template>
  <div class="ls_container">
    <el-row class="searcher_block">
      <el-col :span="22">
        <LSSearcher></LSSearcher>
      </el-col>
      <el-col :span="2">
        <LSPluginMarket></LSPluginMarket>
      </el-col>
    </el-row>
    <el-row class="link_content ls_padding_15_1">
      <el-col :span="24" data-intro="常用书签" style="min-height:200px;">
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
          :links="oftenLinks"
          :loading="loading.allLinkLoading"
          :listType="theme.listTypeEnum"
        ></LinkCardItem>
        <div v-show="!loading.allLinkLoading &&  oftenLinks.length == 0">
          <el-col class="ls_text_center" style="margin-top:200px;">
            <h2>Try Ctrl+V To Create New Link</h2>
          </el-col>
        </div>
      </el-col>
    </el-row>
    <el-dialog
      :title="$t('detail.lblDialog')"
      :visible.sync="dialog.addLinkDialogVisiable"
      width="40%"
      @close="closeAddLinkDialog"
      @opened="analysisLink"
      :close-on-click-modal="false"
    >
      <LSLinkDetail ref="linkDetail"></LSLinkDetail>
      <span slot="footer">
        <el-button @click="dialog.addLinkDialogVisiable = false">{{$t('detail.btnCancel')}}</el-button>
        <el-button type="primary" @click="createNewLink">{{$t('detail.btnSave')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/intro.js/2.9.3/intro.js">
</script>
<script>
import Vue from "vue";
import _ from "vue";
import LSSearcher from "./Searcher.vue";
import LSRecentLink from "./RecentLink.vue";
import LSTopLink from "./TopLink.vue";
import LinkCardItem from "./LinkItems.vue";
import LSLinkDetail from "./LinkDetail.vue";
import LSPluginMarket from "./PluginMarket.vue";
import apis from "../assets/repository/apis";
import tagApi from "../api/tag";
import linkApi from "../api/link";
import { mapGetters, mapState } from "vuex";
import introJs from "intro.js";
function isUrl(text) {
  return text.indexOf("http") >= 0 || text.indexOf("https") >= 0;
}

export default {
  name: "LinkPanel",
  components: {
    LSRecentLink,
    LSTopLink,
    LinkCardItem,
    LSLinkDetail,
    LSSearcher,
    LSPluginMarket
  },
  data() {
    return {
      dialog: {
        addLinkDialogVisiable: false
      },
      client: {
        htmlHeight: 800
      },
      loading: {
        allLinkLoading: false,
        tagSearch: false
      },
      visible: {
        inputVisible: false,
        pasteInfoVisible: false
      },
      newLink: {
        url: "",
        folderId: ""
      },
      edit: false,
      recentLinks: []
    };
  },
  computed: {
    ...mapState({
      title: state => state.home.title,
      links: state => state.link.allLink,
      oftenLinks: state => state.link.oftenLink,
      theme: state => state.setting.theme,
      folders: state => state.folder.allFolder,
      tags: state => state.tag.allTag,
      intro: state => state.sample.intro.home
    })
  },
  methods: {
    redirect(link) {
      this.$store.dispatch("visitLink", link);
    },
    openAddLinkDialog: function() {
      this.dialog.addLinkDialogVisiable = true;
    },
    closeAddLinkDialog: function() {
      this.dialog.addLinkDialogVisiable = false;
      document.addEventListener("paste", this.pasteFn);
    },
    createNewLink: function() {
      let _this = this;
      this.$refs.linkDetail.saveLink(() => {
        this.dialog.addLinkDialogVisiable = false;
      });
    },
    analysisLink: function() {
      let _this = this;
      _this.$refs.linkDetail.analysisLink(_this.newLink.url);
    },
    getTheme: function() {
      this.$store.dispatch("getTheme");
    },
    showModule: function(moduleName) {
      return this.$store.getters.isShowModule(moduleName);
    },
    loadOftenLinks() {
      this.$store.dispatch("getOftenLink");
    },
    pasteFn: function(event) {
      let _this = this;
      var clipText = event.clipboardData.getData("Text");
      if (!isUrl(clipText)) {
        // _this.$message.error("不是有效的链接格式");
        _this.searchContent = "";
        _this.searchContent = clipText;
        _this.$refs.searchInputCtrl.focus();
      } else {
        _this.newLink.url = clipText;

        _this.openAddLinkDialog();
        document.removeEventListener("paste", _this.pasteFn);
      }
    }
  },
  mounted() {
    let _this = this;
    _this.$store.dispatch("getAllFolder");
    _this.$store.dispatch("getAllTag");
    _this.$store
      .dispatch("getOftenLink")
      .then(x => (_this.loading.allLinkLoading = false));
    _this.$store.dispatch("loadAllTipInfo").then(x => {
      if (_this.intro) {
        introJs()
          .setOptions({
            exitOnOverlayClick: false,
            skipLabel: "跳过",
            nextLabel: "下一步",
            prevLabel: "上一步",
            doneLabel: "知道了"
          })
          .onexit(() => {
            _this.$store.dispatch("finishSample", "home");
          })
          .start();
      }
    });
    document.addEventListener("paste", _this.pasteFn);

    this.client.htmlHeight = window.screen.availHeight - 180;
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

.searcher_block {
  position: absolute;
  width: calc(100% - 270px);
  z-index: 1999;
}

.link_content {
  padding-top: 50px;
  min-height: 450px;
}
</style>
<style>
.highlight {
  color: #c00;
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
