<template>
  <div class="ls_container">
    <el-row>
      <el-alert
          :title="$t('global.pasteTitle')"
          type="info"
          show-icon>
      </el-alert>
      <LSRecentLink v-if="showModule('Recently')" 
      @on-click="redirect"
      @on-remove="removeLink"
      @on-up="upLink"
      @on-down="downLink">
      </LSRecentLink>
      <LSTopLink v-if="showModule('Top')" 
      @on-click="redirect"
      @on-remove="removeLink"
      @on-up="upLink"
      @on-down="downLink">
      </LSTopLink>
      <LinkCardItem v-loading="loading.allLinkLoading" :links="links" title="All" :listType="theme.listTypeEnum"
      @on-click="redirect"
      @on-remove="removeLink"
      @on-up="upLink"
      @on-down="downLink">
      </LinkCardItem>
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
import LSRecentLink from './RecentLink.vue';
import LSTopLink from './TopLink.vue';
import LinkCardItem from './LinkItems.vue';
import apis from "../assets/repository/apis";
import { mapGetters, mapState } from "vuex";

function isUrl(text) {
  return text.indexOf("http") >= 0 || text.indexOf("https") >= 0;
}

export default {
  name: "LinkPanel",
  components:{LSRecentLink, LSTopLink, LinkCardItem},
  data() {
    return {
      dialog: {
        addLinkDialogVisiable: false
      },
      loading:{
        allLinkLoading: false
      },
      newLink: {
        name: "",
        title: "",
        url: ""
      },
      edit: false,
      recentLinks: []
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
    removeLink: function(link) {
      let _this = this;
      this.loading.allLinkLoading = true;
      this.$store.dispatch('removeLink', link.id).finally(x => _this.loading.allLinkLoading = false);
    },
    upLink: function(link){
      let _this = this;
      this.loading.allLinkLoading = true;
      this.$store.dispatch('upLink', link.id)
      .then(response => {
        this.$store.dispatch('getAllLink');
      }).finally(e =>  _this.loading.allLinkLoading = false);;
    },
    downLink: function(link){
      let _this = this;
      this.loading.allLinkLoading = true;
      this.$store.dispatch('downLink', link.id)
      .then(response => {
        this.$store.dispatch('getAllLink');
      }).finally(e =>  _this.loading.allLinkLoading = false);
    },
    showModule: function(moduleName){
      return this.$store.getters.isShowModule(moduleName);
    }
  },
  mounted() {
    let _this = this;
    _this.loading.allLinkLoading = true;
    _this.$store.dispatch('getAllLink').then(x => _this.loading.allLinkLoading = false);

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
