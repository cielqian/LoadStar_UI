<template>
    <el-row class="searcher">
      <el-input
        clearable
        v-model="searchContent"
        maxlength="50"
        @keyup.enter.native="search"
        ref="searchInputCtrl"
        placeholder="请输入内容，并按回车确认"
        class="input-with-select ls_bd_black"
      >
        <el-select v-model="searchType" slot="prepend" placeholder="请选择" class="ls_no_border">
          <!-- <el-option label="全部" value="0"></el-option> -->
          <el-option label="百度" value="1"></el-option>
          <!-- <el-option label="必应" value="2"></el-option> -->
          <el-option label="书签" value="0"></el-option>
        </el-select>
      </el-input>
      <el-row v-show="visible.searchResult" class="ls_bg_white ls_padding_all_15 ls_bd_black">
      <el-row>
        <!-- <el-col :span="8" class="ls_padding_all_15">
          <el-row>
            <el-col :span="12"><span class="ls_h3">百度</span>
            <span class="ls_margin_left_15 ls_text_d ls_pointer" @click="jumpSearch('baidu')">跳转</span>
            <span class="ls_margin_left_15 ls_text_d ls_pointer" @click="fullScreen('baidu')">全屏</span>
          </el-col>
          </el-row>
          <iframe id="baiduIframe" width="100%" height="500px" class="searchIframe ls_no_border ls_scroll" src=""></iframe>
        </el-col>
        <el-col :span="8" class="ls_padding_all_15">
          <el-row>
            <el-col :span="12"><span class="ls_h3">必应</span>
              <span class="ls_margin_left_15 ls_text_d ls_pointer" @click="jumpSearch('bing')">跳转</span>
            <span class="ls_margin_left_15 ls_text_d ls_pointer" @click="fullScreen('bing')">全屏</span>
            </el-col>
          </el-row>
          <iframe id="bingIframe"  width="100%" height="500px" class="searchIframe ls_no_border" src=""></iframe>
        </el-col> -->
        <!-- <el-col :span="8" class="ls_padding_all_15">
          <el-row>
            <el-col :span="12"><span class="ls_h3">禅道</span>
            <span class="ls_margin_left_15 ls_text_d ls_pointer" @click="jumpSearch('zhihu')">跳转</span></el-col>
          </el-row>
          <iframe id="zhihuIframe"  width="100%" height="500px" class="searchIframe ls_no_border" src=""></iframe>
        </el-col>-->
        <el-col :span="24"> 
          <el-table :data="searchLinks" :show-header="false">
                <el-table-column prop="title">
                  <template slot-scope="scope">
                    <div class="ls_pointer highlight1" v-html="renderTitle(scope.row.title)" @click="redirect(scope.row)"></div>
                  </template>
                </el-table-column>
              </el-table>
        </el-col>
      </el-row>
      <el-row class="ls_padding_5_l">
        <el-col :span="24" class="ls_text_center ls_pointer" @keyup.esc.native="hiddenSearch" @click.native="hiddenSearch"><i class="el-icon-arrow-up"></i>收起<small>（按ESC）</small></el-col>
      </el-row>
      
    </el-row>
    </el-row>
</template>
<script>
import linkApi from "../api/link";
import { mapGetters, mapState } from "vuex";

export default {
    name: "Searcher",
    data() {
        return {
            searchType: "1",
            searchContent: "",
            searchEngine:{
                baidu:'https://www.baidu.com/s?wd=',
                mbaidu:'https://m.baidu.com/s?wd=',
                bing:'https://bing.com/search?q=',
                zhihu: 'http://www.zhihu.com/search?type=content&q=',
                chandao: 'http://ztpm.goldwind.com.cn:9898/pro/search-index.html?words='
            },
            currentSearchEngine:'baidu',
            visible: {
                searchResult: false
            },
            searchLinks: []
        }
    },
    methods:{
        search: function() {
            let _this = this;
            _this.searchLinks = [];
            this.visible.searchResult = false;
            if (!!this.searchContent) {
                switch (this.searchType) {
                case "0":
                    this.visible.searchResult = true;
                    // document.getElementById("baiduIframe").src = this.searchEngine.mbaidu + this.searchContent;
                    // document.getElementById("bingIframe").src = this.searchEngine.bing+ this.searchContent;
                    linkApi.fullTextSearchLinks(this.searchContent).then(res => {_this.searchLinks = res.data.items});
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
        hiddenSearch: function () {
            this.visible.searchResult = false;
        }
    },
    created(){
      let _this = this;

      document.onkeydown = function(event){   
          var e = event || window.event || arguments.callee.caller.arguments[0];   
          if(e && e.keyCode==27){ // 按 Esc    
              //要做的事情   
              _this.hiddenSearch(); 
          }
      };
    }
}
</script>

