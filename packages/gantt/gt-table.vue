<template>
  <div class="gt-table" :style="{cursor: distanceX ? 'grabbing' : position ? 'grab' : 'pointer'}">
    <p class="refresh" :style="{transform: `translateX(calc(-100% + ${distanceX}px))`}">向左释放刷新</p>
    <p class="refresh right" :style="{transform: `translateX(calc(${distanceX}px))`}">向右释放刷新</p>
    <div :class="{moving: startX}" class="gt-table-container"
         :style="{transform: `translateX(${distanceX}px)`}"
         @mousedown.stop="e => startX = e.pageX"
         @mouseup.stop="end"
         @mouseout.self="end"
         @mouseleave.self="end"
         @mousemove.stop="move"
    >
      <div class="content" ref="content" @scroll="initScroll($event.target)">
        <gt-header v-bind="$props" :range="range" :current="current"/>
        <gt-body
          v-bind="$props" :range="range" :current="current"
          @on-mouseenter="mouseenter"
          @on-mouseleave="mouseleave"
        >
          <template slot="desc" slot-scope="{row, cell}">
            <slot name="desc" :row="row" :cell="cell"></slot>
          </template>
          <template slot="cell-block" slot-scope="{row}">
            <slot name="cell-block" :row="row"></slot>
          </template>
        </gt-body>
      </div>
      <div class="loading" :class="{actived: loading}">loading...</div>
    </div>
  </div>
</template>

<script>
import gtHeader from './gt-header'
import gtBody from './gt-body'
import Mixin from '@/utils/mixin'

export default {
  name: 'gt-table',
  components: {
    gtHeader,
    gtBody,
  },
  mixins: [Mixin],
  inheritAttrs: false,
  props: {
    type: String,
    theme: String,
    data: [Array, Object],
    cellWidth: Number,
    cellHeight: Number,
    size: Number,
    start: [Number, String, Object],
    step: Number,
    max: Number,
    hideHoliday: Boolean,
    loading: Boolean,
    ghost: Boolean,
    showDesc: Boolean,
  },
  data () {
    return {
      startX: 0,
      distanceX: 0,
      scrollLeft: 0,
      range: this.size,
      position: '',
      current: 0,
    }
  },
  watch: {
    size: function (val) {
      this.range = val
    },
  },
  mounted () {
    const {content} = this.$refs
    this.initScroll(content)
  },
  methods: {
    isLeft (el = this.$refs.content) {
      return el.scrollLeft === 0
    },
    isRight (el = this.$refs.content) {
      return el.scrollLeft + el.clientWidth === el.scrollWidth
    },
    initScroll (el) {
      this.startX = 0
      if (
        (el.scrollLeft < el.scrollWidth - el.clientWidth - this.cellWidth) &&
        el.scrollLeft > this.cellWidth
      ) { return }
      if (this.isRight(el)) {
        this.position = 'right'
      } else if (this.isLeft(el)) {
        this.position = 'left'
      } else {
        this.position = ''
      }
    },
    end (e) {
      this.select(e)
      if (!this.position) return
      if (Math.abs(this.distanceX) > 200) {
        this.dateChange()
      }
      this.startX = 0
      this.distanceX = 0
    },
    move ({pageX}) {
      if (!this.startX) return
      const distance = pageX - this.startX
      const el = this.$refs.content
      if (distance < 0 && this.isRight(el)) {
        this.distanceX = distance
        this.position = 'right'
      }
      if (distance > 0 && this.isLeft(el)) {
        this.distanceX = distance
        this.position = 'left'
      }
    },
    select (e) {
      if (e.type !== 'mouseup') return
      if (Math.abs(e.pageX - this.startX) > 5) return
      let {target} = e
      while (target && !Array.from(target.classList).includes('gt-body')) {
        target = target.offsetParent
      }
      if (!target) return
      this.current = Math.floor((e.pageX - target.getBoundingClientRect().x) / this.cellWidth)
    },

    scrollTo (pos) {
      if (pos === 'left') {
        this.$refs.content.scrollTo({
          left: this.cellWidth * 3,
          behavior: 'instant'
        })
        setTimeout(() => {
          this.$refs.content.scrollTo({
            left: 0,
            behavior: 'smooth',
          })
        }, 0)
      } else if (pos === 'right') {
        this.$refs.content.scrollTo({
          left: this.$refs.content.scrollWidth,
          behavior: 'smooth'
        })
      }
    },

    dateChange () {
      let startDate = this.dayjs(this.start)
      this.range += this.step
      this.range = Math.min(this.max, this.range)
      if (this.position === 'left') {
        this.current += this.step
        this.$emit('change', {
          startDate: startDate.subtract(this.step, this.type).format('YYYY-MM-DD'),
          type: this.position,
          range: this.range,
        })
      }
      if (this.position === 'right' && this.range === this.max) {
        this.$emit('change', {
          startDate: startDate.add(this.step, this.type).format('YYYY-MM-DD'),
          type: this.position,
          range: this.range,
        })
      }
      this.$nextTick(() => {
        this.scrollTo(this.position)
      })
    },
    mouseenter ({data, event}) {
      this.$emit('on-mouseenter', {data, event})
    },
    mouseleave (data) {
      this.$emit('on-mouseleave', data)
    },
  },
}
</script>

<style scoped lang="scss">
  .gt-table {
    position: relative;
    display: flex;
    width: fit-content;
    max-width: 100%;
    overflow: hidden;
    color: $fontColor-deep;
    cursor: grab;

    .refresh {
      position: absolute;
      left: 0;
      top: 0;
      padding: 0 20px;
      width: fit-content;
      height: 100%;
      transform: translateX(-100%);
      display: flex;
      align-items: center;
    }
    .right {
      left: 100%;
      transform: translateX(0);
    }

    &-container {
      position: relative;
      transition: transform .3s;
      transform: translateX(0);
      user-select: none;
      flex: 1;
      overflow: hidden;
      .content {
        overflow-x: scroll;
        width: 100%;
        height: 100%;
        position: relative;
      }
      &.moving {
        transition: none;
      }
      .loading {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 2;
        @include size(100%);
        background: rgba(#fff, .8);
        align-items: center;
        justify-content: center;
        display: none;
        &.actived {
          display: flex;
        }
      }
    }
  }
</style>
