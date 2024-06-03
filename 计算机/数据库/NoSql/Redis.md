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

> `lpush key value [value ...]`
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

geospatial的内容符合地球的经纬度,不能填超出地球经纬度的数据,也**不能写入两级的位置数据**

geospatial本质是zset, 可以用zset的方法对geospatial进行一些操作

具体的说有效的维度是-180°到180° 

有效的维度是-85.05112878°到85.05112878°

> `geoadd key longitude latitude member [longitude latitude member ...]`

`longitude`是经度, `latitude`是纬度 `member`是名称

```bash
127.0.0.1:6379> geoadd china:city 116.40 39.90 beijing
(integer) 1

// 错误输入
127.0.0.1:6379> geoadd china:city 39.90 116.40 beijin
(error) ERR invalid longitude,latitude pair 39.900000,116.400000
```


> `geopos key member [member ...]`

获取指定的member的地理位置
```bash
127.0.0.1:6379> geopos china:city beijing
1) 1) "116.39999896287918091"
   2) "39.90000009167092543"
```

> `geodist key member1 member2 [unit]`

计算两个成员之间的支线距离, 

unit是这个距离的单位支持
- m(米)
- km(千米)
- mi(英里)
- ft(英尺)

```bash
127.0.0.1:6379> geoadd china:city 121.47 31.23 shanghai
(integer) 1
127.0.0.1:6379> geodist china:city beijin shanghai
"1067378.7564"
127.0.0.1:6379> geodist china:city beijin shanghai km
"1067.3788"
```

> `georadius key longitude latitude radius m|km|ft|mi [withcoord] [withdist] [withhash] [COUNT count] [ASC|DESC] [STORE key] [STOREDIST key]`

查询`(longitude, latitude)`位置的`radius`范围内存在的坐标

`withcoord`返回在范围内的位置信息的坐标

`withdist`返回距离给定坐标的距离

`withhash`返回一个数字的哈希值

`count` 需要用`COUNT` 标识,限制返回个数

`ASC|DESC` 给查出的数据排序

`STORE key`

`STOREDIST key`

```bash
127.0.0.1:6379> georadius china:city 110 30 10000 km withcoord
1) 1) "shanghai"
   2) 1) "121.47000163793563843"
      2) "31.22999903975783553"
2) 1) "beijin"
   2) 1) "116.39999896287918091"
      2) "39.90000009167092543"
127.0.0.1:6379> georadius china:city 110 30 10000 km withdist
1) 1) "shanghai"
   2) "1105.9098"
2) 1) "beijin"
   2) "1245.2858"
127.0.0.1:6379> georadius china:city 110 30 10000 km withhash
1) 1) "shanghai"
   2) (integer) 4054803462927619
2) 1) "beijin"
   2) (integer) 4069885360207904
```

> `georadiusbymember key member radius m|km|ft|mi [withcoord] [withdist] [withhash] [COUNT count] [ASC|DESC] [STORE key] [STOREDIST key]`

查找以成员为中心的`radius`范围内的数据

参数和上一个相同

```bash
127.0.0.1:6379> georadiusbymember china:city beijin 10000 km withcoord
1) 1) "shanghai"
   2) 1) "121.47000163793563843"
      2) "31.22999903975783553"
2) 1) "beijin"
   2) 1) "116.39999896287918091"
      2) "39.90000009167092543"
```

> `geohash key member [member ...]`

获得成员的位置表示的hash字符串,如果两个字符串越像,则代表位置越近

这种哈希字符串的长度只有11个字符,存在很小的精度损失,存在一种生成51个字符的精确hash算法,但是消耗geohash相对大很多

```
127.0.0.1:6379> geohash china:city beijin
1) "wx4fbxxfke0"
```



## Redis的Hyperloglog(基数)

所有和Hyperloglog有关的命令都是PF开头的

>[!NOTE] Hyperloglog是什么
>Redis在2.8.9版本加入了Hyperloglog数据结构
>
>Hyperloglog用于基数统计的数据结构

优点: 占用的内存是固定的,2^64大小的数据量只需要12kb内存就可以存储,出错率在0.81%

Hyperloglog的使用案例

网页的浏览量
- 在一段时间内同一个人浏览只有一次

传统的可以用set保存,但是当浏览人数变多就会很占内存,但是这种情形我们不需要去存储浏览人的id等数据,此时Hyperloglog就可以在可接受的出错率下完美替换set

> `pfadd key element [element ...]`

在key中加入元素

```bash
127.0.0.1:6379> pfadd loglog a s d f a s
(integer) 1
```

> `pdcount key`

查询key中元素的个数

```bash
127.0.0.1:6379> pfcount loglog
(integer) 4
```

> `pfmerge destkey sourcekey [sourcekey]`

将多个`key`合成为一个`destkey`,源`key`还是存在不会消失

```bash
127.0.0.1:6379> pfadd log 1 2 3 4 5 6 7
(integer) 1
127.0.0.1:6379> pfmerge newlog log loglog
OK
127.0.0.1:6379> pfcount log
(integer) 7
127.0.0.1:6379> pfcount loglog
(integer) 4
127.0.0.1:6379> pfcount newlog
(integer) 11
```




## Redis的Bitmap(位图)






## Redis的事务

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



## Redis持久化

### RDB(Redis Database)持久化

Redis会单独创建一个子进程进行持久化,先将数据写入到一个临时文件中,等持久化过程结束后再用零售及文件替换上次持久化的文件,这个过程中主进程不涉及IO操作,所以不会影响Redis本体的速度

如果需要进行大规模数据的恢复,且对于数据恢复的完整性不是非常敏感,那RDB方式比AOF方式更加高效

优点:
- 高效
- 适合大规模的数据恢复
- 对数据完整性要求不高
缺点:
- 需要一定的时间间隔进行操作
- 如果宕机了最后一次持久化的数据就没了
- fork进程的时候会占用一定的内存空间

触发规则
1. config文件中的save规则满足
2. 执行flushall命令
3. 退出redis-server会默认产生

### AOF(Append Only File)持久化

以日志的形式将所有命令记录下来(只记录写操作不记录都操作),恢复的时候将所有的命令再执行一遍

这个文件如果被恶意破坏且没有其他备份,则redis会无法启动,可以使用`redis-check-aof --fix` 进行修复(把被恶意破坏的数据直接删掉)

默认不开启

```txt
appendonly on # aof的开关

auto-aof-rewrite-percentage 100
auto-aof-rewrite-min-size 64mb # aof文件大于64mb会追加一个文件写文件
```

![[Pasted image 20240603110536.png]]

优点
- 每一次修改都会同步,数据的完整性会更好
- 默认每秒同步一次
- 从不同步,效率最高

缺点
- 相对来说aof的数据文件比rdb大很多,修复速度也比rdb慢很多
- aof的运行会平凡涉及IO操作,速度比rdb慢



## Redis订阅

Redis发布订阅(pub/sub)是一种**消息通信模式**,发送者(pub)发送消息,订阅者(sub)接收消息. wx,wb,关注系统

Redis客户端可以订阅任意数量的频道


> `psubscribe pattern [pattern ...]`

订阅一个或多个符合给定模式的频道

> `pubsub subcommand [argument [argument ...]]`

查看订阅与发布系统状态

> `publish channel message`

将消息发送给指定的频道

> `punsubscribe [pattern [pattern ...]]`

退订所有给定模式的频道

> `subscribe channel [channel ...]`

订阅给定的一个或多个频道的信息

> `unsubscribe [channel [channel ...]]`

退订给定的频道