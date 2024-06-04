Redis(Remote Dictionary Server) 是一个由ANSI C语言编写的,支持网络,可基于内存也可持久化的日志型,Key-Value型数据库

提供了Java，C/C++，C#，PHP，JavaScript，Perl，Object-C，Python，Ruby，Erlang等多种语言的API

免费和开源,是当下最热门的NoSQL技术之一,也被称为结构化数据库

对应的Github开源地址[Redis](https://github.com/redis/redis)

Redis的官方文档[Redis Document](https://redis.io/docs/latest/)

中文网站[Redis中文网](https://www.redis.net.cn/)

Redis本身建议在Linux系统上使用,Windows版的Redis使用的比较少

## Redis能干嘛

1. 持久化,Redis的数据存储在内存中,断电即失,所以由持久化技术将数据保存在硬盘中
2. 效率高,  写数据8w次/s, 读数据11w次/s
3. 发布订阅系统
4. 地图信息分析
5. 计时器和计数器,做到数据定时删除

## Redis的特性

1. 多样的数据类型
2. 持久化
3. 集群
4. 事务

## Redis基础数据结构

![[Redis基础数据结构]]

## Redis的特殊数据结构

![[Redis特殊数据结构]]


## Redis的事务

![[Redis事务]]


## Redis持久化

![[Redis持久化]]

## Redis订阅

![[Redis订阅]]


## Redis 主从复制

![[Redis主从复制]]

![[Redis缓存穿透和雪崩]]


