---
create_date: 2025-03-13
tags:
  - 消息队列
---
#### 死信队列

当消息被判断为死信的时候，将消息通过死信交换机转发到死信队列

消息被判断为死信的条件

- 消息被拒绝（basic.reject/ basic.nack），并且requeue=false
- 消息的TTL过期
- 队列达到最大长度

