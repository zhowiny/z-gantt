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
    </div>
    <div class="form">
      <Button type="primary" @click="start = dayjs(start).subtract(5, 'day').format('YYYY-MM-DD')">上一页</Button>
      <Button type="primary" @click="start = dayjs(start).add(5, 'day').format('YYYY-MM-DD')">下一页</Button>
      <Button type="primary" @click="loadData">增加一条数据</Button>
    </div>
    <gantt :type="type"
           :data="data"
           :theme="theme"
           :start="start"
           :hide-holiday="hideHoliday"
           :loading="loading"
           :max="max"
           :cellWidth="cellWidth"
           :cellHeight="cellHeight"
           :ghost="ghost"
           @change="refresh"
    />
  </div>
</template>

<script>
// @ is an alias to /example
import {Switch} from 'iview'

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
      start: '2019-09-10',
      loading: false,
      data: [
        {
          data: [],
          parent: 1,
          id: 5,
          name: 'A',
        },
        {
          data: [
            {start: '2019-09-20', end: '2019-09-21', msg: '第一阶段'},
            {start: '2019-09-20', end: '2019-09-22', msg: '第二阶段'},
            {start: '2019-09-22', end: '2019-09-25', msg: '第三阶段'},
          ],
          parent: 5,
          id: 3,
          name: 'Aa',
        },
        {
          data: [
            {start: '2019-09-11', end: '2019-09-23', msg: '第二阶段', list: [1, 3, 6, 7, 8]},
          ],
          parent: 1,
          id: 4,
          name: 'B',
        },
        {
          data: [
            {start: '2019-08-29', end: '2019-09-12', msg: '第一阶段'},
            {start: '2019-09-11', end: '2019-09-13', msg: '第二阶段'},
            {start: '2019-09-15', end: '2019-09-20', msg: '第三阶段'},
          ],
          parent: 3,
          id: 6,
          name: 'Aaa',
        },
        {
          data: [
            {start: '2019-09-12', end: '2019-09-13', msg: '第一阶段'},
            {start: '2019-09-16', end: '2019-09-16', msg: '第二阶段'},
            {start: '2019-09-17', end: '2019-09-19', msg: '第三阶段'},
            {start: '2019-9-20', end: '2019-9-21', msg: '第四阶段'},
          ],
          parent: 4,
          id: 11,
          name: 'Ba',
        },
      ],
    }
  },
  methods: {
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
