---
aliases:
  - unique_ptr
  - shared_ptr
  - weak_ptr
---
# unique_ptr

只允许存在一个指向目标的指针，不可以复制，但是允许用移动构造转让所有权


# shared_ptr

允许多个存在指向同一目标，

当引用增加时,shared_ptr会自动计数

引用减少时计数会自动减少

当引用数为0时会自动调用目标的析构函数以释放内存



# weak_ptr

只能读取的指针,其生成的引用不会增加shared_ptr的引用计数
这种指针不能通过`.`或`->`来使用对象,只能通过使用`lock()`函数来获取对应的`shared_ptr`来间接使用对象

`lock()`函数会判断对象是否析构,并判断返回`shared_ptr`或`nullptr`