# `std::bind`

`std::bind`可以看作一个通用的函数适配器,它接受一个可调用对象,生成一个新的可调用对象来适应原对象的参数列表

其返回值可以使用`std::function`保存

`std::bind`主要有以下两个作用：

- 将可调用对象和其参数绑定成一个仿函数；
- 只绑定部分参数，减少可调用对象传入的参数。

在一个函数的传参是不变或固定的情况下,可以使用`std::bind`来省略固定的参数

对于不确定的参数,可以使用`std::placeholder`中的占位符来动态传参

例如

```cpp
int add(int a,int b){
	return a+b;
}

int main(){
	auto f1=std::bind(add,1,2);
	f1();//等效调用add(1,2)
	int t=0;
	auto f2=std::bind(add,1,std::placeholders::_1);
	f2(t);//等效调用add(1,t)
	
}
```

这一操作可以方便的创建无参函数,可以用于**回调函数**的应用情形

##### 函数原型

```cpp
template< class F, class... Args >
/*unspecified*/ bind( F&& f, Args&&... args );
 
template< class R, class F, class... Args >
/*unspecified*/ bind( F&& f, Args&&... args );
```

- `f`：一个可调用对象（可以是函数对象、函数指针、函数引用、成员函数指针、数据成员指针），它的参数将被绑定到`args`上。
    
- `args`：绑定参数列表，参数会被值或占位符替换，其长度必须与`f`接收的参数个数一致。
    
- `return`：`std::bind`的返回类型是一个未指定类型T的函数对象（所以可以用std::function接收），这个类型T满足以下条件: `std::is_bind_expression<T>::value == true`。
    

##### 调用形式

```cpp
auto newCallable = std::bind(callable, arg_list);
```

- 该形式表达的意思是：当调用`newCallable`时，会调用`callable`，并传给它`arg_list`中的参数

##### 代码示例

```cpp
#include <iostream>
#include <functional>
using namespace std;

void func1(int x, int y)
{
    cout << "in func1: ";
    cout << "x = " << x << ", y = " << y << endl;
}

void func2(int &a, int &b)
{
    ++a;
    ++b;
    cout << "in func2: ";
    cout << "a = " << a << ", b = " << b << endl;
}

class A
{
public:
    void func3(int a, int b)
    {
        cout << "m_name : " << m_name << endl;
        cout << " a = " << a << ", b = " << b << endl;
    }

private:
    string m_name = "test";
};

int main(int argc, char *argv[])
{

    // f1的类型为 function<void(int, int)>
    // 绑定函数 func1 的第一，二参数值为： 1 2
    auto f1 = std::bind(func1, 1, 2);
    f1();

    // 绑定函数 fun 的第二个参数为 2，而func1 的第一个参数由调用f2的时候指定
    auto f2 = std::bind(func1, std::placeholders::_1, 2);
    f2(1);

    int m = 2;
    int n = 3;
    auto f3 = std::bind(func2, std::placeholders::_1, n); //表示绑定fun_2的第一个参数为n, fun_2的第二个参数由调用f4的第一个参数（_1）指定。
    f3(m);
    std::cout << "m = " << m << std::endl; // m=3  说明：bind对于不事先绑定的参数，通过std::placeholders传递的参数是通过引用传递的,如m
    std::cout << "n = " << n << std::endl; // n=3  说明：bind对于预先绑定的函数参数是通过值传递的，如n

    A a;
    // f4的类型为 function<void(int, int)>
    auto f4 = std::bind(&A::func3, &a, std::placeholders::_1, std::placeholders::_2); //可以看到这里第二个参数是对象实例
    f4(1, 2);                                                                         //函数中可以直接输出成员变量

    return 0;
}
```

---

# `std::function`

`std::function`是一种通用的、多态的函数封装。它的原始形态是原生C中的函数指针

`std::function`的实例可以对任何可以调用的目标实体进行存储、复制和调用操作，这些目标实体包括：

- 普通函数
- 函数指针
- `lambda`表达式
- `std::bind`对象
- 函数对象

> 其中，`lambda`表达式和`bind`对象也是C++11标准中提出的。

##### 普通函数

示例：

```cpp
int func(int a)
{
    return a;
}
```

> 当然，这里的普通函数可以是在类中定义的成员函数或者静态成员函数。

##### 函数指针

示例：

```cpp
typedef int (*pfunc)(int);
//可将func赋值给该函数指针
pfunc p = func;
```

##### `Lambda`表达式

`lambda`是一段随写随用的代码，不会被不安全的访问。

示例:

```cpp
auto func = [](int a){
    return a;
};
```

##### `bind`对象

示例

```cpp
#include <iostream>
#include <functional>
using namespace std;

void func(int x, int y)
{
    cout << "in func1: ";
    cout << "x = " << x << ", y = " << y << endl;
}

int main(int argc, char *argv[])
{

    std::function<void(int, int)> fc = std::bind(func, std::placeholders::_1, std::placeholders::_2);
    fc(1, 2); //

    return 0;
}
```

##### 函数对象

重载了函数调用运算符()的类的对象，即为函数对象，也可以叫做仿函数。

示例：

```cpp
class Functor
{
public:
    int operator()(int a)
    {
        return a;
    }
};
```

##### `std::function`

从上面的情况也可以看到，可调用对象的定义方式较多，而函数调用的方式较为类似，因此需要一个统一的方式保存这些对象。`std::function`也就因此诞生。

示例：

```cpp
#include <functional>
#include <iostream>
using namespace std;

typedef std::function<int(int)> callback;

// 普通函数
int func1(int a)
{
    return a;
}

// Lambda表达式
auto func2 = [](int a)
{
    return a;
};

// 函数对象
class Functor
{
public:
    int operator()(int a)
    {
        return a;
    }
};

int main()
{
    // 普通函数
    callback cb1 = func1;
    int result = cb1(10);
    cout << "cb1->output:" << result << endl;

    // Lambda表达式
    callback cb2 = func2;
    result = cb2(20);
    cout << "cb2->output:" << result << endl;

    // 函数对象
    Functor testFunctor;
    callback cb3 = testFunctor;
    result = cb3(30);
    cout << "cb3->output:" << result << endl;

    return 0;
}
```

##### 总结

关于可调用实体转换为`std::function`对象需要遵守以下两条原则：

- 转换后的`std::function`对象的参数能转换为可调用实体的参数；
- 可调用实体的返回值能转换为`std::function`对象的返回值。



