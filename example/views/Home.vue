<template>
  <div class="home">
<!--    <img alt="Vue logo" example="../assets/logo.png">-->
    <div class="form">
      <input type="radio" id="hour" value="hour" v-model="type">
      <label for="hour">hour</label>
      <input type="radio" id="day" value="day" v-model="type">
      <label for="day">day</label>
      <input type="radio" id="month" value="month" v-model="type">
      <label for="month">month</label>
      <input type="radio" id="year" value="year" v-model="type">
      <label for="year">year</label>
      <span>当前类型: {{ type }}</span>
    </div>
    <div class="form">
      隐藏假期： <i-switch v-model="hideHoliday" style="margin-right: 20px;"></i-switch>

      最多显示多少天{{max}}: <Slider :min="5" v-model="max" :max="60" :step="5" style="margin-right: 20px;margin-left: 10px;width:200px;" ></Slider>

    </div>
    <div class="form">
      单元格宽度{{cellWidth}}:     <Slider :min="50" v-model="cellWidth" :max="200" :step="10" style="margin-right: 20px;margin-left: 10px;width:200px;" ></Slider>
      单元格高度{{cellHeight}}:     <Slider :min="30" v-model="cellHeight" :max="80" :step="5" style="margin-right: 20px;margin-left: 10px;width:200px;" ></Slider>
    </div>
    <div class="form">
      <input type="radio" id="blue" value="blue" v-model="theme">
      <label for="blue">blue</label>
      <input type="radio" id="yellow" value="yellow" v-model="theme">
      <label for="yellow">yellow</label>
      <input type="radio" id="green" value="green" v-model="theme">
      <label for="green">green</label>
      <span style="margin-right: 20px;">当前主题色: {{ theme }}</span>
      ghost： <i-switch v-model="ghost" style="margin-right: 20px;"></i-switch>
      showDesc： <i-switch v-model="showDesc" style="margin-right: 20px;"></i-switch>
      merge： <i-switch v-model="merge" style="margin-right: 20px;"></i-switch>
    </div>
    <div class="form">
      <Button type="primary" @click="start = dayjs(start).subtract(5, 'day').format('YYYY-MM-DD')">上一页</Button>
      <Button type="primary" @click="start = dayjs(start).add(5, 'day').format('YYYY-MM-DD')">下一页</Button>
<!--      <Button type="primary" @click="loadData">增加一条数据</Button>-->
      <RadioGroup type="button" class="tabs" v-model="chart" style="margin-left: 20px;">
        <Radio :label="1">按项目</Radio>
        <Radio :label="2">按人员</Radio>
      </RadioGroup>
    </div>
    <gantt show-tree :type="type" v-show="chart === 1"
           :data="data"
           :theme="theme"
           :start="start"
           :hide-holiday="hideHoliday"
           :loading="loading"
           :max="max"
           :cellWidth="cellWidth"
           :cellHeight="cellHeight"
           :ghost="ghost"
           :show-desc="showDesc"
           :merge="merge"
           @change="refresh"
           :is-holiday="isHoliday"
    >
      <div slot="tooltip" slot-scope="{row, cell}">
        <p>迭代名：{{row.name}}</p>
        <p>迭代开始日期：{{row.start_date}}</p>
        <p>迭代结束日期：{{row.end_date}}</p>
        <p>项目名：{{row.workspace_name}}</p>
        <p>阶段：{{cell.stage}}</p>
        <p>开始日期：{{cell.start}}</p>
        <p>结束日期：{{cell.end}}</p>
      </div>
    </gantt>
    <gantt :type="type" v-show="chart === 2"
           :data="peopleData"
           :theme="theme"
           :start="start"
           :hide-holiday="hideHoliday"
           :loading="loading"
           :max="max"
           :cellWidth="cellWidth"
           :cellHeight="cellHeight"
           :ghost="ghost"
           :show-desc="showDesc"
           :merge="merge"
           @change="refresh"
           :colors="colors"
    >
      <div slot="aside-row" slot-scope="{row}" style="padding: 10px;">
        {{row.name}}--{{row.department}}
      </div>
      <span slot="desc" slot-scope="{row, cell}">
        {{cell.workspace_name}}-{{cell.name}}-{{cell.iteration_progress_exp}}
      </span>
      <div slot="tooltip" slot-scope="{row, cell, date}">
        <p>{{date.localString}}</p>
        <p>姓名：{{row.name}}</p>
        <p>项目名：{{cell.workspace_name}}</p>
        <p>迭代名：{{cell.name}}</p>
        <p>开始日期：{{cell.start}}</p>
        <p>结束日期：{{cell.end}}</p>
        <p>迭代进度：{{cell.iteration_progress_exp}}</p>
        <p>迭代状态：{{cell.iteration_type_exp}}</p>
      </div>
    </gantt>
  </div>
</template>

<script>
// @ is an alias to /example
import {Switch} from 'iview'
import dayjs from 'dayjs'

export default {
  name: 'home',
  components: {
    'i-switch': Switch,
  },
  data () {
    return {
      hideHoliday: false,
      type: 'day',
      theme: 'blue',
      ghost: false,
      max: 20,
      cellWidth: 80,
      cellHeight: 30,
      start: '2019-10-01',
      loading: false,
      data: [],
      peopleData: [],
      showDesc: false,
      merge: false,
      chart: 1,
      colors: [
        '#EF7F79',
        '#F2A077',
        '#F7C177',
        '#FAD678',
        '#FEF47D',
        '#DAEF77',
        '#A6DB74',
        '#7ED8D2',
        '#7BBFF9',
        '#89A6F8',
        '#AA84E4',
        '#F08DBE',
      ]
    }
  },
  created () {

  },
  methods: {
    dayjs,
    loadData () {
      this.loading = true
      setTimeout(() => {
        this.data.push({
          data: [
            {start: '2019-09-12', end: '2019-09-23', msg: '第一阶段'},
            {start: '2019-09-20', end: '2019-09-21', msg: '第二阶段'},
            {start: '2019-09-21', end: '2019-09-24', msg: '第三阶段'},
            {start: '2019-9-18', end: '2019-9-21', msg: '第四阶段'},
          ],
          parent: 1,
          id: ~~(Math.random() * 10 + 15),
          name: 'A',
        })
        this.loading = false
      }, 1000)
    },
    refresh () {

    },
    isHoliday (date) {
      return [1, 2, 4].includes(date.day())
    },
  },
}
</script>
<style scoped lang="scss">
  .home {
    padding: 20px;
  }
  .form {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    label {
      padding: 0 20px 0 10px;
    }
    button + button {
      margin-left: 5px;
    }
  }
</style>
