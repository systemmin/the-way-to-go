<template><div><h1 id="_18-2-数组和切片" tabindex="-1"><a class="header-anchor" href="#_18-2-数组和切片"><span>18.2 数组和切片</span></a></h1>
<ul>
<li>
<p>创建：</p>
<p><code v-pre>arr1 := new([len]type)</code></p>
<p><code v-pre>slice1 := make([]type, len)</code></p>
</li>
<li>
<p>初始化：</p>
<p><code v-pre>arr1 := [...]type{i1, i2, i3, i4, i5}</code></p>
<p><code v-pre>arrKeyValue := [len]type{i1: val1, i2: val2}</code></p>
<p><code v-pre>var slice1 []type = arr1[start:end]</code></p>
</li>
</ul>
<p>（1）如何截断数组或者切片的最后一个元素：</p>
<p>​      <code v-pre>line = line[:len(line)-1]</code></p>
<p>（2）如何使用 <code v-pre>for</code> 或者 <code v-pre>for-range</code> 遍历一个数组（或者切片）：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">for</span> i<span class="token operator">:=</span><span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token function">len</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span></span>
<span class="line">… <span class="token operator">=</span> arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token keyword">for</span> ix<span class="token punctuation">,</span> value <span class="token operator">:=</span> <span class="token keyword">range</span> arr <span class="token punctuation">{</span></span>
<span class="line">…</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（3）如何在一个二维数组或者切片 <code v-pre>arr2Dim</code> 中查找一个指定值 <code v-pre>V</code>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">found <span class="token operator">:=</span> <span class="token boolean">false</span></span>
<span class="line">Found<span class="token punctuation">:</span> <span class="token keyword">for</span> row <span class="token operator">:=</span> <span class="token keyword">range</span> arr2Dim <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">for</span> column <span class="token operator">:=</span> <span class="token keyword">range</span> arr2Dim<span class="token punctuation">[</span>row<span class="token punctuation">]</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">if</span> arr2Dim<span class="token punctuation">[</span>row<span class="token punctuation">]</span><span class="token punctuation">[</span>column<span class="token punctuation">]</span> <span class="token operator">==</span> V<span class="token punctuation">{</span></span>
<span class="line">            found <span class="token operator">=</span> <span class="token boolean">true</span></span>
<span class="line">            <span class="token keyword">break</span> Found</span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-4/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-4/18.1.html">字符串</RouteLink></li>
<li>下一节：<RouteLink to="/chapter-4/18.3.html">映射</RouteLink></li>
</ul>
</div></template>


