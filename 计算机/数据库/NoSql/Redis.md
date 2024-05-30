Redis(Remote Dictionary Server) 是一个由ANSI C语言编写的,支持网络,可基于内存也可持久化的日志型,Key-Value型数据库

提供了Java，C/C++，C#，PHP，JavaScript，Perl，Object-C，Python，Ruby，Erlang等多种语言的API

免费和开源,是当下最热门的NoSQL技术之一,也被称为结构化数据库

对应的Github开源地址[Redis](https://github.com/redis/redis)

Redis的官方文档[Redis Document](https://redis.io/docs/latest/)

中文网站[Redis中文网](https://www.redis.net.cn/)

Redis本身建议在Linux系统上使用,Windows版的Redis使用的比较少

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

移除key中指定个数的value

> `trim  key start stop`

截取key的元素,在范围之外的元素会被舍弃

> `rpoplpush source destination`

移除列表的最后一个元素,并将该元素加入另一个列表

> `lset key index value`

设置key的index为value,需要这个key和index位置的元素存在,不然会报错

> `exists key`

查看key是否存在

> `linsert key brfore|after pivot value`

在key的pivot位置的左或右边插入value

Redis内的数据结构本质上是一个链表


## Redis的Set(集合)操作

所有和Set有关的命令都是S开头的

> `sadd key member [member ...]`

在key中加入member元素,加入成功返回1

> `sismember key member`

member元素否存在于key中,存在返回1,不存在返回0

> `smembes key`

获得key中的所有元素

> `scard key`

获得key的元素个数

> `srem key value`

移除key中的value元素

> `spop key`

随机移除一个key中的元素

> `srandmenber key`

在key中随机抽取一个元素返回

> `smove source destination member`

将source中的member元素转移到destination中

> `sdiff key [key ...]`

返回传入参数集合的差集

> `sinter key [key ...] `

返回传入参数集合的交集

> `sunion key [key ...]`

返回传入参数集合的并集




## Redis的Hash操作

key-map 这里的map指的是一个map集合

hash更适合对象的存储

所有和Hash有关的命令都是H开头的

> `hset key field value`

key指redis里的key,field指map里的key,value指map里的value

> `hget key field`

获取map里对应field的值

> `hmset key field value [ field value ...]`
> `hmget key field [field ...]`

同时获取或设置多个值

> `hgetall key`

获得key中的所有键值对,返回key value

> `hdel key field`

删除key中指定的field键值对

> `hlen key`

返回key中键值对的个数

> `hexists key field`

判断key中的field是否存在

> `hkeys key`
> `hvals key`

获取key中的所有field或value

> `hincrby key field increment`

使key的field字段自增自减

> `hsetnx key field value`

如果不存在则设置,否则不设置



## Redis的Zset(有序集合)操作

所有和Zset有关的命令都是Z开头的

> `zadd key [NX|XX] [CH] [INCR] score member [sorce member ...]`

`[NX|XX]`是如果存在或不存在则加入,与前面的api逻辑相同

score是sort的权重,在集合中会根据这个数值自动排序

member是集合的value

zset中的key是数字

```bash
127.0.0.1:6379> zadd zset 1 lkcadsa
(integer) 1
127.0.0.1:6379> zadd zset 3 sdovkmdps
(integer) 1
127.0.0.1:6379> zadd zset 2 sdovkmdps 9 aldsc
(integer) 1
```


> `zrange key start stop`

获取zset中序号在start到stop中的元素,这个序号与score无关,只与在ihe中的位置有关

```bash
127.0.0.1:6379> zrange zset 0 -1
1) "sadasd"
2) "lkcadsa"
3) "sdovkmdps"
4) "aldsc"
```




> `zrangebyscore key min max [withscores] [limit offset count]`
> `zrevrangebyscore key min max [withscores] [limit offset count]`

min和max可以填-inf和+inf代表正负无穷

withscores 会一并返回对应的scores

```bash
127.0.0.1:6379> zrangebyscore zset -inf +inf
1) "sadasd"
2) "lkcadsa"
3) "sdovkmdps"
4) "aldsc"
5) "10"
6) "2124"
7) "029112"

127.0.0.1:6379> zrevrangebyscore zset +inf -inf
1) "029112"
2) "2124"
3) "10"
4) "aldsc"
5) "sdovkmdps"
6) "lkcadsa"
7) "sadasd"

127.0.0.1:6379> zrangebyscore zset -inf +inf withscores
 1) "sadasd"
 2) "0"
 3) "lkcadsa"
 4) "1"
 5) "sdovkmdps"
 6) "2"
 7) "aldsc"
 8) "9"
 9) "10"
10) "10"
11) "2124"
12) "122"
13) "029112"
14) "12897"
```


> `zrem key member [member ...]`

在zset集合中删除member元素

```bash
127.0.0.1:6379> zrem zset sadasd
(integer) 1
127.0.0.1:6379> zrange zset 0 -1
1) "lkcadsa"
2) "sdovkmdps"
3) "aldsc"
4) "10"
5) "2124"
6) "029112"
```

> `zcard key`

获得zset中元素的个数

```bash
127.0.0.1:6379> zcard zset
(integer) 6
```

> `zcount key min max`

计算min和max区间中的元素的个数

```bash
127.0.0.1:6379> zcount zset 0 10
(integer) 4
127.0.0.1:6379> zcount zset 0 +inf
(integer) 6
```


## Redis的geospatial(地理空间) 

所有和geospatial有关的命令都是geo开头的

geospatial的内容符合地球的经纬度,不能tian

> `geoadd key longitude latitude member [longitude latitude member ...]`

`longitude`是经度, `latitude`是纬度 `member`是别名

```bash
127.0.0.1:6379> geoadd china:city 116.40 39.90 beijin
(integer) 1
```