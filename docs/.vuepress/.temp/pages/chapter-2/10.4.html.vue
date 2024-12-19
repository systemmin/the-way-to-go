<template><div><h1 id="_10-4-带标签的结构体" tabindex="-1"><a class="header-anchor" href="#_10-4-带标签的结构体"><span>10.4 带标签的结构体</span></a></h1>
<p>结构体中的字段除了有名字和类型外，还可以有一个可选的标签 (tag)：它是一个附属于字段的字符串，可以是文档或其他的重要标记。标签的内容不可以在一般的编程中使用，只有包 <code v-pre>reflect</code> 能获取它。我们将在下一章（<RouteLink to="/chapter-2/11.10.html">第 11.10 节</RouteLink>中深入的探讨 <code v-pre>reflect</code> 包，它可以在运行时自省类型、属性和方法，比如：在一个变量上调用 <code v-pre>reflect.TypeOf()</code> 可以获取变量的正确类型，如果变量是一个结构体类型，就可以通过 Field 来索引结构体的字段，然后就可以使用 Tag 属性。</p>
<p>示例 10.7 <a href="examples/chapter_10/struct_tag.go">struct_tag.go</a>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"fmt"</span></span>
<span class="line">	<span class="token string">"reflect"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">type</span> TagType <span class="token keyword">struct</span> <span class="token punctuation">{</span> <span class="token comment">// tags</span></span>
<span class="line">	field1 <span class="token builtin">bool</span>   <span class="token string">"An important answer"</span></span>
<span class="line">	field2 <span class="token builtin">string</span> <span class="token string">"The name of the thing"</span></span>
<span class="line">	field3 <span class="token builtin">int</span>    <span class="token string">"How much there are"</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	tt <span class="token operator">:=</span> TagType<span class="token punctuation">{</span><span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token string">"Barak Obama"</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">}</span></span>
<span class="line">	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">3</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token function">refTag</span><span class="token punctuation">(</span>tt<span class="token punctuation">,</span> i<span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">refTag</span><span class="token punctuation">(</span>tt TagType<span class="token punctuation">,</span> ix <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	ttType <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">TypeOf</span><span class="token punctuation">(</span>tt<span class="token punctuation">)</span></span>
<span class="line">	ixField <span class="token operator">:=</span> ttType<span class="token punctuation">.</span><span class="token function">Field</span><span class="token punctuation">(</span>ix<span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%v\n"</span><span class="token punctuation">,</span> ixField<span class="token punctuation">.</span>Tag<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p>
<pre><code>An important answer
The name of the thing
How much there are
</code></pre>
</div></template>


