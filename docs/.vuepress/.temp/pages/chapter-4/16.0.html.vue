<template><div><h1 id="_16-0-常见的陷阱与错误" tabindex="-1"><a class="header-anchor" href="#_16-0-常见的陷阱与错误"><span>16.0 常见的陷阱与错误</span></a></h1>
<p>在之前的内容中，有时候使用 <code v-pre>!!...!!</code> 标记警告 Go 语言中的一些错误使用方式。当你在编程时候遇到的一个困难，可以确定本书特定的章节能找到类似的主题。为了方便起见，这里列出了一些常见陷阱，以便于你能发现更多的解释和例子：</p>
<ul>
<li>永远不要使用形如 <code v-pre>var p*a</code> 声明变量，这会混淆指针声明和乘法运算（参考 <RouteLink to="/chapter-4/04.9.html">4.9 小节</RouteLink>）</li>
<li>永远不要在 <code v-pre>for</code> 循环自身中改变计数器变量（参考 <RouteLink to="/chapter-4/05.4.html">5.4 小节</RouteLink>）</li>
<li>永远不要在 <code v-pre>for-range</code> 循环中使用一个值去改变自身的值（参考 <RouteLink to="/chapter-4/05.4.html">5.4.4 小节</RouteLink>）</li>
<li>永远不要将 <code v-pre>goto</code> 和前置标签一起使用（参考 <RouteLink to="/chapter-4/05.6.html">5.6 小节</RouteLink>）</li>
<li>永远不要忘记在函数名（参考<RouteLink to="/chapter-4/06.0.html">第 6 章</RouteLink>）后加括号 <code v-pre>()</code>，尤其是调用一个对象的方法或者使用匿名函数启动一个协程时</li>
<li>永远不要使用 <code v-pre>new()</code> 一个 <code v-pre>map</code>，一直使用 <code v-pre>make()</code>（参考<RouteLink to="/chapter-4/08.0.html">第 8 章</RouteLink>）</li>
<li>当为一个类型定义一个 <code v-pre>String()</code> 方法时，不要使用 <code v-pre>fmt.Print</code> 或者类似的代码（参考 <RouteLink to="/chapter-4/10.7.html">10.7 小节</RouteLink>）</li>
<li>永远不要忘记当终止缓存写入时，使用 <code v-pre>Flush()</code> 函数（参考 <RouteLink to="/chapter-4/12.2.html">12.2.3 小节</RouteLink>）</li>
<li>永远不要忽略错误提示，忽略错误会导致程序崩溃（参考 <RouteLink to="/chapter-4/13.1.html">13.1 小节</RouteLink>）</li>
<li>不要使用全局变量或者共享内存，这会使并发执行的代码变得不安全（参考 <RouteLink to="/chapter-4/14.1.html">14.1 小节</RouteLink>）</li>
<li><code v-pre>println()</code> 函数仅仅是用于调试的目的</li>
</ul>
<p>最佳实践：对比以下使用方式：</p>
<ul>
<li>使用正确的方式初始化一个元素是切片的映射，例如 <code v-pre>map[type]slice</code>（参考 <RouteLink to="/chapter-4/08.1.html">8.1.3 小节</RouteLink>）</li>
<li>一直使用逗号 ok 模式或者 checked 形式作为类型断言（参考 <RouteLink to="/chapter-4/11.3.html">11.3 小节</RouteLink>）</li>
<li>使用一个工厂函数创建并初始化自己定义类型（参考 <RouteLink to="/chapter-4/10.2.html">10.2 小节</RouteLink>-<RouteLink to="/chapter-4/18.4.html">18.4 小节</RouteLink>）</li>
<li>仅当一个结构体的方法想改变结构体时，使用结构体指针作为方法的接受者，否则使用一个结构体值类型 <RouteLink to="/chapter-4/10.6.html">10.6.3 小节</RouteLink></li>
</ul>
<p>本章主要汇总了 Go 语言使用过程中最常见的错误和注意事项。在之前的章节已经涉及到了完整的示例和解释，你应该做的不仅仅是阅读这段的标题。</p>
<h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-4/directory.html">目录</RouteLink></li>
<li>上一章：<RouteLink to="/chapter-4/15.12.html">使用SMTP（简单邮件传输协议）发送邮件</RouteLink></li>
<li>下一节：<RouteLink to="/chapter-4/16.1.html">误用短声明导致变量覆盖</RouteLink></li>
</ul>
</div></template>


