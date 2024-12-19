<template><div><h1 id="_14-6-协程和恢复-recover" tabindex="-1"><a class="header-anchor" href="#_14-6-协程和恢复-recover"><span>14.6 协程和恢复 (recover)</span></a></h1>
<p>一个用到 <code v-pre>recover()</code> 的程序（参见<RouteLink to="/chapter-3/13.3.html">第 13.3 节</RouteLink>停掉了服务器内部一个失败的协程而不影响其他协程的工作。</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">server</span><span class="token punctuation">(</span>workChan <span class="token operator">&lt;-</span><span class="token keyword">chan</span> <span class="token operator">*</span>Work<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">for</span> work <span class="token operator">:=</span> <span class="token keyword">range</span> workChan <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">go</span> <span class="token function">safelyDo</span><span class="token punctuation">(</span>work<span class="token punctuation">)</span>   <span class="token comment">// start the goroutine for that work</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">safelyDo</span><span class="token punctuation">(</span>work <span class="token operator">*</span>Work<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">if</span> err <span class="token operator">:=</span> <span class="token function">recover</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">            log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Work failed with %s in %v"</span><span class="token punctuation">,</span> err<span class="token punctuation">,</span> work<span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token function">do</span><span class="token punctuation">(</span>work<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上边的代码，如果 <code v-pre>do(work)</code> 发生 <code v-pre>panic()</code>，错误会被记录且协程会退出并释放，而其他协程不受影响。</p>
<p>因为 <code v-pre>recover()</code> 总是返回 <code v-pre>nil</code>，除非直接在 <code v-pre>defer</code> 修饰的函数中调用，<code v-pre>defer</code> 修饰的代码可以调用那些自身可以使用 <code v-pre>panic()</code> 和 <code v-pre>recover()</code> 避免失败的库例程（库函数）。举例，<code v-pre>safelyDo()</code> 中 <code v-pre>defer</code> 修饰的函数可能在调用 <code v-pre>recover()</code> 之前就调用了一个 <code v-pre>logging()</code> 函数，panicking 状态不会影响 <code v-pre>logging()</code> 代码的运行。因为加入了恢复模式，函数 <code v-pre>do()</code>（以及它调用的任何东西）可以通过调用 <code v-pre>panic()</code> 来摆脱不好的情况。但是恢复是在 panicking 的协程内部的：不能被另外一个协程恢复。</p>
<h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-3/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-3/14.5.html">通道，超时和计时器</RouteLink></li>
<li>下一节：<RouteLink to="/chapter-3/14.7.html">对比新旧模型：任务和工作</RouteLink></li>
</ul>
</div></template>


