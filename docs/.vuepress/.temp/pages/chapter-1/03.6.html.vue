<template><div><h1 id="_3-6-生成代码文档" tabindex="-1"><a class="header-anchor" href="#_3-6-生成代码文档"><span>3.6 生成代码文档</span></a></h1>
<p>godoc 工具会从 Go 程序和包文件中提取顶级声明的首行注释以及每个对象的相关注释，并生成相关文档。</p>
<p>它也可以作为一个提供在线文档浏览的 web 服务器，<a href="http://golang.org" target="_blank" rel="noopener noreferrer">http://golang.org</a> 就是通过这种形式实现的。</p>
<p><strong>一般用法</strong></p>
<ul>
<li><code v-pre>go doc package</code> 获取包的文档注释，例如：<code v-pre>go doc fmt</code> 会显示使用 godoc 生成的 <code v-pre>fmt</code> 包的文档注释。</li>
<li><code v-pre>go doc package/subpackage</code> 获取子包的文档注释，例如：<code v-pre>go doc container/list</code>。</li>
<li><code v-pre>go doc package function</code> 获取某个函数在某个包中的文档注释，例如：<code v-pre>go doc fmt Printf</code> 会显示有关 <code v-pre>fmt.Printf()</code> 的使用说明。</li>
</ul>
<p>这个工具只能获取在 Go 安装目录下 <code v-pre>../go/src</code> 中的注释内容。此外，它还可以作为一个本地文档浏览 web 服务器。在命令行输入 <code v-pre>godoc -http=:6060</code>，然后使用浏览器打开 <a href="http://localhost:6060" target="_blank" rel="noopener noreferrer">http://localhost:6060</a> 后，你就可以看到本地文档浏览服务器提供的页面。</p>
<p>godoc 也可以用于生成非标准库的 Go 源码文件的文档注释（<RouteLink to="/chapter-1/09.6.html">第 9.6 章</RouteLink>）。</p>
<p>如果想要获取更多有关 <code v-pre>godoc</code> 的信息，请访问该页面：<a href="http://golang.org/cmd/godoc/" target="_blank" rel="noopener noreferrer">http://golang.org/cmd/godoc/</a>（在线版的第三方包 godoc 可以使用 <a href="https://gowalker.org" target="_blank" rel="noopener noreferrer">Go Walker</a>）。</p>
<h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-1/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-1/03.5.html">格式化代码</RouteLink></li>
<li>下一节：<RouteLink to="/chapter-1/03.7.html">其它工具</RouteLink></li>
</ul>
</div></template>


