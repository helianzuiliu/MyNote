
一般情况下，Redis的主从复制指的就是哨兵模式

默认情况下，每台Redis服务器都是主节点，一个主节点可以有多个从节点，一个从节点只能由一个主节点

从节点只能读取不能写值

主从复制的主要作用包括
1. 数据冗余：实现了数据的热备份，是持久化之外的一种数据冗余方式
2. 故障修复：当主节点出现问题时，可以有从系欸但提供服务，实现快速的故障修复，实际上是一种服务冗余
3. 负载均衡：再主从复制的基础上配合读写分离，主节点提供主服务，从节点提供读服务，分担服务器压力，在写少读多的场景下，多个节点分担读负载可以大幅提高Redis服务的并发量
4. 高可用（集群）基石

一般来说，Redis运用于工程中不能只用一台Redis（一般使用3个，1主2从）
1. 从结构上，单个Redis服务器会发生单点故障，并且一个服务器处理所有请求会有很大压力
2. 从容量上看，单个Redis服务器内润容量有限。一般来说单台Redis最大使用内存不应该超过20G

### 主从复制的配置

查看配置

```bash
127.0.0.1:6379> info replication
# Replication
role:master # 角色
connected_slaves:0 # 从节点个数
master_failover_state:no-failover
master_replid:680c1b3f61382d3216e493e36946204fa723b105
master_replid2:0000000000000000000000000000000000000000
master_repl_offset:0
second_repl_offset:-1
repl_backlog_active:0
repl_backlog_size:1048576
repl_backlog_first_byte_offset:0
repl_backlog_histlen:0
```

如果是本地搭建集群可以修改config文件中的以下四条来做到一台机器开启多个`redis-server`

```txt
port 6379 # 端口
pidfile /var/run/redis/redis-server.pid # 进程文件
logfile /var/log/redis/redis-server.log # 日志文件
dbfilename redis_backup.rdb # 备份文件
```

### 设置主从复制

一般情况下只用配置从节点,主节点不用配置

> `slaveof host port`

host指主节点的ip地址

port指主节点所在的端口号

#### 从配置文件设置主从节点

```txt
replicaof <host> <port> # 配置主节点的ip和端口
masterauth <password> # 访问主节点的密码,没有密码可以没有
```



#### 配置集群实例

在6380上配置一台从节点,从节点可以知道主节点的信息

>[!INFO] Docker配置Redis集群的注意事项
>Docker配置集群的网络除了映射好的端口以外不能用127.0.0.1直接连接,需要在容器里用`hostname -I`命令查看容器的网络ip地址,用ip地址才能连接
>如果主从节点都配置在docker里也可以使用ip,但是更推荐使用network来配置不同容器间的网络关系

查看主节点的ip

```bash
➜  ~ hostname -I 
172.30.90.34 172.17.0.1 # 主节点的ip
```

进入docker容器查看从节点的ip

```bash
➜  ~ docker exec -it redis_docker /bin/bash # 用docker进入容器内部操作
root@8e4119efacf5:/data# hostname -I  
172.17.0.2  # 从节点的ip
```

```bash
172.17.0.2:6379> slaveof 172.17.0.1 6379 # 由于使用了docker配置从节点,ip地址需要换成主节点的hostname -I里的ip
OK
172.17.0.2:6379> info replication
# Replication
role:slave
master_host:172.17.0.1
master_port:6379
master_link_status:up
master_last_io_seconds_ago:7
master_sync_in_progress:0
slave_read_repl_offset:0
slave_repl_offset:0
slave_priority:100
slave_read_only:1
replica_announced:1
connected_slaves:0
master_failover_state:no-failover
master_replid:3ee9de26872b199c52dd1d4e49317be88aabaf12
master_replid2:0000000000000000000000000000000000000000
master_repl_offset:0
second_repl_offset:-1
repl_backlog_active:1
repl_backlog_size:1048576
repl_backlog_first_byte_offset:1
repl_backlog_histlen:0
```

此时6379端口的服务器也可以知道有了一台从节点连接

```bash
127.0.0.1:6379> info replication
# Replication
role:master
connected_slaves:1
slave0:ip=172.17.0.2,port=6379,state=online,offset=56,lag=1
master_failover_state:no-failover
master_replid:3ee9de26872b199c52dd1d4e49317be88aabaf12
master_replid2:0000000000000000000000000000000000000000
master_repl_offset:56
second_repl_offset:-1
repl_backlog_active:1
repl_backlog_size:1048576
repl_backlog_first_byte_offset:1
repl_backlog_histlen:56
```


### Redis的哨兵模式

主从切换:当主服务器宕机后,需要手动把一台从服务器切换为主服务器,这需要人工干预,这费时费力,还会导致一段时间的服务不可用,Redis在2.8版本开始提供了Sentinel(哨兵)架构来解决这个问题

 一个哨兵部署在集群中可能哨兵也有可能宕机,所以还要设计哨兵的哨兵进行监控,形成多哨兵模式
![[Pasted image 20240604142525.png]]

假设主服务器宕机，哨兵1先检测到这个结果，系统并不会马上进行failover过程，仅仅是哨兵1主观的认为主服务器不可用，这个现象成为**主观下线**。当后面的哨兵也检测到主服务器不可用，并且数量达到一定值时，那么哨兵之间就会进行一次投票，投票的结果由一个哨兵发起，进行failover[故障转移]操作。切换成功后，就会通过发布订阅模式，让各个哨兵把自己监控的从服务器实现切换主机，这个过程称为**客观下线**。

如果票数一致无法选出最高票的机器,则重新投票

#### 哨兵配置

哨兵的配置需要写配置文件`sentinel.conf`,然后用`redis-sentinel`手动启动

```txt
sentinel monitor <name> <host> <port> <n>
```

name指监视的节点的名字,可以随便取

host和port指ip和端口

n指当有n个哨兵认为主节点宕机则触发更换主节点机制

哨兵的配置有很多,但是只要这一句就足够平常使用

优点:
- 哨兵集群,基于主从复制模式,有所有的主从配置的优点
- 主从可以切换,故障可以转移,高可用性
- 哨兵是主从模式的升级,可以自动配置

缺点:
- 不好扩容,集群容量到达上限之后扩容就会很麻烦
- 实现哨兵模式的配置很麻烦

**哨兵的配置文件模板**

```txt
# sentinel实例运行的端口，默认为26379
port 26379
 
# 哨兵监控的主Redis服务，格式为：sentinel monitor <master-name> <ip> <redis-port> <quorum>
sentinel monitor mymaster 127.0.0.1 6379 2
 
# 主服务器超时时间，秒为单位
sentinel down-after-milliseconds mymaster 30000
 
# 选举新主服务器的最小超时时间
sentinel failover-timeout mymaster 180000
 
# 哨兵之间的通信端口，默认为哨兵端口+1
# sentinel announce-ip <ip>
# sentinel announce-port <port>
 
# 哨兵日志文件
logfile "/var/log/redis/sentinel.log"
 
# 哨兵的工作目录
dir /tmp
```
