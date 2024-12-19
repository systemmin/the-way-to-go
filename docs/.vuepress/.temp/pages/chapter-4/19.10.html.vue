<template><div><h1 id="_19-10-总结和增强" tabindex="-1"><a class="header-anchor" href="#_19-10-总结和增强"><span>19.10 总结和增强</span></a></h1>
<p>通过逐步构建 goto 应用程序，我们遇到了几乎所有的 Go 语言特性。</p>
<p>虽然这个程序按照我们的目标行事，仍然有一些可改进的途径：</p>
<ul>
<li><em>审美</em>：用户界面可以（极大地）美化。为此可以使用 Go 的 <code v-pre>template</code> 包（见 <RouteLink to="/chapter-4/15.7.html">15.7 节</RouteLink>）。</li>
<li><em>可靠性</em>：master/slave 之间的 RPC 连接应该可以更可靠：如果客户端到服务器之间的连接中断，客户端应该尝试重连。用一个 &quot;dialer&quot; 协程可以达成。</li>
<li><em>资源减负</em>：由于 URL 数据库大小不断增长，内存占用可能会成为一个问题。可以通过多台 master 服务器按照键分片来解决。</li>
<li><em>删除</em>：要支持删除短 URL，master 和 slave 之间的交互将变得更复杂。</li>
</ul>
<h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-4/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-4/19.9.html">使用代理缓存</RouteLink></li>
<li>下一章：<RouteLink to="/chapter-4/20.0.html">Google App Engine 中的 Go</RouteLink></li>
</ul>
</div></template>


