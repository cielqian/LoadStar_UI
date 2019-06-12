<template>
  <el-row class="searcher" data-intro="切换百度搜索或者搜索书签">
    <el-radio-group v-model="searchType" class="tab">
      <el-radio-button label="1">{{$t('searcher.lblBaidu')}}</el-radio-button>
      <el-radio-button label="0">{{$t('searcher.lblBookmark')}}</el-radio-button>
    </el-radio-group>
    <!-- <el-button-group class="tab">
        <el-button type="primary" @click="searchType = '1'" :class="(searchType == '1') ? 'ls_bg_black': 'ls_bg_white ls_bd_black ls_fg_black'">{{$t('searcher.lblBaidu')}}</el-button>
        <el-button type="primary" @click="searchType = '0'" :class="(searchType == '0') ? 'ls_bg_black': 'ls_bg_white ls_bd_black ls_fg_black'">{{$t('searcher.lblBookmark')}}</el-button>
    </el-button-group>-->
    <el-input
      clearable
      v-model="searchContent"
      maxlength="150"
      @focus="()=>{focusSearch=true}"
      @blur="()=>{focusSearch=visible.searchResult}"
      @keyup.enter.native="search"
      ref="searchInputCtrl"
      placeholder="请输入内容，并按Enter搜索"
      class="input-with-select"
      :class="focusSearch?'max_width':'max_width'"
    >
    </el-input>
    <el-row
      v-show="visible.searchResult"
      class="result_list ls_bg_white ls_padding_5"
      style="border-top: none !important"
    >
      <el-row>
        <el-col :span="24">
          <el-table :data="searchLinks" :show-header="false" v-loading="loading">
            <el-table-column prop="title">
              <template slot-scope="scope">
                <div
                  class="ls_pointer highlight1"
                  v-html="renderTitle(scope.row.title)"
                  @click="redirect(scope.row)"
                ></div>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row class="ls_padding_5_l">
        <el-col
          :span="24"
          class="ls_text_center ls_pointer"
          @keyup.esc.native="hiddenSearch"
          @click.native="hiddenSearch"
        >
          <i class="el-icon-arrow-up"></i>
          {{ $t('searcher.lblClose')}}
          <small>({{$t('searcher.lblClose2')}})</small>
        </el-col>
      </el-row>
    </el-row>
  </el-row>
</template>
<script>
import keyListener from "../utils/keyListener";
import linkApi from "../api/link";
import { mapGetters, mapState } from "vuex";
// import 'intro.js/introjs.css';
export default {
  name: "Searcher",
  data() {
    return {
      searchType: "1",
      searchContent: "",
      searchEngine: {
        baidu: "https://www.baidu.com/s?wd=",
        mbaidu: "https://m.baidu.com/s?wd=",
        bing: "https://bing.com/search?q=",
        zhihu: "http://www.zhihu.com/search?type=content&q=",
        chandao: "http://ztpm.goldwind.com.cn:9898/pro/search-index.html?words="
      },
      currentSearchEngine: "baidu",
      visible: {
        searchResult: false
      },
      loading: false,
      focusSearch: false,
      searchLinks: []
    };
  },
  methods: {
    openContentMenu(link, vnode) {
      this.$refs.contextmenu.show(
        link,
        vnode.clientX,
        vnode.clientY,
        "view,removeOften,edit"
      );
    },
    search: function() {
      let _this = this;
      _this.searchLinks = [];
      this.visible.searchResult = false;
      this.loading = true;
      if (!!this.searchContent) {
        switch (this.searchType) {
          case "0":
            this.visible.searchResult = true;
            // document.getElementById("baiduIframe").src = this.searchEngine.mbaidu + this.searchContent;
            // document.getElementById("bingIframe").src = this.searchEngine.bing+ this.searchContent;
            linkApi.fullTextSearchLinks(this.searchContent).then(res => {
              _this.searchLinks = res.data.items;
              _this.loading = false;
            });
            break;
          // case "1":
          //     window.open(this.searchEngine.baidu + this.searchContent);
          //     break;
          // case "2":
          //     window.open(this.searchEngine.bing + this.searchContent);
          //     break;
          default:
            window.open("https://www.baidu.com/s?wd=" + this.searchContent);
            break;
        }
      }
    },
    redirect(link) {
      this.$store.dispatch("visitLink", link);
    },
    renderTitle(title) {
      let titleString = title;
      // let replaceReg = new RegExp(this.searchContent, 'gi');
      // let replaceString = '<span class="highlight">' + this.searchContent + '</span>';
      // titleString = titleString.replace(replaceReg, replaceString);
      return title;
    },
    hiddenSearch: function() {
      this.visible.searchResult = false;
      this.focusSearch = false;
    }
  },
  created() {
    let _this = this;
    // document.onkeydown = function(event){
    //     var e = event || window.event || arguments.callee.caller.arguments[0];
    //     if(e && e.keyCode==27){
    //         _this.hiddenSearch();
    //     }
    //     else if(e.keyCode==192){
    //       _this.searchType = (_this.searchType == '1' ? '0':'1');
    //       _this.searchContent = '';
    //       _this.$refs.searchInputCtrl.focus();

    //     }
    // };
    keyListener.init();
    keyListener.listen("27", () => {
      _this.hiddenSearch();
    });
    keyListener.listen("17+40", () => {
      _this.searchType = _this.searchType == "1" ? "0" : "1";
      _this.searchContent = "";
      _this.$refs.searchInputCtrl.focus();
    });
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/base.scss";
$tabWidth: 132px;

.searcher {
  .tab {
    float: left;
    width: $tabWidth;
  }

  .result_list {
    border: 1px solid $primaryGrey;
  }

  .max_width {
    margin-left: $tabWidth;
    width: calc(100% - 132px);
    display: inherit !important;
  }

  .min_width {
    margin-left: $tabWidth;
    width: 250px;
    display: inherit !important;
  }
}
</style>
<style lang="scss">
.searcher {
  .tab {
    span {
      padding: 12px 12px !important;
    }
  }
}
</style>


