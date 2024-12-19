<template><div><h1 id="_16-8-误用协程和通道" tabindex="-1"><a class="header-anchor" href="#_16-8-误用协程和通道"><span>16.8 误用协程和通道</span></a></h1>
<p>由于教学需要和对协程的工作原理有一个直观的了解，在<RouteLink to="/chapter-4/14.0.html">第 14 章</RouteLink> 使用了一些简单的算法，举例说明了协程和通道的使用，例如生产者或者迭代器。在实际应用中，你不需要并发执行，或者你不需要关注协程和通道的开销，在大多数情况下，通过栈传递参数会更有效率。</p>
<p>但是，如果你使用 <code v-pre>break</code>、<code v-pre>return</code> 或者 <code v-pre>panic()</code> 去跳出一个循环，很有可能会导致内存溢出，因为协程正处理某些事情而被阻塞。在实际代码中，通常仅需写一个简单的过程式循环即可。<strong>当且仅当代码中并发执行非常重要，才使用协程和通道。</strong></p>
<h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-4/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-4/16.7.html">使用值类型时误用指针</RouteLink></li>
<li>下一节：<RouteLink to="/chapter-4/16.9.html">闭包和协程的使用</RouteLink></li>
</ul>
</div></template>


