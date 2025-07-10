
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
not done
sort by priority
group by scheduled
```


```dataviewjs
let dt=dv.luxon.DateTime
let now=dt.now()

await dv.view("js/scripts/abyss_time",
{
	name: ["崩坏三","原神","崩坏：星穹铁道","鸣嘲"]
})
```


