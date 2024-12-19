<template><div><h1 id="_18-5-接口" tabindex="-1"><a class="header-anchor" href="#_18-5-接口"><span>18.5 接口</span></a></h1>
<p>（1）如何检测一个值 <code v-pre>v</code> 是否实现了接口 <code v-pre>Stringer</code>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">if</span> v<span class="token punctuation">,</span> ok <span class="token operator">:=</span> v<span class="token punctuation">.</span><span class="token punctuation">(</span>Stringer<span class="token punctuation">)</span><span class="token punctuation">;</span> ok <span class="token punctuation">{</span></span>
<span class="line">    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"implements String(): %s\n"</span><span class="token punctuation">,</span> v<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（2）如何使用接口实现一个类型分类函数：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">classifier</span><span class="token punctuation">(</span>items <span class="token operator">...</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">for</span> i<span class="token punctuation">,</span> x <span class="token operator">:=</span> <span class="token keyword">range</span> items <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">switch</span> x<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token keyword">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">case</span> <span class="token builtin">bool</span><span class="token punctuation">:</span></span>
<span class="line">            fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"param #%d is a bool\n"</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">case</span> <span class="token builtin">float64</span><span class="token punctuation">:</span></span>
<span class="line">            fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"param #%d is a float64\n"</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">case</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token builtin">int64</span><span class="token punctuation">:</span></span>
<span class="line">            fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"param #%d is an int\n"</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">case</span> <span class="token boolean">nil</span><span class="token punctuation">:</span></span>
<span class="line">            fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"param #%d is nil\n"</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">case</span> <span class="token builtin">string</span><span class="token punctuation">:</span></span>
<span class="line">            fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"param #%d is a string\n"</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">default</span><span class="token punctuation">:</span></span>
<span class="line">            fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"param #%d’s type is unknown\n"</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-4/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-4/18.4.html">结构体</RouteLink></li>
<li>下一节：<RouteLink to="/chapter-4/18.6.html">函数</RouteLink></li>
</ul>
</div></template>


