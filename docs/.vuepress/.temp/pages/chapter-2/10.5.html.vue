<template><div><h1 id="_10-5-匿名字段和内嵌结构体" tabindex="-1"><a class="header-anchor" href="#_10-5-匿名字段和内嵌结构体"><span>10.5 匿名字段和内嵌结构体</span></a></h1>
<h2 id="_10-5-1-定义" tabindex="-1"><a class="header-anchor" href="#_10-5-1-定义"><span>10.5.1 定义</span></a></h2>
<p>结构体可以包含一个或多个 <strong>匿名（或内嵌）字段</strong>，即这些字段没有显式的名字，只有字段的类型是必须的，此时类型就是字段的名字。匿名字段本身可以是一个结构体类型，即 <strong>结构体可以包含内嵌结构体</strong>。</p>
<p>可以粗略地将这个和面向对象语言中的继承概念相比较，随后将会看到它被用来模拟类似继承的行为。Go 语言中的继承是通过内嵌或组合来实现的，所以可以说，在 Go 语言中，相比较于继承，组合更受青睐。</p>
<p>考虑如下的程序：</p>
<p>示例 10.8 <a href="examples/chapter_10/structs_anonymous_fields.go">structs_anonymous_fields.go</a>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token string">"fmt"</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">type</span> innerS <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">	in1 <span class="token builtin">int</span></span>
<span class="line">	in2 <span class="token builtin">int</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">type</span> outerS <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">	b    <span class="token builtin">int</span></span>
<span class="line">	c    <span class="token builtin">float32</span></span>
<span class="line">	<span class="token builtin">int</span>  <span class="token comment">// anonymous field</span></span>
<span class="line">	innerS <span class="token comment">//anonymous field</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	outer <span class="token operator">:=</span> <span class="token function">new</span><span class="token punctuation">(</span>outerS<span class="token punctuation">)</span></span>
<span class="line">	outer<span class="token punctuation">.</span>b <span class="token operator">=</span> <span class="token number">6</span></span>
<span class="line">	outer<span class="token punctuation">.</span>c <span class="token operator">=</span> <span class="token number">7.5</span></span>
<span class="line">	outer<span class="token punctuation">.</span><span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">60</span></span>
<span class="line">	outer<span class="token punctuation">.</span>in1 <span class="token operator">=</span> <span class="token number">5</span></span>
<span class="line">	outer<span class="token punctuation">.</span>in2 <span class="token operator">=</span> <span class="token number">10</span></span>
<span class="line"></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"outer.b is: %d\n"</span><span class="token punctuation">,</span> outer<span class="token punctuation">.</span>b<span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"outer.c is: %f\n"</span><span class="token punctuation">,</span> outer<span class="token punctuation">.</span>c<span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"outer.int is: %d\n"</span><span class="token punctuation">,</span> outer<span class="token punctuation">.</span><span class="token builtin">int</span><span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"outer.in1 is: %d\n"</span><span class="token punctuation">,</span> outer<span class="token punctuation">.</span>in1<span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"outer.in2 is: %d\n"</span><span class="token punctuation">,</span> outer<span class="token punctuation">.</span>in2<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">	<span class="token comment">// 使用结构体字面量</span></span>
<span class="line">	outer2 <span class="token operator">:=</span> outerS<span class="token punctuation">{</span><span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">7.5</span><span class="token punctuation">,</span> <span class="token number">60</span><span class="token punctuation">,</span> innerS<span class="token punctuation">{</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">}</span><span class="token punctuation">}</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"outer2 is:"</span><span class="token punctuation">,</span> outer2<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p>
<pre><code>outer.b is: 6
outer.c is: 7.500000
outer.int is: 60
outer.in1 is: 5
outer.in2 is: 10
outer2 is:{6 7.5 60 {5 10}}
</code></pre>
<p>通过类型 <code v-pre>outer.int</code> 的名字来获取存储在匿名字段中的数据，于是可以得出一个结论：在一个结构体中对于每一种数据类型只能有一个匿名字段。</p>
<h2 id="_10-5-2-内嵌结构体" tabindex="-1"><a class="header-anchor" href="#_10-5-2-内嵌结构体"><span>10.5.2 内嵌结构体</span></a></h2>
<p>同样地结构体也是一种数据类型，所以它也可以作为一个匿名字段来使用，如同上面例子中那样。外层结构体通过 <code v-pre>outer.in1</code> 直接进入内层结构体的字段，内嵌结构体甚至可以来自其他包。内层结构体被简单的插入或者内嵌进外层结构体。这个简单的“继承”机制提供了一种方式，使得可以从另外一个或一些类型继承部分或全部实现。</p>
<p>另外一个例子：</p>
<p>示例 10.9 <a href="examples/chapter_10/embedd_struct.go">embedd_struct.go</a>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token string">"fmt"</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">type</span> A <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">	ax<span class="token punctuation">,</span> ay <span class="token builtin">int</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">type</span> B <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">	A</span>
<span class="line">	bx<span class="token punctuation">,</span> by <span class="token builtin">float32</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	b <span class="token operator">:=</span> B<span class="token punctuation">{</span>A<span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">3.0</span><span class="token punctuation">,</span> <span class="token number">4.0</span><span class="token punctuation">}</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>b<span class="token punctuation">.</span>ax<span class="token punctuation">,</span> b<span class="token punctuation">.</span>ay<span class="token punctuation">,</span> b<span class="token punctuation">.</span>bx<span class="token punctuation">,</span> b<span class="token punctuation">.</span>by<span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>b<span class="token punctuation">.</span>A<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p>
<pre><code>1 2 3 4
{1 2}
</code></pre>
<p><strong>练习 10.5</strong> <a href="exercises/chapter_10/anonymous_struct.go">anonymous_struct.go</a>：</p>
<p>创建一个结构体，它有一个具名的 <code v-pre>float32</code> 字段，2 个匿名字段，类型分别是 <code v-pre>int</code> 和 <code v-pre>string</code>。通过结构体字面量新建一个结构体实例并打印它的内容。</p>
<h2 id="_10-5-3-命名冲突" tabindex="-1"><a class="header-anchor" href="#_10-5-3-命名冲突"><span>10.5.3 命名冲突</span></a></h2>
<p>当两个字段拥有相同的名字（可能是继承来的名字）时该怎么办呢？</p>
<ol>
<li>外层名字会覆盖内层名字（但是两者的内存空间都保留），这提供了一种重载字段或方法的方式；</li>
<li>如果相同的名字在同一级别出现了两次，如果这个名字被程序使用了，将会引发一个错误（不使用没关系）。没有办法来解决这种问题引起的二义性，必须由程序员自己修正。</li>
</ol>
<p>例子：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">type</span> A <span class="token keyword">struct</span> <span class="token punctuation">{</span>a <span class="token builtin">int</span><span class="token punctuation">}</span></span>
<span class="line"><span class="token keyword">type</span> B <span class="token keyword">struct</span> <span class="token punctuation">{</span>a<span class="token punctuation">,</span> b <span class="token builtin">int</span><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">type</span> C <span class="token keyword">struct</span> <span class="token punctuation">{</span>A<span class="token punctuation">;</span> B<span class="token punctuation">}</span></span>
<span class="line"><span class="token keyword">var</span> c C</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>规则 2：使用 <code v-pre>c.a</code> 是错误的，到底是 <code v-pre>c.A.a</code> 还是 <code v-pre>c.B.a</code> 呢？会导致编译器错误：<strong><code v-pre>ambiguous DOT reference c.a disambiguate with either c.A.a or c.B.a</code></strong>。</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">type</span> D <span class="token keyword">struct</span> <span class="token punctuation">{</span>B<span class="token punctuation">;</span> b <span class="token builtin">float32</span><span class="token punctuation">}</span></span>
<span class="line"><span class="token keyword">var</span> d D</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>规则1：使用 <code v-pre>d.b</code> 是没问题的：它是 <code v-pre>float32</code>，而不是 <code v-pre>B</code> 的 <code v-pre>b</code>。如果想要内层的 <code v-pre>b</code> 可以通过 <code v-pre>d.B.b</code> 得到。</p>
</div></template>


