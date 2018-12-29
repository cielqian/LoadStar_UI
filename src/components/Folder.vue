<template>
  <div>
    <el-row>
      <el-col :span="4">
        <el-input suffix-icon="el-icon-circle-plus-outline"
         v-model="createFolderModel.name" placeholder="文件夹名称"
         @keyup.enter.native="createFolder">
        </el-input>

        <el-tree
          class="ls_margin_top_15"
          ref="folderTree"
          :data="folders"
          :props="folderProps"
          @node-click="nodeClick"
        >
          <span class="custom-tree-node ls_padding_right_15" style="width:100%" slot-scope="{ node, data }">
            <i v-if="data.name == '回收站'" class="el-icon-delete"/>
            <i v-else-if="data.name == '未归档'" class="el-icon-tickets"/>
            <i v-else class="el-icon-news"/>
            <span :id="data.id">{{node.label}}</span>
            <i v-if="!data.system" class="el-icon-close ls_pull_right"></i>
          </span>
        </el-tree>
      </el-col>
      <el-col v-show="visible1" :span="18" class="ls_content ls_bg_white" style="margin-left: 50px">
        <el-table
          v-loading="loading.linkList"
          :data="links"
          :show-header="false"
          @row-dblclick="redirect"
        >
          <el-table-column>
            <template slot-scope="scope">
              <div draggable="true" class="ls_pointer" @click="redirect(scope.row)" @dragstart="dragStart($event, scope.row.id)">{{scope.row.title}}</div>
            </template>
          </el-table-column>
          <el-table-column width="50">
            <template slot-scope="scope">
              <el-popover placement="bottom" width="50px" trigger="click">
                <ul class="popover_menu ls_text_center">
                  <li class="ls_pointer" @click="redirect(scope.row)">浏览</li>
                  <li class="ls_pointer" @click="removeLink(scope.row)">删除</li>
                </ul>
                <i slot="reference" class="el-icon-more ls_pointer"></i>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
        <el-row v-if="links.length > 0 && selectedFolderName == '回收站'">
          <el-col class="ls_padding_left_15">
            <el-button type="text" @click="deleteByFolder" class="ls_fg_blue">清空</el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import api from "../api/link";
export default {
  name: "LSFolder",
  data() {
    return {
      visible1: false,
      folderProps: {
        children: "childs",
        label: "name"
      },
      loading: {
        linkList: true,
        folderTree: true
      },
      createFolderModel: {
        name: ""
      },
      selectedFolderId: 0,
      selectedFolderName: "",
      links: []
    };
  },
  computed: {
    ...mapState({
      folders: state => state.folder.allFolder
    })
  },
  methods: {
    redirect(row) {
      this.$store.dispatch("visitLink", row.id);
      window.open(row.url);
    },
    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <i v-if="data.name == '回收站'" class="el-icon-delete" />
          <i v-else class="el-icon-news" />
          <span>{node.label}</span>
        </span>
      );
    },
    getAllFolder() {
      let _this = this;
      _this.loading.folderTree = true;
      _this.$store.dispatch("getAllFolder").then(() => {
        _this.loading.folderTree = false;
        let nodes = document.getElementsByClassName("custom-tree-node");
        for (let node of nodes) {
          node.ondragover = function(e) {
            e.preventDefault(); // 表示允许放置
          };

          node.ondrop = function(e) {
            e.preventDefault(); // 表示允许放置
            var linkId = e.dataTransfer.getData("LinkId");
            console.log(linkId);
            console.log(e.target.id);
            let folderId = e.target.id;
            api.movelink(linkId, folderId).then(res => {
              api.getAllLinksUnderFolder(_this.selectedFolderId).then(res => {
                _this.links = res.data;
              });
            });
          };
        }
      });
    },
    nodeClick(node) {
      let _this = this;
      if (_this.selectedFolderId == node.id) {
        return;
      }
      _this.links = [];
      _this.selectedFolderId = node.id;
      _this.selectedFolderName = node.name;
      _this.loading.linkList = true;
      api.getAllLinksUnderFolder(node.id).then(res => {
        _this.loading.linkList = false;
        _this.visible1 = true;
        _this.links = res.data;
      });
    },
    createFolder() {
      let _this = this;
      if (!!this.createFolderModel.name) {
        _this.$store
          .dispatch("createFolder", {
            name: _this.createFolderModel.name,
            parentId: 0
          })
          .then(() => {
            _this.createFolderModel.name = "";
            _this.getAllFolder();
          });
      }
    },
    removeLink(row) {
      let _this = this;
      _this.$confirm("" + row.name, "确认删除").then(() => {
        if (_this.selectedFolderName == "回收站") {
          _this.$store.dispatch("removeLink", row.id).then(() => {
            api.getAllLinksUnderFolder(_this.selectedFolderId).then(res => {
              _this.links = res.data;
            });
          });
        } else {
          _this.$store.dispatch("trashLink", row.id).then(() => {
            api.getAllLinksUnderFolder(_this.selectedFolderId).then(res => {
              _this.links = res.data;
            });
          });
        }
      });
    },
    deleteByFolder() {
      let _this = this;
      api.deleteByFolder(_this.selectedFolderId).then(res => {
        api.getAllLinksUnderFolder(_this.selectedFolderId).then(res => {
          _this.links = res.data;
        });
      });
    },
    dragStart(e, id) {
      e.dataTransfer.setData("LinkId", id);
    },
    drogEnd(event) {
      event.preventDefault();
      console.log(123);
    },
    allowDrag(event) {
      event.preventDefault();
    },
    drop(a) {
      console.log(a);
    }
  },
  mounted() {
    let _this = this;

    this.getAllFolder();
  }
};
</script>
<style lang="scss">
.el-tree-node {
  padding: 3px;
}

.el-tree-node:focus > .el-tree-node__content,
.is-current {
  background-color: #000 !important;
  color: #fff;
}

.is-current > .el-tree-node__content:hover {
  background-color: #000 !important;
  color: #fff;
}

.el-tree-node__content:hover {
  background-color: #fff;
  color: #ccc;
}

.el-tree-node__content {
  padding: 3px;
}

.custom-tree-node span {
  padding-left: 5px;
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


