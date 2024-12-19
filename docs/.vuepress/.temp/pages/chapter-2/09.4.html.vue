<template><div><h1 id="_9-4-精密计算和-big-包" tabindex="-1"><a class="header-anchor" href="#_9-4-精密计算和-big-包"><span>9.4 精密计算和 big 包</span></a></h1>
<p>我们知道有些时候通过编程的方式去进行计算是不精确的。如果你使用 Go 语言中的 <code v-pre>float64</code> 类型进行浮点运算，返回结果将精确到 15 位，足以满足大多数的任务。当对超出 <code v-pre>int64</code> 或者 <code v-pre>uint64</code> 类型这样的大数进行计算时，如果对精度没有要求，<code v-pre>float32</code> 或者 <code v-pre>float64</code> 可以胜任，但如果对精度有严格要求的时候，我们不能使用浮点数，在内存中它们只能被近似的表示。</p>
<p>对于整数的高精度计算 Go 语言中提供了 <code v-pre>big</code> 包，被包含在 <code v-pre>math</code> 包下：有用来表示大整数的 <code v-pre>big.Int</code> 和表示大有理数的 <code v-pre>big.Rat</code> 类型（可以表示为 2/5 或 3.1416 这样的分数，而不是无理数或 π）。这些类型可以实现任意位类型的数字，只要内存足够大。缺点是更大的内存和处理开销使它们使用起来要比内置的数字类型慢很多。</p>
<p>大的整型数字是通过 <code v-pre>big.NewInt(n)</code> 来构造的，其中 <code v-pre>n</code> 为 <code v-pre>int64</code> 类型整数。而大有理数是通过 <code v-pre>big.NewRat(n, d)</code> 方法构造。<code v-pre>n</code>（分子）和 <code v-pre>d</code>（分母）都是 <code v-pre>int64</code> 型整数。因为 Go 语言不支持运算符重载，所以所有大数字类型都有像是 <code v-pre>Add()</code> 和 <code v-pre>Mul()</code> 这样的方法。它们作用于作为 receiver 的整数和有理数，大多数情况下它们修改 receiver 并以 receiver 作为返回结果。因为没有必要创建 <code v-pre>big.Int</code> 类型的临时变量来存放中间结果，所以运算可以被链式地调用，并节省内存。</p>
<p>示例 9.2 <a href="examples/chapter_9/big.go">big.go</a>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token comment">// big.go</span></span>
<span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"fmt"</span></span>
<span class="line">	<span class="token string">"math"</span></span>
<span class="line">	<span class="token string">"math/big"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token comment">// Here are some calculations with bigInts:</span></span>
<span class="line">	im <span class="token operator">:=</span> big<span class="token punctuation">.</span><span class="token function">NewInt</span><span class="token punctuation">(</span>math<span class="token punctuation">.</span>MaxInt64<span class="token punctuation">)</span></span>
<span class="line">	in <span class="token operator">:=</span> im</span>
<span class="line">	io <span class="token operator">:=</span> big<span class="token punctuation">.</span><span class="token function">NewInt</span><span class="token punctuation">(</span><span class="token number">1956</span><span class="token punctuation">)</span></span>
<span class="line">	ip <span class="token operator">:=</span> big<span class="token punctuation">.</span><span class="token function">NewInt</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line">	ip<span class="token punctuation">.</span><span class="token function">Mul</span><span class="token punctuation">(</span>im<span class="token punctuation">,</span> in<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>ip<span class="token punctuation">,</span> im<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Div</span><span class="token punctuation">(</span>ip<span class="token punctuation">,</span> io<span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Big Int: %v\n"</span><span class="token punctuation">,</span> ip<span class="token punctuation">)</span></span>
<span class="line">	<span class="token comment">// Here are some calculations with bigInts:</span></span>
<span class="line">	rm <span class="token operator">:=</span> big<span class="token punctuation">.</span><span class="token function">NewRat</span><span class="token punctuation">(</span>math<span class="token punctuation">.</span>MaxInt64<span class="token punctuation">,</span> <span class="token number">1956</span><span class="token punctuation">)</span></span>
<span class="line">	rn <span class="token operator">:=</span> big<span class="token punctuation">.</span><span class="token function">NewRat</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1956</span><span class="token punctuation">,</span> math<span class="token punctuation">.</span>MaxInt64<span class="token punctuation">)</span></span>
<span class="line">	ro <span class="token operator">:=</span> big<span class="token punctuation">.</span><span class="token function">NewRat</span><span class="token punctuation">(</span><span class="token number">19</span><span class="token punctuation">,</span> <span class="token number">56</span><span class="token punctuation">)</span></span>
<span class="line">	rp <span class="token operator">:=</span> big<span class="token punctuation">.</span><span class="token function">NewRat</span><span class="token punctuation">(</span><span class="token number">1111</span><span class="token punctuation">,</span> <span class="token number">2222</span><span class="token punctuation">)</span></span>
<span class="line">	rq <span class="token operator">:=</span> big<span class="token punctuation">.</span><span class="token function">NewRat</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line">	rq<span class="token punctuation">.</span><span class="token function">Mul</span><span class="token punctuation">(</span>rm<span class="token punctuation">,</span> rn<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>rq<span class="token punctuation">,</span> ro<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Mul</span><span class="token punctuation">(</span>rq<span class="token punctuation">,</span> rp<span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Big Rat: %v\n"</span><span class="token punctuation">,</span> rq<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">/* Output:</span>
<span class="line">Big Int: 43492122561469640008497075573153004</span>
<span class="line">Big Rat: -37/112</span>
<span class="line">*/</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出结果：</p>
<pre><code>Big Int: 43492122561469640008497075573153004
Big Rat: -37/112
</code></pre>
</div></template>


