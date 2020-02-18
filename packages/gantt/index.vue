<template>
  <div class="gt">
    <gt-aside class="aside" :cell-height="cellHeight + (showDesc ? 20 : 0)" :theme='theme' :data="tree" @on-toggle-expand="handleExpand"/>
    <gt-table v-bind="$props" :data="tableData" @change="change" :start="startDate" :size="range"/>
  </div>
</template>

<script>
import gtAside from './gt-aside'
import gtTable from './gt-table'
import Mixins from '@/utils/mixin'
import arrayToTree from 'array-to-tree'

export default {
  name: 'gantt',
  mixins: [Mixins],
  components: {
    gtAside,
    gtTable,
  },
  props: {
    type: {
      type: String,
      default: 'day', // hour|day|month|year
    },
    theme: {
      type: String,
      default: 'yellow', // blue|yellow|green
    },
    data: {
      type: [Array],
      default: () => [],
    },
    cellWidth: {
      type: Number,
      default: 78,
    },
    cellHeight: {
      type: Number,
      default: 30,
    },
    size: {
      type: Number,
      default: 15,
    },
    start: {
      type: [Number, String],
      default: '2019-9-1',
    },
    step: {
      type: Number,
      default: 5,
    },
    max: {
      type: Number,
      default: 20,
    },
    hideHoliday: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    ghost: {
      type: Boolean,
      default: false,
    },
    merge: {
      type: Boolean,
      default: false,
    },
    showDesc: {
      type: Boolean,
      default: true,
    },
  },
  data () {
    return {
      startDate: this.start,
      range: this.size,
      collapse: [],
      expand: [],
      tableData: [],
      originData: this.data
    }
  },
  watch: {
    start: function (val) {
      this.startDate = val
    },
    size: function (val) {
      this.range = val
    },
    flatData: {
      handler: function (val, oldVal) {
        this.tableData = val.map((item, index) => {
          const hide = this.tableData.length ? this.tableData[index].hide : (!!item.parent && !item.expand)
          const expand = this.tableData.length ? this.tableData[index].expand : item.expand
          return {
            ...item,
            expand,
            hide,
          }
        })
      },
      immediate: true,
    },
    data (val, oldVal) {
    //
    },
  },
  computed: {
    tree () {
      return arrayToTree(this.flatData, {
        parentProperty: 'parent',
        customID: 'id',
      })
    },
    flatData () {
      // 将数据按照tree顺序重新排列并初始化
      let r = []
      this.toArray(arrayToTree(this.originData, {
        parentProperty: 'parent',
        customID: 'id',
      }), r)
      if (!this.merge) {
        r.forEach((row, index) => {
          for (let cell of row.data) {
            if (cell.width <= 0) continue
            for (let c of row.data) {
              if (cell === c) continue
              if (this.isCollide(cell, c)) {
                c.y++
                row.rows = Math.max(row.rows, c.y + 1)
              }
            }
          }
        })
      }
      return r
    },
  },
  methods: {
    toArray (tree = [], r = []) {
      tree.forEach(item => {
        const {children, ...props} = item
        r.push({
          ...props,
          data: item.data.map(i => this.generateCell(i)),
          rows: 1,
        })
        item.children && this.toArray(item.children, r)
      })
    },
    generateCell (cell) {
      return {
        ...cell,
        x: this.getOffsetX(cell),
        y: 0,
        w: this.getWidth(cell),
      }
    },
    isCollide (A, B) {
      return A.x + A.w > B.x && A.x < B.x + B.w && A.y === B.y
    },
    getWidth ({start, end}) {
      let length = this.dayjs(end).add(1, this.type).diff(start, this.type)
      if (this.hideHoliday) {
        length -= this.getHolidayCount(this.dayjs(start), this.dayjs(end).add(1, this.type))
      }
      return length
    },
    getOffsetX ({start}) {
      start = this.dayjs(start)
      const startDate = this.dayjs(this.startDate)
      let offset = start.diff(startDate.format('YYYY-MM-DD'), this.type)
      if (this.hideHoliday) {
        if (start.isSameOrBefore(startDate)) {
          offset += this.getHolidayCount(start, startDate)
        } else {
          offset -= this.getHolidayCount(startDate, start)
        }
      }
      return offset
    },
    getHolidayCount (start, end) {
      end = this.dayjs(end)
      let offset = end.diff(start, this.type)
      let holidayCount = 0
      for (let i = 0; i < Math.abs(offset); i++) {
        if (offset >= 0) {
          this.isHoliday(start.add(i, this.type)) && holidayCount++
        } else {
          this.isHoliday(start.subtract(i, this.type)) && holidayCount--
        }
      }
      return holidayCount
    },
    change (e) {
      this.startDate = e.startDate
      this.$emit('change', e)
    },
    handleExpand ({type, data, node}) {
      if (type === 'expand') {
        data.forEach(id => {
          if (!this.expand.includes(id)) {
            this.expand.push(id)
          }
        })
      } else {
        this.expand = this.expand.filter(id => !data.includes(id))
      }
      this.originData.forEach(item => {
        if (item.id === node.id) {
          item.expand = type === 'expand'
        }
      })
      this.tableData.forEach(item => {
        item.hide = !!item.parent && !this.expand.includes(item.id)
        if (item.id === node.id) {
          item.expand = type === 'expand'
        }
      })
    },
  },
}
</script>

<style scoped lang="scss">
.gt {
  display: flex;
  width: fit-content;
  max-width: 100%;
  color: $fontColor-deep;
  transition: box-shadow .3s;
  transform: translateZ(0);
  backface-visibility: hidden;
  &:hover {
    box-shadow: 0 0 10px darken($borderColor, 10%);
  }
  .aside {
    width: 280px;
    flex-shrink: 0;
  }
}
</style>
