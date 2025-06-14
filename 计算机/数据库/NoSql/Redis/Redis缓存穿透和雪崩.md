### 缓存穿透

当用户要查找一个数据,但此时redis内没有这个缓存,于是会向数据库中查找数据,当短时间大量出现这样的情况就被称为缓存穿透,这会极大的影响服务器的运行速度,甚至可能宕机

### 解决方案

#### 布隆过滤器

布隆过滤器是一种数据结构,对所有**可能查询的参数**以hash形式存储,在控制层先校验,不符合就求其,从而避免了对底层存储系统的查询压力

#### 缓存空对象

在redis中设置空对象以返回

这种方法存在的问题

1. 如果空值被缓存起来,就意味着缓存需要更多的空间存储更多的键,因为这当中可能会有很多的空值的键
2. 技术对空值设置了过期时间,还是会存在缓存层和存储层的数据会有一段时间窗口的不一致,这对业务的一致性会有影响

### 缓存击穿

缓存击穿指一个key在很大的并发访问,当这个key失效的瞬间,访问请求会被转入数据库访问,使缓存被穿破

#### 解决方案

- 设置热点数据永不过期
- 加互斥锁

## 缓存雪崩

一段时间内缓存数据集中大量失效,导致redis宕机

#### 解决方案

- redis高可用(集群)
- 限流降级(服务降级)
- 数据预热(提前将可能用到的数据加载到redis中并设置不同的过期时间)