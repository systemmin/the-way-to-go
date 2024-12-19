<template><div><h1 id="_14-16-对-go-协程进行基准测试" tabindex="-1"><a class="header-anchor" href="#_14-16-对-go-协程进行基准测试"><span>14.16 对 Go 协程进行基准测试</span></a></h1>
<p>在 <RouteLink to="/chapter-3/13.7.html">13.7 节</RouteLink> 我们提到了在 Go 语言中对你的函数进行基准测试。在此我们将其应用到一个用协程向通道写入整数再读出的实例中。这个函数将通过 <code v-pre>testing.Benchmark()</code> 调用 <code v-pre>N</code> 次（例如：<code v-pre>N = 1,000,000</code>），<code v-pre>BenchMarkResult</code> 有一个 <code v-pre>String()</code> 方法来输出其结果。<code v-pre>N</code> 的值将由 <code v-pre>gotest</code> 来判断并取得一个足够大的数字，以获得合理的基准测试结果。当然同样的基准测试方法也适用于普通函数。</p>
<p>如果你想排除指定部分的代码或者更具体的指定要测试的部分，可以使用 <code v-pre>testing.B.startTimer()</code> 和 <code v-pre>testing.B.stopTimer()</code> 来开始或结束计时器。基准测试只有在所有的测试通过后才能运行！</p>
<p>示例：14.18-<a href="examples/chapter_14/benchmark_channels.go">benchmark_channels.go</a></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"fmt"</span></span>
<span class="line">	<span class="token string">"testing"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">" sync"</span><span class="token punctuation">,</span> testing<span class="token punctuation">.</span><span class="token function">Benchmark</span><span class="token punctuation">(</span>BenchmarkChannelSync<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"buffered"</span><span class="token punctuation">,</span> testing<span class="token punctuation">.</span><span class="token function">Benchmark</span><span class="token punctuation">(</span>BenchmarkChannelBuffered<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">BenchmarkChannelSync</span><span class="token punctuation">(</span>b <span class="token operator">*</span>testing<span class="token punctuation">.</span>B<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> b<span class="token punctuation">.</span>N<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span></span>
<span class="line">			ch <span class="token operator">&lt;-</span> i</span>
<span class="line">		<span class="token punctuation">}</span></span>
<span class="line">		<span class="token function">close</span><span class="token punctuation">(</span>ch<span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">for</span> <span class="token keyword">range</span> ch <span class="token punctuation">{</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">BenchmarkChannelBuffered</span><span class="token punctuation">(</span>b <span class="token operator">*</span>testing<span class="token punctuation">.</span>B<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">128</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> b<span class="token punctuation">.</span>N<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span></span>
<span class="line">			ch <span class="token operator">&lt;-</span> i</span>
<span class="line">		<span class="token punctuation">}</span></span>
<span class="line">		<span class="token function">close</span><span class="token punctuation">(</span>ch<span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">for</span> <span class="token keyword">range</span> ch <span class="token punctuation">{</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">  Output:Windows:  N       Time 1 op   Operations per sec</span>
<span class="line">  sync      1000000  2443 ns/op  -->  409 332 / s</span>
<span class="line">  buffered   1000000  4850 ns/op  -->  810 477 / s</span>
<span class="line">  Linux:</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-3/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-3/14.15.html">漏桶算法</RouteLink></li>
<li>下一节：<RouteLink to="/chapter-3/14.17.html">使用通道并发访问对象</RouteLink></li>
</ul>
</div></template>


