<template><div><h1 id="_7-3-for-range-结构" tabindex="-1"><a class="header-anchor" href="#_7-3-for-range-结构"><span>7.3 For-range 结构</span></a></h1>
<p>这种构建方法可以应用于数组和切片:</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">for</span> ix<span class="token punctuation">,</span> value <span class="token operator">:=</span> <span class="token keyword">range</span> slice1 <span class="token punctuation">{</span></span>
<span class="line">	<span class="token operator">...</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第一个返回值 <code v-pre>ix</code> 是数组或者切片的索引，第二个是在该索引位置的值；他们都是仅在 <code v-pre>for</code> 循环内部可见的局部变量。<code v-pre>value</code> 只是 <code v-pre>slice1</code> 某个索引位置的值的一个拷贝，不能用来修改 <code v-pre>slice1</code> 该索引位置的值。</p>
<p>示例 7.9 <a href="examples/chapter_7/slices_forrange.go">slices_forrange.go</a></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token string">"fmt"</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">var</span> slice1 <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span> <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">	slice1<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">1</span></span>
<span class="line">	slice1<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">2</span></span>
<span class="line">	slice1<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">3</span></span>
<span class="line">	slice1<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">4</span></span>
<span class="line"></span>
<span class="line">	<span class="token keyword">for</span> ix<span class="token punctuation">,</span> value <span class="token operator">:=</span> <span class="token keyword">range</span> slice1 <span class="token punctuation">{</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Slice at %d is: %d\n"</span><span class="token punctuation">,</span> ix<span class="token punctuation">,</span> value<span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>示例 7.10 <a href="examples/chapter_7/slices_forrange2.go">slices_forrange2.go</a></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"><span class="token keyword">import</span> <span class="token string">"fmt"</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	seasons <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">"Spring"</span><span class="token punctuation">,</span> <span class="token string">"Summer"</span><span class="token punctuation">,</span> <span class="token string">"Autumn"</span><span class="token punctuation">,</span> <span class="token string">"Winter"</span><span class="token punctuation">}</span></span>
<span class="line">	<span class="token keyword">for</span> ix<span class="token punctuation">,</span> season <span class="token operator">:=</span> <span class="token keyword">range</span> seasons <span class="token punctuation">{</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Season %d is: %s\n"</span><span class="token punctuation">,</span> ix<span class="token punctuation">,</span> season<span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">	<span class="token keyword">var</span> season <span class="token builtin">string</span></span>
<span class="line">	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> season <span class="token operator">=</span> <span class="token keyword">range</span> seasons <span class="token punctuation">{</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%s\n"</span><span class="token punctuation">,</span> season<span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>slices_forrange2.go 给出了一个关于字符串的例子， <code v-pre>_</code> 可以用于忽略索引。</p>
<p>如果你只需要索引，你可以忽略第二个变量，例如：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">for</span> ix <span class="token operator">:=</span> <span class="token keyword">range</span> seasons <span class="token punctuation">{</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%d"</span><span class="token punctuation">,</span> ix<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token comment">// Output: 0 1 2 3</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果你需要修改 <code v-pre>seasons[ix]</code> 的值可以使用这个版本。</p>
<p><strong>多维切片下的 for-range：</strong></p>
<p>通过计算行数和矩阵值可以很方便的写出如（参考<RouteLink to="/chapter-2/07.1.html">第 7.1.3 节</RouteLink>）的 <code v-pre>for</code> 循环来，例如（参考<RouteLink to="/chapter-2/07.5.html">第 7.5 节</RouteLink>的例子 <a href="exercises/chapter_7/multidim_array.go">multidim_array.go</a>）：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">for</span> row <span class="token operator">:=</span> <span class="token keyword">range</span> screen <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">for</span> column <span class="token operator">:=</span> <span class="token keyword">range</span> screen<span class="token punctuation">[</span>row<span class="token punctuation">]</span> <span class="token punctuation">{</span></span>
<span class="line">		screen<span class="token punctuation">[</span>row<span class="token punctuation">]</span><span class="token punctuation">[</span>column<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">1</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>问题 7.5</strong> 假设我们有如下数组：<code v-pre>items := [...]int{10, 20, 30, 40, 50}</code></p>
<p>a) 如果我们写了如下的 <code v-pre>for</code> 循环，那么执行完 <code v-pre>for</code> 循环后的 <code v-pre>items</code> 的值是多少？如果你不确定的话可以测试一下:)</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> item <span class="token operator">:=</span> <span class="token keyword">range</span> items <span class="token punctuation">{</span></span>
<span class="line">	item <span class="token operator">*=</span> <span class="token number">2</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>b) 如果 a) 无法正常工作，写一个 <code v-pre>for</code> 循环让值可以变成自身的两倍。</p>
<p><strong>问题 7.6</strong> 通过使用省略号操作符 <code v-pre>...</code> 来实现累加方法。</p>
<p><strong>练习 7.7</strong> <a href="exercises/chapter_7/sum_array.go">sum_array.go</a></p>
<p>a) 写一个 <code v-pre>Sum()</code> 函数，传入参数为一个 <code v-pre>float32</code> 数组成的数组 <code v-pre>arrF</code>，返回该数组的所有数字和。</p>
<p>如果把数组修改为切片的话代码要做怎样的修改？如果用切片形式方法实现不同长度数组的的和呢？</p>
<p>b) 写一个 <code v-pre>SumAndAverage()</code> 方法，返回两个 int 和 <code v-pre>float32</code> 类型的未命名变量的和与平均值。</p>
<p><strong>练习 7.8</strong> <a href="exercises/chapter_7/min_max.go">min_max.go</a></p>
<p>写一个 <code v-pre>minSlice()</code> 方法，传入一个 <code v-pre>int</code> 的切片并且返回最小值，再写一个 <code v-pre>maxSlice()</code> 方法返回最大值。</p>
</div></template>


