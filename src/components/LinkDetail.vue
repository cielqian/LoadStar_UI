<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-form label-width="80px">
          <el-form-item :label="$t('detail.lblUrl')">
            <el-input ref="linkUrl" v-model="newLink.url"></el-input>
          </el-form-item>
          <!-- <el-form-item label="名称">
            <el-input v-model="link.name"></el-input>
          </el-form-item> -->
          <el-form-item :label="$t('detail.lblTitle')">
            <el-input v-model="newLink.title" :disabled="analysising" :placeholder="analysisHolder"></el-input>
          </el-form-item>
          <el-form-item v-if="!newLink.id" :label="$t('detail.lblIsOften')">
            <el-switch v-model="newLink.isOften"></el-switch>
          </el-form-item>
          <el-form-item :label="$t('detail.lblFolder')">
            <el-select
              class="ls_pull_left"
              style="width:50%"
              v-model="newLink.folderId"
              filterable
              placeholder="请选择文件夹"
            >
              <el-option v-for="item in folders" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('detail.lblTag')">
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
                <el-button v-else class="button-new-tag" size="small" @click="showInput">+ {{$t('detail.lblNewTag')}}</el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
function isUrl(text) {
  return text.indexOf("http") >= 0 || text.indexOf("https") >= 0;
}

import { mapGetters, mapState } from "vuex";
export default {
  name: "LSLinkDetail",
  props: ["link"],
  data() {
    return {
      newLink: {
        id:'',
        folderId: "",
        name: "",
        title: "",
        url: "",
        tags: "",
        isOften: true
      },
      analysisHolder: '自动解析中...',
      analysising: false,
      newTag: {
        name: ""
      },
      selectedTag: [],
      unSelectedTag: [],
      visible: {
        inputVisible: false
      }
    };
  },
  computed: {
    ...mapState({
      folders: state => state.folder.allFolder,
      tags: state => state.tag.allTag
    }),
  },
  methods: {
    showInput() {
      this.visible.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.focus();
      });
    },
    analysisLink: function(url) {
      var _this = this;
      if (!isUrl(url)) {
        return;
      }
      _this.newLink.url = url;
      _this.newLink.folderId = '';
      var d = {
        url: url
      };
      _this.analysisHolder = '解析中...',
      _this.analysising = true;
      _this.$store.dispatch("analysisLink", d).then(response => {
        _this.analysising = false;
        _this.newLink.name = response.data.name;
        _this.newLink.title = response.data.title;
        if (!_this.newLink.title) {
          _this.analysisHolder = '解析失败，请手动完善标题...';
        }
        _this.newLink.icon = response.data.icon;
        _this.newLink.folderId = "未归档";
        _this.selectedTag = [];
        _this.unSelectedTag = [..._this.tags];
      }).catch(err => {
          _this.analysising = false;
          _this.analysisHolder = '解析失败，请手动完善标题...';
          _this.newLink.folderId = "未归档";
          _this.selectedTag = [];
          _this.unSelectedTag = [..._this.tags];
      });
    },
    saveLink: function(cb) {
      var _this = this;
      let tagsId = [];
      this.selectedTag.forEach(element => {
        tagsId.push(element.id);
      });

      var d = {
        id: this.newLink.id,
        name: this.newLink.name,
        title: this.newLink.title,
        folderId: this.newLink.folderId == "未归档" ? "" : this.newLink.folderId,
        url: this.newLink.url,
        icon: this.newLink.icon,
        tags: tagsId,
        isOften: this.newLink.isOften
      };

      if (!!this.newLink.id) {
        this.$store.dispatch("updateLink", d).then(res => {
          if (!!cb) {
            cb();
            _this.$emit('update:link', _this.newLink);
          }
        });
      } else {
        this.$store.dispatch("createLink", d).then(res => {
          if (!!cb) {
            cb();
          }
        });
      }

      // this.newLink.name = "";
      // this.newLink.title = "";
      // this.newLink.url = "";
      // this.newLink.icon = "";
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
    },
    selectTag: function(tag) {
      this.unSelectedTag = this._.filter(this.unSelectedTag, function(n) {
        return n.id != tag.id;
      });
      this.selectedTag.push(tag);
    },
    loadTag: function() {
      this.selectedTag = [];
      this.unSelectedTag = [...this.tags];
    },
    unSelectTag: function(tag) {
      this.selectedTag = this._.filter(this.selectedTag, function(n) {
        return n.id != tag.id;
      });

      this.unSelectedTag.push(tag);
    }
  },
  created(){
    if (!!this.link.id) {
      this.newLink = this.link;
    }else{
      this.newLink = {
        id:'',
        folderId: "",
        name: "",
        title: "",
        url: "",
        tags: "",
        isOften: true
      }
    }
  }
};
</script>
<style scoped>
.el-switch.is-checked .el-switch__core {
  border-color: #000;
  background-color: #000;
}

.el-form-item {
  margin-bottom: 10px;
}
</style>


