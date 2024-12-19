<template><div><h1 id="_6-10-使用闭包调试" tabindex="-1"><a class="header-anchor" href="#_6-10-使用闭包调试"><span>6.10 使用闭包调试</span></a></h1>
<p>当您在分析和调试复杂的程序时，无数个函数在不同的代码文件中相互调用，如果这时候能够准确地知道哪个文件中的具体哪个函数正在执行，对于调试是十分有帮助的。您可以使用 <code v-pre>runtime</code> 或 <code v-pre>log</code> 包中的特殊函数来实现这样的功能。包 <code v-pre>runtime</code> 中的函数 <code v-pre>Caller()</code> 提供了相应的信息，因此可以在需要的时候实现一个 <code v-pre>where()</code> 闭包函数来打印函数执行的位置：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">where <span class="token operator">:=</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token boolean">_</span><span class="token punctuation">,</span> file<span class="token punctuation">,</span> line<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> runtime<span class="token punctuation">.</span><span class="token function">Caller</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line">	log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%s:%d"</span><span class="token punctuation">,</span> file<span class="token punctuation">,</span> line<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token function">where</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token comment">// some code</span></span>
<span class="line"><span class="token function">where</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token comment">// some more code</span></span>
<span class="line"><span class="token function">where</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>您也可以设置 <code v-pre>log</code> 包中的 <code v-pre>flag</code> 参数来实现：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">log<span class="token punctuation">.</span><span class="token function">SetFlags</span><span class="token punctuation">(</span>log<span class="token punctuation">.</span>Llongfile<span class="token punctuation">)</span></span>
<span class="line">log<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token string">""</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>或使用一个更加简短版本的 <code v-pre>where()</code> 函数：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">var</span> where <span class="token operator">=</span> log<span class="token punctuation">.</span>Print</span>
<span class="line"><span class="token keyword">func</span> <span class="token function">func1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"><span class="token function">where</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token operator">...</span> some code</span>
<span class="line"><span class="token function">where</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token operator">...</span> some code</span>
<span class="line"><span class="token function">where</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


