<template><div><h1 id="_5-5-break-与-continue" tabindex="-1"><a class="header-anchor" href="#_5-5-break-与-continue"><span>5.5 break 与 continue</span></a></h1>
<p>您可以使用 <code v-pre>break</code> 语句重写 <a href="examples/chapter_5/for2.go">for2.go</a> 的代码：</p>
<p>示例 5.10 <a href="examples/chapter_5/for3.go">for3.go</a>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">for</span> <span class="token punctuation">{</span></span>
<span class="line">	i <span class="token operator">=</span> i <span class="token operator">-</span> <span class="token number">1</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"The variable i is now: %d\n"</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">if</span> i <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token keyword">break</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此每次迭代都会对条件进行检查（<code v-pre>i &lt; 0</code>），以此判断是否需要停止循环。如果退出条件满足，则使用 <code v-pre>break</code> 语句退出循环。</p>
<p>一个 <code v-pre>break</code> 的作用范围为该语句出现后的最内部的结构，它可以被用于任何形式的 <code v-pre>for</code> 循环（计数器、条件判断等）。但在 <code v-pre>switch</code> 或 <code v-pre>select</code> 语句中（详见<RouteLink to="/chapter-2/13.0.html">第 13 章</RouteLink>），<code v-pre>break</code> 语句的作用结果是跳过整个代码块，执行后续的代码。</p>
<p>下面的示例中包含了嵌套的循环体（for4.go），<code v-pre>break</code> 只会退出最内层的循环：</p>
<p>示例 5.11 <a href="examples/chapter_5/for4.go">for4.go</a>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">for</span> i<span class="token operator">:=</span><span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">&lt;</span><span class="token number">3</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token keyword">for</span> j<span class="token operator">:=</span><span class="token number">0</span><span class="token punctuation">;</span> j<span class="token operator">&lt;</span><span class="token number">10</span><span class="token punctuation">;</span> j<span class="token operator">++</span> <span class="token punctuation">{</span></span>
<span class="line">			<span class="token keyword">if</span> j<span class="token operator">></span><span class="token number">5</span> <span class="token punctuation">{</span></span>
<span class="line">			    <span class="token keyword">break</span>   </span>
<span class="line">			<span class="token punctuation">}</span></span>
<span class="line">			<span class="token function">print</span><span class="token punctuation">(</span>j<span class="token punctuation">)</span></span>
<span class="line">		<span class="token punctuation">}</span></span>
<span class="line">		<span class="token function">print</span><span class="token punctuation">(</span><span class="token string">"  "</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p>
<pre><code>012345 012345 012345
</code></pre>
<p>关键字 <code v-pre>continue</code> 忽略剩余的循环体而直接进入下一次循环的过程，但不是无条件执行下一次循环，执行之前依旧需要满足循环的判断条件。</p>
<p>示例 5.12 <a href="examples/chapter_5/for5.go">for5.go</a>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token keyword">if</span> i <span class="token operator">==</span> <span class="token number">5</span> <span class="token punctuation">{</span></span>
<span class="line">			<span class="token keyword">continue</span></span>
<span class="line">		<span class="token punctuation">}</span></span>
<span class="line">		<span class="token function">print</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span></span>
<span class="line">		<span class="token function">print</span><span class="token punctuation">(</span><span class="token string">" "</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">0 1 2 3 4 6 7 8 9</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>显然，<code v-pre>5</code> 被跳过了。</p>
<p>另外，关键字 <code v-pre>continue</code> 只能被用于 <code v-pre>for</code> 循环中。</p>
</div></template>


