<template><div><h1 id="_6-3-传递变长参数" tabindex="-1"><a class="header-anchor" href="#_6-3-传递变长参数"><span>6.3 传递变长参数</span></a></h1>
<p>如果函数的最后一个参数是采用 <code v-pre>...type</code> 的形式，那么这个函数就可以处理一个变长的参数，这个长度可以为 0，这样的函数称为变参函数。</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">myFunc</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> arg <span class="token operator">...</span><span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>这个函数接受一个类似于切片 (slice) 的参数（详见<RouteLink to="/chapter-2/07.0.html">第 7 章</RouteLink>），该参数可以通过<RouteLink to="/chapter-2/05.4.html">第 5.4.4 节</RouteLink> 中提到的 <code v-pre>for</code> 循环结构迭代。</p>
<p>示例函数和调用：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">Greeting</span><span class="token punctuation">(</span>prefix <span class="token builtin">string</span><span class="token punctuation">,</span> who <span class="token operator">...</span><span class="token builtin">string</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token function">Greeting</span><span class="token punctuation">(</span><span class="token string">"hello:"</span><span class="token punctuation">,</span> <span class="token string">"Joe"</span><span class="token punctuation">,</span> <span class="token string">"Anna"</span><span class="token punctuation">,</span> <span class="token string">"Eileen"</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>在 <code v-pre>Greeting()</code> 函数中，变量 <code v-pre>who</code> 的值为 <code v-pre>[]string{&quot;Joe&quot;, &quot;Anna&quot;, &quot;Eileen&quot;}</code>。</p>
<p>如果参数被存储在一个 slice 类型的变量 <code v-pre>slice</code> 中，则可以通过 <code v-pre>slice...</code> 的形式来传递参数，调用变参函数。</p>
<p>示例 6.7 <a href="examples/chapter_6/varnumpar.go">varnumpar.go</a></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token string">"fmt"</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	x <span class="token operator">:=</span> <span class="token function">min</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"The minimum is: %d\n"</span><span class="token punctuation">,</span> x<span class="token punctuation">)</span></span>
<span class="line">	slice <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">7</span><span class="token punctuation">,</span><span class="token number">9</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">}</span></span>
<span class="line">	x <span class="token operator">=</span> <span class="token function">min</span><span class="token punctuation">(</span>slice<span class="token operator">...</span><span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"The minimum in the slice is: %d"</span><span class="token punctuation">,</span> x<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">min</span><span class="token punctuation">(</span>s <span class="token operator">...</span><span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token operator">==</span><span class="token number">0</span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token keyword">return</span> <span class="token number">0</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	min <span class="token operator">:=</span> s<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span></span>
<span class="line">	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> s <span class="token punctuation">{</span></span>
<span class="line">		<span class="token keyword">if</span> v <span class="token operator">&lt;</span> min <span class="token punctuation">{</span></span>
<span class="line">			min <span class="token operator">=</span> v</span>
<span class="line">		<span class="token punctuation">}</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	<span class="token keyword">return</span> min</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p>
<pre><code>The minimum is: 0
The minimum in the slice is: 1
</code></pre>
<p><strong>练习 6.3</strong> <a href="exercises/chapter_6/varargs.go">varargs.go</a></p>
<p>写一个函数，该函数接受一个变长参数并对每个元素进行换行打印。</p>
<p>一个接受变长参数的函数可以将这个参数作为其它函数的参数进行传递：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">F1</span><span class="token punctuation">(</span>s <span class="token operator">...</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token function">F2</span><span class="token punctuation">(</span>s<span class="token operator">...</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token function">F3</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">F2</span><span class="token punctuation">(</span>s <span class="token operator">...</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">F3</span><span class="token punctuation">(</span>s <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>变长参数可以作为对应类型的 slice 进行二次传递。</p>
<p>但是如果变长参数的类型并不是都相同的呢？使用 5 个参数来进行传递并不是很明智的选择，有 2 种方案可以解决这个问题：</p>
<ol>
<li>
<p>使用结构（详见<RouteLink to="/chapter-2/10.0.html">第 10 章</RouteLink>）：</p>
<p>定义一个结构类型，假设它叫 <code v-pre>Options</code>，用以存储所有可能的参数：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">type</span> Options <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">	par1 type1<span class="token punctuation">,</span></span>
<span class="line">	par2 type2<span class="token punctuation">,</span></span>
<span class="line">	<span class="token operator">...</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>函数 <code v-pre>F1()</code> 可以使用正常的参数 <code v-pre>a</code> 和 <code v-pre>b</code>，以及一个没有任何初始化的 <code v-pre>Options</code> 结构： <code v-pre>F1(a, b, Options {})</code>。如果需要对选项进行初始化，则可以使用 <code v-pre>F1(a, b, Options {par1:val1, par2:val2})</code>。</p>
</li>
<li>
<p>使用空接口：</p>
<p>如果一个变长参数的类型没有被指定，则可以使用默认的空接口 <code v-pre>interface{}</code>，这样就可以接受任何类型的参数（详见<RouteLink to="/chapter-2/11.9.html">第 11.9 节</RouteLink> ）。该方案不仅可以用于长度未知的参数，还可以用于任何不确定类型的参数。一般而言我们会使用一个 for-range 循环以及 <code v-pre>switch</code> 结构对每个参数的类型进行判断：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">typecheck</span><span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">,</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">,</span>values … <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> value <span class="token operator">:=</span> <span class="token keyword">range</span> values <span class="token punctuation">{</span></span>
<span class="line">		<span class="token keyword">switch</span> v <span class="token operator">:=</span> value<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token keyword">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">			<span class="token keyword">case</span> <span class="token builtin">int</span><span class="token punctuation">:</span> …</span>
<span class="line">			<span class="token keyword">case</span> float<span class="token punctuation">:</span> …</span>
<span class="line">			<span class="token keyword">case</span> <span class="token builtin">string</span><span class="token punctuation">:</span> …</span>
<span class="line">			<span class="token keyword">case</span> <span class="token builtin">bool</span><span class="token punctuation">:</span> …</span>
<span class="line">			<span class="token keyword">default</span><span class="token punctuation">:</span> …</span>
<span class="line">		<span class="token punctuation">}</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
</div></template>


