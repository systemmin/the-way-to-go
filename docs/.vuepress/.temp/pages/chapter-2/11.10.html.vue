<template><div><h1 id="_11-10-反射包" tabindex="-1"><a class="header-anchor" href="#_11-10-反射包"><span>11.10 反射包</span></a></h1>
<h2 id="_11-10-1-方法和类型的反射" tabindex="-1"><a class="header-anchor" href="#_11-10-1-方法和类型的反射"><span>11.10.1 方法和类型的反射</span></a></h2>
<p>在 <RouteLink to="/chapter-2/10.4.html">10.4</RouteLink> 节我们看到可以通过反射来分析一个结构体。本节我们进一步探讨强大的反射功能。反射是用程序检查其所拥有的结构，尤其是类型的一种能力；这是元编程的一种形式。反射可以在运行时检查类型和变量，例如：它的大小、它的方法以及它能“动态地”调用这些方法。这对于没有源代码的包尤其有用。这是一个强大的工具，除非真得有必要，否则应当避免使用或小心使用。</p>
<p>变量的最基本信息就是类型和值：反射包的 <code v-pre>Type</code> 用来表示一个 Go 类型，反射包的 <code v-pre>Value</code> 为 Go 值提供了反射接口。</p>
<p>两个简单的函数，<code v-pre>reflect.TypeOf</code> 和 <code v-pre>reflect.ValueOf</code>，返回被检查对象的类型和值。例如，x 被定义为：<code v-pre>var x float64 = 3.4</code>，那么 <code v-pre>reflect.TypeOf(x)</code> 返回 <code v-pre>float64</code>，<code v-pre>reflect.ValueOf(x)</code> 返回 <code v-pre>&lt;float64 Value&gt;</code></p>
<p>实际上，反射是通过检查一个接口的值，变量首先被转换成空接口。这从下面两个函数签名能够很明显的看出来：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">TypeOf</span><span class="token punctuation">(</span>i <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> Type</span>
<span class="line"><span class="token keyword">func</span> <span class="token function">ValueOf</span><span class="token punctuation">(</span>i <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> Value</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>接口的值包含一个 type 和 value。</p>
<p>反射可以从接口值反射到对象，也可以从对象反射回接口值。</p>
<p><code v-pre>reflect.Type</code> 和 <code v-pre>reflect.Value</code> 都有许多方法用于检查和操作它们。一个重要的例子是 <code v-pre>Value</code> 有一个 <code v-pre>Type()</code> 方法返回 <code v-pre>reflect.Value</code> 的 <code v-pre>Type</code> 类型。另一个是 <code v-pre>Type</code> 和 <code v-pre>Value</code> 都有 <code v-pre>Kind()</code> 方法返回一个常量来表示类型：<code v-pre>Uint</code>、<code v-pre>Float64</code>、<code v-pre>Slice</code> 等等。同样 <code v-pre>Value</code> 有叫做 <code v-pre>Int()</code> 和 <code v-pre>Float()</code> 的方法可以获取存储在内部的值（跟 <code v-pre>int64</code> 和 <code v-pre>float64</code> 一样）</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">const</span> <span class="token punctuation">(</span></span>
<span class="line">	Invalid Kind <span class="token operator">=</span> <span class="token boolean">iota</span></span>
<span class="line">	Bool</span>
<span class="line">	Int</span>
<span class="line">	Int8</span>
<span class="line">	Int16</span>
<span class="line">	Int32</span>
<span class="line">	Int64</span>
<span class="line">	Uint</span>
<span class="line">	Uint8</span>
<span class="line">	Uint16</span>
<span class="line">	Uint32</span>
<span class="line">	Uint64</span>
<span class="line">	Uintptr</span>
<span class="line">	Float32</span>
<span class="line">	Float64</span>
<span class="line">	Complex64</span>
<span class="line">	Complex128</span>
<span class="line">	Array</span>
<span class="line">	Chan</span>
<span class="line">	Func</span>
<span class="line">	Interface</span>
<span class="line">	Map</span>
<span class="line">	Ptr</span>
<span class="line">	Slice</span>
<span class="line">	String</span>
<span class="line">	Struct</span>
<span class="line">	UnsafePointer</span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于 <code v-pre>float64</code> 类型的变量 <code v-pre>x</code>，如果 <code v-pre>v:=reflect.ValueOf(x)</code>，那么 <code v-pre>v.Kind()</code> 返回 <code v-pre>reflect.Float64</code> ，所以下面的表达式是 <code v-pre>true</code>：<code v-pre>v.Kind() == reflect.Float64</code></p>
<p><code v-pre>Kind()</code> 总是返回底层类型：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">type</span> MyInt <span class="token builtin">int</span></span>
<span class="line"><span class="token keyword">var</span> m MyInt <span class="token operator">=</span> <span class="token number">5</span></span>
<span class="line">v <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span>m<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>方法 <code v-pre>v.Kind()</code> 返回 <code v-pre>reflect.Int</code>。</p>
<p>变量 <code v-pre>v</code> 的 <code v-pre>Interface()</code> 方法可以得到还原（接口）值，所以可以这样打印 <code v-pre>v</code> 的值：<code v-pre>fmt.Println(v.Interface())</code></p>
<p>尝试运行下面的代码：</p>
<p>示例 11.11 <a href="examples/chapter_11/reflect1.go">reflect1.go</a>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token comment">// blog: Laws of Reflection</span></span>
<span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"fmt"</span></span>
<span class="line">	<span class="token string">"reflect"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">var</span> x <span class="token builtin">float64</span> <span class="token operator">=</span> <span class="token number">3.4</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"type:"</span><span class="token punctuation">,</span> reflect<span class="token punctuation">.</span><span class="token function">TypeOf</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">	v <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"value:"</span><span class="token punctuation">,</span> v<span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"type:"</span><span class="token punctuation">,</span> v<span class="token punctuation">.</span><span class="token function">Type</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"kind:"</span><span class="token punctuation">,</span> v<span class="token punctuation">.</span><span class="token function">Kind</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"value:"</span><span class="token punctuation">,</span> v<span class="token punctuation">.</span><span class="token function">Float</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>v<span class="token punctuation">.</span><span class="token function">Interface</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"value is %5.2e\n"</span><span class="token punctuation">,</span> v<span class="token punctuation">.</span><span class="token function">Interface</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">	y <span class="token operator">:=</span> v<span class="token punctuation">.</span><span class="token function">Interface</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token builtin">float64</span><span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>y<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">type: float64</span>
<span class="line">value: 3.4</span>
<span class="line">type: float64</span>
<span class="line">kind: float64</span>
<span class="line">value: 3.4</span>
<span class="line">3.4</span>
<span class="line">value is 3.40e+00</span>
<span class="line">3.4</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>x</code> 是一个 <code v-pre>float64</code> 类型的值，<code v-pre>reflect.ValueOf(x).Float()</code> 返回这个 <code v-pre>float64</code> 类型的实际值；同样的适用于 <code v-pre>Int(), Bool(), Complex(), String()</code></p>
<h2 id="_11-10-2-通过反射修改-设置-值" tabindex="-1"><a class="header-anchor" href="#_11-10-2-通过反射修改-设置-值"><span>11.10.2 通过反射修改（设置）值</span></a></h2>
<p>继续前面的例子（参阅 11.9 <a href="examples/chapter_11/reflect2.go">reflect2.go</a>），假设我们要把 <code v-pre>x</code> 的值改为 <code v-pre>3.1415</code>。<code v-pre>Value</code> 有一些方法可以完成这个任务，但是必须小心使用：<code v-pre>v.SetFloat(3.1415)</code>。</p>
<p>这将产生一个错误：<code v-pre>reflect.Value.SetFloat using unaddressable value</code>。</p>
<p>为什么会这样呢？问题的原因是 <code v-pre>v</code> 不是可设置的（这里并不是说值不可寻址）。是否可设置是 <code v-pre>Value</code> 的一个属性，并且不是所有的反射值都有这个属性：可以使用 <code v-pre>CanSet()</code> 方法测试是否可设置。</p>
<p>在例子中我们看到 <code v-pre>v.CanSet()</code> 返回 <code v-pre>false</code>： <code v-pre>settability of v: false</code></p>
<p>当 <code v-pre>v := reflect.ValueOf(x)</code> 函数通过传递一个 <code v-pre>x</code> 拷贝创建了 <code v-pre>v</code>，那么 <code v-pre>v</code> 的改变并不能更改原始的 <code v-pre>x</code>。要想 <code v-pre>v</code> 的更改能作用到 <code v-pre>x</code>，那就必须传递 x 的地址 <code v-pre>v = reflect.ValueOf(&amp;x)</code>。</p>
<p>通过 <code v-pre>Type()</code> 我们看到 <code v-pre>v</code> 现在的类型是 <code v-pre>*float64</code> 并且仍然是不可设置的。</p>
<p>要想让其可设置我们需要使用 <code v-pre>Elem()</code> 函数，这间接地使用指针：<code v-pre>v = v.Elem()</code></p>
<p>现在 <code v-pre>v.CanSet()</code> 返回 <code v-pre>true</code> 并且 <code v-pre>v.SetFloat(3.1415)</code> 设置成功了！</p>
<p>示例 11.12 <a href="examples/chapter_11/reflect2.go">reflect2.go</a>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"fmt"</span></span>
<span class="line">	<span class="token string">"reflect"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">var</span> x <span class="token builtin">float64</span> <span class="token operator">=</span> <span class="token number">3.4</span></span>
<span class="line">	v <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span></span>
<span class="line">	<span class="token comment">// setting a value:</span></span>
<span class="line">	<span class="token comment">// v.SetFloat(3.1415) // Error: will panic: reflect.Value.SetFloat using unaddressable value</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"settability of v:"</span><span class="token punctuation">,</span> v<span class="token punctuation">.</span><span class="token function">CanSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">	v <span class="token operator">=</span> reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>x<span class="token punctuation">)</span> <span class="token comment">// Note: take the address of x.</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"type of v:"</span><span class="token punctuation">,</span> v<span class="token punctuation">.</span><span class="token function">Type</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"settability of v:"</span><span class="token punctuation">,</span> v<span class="token punctuation">.</span><span class="token function">CanSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">	v <span class="token operator">=</span> v<span class="token punctuation">.</span><span class="token function">Elem</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"The Elem of v is: "</span><span class="token punctuation">,</span> v<span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"settability of v:"</span><span class="token punctuation">,</span> v<span class="token punctuation">.</span><span class="token function">CanSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">	v<span class="token punctuation">.</span><span class="token function">SetFloat</span><span class="token punctuation">(</span><span class="token number">3.1415</span><span class="token punctuation">)</span> <span class="token comment">// this works!</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>v<span class="token punctuation">.</span><span class="token function">Interface</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">settability of v: false</span>
<span class="line">type of v: *float64</span>
<span class="line">settability of v: false</span>
<span class="line">The Elem of v is:  &lt;float64 Value></span>
<span class="line">settability of v: true</span>
<span class="line">3.1415</span>
<span class="line">&lt;float64 Value></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>反射中有些内容是需要用地址去改变它的状态的。</p>
<h2 id="_11-10-3-反射结构" tabindex="-1"><a class="header-anchor" href="#_11-10-3-反射结构"><span>11.10.3 反射结构</span></a></h2>
<p>有些时候需要反射一个结构类型。<code v-pre>NumField()</code> 方法返回结构内的字段数量；通过一个 <code v-pre>for</code> 循环用索引取得每个字段的值 <code v-pre>Field(i)</code>。</p>
<p>我们同样能够调用签名在结构上的方法，例如，使用索引 <code v-pre>n</code> 来调用：<code v-pre>Method(n).Call(nil)</code>。</p>
<p>示例 11.13 <a href="examples/chapter_11/reflect_struct.go">reflect_struct.go</a>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"fmt"</span></span>
<span class="line">	<span class="token string">"reflect"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">type</span> NotknownType <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">	s1<span class="token punctuation">,</span> s2<span class="token punctuation">,</span> s3 <span class="token builtin">string</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>n NotknownType<span class="token punctuation">)</span> <span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">return</span> n<span class="token punctuation">.</span>s1 <span class="token operator">+</span> <span class="token string">" - "</span> <span class="token operator">+</span> n<span class="token punctuation">.</span>s2 <span class="token operator">+</span> <span class="token string">" - "</span> <span class="token operator">+</span> n<span class="token punctuation">.</span>s3</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// variable to investigate:</span></span>
<span class="line"><span class="token keyword">var</span> secret <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token operator">=</span> NotknownType<span class="token punctuation">{</span><span class="token string">"Ada"</span><span class="token punctuation">,</span> <span class="token string">"Go"</span><span class="token punctuation">,</span> <span class="token string">"Oberon"</span><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	value <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span>secret<span class="token punctuation">)</span> <span class="token comment">// &lt;main.NotknownType Value></span></span>
<span class="line">	typ <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">TypeOf</span><span class="token punctuation">(</span>secret<span class="token punctuation">)</span>    <span class="token comment">// main.NotknownType</span></span>
<span class="line">	<span class="token comment">// alternative:</span></span>
<span class="line">	<span class="token comment">// typ := value.Type()  // main.NotknownType</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>typ<span class="token punctuation">)</span></span>
<span class="line">	knd <span class="token operator">:=</span> value<span class="token punctuation">.</span><span class="token function">Kind</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// struct</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>knd<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">	<span class="token comment">// iterate through the fields of the struct:</span></span>
<span class="line">	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> value<span class="token punctuation">.</span><span class="token function">NumField</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Field %d: %v\n"</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> value<span class="token punctuation">.</span><span class="token function">Field</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">		<span class="token comment">// error: panic: reflect.Value.SetString using value obtained using unexported field</span></span>
<span class="line">		<span class="token comment">// value.Field(i).SetString("C#")</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">	<span class="token comment">// call the first method, which is String():</span></span>
<span class="line">	results <span class="token operator">:=</span> value<span class="token punctuation">.</span><span class="token function">Method</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Call</span><span class="token punctuation">(</span><span class="token boolean">nil</span><span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>results<span class="token punctuation">)</span> <span class="token comment">// [Ada - Go - Oberon]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">main.NotknownType</span>
<span class="line">struct</span>
<span class="line">Field 0: Ada</span>
<span class="line">Field 1: Go</span>
<span class="line">Field 2: Oberon</span>
<span class="line">[Ada - Go - Oberon]</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是如果尝试更改一个值，会得到一个错误：</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">panic: reflect.Value.SetString using value obtained using unexported field</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>这是因为结构中只有被导出字段（首字母大写）才是可设置的；来看下面的例子：</p>
<p>示例 11.14 <a href="examples/chapter_11/reflect_struct2.go">reflect_struct2.go</a>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"fmt"</span></span>
<span class="line">	<span class="token string">"reflect"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">type</span> T <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">	A <span class="token builtin">int</span></span>
<span class="line">	B <span class="token builtin">string</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	t <span class="token operator">:=</span> T<span class="token punctuation">{</span><span class="token number">23</span><span class="token punctuation">,</span> <span class="token string">"skidoo"</span><span class="token punctuation">}</span></span>
<span class="line">	s <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>t<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Elem</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	typeOfT <span class="token operator">:=</span> s<span class="token punctuation">.</span><span class="token function">Type</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> s<span class="token punctuation">.</span><span class="token function">NumField</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span></span>
<span class="line">		f <span class="token operator">:=</span> s<span class="token punctuation">.</span><span class="token function">Field</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%d: %s %s = %v\n"</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span></span>
<span class="line">			typeOfT<span class="token punctuation">.</span><span class="token function">Field</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">.</span>Name<span class="token punctuation">,</span> f<span class="token punctuation">.</span><span class="token function">Type</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> f<span class="token punctuation">.</span><span class="token function">Interface</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	s<span class="token punctuation">.</span><span class="token function">Field</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">SetInt</span><span class="token punctuation">(</span><span class="token number">77</span><span class="token punctuation">)</span></span>
<span class="line">	s<span class="token punctuation">.</span><span class="token function">Field</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">SetString</span><span class="token punctuation">(</span><span class="token string">"Sunset Strip"</span><span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"t is now"</span><span class="token punctuation">,</span> t<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">0: A int = 23</span>
<span class="line">1: B string = skidoo</span>
<span class="line">t is now {77 Sunset Strip}</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>附录 37 深入阐述了反射概念。</p>
</div></template>


