<template><div><h1 id="_19-1-简介" tabindex="-1"><a class="header-anchor" href="#_19-1-简介"><span>19.1 简介</span></a></h1>
<p>由于 web 无处不在，本章我们将开发一个完整的程序：<code v-pre>goto</code>，它是一个 web 缩短网址应用程序。示例来自 Andrew Gerrand 的讲座（见参考资料 22）。我们将把项目分成 3 个阶段，每一个都会比之前阶段包含更多的功能，并逐渐展示更多 Go 语言中的特性。我们会大量使用在 <RouteLink to="/chapter-4/15.0.html">15 章</RouteLink>所学的网页应用程序的知识。</p>
<p><strong>版本 1：</strong> 利用映射和结构体，与 <code v-pre>sync</code> 包的 <code v-pre>Mutex</code> 一起使用，以及一个结构体工厂。</p>
<p><strong>版本 2：</strong> 数据以 <code v-pre>gob</code> 格式写入文件以实现持久化。</p>
<p><strong>版本 3：</strong> 利用协程和通道重写应用（见 <RouteLink to="/chapter-4/14.0.html">14 章</RouteLink>）。</p>
<p><strong>版本 4：</strong> 如果我们要使用 json 格式的文件该如何修改？</p>
<p><strong>版本 5：</strong> 用 rpc 协议实现的分布式版本。</p>
<p>由于代码变更频繁，不会展示在此处，仅给出访问地址。</p>
<h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-4/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-4/19.0.html">构建一个完整的应用程序</RouteLink></li>
<li>下一节：<RouteLink to="/chapter-4/19.2.html">短网址项目简介</RouteLink></li>
</ul>
</div></template>


