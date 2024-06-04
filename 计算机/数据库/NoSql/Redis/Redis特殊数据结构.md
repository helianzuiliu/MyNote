


### Redis的geospatial(地理空间) 

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



### Redis的Hyperloglog(基数)

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




### Redis的Bitmap(位图)






### Redis的Stream


