<template>
  <div class="ls_text_center">
      <el-col>
          <span class="ls_h3">无锡</span>
          <span>当前{{now.tmp}}℃</span>
      </el-col>
      <el-col>
          今天
        {{today.txt}} <i :class="today.icon"></i> 
        {{today.low}} ~ {{today.high}}℃
      </el-col>
      <el-col>
          明天
        {{tomorrow.txt}} <i :class="tomorrow.icon"></i> 
        {{tomorrow.low}} ~ {{tomorrow.high}}℃
      </el-col>
      <el-col>
          <span v-if="highToToday">
                (比今天热)
          </span>
          <span v-else>
                (比今天冷)
          </span>
      </el-col>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name: "P_Weather",
  data() {
    return {
        now:{
            tmp:'/',
            txt:''
        },
        today:{
            low:'/',
            high:'/',
            txt: ''
        },
        tomorrow:{
            low:'/',
            high:'/',
            txt: ''
        }
    };
  },
  computed:{
      highToToday: function(){
          if (this.tomorrow.high > this.today.high) {
              return true;
          }else if(this.tomorrow.high < this.today.high){
              return false;
          }
          else{
              if(this.tomorrow.low > this.today.low){
                  return true;
              }
              return false;
          }
      }
  },
  created(){
      let _this = this;
      var instance = axios.create({
            baseURL: 'https://bird.ioliu.cn/weather',
            timeout: 1000
        });
        instance.get("", {params: {
            city:"无锡"
        }})
        .then(function(res){
            let now = res.data.now;
            _this.now = {
                tmp: now.tmp,
                txt: now.cond.txt
            };

            let today = res.data.daily_forecast[0];
            _this.today = {
                low:today.tmp.min,
                high:today.tmp.max,
                txt: today.cond.txt_d
            };

            if (_this.today.txt.indexOf('云') > -1 || _this.today.txt.indexOf('阴') > -1) {
                _this.today.icon = 'el-icon-cloudy-and-sunny'
            }
            if (_this.today.txt.indexOf('雨') > -1) {
                _this.today.icon = 'el-icon-heavy-rain'
            }
            if (_this.today.txt.indexOf('晴') > -1) {
                _this.today.icon = 'el-icon-sunny'
            }

            let tomorrow = res.data.daily_forecast[1];
            _this.tomorrow = {
                low:tomorrow.tmp.min,
                high:tomorrow.tmp.max,
                txt: tomorrow.cond.txt_d
            };
            if (_this.tomorrow.txt.indexOf('云') > -1 || _this.tomorrow.txt.indexOf('阴') > -1) {
                _this.tomorrow.icon = 'el-icon-cloudy-and-sunny'
            }
            if (_this.tomorrow.txt.indexOf('雨') > -1) {
                _this.tomorrow.icon = 'el-icon-heavy-rain'
            }
            if (_this.tomorrow.txt.indexOf('晴') > -1) {
                _this.tomorrow.icon = 'el-icon-sunny'
            }

            
        })
        .catch(function(err){
            console.log(err);
        });
  }
};
</script>

