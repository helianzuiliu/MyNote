<%*
// 按照年-月-日的格式，得到今天日期的变量（例如2023-03-07）
let today = tp.date.now("YYYY-MM-DD")
// 获取输入到inputDate
let inputDate = await tp.system.prompt("输入日记文件名称："+today,today)
// 格式化变量titleName成年-月-日_周几
titleName = window.moment(inputDate, "YYYY-MM-DD", true).format("YYYY-MM-DD_ddd")
// 获取昨天的日期（文件名以日期命名）
before_date = window.moment(inputDate, "YYYY-MM-DD", true).add(-1,"days").format("YYYY-MM-DD_ddd")
// 获取明天的日期（文件名以日期命名）
after_date = window.moment(inputDate, "YYYY-MM-DD", true).add(1,"days").format("YYYY-MM-DD_ddd")
// 获取当前文件创建时间
let createTime = tp.file.creation_date()
// 获取当前文件修改时间
let modificationDate = tp.file.last_modified_date("dddd Do MMMM YYYY HH:mm:ss")
-%>
---

---

## 任务

---

## 创建的笔记

```dataview
 TABLE without id
 file.link as 文件名,
 dateformat(create_date,"yyyy-MM-dd") as 创建日期
from "/"
where dateformat(create_date,"yyyy-MM-dd")="<% today %>"
```

template by [[daily]]
