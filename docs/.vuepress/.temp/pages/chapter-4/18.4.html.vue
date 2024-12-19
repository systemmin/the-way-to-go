<template><div><h1 id="_18-4-结构体" tabindex="-1"><a class="header-anchor" href="#_18-4-结构体"><span>18.4 结构体</span></a></h1>
<ul>
<li>创建：</li>
</ul>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">type</span> struct1 <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">    field1 type1</span>
<span class="line">    field2 type2</span>
<span class="line">    …</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line">ms <span class="token operator">:=</span> <span class="token function">new</span><span class="token punctuation">(</span>struct1<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>初始化：</li>
</ul>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">ms <span class="token operator">:=</span> <span class="token operator">&amp;</span>struct1<span class="token punctuation">{</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">15.5</span><span class="token punctuation">,</span> <span class="token string">"Chris"</span><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>当结构体的命名以大写字母开头时，该结构体在包外可见。
通常情况下，为每个结构体定义一个构建函数，并推荐使用构建函数初始化结构体（参考<a href="examples/chapter_10/person.go">例 10.2</a>）：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">ms <span class="token operator">:=</span> Newstruct1<span class="token punctuation">{</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">15.5</span><span class="token punctuation">,</span> <span class="token string">"Chris"</span><span class="token punctuation">}</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">Newstruct1</span><span class="token punctuation">(</span>n <span class="token builtin">int</span><span class="token punctuation">,</span> f <span class="token builtin">float32</span><span class="token punctuation">,</span> name <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">*</span>struct1 <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token operator">&amp;</span>struct1<span class="token punctuation">{</span>n<span class="token punctuation">,</span> f<span class="token punctuation">,</span> name<span class="token punctuation">}</span> </span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-4/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-4/18.3.html">映射</RouteLink></li>
<li>下一节：<RouteLink to="/chapter-4/18.5.html">接口</RouteLink></li>
</ul>
</div></template>


