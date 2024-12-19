<template><div><h1 id="_18-3-映射" tabindex="-1"><a class="header-anchor" href="#_18-3-映射"><span>18.3 映射</span></a></h1>
<p>创建：    <code v-pre>map1 := make(map[keytype]valuetype)</code></p>
<p>初始化：   <code v-pre>map1 := map[string]int{&quot;one&quot;: 1, &quot;two&quot;: 2}</code></p>
<p>（1）如何使用 <code v-pre>for</code> 或者 <code v-pre>for-range</code> 遍历一个映射：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">for</span> key<span class="token punctuation">,</span> value <span class="token operator">:=</span> <span class="token keyword">range</span> map1 <span class="token punctuation">{</span></span>
<span class="line">…</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（2）如何在一个映射中检测键 <code v-pre>key1</code> 是否存在：</p>
<p><code v-pre>val1, isPresent = map1[key1]</code></p>
<p>返回值：键 <code v-pre>key1</code> 对应的值或者 <code v-pre>0</code>，<code v-pre>true</code> 或者 <code v-pre>false</code></p>
<p>（3）如何在映射中删除一个键：<code v-pre>delete(map1, key1)</code></p>
<h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-4/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-4/18.2.html">数组和切片</RouteLink></li>
<li>下一节：<RouteLink to="/chapter-4/18.4.html">结构体</RouteLink></li>
</ul>
</div></template>


