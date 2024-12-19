<template><div><h1 id="_11-5-测试一个值是否实现了某个接口" tabindex="-1"><a class="header-anchor" href="#_11-5-测试一个值是否实现了某个接口"><span>11.5 测试一个值是否实现了某个接口</span></a></h1>
<p>这是 11.3 类型断言中的一个特例：假定 <code v-pre>v</code> 是一个值，然后我们想测试它是否实现了 <code v-pre>Stringer</code> 接口，可以这样做：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">type</span> Stringer <span class="token keyword">interface</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">if</span> sv<span class="token punctuation">,</span> ok <span class="token operator">:=</span> v<span class="token punctuation">.</span><span class="token punctuation">(</span>Stringer<span class="token punctuation">)</span><span class="token punctuation">;</span> ok <span class="token punctuation">{</span></span>
<span class="line">    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"v implements String(): %s\n"</span><span class="token punctuation">,</span> sv<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// note: sv, not v</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>Print()</code> 函数就是如此检测类型是否可以打印自身的。</p>
<p>接口是一种契约，实现类型必须满足它，它描述了类型的行为，规定类型可以做什么。接口彻底将类型能做什么，以及如何做分离开来，使得相同接口的变量在不同的时刻表现出不同的行为，这就是多态的本质。</p>
<p>编写参数是接口变量的函数，这使得它们更具有一般性。</p>
<p><strong>使用接口使代码更具有普适性。</strong></p>
<p>标准库里到处都使用了这个原则，如果对接口概念没有良好的把握，是不可能理解它是如何构建的。</p>
<p>在接下来的章节中，我们会讨论两个重要的例子，试着去深入理解它们，这样你就可以更好的应用上面的原则。</p>
</div></template>


