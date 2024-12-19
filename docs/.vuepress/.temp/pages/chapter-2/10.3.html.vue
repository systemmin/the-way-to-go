<template><div><h1 id="_10-3-使用自定义包中的结构体" tabindex="-1"><a class="header-anchor" href="#_10-3-使用自定义包中的结构体"><span>10.3 使用自定义包中的结构体</span></a></h1>
<p>下面的例子中，main.go 使用了一个结构体，它来自 struct_pack 下的包 <code v-pre>structPack</code>。</p>
<p>示例 10.5 <a href="examples/chapter_10/struct_pack/structPack.go">structPack.go</a>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> structPack</span>
<span class="line"></span>
<span class="line"><span class="token keyword">type</span> ExpStruct <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">    Mi1 <span class="token builtin">int</span></span>
<span class="line">    Mf1 <span class="token builtin">float32</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>示例 10.6 <a href="examples/chapter_10/main.go">main.go</a>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">    <span class="token string">"fmt"</span></span>
<span class="line">    <span class="token string">"./struct_pack/structPack"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    struct1 <span class="token operator">:=</span> <span class="token function">new</span><span class="token punctuation">(</span>structPack<span class="token punctuation">.</span>ExpStruct<span class="token punctuation">)</span></span>
<span class="line">    struct1<span class="token punctuation">.</span>Mi1 <span class="token operator">=</span> <span class="token number">10</span></span>
<span class="line">    struct1<span class="token punctuation">.</span>Mf1 <span class="token operator">=</span> <span class="token number">16.</span></span>
<span class="line"></span>
<span class="line">    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Mi1 = %d\n"</span><span class="token punctuation">,</span> struct1<span class="token punctuation">.</span>Mi1<span class="token punctuation">)</span></span>
<span class="line">    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Mf1 = %f\n"</span><span class="token punctuation">,</span> struct1<span class="token punctuation">.</span>Mf1<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p>
<pre><code>Mi1 = 10
Mf1 = 16.000000
</code></pre>
</div></template>


