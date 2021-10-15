# 甘特图
业务组件

![preview](/example/assets/preview.jpg)

## 安装
```
npm install z-gantt --save
```

### demo
```
npm install
npm run serve

```
![example](/example/assets/example.gif)

### 编译
```
npm run lib
```
### 使用
example:
```$xslt
<gantt
    show-tree :type="type"
    :data="data"
    :theme="theme"
    :start="start"
    :hide-holiday="hideHoliday"
    :loading="loading
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

import Gantt from 'z-gantt'
import 'z-gantt/lib/gantt.css'

export default {
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
      showDesc: false,
      merge: false,
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
}

```
### API
props

属性|说明|类型|默认值
|---|---|---|---|
|data|甘特图数据|Array|[]|
|type|类型: day,hour,month,year 暂时只支持day|String|day|
|theme|主题: yellow,blue,green|String|yellow|
|cellWidth|单元格宽度|Number|78|
|cellHeight|单元格高度|Number|30|
|max|最大显示范围|Number|20|
|start|开始日期|Number,String|2020-5-1|
|step|左右加载步进|Number|5|
|hideHoliday|是否因此节假日|Boolean|false|
|loading|是否显示加载框|Boolean|false|
|ghost|是否镂空单元格|Boolean|false|
|merge|是否合并单元格(会导致相互重叠)|Boolean|false|
|showDesc|是否合显示描述|Boolean|true|
|showTree|是否树形展示,暂支持2层嵌套,必须要有id,parent字段|Boolean|false|
|colors|自定义单元格颜色,按顺序取余,默认主题色|Array|[]|
|isHoliday|自定义节假日函数,默认周六日,返回Boolean值|Function|date=>[0,6].includes(date.day())|

slots

|名称|说明|参数|
|---|---|---|
|aside-title|左侧大标题|-|
|aside-row|侧边栏每一行,showTree为false才有该slot|slot-scope="{row}"|
|cell|单元格|slot-scope="{rowIndex, cellIndex}"|
|desc|单元格描述|slot-scope="{row, cell}"|
|cell-block|单元格中每个日期块|slot-scope="{row}"|
|tooltip|提示框|slot-scope="{row, cell, date}"|

events

|时间名称|说明|-|
|---|---|---|
|change|{startDate: 开始日期, type: 操作类型(向左向右), range: 范围}|@change="change"|


test