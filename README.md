
```dataview
TASK 
FROM "daily" 
where  !completed 
sort due asc
GROUP BY dateformat(file.cday,"yyyy-MM-dd")
```

