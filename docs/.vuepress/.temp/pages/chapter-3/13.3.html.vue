<template><div><h1 id="_13-3-从-panic-中恢复-recover" tabindex="-1"><a class="header-anchor" href="#_13-3-从-panic-中恢复-recover"><span>13.3 从 panic 中恢复 (recover)</span></a></h1>
<p>正如名字一样，这个 (<code v-pre>recover()</code>) 内建函数被用于从 panic 或错误场景中恢复：让程序可以从 panicking 重新获得控制权，停止终止过程进而恢复正常执行。</p>
<p><code v-pre>recover</code> 只能在 <code v-pre>defer</code> 修饰的函数（参见 <RouteLink to="/chapter-3/06.4.html">6.4 节</RouteLink>）中使用：用于取得 <code v-pre>panic()</code> 调用中传递过来的错误值，如果是正常执行，调用 <code v-pre>recover()</code> 会返回 <code v-pre>nil</code>，且没有其它效果。</p>
<p><u>总结</u>：<code v-pre>panic()</code> 会导致栈被展开直到 <code v-pre>defer</code> 修饰的 <code v-pre>recover()</code> 被调用或者程序中止。</p>
<p>下面例子中的 <code v-pre>protect()</code> 函数调用函数参数 <code v-pre>g</code> 来保护调用者防止从 <code v-pre>g</code> 中抛出的运行时 panic，并展示 panic 中的信息：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">protect</span><span class="token punctuation">(</span>g <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">		log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"done"</span><span class="token punctuation">)</span></span>
<span class="line">		<span class="token comment">// Println executes normally even if there is a panic</span></span>
<span class="line">		<span class="token keyword">if</span> err <span class="token operator">:=</span> <span class="token function">recover</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">			log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"run time panic: %v"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span></span>
<span class="line">		<span class="token punctuation">}</span></span>
<span class="line">	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"start"</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token function">g</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//   possible runtime-error</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这跟 Java 和 .NET 这样的语言中的 catch 块类似。</p>
<p><code v-pre>log</code> 包实现了简单的日志功能：默认的 log 对象向标准错误输出中写入并打印每条日志信息的日期和时间。除了 <code v-pre>Println</code> 和 <code v-pre>Printf</code> 函数，其它的致命性函数都会在写完日志信息后调用 <code v-pre>os.Exit(1)</code>，那些退出函数也是如此。而 Panic 效果的函数会在写完日志信息后调用 <code v-pre>panic()</code>；可以在程序必须中止或发生了临界错误时使用它们，就像当 web 服务器不能启动时那样（参见 <RouteLink to="/chapter-3/15.4.html">15.4 节</RouteLink> 中的例子）。</p>
<p>log 包用那些方法 (methods) 定义了一个 <code v-pre>Logger</code> 接口类型，如果你想自定义日志系统的话可以参考 <a href="http://golang.org/pkg/log/#Logger" target="_blank" rel="noopener noreferrer">http://golang.org/pkg/log/#Logger</a> 。</p>
<p>这是一个展示 <code v-pre>panic()</code>，<code v-pre>defer</code> 和 <code v-pre>recover()</code> 怎么结合使用的完整例子：</p>
<p>示例 13.3 <a href="examples/chapter_13/panic_recover.go">panic_recover.go</a>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token comment">// panic_recover.go</span></span>
<span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"fmt"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">badCall</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">"bad end"</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token keyword">if</span> e <span class="token operator">:=</span> <span class="token function">recover</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> e <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">			fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Panicing %s\r\n"</span><span class="token punctuation">,</span> e<span class="token punctuation">)</span></span>
<span class="line">		<span class="token punctuation">}</span></span>
<span class="line">	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token function">badCall</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"After bad call\r\n"</span><span class="token punctuation">)</span> <span class="token comment">// &lt;-- would not reach</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Calling test\r\n"</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Test completed\r\n"</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">Calling test</span>
<span class="line">Panicing bad end</span>
<span class="line">Test completed</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>defer</code>-<code v-pre>panic()</code>-<code v-pre>recover()</code> 在某种意义上也是一种像 <code v-pre>if</code>，<code v-pre>for</code> 这样的控制流机制。</p>
<p>Go 标准库中许多地方都用了这个机制，例如，<code v-pre>json</code> 包中的解码和 <code v-pre>regexp</code> 包中的 <code v-pre>Complie()</code> 函数。Go 库的原则是即使在包的内部使用了 <code v-pre>panic()</code>，在它的对外接口 (API) 中也必须用 <code v-pre>recover()</code> 处理成显式返回的错误。</p>
<h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-3/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-3/13.2.html">错运行时异常和 panic</RouteLink></li>
<li>下一节：<RouteLink to="/chapter-3/13.4.html">自定义包中的错误处理和 panicking</RouteLink></li>
</ul>
</div></template>


