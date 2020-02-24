# 甘特图
业务组件，

## 安装
```
npm install z-gantt --save
```

### demo
```
npm install
npm run serve
```

### 编译
```
npm run lib
```
### 使用
```$xslt
import Gantt from 'z-gantt'
import 'z-gantt/lib/gantt.css'

<gantt
    :type="'day'"
    :data="staffData"
    :theme="theme"
    :start="start"
    :hide-holiday="hideHoliday"
    :loading="loading"
    :max="max"
    :size="size"
    :cellWidth="80"
    :cellHeight="30"
    ghost
    show-desc
/>

```
