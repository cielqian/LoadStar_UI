<template>
  <div>
    <el-row>
      <el-col :span="5">
        <el-tree
          ref="folderTree"
          :data="folders"
          :props="folderProps"
          @node-click="nodeClick">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <i class="el-icon-news" />
          <span :id="data.id">{{node.label}}</span>
        </span>
        </el-tree>
      </el-col>
      <el-col v-show="visible1" :span="18" class="ls_content ls_bg_white ls_margin_left_15">
       
        <el-table highlight-current-row :data="links" :show-header="false" @row-dblclick="redirect">
          <el-table-column>
            <template slot-scope="scope">
              <div draggable="true" @dragstart="dragStart($event, scope.row.id)" >{{scope.row.title}}</div>
            </template>
          </el-table-column>
          <el-table-column width="50">
            <template slot-scope="scope">
              <el-popover placement="bottom" width="50px" trigger="click">
                <ul class="popover_menu ls_text_center">
                  <li class="ls_pointer" @click="removeLink(scope.row)">删除</li>
                  <li class="ls_pointer">编辑</li>
                </ul>
                <i slot="reference" class="el-icon-more ls_pointer"></i>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
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
          <i class="el-icon-news" />
          <span>{node.label}</span>
        </span>
      );
    },
    nodeClick(node) {
      let _this = this;
      if (_this.selectedFolderId == node.id) {
        return;
      }
      _this.selectedFolderId = node.id;
      _this.selectedFolderName = node.name;
      api.getAllLinksUnderFolder(node.id).then(res => {
        _this.visible1 = true;
        _this.links = res.data;
      });
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
    dragStart(e, id){
      e.dataTransfer.setData("LinkId", id);
    },
    drogEnd(event){
       event.preventDefault();
      console.log(123);
    },
    allowDrag(event){
      event.preventDefault();
    },
    drop(a){
      console.log(a);
    }
  },
  mounted() {
    let _this = this;

    _this.$store.dispatch("getAllFolder").then(() => {
      
      let nodes = document.getElementsByClassName('custom-tree-node');
      for(let node of nodes) {  
        node.ondragover = function (e) {
          e.preventDefault(); // 表示允许放置
        }

        node.ondrop = function (e) {
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
        }
      };
    });
  }
};
</script>
<style lang="scss">
.el-tree-node {
  padding: 3px;
}

.el-tree-node:focus > .el-tree-node__content,
.is-current {
  background-color: #000;
  color: #fff;
}

.is-current > .el-tree-node__content:hover {
  background-color: #000;
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


