Redis的事务不同于MySQL的事务，Redis会像一系列的指令放入一个队列中，当事务执行才会将队列中的命令一次性执行完

这样的事务有 一次性，顺序性，排他性，所以  不存在MySQL事务中的幻读和脏读的情况

Redis的**单条命令是原子性的**,但是**事务没有原子性**

```txt
multi 事务开始
(一条或多条命令)
[exec|discard] 事务结束/取消事务
```



```bash
127.0.0.1:6379> multi
OK
127.0.0.1:6379(TX)> set 111 222
QUEUED
127.0.0.1:6379(TX)> set 222 333
QUEUED
127.0.0.1:6379(TX)> get 111
QUEUED
127.0.0.1:6379(TX)> get 333
QUEUED
127.0.0.1:6379(TX)> set 333 444
QUEUED
127.0.0.1:6379(TX)> get 333
QUEUED
127.0.0.1:6379(TX)> exec
1) OK
2) OK
3) "222"
4) (nil)
5) OK
6) "444"
```

```bash
127.0.0.1:6379> multi
OK
127.0.0.1:6379(TX)> set discard_key ddd
QUEUED
127.0.0.1:6379(TX)> discard
OK
127.0.0.1:6379> get discard_key
(nil)
```
