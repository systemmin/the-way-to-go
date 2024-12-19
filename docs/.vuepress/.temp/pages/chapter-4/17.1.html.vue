<template><div><h1 id="_17-1-逗号-ok-模式" tabindex="-1"><a class="header-anchor" href="#_17-1-逗号-ok-模式"><span>17.1 逗号 ok 模式</span></a></h1>
<p>在学习本书第二部分和第三部分时，我们经常在一个表达式返回 2 个参数时使用这种模式：<code v-pre>something, ok</code>，第一个参数是一个值或者 <code v-pre>nil</code>，第二个参数是 <code v-pre>true</code>/<code v-pre>false</code> 或者一个错误 <code v-pre>error</code>。在一个需要赋值的 <code v-pre>if</code> 条件语句中，使用这种模式去检测第二个参数值会让代码显得优雅简洁。这种模式在 Go 语言编码规范中非常重要。下面总结了所有使用这种模式的例子：</p>
<p>（1）在函数返回时检测错误（参考<RouteLink to="/chapter-4/05.2.html">第 5.2 小节</RouteLink>）:</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">value<span class="token punctuation">,</span> err <span class="token operator">:=</span> pack1<span class="token punctuation">.</span><span class="token function">Func1</span><span class="token punctuation">(</span>param1<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Error %s in pack1.Func1 with parameter %v"</span><span class="token punctuation">,</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> param1<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">return</span> err</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 函数Func1没有错误:</span></span>
<span class="line"><span class="token function">Process</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">e<span class="token punctuation">.</span>g<span class="token punctuation">.</span><span class="token punctuation">:</span> os<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span> strconv<span class="token punctuation">.</span><span class="token function">Atoi</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码中的函数将错误返回给它的调用者，当函数执行成功时，返回的错误是 <code v-pre>nil</code>，所以使用这种写法：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">SomeFunc</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span></span>
<span class="line">    …</span>
<span class="line">    <span class="token keyword">if</span> value<span class="token punctuation">,</span> err <span class="token operator">:=</span> pack1<span class="token punctuation">.</span><span class="token function">Func1</span><span class="token punctuation">(</span>param1<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">        …</span>
<span class="line">        <span class="token keyword">return</span> err</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    …</span>
<span class="line">    <span class="token keyword">return</span> <span class="token boolean">nil</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种模式也常用于通过 <code v-pre>defer</code> 使程序从 <code v-pre>panic</code> 中恢复执行（参考<RouteLink to="/chapter-4/17.2.html">第 17.2(4) 小节</RouteLink>）。</p>
<p>要实现简洁的错误检测代码，更好的方式是使用闭包，参考<RouteLink to="/chapter-4/16.10.html">第 16.10.2 小节</RouteLink></p>
<p>（2）检测映射中是否存在一个键值（参考<RouteLink to="/chapter-4/08.2.html">第 8.2 小节</RouteLink>）：<code v-pre>key1</code> 在映射 <code v-pre>map1</code> 中是否有值？</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">if</span> value<span class="token punctuation">,</span> isPresent <span class="token operator">=</span> map1<span class="token punctuation">[</span>key1<span class="token punctuation">]</span><span class="token punctuation">;</span> isPresent <span class="token punctuation">{</span></span>
<span class="line">        <span class="token function">Process</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token comment">// key1 不存在</span></span>
<span class="line">…</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（3）检测一个接口类型变量 <code v-pre>varI</code> 是否包含了类型 <code v-pre>T</code>：类型断言（参考<RouteLink to="/chapter-4/11.3.html">第 11.3 小节</RouteLink>）：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">if</span> value<span class="token punctuation">,</span> ok <span class="token operator">:=</span> varI<span class="token punctuation">.</span><span class="token punctuation">(</span>T<span class="token punctuation">)</span><span class="token punctuation">;</span> ok <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">Process</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token comment">// 接口类型 varI 没有包含类型 T</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（4）检测一个通道 <code v-pre>ch</code> 是否关闭（参考<RouteLink to="/chapter-4/14.3.html">第 14.3 小节</RouteLink>）：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">    <span class="token keyword">for</span> input <span class="token operator">:=</span> <span class="token keyword">range</span> ch <span class="token punctuation">{</span></span>
<span class="line">        <span class="token function">Process</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者:</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">    <span class="token keyword">for</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">if</span> input<span class="token punctuation">,</span> open <span class="token operator">:=</span> <span class="token operator">&lt;-</span>ch<span class="token punctuation">;</span> <span class="token operator">!</span>open <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">break</span> <span class="token comment">// 通道是关闭的</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">        <span class="token function">Process</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-4/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-4/17.0.html">Go 语言模式</RouteLink></li>
<li>下一节：<RouteLink to="/chapter-4/17.2.html">defer 模式</RouteLink></li>
</ul>
</div></template>


