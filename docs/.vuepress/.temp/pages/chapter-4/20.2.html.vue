<template><div><h1 id="_20-2-云上的-go" tabindex="-1"><a class="header-anchor" href="#_20-2-云上的-go"><span>20.2 云上的 Go</span></a></h1>
<p>2011 年 5 月10 日，在谷歌 I/O 大会上首次宣布了 GAE 对 Go 的支持。其最初是试验性的，只针对注册的测试人员，到 2011 年 7 月 21 日才完全对每个开发者开放。在撰写本文时（2012 年 1 月），目前的 Go App Engine SDK 是 1.6.1（2011-12-13 发布）；它只存在于 Linux 和 Mac OS X（10.5 或更高版本），包括 32 和 64 位。支持的 Go 工具链是 r60.3 版本；一些变化是向后不兼容的，其 SDK 的 api_version 是 3。</p>
<p>当 Go 应用在 App Engine上运行时，它是用 64 位 x86 编译器 (6g) 编译的。在一个给定的实例中只运行一个线程。也就是说，所有的 goroutines 都在同一个操作系统的线程中运行，所以对于一个给定的客户请求来说，没有 CPU 并行性可言。</p>
<p>Go 是第一个在 App Engine 上运行的编译语言。它之所以能大放异彩，是因为它与其他两个语言运行时相比，表现非常出色。</p>
<ul>
<li>和 Java 相比：Go 有更好的实例启动时间和更多的并发可能性。</li>
<li>和 Python 相比：Go 的执行速度要好得多。</li>
</ul>
<h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-4/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-4/20.1.html">什么是 Google App Engine？</RouteLink></li>
<li>下一节：<RouteLink to="/chapter-4/20.3.html">安装 Go App Engine SDK：为 Go 部署的开发环境</RouteLink></li>
</ul>
</div></template>


