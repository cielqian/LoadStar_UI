<template>
  <el-row class="tag_link">
    <el-col :span="dyspan" class="ls_padding_right_15">
      <el-row>
        <el-input
          v-if="visible.inputVisible"
          v-model="newTag.name"
          class="input-new-tag"
          ref="saveTagInput"
          size="small"
          placeholder="回车创建"
          @keyup.enter.native="createTag"
          @blur="triggerInput"
        ></el-input>
        <el-button
          v-else
          class="button-new-tag"
          size="small"
          @click="triggerInput"
        >+ {{$t('detail.lblNewTag')}}</el-button>
        <el-tag
          :key="tag.id"
          v-for="tag in tags"
          :type="tag.type"
          effect="plain"
          closable
          @close="handleClose(tag)"
        >
          <span @click="nodeClick(tag)" class="ls_pointer">{{tag.name}}&nbsp;({{tag.linkCount}})</span>
        </el-tag>
      </el-row>
    </el-col>
    <el-col v-show="visible1" :span="18" class="link_content ls_content ls_bg_white">
      <el-table :data="links" :show-header="false" empty-text="Nothing more" @row-dblclick="redirect">
        <el-table-column>
          <template slot-scope="scope">
            <div class="ls_icon_sm" :link="scope.row">
              <img
                class="ls_inline ls_icon_sm"
                :src="scope.row.icon"
                onerror="javascript:this.src='/static/logo.png'"
              >
              <div
                draggable="true"
                class="ls_inline ls_padding_left_5 ls_pointer"
                @click="redirect(scope.row)"
              >{{scope.row.title}}</div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>
<script>
import keyListener from "../utils/keyListener";
import LinkCardItem from "./LinkItems.vue";
import { mapGetters, mapState } from "vuex";
import api from "../api/link";
export default {
  name: "LSTag",
  data() {
    return {
      newTagName: "",
      selectedTagId: 0,
      selectedTag:{},
      visible1: false,
      visible: {
        inputVisible: false
      },
      dyspan: 20,
      links: [],
      newTag: {
        name: ""
      },
      screenHeight: 600
    };
  },
  components: { LinkCardItem },
  methods: {
    triggerInput() {
      this.visible.inputVisible = !this.visible.inputVisible;
      if (this.visible.inputVisible) {
        this.$nextTick(_ => {
          this.$refs.saveTagInput.focus();
        });
      }
    },
    createTag() {
      let _this = this;
      this.visible.inputVisible = false;
      if (!this.newTag.name) {
        return;
      }
      let d = { name: this.newTag.name };
      this.$store.dispatch("createTag", d);
      this.newTag.name = "";
      this.$refs.saveTagInput.blur();
    },
    handleClose(tag) {
      let _this = this;
      _this
        .$confirm("确认删除标签: " + tag.name + " ?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          _this.$store.dispatch("removeTag", tag.id);
        });
    },
    nodeClick(node) {
      let _this = this;
      _this.dyspan = 6;
      if (_this.selectedTagId == node.id) {
        return;
      }
      _this.selectedTagId = node.id;
      _this.selectedTag= node;
      api.getAllLinksUnderTag(node.id).then(res => {
        _this.visible1 = true;
        _this.links = res.data;
      });
    },
    redirect(row) {
      this.$store.dispatch("visitLink", row);
    },
    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <i class="el-icon-news" />
          <span>{node.label}</span>
        </span>
      );
    }
  },
  computed: {
    ...mapState({
      tags: state => state.tag.allTag
    })
  },
  mounted() {
    let _this = this;
    _this.$store.dispatch("getAllTag");
    keyListener.init();
    keyListener.listen("17+40", () => {
      _this.triggerInput();
    });
  }
};
</script>
<style lang="scss">
.el-tag {
  margin-left: 10px;
  margin-top: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  margin-top: 10px;
  padding-top: 0;
  padding-bottom: 0;
  width: 100px;
}
.input-new-tag {
  width: 150px;
  margin-left: 10px;
  vertical-align: bottom;
  margin-top: 10px;
  padding-top: 0;
  padding-bottom: 0;
}

.tag_link {
  height: 100%;
  .link_content {
    overflow: scroll;
    height: 100%;
  }
}

.el-popover {
  padding: 0px;
}

.popover_menu {
  list-style: none;
  padding-left: 0px;
  margin-block-end: 0px;
  margin-block-start: 0px;

  li {
    padding: 5px 0px;
    font-size: 0.9rem;
  }

  li:hover {
    background-color: #000;
    color: #fff;
  }
}
</style>


