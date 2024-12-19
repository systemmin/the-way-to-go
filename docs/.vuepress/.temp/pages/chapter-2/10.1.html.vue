<template><div><h1 id="_10-1-结构体定义" tabindex="-1"><a class="header-anchor" href="#_10-1-结构体定义"><span>10.1 结构体定义</span></a></h1>
<p>结构体定义的一般方式如下：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">type</span> identifier <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">    field1 type1</span>
<span class="line">    field2 type2</span>
<span class="line">    <span class="token operator">...</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>type T struct {a, b int}</code> 也是合法的语法，它更适用于简单的结构体。</p>
<p>结构体里的字段都有 <strong>名字</strong>，像 <code v-pre>field1</code>、<code v-pre>field2</code> 等，如果字段在代码中从来也不会被用到，那么可以命名它为 <code v-pre>_</code>。</p>
<p>结构体的字段可以是任何类型，甚至是结构体本身（参考第 <RouteLink to="/chapter-2/10.5.html">10.5</RouteLink> 节），也可以是函数或者接口（参考<RouteLink to="/chapter-2/11.0.html">第 11 章</RouteLink>）。可以声明结构体类型的一个变量，然后像下面这样给它的字段赋值：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">var</span> s T</span>
<span class="line">s<span class="token punctuation">.</span>a <span class="token operator">=</span> <span class="token number">5</span></span>
<span class="line">s<span class="token punctuation">.</span>b <span class="token operator">=</span> <span class="token number">8</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>数组可以看作是一种结构体类型，不过它使用下标而不是具名的字段。</p>
<p><strong>使用 <code v-pre>new()</code></strong></p>
<p>使用 <code v-pre>new()</code> 函数给一个新的结构体变量分配内存，它返回指向已分配内存的指针：<code v-pre>var t *T = new(T)</code>，如果需要可以把这条语句放在不同的行（比如定义是包范围的，但是分配却没有必要在开始就做）。</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">var</span> t <span class="token operator">*</span>T</span>
<span class="line">t <span class="token operator">=</span> <span class="token function">new</span><span class="token punctuation">(</span>T<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>写这条语句的惯用方法是：<code v-pre>t := new(T)</code>，变量 <code v-pre>t</code> 是一个指向 <code v-pre>T</code> 的指针，此时结构体字段的值是它们所属类型的零值。</p>
<p>声明 <code v-pre>var t T</code> 也会给 <code v-pre>t</code> 分配内存，并零值化内存，但是这个时候 <code v-pre>t</code> 是类型 <code v-pre>T</code> 。在这两种方式中，<code v-pre>t</code> 通常被称做类型 T 的一个实例 (instance) 或对象 (object)。</p>
<p>示例 10.1 <a href="examples/chapter_10/structs_fields.go">structs_fields.go</a> 给出了一个非常简单的例子：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"><span class="token keyword">import</span> <span class="token string">"fmt"</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">type</span> struct1 <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">    i1  <span class="token builtin">int</span></span>
<span class="line">    f1  <span class="token builtin">float32</span></span>
<span class="line">    str <span class="token builtin">string</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    ms <span class="token operator">:=</span> <span class="token function">new</span><span class="token punctuation">(</span>struct1<span class="token punctuation">)</span></span>
<span class="line">    ms<span class="token punctuation">.</span>i1 <span class="token operator">=</span> <span class="token number">10</span></span>
<span class="line">    ms<span class="token punctuation">.</span>f1 <span class="token operator">=</span> <span class="token number">15.5</span></span>
<span class="line">    ms<span class="token punctuation">.</span>str<span class="token operator">=</span> <span class="token string">"Chris"</span></span>
<span class="line"></span>
<span class="line">    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"The int is: %d\n"</span><span class="token punctuation">,</span> ms<span class="token punctuation">.</span>i1<span class="token punctuation">)</span></span>
<span class="line">    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"The float is: %f\n"</span><span class="token punctuation">,</span> ms<span class="token punctuation">.</span>f1<span class="token punctuation">)</span></span>
<span class="line">    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"The string is: %s\n"</span><span class="token punctuation">,</span> ms<span class="token punctuation">.</span>str<span class="token punctuation">)</span></span>
<span class="line">    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>ms<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p>
<pre><code>The int is: 10
The float is: 15.500000
The string is: Chris
&amp;{10 15.5 Chris}
</code></pre>
<p>使用 <code v-pre>fmt.Println()</code> 打印一个结构体的默认输出可以很好的显示它的内容，类似使用 <code v-pre>%v</code> 选项。</p>
<p>就像在面向对象语言所作的那样，可以使用点号符给字段赋值：<code v-pre>structname.fieldname = value</code>。</p>
<p>同样的，使用点号符可以获取结构体字段的值：<code v-pre>structname.fieldname</code>。</p>
<p>在 Go 语言中这叫 <strong>选择器 (selector)</strong>。无论变量是一个结构体类型还是一个结构体类型指针，都使用同样的 <strong>选择器符 (selector-notation)</strong> 来引用结构体的字段：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">type</span> myStruct <span class="token keyword">struct</span> <span class="token punctuation">{</span> i <span class="token builtin">int</span> <span class="token punctuation">}</span></span>
<span class="line"><span class="token keyword">var</span> v myStruct    <span class="token comment">// v 是结构体类型变量</span></span>
<span class="line"><span class="token keyword">var</span> p <span class="token operator">*</span>myStruct   <span class="token comment">// p 是指向一个结构体类型变量的指针</span></span>
<span class="line">v<span class="token punctuation">.</span>i</span>
<span class="line">p<span class="token punctuation">.</span>i</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>初始化一个结构体实例（一个结构体字面量：struct-literal）的更简短和惯用的方式如下：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">    ms <span class="token operator">:=</span> <span class="token operator">&amp;</span>struct1<span class="token punctuation">{</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">15.5</span><span class="token punctuation">,</span> <span class="token string">"Chris"</span><span class="token punctuation">}</span></span>
<span class="line">    <span class="token comment">// 此时 ms 的类型是 *struct1</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>或者：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">    <span class="token keyword">var</span> ms struct1</span>
<span class="line">    ms <span class="token operator">=</span> struct1<span class="token punctuation">{</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">15.5</span><span class="token punctuation">,</span> <span class="token string">"Chris"</span><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>混合字面量语法 (composite literal syntax) <code v-pre>&amp;struct1{a, b, c}</code> 是一种简写，底层仍然会调用 <code v-pre>new()</code>，这里值的顺序必须按照字段顺序来写。在下面的例子中能看到可以通过在值的前面放上字段名来初始化字段的方式。表达式 <code v-pre>new(Type)</code> 和 <code v-pre>&amp;Type{}</code> 是等价的。</p>
<p>时间间隔（开始和结束时间以秒为单位）是使用结构体的一个典型例子：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">type</span> Interval <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">    start <span class="token builtin">int</span></span>
<span class="line">    end   <span class="token builtin">int</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>初始化方式：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">intr <span class="token operator">:=</span> Interval<span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">}</span>            <span class="token punctuation">(</span>A<span class="token punctuation">)</span></span>
<span class="line">intr <span class="token operator">:=</span> Interval<span class="token punctuation">{</span>end<span class="token punctuation">:</span><span class="token number">5</span><span class="token punctuation">,</span> start<span class="token punctuation">:</span><span class="token number">1</span><span class="token punctuation">}</span>  <span class="token punctuation">(</span>B<span class="token punctuation">)</span></span>
<span class="line">intr <span class="token operator">:=</span> Interval<span class="token punctuation">{</span>end<span class="token punctuation">:</span><span class="token number">5</span><span class="token punctuation">}</span>           <span class="token punctuation">(</span>C<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 (A) 中，值必须以字段在结构体定义时的顺序给出，<code v-pre>&amp;</code> 不是必须的。(B) 显示了另一种方式，字段名加一个冒号放在值的前面，这种情况下值的顺序不必一致，并且某些字段还可以被忽略掉，就像 (C) 中那样。</p>
<p>结构体类型和字段的命名遵循可见性规则（第 <RouteLink to="/chapter-2/04.2.html">4.2</RouteLink> 节），一个导出的结构体类型中有些字段是导出的，另一些不是，这是可能的。</p>
<p>下图说明了结构体类型实例和一个指向它的指针的内存布局：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">type</span> Point <span class="token keyword">struct</span> <span class="token punctuation">{</span> x<span class="token punctuation">,</span> y <span class="token builtin">int</span> <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>使用 <code v-pre>new()</code> 初始化：</p>
<p><img src="@source/chapter-2/images/10.1_fig10.1-1.jpg?raw=true" alt=""></p>
<p>作为结构体字面量初始化：</p>
<p><img src="@source/chapter-2/images/10.1_fig10.1-2.jpg?raw=true" alt=""></p>
<p>类型 <code v-pre>struct1</code> 在定义它的包 <code v-pre>pack1</code> 中必须是唯一的，它的完全类型名是：<code v-pre>pack1.struct1</code>。</p>
<p>下面的例子 <a href="examples/chapter_10/person.go">Listing 10.2—person.go</a> 显示了一个结构体 <code v-pre>Person</code>，一个方法 <code v-pre>upPerson()</code>，方法有一个类型为 <code v-pre>*Person</code> 的参数（因此对象本身是可以被改变的），以及三种调用这个方法的不同方式：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">    <span class="token string">"fmt"</span></span>
<span class="line">    <span class="token string">"strings"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">type</span> Person <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">    firstName   <span class="token builtin">string</span></span>
<span class="line">    lastName    <span class="token builtin">string</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">upPerson</span><span class="token punctuation">(</span>p <span class="token operator">*</span>Person<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    p<span class="token punctuation">.</span>firstName <span class="token operator">=</span> strings<span class="token punctuation">.</span><span class="token function">ToUpper</span><span class="token punctuation">(</span>p<span class="token punctuation">.</span>firstName<span class="token punctuation">)</span></span>
<span class="line">    p<span class="token punctuation">.</span>lastName <span class="token operator">=</span> strings<span class="token punctuation">.</span><span class="token function">ToUpper</span><span class="token punctuation">(</span>p<span class="token punctuation">.</span>lastName<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 1-struct as a value type:</span></span>
<span class="line">    <span class="token keyword">var</span> pers1 Person</span>
<span class="line">    pers1<span class="token punctuation">.</span>firstName <span class="token operator">=</span> <span class="token string">"Chris"</span></span>
<span class="line">    pers1<span class="token punctuation">.</span>lastName <span class="token operator">=</span> <span class="token string">"Woodward"</span></span>
<span class="line">    <span class="token function">upPerson</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>pers1<span class="token punctuation">)</span></span>
<span class="line">    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"The name of the person is %s %s\n"</span><span class="token punctuation">,</span> pers1<span class="token punctuation">.</span>firstName<span class="token punctuation">,</span> pers1<span class="token punctuation">.</span>lastName<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// 2—struct as a pointer:</span></span>
<span class="line">    pers2 <span class="token operator">:=</span> <span class="token function">new</span><span class="token punctuation">(</span>Person<span class="token punctuation">)</span></span>
<span class="line">    pers2<span class="token punctuation">.</span>firstName <span class="token operator">=</span> <span class="token string">"Chris"</span></span>
<span class="line">    pers2<span class="token punctuation">.</span>lastName <span class="token operator">=</span> <span class="token string">"Woodward"</span></span>
<span class="line">    <span class="token punctuation">(</span><span class="token operator">*</span>pers2<span class="token punctuation">)</span><span class="token punctuation">.</span>lastName <span class="token operator">=</span> <span class="token string">"Woodward"</span>  <span class="token comment">// 这是合法的</span></span>
<span class="line">    <span class="token function">upPerson</span><span class="token punctuation">(</span>pers2<span class="token punctuation">)</span></span>
<span class="line">    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"The name of the person is %s %s\n"</span><span class="token punctuation">,</span> pers2<span class="token punctuation">.</span>firstName<span class="token punctuation">,</span> pers2<span class="token punctuation">.</span>lastName<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// 3—struct as a literal:</span></span>
<span class="line">    pers3 <span class="token operator">:=</span> <span class="token operator">&amp;</span>Person<span class="token punctuation">{</span><span class="token string">"Chris"</span><span class="token punctuation">,</span><span class="token string">"Woodward"</span><span class="token punctuation">}</span></span>
<span class="line">    <span class="token function">upPerson</span><span class="token punctuation">(</span>pers3<span class="token punctuation">)</span></span>
<span class="line">    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"The name of the person is %s %s\n"</span><span class="token punctuation">,</span> pers3<span class="token punctuation">.</span>firstName<span class="token punctuation">,</span> pers3<span class="token punctuation">.</span>lastName<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p>
<pre><code>The name of the person is CHRIS WOODWARD
The name of the person is CHRIS WOODWARD
The name of the person is CHRIS WOODWARD
</code></pre>
<p>在上面例子的第二种情况中，可以直接通过指针，像 <code v-pre>pers2.lastName = &quot;Woodward&quot;</code> 这样给结构体字段赋值，没有像 C++ 中那样需要使用 <code v-pre>-&gt;</code> 操作符，Go 会自动做这样的转换。</p>
<p>注意也可以通过解指针的方式来设置值：<code v-pre>(*pers2).lastName = &quot;Woodward&quot;</code></p>
<p><strong>结构体的内存布局</strong></p>
<p>Go 语言中，结构体和它所包含的数据在内存中是以连续块的形式存在的，即使结构体中嵌套有其他的结构体，这在性能上带来了很大的优势。不像 Java 中的引用类型，一个对象和它里面包含的对象可能会在不同的内存空间中，这点和 Go 语言中的指针很像。下面的例子清晰地说明了这些情况：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">type</span> Rect1 <span class="token keyword">struct</span> <span class="token punctuation">{</span>Min<span class="token punctuation">,</span> Max Point <span class="token punctuation">}</span></span>
<span class="line"><span class="token keyword">type</span> Rect2 <span class="token keyword">struct</span> <span class="token punctuation">{</span>Min<span class="token punctuation">,</span> Max <span class="token operator">*</span>Point <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="@source/chapter-2/images/10.1_fig10.2.jpg?raw=true" alt=""></p>
<p><strong>递归结构体</strong></p>
<p>结构体类型可以通过引用自身来定义。这在定义链表或二叉树的元素（通常叫节点）时特别有用，此时节点包含指向临近节点的链接（地址）。如下所示，链表中的 <code v-pre>su</code>，树中的 <code v-pre>ri</code> 和 <code v-pre>le</code> 分别是指向别的节点的指针。</p>
<p>链表：</p>
<p><img src="@source/chapter-2/images/10.1_fig10.3.jpg?raw=true" alt=""></p>
<p>这块的 <code v-pre>data</code> 字段用于存放有效数据（比如 <code v-pre>float64</code>），<code v-pre>su</code> 指针指向后继节点。</p>
<p>Go 代码：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">type</span> Node <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">    data    <span class="token builtin">float64</span></span>
<span class="line">    su      <span class="token operator">*</span>Node</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>链表中的第一个元素叫 <code v-pre>head</code>，它指向第二个元素；最后一个元素叫 <code v-pre>tail</code>，它没有后继元素，所以它的 <code v-pre>su</code> 为 <code v-pre>nil</code> 值。当然真实的链接会有很多数据节点，并且链表可以动态增长或收缩。</p>
<p>同样地可以定义一个双向链表，它有一个前趋节点 <code v-pre>pr</code> 和一个后继节点 <code v-pre>su</code>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">type</span> Node <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">    pr      <span class="token operator">*</span>Node</span>
<span class="line">    data    <span class="token builtin">float64</span></span>
<span class="line">    su      <span class="token operator">*</span>Node</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>二叉树：</p>
<img src="/images/10.1_fig10.4.jpg" style="zoom: 80%;" />
<p>二叉树中每个节点最多能链接至两个节点：左节点 (<code v-pre>le</code>) 和右节点  (<code v-pre>ri</code>)，这两个节点本身又可以有左右节点，依次类推。树的顶层节点叫根节点 (<strong>root</strong>)，底层没有子节点的节点叫叶子节点 (<strong>leaves</strong>)，叶子节点的 <code v-pre>le</code> 和 <code v-pre>ri</code> 指针为 <code v-pre>nil</code> 值。在 Go 中可以如下定义二叉树：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">type</span> Tree <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">    le      <span class="token operator">*</span>Tree</span>
<span class="line">    data    <span class="token builtin">float64</span></span>
<span class="line">    ri      <span class="token operator">*</span>Tree</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>结构体转换</strong></p>
<p>Go 中的类型转换遵循严格的规则。当为结构体定义了一个 <code v-pre>alias</code> 类型时，此结构体类型和它的 <code v-pre>alias</code> 类型都有相同的底层类型，它们可以如示例 10.3 那样互相转换，同时需要注意其中非法赋值或转换引起的编译错误。</p>
<p>示例 10.3：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"><span class="token keyword">import</span> <span class="token string">"fmt"</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">type</span> number <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">    f <span class="token builtin">float32</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">type</span> nr number   <span class="token comment">// alias type</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    a <span class="token operator">:=</span> number<span class="token punctuation">{</span><span class="token number">5.0</span><span class="token punctuation">}</span></span>
<span class="line">    b <span class="token operator">:=</span> nr<span class="token punctuation">{</span><span class="token number">5.0</span><span class="token punctuation">}</span></span>
<span class="line">    <span class="token comment">// var i float32 = b   // compile-error: cannot use b (type nr) as type float32 in assignment</span></span>
<span class="line">    <span class="token comment">// var i = float32(b)  // compile-error: cannot convert b (type nr) to type float32</span></span>
<span class="line">    <span class="token comment">// var c number = b    // compile-error: cannot use b (type nr) as type number in assignment</span></span>
<span class="line">    <span class="token comment">// needs a conversion:</span></span>
<span class="line">    <span class="token keyword">var</span> c <span class="token operator">=</span> <span class="token function">number</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span></span>
<span class="line">    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p>
<pre><code>{5} {5} {5}
</code></pre>
<p><strong>练习 10.1</strong> <a href="exercises/chapter_10/vcard.go">vcard.go</a>：</p>
<p>定义结构体 <code v-pre>Address</code> 和 <code v-pre>VCard</code>，后者包含一个人的名字、地址编号、出生日期和图像，试着选择正确的数据类型。构建一个自己的 <code v-pre>vcard</code> 并打印它的内容。</p>
<pre><code>提示：
VCard 必须包含住址，它应该以值类型还是以指针类型放在 VCard 中呢？
第二种会好点，因为它占用内存少。包含一个名字和两个指向地址的指针的 Address 结构体可以使用 %v 打印：
{Kersschot 0x126d2b80 0x126d2be0}
</code></pre>
<p><strong>练习 10.2</strong> <a href="exercises/chapter_10/personex1.go">personex1.go</a>：</p>
<p>修改 personex1.go，使它的参数 <code v-pre>upPerson</code> 不是一个指针，解释下二者的区别。</p>
<p><strong>练习 10.3</strong> <a href="exercises/chapter_10/point.go">point.go</a>：</p>
<p>使用坐标 <code v-pre>X</code>、<code v-pre>Y</code> 定义一个二维 <code v-pre>Point</code> 结构体。同样地，对一个三维点使用它的极坐标定义一个 <code v-pre>Polar</code> 结构体。实现一个 <code v-pre>Abs()</code> 方法来计算一个 <code v-pre>Point</code> 表示的向量的长度，实现一个 <code v-pre>Scale()</code> 方法，它将点的坐标乘以一个尺度因子（提示：使用 <code v-pre>math</code> 包里的 <code v-pre>Sqrt()</code> 函数）(function Scale that multiplies the coordinates of a point with a scale factor)。</p>
<p><strong>练习 10.4</strong> <a href="exercises/chapter_10/rectangle.go">rectangle.go</a>：</p>
<p>定义一个 <code v-pre>Rectangle</code> 结构体，它的长和宽是 <code v-pre>int</code> 类型，并定义方法 <code v-pre>Area()</code> 和 <code v-pre>Perimeter()</code>，然后进行测试。</p>
</div></template>


