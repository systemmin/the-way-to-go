<template><div><h1 id="_6-9-应用闭包-将函数作为返回值" tabindex="-1"><a class="header-anchor" href="#_6-9-应用闭包-将函数作为返回值"><span>6.9 应用闭包：将函数作为返回值</span></a></h1>
<p>在程序 <a href="examples/chapter_6/function_return.go">function_return.go</a> 中我们将会看到函数 <code v-pre>Add2()</code> 和 <code v-pre>Adder()</code> 均会返回签名为 <code v-pre>func(b int) int</code> 的函数：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">Add2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span>b <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">Adder</span><span class="token punctuation">(</span>a <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span>b <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>函数 <code v-pre>Add2()</code> 不接受任何参数，但函数 <code v-pre>Adder()</code> 接受一个 <code v-pre>int</code> 类型的整数作为参数。</p>
<p>我们也可以将 <code v-pre>Adder()</code> 返回的函数存到变量中 (<a href="examples/chapter_6/function_return.go">function_return.go</a>)。</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token string">"fmt"</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token comment">// make an Add2 function, give it a name p2, and call it:</span></span>
<span class="line">	p2 <span class="token operator">:=</span> <span class="token function">Add2</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Call Add2 for 3 gives: %v\n"</span><span class="token punctuation">,</span> <span class="token function">p2</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token comment">// make a special Adder function, a gets value 2:</span></span>
<span class="line">	TwoAdder <span class="token operator">:=</span> <span class="token function">Adder</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"The result is: %v\n"</span><span class="token punctuation">,</span> <span class="token function">TwoAdder</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">Add2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">func</span><span class="token punctuation">(</span>b <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span>b <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token keyword">return</span> b <span class="token operator">+</span> <span class="token number">2</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">Adder</span><span class="token punctuation">(</span>a <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token keyword">func</span><span class="token punctuation">(</span>b <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span>b <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token keyword">return</span> a <span class="token operator">+</span> b</span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">Call Add2 for 3 gives: 5</span>
<span class="line">The result is: 5</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>下例为一个略微不同的实现 (<a href="examples/chapter_6/function_closure.go">function_closure.go</a>)：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token string">"fmt"</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">var</span> f <span class="token operator">=</span> <span class="token function">Adder</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token function">f</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">" - "</span><span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token function">f</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">" - "</span><span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token function">f</span><span class="token punctuation">(</span><span class="token number">300</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">Adder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">var</span> x <span class="token builtin">int</span></span>
<span class="line">	<span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span>delta <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span></span>
<span class="line">		x <span class="token operator">+=</span> delta</span>
<span class="line">		<span class="token keyword">return</span> x</span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>函数 <code v-pre>Adder()</code> 现在被赋值到变量 <code v-pre>f</code> 中（类型为 <code v-pre>func(int) int</code>）。</p>
<p>输出：</p>
<pre><code>1 - 21 - 321
</code></pre>
<p>三次调用函数 <code v-pre>f</code> 的过程中函数 <code v-pre>Adder()</code> 中变量 <code v-pre>delta</code> 的值分别为：1、20 和 300。</p>
<p>我们可以看到，在多次调用中，变量 <code v-pre>x</code> 的值是被保留的，即 <code v-pre>0 + 1 = 1</code>，然后 <code v-pre>1 + 20 = 21</code>，最后 <code v-pre>21 + 300 = 321</code>：闭包函数保存并积累其中的变量的值，不管外部函数退出与否，它都能够继续操作外部函数中的局部变量。</p>
<p>这些局部变量同样可以是参数，例如之前例子中的 <code v-pre>Adder(as int)</code>。</p>
<p>这些例子清楚地展示了如何在 Go 语言中使用闭包。</p>
<p>在闭包中使用到的变量可以是在闭包函数体内声明的，也可以是在外部函数声明的：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">var</span> g <span class="token builtin">int</span></span>
<span class="line"><span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span>i <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	s <span class="token operator">:=</span> <span class="token number">0</span></span>
<span class="line">	<span class="token keyword">for</span> j <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> i<span class="token punctuation">;</span> j<span class="token operator">++</span> <span class="token punctuation">{</span> s <span class="token operator">+=</span> j <span class="token punctuation">}</span></span>
<span class="line">	g <span class="token operator">=</span> s</span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span> <span class="token comment">// Passes argument 1000 to the function literal.</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样闭包函数就能够被应用到整个集合的元素上，并修改它们的值。然后这些变量就可以用于表示或计算全局或平均值。</p>
<p><strong>练习 6.9</strong> <a href="exercises/chapter_6/fibonacci_closure.go">fibonacci_closure</a></p>
<p>不使用递归但使用闭包改写第 6.6 节中的斐波那契数列程序。</p>
<p><strong>练习 6.10</strong></p>
<p>学习并理解以下程序的工作原理：</p>
<p>一个返回值为另一个函数的函数可以被称之为工厂函数，这在您需要创建一系列相似的函数的时候非常有用：书写一个工厂函数而不是针对每种情况都书写一个函数。下面的函数演示了如何动态返回追加后缀的函数：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">MakeAddSuffix</span><span class="token punctuation">(</span>suffix <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token keyword">if</span> <span class="token operator">!</span>strings<span class="token punctuation">.</span><span class="token function">HasSuffix</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> suffix<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">			<span class="token keyword">return</span> name <span class="token operator">+</span> suffix</span>
<span class="line">		<span class="token punctuation">}</span></span>
<span class="line">		<span class="token keyword">return</span> name</span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们可以生成如下函数：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">addBmp <span class="token operator">:=</span> <span class="token function">MakeAddSuffix</span><span class="token punctuation">(</span><span class="token string">".bmp"</span><span class="token punctuation">)</span></span>
<span class="line">addJpeg <span class="token operator">:=</span> <span class="token function">MakeAddSuffix</span><span class="token punctuation">(</span><span class="token string">".jpeg"</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>然后调用它们：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token function">addBmp</span><span class="token punctuation">(</span><span class="token string">"file"</span><span class="token punctuation">)</span> <span class="token comment">// returns: file.bmp</span></span>
<span class="line"><span class="token function">addJpeg</span><span class="token punctuation">(</span><span class="token string">"file"</span><span class="token punctuation">)</span> <span class="token comment">// returns: file.jpeg</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>可以返回其它函数的函数和接受其它函数作为参数的函数均被称之为高阶函数，是函数式语言的特点。我们已经在<RouteLink to="/chapter-2/06.7.html">第 6.7 节</RouteLink>中得知函数也是一种值，因此很显然 Go 语言具有一些函数式语言的特性。闭包在 Go 语言中非常常见，常用于 goroutine 和管道操作（详见第 <RouteLink to="/chapter-2/14.8.html">14.8</RouteLink>-<RouteLink to="/chapter-2/14.9.html">14.9</RouteLink> 节）。在<RouteLink to="/chapter-2/11.14.html">第 11.14 节</RouteLink>的程序中，我们将会看到 Go 语言中的函数在处理混合对象时的强大能力。</p>
</div></template>


