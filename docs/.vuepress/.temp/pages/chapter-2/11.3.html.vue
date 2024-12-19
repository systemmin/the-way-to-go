<template><div><h1 id="_11-3-类型断言-如何检测和转换接口变量的类型" tabindex="-1"><a class="header-anchor" href="#_11-3-类型断言-如何检测和转换接口变量的类型"><span>11.3 类型断言：如何检测和转换接口变量的类型</span></a></h1>
<p>一个接口类型的变量 <code v-pre>varI</code> 中可以包含任何类型的值，必须有一种方式来检测它的 <strong>动态</strong> 类型，即运行时在变量中存储的值的实际类型。在执行过程中动态类型可能会有所不同，但是它总是可以分配给接口变量本身的类型。通常我们可以使用 <strong>类型断言</strong> 来测试在某个时刻 <code v-pre>varI</code> 是否包含类型 <code v-pre>T</code> 的值：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">v <span class="token operator">:=</span> varI<span class="token punctuation">.</span><span class="token punctuation">(</span>T<span class="token punctuation">)</span>       <span class="token comment">// unchecked type assertion</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><strong><code v-pre>varI</code> 必须是一个接口变量</strong>，否则编译器会报错：<code v-pre>invalid type assertion: varI.(T) (non-interface type (type of varI) on left)</code> 。</p>
<p>类型断言可能是无效的，虽然编译器会尽力检查转换是否有效，但是它不可能预见所有的可能性。如果转换在程序运行时失败会导致错误发生。更安全的方式是使用以下形式来进行类型断言：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">if</span> v<span class="token punctuation">,</span> ok <span class="token operator">:=</span> varI<span class="token punctuation">.</span><span class="token punctuation">(</span>T<span class="token punctuation">)</span><span class="token punctuation">;</span> ok <span class="token punctuation">{</span>  <span class="token comment">// checked type assertion</span></span>
<span class="line">    <span class="token function">Process</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">return</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token comment">// varI is not of type T</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果转换合法，<code v-pre>v</code> 是 <code v-pre>varI</code> 转换到类型 <code v-pre>T</code> 的值，<code v-pre>ok</code> 会是 <code v-pre>true</code>；否则 <code v-pre>v</code> 是类型 <code v-pre>T</code> 的零值，<code v-pre>ok</code> 是 <code v-pre>false</code>，也没有运行时错误发生。</p>
<p><strong>应该总是使用上面的方式来进行类型断言</strong>。</p>
<p>多数情况下，我们可能只是想在 <code v-pre>if</code> 中测试一下 <code v-pre>ok</code> 的值，此时使用以下的方法会是最方便的：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> ok <span class="token operator">:=</span> varI<span class="token punctuation">.</span><span class="token punctuation">(</span>T<span class="token punctuation">)</span><span class="token punctuation">;</span> ok <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// ...</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>示例 11.4 <a href="examples/chapter_11/type_interfaces.go">type_interfaces.go</a>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"fmt"</span></span>
<span class="line">	<span class="token string">"math"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">type</span> Square <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">	side <span class="token builtin">float32</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">type</span> Circle <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">	radius <span class="token builtin">float32</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">type</span> Shaper <span class="token keyword">interface</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token function">Area</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">float32</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">var</span> areaIntf Shaper</span>
<span class="line">	sq1 <span class="token operator">:=</span> <span class="token function">new</span><span class="token punctuation">(</span>Square<span class="token punctuation">)</span></span>
<span class="line">	sq1<span class="token punctuation">.</span>side <span class="token operator">=</span> <span class="token number">5</span></span>
<span class="line"></span>
<span class="line">	areaIntf <span class="token operator">=</span> sq1</span>
<span class="line">	<span class="token comment">// Is Square the type of areaIntf?</span></span>
<span class="line">	<span class="token keyword">if</span> t<span class="token punctuation">,</span> ok <span class="token operator">:=</span> areaIntf<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token operator">*</span>Square<span class="token punctuation">)</span><span class="token punctuation">;</span> ok <span class="token punctuation">{</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"The type of areaIntf is: %T\n"</span><span class="token punctuation">,</span> t<span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	<span class="token keyword">if</span> u<span class="token punctuation">,</span> ok <span class="token operator">:=</span> areaIntf<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token operator">*</span>Circle<span class="token punctuation">)</span><span class="token punctuation">;</span> ok <span class="token punctuation">{</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"The type of areaIntf is: %T\n"</span><span class="token punctuation">,</span> u<span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"areaIntf does not contain a variable of type Circle"</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>sq <span class="token operator">*</span>Square<span class="token punctuation">)</span> <span class="token function">Area</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">float32</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">return</span> sq<span class="token punctuation">.</span>side <span class="token operator">*</span> sq<span class="token punctuation">.</span>side</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>ci <span class="token operator">*</span>Circle<span class="token punctuation">)</span> <span class="token function">Area</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">float32</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">return</span> ci<span class="token punctuation">.</span>radius <span class="token operator">*</span> ci<span class="token punctuation">.</span>radius <span class="token operator">*</span> math<span class="token punctuation">.</span>Pi</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p>
<pre><code>The type of areaIntf is: *main.Square
areaIntf does not contain a variable of type Circle
</code></pre>
<p>程序中定义了一个新类型 <code v-pre>Circle</code>，它也实现了 <code v-pre>Shaper</code> 接口。 <code v-pre>if t, ok := areaIntf.(*Square); ok</code> 测试 <code v-pre>areaIntf</code> 里是否有一个包含 <code v-pre>*Square</code> 类型的变量，结果是确定的；然后我们测试它是否包含一个 <code v-pre>*Circle</code> 类型的变量，结果是否定的。</p>
<p><strong>备注</strong></p>
<p>如果忽略 <code v-pre>areaIntf.(*Square)</code> 中的 <code v-pre>*</code> 号，会导致编译错误：<code v-pre>impossible type assertion: Square does not implement Shaper (Area method has pointer receiver)</code>。</p>
</div></template>


