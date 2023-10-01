
```dataview
table without id
	file.link as 文件名,
	file.mday as 上次修改时间,
	TODO as 是否完成
from "计算机"
where !TODO
sort TODO asc, file.mday desc
```
