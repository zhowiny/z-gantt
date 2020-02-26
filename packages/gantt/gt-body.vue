<template>
  <div class="gt-body" :class="theme" :style="{width: `${cellWidth * range}px`}">
    <div v-for="(row, index) in data"
         class="gt-body__row" :key="`${row.id}-${index}`"
         :class="{hide: row.hide}"
         :style="{height: `${row.rows * (cellHeight + (showDesc ? 20 : 0)) + 10}px`}"
    >
      <div class="gt-body__item" :class="{ghost}"
        v-for="(item, i) in row.data" :key="i"
        v-show="item.w > 0"
        :style="{
          height: `${cellHeight + (showDesc ? 20 : 0)}px`,
          width: `${item.w * cellWidth + 2}px`,
          transform: `translate3d(${item.x * cellWidth}px, ${(item.y) * (cellHeight + (showDesc ? 20 : 0)) + 4}px, 0)`
        }"
      >
        <div class="cell"
             :style="getCellStyle(item, i)"
             @mouseenter="e => !ghost && mouseenter({row, cell: item}, e)"
             @mouseleave="e => !ghost && mouseleave({row, cell: item}, e)"
        >
          <template v-if="ghost">
            <div :class="{'cell-block': item.list && item.list.includes(pos)}"
                 v-for="pos in item.w" :key="pos"
                 :style="getCellBlockStyle(item, i, pos)"
                 @mouseenter="e => blockEnter(row, item, pos, e)"
                 @mouseleave="e => blockLeave(row, item, pos, e)"
            >
              <slot name="cell-block" :row="row"></slot>
            </div>
          </template>
          <template v-else>
            <span>{{item.msg}}</span>
          </template>
        </div>
        <div class="cell-desc" v-show="showDesc">
          <slot name="desc" :row="row" :cell="item">{{row.name}}-{{item.msg}}</slot>
        </div>
      </div>
    </div>
    <div class="today" :style="{width: `${cellWidth - 3}px`,transform: `translateX(${cellWidth * todayIndex + 3}px)`}"></div>
    <div class="current" :style="{width: `${cellWidth - 3}px`,transform: `translateX(${cellWidth * current + 3}px)`}"></div>
  </div>
</template>

<script>
export default {
  name: 'gt-body',
  inheritAttrs: false,
  props: {
    theme: String,
    width: Number,
    cellWidth: Number,
    cellHeight: Number,
    range: Number,
    current: Number,
    data: Array,
    ghost: Boolean,
    showDesc: Boolean,
    timeline: Array,
    colors: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
    }
  },
  computed: {
    todayIndex () {
      return this.timeline.findIndex(item => item.isToday)
    },
  },
  methods: {
    mouseenter (data, e) {
      this.$emit('on-mouseenter', {data, event: e})
    },
    mouseleave (data) {
      this.$emit('on-mouseleave', data)
    },
    blockEnter (row, cell, position, event) {
      const index = position + cell.x - 1
      const params = {row, cell}
      if (index >= 0 && index < this.timeline.length) {
        params.date = this.timeline[index]
      }
      this.mouseenter(params, event)
    },
    blockLeave (row, cell, position, event) {
      const index = position + cell.x - 1
      const params = {row, cell}
      if (index >= 0 && index < this.timeline.length) {
        params.date = this.timeline[index]
      }
      this.mouseleave(params)
    },
    getCellStyle (item, index) {
      const style = {
        borderColor: (item.customStyle || {}).borderColor,
      }
      if (this.ghost) {
        if (!item.customStyle || !item.customStyle.borderColor) {
          style.borderColor = this.colors[index % this.colors.length]
        }
      } else if (this.colors.length > 0) {
        style.backgroundColor = this.colors[index % this.colors.length]
      }
      return style
    },
    getCellBlockStyle (item, index, position) {
      const style = {
        width: `${this.cellWidth - 4}px`,
        margin: '0 2px',
      }
      if (item.list && item.list.includes(position) && this.colors.length > 0) {
        style.backgroundColor = this.colors[index % this.colors.length]
      }
      return style
    },
  },
}
</script>

