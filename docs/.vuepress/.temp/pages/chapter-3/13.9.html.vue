<template><div><h1 id="_13-9-用-测试数据-表驱动测试" tabindex="-1"><a class="header-anchor" href="#_13-9-用-测试数据-表驱动测试"><span>13.9 用（测试数据）表驱动测试</span></a></h1>
<p>编写测试代码时，一个较好的办法是把测试的输入数据和期望的结果写在一起组成一个数据表：表中的每条记录都是一个含有输入和期望值的完整测试用例，有时还可以结合像测试名字这样的额外信息来让测试输出更多的信息。</p>
<p>实际测试时简单迭代表中的每条记录，并执行必要的测试。这在练习 <a href="exercises/chapter_13/string_reverse_test.go">13.4</a> 中有具体的应用。</p>
<p>可以抽象为下面的代码段：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">var</span> tests <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token keyword">struct</span><span class="token punctuation">{</span> 	<span class="token comment">// Test table</span></span>
<span class="line">	in  <span class="token builtin">string</span></span>
<span class="line">	out <span class="token builtin">string</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">{</span></span>
<span class="line">	<span class="token punctuation">{</span><span class="token string">"in1"</span><span class="token punctuation">,</span> <span class="token string">"exp1"</span><span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">	<span class="token punctuation">{</span><span class="token string">"in2"</span><span class="token punctuation">,</span> <span class="token string">"exp2"</span><span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">	<span class="token punctuation">{</span><span class="token string">"in3"</span><span class="token punctuation">,</span> <span class="token string">"exp3"</span><span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token operator">...</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">TestFunction</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">for</span> i<span class="token punctuation">,</span> tt <span class="token operator">:=</span> <span class="token keyword">range</span> tests <span class="token punctuation">{</span></span>
<span class="line">		s <span class="token operator">:=</span> <span class="token function">FuncToBeTested</span><span class="token punctuation">(</span>tt<span class="token punctuation">.</span>in<span class="token punctuation">)</span></span>
<span class="line">		<span class="token keyword">if</span> s <span class="token operator">!=</span> tt<span class="token punctuation">.</span>out <span class="token punctuation">{</span></span>
<span class="line">			t<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"%d. %q => %q, wanted: %q"</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> tt<span class="token punctuation">.</span>in<span class="token punctuation">,</span> s<span class="token punctuation">,</span> tt<span class="token punctuation">.</span>out<span class="token punctuation">)</span></span>
<span class="line">		<span class="token punctuation">}</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果大部分函数都可以写成这种形式，那么写一个帮助函数 <code v-pre>verify()</code> 对实际测试会很有帮助：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">verify</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">,</span> testnum <span class="token builtin">int</span><span class="token punctuation">,</span> testcase<span class="token punctuation">,</span> input<span class="token punctuation">,</span> output<span class="token punctuation">,</span> expected <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">if</span> expected <span class="token operator">!=</span> output <span class="token punctuation">{</span></span>
<span class="line">		t<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"%d. %s with input = %s: output %s != %s"</span><span class="token punctuation">,</span> testnum<span class="token punctuation">,</span> testcase<span class="token punctuation">,</span> input<span class="token punctuation">,</span> output<span class="token punctuation">,</span> expected<span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>TestFunction()</code> 则变为：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">TestFunction</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">for</span> i<span class="token punctuation">,</span> tt <span class="token operator">:=</span> <span class="token keyword">range</span> tests <span class="token punctuation">{</span></span>
<span class="line">		s <span class="token operator">:=</span> <span class="token function">FuncToBeTested</span><span class="token punctuation">(</span>tt<span class="token punctuation">.</span>in<span class="token punctuation">)</span></span>
<span class="line">		<span class="token function">verify</span><span class="token punctuation">(</span>t<span class="token punctuation">,</span> i<span class="token punctuation">,</span> <span class="token string">"FuncToBeTested: "</span><span class="token punctuation">,</span> tt<span class="token punctuation">.</span>in<span class="token punctuation">,</span> s<span class="token punctuation">,</span> tt<span class="token punctuation">.</span>out<span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-3/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-3/13.8.html">测试的具体例子</RouteLink></li>
<li>下一节：<RouteLink to="/chapter-3/13.10.html">性能调试：分析并优化 Go 程序</RouteLink></li>
</ul>
</div></template>


