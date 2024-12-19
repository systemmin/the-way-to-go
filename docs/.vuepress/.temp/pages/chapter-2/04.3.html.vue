<template><div><h1 id="_4-3-常量" tabindex="-1"><a class="header-anchor" href="#_4-3-常量"><span>4.3 常量</span></a></h1>
<p>常量使用关键字 <code v-pre>const</code> 定义，用于存储不会改变的数据。</p>
<p>存储在常量中的数据类型只可以是布尔型、数字型（整数型、浮点型和复数）和字符串型。</p>
<p>常量的定义格式：<code v-pre>const identifier [type] = value</code>，例如：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">const</span> Pi <span class="token operator">=</span> <span class="token number">3.14159</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>在 Go 语言中，你可以省略类型说明符 <code v-pre>[type]</code>，因为编译器可以根据变量的值来推断其类型。</p>
<ul>
<li>显式类型定义： <code v-pre>const b string = &quot;abc&quot;</code></li>
<li>隐式类型定义： <code v-pre>const b = &quot;abc&quot;</code></li>
</ul>
<p>一个没有指定类型的常量被使用时，会根据其使用环境而推断出它所需要具备的类型。换句话说，未定义类型的常量会在必要时刻根据上下文来获得相关类型。</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">var</span> n <span class="token builtin">int</span></span>
<span class="line"><span class="token function">f</span><span class="token punctuation">(</span>n <span class="token operator">+</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token comment">// 无类型的数字型常量 “5” 它的类型在这里变成了 int</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>常量的值必须是能够在编译时就能够确定的；你可以在其赋值表达式中涉及计算过程，但是所有用于计算的值必须在编译期间就能获得。</p>
<ul>
<li>正确的做法：<code v-pre>const c1 = 2/3</code></li>
<li>错误的做法：<code v-pre>const c2 = getNumber()</code> // 引发构建错误: <code v-pre>getNumber() used as value</code></li>
</ul>
<p><strong>因为在编译期间自定义函数均属于未知，因此无法用于常量的赋值，但内置函数可以使用，如：<code v-pre>len()</code>。</strong></p>
<p>数字型的常量是没有大小和符号的，并且可以使用任何精度而不会导致溢出：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">const</span> Ln2 <span class="token operator">=</span> <span class="token number">0.693147180559945309417232121458</span>\</span>
<span class="line">			<span class="token number">176568075500134360255254120680009</span></span>
<span class="line"><span class="token keyword">const</span> Log2E <span class="token operator">=</span> <span class="token number">1</span><span class="token operator">/</span>Ln2 <span class="token comment">// this is a precise reciprocal</span></span>
<span class="line"><span class="token keyword">const</span> Billion <span class="token operator">=</span> <span class="token number">1e9</span> <span class="token comment">// float constant</span></span>
<span class="line"><span class="token keyword">const</span> hardEight <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">&lt;&lt;</span> <span class="token number">100</span><span class="token punctuation">)</span> <span class="token operator">>></span> <span class="token number">97</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>根据上面的例子我们可以看到，反斜杠 <code v-pre>\</code> 可以在常量表达式中作为多行的连接符使用。</p>
<p>与各种类型的数字型变量相比，你无需担心常量之间的类型转换问题，因为它们都是非常理想的数字。</p>
<p>不过需要注意的是，当常量赋值给一个精度过小的数字型变量时，可能会因为无法正确表达常量所代表的数值而导致溢出，这会在编译期间就引发错误。另外，常量也允许使用并行赋值的形式：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">const</span> beef<span class="token punctuation">,</span> two<span class="token punctuation">,</span> c <span class="token operator">=</span> <span class="token string">"eat"</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">"veg"</span></span>
<span class="line"><span class="token keyword">const</span> Monday<span class="token punctuation">,</span> Tuesday<span class="token punctuation">,</span> Wednesday<span class="token punctuation">,</span> Thursday<span class="token punctuation">,</span> Friday<span class="token punctuation">,</span> Saturday <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span></span>
<span class="line"><span class="token keyword">const</span> <span class="token punctuation">(</span></span>
<span class="line">	Monday<span class="token punctuation">,</span> Tuesday<span class="token punctuation">,</span> Wednesday <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span></span>
<span class="line">	Thursday<span class="token punctuation">,</span> Friday<span class="token punctuation">,</span> Saturday <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>常量还可以用作枚举：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">const</span> <span class="token punctuation">(</span></span>
<span class="line">	Unknown <span class="token operator">=</span> <span class="token number">0</span></span>
<span class="line">	Female <span class="token operator">=</span> <span class="token number">1</span></span>
<span class="line">	Male <span class="token operator">=</span> <span class="token number">2</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，数字 <code v-pre>0</code>、<code v-pre>1</code> 和 <code v-pre>2</code> 分别代表未知性别、女性和男性。这些枚举值可以用于测试某个变量或常量的实际值，比如使用 switch/case 结构（<RouteLink to="/chapter-2/05.3.html">第 5.3 节</RouteLink>）。</p>
<p>在这个例子中，<code v-pre>iota</code> 可以被用作枚举值：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">const</span> <span class="token punctuation">(</span></span>
<span class="line">	a <span class="token operator">=</span> <span class="token boolean">iota</span></span>
<span class="line">	b <span class="token operator">=</span> <span class="token boolean">iota</span></span>
<span class="line">	c <span class="token operator">=</span> <span class="token boolean">iota</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第一个 <code v-pre>iota</code> 等于 0，每当 <code v-pre>iota</code> 在新的一行被使用时，它的值都会自动加 1，并且没有赋值的常量默认会应用上一行的赋值表达式：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token comment">// 赋值一个常量时，之后没赋值的常量都会应用上一行的赋值表达式</span></span>
<span class="line"><span class="token keyword">const</span> <span class="token punctuation">(</span></span>
<span class="line">	a <span class="token operator">=</span> <span class="token boolean">iota</span>  <span class="token comment">// a = 0</span></span>
<span class="line">	b         <span class="token comment">// b = 1</span></span>
<span class="line">	c         <span class="token comment">// c = 2</span></span>
<span class="line">	d <span class="token operator">=</span> <span class="token number">5</span>     <span class="token comment">// d = 5   </span></span>
<span class="line">	e         <span class="token comment">// e = 5</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 赋值两个常量，iota 只会增长一次，而不会因为使用了两次就增长两次</span></span>
<span class="line"><span class="token keyword">const</span> <span class="token punctuation">(</span></span>
<span class="line">	Apple<span class="token punctuation">,</span> Banana <span class="token operator">=</span> <span class="token boolean">iota</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token boolean">iota</span> <span class="token operator">+</span> <span class="token number">2</span> <span class="token comment">// Apple=1 Banana=2</span></span>
<span class="line">	Cherimoya<span class="token punctuation">,</span> Durian                  <span class="token comment">// Cherimoya=2 Durian=3</span></span>
<span class="line">	Elderberry<span class="token punctuation">,</span> Fig                    <span class="token comment">// Elderberry=3, Fig=4</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 使用 iota 结合 位运算 表示资源状态的使用案例</span></span>
<span class="line"><span class="token keyword">const</span> <span class="token punctuation">(</span></span>
<span class="line">	Open <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">&lt;&lt;</span> <span class="token boolean">iota</span>  <span class="token comment">// 0001</span></span>
<span class="line">	Close             <span class="token comment">// 0010</span></span>
<span class="line">	Pending           <span class="token comment">// 0100</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token boolean">_</span>           <span class="token operator">=</span> <span class="token boolean">iota</span>             <span class="token comment">// 使用 _ 忽略不需要的 iota</span></span>
<span class="line">	KB <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">&lt;&lt;</span> <span class="token punctuation">(</span><span class="token number">10</span> <span class="token operator">*</span> <span class="token boolean">iota</span><span class="token punctuation">)</span>          <span class="token comment">// 1 &lt;&lt; (10*1)</span></span>
<span class="line">	MB                             <span class="token comment">// 1 &lt;&lt; (10*2)</span></span>
<span class="line">	GB                             <span class="token comment">// 1 &lt;&lt; (10*3)</span></span>
<span class="line">	TB                             <span class="token comment">// 1 &lt;&lt; (10*4)</span></span>
<span class="line">	PB                             <span class="token comment">// 1 &lt;&lt; (10*5)</span></span>
<span class="line">	EB                             <span class="token comment">// 1 &lt;&lt; (10*6)</span></span>
<span class="line">	ZB                             <span class="token comment">// 1 &lt;&lt; (10*7)</span></span>
<span class="line">	YB                             <span class="token comment">// 1 &lt;&lt; (10*8)</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（ <strong>译者注：关于 <code v-pre>iota</code> 的使用涉及到非常复杂多样的情况，这里作者解释的并不清晰，因为很难对 <code v-pre>iota</code> 的用法进行直观的文字描述。如希望进一步了解，请观看视频教程 <a href="https://github.com/Unknwon/go-fundamental-programming" target="_blank" rel="noopener noreferrer">《Go编程基础》</a> <a href="https://github.com/Unknwon/go-fundamental-programming/blob/master/lectures/lecture4.md" target="_blank" rel="noopener noreferrer">第四课：常量与运算符</a></strong> ）</p>
<p><code v-pre>iota</code> 也可以用在表达式中，如：<code v-pre>iota + 50</code>。在每遇到一个新的常量块或单个常量声明时， <code v-pre>iota</code> 都会重置为 0（ <strong>简单地讲，每遇到一次 const 关键字，<code v-pre>iota</code> 就重置为 0</strong> ）。</p>
<p>当然，常量之所以为常量就是恒定不变的量，因此我们无法在程序运行过程中修改它的值；如果你在代码中试图修改常量的值则会引发编译错误。</p>
</div></template>


