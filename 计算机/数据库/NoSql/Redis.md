Redis(Remote Dictionary Server) 是一个由ANSI C语言编写的,支持网络,可基于内存也可持久化的日志型,Key-Value型数据库

提供了Java，C/C++，C#，PHP，JavaScript，Perl，Object-C，Python，Ruby，Erlang等多种语言的API

免费和开源,是当下最热门的NoSQL技术之一,也被称为结构化数据库

对应的Github开源地址[Redis](https://github.com/redis/redis)

中文网站[Redis中文网](https://www.redis.net.cn/)

Redis本身建议在Linux系统给上使用,Windows版的Redis由于性能和社区开发活力不足已经有一段时间没有更新了

## Redis能干嘛

1. 内存存储,持久化,Redis的数据存储在内存中,断电即失,所以由持久化技术将数据保存在硬盘中
2. 效率高,  写数据8w次/s, 读数据11w次/s
3. 发布订阅系统
4. 地图信息分析
5. 计时器和计数器,做到数据定时删除


## Redis的特性

1. 多样的数据类型
2. 持久化
3. 集群
4. 事务

## Redis的基础操作

> `get key`
> `set key value`

设置获取值

> `mset key value [ key ,value ...]`
> `mget key [ key ... ]`

同时设置获取多个值

> `incr key`
> `decr key`
 
使key进行一次自增自减

> `incrby key increment `
> `decrby key decrement `

设置key自增自减的步长

> `STRLEN`

返回字符串长度

>` getrange key start end`

截取字符串,end为-1时获取start后的全部字符串

> `setrange key offset value`

替换指定位置开始的字符串

> `setex key second value `

 设置过期时间

> `setnx key value`

不存在再设置值,成功返回1,失败返回0    在分布式锁中常用

> `ttl key `

查看key的还有多久过期 

> `msetnx key value [ key value ...] `

msetnx是一个原子操作 一次设置多个,要么一起成功,要么一起失败

> `obj`  TODO

redis存储对象是用json字符串存储的,在取值的时候,redis可以用字段直接取对象中的数值


## Redis的List操作

list可以做成队列,栈,循环队列

所有和List有关的命令都是L开头的

> `lpush key value [value ...] `
> `rpush key value [value ...]`

`l`和`r`是加入队列的方向

> `lrange key start stop`

获取队列的元素

> `lpop key`
> `rpop key`

弹出队列的元素

> `lindex key index`

获取key的第index个元素,index从0开始计算

> `Llen key`

获取key的长度

> `lrem key count value` 
>  

