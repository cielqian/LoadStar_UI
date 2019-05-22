<template>
  <div>
    <el-col>
      <el-input size="mini" v-model="word" placeholder="按回车翻译" @keyup.enter.native="translate" @clear="() => result=''" clearable>
         <el-button slot="append" icon="el-icon-right" @click="translate"></el-button>
      </el-input>
    </el-col>
    <el-col class="ls_padding_5">
      <span>目标语言</span>
      <el-radio-group v-model="target" size="mini">
        <el-radio-button label="英文"></el-radio-button>
        <el-radio-button label="中文"></el-radio-button>
      </el-radio-group>
    </el-col>
    <el-col class="ls_padding_5">
      {{result}}
    </el-col>
  </div>
</template>
<script>
import axios from "axios";
import sha256 from "js-sha256";
function getInput(input) {
  if (input.length == 0) {
    return null;
  }
  var result;
  var len = input.length;
  if (len <= 20) {
    result = input;
  } else {
    var startStr = input.substring(0, 10);
    var endStr = input.substring(len - 10, len);
    result = startStr + len + endStr;
  }
  return result;
}
var appKey = "42769cdbde85da9b";
var key = "k2CeAl86fqDtHg7EEetnNvuoZRbSSVL5"; 

export default {
  name: "pyoudao",
  data() {
    return {
      word: "",
      result: "",
      target:'中文'
    };
  },
  methods: {
    translate() {
      let _this = this;
      var from = _this.target == '中文' ? "en": "zh-CHS";;
      var to = _this.target == '中文' ? "zh-CHS": "en";//"zh-CHS";
      var salt = new Date().getTime();
      var curtime = Math.round(new Date().getTime() / 1000);
      var str1 = appKey + getInput(_this.word) + salt + curtime + key;
      var sign = sha256(str1);
      var instance = axios.create({
        baseURL:
          "https://bird.ioliu.cn/v2?url=http%3a%2f%2fopenapi.youdao.com%2fapi",
      });
      instance
        .post("", {
          q: _this.word,
          appKey: appKey,
          salt: salt,
          from: from,
          to: to,
          curtime: curtime,
          sign: sign,
          signType: "v3"
        })
        .then(function(res) {
          _this.result = res.data.translation[0]
        })
    }
  },
  created() {
    let _this = this;
  }
};
</script>

