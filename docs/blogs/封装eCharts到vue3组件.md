**封装组件 Chart.vue**

```vue
<template>
  <div class="container" ref="container"></div>
</template>

<script>
import { onMounted, ref, watch, toRefs } from 'vue'
import * as echarts from 'echarts'
export default {
  name: 'Chart',
  props: {
    options: {
      required: true,
      type: Object,
      default () {
        return {}
      }
    }
  },
  setup (props) {
    const { options } = toRefs(props) // options -> ref()
    const container = ref(null)
    // 为了在watch中使用 echart 实例，所以其也用ref包起来
    const chart = ref(null)
    // 需要获取DOM对象所以要在onMounted 钩子函数中
    onMounted(() => {
      console.log(chart)
      chart.value = echarts.init(container.value)
      chart.value.setOption(props.options)
    })
    // 数据更新时动态更新视图
    watch(
      options,
      (newOptions) => {
        chart.value.setOption(newOptions)
      },
      { deep: true }
    )
    return { container }
  }
}
</script>

<style lang="scss" scoped>
// echart必须设置宽高才能生效
  .container {
    width: 100%;
    height: 100%;
  }
</style>

```

**使用，其中barChartOptions是函数返回数据**

```vue
<template>
  <div class="bar-chart">
    <Chart :options="barChartOptions()"/>
  </div>
</template>

<script>
import Chart from '../charts/Chart'
import { barChartOptions } from '../charts/barChartOptions'
export default {
  name: 'BarChart',
  components: {
    Chart
  },
  setup () {
    return {
      barChartOptions
    }
  }
}
</script>

```

**barChartOptions.js (数据拷贝自官网示例)**

```js
const barChartOptions = () => {
  return {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)'
      }
    }]
  }
}

export { barChartOptions }

```

