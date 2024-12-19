<template><div><h1 id="_14-13-在多核心上并行计算" tabindex="-1"><a class="header-anchor" href="#_14-13-在多核心上并行计算"><span>14.13 在多核心上并行计算</span></a></h1>
<p>假设我们有 <code v-pre>NCPU</code> 个 CPU 核心：<code v-pre>const  NCPU = 4 //对应一个四核处理器</code> 然后我们想把计算量分成 <code v-pre>NCPU</code> 个部分，每一个部分都和其他部分并行运行。</p>
<p>这可以通过以下代码所示的方式完成（我们且省略具体参数）</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">DoAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">    sem <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> NCPU<span class="token punctuation">)</span> <span class="token comment">// Buffering optional but sensible</span></span>
<span class="line">    <span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> NCPU<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">go</span> <span class="token function">DoPart</span><span class="token punctuation">(</span>sem<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token comment">// Drain the channel sem, waiting for NCPU tasks to complete</span></span>
<span class="line">    <span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> NCPU<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token operator">&lt;-</span>sem <span class="token comment">// wait for one task to complete</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token comment">// All done.</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">DoPart</span><span class="token punctuation">(</span>sem <span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// do the part of the computation</span></span>
<span class="line">    sem <span class="token operator">&lt;-</span><span class="token number">1</span> <span class="token comment">// signal that this piece is done</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    runtime<span class="token punctuation">.</span><span class="token function">GOMAXPROCS</span><span class="token punctuation">(</span>NCPU<span class="token punctuation">)</span> <span class="token comment">// runtime.GOMAXPROCS = NCPU</span></span>
<span class="line">    <span class="token function">DoAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p><code v-pre>DoAll()</code> 函数创建了一个 <code v-pre>sem</code> 通道，每个并行计算都将在对其发送完成信号；在一个 <code v-pre>for</code> 循环中 <code v-pre>NCPU</code> 个协程被启动了，每个协程会承担 <code v-pre>1/NCPU</code> 的工作量。每一个 <code v-pre>DoPart()</code> 协程都会向 <code v-pre>sem</code> 通道发送完成信号。</p>
</li>
<li>
<p><code v-pre>DoAll()</code> 会在 <code v-pre>for</code> 循环中等待 <code v-pre>NCPU</code> 个协程完成：<code v-pre>sem</code> 通道就像一个信号量，这份代码展示了一个经典的信号量模式。（参见 <RouteLink to="/chapter-3/14.2.html#1427-%E4%BF%A1%E5%8F%B7%E9%87%8F%E6%A8%A1%E5%BC%8F">14.2.7</RouteLink>）</p>
</li>
</ul>
<p>在以上运行模型中，您还需将 <code v-pre>GOMAXPROCS</code> 设置为 <code v-pre>NCPU</code>（参见 <RouteLink to="/chapter-3/14.1.html#1413-%E4%BD%BF%E7%94%A8-gomaxprocs">14.1.3</RouteLink>）。</p>
<h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-3/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-3/14.12.html">协程链</RouteLink></li>
<li>下一节：<RouteLink to="/chapter-3/14.14.html">并行化大量数据的计算</RouteLink></li>
</ul>
</div></template>


