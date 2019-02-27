<template>
    <el-row class="searcher">
      <el-input
        clearable
        v-model="searchContent"
        maxlength="20"
        @keyup.enter.native="search"
        ref="searchInputCtrl"
        placeholder="请输入内容，并按回车确认"
        class="input-with-select ls_bd_black"
      >
        <el-select v-model="searchType" slot="prepend" placeholder="请选择" class="ls_no_border">
          <!-- <el-option label="全部" value="0"></el-option> -->
          <el-option label="百度" value="1"></el-option>
          <!-- <el-option label="必应" value="2"></el-option>
          <el-option label="书签" value="3"></el-option> -->
        </el-select>
      </el-input>
    </el-row>
</template>
<script>
export default {
    name: "Searcher",
    data() {
        return {
            searchContent: '',
            searchType: '1'
        }
    },
    methods:{
        search: function() {
            let _this = this;
            window.open("https://www.baidu.com/s?wd=" + this.searchContent);
        // this.visible.searchResult = false;
        // if (!!this.searchContent) {
        //     switch (this.searchType) {
        //     case "0":
        //         this.visible.searchResult = true;
        //         document.getElementById("baiduIframe").src = this.searchEngine.mbaidu + this.searchContent;
        //         document.getElementById("bingIframe").src = this.searchEngine.bing+ this.searchContent;
        //         linkApi.queryLinks(this.searchContent).then(res => {_this.searchLinks = res.data.items});
        //         break;
        //     case "1":
        //         window.open(this.searchEngine.baidu + this.searchContent);
        //         break;
        //     case "2":
        //         window.open(this.searchEngine.bing + this.searchContent);
        //         break;
        //     default:
        //         window.open("https://www.baidu.com/s?wd=" + this.searchContent);
        //         break;
        //     }
        // }
        },
    }
}
</script>

