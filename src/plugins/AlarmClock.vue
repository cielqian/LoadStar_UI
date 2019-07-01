<template>
  <div class="ls_text_center">
    <el-row>
      <el-col>
        <el-table :data="alarmClocks" :show-header="false" empty-text="暂无提醒">
          <el-table-column prop="alarmTime">
            <template slot-scope="scope">
              {{formatTime(scope.row.alarmTime)}}
            </template>
          </el-table-column>
          <el-table-column prop="alarmTime">
            <template slot-scope="scope">
              {{scope.row.comment}}
            </template>
          </el-table-column>
          <el-table-column prop="id" align="right">
            <template slot-scope="scope">
              <i class="el-icon-close ls_pointer" @click="removeAlarmClock(scope.row.id)"></i>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row v-show="visiable.addPanel">
      <el-col>
        <el-time-picker
        style="width:100%"
          v-model="alarmTime"
          type="time"
          placeholder="选择日期时间"
          format="HH:mm"
          value-format="yyyy-MM-dd HH:mm:00"
          size="mini"
        ></el-time-picker>
      </el-col>
      <el-col class="ls_margin_top_10">
        <el-input size="mini" clearable v-model="alarmContent" placeholder="提醒内容"></el-input>
      </el-col>
      <el-col  class="ls_margin_top_10">
        <el-button style="width:25%" size="mini" icon="el-icon-close" @click="() => {this.visiable.addPanel=false;}"></el-button>
        <el-button style="width:25%" size="mini" icon="el-icon-check" @click="addAlarmClock"></el-button>
      </el-col>
    </el-row>
    <el-row v-show="!visiable.addPanel">
      <el-col>
        <el-button style="width:25%" size="mini" icon="el-icon-plus" @click="showAddPanel"></el-button>
      </el-col>
    </el-row>
    
  </div>
</template>
<script>
import moment from 'moment';
import {mapState} from 'vuex';
export default {
  name: "P_AlarmClock",
  data() {
    return {
      alarmTime: "",
      alarmContent: '',
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      visiable:{
        addPanel: false
      }
    };
  },
  methods: {
    showAddPanel(){
      this.visiable.addPanel=true;
      this.alarmTime = new Date();
      this.alarmContent = '';
    },
    addAlarmClock: function() {
      let _this = this;
      let clock = {
        alarmTime: _this.alarmTime,
        comment: _this.alarmContent
      };
      _this.$store.dispatch("createAlarmClock", clock).then(() => {
        _this.visiable.addPanel=false;
      });
    },
    removeAlarmClock: function(id){
      this.$store.dispatch("removeAlarmClock", id);
    },
    queryAllAlarmClock: function(){
      let _this = this;
      this.$store.dispatch("queryAllAlarmClock");
    },
    formatTime(date){
      return moment(date).format("HH:mm");
    }
  },
  computed: {
    ...mapState({
      alarmClocks: state => state.user.alarmClocks
    })
  },
  created() {
    this.queryAllAlarmClock();
  }
};
</script>

