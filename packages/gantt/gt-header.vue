<template>
  <div class="gt-header" :class="theme">
    <div class="gt-header__title">
      <div v-for="(value, key, index) in timelineTitle"
           :key="index" :style="{width: `${cellWidth * value}px`}"
      >{{key}}</div>
    </div>
    <div class="gt-header__timeline" :style="{minHeight: `${cellHeight}px`}">
      <div v-for="(item, index) in timeline" :key="index"
           :style="{width: `${cellWidth}px`}"
           :class="{today: item.isToday, holiday: item.isHoliday, selected: current === index}"
      >
        <p >{{item.date.format(f[type])}}</p>
        <p v-if="type === 'day'">{{item.week}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Mixins from '@/utils/mixin'
export default {
  name: 'gt-header',
  mixins: [Mixins],
  inheritAttrs: false,
  props: {
    type: String,
    theme: String,
    cellWidth: Number,
    // cellHeight: Number,
    range: Number,
    start: [Number, String],
    current: Number,
    hideHoliday: Boolean,
  },
  data () {
    return {
      cellHeight: 53,
      f: {
        hour: 'hh:00',
        day: 'MM.DD',
        month: 'YY.MM',
        year: 'YYYY',
      },
      timeline: [],
      week: ['周日', '周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    }
  },
  watch: {
    type: function (val) {
      this.timeline = this.buildTimeline()
    },
    range: function (val) {
      this.timeline = this.buildTimeline()
    },
    hideHoliday: function (val) {
      this.timeline = this.buildTimeline()
    },
    start: function (val) {
      this.timeline = this.buildTimeline()
    },
  },
  computed: {
    timelineTitle () {
      let t = {}
      const f = {
        hour: 'MM.DD',
        day: 'YYYY.MM',
        month: 'YYYY',
      }
      this.timeline.map(item => {
        let k = `${item.date.format(f[this.type])}`
        if (this.type === 'year') k = '年份'
        if (t[k]) {
          t[k]++
        } else {
          t[k] = 1
        }
      })
      return t
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.timeline = this.buildTimeline()
    },
    buildTimeline () {
      let {range, week, start} = this
      start = this.dayjs(start)
      let timeline = []

      /* eslint-disable */
      for (let i of Array.apply(null, {length: range})) {
        let date
        if (timeline.length === 0) {
          date = start
        } else {
          date = timeline.slice(-1)[0].date.add(1, this.type)
        }
        while (this.hideHoliday && this.isHoliday(date)) {
          date = date.add(1, this.type)
        }
        timeline.push({
          date: date,
          week: week[date.day()],
          isToday: this.isToday(date),
          isHoliday: this.isHoliday(date),
          localString: date.format('YYYY-MM-DD'),
        })
      }
      this.$emit('on-timeline-update', timeline)
      return timeline
    },
  },
}
</script>

<style scoped lang="scss">
  .gt-header {
    min-height: 88px;
    display: flex;
    flex-direction: column;
    font-size: 16px;
    &__title {
      display: flex;
      text-align: center;
      width: 100%;
      flex: 1;
      div {
        padding: 5px 0;
        min-width: 60px;
        flex-shrink: 0;
        background-color: $blue;
        @include flex();
        transition: width .3s, background-color .3s;
      }
      div+div {
        border-left: 3px solid #fff;
      }
    }
    &__timeline {
      display: flex;
      width: 100%;
      flex-wrap: nowrap;
      text-align: center;
      min-height: 48px;
      >div {
        flex-shrink: 0;
        border-top: 2px solid #fff;
        background-color: $blue-bg;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        transition: all .3s;
      }
      >div+div {
        border-left: 3px solid #fff;
      }
      .holiday {
        background-color: $borderColor;
        color: $fontColor;
      }
      .today {
        background-color: $blue-bg;
        color: $blue-deep;
        transition: color .3s, background-color .3s;
      }
      .selected {
        color: $blue-deep;
        transition: color .3s;
      }
    }
    &.yellow {
      .gt-header__title {
        div {
          background-color: $yellow;
        }
      }
      .gt-header__timeline {
        >div {
          background-color: $yellow-bg;
        }
        .holiday {
          background-color: $borderColor;
          color: $fontColor;
        }
        .today {
          background-color: $yellow-bg;
          color: $yellow-deep;
        }
        .selected {
          color: $yellow-deep;
        }
      }
    }
    &.green {
      .gt-header__title {
        div {
          background-color: $green;
        }
      }
      .gt-header__timeline {
        >div {
          background-color: $green-bg;
        }
        .holiday {
          background-color: $borderColor;
          color: $fontColor;
        }
        .today {
          background-color: $green-bg;
          color: $green-deep;
        }
        .selected {
          color: $green-deep;
        }
      }
    }
  }

</style>
