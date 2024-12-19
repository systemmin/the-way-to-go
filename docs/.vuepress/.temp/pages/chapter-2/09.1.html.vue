<template><div><h1 id="_9-1-标准库概述" tabindex="-1"><a class="header-anchor" href="#_9-1-标准库概述"><span>9.1 标准库概述</span></a></h1>
<p>像 <code v-pre>fmt</code>、<code v-pre>os</code> 等这样具有常用功能的内置包在 Go 语言中有 150 个以上，它们被称为标准库，大部分(一些底层的除外)内置于 Go 本身。完整列表可以在 <a href="https://gowalker.org/search?q=gorepos" target="_blank" rel="noopener noreferrer">Go Walker</a> 查看。</p>
<p>在贯穿本书的例子和练习中，我们都是用标准库的包。可以通过查阅第 350 页包中的内容快速找到相关的包的实例。这里我们只是按功能进行分组来介绍这些包的简单用途，我们不会深入讨论他们的内部结构。</p>
<ul>
<li><code v-pre>unsafe</code>: 包含了一些打破 Go 语言“类型安全”的命令，一般的程序中不会被使用，可用在 C/C++ 程序的调用中。</li>
<li><code v-pre>syscall</code>-<code v-pre>os</code>-<code v-pre>os/exec</code>:
<ul>
<li><code v-pre>os</code>: 提供给我们一个平台无关性的操作系统功能接口，采用类 Unix 设计，隐藏了不同操作系统间的差异，让不同的文件系统和操作系统对象表现一致。</li>
<li><code v-pre>os/exec</code>: 提供我们运行外部操作系统命令和程序的方式。</li>
<li><code v-pre>syscall</code>: 底层的外部包，提供了操作系统底层调用的基本接口。</li>
</ul>
</li>
</ul>
<p>通过一个 Go 程序让Linux重启来体现它的能力。</p>
<p>示例 9.1 <a href="examples/chapter_9/reboot.go">reboot.go</a>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"syscall"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> LINUX_REBOOT_MAGIC1 <span class="token builtin">uintptr</span> <span class="token operator">=</span> <span class="token number">0xfee1dead</span></span>
<span class="line"><span class="token keyword">const</span> LINUX_REBOOT_MAGIC2 <span class="token builtin">uintptr</span> <span class="token operator">=</span> <span class="token number">672274793</span></span>
<span class="line"><span class="token keyword">const</span> LINUX_REBOOT_CMD_RESTART <span class="token builtin">uintptr</span> <span class="token operator">=</span> <span class="token number">0x1234567</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	syscall<span class="token punctuation">.</span><span class="token function">Syscall</span><span class="token punctuation">(</span>syscall<span class="token punctuation">.</span>SYS_REBOOT<span class="token punctuation">,</span></span>
<span class="line">		LINUX_REBOOT_MAGIC1<span class="token punctuation">,</span></span>
<span class="line">		LINUX_REBOOT_MAGIC2<span class="token punctuation">,</span></span>
<span class="line">		LINUX_REBOOT_CMD_RESTART<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>archive/tar</code> 和 <code v-pre>/zip-compress</code>：压缩（解压缩）文件功能。</li>
<li><code v-pre>fmt</code>-<code v-pre>io</code>-<code v-pre>bufio</code>-<code v-pre>path/filepath</code>-<code v-pre>flag</code>:
<ul>
<li><code v-pre>fmt</code>: 提供了格式化输入输出功能。</li>
<li><code v-pre>io</code>: 提供了基本输入输出功能，大多数是围绕系统功能的封装。</li>
<li><code v-pre>bufio</code>: 缓冲输入输出功能的封装。</li>
<li><code v-pre>path/filepath</code>: 用来操作在当前系统中的目标文件名路径。</li>
<li><code v-pre>flag</code>: 对命令行参数的操作。</li>
</ul>
</li>
<li><code v-pre>strings</code>-<code v-pre>strconv</code>-<code v-pre>unicode</code>-<code v-pre>regexp</code>-<code v-pre>bytes</code>:
<ul>
<li><code v-pre>strings</code>: 提供对字符串的操作。</li>
<li><code v-pre>strconv</code>: 提供将字符串转换为基础类型的功能。</li>
<li><code v-pre>unicode</code>: 为 unicode 型的字符串提供特殊的功能。</li>
<li><code v-pre>regexp</code>: 正则表达式功能。</li>
<li><code v-pre>bytes</code>: 提供对字符型分片的操作。</li>
<li><code v-pre>index/suffixarray</code>: 子字符串快速查询。</li>
</ul>
</li>
<li><code v-pre>math</code>-<code v-pre>math/cmath</code>-<code v-pre>math/big</code>-<code v-pre>math/rand</code>-<code v-pre>sort</code>:
<ul>
<li><code v-pre>math</code>: 基本的数学函数。</li>
<li><code v-pre>math/cmath</code>: 对复数的操作。</li>
<li><code v-pre>math/rand</code>: 伪随机数生成。</li>
<li><code v-pre>sort</code>: 为数组排序和自定义集合。</li>
<li><code v-pre>math/big</code>: 大数的实现和计算。</li>
</ul>
</li>
<li><code v-pre>container</code>-<code v-pre>/list-ring-heap</code>: 实现对集合的操作。
<ul>
<li><code v-pre>list</code>: 双链表。</li>
<li><code v-pre>ring</code>: 环形链表。</li>
</ul>
</li>
</ul>
<p>下面代码演示了如何遍历一个链表(当 l 是 <code v-pre>*List</code>)：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">for</span> e <span class="token operator">:=</span> l<span class="token punctuation">.</span><span class="token function">Front</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> e <span class="token operator">!=</span> <span class="token boolean">nil</span><span class="token punctuation">;</span> e <span class="token operator">=</span> e<span class="token punctuation">.</span><span class="token function">Next</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token comment">//do something with e.Value</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>time</code>-<code v-pre>log</code>:
<ul>
<li><code v-pre>time</code>: 日期和时间的基本操作。</li>
<li><code v-pre>log</code>: 记录程序运行时产生的日志，我们将在后面的章节使用它。</li>
</ul>
</li>
<li><code v-pre>encoding/json</code>-<code v-pre>encoding/xml</code>-<code v-pre>text/template</code>:
<ul>
<li><code v-pre>encoding/json</code>: 读取并解码和写入并编码 JSON 数据。</li>
<li><code v-pre>encoding/xml</code>: 简单的 XML1.0 解析器，有关 JSON 和 XML 的实例请查阅第 <RouteLink to="/chapter-2/12.9.html">12.9</RouteLink>/<RouteLink to="/chapter-2/10.0.html">10</RouteLink> 章节。</li>
<li><code v-pre>text/template</code>:生成像 HTML 一样的数据与文本混合的数据驱动模板（参见<RouteLink to="/chapter-2/15.7.html">第 15.7 节</RouteLink>）。</li>
</ul>
</li>
<li><code v-pre>net</code>-<code v-pre>net/http</code>-<code v-pre>html</code>:（参见<RouteLink to="/chapter-2/15.0.html">第 15 章</RouteLink>）
<ul>
<li><code v-pre>net</code>: 网络数据的基本操作。</li>
<li><code v-pre>http</code>: 提供了一个可扩展的 HTTP 服务器和基础客户端，解析 HTTP 请求和回复。</li>
<li><code v-pre>html</code>: HTML5 解析器。</li>
</ul>
</li>
<li><code v-pre>runtime</code>: Go 程序运行时的交互操作，例如垃圾回收和协程创建。</li>
<li><code v-pre>reflect</code>: 实现通过程序运行时反射，让程序操作任意类型的变量。</li>
</ul>
<p><code v-pre>exp</code> 包中有许多将被编译为新包的实验性的包。在下次稳定版本发布的时候，它们将成为独立的包。如果前一个版本已经存在了，它们将被作为过时的包被回收。然而 Go1.0 发布的时候并没有包含过时或者实验性的包。</p>
<p><strong>练习 9.1</strong> <a href="exercises/chapter_9/dlinked_list.go">Q20_linked_list.go</a></p>
<p>使用 <code v-pre>container/list</code> 包实现一个双向链表，将 <code v-pre>101</code>、<code v-pre>102</code> 和 <code v-pre>103</code> 放入其中并打印出来。</p>
<p><strong>练习 9.2</strong> <a href="exercises/chapter_9/size_int.go">size_int.go</a></p>
<p>通过使用 <code v-pre>unsafe</code> 包中的方法来测试你电脑上一个整型变量占用多少个字节。</p>
</div></template>


