<template><div><h1 id="_6-7-将函数作为参数" tabindex="-1"><a class="header-anchor" href="#_6-7-将函数作为参数"><span>6.7 将函数作为参数</span></a></h1>
<p>函数可以作为其它函数的参数进行传递，然后在其它函数内调用执行，一般称之为回调。下面是一个将函数作为参数的简单例子（<a href="examples/chapter_6/function_parameter.go">function_parameter.go</a>）：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"fmt"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token function">callback</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> Add<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">Add</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"The sum of %d and %d is: %d\n"</span><span class="token punctuation">,</span> a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> a<span class="token operator">+</span>b<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">callback</span><span class="token punctuation">(</span>y <span class="token builtin">int</span><span class="token punctuation">,</span> f <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token builtin">int</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token function">f</span><span class="token punctuation">(</span>y<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token comment">// this becomes Add(1, 2)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p>
<pre><code>The sum of 1 and 2 is: 3
</code></pre>
<p>将函数作为参数的最好的例子是函数 <code v-pre>strings.IndexFunc()</code>：</p>
<p>该函数的签名是 <code v-pre>func IndexFunc(s string, f func(c rune) bool) int</code>，它的返回值是字符串 s 中第一个使函数 <code v-pre>f(c)</code> 返回 <code v-pre>true</code> 的 Unicode 字符的索引值。如果找不到，则返回 -1。</p>
<p>例如 <code v-pre>strings.IndexFunc(line, unicode.IsSpace)</code> 就会返回 <code v-pre>line</code> 中第一个空白字符的索引值。当然，您也可以书写自己的函数：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">IsAscii</span><span class="token punctuation">(</span>c <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">if</span> c <span class="token operator">></span> <span class="token number">255</span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token keyword">return</span> <span class="token boolean">false</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	<span class="token keyword">return</span> <span class="token boolean">true</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在<RouteLink to="/chapter-2/14.10.html">第 14.10.1 节</RouteLink> 中，我们将会根据一个客户端/服务端程序作为示例对这个用法进行深入讨论。</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">type</span> binOp <span class="token keyword">func</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">run</span><span class="token punctuation">(</span>op binOp<span class="token punctuation">,</span> req <span class="token operator">*</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span> … <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>练习 6.7</strong> <a href="exercises/chapter_6/strings_map.go">strings_map.go</a></p>
<p>包 <code v-pre>strings</code> 中的 <code v-pre>Map()</code> 函数和 <code v-pre>strings.IndexFunc()</code> 一样都是非常好的使用例子。请学习它的源代码并基于该函数书写一个程序，要求将指定文本内的所有非 ASCII 字符替换成问号 <code v-pre>'?'</code> 或空格 <code v-pre>' '</code>。您需要怎么做才能删除这些字符呢？</p>
</div></template>


