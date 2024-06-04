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