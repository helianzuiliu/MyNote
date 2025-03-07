---
class:
  - "std::thread"
  - "std::future"
  - "std::promise"
  - "std::packaged_task"
  - "std::async"
  - "std::shared_future"
create_date: 2025-03-07
tags:
  - cpp
  - STL
---

# 1.`std::thread`

异步过程一般需要创建线程来多线程工作，但是C++原本的多线程操作比较相对低级，不能很好的完成大多数异步操作的需求，比如需要返回值，但是线程类中没有自带的获得返回值的方法

> 最初的解决方法是定义一个线程外的指针变量来承接线程内的结果，最后通过join操作通知线程已完成工作，这些操作相对繁琐有比较基础，还容易出错

所以在C++11中出现了其他的异步操作接口例如`std::async`,这个异步操作可以自动创建一个线程,并返回一个`std::future`来获得需要的返回值

其实`std::async`提供的便利可不仅仅是这一点，它首先解耦了线程的创建和执行，可以在需要的时候获取异步操作的结果；其次它还提供了线程的创建策略（比如可以通过**延迟加载**的方式去创建线程），可以以多种方式去创建线程。在介绍`async`具体用法以及为什么要用`std::async`代替线程的创建之前，先看看`std::future`、`std::promise`和 `std::packaged_task`。

---

# 2.`std::future`

`std::future`是用于获取异步操作结果的一个模板类

> 从字面意思来理解， 它表示未来，因为一个异步操作是不可能马上就获取操作结果的，只能在未来某个时候获取，但是可以以同步等待的方式来获取结果，可以通过查询future的状态（`future_status`）来获取异步操作的结果。

 `future_status`有三种状态：

- `deferred`：异步操作还没开始
- `ready`：异步操作已经完成
- `timeout`：异步操作超时

```cpp
//查询future的状态
std::future_status status;
do {
    status = future.wait_for(std::chrono::seconds(1));
    if (status == std::future_status::deferred) {
        std::cout << "deferred\n";
    } else if (status == std::future_status::timeout) {
        std::cout << "timeout\n";
    } else if (status == std::future_status::ready) {
        std::cout << "ready!\n";
} while (status != std::future_status::ready);
```

获取`future`结果有三种方式：`get`、`wait`、`wait_for`，其中`get`等待异步操作结束并返回结果，`wait`只是等待异步操作完成，没有返回值，`wait_for`是超时等待返回结果。

注意，每个`std::future`只能使用一次`get`，不然会报错

> 普通的`std::future`有个特点，只能移动，而不能拷贝，这就意味着，要是多线程的话，只有一个线程一个实例能够利用`get`方法取值。

---

# 3.`std::promise`

`std::promise`用于在线程中获取某个值，可以查看线程内的运行情况，其效果类似于在子线程内的给一个全局变量赋值

用法示例：

```cpp
#include <future>
#include <iostream>
#include <thread>

int main()
{
   std::promise<int> prom;
   auto func = [](std::promise<int> &prom)
   {
      // prom.set_value_at_thread_exit(99);线程退出时设置
      prom.set_value(99);
   };
   std::thread t(func, std::ref(prom)); //在子线程中修改prom的值
   std::future<int> f = prom.get_future();
   std::cout << f.get() << std::endl;
    //避免因主线程比子线程先退出报错
   if (t.joinable())
      t.join();
}
```

> 注意，一个promise的set_value()只能调用一次，如果调用多次，就会出现如下错误：

```bash
terminate called after throwing an instance of 'std::future_error'
  what():  std::future_error: Promise already satisfied
Aborted
```

这时候如果外部没有catch exception，程序也会crash。

---

# 4.`std::packaged_task`

`std::packaged_task`是一个可以调用的异步方法体，其内部有一个函数指针，可以承接普通函数，`lambda`表达式，`std::bind`对象等,创建之后可以会立刻创建一个子线程运行

> 实际上，`packaged_task`和`promise`在某种程度上有点像，`promise`保存了一个共享状态的值，而`packaged_task`保存的是一 个函数。

用法示例：

```cpp
#include <future>
#include <iostream>
#include <thread>

int main()
{
   auto func = [](int a, int b)
   { return a + b; };
   std::packaged_task<int(int, int)> task(func);
   auto f = task.get_future();

   std::thread t(std::move(task), 1, 2);
   std::cout << f.get() << std::endl;
   if (t.joinable())
      t.join();
}
```

