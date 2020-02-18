<template>
  <div class="gt-aside" :class="theme">
    <div class="title" style="font-size: 40px;height: 88px;">迭代排期</div>
    <div class="tree">
      <tree :data="data" :render="renderItem" @on-toggle-expand="expandChange"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'gt-aside',
  inheritAttrs: false,
  props: {
    theme: String,
    data: Array,
    cellHeight: Number,
  },
  data () {
    return {
    }
  },

  methods: {
    renderItem (h, {root, node, data}) {
      return h('div', {
        style: {
          display: 'inline-block',
          maxWidth: '100%',
          padding: '0 5px',
          whiteSpace: 'normal',
          height: `${data.rows * this.cellHeight + 10}px`,
        },
        class: ['tree-item'],
      }, [
        h('span', {
          domProps: {
            innerHTML: data.name,
          },
        }),
      ])
    },
    expandChange (node) {
      let r = []
      if (node.expand) {
        this.toArray(node, r, true)
        this.$emit('on-toggle-expand', {type: 'expand', data: r, node})
      } else {
        this.toArray(node, r)
        this.$emit('on-toggle-expand', {type: 'collapse', data: r, node})
      }
    },
    toArray (node, r = [], expand) {
      if (!node.children) {
        return
      }
      node.children.forEach(item => {
        r.push(item.id)
        if (expand) {
          if (item.expand) {
            item.children && this.toArray(item, r, expand)
          }
        } else {
          item.children && this.toArray(item, r, expand)
        }
      })
    },
  },
}
</script>

<style scoped lang='scss'>
.gt-aside {
  // border: 1px solid $mainColor;
  border-right: none;
  .title {
    background-color: $blue;
    padding: 0 20px;
    @include flex();
    transition: background-color .3s;
  }
  .tree {
    padding: 0 15px;
    line-height: 48px;
  }
  .tree /deep/ {
    .ivu-tree {
      border-bottom: 1px dashed $blue;
    }
    .tree-item {
      transition: height .3s;
      min-height: 48px;
      max-width: calc(100% - 12px);
    }
    li {
      margin: 0;
      display: flex;
      flex-wrap: wrap;
    }
    ul {
      width: 100%;
      background: linear-gradient(to right, transparent 50%, $blue 50%) repeat-x;
      background-size: 5px 1px;
      transition: all .3s;
    }
    .ivu-tree > ul:first-child {
      background: none;
    }
    .ivu-tree-arrow {
      @include flex();
      height: max-content;
      i {
        line-height: 48px;
      }
    }
  }
  &.yellow {
    .title {
      background-color: $yellow;
    }
    .tree {
      border-bottom-color: $yellow;
    }
    .tree /deep/ {
      .ivu-tree {
        border-color: $yellow;
      }
      ul {
        background: linear-gradient(to right, transparent 50%, $yellow 50%) repeat-x;
        background-size: 5px 1px;
      }
    }
  }
  &.green {
    .title {
      background-color: $green;
    }
    .tree {
      border-bottom-color: $green;
    }
    .tree /deep/ {
      .ivu-tree {
        border-color: $green;
      }
      ul {
        background: linear-gradient(to right, transparent 50%, $green 50%) repeat-x;
        background-size: 5px 1px;
      }
    }
  }
}
</style>
