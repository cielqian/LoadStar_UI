<template>
  <div>
    <el-row>
      <el-col :md="6">
        <div class="ls_padding_15_t">
          <span class="">链接跳转</span>
          <ECharts class="test" :options="recentVisitOption"></ECharts>
        </div>
      </el-col>
      <el-col :md="6">
        <div class="ls_padding_15_t">
          <span>最常访问</span>
          <el-table :data="topVisitLinks" class=""
          :show-header='false'>
            <el-table-column
              prop="title">
            </el-table-column>
            <el-table-column align="right">
              <template slot-scope="scope">
                <i class="el-icon-view"></i>
                <span>{{ scope.row.count }}</span>
              </template>
            </el-table-column>
            
          </el-table>
          
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import ECharts from "vue-echarts";
import "echarts/lib/chart/line";
import "echarts/lib/component/polar";

export default {
  name: "Analysis",
  components: { ECharts },
  data() {
    return {
      recentVisitOption: {
        grid:{
          top: 50
        },
        backgroundColor: "rgb(249, 249, 249)",
        xAxis: {
          type: "category",
          data: ["三天前", "两天前", "前天", "昨天", "今天"],
          boundaryGap: false,
          axisLine: {
            show: false
          },
          axisLabel: {
            color: "#000"
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: "value",
          axisLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        series: [
          {
            data: [20, 30, 25, 18, 12],
            type: "line",
            smooth: true,
            itemStyle: {
              normal: {
                color: "#000",
                borderWidth: 2,
                lineStyle: {
                  color: "#555",
                  width: 2
                }
              }
            },
            label: {
              show: true
            }
          }
        ]
      },
      topVisitLinks:[{title:'text', count:1},{title:'text', count:1},{title:'text', count:1},{title:'text', count:1},{title:'text', count:1}]
    };
  }
};
</script>

<style scoped>
.test {
  height: 300px;
  width: 100%;
}
</style>

