<template>
  <div>
    <!-- <div v-show="tipReadedInfo.drag">
      <el-alert title="链接可直接拖动到文件夹" type="warning" close-text="知道了" show-icon @close="closeTip"></el-alert>
    </div> -->
    <el-row>
      <el-col :span="6" class="ls_padding_right_15">
        <el-input suffix-icon="el-icon-circle-plus-outline"
         v-model="createFolderModel.name" placeholder="输入文件夹名称，并按回车创建" maxlength="8"
         @keyup.enter.native="createFolder" :disabled="createFolderModel.disabled">
        </el-input>
        <el-tree
          class="ls_margin_top_15"
          :class="{'dragarea':onMove}"
          ref="folderTree"
          :data="folders"
          node-Key="id"
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
      <el-col v-show="visible1" :span="18" class="ls_content ls_bg_white">
        <el-row v-show="!tipInfo.drag">
          <el-col :span="24">
            <el-alert title="链接可直接拖动到文件夹" type="warning" close-text="知道了" show-icon @close="$store.dispatch('readTip', 'drag')"></el-alert>
          </el-col>
        </el-row>
        <el-row v-show="!tipInfo.trashLink">
          <el-col :span="24">
            <el-alert title="删除的链接可以在回收站中找回" type="warning" close-text="知道了" show-icon @close="$store.dispatch('readTip', 'trashLink')"></el-alert>
          </el-col>
        </el-row>
        <el-table
          v-loading="loading.linkList"
          :data="links"
          :show-header="false"
          :max-height="screenHeight"
          empty-text="暂无链接"
          @row-dblclick="redirect"
        >
          <el-table-column>
            <template slot-scope="scope">
              <div class="ls_icon_sm" @contextmenu.prevent="openContentMenu(scope.row, $event)" :link="scope.row">
                  <img class="ls_inline ls_icon_sm" :src="scope.row.icon" onerror="javascript:this.src='/static/logo.png'">
                  <div draggable="true" class="ls_inline ls_padding_left_5 ls_pointer" @click="redirect(scope.row)" @dragstart="dragStart($event, scope.row.id)">{{scope.row.title}}</div>
                </div>
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
    <LSContentMenu ref="contextmenu" @changed="getAllLinksUnderFolder"></LSContentMenu>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import api from "../api/link";
import userApi from "../api/user";

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
      onMove: false,
      createFolderModel: {
        name: "",
        disabled: false
      },
      selectedFolderId: 0,
      selectedFolderName: "",
      firstLoaded: true,
      links: [],
      selectedLink:{},
      screenHeight:600
    };
  },
  computed: {
    ...mapState({
      folders: state => state.folder.allFolder,
      tipInfo: state => state.auth.tipInfo
    })
  },
  methods: {
    openContentMenu(link, vnode){
      if (this.selectedFolderName == '回收站') {
        this.$refs.contextmenu.show(link, vnode.clientX, vnode.clientY, 'view,addOften,delete');
      }else{
        this.$refs.contextmenu.show(link, vnode.clientX, vnode.clientY, 'view,addOften,trans');
      }
    },
    redirect(row) {
      this.$store.dispatch("visitLink", row);
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
        if (_this.firstLoaded) {
          _this.firstLoaded = false;
        }
        let nodes = document.getElementsByClassName("custom-tree-node");
        for (let node of nodes) {
          node.ondragover = function(e) {
            e.preventDefault(); // 表示允许放置
          };

          node.ondrop = function(e) {
            _this.onMove = false;
            e.preventDefault(); // 表示允许放置
            var linkId = e.dataTransfer.getData("LinkId");
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
    getAllLinksUnderFolder(){
      let _this = this;
      api.getAllLinksUnderFolder(_this.selectedFolderId).then(res => {
        _this.loading.linkList = false;
        _this.visible1 = true;
        _this.links = res.data;
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
      _this.getAllLinksUnderFolder();
    },
    createFolder() {
      let _this = this;
      _this.createFolderModel.disabled = true;

      if (!!this.createFolderModel.name) {
        _this.$store
          .dispatch("createFolder", {
            name: _this.createFolderModel.name,
            parentId: 0
          })
          .then(() => {
            _this.createFolderModel.name = "";
            _this.createFolderModel.disabled = false;
            _this.getAllFolder();
          });
      }
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
      this.onMove = true;
    },
    drogEnd(event) {
      event.preventDefault();
      this.onMove = false;
    },
    allowDrag(event) {
      event.preventDefault();
      this.onMove = false;
    },
    drop(a) {
      this.onMove = false;
    }
  },
  mounted() {
    let _this = this;
    _this.screenHeight = document.body.clientHeight - 100;
    this.getAllFolder();
    userApi.getAllTips();
  }
};
</script>
<style lang="scss">
.el-tree-node {
  padding: 3px;
}

.dragarea{
  border: 1px solid #000;
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
  width: 150px;
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


