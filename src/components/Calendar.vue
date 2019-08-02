<template>
  <div>
    <el-row>
      <el-tabs tab-position="left">
        <el-tab-pane label="浏览记录">
          <el-calendar v-model="value">
            <template slot="dateCell" slot-scope="{date, data}">
              <el-popover trigger="click">
                <!-- <el-table :data="visitList" border stripe>
                  <el-table-column
                    :prop="id"
                    :key="id"
                    :label="label">
                  </el-table-column>
                </el-table> -->
                <div
                  slot="reference"
                  style="height:100%; width:100%; position:relative;"
                  :class="data.isSelected ? 'is-selected' : ''"
                >
                  <div>{{ data.day.split('-').slice(2)[0] }}</div>
                  <div
                    style="position: absolute;right: 5px;bottom: 5px;font-size: 30px;color: #C5C5C5;"
                  >
                    {{ calendarData.hasOwnProperty(data.day.replace(/-/g,''))
                    ? calendarData[data.day.replace(/-/g,'') ]
                    : '' }}
                  </div>
                </div>
              </el-popover>
            </template>
          </el-calendar>
        </el-tab-pane>
        <el-tab-pane label="添加记录">配置管理</el-tab-pane>
      </el-tabs>

      <!-- <el-col span="18">
        <el-calendar v-model="value">
          <template slot="dateCell" slot-scope="{date, data}">
            <p
              :class="data.isSelected ? 'is-selected' : ''"
            >{{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}</p>
          </template>
        </el-calendar>
      </el-col>-->
    </el-row>
  </div>
</template>
<script>
import moment from "moment";
export default {
  name: "LSCalendar",
  data() {
    return {
      value: new Date(),
      calendarData: {},
      visitList: []
    };
  },
  watch: {
    value: function() {
      this.loadCalendar();
    }
  },
  methods: {
    load: function() {},
    loadCalendar: function() {
      let _this = this;
      this.$store
        .dispatch("getCalendar", moment(this.value).format("YYYY-MM-DD"))
        .then(res => {
          _this.calendarData = {};
          for (let index = 0; index < res.data.length; index++) {
            const element = res.data[index];
            _this.calendarData[element.day] = element.visitCount;
          }
        });
    }
  },
  created: function() {
    this.loadCalendar();
  }
};
</script>
<style>
:focus {
    outline: none;
}
</style>
