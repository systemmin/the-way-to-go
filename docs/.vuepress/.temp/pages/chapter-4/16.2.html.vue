<template><div><h1 id="_16-2-误用字符串" tabindex="-1"><a class="header-anchor" href="#_16-2-误用字符串"><span>16.2 误用字符串</span></a></h1>
<p>当需要对一个字符串进行频繁的操作时，谨记在 go 语言中字符串是不可变的（类似 Java 和 C#）。使用诸如 <code v-pre>a += b</code> 形式连接字符串效率低下，尤其在一个循环内部使用这种形式。这会导致大量的内存开销和拷贝。<strong>应该使用一个字符数组代替字符串，将字符串内容写入一个缓存中。</strong> 例如以下的代码示例：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">var</span> b bytes<span class="token punctuation">.</span>Buffer</span>
<span class="line"><span class="token operator">...</span></span>
<span class="line"><span class="token keyword">for</span> condition <span class="token punctuation">{</span></span>
<span class="line">    b<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span> <span class="token comment">// 将字符串str写入缓存buffer</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">return</span> b<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意：由于编译优化和依赖于使用缓存操作的字符串大小，当循环次数大于 15 时，效率才会更佳。</p>
<h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-4/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-4/16.1.html">误用短声明导致变量覆盖</RouteLink></li>
<li>下一节：<RouteLink to="/chapter-4/16.3.html">发生错误时使用 defer 关闭一个文件</RouteLink></li>
</ul>
</div></template>


