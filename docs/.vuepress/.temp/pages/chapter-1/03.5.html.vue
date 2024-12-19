<template><div><h1 id="_3-5-格式化代码" tabindex="-1"><a class="header-anchor" href="#_3-5-格式化代码"><span>3.5 格式化代码</span></a></h1>
<p>Go 开发团队不想要 Go 语言像许多其它语言那样总是在为代码风格而引发无休止的争论，浪费大量宝贵的开发时间，因此他们制作了一个工具：<code v-pre>go fmt</code> (gofmt)。这个工具可以将你的源代码格式化成符合官方统一标准的风格，属于语法风格层面上的小型重构。遵循统一的代码风格是 Go 开发中无可撼动的铁律，因此你必须在编译或提交版本管理系统之前使用 gofmt 来格式化你的代码。</p>
<p>尽管这种做法也存在一些争论，但使用 gofmt 后你不再需要自成一套代码风格而是和所有人使用相同的规则。这不仅增强了代码的可读性，而且在接手外部 Go 项目时，可以更快地了解其代码的含义。此外，大多数开发工具也都内置了这一功能。</p>
<p>Go 对于代码的缩进层级方面使用 tab 还是空格并没有强制规定，一个 tab 可以代表 4 个或 8 个空格。在实际开发中，1 个 tab 应该代表 4 个空格，而在本身的例子当中，每个 tab 代表 8 个空格。至于开发工具方面，一般都是直接使用 tab 而不替换成空格。</p>
<p>在命令行输入 <code v-pre>gofmt –w program.go</code> 会格式化该源文件的代码然后将格式化后的代码覆盖原始内容（如果不加参数 <code v-pre>-w</code> 则只会打印格式化后的结果而不重写文件）；<code v-pre>gofmt -w *.go</code> 会格式化并重写所有 Go 源文件；<code v-pre>gofmt map1</code> 会格式化并重写 <code v-pre>map1</code> 目录及其子目录下的所有 Go 源文件。</p>
<p><code v-pre>gofmt</code> 也可以通过在参数 <code v-pre>-r</code> 后面加入用双引号括起来的替换规则实现代码的简单重构，规则的格式：<code v-pre>&lt;原始内容&gt; -&gt; &lt;替换内容&gt;</code>。</p>
<p>实例：</p>
<pre><code>gofmt -r '(a) -&gt; a' –w *.go
</code></pre>
<p>上面的代码会将源文件中没有意义的括号去掉。</p>
<pre><code>gofmt -r 'a[n:len(a)] -&gt; a[n:]' –w *.go
</code></pre>
<p>上面的代码会将源文件中多余的 <code v-pre>len(a)</code> 去掉。（ <strong>译者注：了解切片 (slice) 之后就明白这为什么是多余的了</strong> ）</p>
<pre><code>gofmt –r 'A.Func1(a,b) -&gt; A.Func2(b,a)' –w *.go
</code></pre>
<p>上面的代码会将源文件中符合条件的函数的参数调换位置。</p>
<p>如果想要了解有关 <code v-pre>gofmt</code> 的更多信息，请访问该页面：<a href="http://golang.org/cmd/gofmt/" target="_blank" rel="noopener noreferrer">http://golang.org/cmd/gofmt/</a>。</p>
<h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-1/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-1/03.4.html">构建并运行 Go 程序</RouteLink></li>
<li>下一节：<RouteLink to="/chapter-1/03.6.html">生成代码文档</RouteLink></li>
</ul>
</div></template>


