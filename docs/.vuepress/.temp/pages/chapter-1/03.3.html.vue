<template><div><h1 id="_3-3-调试器" tabindex="-1"><a class="header-anchor" href="#_3-3-调试器"><span>3.3 调试器</span></a></h1>
<p>应用程序的开发过程中调试是必不可少的一个环节，因此有一个好的调试器是非常重要的，可惜的是，Go 在这方面的发展还不是很完善。目前可用的调试器是 gdb，最新版均以内置在集成开发环境 LiteIDE 和 GoClipse 中，但是该调试器的调试方式并不灵活且操作难度较大。</p>
<p>如果你不想使用调试器，你可以按照下面的一些有用的方法来达到基本调试的目的：</p>
<ol>
<li>
<p>在合适的位置使用打印语句输出相关变量的值（<code v-pre>print</code>/<code v-pre>println</code> 和 <code v-pre>fmt.Print</code>/<code v-pre>fmt.Println</code>/<code v-pre>fmt.Printf</code>）。</p>
</li>
<li>
<p>在 <code v-pre>fmt.Printf</code> 中使用下面的说明符来打印有关变量的相关信息：</p>
<ul>
<li><code v-pre>%+v</code> 打印包括字段在内的实例的完整信息</li>
<li><code v-pre>%#v</code> 打印包括字段和限定类型名称在内的实例的完整信息</li>
<li><code v-pre>%T</code> 打印某个类型的完整说明</li>
</ul>
</li>
<li>
<p>使用 <code v-pre>panic()</code> 语句（<RouteLink to="/chapter-1/13.2.html">第 13.2 节</RouteLink>）来获取栈跟踪信息（直到 <code v-pre>panic()</code> 时所有被调用函数的列表）。</p>
</li>
<li>
<p>使用关键字 <code v-pre>defer</code> 来跟踪代码执行过程（<RouteLink to="/chapter-1/06.4.html">第 6.4 节</RouteLink>）。</p>
</li>
</ol>
<h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-1/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-1/03.2.html">编辑器和集成开发环境</RouteLink></li>
<li>下一节：<RouteLink to="/chapter-1/03.4.html">构建并运行 Go 程序</RouteLink></li>
</ul>
</div></template>


