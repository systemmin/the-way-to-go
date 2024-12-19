<template><div><h1 id="_8-3-for-range-的配套用法" tabindex="-1"><a class="header-anchor" href="#_8-3-for-range-的配套用法"><span>8.3 for-range 的配套用法</span></a></h1>
<p>可以使用 <code v-pre>for</code> 循环读取 <code v-pre>map</code>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">for</span> key<span class="token punctuation">,</span> value <span class="token operator">:=</span> <span class="token keyword">range</span> map1 <span class="token punctuation">{</span></span>
<span class="line">	<span class="token operator">...</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第一个返回值 <code v-pre>key</code> 是 <code v-pre>map</code> 中的 key 值，第二个返回值则是该 key 对应的 value 值；这两个都是仅 <code v-pre>for</code> 循环内部可见的局部变量。其中第一个返回值 <code v-pre>key</code> 值是一个可选元素。如果你只关心值，可以这么使用：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> value <span class="token operator">:=</span> <span class="token keyword">range</span> map1 <span class="token punctuation">{</span></span>
<span class="line">	<span class="token operator">...</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果只想获取 <code v-pre>key</code>，你可以这么使用：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">for</span> key <span class="token operator">:=</span> <span class="token keyword">range</span> map1 <span class="token punctuation">{</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"key is: %d\n"</span><span class="token punctuation">,</span> key<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>示例 8.5 <a href="examples/chapter_8/maps_forrange.go">maps_forrange.go</a>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"><span class="token keyword">import</span> <span class="token string">"fmt"</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	map1 <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">int</span><span class="token punctuation">]</span><span class="token builtin">float32</span><span class="token punctuation">)</span></span>
<span class="line">	map1<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">1.0</span></span>
<span class="line">	map1<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">2.0</span></span>
<span class="line">	map1<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">3.0</span></span>
<span class="line">	map1<span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">4.0</span></span>
<span class="line">	<span class="token keyword">for</span> key<span class="token punctuation">,</span> value <span class="token operator">:=</span> <span class="token keyword">range</span> map1 <span class="token punctuation">{</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"key is: %d - value is: %f\n"</span><span class="token punctuation">,</span> key<span class="token punctuation">,</span> value<span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出结果：</p>
<pre><code>key is: 3 - value is: 3.000000
key is: 1 - value is: 1.000000
key is: 4 - value is: 4.000000
key is: 2 - value is: 2.000000
</code></pre>
<p>注意 <code v-pre>map</code> 不是按照 key 的顺序排列的，也不是按照 value 的序排列的。</p>
<blockquote>
<p>译者注：map 的本质是散列表，而 map 的增长扩容会导致重新进行散列，这就可能使 map 的遍历结果在扩容前后变得不可靠，Go 设计者为了让大家不依赖遍历的顺序，每次遍历的起点--即起始 bucket 的位置不一样，即不让遍历都从某个固定的 bucket0 开始，所以即使未扩容时我们遍历出来的 map 也总是无序的。</p>
</blockquote>
<p>问题 8.1： 下面这段代码的输出是什么？</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">capitals <span class="token operator">:=</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span> <span class="token builtin">string</span> <span class="token punctuation">{</span><span class="token string">"France"</span><span class="token punctuation">:</span><span class="token string">"Paris"</span><span class="token punctuation">,</span> <span class="token string">"Italy"</span><span class="token punctuation">:</span><span class="token string">"Rome"</span><span class="token punctuation">,</span> <span class="token string">"Japan"</span><span class="token punctuation">:</span><span class="token string">"Tokyo"</span> <span class="token punctuation">}</span></span>
<span class="line"><span class="token keyword">for</span> key <span class="token operator">:=</span> <span class="token keyword">range</span> capitals <span class="token punctuation">{</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Map item: Capital of"</span><span class="token punctuation">,</span> key<span class="token punctuation">,</span> <span class="token string">"is"</span><span class="token punctuation">,</span> capitals<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>练习 8.1</strong> <a href="exercises/chapter_8/map_days.go">map_days.go</a></p>
<p>创建一个 <code v-pre>map</code> 来保存每周 7 天的名字，将它们打印出来并且测试是否存在 <code v-pre>&quot;Tuesday&quot;</code> 和 <code v-pre>&quot;Hollyday&quot;</code>。</p>
</div></template>


