<template>
  <div class="ls_text_center">
    <el-col>
      <el-time-picker
        v-model="alarmTime"
        type="time"
        placeholder="选择日期时间"
        format="HH:mm"
        arrow-control
      ></el-time-picker>
    </el-col>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "P_AlarmClock",
  data() {
    return {
      alarmTime: "",
      pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        }
    };
  },
  computed: {},
  created() {}
};
</script>

