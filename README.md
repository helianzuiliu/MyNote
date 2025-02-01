
```dataview
TASK FROM "" GROUP BY dateformat(file.cday,"yyyy-MM-dd")
```


```dataview
table 
dateformat(file.ctime,"yyyy-MM-dd hh:mm:ss") as 创建时间 from "设计模式"
```
