<template>
  <div>
    <el-row>
      <el-col :span="6" class="ls_padding_right_15">
        <el-row>
          <el-col :span="24">
            <el-input
              placeholder="输入标签名称，并按回车创建"
              suffix-icon="el-icon-circle-plus-outline"
              v-model="newTagName"
              @keyup.enter.native="createTag"
            ></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-tag class="ls_pointer" @click.native="nodeClick()">全部</el-tag>
          <el-tag
            :key="tag.id"
            v-for="tag in tags"
            :type="tag.type"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >
            <span @click="nodeClick(tag)" class="ls_pointer">{{tag.name}}&nbsp;({{tag.linkCount}})</span>
          </el-tag>
        </el-row>
      </el-col>
      <el-col v-show="visible1" :span="18" class="ls_content ls_bg_white">
        <LinkCardItem
          :links="links"
          :listType="'List'"
          :iconClass="'ls_icon_sm'"
          @on-click="redirect"
          @onChanged="nodeClick"
        ></LinkCardItem>

        <!-- <el-table highlight-current-row :data="links" :show-header="false">
          <el-table-column>
            <template slot-scope="scope">
              <div class="icon">
                <img
                  class="ls_inline ls_icon_sm"
                  :src="scope.row.icon"
                  onerror="javascript:this.src='/static/logo.png'"
                >
                <div
                  class="ls_pointer ls_inline ls_padding_left_5"
                  @click="redirect(scope.row)"
                >{{scope.row.title}}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column width="50">
            <template slot-scope="scope">
              <el-popover placement="bottom" width="50" trigger="click">
                <ul class="popover_menu ls_text_center">
                  <li class="ls_pointer" @click="removeLink(scope.row)">删除</li>
                  <li class="ls_pointer">编辑</li>
                </ul>
                <i slot="reference" class="el-icon-more ls_pointer"></i>
              </el-popover>
            </template>
          </el-table-column>
        </el-table> -->
      </el-col>
    </el-row>
  </div>
</template>
<script>
import LinkCardItem from "./LinkItems.vue";
import { mapGetters, mapState } from "vuex";
import api from "../api/link";
export default {
  name: "LSTag",
  data() {
    return {
      newTagName: "",
      selectedTagId: 0,
      visible1: false,
      links: []
    };
  },
  components: { LinkCardItem },
  methods: {
    createTag() {
      if (!this.newTagName) {
        return;
      }
      let d = { name: this.newTagName };
      this.$store.dispatch("createTag", d);
      this.newTagName = "";
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
      if (!!node) {
        if (_this.selectedTagId == node.id) {
          return;
        }
        _this.selectedTagId = node.id;
        api.getAllLinksUnderTag(node.id).then(res => {
          _this.visible1 = true;
          _this.links = res.data;
        });
      } else {
        _this.selectedTagId = 0;
        _this.visible1 = true;
        _this.links = [..._this.$store.state.link.allLink];
      }
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
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
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


