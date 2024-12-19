<template><div><h1 id="_18-1-字符串" tabindex="-1"><a class="header-anchor" href="#_18-1-字符串"><span>18.1 字符串</span></a></h1>
<p>（1）如何修改字符串中的一个字符：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">str<span class="token operator">:=</span><span class="token string">"hello"</span></span>
<span class="line">c<span class="token operator">:=</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span></span>
<span class="line">c<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token operator">=</span><span class="token char">'c'</span></span>
<span class="line">s2<span class="token operator">:=</span> <span class="token function">string</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span> <span class="token comment">// s2 == "cello"</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（2）如何获取字符串的子串：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">substr <span class="token operator">:=</span> str<span class="token punctuation">[</span>n<span class="token punctuation">:</span>m<span class="token punctuation">]</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>（3）如何使用 <code v-pre>for</code> 或者 <code v-pre>for-range</code> 遍历一个字符串：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token comment">// gives only the bytes:</span></span>
<span class="line"><span class="token keyword">for</span> i<span class="token operator">:=</span><span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token function">len</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span></span>
<span class="line">… <span class="token operator">=</span> str<span class="token punctuation">[</span>i<span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token comment">// gives the Unicode characters:</span></span>
<span class="line"><span class="token keyword">for</span> ix<span class="token punctuation">,</span> ch <span class="token operator">:=</span> <span class="token keyword">range</span> str <span class="token punctuation">{</span></span>
<span class="line">…</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（4）如何获取一个字符串的字节数：<code v-pre>len(str)</code></p>
<p>如何获取一个字符串的字符数：</p>
<p>（最快速）使用 <code v-pre>utf8.RuneCountInString(str)</code></p>
<p>或使用 <code v-pre>len([]rune(str))</code></p>
<p>（5）如何连接字符串：</p>
<p>（最快速）使用 <code v-pre>bytes.Buffer</code>（参考<RouteLink to="/chapter-4/07.2.html">章节 7.2</RouteLink>）</p>
<p>或使用 <code v-pre>Strings.Join()</code>（参考<RouteLink to="/chapter-4/04.7.html">章节 4.7</RouteLink>）</p>
<p>或使用 <code v-pre>+=</code>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">str1 <span class="token operator">:=</span> <span class="token string">"Hello "</span> </span>
<span class="line">str2 <span class="token operator">:=</span> <span class="token string">"World!"</span></span>
<span class="line">str1 <span class="token operator">+=</span> str2 <span class="token comment">//str1 == "Hello World!"</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（6）如何解析命令行参数：使用 <code v-pre>os</code> 或者 <code v-pre>flag</code> 包（参考<a href="examples/chapter_12/fileinput.go">例 12.4</a>）</p>
<h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-4/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-4/18.0.html">出于性能考虑的实用代码片段</RouteLink></li>
<li>下一节：<RouteLink to="/chapter-4/18.2.html">数组和切片</RouteLink></li>
</ul>
</div></template>


