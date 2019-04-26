<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-form label-width="80px">
          <el-form-item :label="$t('detail.lblUrl')">
            <el-input ref="linkUrl" v-model="link.url"></el-input>
          </el-form-item>
          <!-- <el-form-item label="名称">
            <el-input v-model="link.name"></el-input>
          </el-form-item> -->
          <el-form-item :label="$t('detail.lblTitle')">
            <el-input v-model="link.title" :disabled="analysising" :placeholder="analysisHolder"></el-input>
          </el-form-item>
          <el-form-item v-if="!link.id" :label="$t('detail.lblIsOften')">
            <el-switch v-model="link.isOften"></el-switch>
          </el-form-item>
          <el-form-item :label="$t('detail.lblFolder')">
            <el-select
              class="ls_pull_left"
              style="width:50%"
              v-model="link.folderId"
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
      // newLink: {
      //   id:'',
      //   folderId: "",
      //   name: "",
      //   title: "",
      //   url: "",
      //   tags: "",
      //   isOften: true
      // },
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
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    analysisLink: function(url) {
      var _this = this;
      if (!isUrl(url)) {
        return;
      }
      _this.link.url = url;
      _this.link.folderId = '';
      var d = {
        url: url
      };
      _this.analysisHolder = '解析中...',
      _this.analysising = true;
      _this.$store.dispatch("analysisLink", d).then(response => {
        _this.analysising = false;
        _this.link.name = response.data.name;
        _this.link.title = response.data.title;
        if (!_this.link.title) {
          _this.analysisHolder = '解析失败，请手动完善标题...';
        }
        _this.link.icon = response.data.icon;
        _this.link.folderId = "未归档";
        _this.selectedTag = [];
        _this.unSelectedTag = [..._this.tags];
      }).catch(err => {
          _this.analysising = false;
          _this.analysisHolder = '解析失败，请手动完善标题...';
          _this.link.folderId = "未归档";
          _this.selectedTag = [];
          _this.unSelectedTag = [..._this.tags];
      });
    },
    saveLink: function(cb) {
      let tagsId = [];
      this.selectedTag.forEach(element => {
        tagsId.push(element.id);
      });

      var d = {
        id: this.link.id,
        name: this.link.name,
        title: this.link.title,
        folderId: this.link.folderId == "未归档" ? "" : this.link.folderId,
        url: this.link.url,
        icon: this.link.icon,
        tags: tagsId,
        isOften: this.link.isOften
      };

      if (!!this.link.id) {
        this.$store.dispatch("updateLink", d).then(res => {
          if (!!cb) {
            cb();
          }
        });
      } else {
        this.$store.dispatch("createLink", d).then(res => {
          if (!!cb) {
            cb();
          }
        });
      }

      // this.link.name = "";
      // this.link.title = "";
      // this.link.url = "";
      // this.link.icon = "";
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


