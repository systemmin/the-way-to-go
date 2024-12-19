<template><div><h1 id="_3-4-构建并运行-go-程序" tabindex="-1"><a class="header-anchor" href="#_3-4-构建并运行-go-程序"><span>3.4 构建并运行 Go 程序</span></a></h1>
<p>在大多数 IDE 中，每次构建程序之前都会自动调用源码格式化工具 <code v-pre>gofmt</code> 并保存格式化后的源文件。如果构建成功则不会输出任何信息，而当发生编译时错误时，则会指明源码中具体第几行出现了什么错误，如：<code v-pre>a declared and not used</code>。一般情况下，你可以双击 IDE 中的错误信息直接跳转到发生错误的那一行。</p>
<p>如果程序执行一切顺利并成功退出后，将会在控制台输出 <code v-pre>Program exited with code 0</code>。</p>
<p>从 Go 1 版本开始，使用 Go 自带的更加方便的工具来构建应用程序：</p>
<ul>
<li><code v-pre>go build</code> 编译自身包和依赖包</li>
<li><code v-pre>go install</code> 编译并安装自身包和依赖包</li>
</ul>
<h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-1/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-1/03.3.html">调试器</RouteLink></li>
<li>下一节：<RouteLink to="/chapter-1/03.5.html">格式化代码</RouteLink></li>
</ul>
</div></template>


