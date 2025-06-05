
```dataviewjs
let ftMd = dv.pages("").file.sort(t => t.cday)[0]
let total = parseInt([new Date() - ftMd.ctime] / (60*60*24*1000))
let totalDays = "您已使用 *Obsidian* "+total+" 天，"
let nofold = '!"misc/templates"'
let allFile = dv.pages(nofold).file
let totalMd = "共创建 "+
	allFile.length+" 篇笔记"
let totalTag = allFile.etags.distinct().length+" 个标签"
let totalTask = allFile.tasks.length+"个待办。 "
dv.paragraph(
	totalDays+totalMd+"、"+totalTag+"、"+totalTask
)


```

```tasks
path does not include template
(due after a week ago) or (not done)
sort by priority
sort by due
sort by start
group by function task.due.formatAsDate()
# show tree 
short mode

```

![[01.Game/01.崩坏三/深渊#^d5f041|深渊]]

![[01.Game/01.崩坏三/深渊#^6e32a2|深渊]]

![[01.Game/01.崩坏三/深渊#^61dff7|深渊]]
