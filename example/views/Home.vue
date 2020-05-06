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
      隐藏假期：
      <i-switch v-model="hideHoliday" style="margin-right: 20px;"></i-switch>

      最多显示多少天{{max}}:
      <Slider :min="5" v-model="max" :max="60" :step="5"
              style="margin-right: 20px;margin-left: 10px;width:200px;"></Slider>

    </div>
    <div class="form">
      单元格宽度{{cellWidth}}:
      <Slider :min="50" v-model="cellWidth" :max="200" :step="10"
              style="margin-right: 20px;margin-left: 10px;width:200px;"></Slider>
      单元格高度{{cellHeight}}:
      <Slider :min="30" v-model="cellHeight" :max="80" :step="5"
              style="margin-right: 20px;margin-left: 10px;width:200px;"></Slider>
    </div>
    <div class="form">
      <input type="radio" id="blue" value="blue" v-model="theme">
      <label for="blue">blue</label>
      <input type="radio" id="yellow" value="yellow" v-model="theme">
      <label for="yellow">yellow</label>
      <input type="radio" id="green" value="green" v-model="theme">
      <label for="green">green</label>
      <span style="margin-right: 20px;">当前主题色: {{ theme }}</span>
      ghost：
      <i-switch v-model="ghost" style="margin-right: 20px;"></i-switch>
      showDesc：
      <i-switch v-model="showDesc" style="margin-right: 20px;"></i-switch>
      merge：
      <i-switch v-model="merge" style="margin-right: 20px;"></i-switch>
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
    <gantt
      show-tree :type="type" v-show="chart === 1"
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
        <p>项目名：{{row.name}}</p>
        <p>开发团队：{{row.team || '--'}}</p>
        <p>开发人员：{{cell.user || '--'}}</p>
        <p>开始日期：{{cell.start}}</p>
        <p>结束日期：{{cell.end}}</p>
      </div>
    </gantt>
    <gantt
      :type="type" v-show="chart === 2"
      :data="peopleData" :theme="theme"
      :start="start" :hide-holiday="hideHoliday"
      :loading="loading" :max="max"
      :cellWidth="cellWidth" :cellHeight="cellHeight"
      :ghost="ghost" :show-desc="showDesc"
      :merge="merge" :colors="colors"
      @change="refresh"
    >
      <div slot="aside-row" slot-scope="{row}" style="padding: 10px;">
        {{row.name}}
      </div>
      <span slot="desc" slot-scope="{row, cell}">
        项目：{{cell.msg}}
      </span>

      <div slot="tooltip" slot-scope="{row, cell, date}">
        <p>{{date.localString}}</p>
        <p>姓名：{{row.name}}</p>
        <p>项目：{{cell.msg}}</p>
        <p>开始日期：{{cell.start}}</p>
        <p>结束日期：{{cell.end}}</p>
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
      start: '2020-04-30',
      loading: false,
      data: [
        {
          data: [
            {
              start: '2020-04-30',
              end: '2020-05-15',
              msg: '项目周期'
            },
          ],
          id: 1,
          name: '项目',
          expand: false,
        },
        {
          data: [
            {
              start: '2020-04-30',
              end: '2020-05-04',
              msg: 'UI设计',
              user: '张三',
            },
            {
              start: '2020-05-01',
              end: '2020-05-02',
              msg: '数据库设计',
              user: '李四',
            },
            {
              start: '2020-05-02',
              end: '2020-05-10',
              msg: '后端',
              user: '李四',
            },
            {
              start: '2020-05-04',
              end: '2020-05-10',
              msg: '前端',
              user: '王五',
            },
            {
              start: '2020-05-10',
              end: '2020-05-15',
              msg: '前后端联调',
              user: '张三,王五',
            },
          ],
          parent: 1,
          id: 2,
          name: '我的自家院子项目',
          team: 'xxx团队',
          expand: false,
        },
        {
          data: [],
          id: 3,
          name: '具体计划',
          expand: false,
        },
        {
          data: [
            {
              start: '2020-05-04',
              end: '2020-05-06',
              msg: '主页'
            },
            {
              start: '2020-05-05',
              end: '2020-05-07',
              msg: '发现'
            },
            {
              start: '2020-05-07',
              end: '2020-05-10',
              msg: '我的'
            },
            {
              start: '2020-05-10',
              end: '2020-05-15',
              msg: '联调'
            },
          ],
          id: 4,
          parent: 3,
          name: '前端',
          expand: false,
        },
        {
          data: [
            {
              start: '2020-04-30',
              end: '2020-05-02',
              msg: '数据库设计'
            },
            {
              start: '2020-05-02',
              end: '2020-05-10',
              msg: '接口设计'
            },
            {
              start: '2020-05-10',
              end: '2020-05-15',
              msg: '联调'
            },
          ],
          id: 5,
          parent: 3,
          name: '后端',
          expand: false,
        },
      ],
      peopleData: [
        {
          data: [
            {
              start: '2020-04-30',
              end: '2020-05-15',
              msg: '我的自家院子项目',
              list: [1, 3, 4, 5, 8, 9, 10],
            },
            {
              start: '2020-05-10',
              end: '2020-05-20',
              msg: '另一个项目',
              list: [1, 2, 3],
            },
          ],
          id: 1,
          name: '张三',
          expand: false,
        },
        {
          data: [
            {
              start: '2020-04-30',
              end: '2020-05-15',
              msg: '我的自家院子项目',
              list: [1, 2, 3, 4],
            },
            {
              start: '2020-05-10',
              end: '2020-05-20',
              msg: '另一个项目',
              list: [3, 4, 5],
            },
          ],
          id: 1,
          name: '李四',
          expand: false,
        },
        {
          data: [
            {
              start: '2020-04-30',
              end: '2020-05-15',
              msg: '我的自家院子项目',
              list: [3, 4, 5, 6],
            },
            {
              start: '2020-05-10',
              end: '2020-05-20',
              msg: '另一个项目',
              list: [6, 7, 8],
            },
          ],
          id: 1,
          name: '王五',
          expand: false,
        },
      ],
      showDesc: false,
      merge: false,
      chart: 1,
      colors: [
        '#7BBFF9',
        '#89A6F8',
        '#AA84E4',
        '#F08DBE',
        '#EF7F79',
        '#F2A077',
        '#F7C177',
        '#FAD678',
        '#FEF47D',
        '#DAEF77',
        '#A6DB74',
        '#7ED8D2',
      ],
    }
  },
  created () {
    window.dayjs = this.dayjs
  },
  methods: {
    dayjs,
    // loadData () {
    //   this.loading = true
    //   setTimeout(() => {
    //     this.data.push({
    //       data: [
    //         {start: '2019-09-12', end: '2019-09-23', msg: '第一阶段'},
    //         {start: '2019-09-20', end: '2019-09-21', msg: '第二阶段'},
    //         {start: '2019-09-21', end: '2019-09-24', msg: '第三阶段'},
    //         {start: '2019-9-18', end: '2019-9-21', msg: '第四阶段'},
    //       ],
    //       parent: 1,
    //       id: ~~(Math.random() * 10 + 15),
    //       name: 'A',
    //     })
    //     this.loading = false
    //   }, 1000)
    // },
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
