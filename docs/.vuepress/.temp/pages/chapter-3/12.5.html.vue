<template><div><h1 id="_12-5-用-buffer-读取文件" tabindex="-1"><a class="header-anchor" href="#_12-5-用-buffer-读取文件"><span>12.5 用 buffer 读取文件</span></a></h1>
<p>在下面的例子中，我们结合使用了缓冲读取文件和命令行 flag 解析这两项技术。如果不加参数，那么你输入什么屏幕就打印什么。</p>
<p>参数被认为是文件名，如果文件存在的话就打印文件内容到屏幕。命令行执行 <code v-pre>cat test</code> 测试输出。</p>
<p>示例 12.11 <a href="examples/chapter_12/cat.go">cat.go</a>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"bufio"</span></span>
<span class="line">	<span class="token string">"flag"</span></span>
<span class="line">	<span class="token string">"fmt"</span></span>
<span class="line">	<span class="token string">"io"</span></span>
<span class="line">	<span class="token string">"os"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">cat</span><span class="token punctuation">(</span>r <span class="token operator">*</span>bufio<span class="token punctuation">.</span>Reader<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">for</span> <span class="token punctuation">{</span></span>
<span class="line">		buf<span class="token punctuation">,</span> err <span class="token operator">:=</span> r<span class="token punctuation">.</span><span class="token function">ReadBytes</span><span class="token punctuation">(</span><span class="token char">'\n'</span><span class="token punctuation">)</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Fprintf</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">,</span> <span class="token string">"%s"</span><span class="token punctuation">,</span> buf<span class="token punctuation">)</span></span>
<span class="line">		<span class="token keyword">if</span> err <span class="token operator">==</span> io<span class="token punctuation">.</span>EOF <span class="token punctuation">{</span></span>
<span class="line">			<span class="token keyword">break</span></span>
<span class="line">		<span class="token punctuation">}</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	<span class="token keyword">return</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	flag<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">if</span> flag<span class="token punctuation">.</span><span class="token function">NArg</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token function">cat</span><span class="token punctuation">(</span>bufio<span class="token punctuation">.</span><span class="token function">NewReader</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdin<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> flag<span class="token punctuation">.</span><span class="token function">NArg</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span></span>
<span class="line">		f<span class="token punctuation">,</span> err <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span>flag<span class="token punctuation">.</span><span class="token function">Arg</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">			fmt<span class="token punctuation">.</span><span class="token function">Fprintf</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stderr<span class="token punctuation">,</span> <span class="token string">"%s:error reading from %s: %s\n"</span><span class="token punctuation">,</span> os<span class="token punctuation">.</span>Args<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> flag<span class="token punctuation">.</span><span class="token function">Arg</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">,</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">			<span class="token keyword">continue</span></span>
<span class="line">		<span class="token punctuation">}</span></span>
<span class="line">		<span class="token function">cat</span><span class="token punctuation">(</span>bufio<span class="token punctuation">.</span><span class="token function">NewReader</span><span class="token punctuation">(</span>f<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">		f<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 <RouteLink to="/chapter-3/12.6.html">12.6 章节</RouteLink>，我们将看到如何使用缓冲写入。</p>
<p><strong>练习 12.6</strong>：<a href="exercises/chapter_12/cat_numbered.go">cat_numbered.go</a></p>
<p>扩展 <a href="exercises/chapter_12/cat.go">cat.go</a> 例子，使用 flag 添加一个选项，目的是为每一行头部加入一个行号。使用 <code v-pre>cat -n test</code> 测试输出。</p>
<h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-3/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-3/12.4.html">从命令行读取参数</RouteLink></li>
<li>下一节：<RouteLink to="/chapter-3/12.6.html">用切片读写文件</RouteLink></li>
</ul>
</div></template>


