<template><div><h1 id="_11-1-接口是什么" tabindex="-1"><a class="header-anchor" href="#_11-1-接口是什么"><span>11.1 接口是什么</span></a></h1>
<p>Go 语言不是一种 <em>“传统”</em> 的面向对象编程语言：它里面没有类和继承的概念。</p>
<p>但是 Go 语言里有非常灵活的 <strong>接口</strong> 概念，通过它可以实现很多面向对象的特性。接口提供了一种方式来 <strong>说明</strong> 对象的行为：如果谁能搞定这件事，它就可以用在这儿。</p>
<p>接口定义了一组方法（方法集），但是这些方法不包含（实现）代码：它们没有被实现（它们是抽象的）。接口里也不能包含变量。</p>
<p>通过如下格式定义接口：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">type</span> Namer <span class="token keyword">interface</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">Method1</span><span class="token punctuation">(</span>param_list<span class="token punctuation">)</span> return_type</span>
<span class="line">    <span class="token function">Method2</span><span class="token punctuation">(</span>param_list<span class="token punctuation">)</span> return_type</span>
<span class="line">    <span class="token operator">...</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的 <code v-pre>Namer</code> 是一个 <strong>接口类型</strong>。</p>
<p>（按照约定，只包含一个方法的）接口的名字由方法名加 <code v-pre>er</code> 后缀组成，例如 <code v-pre>Printer</code>、<code v-pre>Reader</code>、<code v-pre>Writer</code>、<code v-pre>Logger</code>、<code v-pre>Converter</code> 等等。还有一些不常用的方式（当后缀 <code v-pre>er</code> 不合适时），比如 <code v-pre>Recoverable</code>，此时接口名以 <code v-pre>able</code> 结尾，或者以 <code v-pre>I</code> 开头（像 <code v-pre>.NET</code> 或 <code v-pre>Java</code> 中那样）。</p>
<p>Go 语言中的接口都很简短，通常它们会包含 0 个、最多 3 个方法。</p>
<p>不像大多数面向对象编程语言，在 Go 语言中接口可以有值，一个接口类型的变量或一个 <strong>接口值</strong> ：<code v-pre>var ai Namer</code>，<code v-pre>ai</code> 是一个多字（multiword）数据结构，它的值是 <code v-pre>nil</code>。它本质上是一个指针，虽然不完全是一回事。指向接口值的指针是非法的，它们不仅一点用也没有，还会导致代码错误。</p>
<p><img src="@source/chapter-2/images/11.1_fig11.1.jpg?raw=true" alt=""></p>
<p>此处的方法指针表是通过运行时反射能力构建的。</p>
<p>类型（比如结构体）可以实现某个接口的方法集；这个实现可以描述为，该类型的变量上的每一个具体方法所组成的集合，包含了该接口的方法集。实现了 <code v-pre>Namer</code> 接口的类型的变量可以赋值给 <code v-pre>ai</code>（即 <code v-pre>receiver</code> 的值），方法表指针（method table ptr）就指向了当前的方法实现。当另一个实现了 <code v-pre>Namer</code> 接口的类型的变量被赋给 <code v-pre>ai</code>，<code v-pre>receiver</code> 的值和方法表指针也会相应改变。</p>
<p><strong>类型不需要显式声明它实现了某个接口：接口被隐式地实现。多个类型可以实现同一个接口</strong>。</p>
<p><strong>实现某个接口的类型（除了实现接口方法外）可以有其他的方法</strong>。</p>
<p><strong>一个类型可以实现多个接口</strong>。</p>
<p><strong>接口类型可以包含一个实例的引用， 该实例的类型实现了此接口（接口是动态类型）</strong>。</p>
<p>即使接口在类型之后才定义，二者处于不同的包中，被单独编译：只要类型实现了接口中的方法，它就实现了此接口。</p>
<p>所有这些特性使得接口具有很大的灵活性。</p>
<p>第一个例子：</p>
<p>示例 11.1 <a href="examples/chapter_11/interfaces.go">interfaces.go</a>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token string">"fmt"</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">type</span> Shaper <span class="token keyword">interface</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token function">Area</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">float32</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">type</span> Square <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">	side <span class="token builtin">float32</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>sq <span class="token operator">*</span>Square<span class="token punctuation">)</span> <span class="token function">Area</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">float32</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">return</span> sq<span class="token punctuation">.</span>side <span class="token operator">*</span> sq<span class="token punctuation">.</span>side</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	sq1 <span class="token operator">:=</span> <span class="token function">new</span><span class="token punctuation">(</span>Square<span class="token punctuation">)</span></span>
<span class="line">	sq1<span class="token punctuation">.</span>side <span class="token operator">=</span> <span class="token number">5</span></span>
<span class="line"></span>
<span class="line">	<span class="token keyword">var</span> areaIntf Shaper</span>
<span class="line">	areaIntf <span class="token operator">=</span> sq1</span>
<span class="line">	<span class="token comment">// shorter,without separate declaration:</span></span>
<span class="line">	<span class="token comment">// areaIntf := Shaper(sq1)</span></span>
<span class="line">	<span class="token comment">// or even:</span></span>
<span class="line">	<span class="token comment">// areaIntf := sq1</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"The square has area: %f\n"</span><span class="token punctuation">,</span> areaIntf<span class="token punctuation">.</span><span class="token function">Area</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p>
<pre><code>The square has area: 25.000000
</code></pre>
<p>上面的程序定义了一个结构体 <code v-pre>Square</code> 和一个接口 <code v-pre>Shaper</code>，接口有一个方法 <code v-pre>Area()</code>。</p>
<p>在 <code v-pre>main()</code> 方法中创建了一个 <code v-pre>Square</code> 的实例。在主程序外边定义了一个接收者类型是 <code v-pre>Square</code> 方法的 <code v-pre>Area()</code>，用来计算正方形的面积：结构体 <code v-pre>Square</code> 实现了接口 <code v-pre>Shaper</code> 。</p>
<p>所以可以将一个 <code v-pre>Square</code> 类型的变量赋值给一个接口类型的变量：<code v-pre>areaIntf = sq1</code> 。</p>
<p>现在接口变量包含一个指向 <code v-pre>Square</code> 变量的引用，通过它可以调用 <code v-pre>Square</code> 上的方法 <code v-pre>Area()</code>。当然也可以直接在 <code v-pre>Square</code> 的实例上调用此方法，但是在接口实例上调用此方法更令人兴奋，它使此方法更具有一般性。接口变量里包含了接收者实例的值和指向对应方法表的指针。</p>
<p>这是 <strong>多态</strong> 的 Go 版本，多态是面向对象编程中一个广为人知的概念：根据当前的类型选择正确的方法，或者说：同一种类型在不同的实例上似乎表现出不同的行为。</p>
<p>如果 <code v-pre>Square</code> 没有实现 <code v-pre>Area()</code> 方法，编译器将会给出清晰的错误信息：</p>
<pre><code>cannot use sq1 (type *Square) as type Shaper in assignment:
*Square does not implement Shaper (missing Area method)
</code></pre>
<p>如果 <code v-pre>Shaper</code> 有另外一个方法 <code v-pre>Perimeter()</code>，但是 <code v-pre>Square</code> 没有实现它，即使没有人在 <code v-pre>Square</code> 实例上调用这个方法，编译器也会给出上面同样的错误。</p>
<p>扩展一下上面的例子，类型 <code v-pre>Rectangle</code> 也实现了 <code v-pre>Shaper</code> 接口。接着创建一个 <code v-pre>Shaper</code> 类型的数组，迭代它的每一个元素并在上面调用 <code v-pre>Area()</code> 方法，以此来展示多态行为：</p>
<p>示例 11.2 <a href="examples/chapter_11/interfaces_poly.go">interfaces_poly.go</a>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token string">"fmt"</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">type</span> Shaper <span class="token keyword">interface</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token function">Area</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">float32</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">type</span> Square <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">	side <span class="token builtin">float32</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>sq <span class="token operator">*</span>Square<span class="token punctuation">)</span> <span class="token function">Area</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">float32</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">return</span> sq<span class="token punctuation">.</span>side <span class="token operator">*</span> sq<span class="token punctuation">.</span>side</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">type</span> Rectangle <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">	length<span class="token punctuation">,</span> width <span class="token builtin">float32</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>r Rectangle<span class="token punctuation">)</span> <span class="token function">Area</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">float32</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">return</span> r<span class="token punctuation">.</span>length <span class="token operator">*</span> r<span class="token punctuation">.</span>width</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">	r <span class="token operator">:=</span> Rectangle<span class="token punctuation">{</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">}</span> <span class="token comment">// Area() of Rectangle needs a value</span></span>
<span class="line">	q <span class="token operator">:=</span> <span class="token operator">&amp;</span>Square<span class="token punctuation">{</span><span class="token number">5</span><span class="token punctuation">}</span>      <span class="token comment">// Area() of Square needs a pointer</span></span>
<span class="line">	<span class="token comment">// shapes := []Shaper{Shaper(r), Shaper(q)}</span></span>
<span class="line">	<span class="token comment">// or shorter</span></span>
<span class="line">	shapes <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>Shaper<span class="token punctuation">{</span>r<span class="token punctuation">,</span> q<span class="token punctuation">}</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Looping through shapes for area ..."</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">for</span> n<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> <span class="token keyword">range</span> shapes <span class="token punctuation">{</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Shape details: "</span><span class="token punctuation">,</span> shapes<span class="token punctuation">[</span>n<span class="token punctuation">]</span><span class="token punctuation">)</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Area of this shape is: "</span><span class="token punctuation">,</span> shapes<span class="token punctuation">[</span>n<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">Area</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p>
<pre><code>Looping through shapes for area ...
Shape details:  {5 3}
Area of this shape is:  15
Shape details:  &amp;{5}
Area of this shape is:  25
</code></pre>
<p>在调用 <code v-pre>shapes[n].Area()</code> 这个时，只知道 <code v-pre>shapes[n]</code> 是一个 <code v-pre>Shaper</code> 对象，最后它摇身一变成为了一个 <code v-pre>Square</code> 或 <code v-pre>Rectangle</code> 对象，并且表现出了相对应的行为。</p>
<p>也许从现在开始你将看到通过接口如何产生 <strong>更干净</strong>、<strong>更简单</strong> 及 <strong>更具有扩展性</strong> 的代码。在 11.12.3 中将看到在开发中为类型添加新的接口是多么的容易。</p>
<p>下面是一个更具体的例子：有两个类型 <code v-pre>stockPosition</code> 和 <code v-pre>car</code>，它们都有一个 <code v-pre>getValue()</code> 方法，我们可以定义一个具有此方法的接口 <code v-pre>valuable</code>。接着定义一个使用 <code v-pre>valuable</code> 类型作为参数的函数 <code v-pre>showValue()</code>，所有实现了 <code v-pre>valuable</code> 接口的类型都可以用这个函数。</p>
<p>示例 11.3 <a href="examples/chapter_11/valuable.go">valuable.go</a>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token string">"fmt"</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">type</span> stockPosition <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">	ticker     <span class="token builtin">string</span></span>
<span class="line">	sharePrice <span class="token builtin">float32</span></span>
<span class="line">	count      <span class="token builtin">float32</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">/* method to determine the value of a stock position */</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>s stockPosition<span class="token punctuation">)</span> <span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">float32</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">return</span> s<span class="token punctuation">.</span>sharePrice <span class="token operator">*</span> s<span class="token punctuation">.</span>count</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">type</span> car <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token builtin">make</span>  <span class="token builtin">string</span></span>
<span class="line">	model <span class="token builtin">string</span></span>
<span class="line">	price <span class="token builtin">float32</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">/* method to determine the value of a car */</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>c car<span class="token punctuation">)</span> <span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">float32</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">return</span> c<span class="token punctuation">.</span>price</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">/* contract that defines different things that have value */</span></span>
<span class="line"><span class="token keyword">type</span> valuable <span class="token keyword">interface</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">float32</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">showValue</span><span class="token punctuation">(</span>asset valuable<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Value of the asset is %f\n"</span><span class="token punctuation">,</span> asset<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">var</span> o valuable <span class="token operator">=</span> stockPosition<span class="token punctuation">{</span><span class="token string">"GOOG"</span><span class="token punctuation">,</span> <span class="token number">577.20</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">}</span></span>
<span class="line">	<span class="token function">showValue</span><span class="token punctuation">(</span>o<span class="token punctuation">)</span></span>
<span class="line">	o <span class="token operator">=</span> car<span class="token punctuation">{</span><span class="token string">"BMW"</span><span class="token punctuation">,</span> <span class="token string">"M3"</span><span class="token punctuation">,</span> <span class="token number">66500</span><span class="token punctuation">}</span></span>
<span class="line">	<span class="token function">showValue</span><span class="token punctuation">(</span>o<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p>
<pre><code>Value of the asset is 2308.800049
Value of the asset is 66500.000000
</code></pre>
<p><strong>一个标准库的例子</strong></p>
<p><code v-pre>io</code> 包里有一个接口类型 <code v-pre>Reader</code>:</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">type</span> Reader <span class="token keyword">interface</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">Read</span><span class="token punctuation">(</span>p <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>n <span class="token builtin">int</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>定义变量 <code v-pre>r</code>：<code v-pre> var r io.Reader</code></p>
<p>那么就可以写如下的代码：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">	<span class="token keyword">var</span> r io<span class="token punctuation">.</span>Reader</span>
<span class="line">	r <span class="token operator">=</span> os<span class="token punctuation">.</span>Stdin    <span class="token comment">// see 12.1</span></span>
<span class="line">	r <span class="token operator">=</span> bufio<span class="token punctuation">.</span><span class="token function">NewReader</span><span class="token punctuation">(</span>r<span class="token punctuation">)</span></span>
<span class="line">	r <span class="token operator">=</span> <span class="token function">new</span><span class="token punctuation">(</span>bytes<span class="token punctuation">.</span>Buffer<span class="token punctuation">)</span></span>
<span class="line">	f<span class="token punctuation">,</span><span class="token boolean">_</span> <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span><span class="token string">"test.txt"</span><span class="token punctuation">)</span></span>
<span class="line">	r <span class="token operator">=</span> bufio<span class="token punctuation">.</span><span class="token function">NewReader</span><span class="token punctuation">(</span>f<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面 <code v-pre>r</code> 右边的类型都实现了 <code v-pre>Read()</code> 方法，并且有相同的方法签名，<code v-pre>r</code> 的静态类型是 <code v-pre>io.Reader</code>。</p>
<p><strong>备注</strong></p>
<p>有的时候，也会以一种稍微不同的方式来使用接口这个词：从某个类型的角度来看，它的接口指的是：它的所有导出方法，只不过没有显式地为这些导出方法额外定一个接口而已。</p>
<p><strong>练习 11.1</strong> <a href="exercises/chapter_11/simple_interface.go">simple_interface.go</a>：</p>
<p>定义一个接口 <code v-pre>Simpler</code>，它有一个 <code v-pre>Get()</code> 方法和一个 <code v-pre>Set()</code>，<code v-pre>Get()</code> 返回一个整型值，<code v-pre>Set()</code> 有一个整型参数。创建一个结构体类型 <code v-pre>Simple</code> 实现这个接口。</p>
<p>接着定一个函数，它有一个 <code v-pre>Simpler</code> 类型的参数，调用参数的 <code v-pre>Get()</code> 和 <code v-pre>Set()</code> 方法。在 <code v-pre>main</code> 函数里调用这个函数，看看它是否可以正确运行。</p>
<p><strong>练习 11.2</strong> <a href="exercises/chapter_11/interfaces_poly2.go">interfaces_poly2.go</a>：</p>
<p>a) 扩展 <a href="exercises/chapter_11/interfaces_poly.go">interfaces_poly.go</a> 中的例子，添加一个 <code v-pre>Circle</code> 类型</p>
<p>b) 使用一个抽象类型 <code v-pre>Shape</code>（没有字段） 实现同样的功能，它实现接口 <code v-pre>Shaper</code>，然后在其他类型里内嵌此类型。扩展 <RouteLink to="/chapter-2/10.6.html">10.6.5</RouteLink> 中的例子来说明覆写。</p>
</div></template>


