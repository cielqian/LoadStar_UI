<template>
  <div>Analysis
    <ECharts :options="recentVisitOption"></ECharts>
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
      recentVisitOption:{
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true
        }]
    }
    };
  }
};
</script>
