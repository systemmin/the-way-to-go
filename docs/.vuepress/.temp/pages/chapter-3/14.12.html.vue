<template><div><h1 id="_14-12-链式协程" tabindex="-1"><a class="header-anchor" href="#_14-12-链式协程"><span>14.12 链式协程</span></a></h1>
<p>下面的演示程序 <a href="examples/chapter_14/chaining.go">chaining.go</a> 再次展示了启动巨量的 Go 协程是多么容易。这些协程已全部在 <code v-pre>main()</code> 函数中的 <code v-pre>for</code> 循环里启动。当循环完成之后，一个 <code v-pre>0</code> 被写入到最右边的通道里，于是 100,000 个协程开始执行，接着 <code v-pre>1000000</code> 这个结果会在 1.5 秒之内被打印出来。</p>
<p>这个程序同时也展示了如何通过 <code v-pre>flag.Int</code> 来解析命令行中的参数以指定协程数量，例如：<code v-pre>chaining -n=7000</code> 会生成 7000 个协程。</p>
<p>示例 14.17-<a href="examples/chapter_14/chaining.go">chaining.go</a></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"flag"</span></span>
<span class="line">	<span class="token string">"fmt"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">var</span> ngoroutine <span class="token operator">=</span> flag<span class="token punctuation">.</span><span class="token function">Int</span><span class="token punctuation">(</span><span class="token string">"n"</span><span class="token punctuation">,</span> <span class="token number">100000</span><span class="token punctuation">,</span> <span class="token string">"how many goroutines"</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">f</span><span class="token punctuation">(</span>left<span class="token punctuation">,</span> right <span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> left <span class="token operator">&lt;-</span> <span class="token number">1</span> <span class="token operator">+</span> <span class="token operator">&lt;-</span>right <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	flag<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	leftmost <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">var</span> left<span class="token punctuation">,</span> right <span class="token keyword">chan</span> <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> leftmost</span>
<span class="line">	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token operator">*</span>ngoroutine<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span></span>
<span class="line">		left<span class="token punctuation">,</span> right <span class="token operator">=</span> right<span class="token punctuation">,</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span></span>
<span class="line">		<span class="token keyword">go</span> <span class="token function">f</span><span class="token punctuation">(</span>left<span class="token punctuation">,</span> right<span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	right <span class="token operator">&lt;-</span> <span class="token number">0</span>      <span class="token comment">// bang!</span></span>
<span class="line">	x <span class="token operator">:=</span> <span class="token operator">&lt;-</span>leftmost <span class="token comment">// wait for completion</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span>  <span class="token comment">// 100000, about 1.5 s</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（</p>
<p>译者注：原本认为  <code v-pre>leftmost</code> 的结果为 <code v-pre>1</code> ，认为只在最初做了一次赋值，实际结果为 <code v-pre>100000</code>（无缓存信道具有同步阻塞的特性）</p>
<ol>
<li>
<p>主线程的 <code v-pre>right &lt;- 0</code>，right 不是最初循环的那个 <code v-pre>right</code>，而是最终循环的 <code v-pre>right</code></p>
</li>
<li>
<p><code v-pre>for</code> 循环中最初的 <code v-pre>go f(left, right)</code> 因为没有发送者一直处于等待状态</p>
</li>
<li>
<p>当主线程的 <code v-pre>right &lt;- 0</code> 执行时，类似于递归函数在最内层产生返回值一般</p>
</li>
</ol>
<p>）</p>
<h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-3/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-3/14.11.html">限制同时处理的请求数</RouteLink></li>
<li>下一节：<RouteLink to="/chapter-3/14.13.html">在多核心上并行计算</RouteLink></li>
</ul>
</div></template>


