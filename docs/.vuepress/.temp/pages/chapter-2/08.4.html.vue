<template><div><h1 id="_8-4-map-类型的切片" tabindex="-1"><a class="header-anchor" href="#_8-4-map-类型的切片"><span>8.4 map 类型的切片</span></a></h1>
<p>假设我们想获取一个 <code v-pre>map</code> 类型的切片，我们必须使用两次 <code v-pre>make()</code> 函数，第一次分配切片，第二次分配切片中每个 <code v-pre>map</code> 元素（参见下面的例子 8.4）。</p>
<p>示例 8.4 <a href="examples/chapter_8/maps_forrange2.go">maps_forrange2.go</a>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"><span class="token keyword">import</span> <span class="token string">"fmt"</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token comment">// Version A:</span></span>
<span class="line">	items <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">int</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">for</span> i<span class="token operator">:=</span> <span class="token keyword">range</span> items <span class="token punctuation">{</span></span>
<span class="line">		items<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">int</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line">		items<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">2</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Version A: Value of items: %v\n"</span><span class="token punctuation">,</span> items<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">	<span class="token comment">// Version B: NOT GOOD!</span></span>
<span class="line">	items2 <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">int</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> item <span class="token operator">:=</span> <span class="token keyword">range</span> items2 <span class="token punctuation">{</span></span>
<span class="line">		item <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">int</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token comment">// item is only a copy of the slice element.</span></span>
<span class="line">		item<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">2</span> <span class="token comment">// This 'item' will be lost on the next iteration.</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Version B: Value of items: %v\n"</span><span class="token punctuation">,</span> items2<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出结果：</p>
<pre><code>Version A: Value of items: [map[1:2] map[1:2] map[1:2] map[1:2] map[1:2]]
Version B: Value of items: [map[] map[] map[] map[] map[]]
</code></pre>
<p>需要注意的是，应当像 A 版本那样通过索引使用切片的 <code v-pre>map</code> 元素。在 B 版本中获得的项只是 <code v-pre>map</code> 值的一个拷贝而已，所以真正的 <code v-pre>map</code> 元素没有得到初始化。</p>
</div></template>


