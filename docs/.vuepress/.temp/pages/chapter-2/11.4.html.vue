<template><div><h1 id="_11-4-类型判断-type-switch" tabindex="-1"><a class="header-anchor" href="#_11-4-类型判断-type-switch"><span>11.4 类型判断：type-switch</span></a></h1>
<p>接口变量的类型也可以使用一种特殊形式的 <code v-pre>switch</code> 来检测：<strong>type-switch</strong> （下面是示例 11.4 的第二部分）：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">switch</span> t <span class="token operator">:=</span> areaIntf<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token keyword">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"><span class="token keyword">case</span> <span class="token operator">*</span>Square<span class="token punctuation">:</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Type Square %T with value %v\n"</span><span class="token punctuation">,</span> t<span class="token punctuation">,</span> t<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">case</span> <span class="token operator">*</span>Circle<span class="token punctuation">:</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Type Circle %T with value %v\n"</span><span class="token punctuation">,</span> t<span class="token punctuation">,</span> t<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">case</span> <span class="token boolean">nil</span><span class="token punctuation">:</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"nil value: nothing to check?\n"</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">default</span><span class="token punctuation">:</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Unexpected type %T\n"</span><span class="token punctuation">,</span> t<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p>
<pre><code>Type Square *main.Square with value &amp;{5}
</code></pre>
<p>变量 <code v-pre>t</code> 得到了 <code v-pre>areaIntf</code> 的值和类型，所有 <code v-pre>case</code> 语句中列举的类型（<code v-pre>nil</code> 除外）都必须实现对应的接口（在上例中即 <code v-pre>Shaper</code>），如果被检测类型没有在 <code v-pre>case</code> 语句列举的类型中，就会执行 <code v-pre>default</code> 语句。</p>
<p>可以用 <code v-pre>type-switch</code> 进行运行时类型分析，但是在 <code v-pre>type-switch</code> 不允许有 <code v-pre>fallthrough</code> 。</p>
<p>如果仅仅是测试变量的类型，不用它的值，那么就可以不需要赋值语句，比如：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">switch</span> areaIntf<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token keyword">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"><span class="token keyword">case</span> <span class="token operator">*</span>Square<span class="token punctuation">:</span></span>
<span class="line">	<span class="token comment">// TODO</span></span>
<span class="line"><span class="token keyword">case</span> <span class="token operator">*</span>Circle<span class="token punctuation">:</span></span>
<span class="line">	<span class="token comment">// TODO</span></span>
<span class="line"><span class="token operator">...</span></span>
<span class="line"><span class="token keyword">default</span><span class="token punctuation">:</span></span>
<span class="line">	<span class="token comment">// TODO</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面的代码片段展示了一个类型分类函数，它有一个可变长度参数，可以是任意类型的数组，它会根据数组元素的实际类型执行不同的动作：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">classifier</span><span class="token punctuation">(</span>items <span class="token operator">...</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">for</span> i<span class="token punctuation">,</span> x <span class="token operator">:=</span> <span class="token keyword">range</span> items <span class="token punctuation">{</span></span>
<span class="line">		<span class="token keyword">switch</span> x<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token keyword">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token keyword">case</span> <span class="token builtin">bool</span><span class="token punctuation">:</span></span>
<span class="line">			fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Param #%d is a bool\n"</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span></span>
<span class="line">		<span class="token keyword">case</span> <span class="token builtin">float64</span><span class="token punctuation">:</span></span>
<span class="line">			fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Param #%d is a float64\n"</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span></span>
<span class="line">		<span class="token keyword">case</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token builtin">int64</span><span class="token punctuation">:</span></span>
<span class="line">			fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Param #%d is a int\n"</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span></span>
<span class="line">		<span class="token keyword">case</span> <span class="token boolean">nil</span><span class="token punctuation">:</span></span>
<span class="line">			fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Param #%d is a nil\n"</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span></span>
<span class="line">		<span class="token keyword">case</span> <span class="token builtin">string</span><span class="token punctuation">:</span></span>
<span class="line">			fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Param #%d is a string\n"</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span></span>
<span class="line">		<span class="token keyword">default</span><span class="token punctuation">:</span></span>
<span class="line">			fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Param #%d is unknown\n"</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span></span>
<span class="line">		<span class="token punctuation">}</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以这样调用此方法：<code v-pre>classifier(13, -14.3, &quot;BELGIUM&quot;, complex(1, 2), nil, false)</code> 。</p>
<p>在处理来自于外部的、类型未知的数据时，比如解析诸如 JSON 或 XML 编码的数据，类型测试和转换会非常有用。</p>
<p>在示例 12.17 (<a href="examples/chapter_12/xml.go">xml.go</a>) 中解析 XML 文档时，我们就会用到 <code v-pre>type-switch</code>。</p>
<p><strong>练习 11.4</strong> <a href="exercises/chapter_11/simple_interface2.go">simple_interface2.go</a>：</p>
<p>接着练习 11.1 中的内容，创建第二个类型 <code v-pre>RSimple</code>，它也实现了接口 <code v-pre>Simpler</code>，写一个函数 <code v-pre>fi()</code>，使它可以区分 <code v-pre>Simple</code> 和 <code v-pre>RSimple</code> 类型的变量。</p>
</div></template>


