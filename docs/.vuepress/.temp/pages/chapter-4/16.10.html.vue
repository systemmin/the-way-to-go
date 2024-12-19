<template><div><h1 id="_16-10-糟糕的错误处理" tabindex="-1"><a class="header-anchor" href="#_16-10-糟糕的错误处理"><span>16.10 糟糕的错误处理</span></a></h1>
<p>译者注：该小结关于错误处理的观点，译者并不完全赞同，关于本小结的部分想法请参考 <RouteLink to="/chapter-4/Discussion_about_16.10.html">关于 16.10.2 小节错误处理的一些见解</RouteLink>。</p>
<p>依附于<RouteLink to="/chapter-4/13.0.html">第 13 章</RouteLink>模式的描述和<RouteLink to="/chapter-4/17.1.html">第 17.1 小节</RouteLink>与<RouteLink to="/chapter-4/17.2.html">第 17.2.4 小节</RouteLink>的总结。</p>
<h2 id="_16-10-1-不要使用布尔值" tabindex="-1"><a class="header-anchor" href="#_16-10-1-不要使用布尔值"><span>16.10.1 不要使用布尔值：</span></a></h2>
<p>像下面代码一样，创建一个布尔型变量用于测试错误条件是多余的：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">var</span> good <span class="token builtin">bool</span></span>
<span class="line">    <span class="token comment">// 测试一个错误，`good` 被赋为 `true` 或者 `false`</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token operator">!</span>good <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">"things aren’t good"</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>立即检测一个错误：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token operator">...</span> err1 <span class="token operator">:=</span> api<span class="token punctuation">.</span><span class="token function">Func1</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">if</span> err1 <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span> … <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_16-10-2-避免错误检测使代码变得混乱" tabindex="-1"><a class="header-anchor" href="#_16-10-2-避免错误检测使代码变得混乱"><span>16.10.2 避免错误检测使代码变得混乱：</span></a></h2>
<p>避免写出这样的代码：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token operator">...</span> err1 <span class="token operator">:=</span> api<span class="token punctuation">.</span><span class="token function">Func1</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">if</span> err1 <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"err: "</span> <span class="token operator">+</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">return</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line">err2 <span class="token operator">:=</span> api<span class="token punctuation">.</span><span class="token function">Func2</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">if</span> err2 <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line"><span class="token operator">...</span></span>
<span class="line">    <span class="token keyword">return</span></span>
<span class="line"><span class="token punctuation">}</span>    </span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，包括在一个初始化的 <code v-pre>if</code> 语句中对函数的调用。但即使代码中到处都是以 <code v-pre>if</code> 语句的形式通知错误（通过打印错误信息）。通过这种方式，很难分辨什么是正常的程序逻辑，什么是错误检测或错误通知。还需注意的是，大部分代码都是致力于错误的检测。通常解决此问题的好办法是尽可能以闭包的形式封装你的错误检测，例如下面的代码：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">httpRequestHandler</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> req <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    err <span class="token operator">:=</span> <span class="token keyword">func</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">if</span> req<span class="token punctuation">.</span>Method <span class="token operator">!=</span> <span class="token string">"GET"</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">return</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">"expected GET"</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">        <span class="token keyword">if</span> input <span class="token operator">:=</span> <span class="token function">parseInput</span><span class="token punctuation">(</span>req<span class="token punctuation">)</span><span class="token punctuation">;</span> input <span class="token operator">!=</span> <span class="token string">"command"</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">return</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">"malformed command"</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">        <span class="token comment">// 可以在此进行其他的错误检测</span></span>
<span class="line">    <span class="token punctuation">}</span> <span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">        <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">            w<span class="token punctuation">.</span><span class="token function">WriteHeader</span><span class="token punctuation">(</span><span class="token number">400</span><span class="token punctuation">)</span></span>
<span class="line">            io<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> err<span class="token punctuation">)</span></span>
<span class="line">            <span class="token keyword">return</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">        <span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">...</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方法可以很容易分辨出错误检测、错误通知和正常的程序逻辑（更详细的方式参考<RouteLink to="/chapter-4/13.5.html">第 13.5 小节</RouteLink>）。</p>
<p><strong>在开始阅读<RouteLink to="/chapter-4/17.0.html">第 17 章</RouteLink>前，先回答下列 2 个问题：</strong></p>
<ul>
<li>
<p>问题 16.1：总结你能记住的所有关于 <code v-pre>, ok</code> 模式的情况。</p>
</li>
<li>
<p>问题 16.2：总结你能记住的所有关于 <code v-pre>defer</code> 模式的情况。</p>
</li>
</ul>
<h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-4/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-4/16.9.html">闭包和协程的使用</RouteLink></li>
<li>下一章：<RouteLink to="/chapter-4/17.0.html">Go 语言模式</RouteLink></li>
</ul>
</div></template>


