<template><div><h1 id="_16-5-不需要将一个指向切片的指针传递给函数" tabindex="-1"><a class="header-anchor" href="#_16-5-不需要将一个指向切片的指针传递给函数"><span>16.5 不需要将一个指向切片的指针传递给函数</span></a></h1>
<p>在第 <RouteLink to="/chapter-4/04.9.html">4.9 小节</RouteLink>，我们已经知道，切片实际是一个指向潜在数组的指针。我们常常需要把切片作为一个参数传递给函数是因为：实际就是传递一个指向变量的指针，在函数内可以改变这个变量，而不是传递数据的拷贝。</p>
<p>因此应该这样做：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">       <span class="token keyword">func</span> <span class="token function">findBiggest</span><span class="token punctuation">(</span> listOfNumbers <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span> <span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>而不是：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">       <span class="token keyword">func</span> <span class="token function">findBiggest</span><span class="token punctuation">(</span> listOfNumbers <span class="token operator">*</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span> <span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><strong>当切片作为参数传递时，切记不要解引用切片。</strong></p>
<h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-4/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-4/16.4.html">何时使用 new() 和 make()</RouteLink></li>
<li>下一节：<RouteLink to="/chapter-4/16.6.html">使用指针指向接口类型</RouteLink></li>
</ul>
</div></template>


