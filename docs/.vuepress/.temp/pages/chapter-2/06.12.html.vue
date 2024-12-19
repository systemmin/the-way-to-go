<template><div><h1 id="_6-12-通过内存缓存来提升性能" tabindex="-1"><a class="header-anchor" href="#_6-12-通过内存缓存来提升性能"><span>6.12 通过内存缓存来提升性能</span></a></h1>
<p>当在进行大量的计算时，提升性能最直接有效的一种方式就是避免重复计算。通过在内存中缓存和重复利用相同计算的结果，称之为内存缓存。最明显的例子就是生成斐波那契数列的程序（详见第 <RouteLink to="/chapter-2/06.6.html">6.6</RouteLink> 和 <RouteLink to="/chapter-2/06.11.html">6.11</RouteLink> 节）：</p>
<p>要计算数列中第 n 个数字，需要先得到之前两个数的值，但很明显绝大多数情况下前两个数的值都是已经计算过的。即每个更后面的数都是基于之前计算结果的重复计算，正如示例 6.11 <a href="examples/chapter_6/fibonacci.go">fibonnaci.go</a> 所展示的那样。</p>
<p>而我们要做就是将第 n 个数的值存在数组中索引为 n 的位置（详见<RouteLink to="/chapter-2/07.0.html">第 7 章</RouteLink>），然后在数组中查找是否已经计算过，如果没有找到，则再进行计算。</p>
<p>程序 Listing 6.17 - <a href="examples/chapter_6/fibonacci_memoization.go">fibonacci_memoization.go</a> 就是依照这个原则实现的，下面是计算到第 40 位数字的性能对比：</p>
<ul>
<li>普通写法：4.730270 秒</li>
<li>内存缓存：0.001000 秒</li>
</ul>
<p>内存缓存的优势显而易见，而且您还可以将它应用到其它类型的计算中，例如使用 <code v-pre>map</code>（详见<RouteLink to="/chapter-2/07.0.html">第 7 章</RouteLink>）而不是数组或切片（Listing 6.21 - <a href="examples/chapter_6/fibonacci_memoization.go">fibonacci_memoization.go</a>）：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"fmt"</span></span>
<span class="line">	<span class="token string">"time"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> LIM <span class="token operator">=</span> <span class="token number">41</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">var</span> fibs <span class="token punctuation">[</span>LIM<span class="token punctuation">]</span><span class="token builtin">uint64</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">var</span> result <span class="token builtin">uint64</span> <span class="token operator">=</span> <span class="token number">0</span></span>
<span class="line">	start <span class="token operator">:=</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> LIM<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span></span>
<span class="line">		result <span class="token operator">=</span> <span class="token function">fibonacci</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"fibonacci(%d) is: %d\n"</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> result<span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	end <span class="token operator">:=</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	delta <span class="token operator">:=</span> end<span class="token punctuation">.</span><span class="token function">Sub</span><span class="token punctuation">(</span>start<span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"longCalculation took this amount of time: %s\n"</span><span class="token punctuation">,</span> delta<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">fibonacci</span><span class="token punctuation">(</span>n <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>res <span class="token builtin">uint64</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token comment">// memoization: check if fibonacci(n) is already known in array:</span></span>
<span class="line">	<span class="token keyword">if</span> fibs<span class="token punctuation">[</span>n<span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token number">0</span> <span class="token punctuation">{</span></span>
<span class="line">		res <span class="token operator">=</span> fibs<span class="token punctuation">[</span>n<span class="token punctuation">]</span></span>
<span class="line">		<span class="token keyword">return</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	<span class="token keyword">if</span> n <span class="token operator">&lt;=</span> <span class="token number">1</span> <span class="token punctuation">{</span></span>
<span class="line">		res <span class="token operator">=</span> <span class="token number">1</span></span>
<span class="line">	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">		res <span class="token operator">=</span> <span class="token function">fibonacci</span><span class="token punctuation">(</span>n<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token function">fibonacci</span><span class="token punctuation">(</span>n<span class="token operator">-</span><span class="token number">2</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	fibs<span class="token punctuation">[</span>n<span class="token punctuation">]</span> <span class="token operator">=</span> res</span>
<span class="line">	<span class="token keyword">return</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>内存缓存的技术在使用计算成本相对昂贵的函数时非常有用（不仅限于例子中的递归），譬如大量进行相同参数的运算。这种技术还可以应用于纯函数中，即相同输入必定获得相同输出的函数。</p>
</div></template>


