<template><div><h1 id="_18-8-协程-goroutine-与通道-channel" tabindex="-1"><a class="header-anchor" href="#_18-8-协程-goroutine-与通道-channel"><span>18.8 协程 (goroutine) 与通道 (channel)</span></a></h1>
<p>出于性能考虑的建议：</p>
<p>实践经验表明，为了使并行运算获得高于串行运算的效率，在协程内部完成的工作量，必须远远高于协程的创建和相互来回通信的开销。</p>
<ul>
<li>
<p>出于性能考虑建议使用带缓存的通道：</p>
<p>使用带缓存的通道可以很轻易成倍提高它的吞吐量，某些场景其性能可以提高至 10 倍甚至更多。通过调整通道的容量，甚至可以尝试着更进一步的优化其性能。</p>
</li>
<li>
<p>限制一个通道的数据数量并将它们封装成一个数组：</p>
<p>如果使用通道传递大量单独的数据，那么通道将变成性能瓶颈。然而，将数据块打包封装成数组，在接收端解压数据时，性能可以提高至 10 倍。</p>
</li>
</ul>
<p>现在创建一个带缓存的通道：<code v-pre>ch := make(chan type,buf)</code></p>
<p>（1）如何使用 <code v-pre>for</code> 或者 <code v-pre>for-range</code> 遍历一个通道：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">for</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> ch <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// do something with v</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（2）如何检测一个通道 <code v-pre>ch</code> 是否关闭：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token comment">//read channel until it closes or error-condition</span></span>
<span class="line"><span class="token keyword">for</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">if</span> input<span class="token punctuation">,</span> open <span class="token operator">:=</span> <span class="token operator">&lt;-</span>ch<span class="token punctuation">;</span> <span class="token operator">!</span>open <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">break</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%s"</span><span class="token punctuation">,</span> input<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者使用（1）自动检测。</p>
<p>（3）如何通过一个通道让主程序等待直到协程完成（信号量模式）：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token comment">// Allocate a channel.</span></span>
<span class="line"><span class="token comment">// Start something in a goroutine; when it completes, signal on the channel.</span></span>
<span class="line"><span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// doSomething</span></span>
<span class="line">    ch <span class="token operator">&lt;-</span> <span class="token number">1</span> <span class="token comment">// Send a signal; value does not matter.</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token function">doSomethingElseForAWhile</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token operator">&lt;-</span>ch <span class="token comment">// Wait for goroutine to finish; discard sent value.</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果希望程序一直阻塞，在匿名函数中省略 <code v-pre>ch &lt;- 1</code> 即可。</p>
<p>（4）通道的工厂模板：以下函数是一个通道工厂，启动一个匿名函数作为协程以生产通道：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">pump</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">chan</span> <span class="token builtin">int</span> <span class="token punctuation">{</span></span>
<span class="line">    ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span></span>
<span class="line">            ch <span class="token operator">&lt;-</span> i</span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">return</span> ch</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（5）通道迭代器模板：（注：这里原书没有写东西，但是应该是参考<RouteLink to="/chapter-4/14.2.html">章节 14.2.10</RouteLink>）</p>
<p>（6）如何限制并发处理请求的数量：参考<RouteLink to="/chapter-4/14.11.html">章节 14.11</RouteLink></p>
<p>（7）如何在多核CPU上实现并行计算：参考<RouteLink to="/chapter-4/14.13.html">章节 14.13</RouteLink></p>
<p>（8）如何终止一个协程：<code v-pre>runtime.Goexit()</code></p>
<p>（9）简单的超时模板：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">timeout <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">bool</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">1e9</span><span class="token punctuation">)</span> <span class="token comment">// one second  </span></span>
<span class="line">    timeout <span class="token operator">&lt;-</span> <span class="token boolean">true</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">select</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">case</span> <span class="token operator">&lt;-</span>ch<span class="token punctuation">:</span></span>
<span class="line">    <span class="token comment">// a read from ch has occurred</span></span>
<span class="line">    <span class="token keyword">case</span> <span class="token operator">&lt;-</span>timeout<span class="token punctuation">:</span></span>
<span class="line">    <span class="token comment">// the read from ch has timed out</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（10）如何使用输入通道和输出通道代替锁：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">Worker</span><span class="token punctuation">(</span>in<span class="token punctuation">,</span> out <span class="token keyword">chan</span> <span class="token operator">*</span>Task<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">for</span> <span class="token punctuation">{</span></span>
<span class="line">        t <span class="token operator">:=</span> <span class="token operator">&lt;-</span>in</span>
<span class="line">        <span class="token function">process</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span></span>
<span class="line">        out <span class="token operator">&lt;-</span> t</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（11）如何在同步调用运行时间过长时将之丢弃：参考<RouteLink to="/chapter-4/14.5.html">章节 14.5</RouteLink> 第二个变体</p>
<p>（12）如何在通道中使用计时器和定时器：参考<RouteLink to="/chapter-4/14.5.html">章节 14.5</RouteLink></p>
<p>（13）典型的服务器后端模型：参考<RouteLink to="/chapter-4/14.4.html">章节 14.4</RouteLink></p>
<h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-4/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-4/18.7.html">文件</RouteLink></li>
<li>下一节：<RouteLink to="/chapter-4/18.9.html">网络和网页应用</RouteLink></li>
</ul>
</div></template>


