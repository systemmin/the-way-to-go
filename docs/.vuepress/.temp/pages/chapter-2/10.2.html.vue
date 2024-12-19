<template><div><h1 id="_10-2-使用工厂方法创建结构体实例" tabindex="-1"><a class="header-anchor" href="#_10-2-使用工厂方法创建结构体实例"><span>10.2 使用工厂方法创建结构体实例</span></a></h1>
<h2 id="_10-2-1-结构体工厂" tabindex="-1"><a class="header-anchor" href="#_10-2-1-结构体工厂"><span>10.2.1 结构体工厂</span></a></h2>
<p>Go 语言不支持面向对象编程语言中那样的构造子方法，但是可以很容易的在 Go 中实现 “构造子工厂”方法。为了方便通常会为类型定义一个工厂，按惯例，工厂的名字以 <code v-pre>new...</code> 或 <code v-pre>New...</code> 开头。假设定义了如下的 <code v-pre>File</code> 结构体类型：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">type</span> File <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">    fd      <span class="token builtin">int</span>     <span class="token comment">// 文件描述符</span></span>
<span class="line">    name    <span class="token builtin">string</span>  <span class="token comment">// 文件名</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面是这个结构体类型对应的工厂方法，它返回一个指向结构体实例的指针：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">NewFile</span><span class="token punctuation">(</span>fd <span class="token builtin">int</span><span class="token punctuation">,</span> name <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">*</span>File <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">if</span> fd <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token boolean">nil</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">return</span> <span class="token operator">&amp;</span>File<span class="token punctuation">{</span>fd<span class="token punctuation">,</span> name<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后这样调用它：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">f <span class="token operator">:=</span> <span class="token function">NewFile</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token string">"./test.txt"</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>在 Go 语言中常常像上面这样在工厂方法里使用初始化来简便的实现构造函数。</p>
<p>如果 <code v-pre>File</code> 是一个结构体类型，那么表达式 <code v-pre>new(File)</code> 和 <code v-pre>&amp;File{}</code> 是等价的。</p>
<p>这可以和大多数面向对象编程语言中笨拙的初始化方式做个比较：<code v-pre>File f = new File(...)</code>。</p>
<p>我们可以说是工厂实例化了类型的一个对象，就像在基于类的 OO 语言中那样。</p>
<p>如果想知道结构体类型 <code v-pre>T</code> 的一个实例占用了多少内存，可以使用：<code v-pre>size := unsafe.Sizeof(T{})</code>。</p>
<p><strong>如何强制使用工厂方法</strong></p>
<p>通过应用可见性规则参考 <RouteLink to="/chapter-2/04.2.html">4.2.1节</RouteLink>、<RouteLink to="/chapter-2/09.5.html">9.5 节</RouteLink> 就可以禁止使用 <code v-pre>new()</code> 函数，强制用户使用工厂方法，从而使类型变成私有的，就像在面向对象语言中那样。</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">type</span> matrix <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token operator">...</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">NewMatrix</span><span class="token punctuation">(</span>params<span class="token punctuation">)</span> <span class="token operator">*</span>matrix <span class="token punctuation">{</span></span>
<span class="line">    m <span class="token operator">:=</span> <span class="token function">new</span><span class="token punctuation">(</span>matrix<span class="token punctuation">)</span> <span class="token comment">// 初始化 m</span></span>
<span class="line">    <span class="token keyword">return</span> m</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在其他包里使用工厂方法：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"><span class="token keyword">import</span> <span class="token string">"matrix"</span></span>
<span class="line"><span class="token operator">...</span></span>
<span class="line">wrong <span class="token operator">:=</span> <span class="token function">new</span><span class="token punctuation">(</span>matrix<span class="token punctuation">.</span>matrix<span class="token punctuation">)</span>     <span class="token comment">// 编译失败（matrix 是私有的）</span></span>
<span class="line">right <span class="token operator">:=</span> matrix<span class="token punctuation">.</span><span class="token function">NewMatrix</span><span class="token punctuation">(</span><span class="token operator">...</span><span class="token punctuation">)</span>  <span class="token comment">// 实例化 matrix 的唯一方式</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_10-2-2-map-和-struct-vs-new-和-make" tabindex="-1"><a class="header-anchor" href="#_10-2-2-map-和-struct-vs-new-和-make"><span>10.2.2 map 和 struct vs new() 和 make()</span></a></h2>
<p><code v-pre>new()</code> 和 <code v-pre>make()</code> 这两个内置函数已经在第 <RouteLink to="/chapter-2/07.2.html">7.2.4</RouteLink> 节通过切片的例子说明过一次。</p>
<p>现在为止我们已经见到了可以使用 <code v-pre>make()</code> 的三种类型中的其中两个：</p>
<pre><code>slices  /  maps / channels（见第 14 章）
</code></pre>
<p>下面的例子说明了在映射上使用 <code v-pre>new()</code> 和 <code v-pre>make()</code> 的区别以及可能发生的错误：</p>
<p>示例 10.4 <a href="examples/chapter_10/new_make.go">new_make.go</a>（不能编译）</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">type</span> Foo <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span></span>
<span class="line"><span class="token keyword">type</span> Bar <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">    thingOne <span class="token builtin">string</span></span>
<span class="line">    thingTwo <span class="token builtin">int</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// OK</span></span>
<span class="line">    y <span class="token operator">:=</span> <span class="token function">new</span><span class="token punctuation">(</span>Bar<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">(</span><span class="token operator">*</span>y<span class="token punctuation">)</span><span class="token punctuation">.</span>thingOne <span class="token operator">=</span> <span class="token string">"hello"</span></span>
<span class="line">    <span class="token punctuation">(</span><span class="token operator">*</span>y<span class="token punctuation">)</span><span class="token punctuation">.</span>thingTwo <span class="token operator">=</span> <span class="token number">1</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// NOT OK</span></span>
<span class="line">    z <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span>Bar<span class="token punctuation">)</span> <span class="token comment">// 编译错误：cannot make type Bar</span></span>
<span class="line">    <span class="token punctuation">(</span><span class="token operator">*</span>z<span class="token punctuation">)</span><span class="token punctuation">.</span>thingOne <span class="token operator">=</span> <span class="token string">"hello"</span></span>
<span class="line">    <span class="token punctuation">(</span><span class="token operator">*</span>z<span class="token punctuation">)</span><span class="token punctuation">.</span>thingTwo <span class="token operator">=</span> <span class="token number">1</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// OK</span></span>
<span class="line">    x <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span>Foo<span class="token punctuation">)</span></span>
<span class="line">    x<span class="token punctuation">[</span><span class="token string">"x"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">"goodbye"</span></span>
<span class="line">    x<span class="token punctuation">[</span><span class="token string">"y"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">"world"</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// NOT OK</span></span>
<span class="line">    u <span class="token operator">:=</span> <span class="token function">new</span><span class="token punctuation">(</span>Foo<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">(</span><span class="token operator">*</span>u<span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token string">"x"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">"goodbye"</span> <span class="token comment">// 运行时错误!! panic: assignment to entry in nil map</span></span>
<span class="line">    <span class="token punctuation">(</span><span class="token operator">*</span>u<span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token string">"y"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">"world"</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>试图 <code v-pre>make()</code> 一个结构体变量，会引发一个编译错误，这还不是太糟糕，但是 <code v-pre>new()</code> 一个 <code v-pre>map</code> 并试图向其填充数据，将会引发运行时错误！ 因为 <code v-pre>new(Foo)</code> 返回的是一个指向 <code v-pre>nil</code> 的指针，它尚未被分配内存。所以在使用 <code v-pre>map</code> 时要特别谨慎。</p>
</div></template>


