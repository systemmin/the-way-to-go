<template><div><h1 id="_16-3-发生错误时使用-defer-关闭一个文件" tabindex="-1"><a class="header-anchor" href="#_16-3-发生错误时使用-defer-关闭一个文件"><span>16.3 发生错误时使用 defer 关闭一个文件</span></a></h1>
<p>如果你在一个 <code v-pre>for</code> 循环内部处理一系列文件，你需要使用 <code v-pre>defer</code> 确保文件在处理完毕后被关闭，例如：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> file <span class="token operator">:=</span> <span class="token keyword">range</span> files <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">if</span> f<span class="token punctuation">,</span> err <span class="token operator">=</span> os<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token comment">// 这是错误的方式，当循环结束时文件没有关闭</span></span>
<span class="line">    <span class="token keyword">defer</span> f<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token comment">// 对文件进行操作</span></span>
<span class="line">    f<span class="token punctuation">.</span><span class="token function">Process</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是在循环内结尾处的 <code v-pre>defer</code> 没有执行，所以文件一直没有关闭！垃圾回收机制可能会自动关闭文件，但是这会产生一个错误，更好的做法是：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> file <span class="token operator">:=</span> <span class="token keyword">range</span> files <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">if</span> f<span class="token punctuation">,</span> err <span class="token operator">=</span> os<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token comment">// 对文件进行操作</span></span>
<span class="line">    f<span class="token punctuation">.</span><span class="token function">Process</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span></span>
<span class="line">    <span class="token comment">// 关闭文件</span></span>
<span class="line">    f<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"> <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong><code v-pre>defer</code> 仅在函数返回时才会执行，在循环内的结尾或其他一些有限范围的代码内不会执行。</strong></p>
<h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-4/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-4/16.2.html">误用字符串</RouteLink></li>
<li>下一节：<RouteLink to="/chapter-4/16.4.html">何时使用 new() 和 make()</RouteLink></li>
</ul>
</div></template>


