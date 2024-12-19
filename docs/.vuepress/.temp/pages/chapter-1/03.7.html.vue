<template><div><h1 id="_3-7-其它工具" tabindex="-1"><a class="header-anchor" href="#_3-7-其它工具"><span>3.7 其它工具</span></a></h1>
<p>Go 自带的工具集主要使用脚本和 Go 语言自身编写的，目前版本的 Go 实现了以下三个工具：</p>
<ul>
<li><code v-pre>go install</code> 是安装 Go 包的工具，类似 Ruby 中的 rubygems。主要用于安装非标准库的包文件，将源代码编译成对象文件。</li>
<li><code v-pre>go fix</code> 用于将你的 Go 代码从旧的发行版迁移到最新的发行版，它主要负责简单的、重复的、枯燥无味的修改工作，如果像 API 等复杂的函数修改，工具则会给出文件名和代码行数的提示以便让开发人员快速定位并升级代码。Go 开发团队一般也使用这个工具升级 Go 内置工具以及 谷歌内部项目的代码。<code v-pre>go fix</code> 之所以能够正常工作是因为 Go 在标准库就提供生成抽象语法树和通过抽象语法树对代码进行还原的功能。该工具会尝试更新当前目录下的所有 Go 源文件，并在完成代码更新后在控制台输出相关的文件名称。</li>
<li><code v-pre>go test</code> 是一个轻量级的单元测试框架（<RouteLink to="/chapter-1/13.0.html">第 13 章</RouteLink>）。</li>
</ul>
<h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-1/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-1/03.6.html">生成代码文档</RouteLink></li>
<li>下一节：<RouteLink to="/chapter-1/03.8.html">Go 性能说明</RouteLink></li>
</ul>
</div></template>


