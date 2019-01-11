<template>
  <div>
    <el-row class="ls_text_center" >
      <el-col :span="24">
        <el-form label-width="80px">
          <el-form-item label="链接">
            <el-input ref="newLinkUrl" v-model="newLink.url"></el-input>
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
              <el-option v-for="item in folders" :key="item.id" :label="item.name" :value="item.id"></el-option>
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
    </el-row>
  </div>
</template>
<script>
function isUrl(text) {
  return text.indexOf("http") >= 0 || text.indexOf("https") >= 0;
}

import { mapGetters, mapState } from "vuex";
export default {
  name: "LSLink",
  props: ['linkUrl'],
  data() {
    return {
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
      visible: {
        inputVisible: false
      }
    };
  },
  computed: {
    ...mapState({
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
    analysisLink: function (url) {
      var _this = this;
      if (!isUrl(url)) {
        return;
      }
      _this.newLink.url = url;

      var d = {
        url: url
      };

      _this.$store.dispatch("analysisLink", d).then(response => {
        _this.newLink.name = response.data.name;
        _this.newLink.title = response.data.title;
        _this.newLink.icon = response.data.icon;
        _this.newLink.folderId = "未归档";
        _this.selectedTag = [];
        _this.unSelectedTag = [..._this.tags];
      });
    },
    createNewLink: function(cb) {
      let tagsId = [];
      this.selectedTag.forEach(element => {
        tagsId.push(element.id);
      });

      var d = {
        name: this.newLink.name,
        title: this.newLink.title,
        folderId: this.newLink.folderId == "未归档" ? "" : this.newLink.folderId,
        url: this.newLink.url,
        icon: this.newLink.icon,
        tags: tagsId
      };

      this.$store.dispatch("createLink", d).then(res => {
        if (!!cb) {
          cb();
        }
      });

      this.newLink.name = "";
      this.newLink.title = "";
      this.newLink.url = "";
      this.newLink.icon = "";
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
    unSelectTag: function(tag) {
      this.selectedTag = this._.filter(this.selectedTag, function(n) {
        return n.id != tag.id;
      });

      this.unSelectedTag.push(tag);
    }
  }
};
</script>

