<template><div><h1 id="_12-7-用-defer-关闭文件" tabindex="-1"><a class="header-anchor" href="#_12-7-用-defer-关闭文件"><span>12.7 用 defer 关闭文件</span></a></h1>
<p><code v-pre>defer</code> 关键字（参看 <RouteLink to="/chapter-3/06.4.html">6.4</RouteLink>）对于在函数结束时关闭打开的文件非常有用，例如下面的代码片段：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">data</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span></span>
<span class="line">	f<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">OpenFile</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> os<span class="token punctuation">.</span>O_RDONLY<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">defer</span> f<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// idiomatic Go code!</span></span>
<span class="line">	contents<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> ioutil<span class="token punctuation">.</span><span class="token function">ReadAll</span><span class="token punctuation">(</span>f<span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">return</span> <span class="token function">string</span><span class="token punctuation">(</span>contents<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在函数 <code v-pre>return</code> 后执行了 <code v-pre>f.Close()</code></p>
<h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-3/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-3/12.6.html">用切片读写文件</RouteLink></li>
<li>下一节：<RouteLink to="/chapter-3/12.8.html">使用接口的实际例子：fmt.Fprintf</RouteLink></li>
</ul>
</div></template>


