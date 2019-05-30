<template>
  <el-row class="container passbook_container">
    <el-col>
      <el-button icon="el-icon-plus" circle @click="visiable.passbookDetail = true"></el-button>
      <el-input
        v-show="visiable.search"
        @keyup.enter.native="search"
        @clear="getAll"
        class="search_input"
        v-model="filter.text"
        clearable
        placeholder="按回车搜索"
        ref="searchInput"
      >
        <el-button slot="append" icon="el-icon-d-arrow-left" @click="visiable.search = false;"></el-button>
      </el-input>
      <el-button
        v-show="!visiable.search"
        icon="el-icon-search"
        circle
        @click="visiable.search = true;"
      ></el-button>
    </el-col>

    <el-col class="passbook_list">
      <el-table :data="passbooks" stripe>
        <el-table-column prop="note" label width="80">
          <template slot-scope="scope">
            <i
              class="el-icon-document-copy ls_pointer"
              @click="doCopy(scope.row.note + '，账号：' + scope.row.username + '，密码：' + scope.row.password + '，网址：'+ scope.row.link)"
            ></i>
            <i class="el-icon-edit ls_pointer ls_padding_left_5" @click="edit(scope.row)"></i>
            <i class="el-icon-delete ls_pointer ls_padding_left_5" @click="remove(scope.row)"></i>
          </template>
        </el-table-column>
        <el-table-column prop="note" label="备注" width="200"></el-table-column>

        <el-table-column label="账号" width="200" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.username }}</span>
            <i class="el-icon-document-copy ls_pointer" @click="doCopy(scope.row.username)"></i>
          </template>
        </el-table-column>
        <el-table-column label="密码" width="200" align="center">
          <template slot-scope="scope">
            <!-- <span style="margin-left: 10px">{{scope.row.password}}</span>
            <i class="el-icon-document-copy ls_pointer" @click="doCopy(scope.row.password)"></i>-->
            <!-- <i class="el-icon-view ls_pointer" @click="view(scope.row)"></i> -->
            <el-button type="text" @click="doCopy(scope.row.password)">复制密码</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="link" label="网址">
          <template slot-scope="scope">
            <div v-if="!!scope.row.link">
              <el-button type="text" @click="doCopy(scope.row.link)">复制网址</el-button>
              <el-button type="text" @click="redirect(scope.row)">跳转链接</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="ls_text_right ls_padding_5"
        background
        layout="prev, pager, next"
        :page-size="pagination.size"
        :current-page.sync="pagination.current"
        :total="pagination.total"
        @current-change="getAll"
      ></el-pagination>
    </el-col>

    <el-dialog
      :title="$t('passbook.lblPassbook')"
      :visible.sync="visiable.passbookDetail"
      width="30%"
      :closeOnClickModal="false"
      @close="reset"
    >
      <el-form label-width="80px">
        <el-form-item :label="$t('passbook.lblUsername')">
          <el-input v-model="passbook.username"></el-input>
        </el-form-item>
        <el-form-item :label="$t('passbook.lblPassword')">
          <el-input v-model="passbook.password" show-password></el-input>
        </el-form-item>
        <el-form-item :label="$t('passbook.lblNote')">
          <el-input v-model="passbook.note"></el-input>
        </el-form-item>
        <el-form-item :label="$t('passbook.lblLink')">
          <el-input v-model="passbook.link"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="visiable.passbookDetail = false">{{$t('passbook.btnCancel')}}</el-button>
        <el-button type="primary" @click="save">{{$t('passbook.btnSave')}}</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>
<script>
import Vue from "vue";
import VueClipboard from "vue-clipboard2";
import passbookApi from "../api/passbook";

Vue.use(VueClipboard);

export default {
  name: "Passbook",
  data() {
    return {
      visiable: {
        passbookDetail: false,
        search: false
      },
      filter: {
        text: ""
      },
      pagination: {
        total: 0,
        current: 1,
        size: 10
      },
      passbook: {
        url: "",
        note: "",
        username: "",
        password: ""
      },
      passbooks: []
    };
  },
  computed: {
    showPassword(row) {
      if (row.view) {
        return row.password;
      }
    }
  },
  methods: {
    reset() {
      this.passbook = {
        url: "",
        note: "",
        username: "",
        password: ""
      };
    },
    doCopy(text) {
      this.$copyText(text).then(x => {
        this.$message({
          message: "复制成功",
          type: "success",
          duration: "1000"
        });
      });
    },
    save() {
      let _this = this;

      if (!!this.passbook.id) {
        passbookApi.update(this.passbook.id, this.passbook).then(() => {
          _this.visiable.passbookDetail = false;
          _this.reset();
          _this.getAll();
        });
      } else {
        passbookApi.createPassbook(this.passbook).then(() => {
          _this.visiable.passbookDetail = false;
          _this.reset();
          _this.getAll();
        });
      }
    },
    remove(row) {
      let _this = this;
      this.$confirm("确定删除 " + row.note + " ？").then(() => {
        passbookApi.remove(row.id).then(() => {
          _this.getAll();
        });
      });
    },
    edit(row) {
      this.visiable.passbookDetail = true;
      this.passbook = Object.assign({}, row);
    },
    getAll() {
      let _this = this;
      let filter = Object.assign({}, _this.pagination);
      if (!!_this.filter.text) {
        filter = Object.assign({}, filter, { note: _this.filter.text });
      }
      passbookApi.getAll(filter).then(res => {
        _this.passbooks = res.data.items;
        _this.pagination.total = parseInt(res.data.total);
      });
    },
    search() {
      let _this = this;
      this.pagination.current = 1;
      this.getAll();
    },
    view(row) {
      this.$nextTick(() => {
        row.view = true;
      });
    },
    redirect(row) {
      window.open(row.link);
    }
  },
  created() {
    this.getAll();
  }
};
</script>
<style lang="scss" scoped>
.passbook_container {
  .search_input {
    width: 250px;
  }

  .passbook_list {
    .el-button {
      padding: 0px;
    }
  }
}
</style>

