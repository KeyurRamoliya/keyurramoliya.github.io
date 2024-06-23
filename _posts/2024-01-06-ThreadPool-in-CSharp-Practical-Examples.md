---
layout: post
title: "ThreadPool in C#: Practical Examples"
categories:
- programming
tags:
- C#
- Programming
- .NET
- Threading
- ThreadPool
- Understanding Threading in C#
- Practical Examples
- Concurrency
- Parallel Programming
---

In the [previous article](https://keyurramoliya.com/posts/Understanding-ThreadPool-in-CSharp/), we learned what is ThreadPool in C# and how it works behind the scenes. We also saw some of the benefits and drawbacks of using ThreadPool for concurrent programming. In this article, we will explore some practical examples of using ThreadPool in C# to perform parallel tasks. We will also discuss some of the challenges and best practices of using ThreadPool in C#.

## Using ThreadPool in C#: Practical Examples
ThreadPool is a useful class for executing multiple tasks in parallel without creating and managing individual threads. ThreadPool provides a method called `QueueUserWorkItem` that allows us to queue a work item (a delegate or a lambda expression) to be executed by a thread from the pool. The work item can accept an optional state object as a parameter. For example, the following code queues two work items to the ThreadPool:

```csharp
using System;
using System.Threading;

namespace ThreadPoolDemo
{
    class Program
    {
        static void Main(string[] args)
        {
            // Queue two work items to the ThreadPool
            ThreadPool.QueueUserWorkItem(WorkItem1, "Hello");
            ThreadPool.QueueUserWorkItem(WorkItem2, 42);

            // Wait for the work items to complete
            Thread.Sleep(1000);

            Console.WriteLine("Main thread exits");
        }

        // A work item that prints a message
        static void WorkItem1(object state)
        {
            Console.WriteLine("WorkItem1: {0}", state);
        }

        // A work item that calculates and prints the square of a number
        static void WorkItem2(object state)
        {
            int num = (int)state;
            int square = num * num;
            Console.WriteLine("WorkItem2: {0} * {0} = {1}", num, square);
        }
    }
}
```

The output of the program may vary depending on the order of execution of the work items, but it could look something like this:

```
WorkItem2: 42 * 42 = 1764
WorkItem1: Hello
Main thread exits
```

Notice that the main thread will not wait for the work items to finish before exiting. This means that the work items may not complete if the main thread terminates the application. To avoid this, we can use a synchronization mechanism such as a `ManualResetEvent` or a `CountdownEvent` to signal the completion of the work items and wait for them in the main thread. For example, the following code uses a `CountdownEvent` to wait for two work items to finish:

```csharp
using System;
using System.Threading;

namespace ThreadPoolDemo
{
    class Program
    {
        static void Main(string[] args)
        {
            // Create a CountdownEvent with an initial count of 2
            CountdownEvent countdown = new CountdownEvent(2);

            // Queue two work items to the ThreadPool and pass the countdown as the state object
            ThreadPool.QueueUserWorkItem(WorkItem1, countdown);
            ThreadPool.QueueUserWorkItem(WorkItem2, countdown);

            // Wait for the countdown to reach zero
            countdown.Wait();

            Console.WriteLine("Main thread exits");
        }

        // A work item that prints a message and signals the countdown
        static void WorkItem1(object state)
        {
            Console.WriteLine("WorkItem1");
            CountdownEvent countdown = (CountdownEvent)state;
            countdown.Signal();
        }

        // A work item that prints a message and signals the countdown
        static void WorkItem2(object state)
        {
            Console.WriteLine("WorkItem2");
            CountdownEvent countdown = (CountdownEvent)state;
            countdown.Signal();
        }
    }
}
```

The output of the program may look something like this:

```
WorkItem1
WorkItem2
Main thread exits
```

In the above code, the main thread waits for the work items to finish before exiting. This ensures that the work items complete their execution.

Sometimes, we may want to queue a work item that returns a result. For this, we can use the `Task` class, which represents an asynchronous operation that can return a value. The `Task` class provides a static method called `Run` that allows us to queue a work item (a delegate or a lambda expression) to the ThreadPool and return a `Task` object that represents the operation. The `Task` object has a property called `Result` that returns the value of the work item when it completes. For example, the following code queues two work items that return the sum and the product of two numbers:

```csharp
using System;
using System.Threading.Tasks;

namespace ThreadPoolDemo
{
    class Program
    {
        static void Main(string[] args)
        {
            // Queue two work items to the ThreadPool using Task.Run and store the Task objects
            Task<int> task1 = Task.Run(() => Sum(10, 20));
            Task<int> task2 = Task.Run(() => Product(10, 20));

            // Wait for the tasks to complete and get the results
            int result1 = task1.Result;
            int result2 = task2.Result;

            Console.WriteLine("Sum: {0}", result1);
            Console.WriteLine("Product: {0}", result2);

            Console.WriteLine("Main thread exits");
        }

        // A work item that returns the sum of two numbers
        static int Sum(int a, int b)
        {
            return a + b;
        }

        // A work item that returns the product of two numbers
        static int Product(int a, int b)
        {
            return a * b;
        }
    }
}
```

The output of the program may look something like this:

```
Sum: 30
Product: 200
Main thread exits
```

Now the main thread waits for the tasks to complete and gets the results using the `Result` property. This property blocks the calling thread until the task finishes. Alternatively, we can use the `Wait` method to wait for one or more tasks to complete, or the `ContinueWith` method to execute a continuation task when a task finishes.

## Thread Safety and ThreadPool
When using ThreadPool, it is important to ensure thread safety, which means that the data and resources shared by multiple threads are accessed in a consistent and correct manner. Thread safety is essential for avoiding race conditions, deadlocks, and other concurrency issues that can lead to unpredictable and erroneous behavior of the application.

One of the common thread safety challenges when using ThreadPool is to synchronize the access to shared data. For example, consider the following code that uses a shared variable `counter` to count the number of work items completed by the ThreadPool:

```csharp
using System;
using System.Threading;

namespace ThreadPoolDemo
{
    class Program
    {
        // A shared variable to count the number of work items completed
        static int counter = 0;

        static void Main(string[] args)
        {
            // Queue 10 work items to the ThreadPool
            for (int i = 0; i < 10; i++)
            {
                ThreadPool.QueueUserWorkItem(WorkItem);
            }

            // Wait for the work items to complete
            Thread.Sleep(1000);

            Console.WriteLine("Counter: {0}", counter);

            Console.WriteLine("Main thread exits");
        }

        // A work item that increments the counter
        static void WorkItem(object state)
        {
            // Increment the counter
            counter++;

            Console.WriteLine("WorkItem: {0}", counter);
        }
    }
}
```

The output of the program may vary depending on the order of execution of the work items, but it could look something like this:

```
WorkItem: 1
WorkItem: 6
WorkItem: 7
WorkItem: 8
WorkItem: 9
WorkItem: 10
WorkItem: 3
WorkItem: 4
WorkItem: 5
WorkItem: 2
Counter: 10
Main thread exits
```

This output seems correct, but it is not guaranteed. The problem is that the `counter++` operation is not atomic, which means that it involves multiple steps: reading the value of `counter`, adding one to it, and storing the new value back to `counter`. If two or more threads execute this operation concurrently, they may read the same value of `counter`, increment it, and overwrite each other's results. This can lead to incorrect and inconsistent values of `counter`.

To avoid this, we need to use a synchronization mechanism such as a `lock` statement or an `Interlocked` method to ensure that only one thread can access the shared variable at a time. For example, the following code uses the `Interlocked.Increment` method to atomically increment the counter:

```csharp
using System;
using System.Threading;

namespace ThreadPoolDemo
{
    class Program
    {
        // A shared variable to count the number of work items completed
        static int counter = 0;

        static void Main(string[] args)
        {
            // Queue 10 work items to the ThreadPool
            for (int i = 0; i < 10; i++)
            {
                ThreadPool.QueueUserWorkItem(WorkItem);
            }

            // Wait for the work items to complete
            Thread.Sleep(1000);

            Console.WriteLine("Counter: {0}", counter);

            Console.WriteLine("Main thread exits");
        }

        // A work item that increments the counter
        static void WorkItem(object state)
        {
            // Increment the counter atomically using Interlocked.Increment
            int value = Interlocked.Increment(ref counter);

            Console.WriteLine("WorkItem: {0}", value);
        }
    }
}
```

The output of the program may look something like this:

```
WorkItem: 1
WorkItem: 6
WorkItem: 7
WorkItem: 8
WorkItem: 9
WorkItem: 10
WorkItem: 5
WorkItem: 4
WorkItem: 3
WorkItem: 2
Counter: 10
Main thread exits
```

## Monitoring and Managing ThreadPool
Another challenge when using ThreadPool is to monitor and manage its performance and behavior. ThreadPool has a limited number of threads that it can use to execute work items. If the number of work items exceeds the number of available threads, the work items are queued and wait for a thread to become free. This can affect the responsiveness and throughput of the application.

To monitor and manage ThreadPool, we can use some of the properties and methods provided by the `ThreadPool` class. For example, we can use the following properties to get or set the minimum and maximum number of threads in the ThreadPool:

- `GetMinThreads` and `SetMinThreads`: These methods get or set the minimum number of threads that the ThreadPool maintains in the pool. The minimum number of threads determines the lower bound of threads that are available to execute work items. Increasing the minimum number of threads can reduce the latency of work items, but it can also increase the resource consumption and contention of the application.
- `GetMaxThreads` and `SetMaxThreads`: These methods get or set the maximum number of threads that the ThreadPool can create in the pool. The maximum number of threads determines the upper bound of threads that are available to execute work items. Decreasing the maximum number of threads can reduce the resource consumption and contention of the application, but it can also increase the latency and queue length of work items.

The following code shows how to use these methods to get and set the minimum and maximum number of threads in the ThreadPool:

```csharp
using System;
using System.Threading;

namespace ThreadPoolDemo
{
    class Program
    {
        static void Main(string[] args)
        {
            // Get the minimum and maximum number of threads in the ThreadPool
            int minWorkerThreads, minCompletionPortThreads;
            int maxWorkerThreads, maxCompletionPortThreads;
            ThreadPool.GetMinThreads(out minWorkerThreads, out minCompletionPortThreads);
            ThreadPool.GetMaxThreads(out maxWorkerThreads, out maxCompletionPortThreads);

            Console.WriteLine("Minimum worker threads: {0}", minWorkerThreads);
            Console.WriteLine("Minimum completion port threads: {0}", minCompletionPortThreads);
            Console.WriteLine("Maximum worker threads: {0}", maxWorkerThreads);
            Console.WriteLine("Maximum completion port threads: {0}", maxCompletionPortThreads);

            // Set the minimum and maximum number of threads in the ThreadPool
            ThreadPool.SetMinThreads(10, 10);
            ThreadPool.SetMaxThreads(20, 20);

            Console.WriteLine("Main thread exits");
        }
    }
}
```

The output of the program may look something like this:

```
Minimum worker threads: 6
Minimum completion port threads: 1
Maximum worker threads: 32767
Maximum completion port threads: 1000
Main thread exits
```

Notice that the ThreadPool has two types of threads: worker threads and completion port threads. Worker threads are used to execute normal work items, while completion port threads are used to handle asynchronous I/O operations. The minimum and maximum number of threads can be set separately for each type of thread.

Another method that can be used to monitor and manage ThreadPool is `GetAvailableThreads`, which returns the number of threads in the ThreadPool that are available to execute work items. This method can be useful to determine the degree of concurrency and utilization of the ThreadPool. For example, the following code uses the `GetAvailableThreads` method to print the number of available threads before and after queuing 10 work items to the ThreadPool:

```csharp
using System;
using System.Threading;

namespace ThreadPoolDemo
{
    class Program
    {
        static void Main(string[] args)
        {
            // Get the number of available threads in the ThreadPool
            int availableWorkerThreads, availableCompletionPortThreads;
            ThreadPool.GetAvailableThreads(out availableWorkerThreads, out availableCompletionPortThreads);

            Console.WriteLine("Available worker threads: {0}", availableWorkerThreads);
            Console.WriteLine("Available completion port threads: {0}", availableCompletionPortThreads);

            // Queue 10 work items to the ThreadPool
            for (int i = 0; i < 10; i++)
            {
                ThreadPool.QueueUserWorkItem(WorkItem);
            }

            // Wait for the work items to complete
            Thread.Sleep(1000);

            // Get the number of available threads in the ThreadPool again
            ThreadPool.GetAvailableThreads(out availableWorkerThreads, out availableCompletionPortThreads);

            Console.WriteLine("Available worker threads: {0}", availableWorkerThreads);
            Console.WriteLine("Available completion port threads: {0}", availableCompletionPortThreads);

            Console.WriteLine("Main thread exits");
        }

        // A work item that prints a message and sleeps for 100 milliseconds
        static void WorkItem(object state)
        {
            Console.WriteLine("WorkItem");
            Thread.Sleep(100);
        }
    }
}
```

The output of the program may look something like this:

```
Available worker threads: 32766
Available completion port threads: 1000
WorkItem
WorkItem
WorkItem
WorkItem
WorkItem
WorkItem
WorkItem
WorkItem
WorkItem
WorkItem
Available worker threads: 32766
Available completion port threads: 1000
Main thread exits
```

Note that the number of available worker threads does not change before and after queuing the work items. This is because the ThreadPool creates new threads as needed to execute the work items, up to the maximum number of threads. However, if the number of work items exceeds the maximum number of threads, the number of available threads will decrease and the work items will be queued.

## Best Practices for ThreadPool in C#
Using ThreadPool can improve the performance and scalability of the application, but it also requires some care and attention to avoid common pitfalls and errors. Here are some of the best practices for using ThreadPool in C#:

- Use ThreadPool for short-lived and CPU-bound work items. ThreadPool is designed for executing small and fast tasks that do not block or wait for external resources. If the work items are long-running or I/O-bound, they can consume the threads in the ThreadPool and reduce its responsiveness and throughput. For such work items, it is better to use dedicated threads or asynchronous methods.
- Avoid modifying the minimum and maximum number of threads in the ThreadPool. The ThreadPool has a dynamic and adaptive algorithm that adjusts the number of threads in the pool based on the workload and system resources. Changing the minimum and maximum number of threads can interfere with this algorithm and degrade the performance and efficiency of the ThreadPool. Unless there is a specific reason to do so, it is better to leave the default settings of the ThreadPool.
- Use thread-safe data structures and synchronization mechanisms when accessing shared data. As we discussed earlier, thread safety is essential for avoiding concurrency issues when using ThreadPool. To ensure thread safety, we should use data structures and synchronization mechanisms that are designed for concurrent access, such as `ConcurrentDictionary`, `ConcurrentQueue`, `lock`, `Interlocked`, `Monitor`, etc.
- Handle exceptions and errors in the work items. If a work item throws an unhandled exception, it can terminate the thread that executes it and affect the stability of the application. To prevent this, we should use try-catch blocks to catch and handle any exceptions or errors that may occur in the work items. We can also use the `Task` class to queue work items and handle exceptions using the `Exception` property or the `ContinueWith` method.
- Use cancellation tokens to cancel work items. Sometimes, we may want to cancel a work item that is queued to the ThreadPool, for example, if the user requests to stop the operation or if the application needs to shut down. To cancel a work item, we can use a `CancellationToken` object that can be passed to the work item as a state object or as a parameter. The work item can check the `IsCancellationRequested` property of the `CancellationToken` object and exit gracefully if it is true. We can also use the `Task` class to queue work items and cancel them using the `CancellationTokenSource` class or the `Cancel` method.

## Conclusion
In this article, we learned how to use ThreadPool in C# to perform parallel tasks. We saw some practical examples of using ThreadPool to queue work items and retrieve results. We also discussed some of the challenges and best practices of using ThreadPool in C#. ThreadPool is a powerful and convenient class for concurrent programming, but it also requires some care and attention to use it effectively and correctly. I hope that this article has helped you understand and appreciate the ThreadPool in C#.
