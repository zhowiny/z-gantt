<template>
  <div class="gt-body" :class="theme" :style="{width: `${cellWidth * range}px`}">
    <div v-for="(row, index) in data"
         class="gt-body__row" :key="index"
         :class="{hide: row.hide}"
         :style="{height: `${row.rows * cellHeight + 10}px`}"
    >
      <div class="gt-body__item" :class="{ghost}"
        v-for="(item, i) in row.data" :key="i"
        v-show="item.w > 0"
        :style="{
          height: `${cellHeight}px`,
          width: `${item.w * cellWidth - 3}px`,
          transform: `translate3d(${item.x * cellWidth + 3}px, ${(item.y) * cellHeight + 4}px, 0)`
        }"
      >
        <div class="cell">
          <template v-if="ghost">
            <div :class="{'cell-block': item.list && item.list.includes(i)}"
                 v-for="i in item.w" :style="{width: `${cellWidth}px`}"
                 :key="i"
            >{{i}}</div>
          </template>
          <template v-else>
            {{item.msg}}
          </template>
        </div>
        <div class="cell-desc" v-show="cellHeight > 40">
          <slot>{{row.name}}--{{item.msg}}</slot>
        </div>
      </div>
    </div>
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
  },
  data () {
    return {
    }
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
  .current {
    height: 100%;
    position: absolute;
    top: 0;
    left:0;
    background: rgba($blue-bg, .3);
    z-index: 1;
    transition: transform .3s, background .3s;
  }
  &__row {
    position: relative;
    display: flex;
    min-height: 48px;
    max-height: 300px;
    transition: all .3s;
    @include border-bottom($blue);
    &.hide {
      max-height: 0;
      overflow: hidden;
      min-height: auto;
      border: none;
    }
  }
  @for $i from 1 through 5 {
    &__item:nth-child(#{$i}) .cell{
      background-color: rgba($blue, $i * 0.2);
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
      transition: all .3s;
      border-radius: 5px;
      padding: 5px;
      flex: 1;
      max-height: 100%;
      @include flex();
      &-block {
        background: $blue;
        +div {
          margin-left: 5px;
        }
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
    .gt-body__row {
      @include border-bottom($yellow);
    }
    @for $i from 1 through 5 {
      .gt-body__item:nth-child(#{$i}) .cell {
        background-color: rgba($yellow, $i * 0.2);
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
    .gt-body__row {
      @include border-bottom($green);
    }
    @for $i from 1 through 5 {
      .gt-body__item:nth-child(#{$i}) .cell{
        background-color: rgba($green, $i * 0.2);
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
