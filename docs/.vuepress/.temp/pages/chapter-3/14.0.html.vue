<template><div><h1 id="_14-0-协程-goroutine-与通道-channel" tabindex="-1"><a class="header-anchor" href="#_14-0-协程-goroutine-与通道-channel"><span>14.0 协程 (goroutine) 与通道 (channel)</span></a></h1>
<p>作为一门 21 世纪的语言，Go 原生支持应用之间的通信（网络，客户端和服务端，分布式计算，参见<RouteLink to="/chapter-3/15.0.html">第 15 章</RouteLink>和程序的并发。程序可以在不同的处理器和计算机上同时执行不同的代码段。Go 语言为构建并发程序的基本代码块是协程 (goroutine) 与通道 (channel)。他们需要语言，编译器，和 runtime 的支持。Go 语言提供的垃圾回收器对并发编程至关重要。</p>
<p><strong>不要通过共享内存来通信，而通过通信来共享内存。</strong></p>
<p>通信强制协作。</p>
<h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-3/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-3/13.10.html">性能调试：分析并优化 Go 程序</RouteLink></li>
<li>下一节：<RouteLink to="/chapter-3/14.1.html">并发、并行和协程</RouteLink></li>
</ul>
</div></template>