---

# 5.`std::future`、`std::promise`和`std::packaged_task`的关系

通过上面的介绍，三者之间（`promise`、`packaged_task`和`future`）的关系还是很清晰的。

`std::future`提供了一个访问异步操作结果的机制，它和线程是一个级别的属于低层次的对象，在它之上高一层的是`std::packaged_task`和`std::promise`，他们内部都有`future`以便访问异步操作结果，`std::packaged_task`包装的是一个异步操作，而`std::promise`包装的是一个值，都是为了方便异步操作的，因为有时需要获取线程中的某个值，这时就用`std::promise`，而有时需要获一个异步操作的返回值，这时就用`std::packaged_task`。

> 可以认为 packaged_task ≈ promise + future

---

# 6.`std::async`

通过上面的用法示例，可以看到，我们要创建一个异步操作，然后通过`future`对象获取数据，需要创建手动`packaged_task`或者`promise`，然后将它们放进手动创建的`thread`去执行相关操作。

`std::async`就是将这三种封装之后的类

大概的工作过程是这样的：`std::async`先将异步操作用`std::packaged_task`包装起来，然后将异步操作的结果放到`std::promise`中，这个过程就是创造未来的过程。外面再通过`future.get/wait`来获取这个未来的结果！


## 6.1`std::async`的简单使用

来看看`std::async`的原型

```cpp
std::future std::async(std::launch::async | std::launch::deferred, f, args...)
```

第一个参数是线程的创建策略，有两种策略，默认的策略是立即创建线程：

`std::launch::async`：在调用async就开始创建线程。

`std::launch::deferred`：延迟加载方式创建线程。调用async时不创建线程，直到调用了`future`的`get`或者`wait`时才创建线程。

第二个参数是线程函数，第三个参数是线程函数的参数。

- 用法示例1：

```cpp
#include <future>
#include <iostream>
#include <thread>

int main()
{
   auto f = std::async(
       std::launch::async, [](int a, int b)
       { return a + b; },
       1, 2);
   std::cout << f.get() << std::endl; // 3
}
```

- 用法示例2：

```cpp
#include <future>
#include <iostream>
#include <thread>
using namespace std;

int main()
{
   std::future<int> f = std::async(std::launch::async, []()
                                   {
    std::this_thread::sleep_for(std::chrono::seconds(3));
    return 100; });

   std::future_status status;
   do
   {
      status = f.wait_for(std::chrono::seconds(1));
      if (status == std::future_status::deferred)
      {
         std::cout << "deferred\n";
      }
      else if (status == std::future_status::timeout)
      {
         std::cout << "timeout\n";
      }
      else if (status == std::future_status::ready)
      {
         std::cout << "ready!\n";
      }
   } while (status != std::future_status::ready);
   std::cout << "result is " << f.get() << '\n';
}
```

output：

```bash
timeout
timeout
ready!
result is 8
```

这里需要注意，在`async`函数原型中，第一个参数有两种，用法示例中使用的是`std::launch::async`，其实参数还可以是`std::launch::deferred`，这时候函数不会异步执行，只有当对应的`future`调用了`get`时，函数才会执行，而且是在当前线程中执行。

若执行用法示例2的代码，终端会一直输出defferred。

## 6.2 `std::shared_future`

如果需要对多个线程的返回值存储在同一个返回值中,`std::future`很明显不符合这个要求,所以还存在可以多次使用`get`的`future`变体

对于`std::future`，有一个`share`方法可以获取`std::shared_future`

示例代码：

```cpp
#include <future>
#include <iostream>
#include <thread>
using namespace std;

int main()
{
   promise<int> prom;
   auto f1 = prom.get_future();
   auto f_shared = f1.share();

   std::future<int> f2 = std::async(std::launch::async, [f_shared]()
                                    { return f_shared.get() + 1; });
   std::future<int> f3 = std::async(std::launch::async, [f_shared]()
                                    { return f_shared.get() + 2; });

   prom.set_value(99);
   std::cout << "result1 is " << f2.get() << '\n';
   std::cout << "result2 is " << f3.get() << '\n';
}
```

output:

```bash
result1 is 100
result2 is 101
```
