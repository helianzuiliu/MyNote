
```dataview
TASK 
FROM "daily" 
where !completed and due 
sort due asc
GROUP BY dateformat(file.cday,"yyyy-MM-dd")
```

