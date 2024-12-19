<template><div><h1 id="_6-8-闭包" tabindex="-1"><a class="header-anchor" href="#_6-8-闭包"><span>6.8 闭包</span></a></h1>
<p>当我们不希望给函数起名字的时候，可以使用匿名函数，例如：<code v-pre>func(x, y int) int { return x + y }</code>。</p>
<p>这样的一个函数不能够独立存在（编译器会返回错误：<code v-pre>non-declaration statement outside function body</code>），但可以被赋值于某个变量，即保存函数的地址到变量中：<code v-pre>fplus := func(x, y int) int { return x + y }</code>，然后通过变量名对函数进行调用：<code v-pre>fplus(3,4)</code>。</p>
<p>当然，您也可以直接对匿名函数进行调用：<code v-pre>func(x, y int) int { return x + y } (3, 4)</code>。</p>
<p>下面是一个计算从 1 到 100 万整数的总和的匿名函数：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	sum <span class="token operator">:=</span> <span class="token number">0</span></span>
<span class="line">	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">1e6</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span></span>
<span class="line">		sum <span class="token operator">+=</span> i</span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>表示参数列表的第一对括号必须紧挨着关键字 <code v-pre>func</code>，因为匿名函数没有名称。花括号 <code v-pre>{}</code> 涵盖着函数体，最后的一对括号表示对该匿名函数的调用。</p>
<p>下面的例子展示了如何将匿名函数赋值给变量并对其进行调用（<a href="examples/chapter_6/function_literal.go">function_literal.go</a>）：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token string">"fmt"</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">4</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span></span>
<span class="line">		g <span class="token operator">:=</span> <span class="token keyword">func</span><span class="token punctuation">(</span>i <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%d "</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span> <span class="token punctuation">}</span></span>
<span class="line">		<span class="token function">g</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">" - g is of type %T and has value %v\n"</span><span class="token punctuation">,</span> g<span class="token punctuation">,</span> g<span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">0 - g is of type func(int) and has value 0x681a80</span>
<span class="line">1 - g is of type func(int) and has value 0x681b00</span>
<span class="line">2 - g is of type func(int) and has value 0x681ac0</span>
<span class="line">3 - g is of type func(int) and has value 0x681400</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看到变量 <code v-pre>g</code> 代表的是 <code v-pre>func(int)</code>，变量的值是一个内存地址。</p>
<p>所以我们实际上拥有的是一个函数值：匿名函数可以被赋值给变量并作为值使用。</p>
<p><strong>练习 6.8</strong> 在 <code v-pre>main()</code> 函数中写一个用于打印 <code v-pre>Hello World</code> 字符串的匿名函数并赋值给变量 <code v-pre>fv</code>，然后调用该函数并打印变量 <code v-pre>fv</code> 的类型。</p>
<p>匿名函数像所有函数一样可以接受或不接受参数。下面的例子展示了如何传递参数到匿名函数中：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>u <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>u<span class="token punctuation">)</span></span>
<span class="line">	…</span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请学习以下示例并思考（<a href="examples/chapter_6/return_defer.go">return_defer.go</a>）：函数 <code v-pre>f</code> 返回时，变量 <code v-pre>ret</code> 的值是什么？</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token string">"fmt"</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>ret <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">		ret<span class="token operator">++</span></span>
<span class="line">	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">return</span> <span class="token number">1</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>变量 <code v-pre>ret</code> 的值为 <code v-pre>2</code>，因为 <code v-pre>ret++</code> 是在执行 <code v-pre>return 1</code> 语句后发生的。</p>
<p>这可用于在返回语句之后修改返回的 <code v-pre>error</code> 时使用。</p>
<p><strong>defer 语句和匿名函数</strong></p>
<p>关键字 <code v-pre>defer</code> （详见<RouteLink to="/chapter-2/06.4.html">第 6.4 节</RouteLink>）经常配合匿名函数使用，它可以用于改变函数的命名返回值。</p>
<p>匿名函数还可以配合 <code v-pre>go</code> 关键字来作为 goroutine 使用（详见<RouteLink to="/chapter-2/14.0.html">第 14 章</RouteLink>和<RouteLink to="/chapter-2/16.9.html">第 16.9 节</RouteLink>）。</p>
<p>匿名函数同样被称之为闭包（函数式语言的术语）：它们被允许调用定义在其它环境下的变量。闭包可使得某个函数捕捉到一些外部状态，例如：函数被创建时的状态。另一种表示方式为：一个闭包继承了函数所声明时的作用域。这种状态（作用域内的变量）都被共享到闭包的环境中，因此这些变量可以在闭包中被操作，直到被销毁，详见<RouteLink to="/chapter-2/06.9.html">第 6.9 节</RouteLink> 中的示例。闭包经常被用作包装函数：它们会预先定义好 1 个或多个参数以用于包装，详见下一节中的示例。另一个不错的应用就是使用闭包来完成更加简洁的错误检查（详见<RouteLink to="/chapter-2/16.10.html">第 16.10.2 节</RouteLink>）。</p>
</div></template>