<style scoped lang='scss'>
@mixin border-bottom ($color) {
  background: linear-gradient(to right, transparent 50%, $color 50%) repeat-x bottom;
  background-size: 5px 1px;
}
.gt-body {
  // border-top: 1px solid $mainColor;
  overflow: hidden;
  position: relative;
  font-size: 12px;
  min-height: 300px;
  .current, .today {
    height: 100%;
    position: absolute;
    top: 0;
    left:0;
    background: rgba($blue-bg, .3);
    z-index: 1;
    transition: transform .3s, background .3s;
  }
  .today {
    background: rgba($blue-bg, .8);
    pointer-events: none;
  }
  &__row {
    position: relative;
    display: flex;
    min-height: 40px;
    /*max-height: 500px;*/
    transition: all .3s;
    @include border-bottom($blue);
    &.hide {
      max-height: 0;
      overflow: hidden;
      min-height: auto;
      border: none;
    }
  }
  @for $i from 1 through 18 {
    &__item:nth-child(#{$i}) .cell{
      @if $i * 8 >= 80 {
        background-color: rgba(darken($blue-hover, 80), .6);
      } @else {
        background-color: rgba(darken($blue-hover, 8 * $i), .6);
      }
      /*opacity: .6;*/
    }
  }
  &__item {
    display: flex;
    flex-direction: column;
    text-align: center;
    font-size: 12px;
    position: absolute;
    padding: 2px 0;
    z-index: 2;
    transition: all .3s;
    .cell {
      position: relative;
      transition: all .3s;
      border-radius: 5px;
      padding: 0;
      flex: 1;
      max-height: 100%;
      @include flex(center, stretch);
      &-block {
        background: $blue;
        +div {
          /*margin-left: 5px;*/
        }
      }
      &-desc {
        height: 20px;
        line-height: 20px;
        max-width: 100%;
        @include text-truncate();
        text-align: left;
      }
      > span {
        @include flex();
        position: absolute;
        left: 10px;
        align-self: center;
      }
      > div {
        @include flex();
      }
    }
    &.ghost .cell{
      background-color: transparent;
      border: 1px solid $blue-bg;
    }
  }

  &.yellow {
    .current {
      background: rgba($yellow-bg, .3);
    }
    .today {
      background: rgba($yellow-bg, .8);
    }
    .gt-body__row {
      @include border-bottom($yellow);
    }
    @for $i from 1 through 18 {
      .gt-body__item:nth-child(#{$i}) .cell {
        // background-color: rgba($yellow, $i * 0.15);
        @if $i * 8 >= 80 {
          background-color: rgba(darken($yellow-hover, 80), .6);
        } @else {
          background-color: rgba(darken($yellow-hover, 8 * $i), .6);
        }
        .cell-block {
          background: $yellow;
        }
      }
    }
    .gt-body__item.ghost .cell{
      background-color: transparent;
      border: 1px solid $yellow-bg;
    }
  }
  &.green {
    .current {
      background: rgba($green-bg, .3);
    }
    .today {
      background: rgba($green-bg, .8);
    }
    .gt-body__row {
      @include border-bottom($green);
    }
    @for $i from 1 through 18 {
      .gt-body__item:nth-child(#{$i}) .cell{
        // background-color: rgba($green, $i * 0.15);
        @if $i * 8 >= 80 {
          background-color: rgba(darken($green-hover, 80), .6);
        } @else {
          background-color: rgba(darken($green-hover, 8 * $i), .6);
        }
        .cell-block {
          background: $green;
        }
      }
    }
    .gt-body__item.ghost .cell{
      background-color: transparent;
      border: 1px solid $green-bg;
    }
  }
}
</style>
