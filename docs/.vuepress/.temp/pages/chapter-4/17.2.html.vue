<template><div><h1 id="_17-2-defer-模式" tabindex="-1"><a class="header-anchor" href="#_17-2-defer-模式"><span>17.2 defer 模式</span></a></h1>
<p>使用 <code v-pre>defer</code> 可以确保资源不再需要时，都会被恰当地关闭或归还到“池子”中。更重要的一点是，它可以恢复 panic。</p>
<ol>
<li>关闭一个文件流：（见 <RouteLink to="/chapter-4/12.7.html">12.7节</RouteLink>）</li>
</ol>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token comment">// 先打开一个文件 f</span></span>
<span class="line"><span class="token keyword">defer</span> f<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>解锁一个被锁定的资源（<code v-pre>mutex</code>）：（见 <RouteLink to="/chapter-4/09.3.html">9.3节</RouteLink>）</li>
</ol>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">mu<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">defer</span> mu<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3">
<li>关闭一个通道（如有必要）：</li>
</ol>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">ch := make(chan float64)</span>
<span class="line">defer close(ch)</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>也可以是两个通道：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">answerα<span class="token punctuation">,</span> answerβ <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token function">close</span><span class="token punctuation">(</span>answerα<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token function">close</span><span class="token punctuation">(</span>answerβ<span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4">
<li>从 panic 恢复：（见 <RouteLink to="/chapter-4/13.3.html">13.3节</RouteLink>）</li>
</ol>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">if</span> err <span class="token operator">:=</span> <span class="token function">recover</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">		log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"run time panic: %v"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="5">
<li>停止一个计时器：（见 <RouteLink to="/chapter-4/14.5.html">14.5节</RouteLink>）</li>
</ol>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">tick1 <span class="token operator">:=</span> time<span class="token punctuation">.</span><span class="token function">NewTicker</span><span class="token punctuation">(</span>updateInterval<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">defer</span> tick1<span class="token punctuation">.</span><span class="token function">Stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="6">
<li>释放一个进程 p：（见 <RouteLink to="/chapter-4/13.6.html">13.6节</RouteLink>）</li>
</ol>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">p<span class="token punctuation">,</span> err <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">StartProcess</span><span class="token punctuation">(</span>…<span class="token punctuation">,</span> …<span class="token punctuation">,</span> …<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">defer</span> p<span class="token punctuation">.</span><span class="token function">Release</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="7">
<li>停止 CPU 性能分析并立即写入：（见 <RouteLink to="/chapter-4/13.10.html">13.10节</RouteLink>）</li>
</ol>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">pprof<span class="token punctuation">.</span><span class="token function">StartCPUProfile</span><span class="token punctuation">(</span>f<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">defer</span> pprof<span class="token punctuation">.</span><span class="token function">StopCPUProfile</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>当然 <code v-pre>defer</code> 也可以在打印报表时避免忘记输出页脚。</p>
<h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-4/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-4/17.1.html">逗号 ok 模式</RouteLink></li>
<li>下一节：<RouteLink to="/chapter-4/17.3.html">可见性模式</RouteLink></li>
</ul>
</div></template>


