用C++实现一个线程池的库

## 池化思想

>[!NOTE] 池化思想是什么
>池化思想是一种通过创建和管理可重复使用的对象池来提高性能和资源利用率的编程思想。它的核心概念是在需要时从池中获取对象，而不是每次都创建新的对象，使用完毕后将对象返回到池中，以供其他代码复用。  
>通过使用池化思想，可以避免不必要的资源创建和销毁操作，减少系统开销，提高程序的性能和可伸缩性。同时，池化思想还能够更好地管理和控制资源的使用，防止资源过度消耗和浪费。

池化思想的具体实例

- 对象池（Object Pool）
- 连接池（Connection Pool）
- 线程池（Thread Pool）

## 线程池程序结构




![[Pasted image 20240602123837.png]]


## 构建系统

构建程序使用cmake实现,引用`pthread`库实现, 生成器使用的`Ninja`

```cmake
cmake_minimum_required(VERSION 3.20)

set(CMAKE_C_COMPILER clang)
set(CMAKE_CXX_COMPILER clang++)
set(CMAKE_EXPORT_COMPILE_COMMANDS true)

project(
  thread_pool
  VERSION 0.1
  DESCRIPTION "a simple thread pool"
  HOMEPAGE_URL "127.0.0.1"
  LANGUAGES CXX)

find_package(Threads REQUIRED)

add_executable(${PROJECT_NAME} main.cpp)
target_link_libraries(${PROJECT_NAME} PRIVATE Threads::Threads)
```

在build文件夹下构建项目

```bash
➜  build cmake .. -G Ninja
-- The CXX compiler identification is Clang 10.0.0
-- Detecting CXX compiler ABI info
-- Detecting CXX compiler ABI info - done
-- Check for working CXX compiler: /usr/bin/clang++ - skipped
-- Detecting CXX compile features
-- Detecting CXX compile features - done
-- Performing Test CMAKE_HAVE_LIBC_PTHREAD
-- Performing Test CMAKE_HAVE_LIBC_PTHREAD - Failed
-- Looking for pthread_create in pthreads
-- Looking for pthread_create in pthreads - not found
-- Looking for pthread_create in pthread
-- Looking for pthread_create in pthread - found
-- Found Threads: TRUE
-- Configuring done (1.6s)
-- Generating done (0.0s)
-- Build files have been written to: /home/hlzl/program/cpp/thread_pool/build
```

