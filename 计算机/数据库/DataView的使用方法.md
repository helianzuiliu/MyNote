---
tags: []
aliases:
  - DataView
---

由于DataView这个插件的使用方法与数据库过于相似，所以暂时将这个插件的使用方法放在这里，如果以后做了一个插件使用的文件夹再考虑换位置

# 介绍
DataView是一个Obsidian的一个第三方插件，是一个在你的知识库中生成数据的动态视图的高级查询引擎/索引。你可以通过使用任意和页面相关联的值，如标签(tag)，文件夹(folder)， 内容(content)，或者字段(field)来生成视图。

使用DataView有一个通式
````text
```dataview
<QUERY-TYPE> <WITHOUT ID> <字段>
FROM <来源>
<WHERE> <条件表达式>
<SORT> <排序依据 排序方式>
<GROUP BY> <分组依据>
<LIMIT> <限定显示记录数>
<FLATTEN> <拆分表达式>
```
````

可以看出使用DataView的方法就是使用代码块，并在对应填写编程语言的位置写上dataview就可以触发dataview

这个语句和数据库的脚本很像，所以可以一定程度上用写数据库的思考方式来写dataview，将这个仓库当作数据库，文件夹当作表，文件当作数据来对仓库进行高效管理

dataview可以将文件本身的一些属性用于查询，也可以在文件头部使用定义自定义属性
## 自带属性

| 文件属性             | 字段类型      | 属性说明                  |
| ---------------- | --------- | --------------------- |
| file.name        | Text      | 文件名                   |
| file.folder      | Text      | 所在文件夹                 |
| file.path        | Text      | 完整路径 + 完整文件名          |
| file.ext         | Text      | 扩展名                   |
| file.link        | Link      | 链接至本文件                |
| file.size        | Number    | 文件大小 (bytes)          |
| file.ctime       | Date Time | 创建时间                  |
| file.cday        | Date      | 创建日期                  |
| file.mtime       | Date Time | 最后修改时间                |
| file.mday        | Date      | 最后修改日期                |
| file.tags        | List      | 文中的 标签 和 YAML 中的 tags |
| file.etags       | List      | 文中的 标签 和 YAML 中的 tags |
| file.inlinks     | List      | 反向链接                  |
| file.outlinks    | List      | 正向链接                  |
| file.tasks       | List      | 文中的任务列表               |
| file.lists       | List      | 文中的列表 (包含任务列表)        |
| file.frontmatter | List      | 文件中的 YAML 块内容         |
| file.starred     | Boolean   | 加星                    |
# 解析语句
## `<QUERY-TYPE>` 展示方式
展示方式有TABLE、LIST、TASK、CALENDAR
 
### TABLE 表格
使用的较为频繁的一种
可以有多个列，适合用来做汇总的表格

其中带有很多函数可供使用

### LIST 列表
以无序列表的形式显示查询结果

### TASK 任务
检索目标中的任务列表，在dataview的列表中点完成也可以同时完成目标文件

task有一个独立的属性completed,判断这个任务是否完成

### CALENDAR 日历
可以以日历视图的形式显示查询结果



# 内置函数
#### `default(field, value)`

#### `dateformat()`

#### `contains(查找的字段,含有的字段)`

#### `choice(bool, left, right)`
一个原始的if语句--如果第一个参数为真，则返回第二个参数的内容；否则，返回第三个参数的内容。

