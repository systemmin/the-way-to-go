<template><div><h1 id="_7-6-字符串、数组和切片的应用" tabindex="-1"><a class="header-anchor" href="#_7-6-字符串、数组和切片的应用"><span>7.6 字符串、数组和切片的应用</span></a></h1>
<h2 id="_7-6-1-从字符串生成字节切片" tabindex="-1"><a class="header-anchor" href="#_7-6-1-从字符串生成字节切片"><span>7.6.1 从字符串生成字节切片</span></a></h2>
<p>假设 <code v-pre>s</code> 是一个字符串（本质上是一个字节数组），那么就可以直接通过 <code v-pre>c := []byte(s)</code> 来获取一个字节的切片 <code v-pre>c</code> 。另外，您还可以通过 <code v-pre>copy()</code> 函数来达到相同的目的：<code v-pre>copy(dst []byte, src string)</code>。</p>
<p>同样的，还可以使用 for-range 来获得每个元素（Listing 7.13 — <a href="examples/chapter_7/for_string.go">for_string.go</a>）：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token string">"fmt"</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    s <span class="token operator">:=</span> <span class="token string">"\u00ff\u754c"</span></span>
<span class="line">    <span class="token keyword">for</span> i<span class="token punctuation">,</span> c <span class="token operator">:=</span> <span class="token keyword">range</span> s <span class="token punctuation">{</span></span>
<span class="line">        fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%d:%c "</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> c<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p>
<pre><code>0:ÿ 2:界
</code></pre>
<p>我们知道，Unicode 字符会占用 2 个字节，有些甚至需要 3 个或者 4 个字节来进行表示。如果发现错误的 UTF8 字符，则该字符会被设置为 <code v-pre>U+FFFD</code> 并且索引向前移动一个字节。和字符串转换一样，您同样可以使用 <code v-pre>c := []int32(s)</code> 语法，这样切片中的每个 <code v-pre>int</code> 都会包含对应的 Unicode 代码，因为字符串中的每次字符都会对应一个整数。类似的，您也可以将字符串转换为元素类型为 <code v-pre>rune</code> 的切片：<code v-pre>r := []rune(s)</code>。</p>
<p>可以通过代码 <code v-pre>len([]int32(s))</code> 来获得字符串中字符的数量，但使用 <code v-pre>utf8.RuneCountInString(s)</code> 效率会更高一点。(参考 <a href="exercises/chapter_4/count_characters.go">count_characters.go</a>)</p>
<p>您还可以将一个字符串追加到某一个字节切片的尾部：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">var</span> b <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span></span>
<span class="line"><span class="token keyword">var</span> s <span class="token builtin">string</span></span>
<span class="line">b <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>b<span class="token punctuation">,</span> s<span class="token operator">...</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-6-2-获取字符串的某一部分" tabindex="-1"><a class="header-anchor" href="#_7-6-2-获取字符串的某一部分"><span>7.6.2 获取字符串的某一部分</span></a></h2>
<p>使用 <code v-pre>substr := str[start:end]</code> 可以从字符串 str 获取到从索引 <code v-pre>start</code> 开始到 <code v-pre>end-1</code> 位置的子字符串。同样的，<code v-pre>str[start:]</code> 则表示获取从 <code v-pre>start</code> 开始到 <code v-pre>len(str)-1</code> 位置的子字符串。而 <code v-pre>str[:end]</code> 表示获取从 0 开始到 <code v-pre>end-1</code> 的子字符串。</p>
<h2 id="_7-6-3-字符串和切片的内存结构" tabindex="-1"><a class="header-anchor" href="#_7-6-3-字符串和切片的内存结构"><span>7.6.3 字符串和切片的内存结构</span></a></h2>
<p>在内存中，一个字符串实际上是一个双字结构，即一个指向实际数据的指针和记录字符串长度的整数（见图 7.4）。因为指针对用户来说是完全不可见，因此我们可以依旧把字符串看做是一个值类型，也就是一个字符数组。</p>
<p>字符串 <code v-pre>string s = &quot;hello&quot;</code> 和子字符串 <code v-pre>t = s[2:3]</code> 在内存中的结构可以用下图表示：</p>
<p><img src="/images/7.6_fig7.4.png" alt=""></p>
<h2 id="_7-6-4-修改字符串中的某个字符" tabindex="-1"><a class="header-anchor" href="#_7-6-4-修改字符串中的某个字符"><span>7.6.4 修改字符串中的某个字符</span></a></h2>
<p>Go 语言中的字符串是不可变的，也就是说 <code v-pre>str[index]</code> 这样的表达式是不可以被放在等号左侧的。如果尝试运行 <code v-pre>str[i] = 'D'</code> 会得到错误：<code v-pre>cannot assign to str[i]</code>。</p>
<p>因此，您必须先将字符串转换成字节数组，然后再通过修改数组中的元素值来达到修改字符串的目的，最后将字节数组转换回字符串格式。</p>
<p>例如，将字符串 <code v-pre>&quot;hello&quot;</code> 转换为 <code v-pre>&quot;cello&quot;</code>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">s <span class="token operator">:=</span> <span class="token string">"hello"</span></span>
<span class="line">c <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span></span>
<span class="line">c<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token char">'c'</span></span>
<span class="line">s2 <span class="token operator">:=</span> <span class="token function">string</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span> <span class="token comment">// s2 == "cello"</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以，您可以通过操作切片来完成对字符串的操作。</p>
<h2 id="_7-6-5-字节数组对比函数" tabindex="-1"><a class="header-anchor" href="#_7-6-5-字节数组对比函数"><span>7.6.5 字节数组对比函数</span></a></h2>
<p>下面的 <code v-pre>Compare()</code> 函数会返回两个字节数组字典顺序的整数对比结果，即 <code v-pre>0 if a == b, -1 if a &lt; b, 1 if a &gt; b</code>。</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">Compare</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">for</span> i<span class="token operator">:=</span><span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token function">len</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> i <span class="token operator">&lt;</span> <span class="token function">len</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">switch</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">case</span> a<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">></span> b<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">:</span></span>
<span class="line">            <span class="token keyword">return</span> <span class="token number">1</span></span>
<span class="line">        <span class="token keyword">case</span> a<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">&lt;</span> b<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">:</span></span>
<span class="line">            <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token comment">// 数组的长度可能不同</span></span>
<span class="line">    <span class="token keyword">switch</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">case</span> <span class="token function">len</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token function">len</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span></span>
<span class="line">    <span class="token keyword">case</span> <span class="token function">len</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span> <span class="token operator">></span> <span class="token function">len</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token number">1</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token number">0</span> <span class="token comment">// 数组相等</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-6-6-搜索及排序切片和数组" tabindex="-1"><a class="header-anchor" href="#_7-6-6-搜索及排序切片和数组"><span>7.6.6 搜索及排序切片和数组</span></a></h2>
<p>标准库提供了 <code v-pre>sort</code> 包来实现常见的搜索和排序操作。您可以使用 <code v-pre>sort</code> 包中的函数 <code v-pre>func Ints(a []int)</code> 来实现对 <code v-pre>int</code> 类型的切片排序。例如 <code v-pre>sort.Ints(arri)</code>，其中变量 <code v-pre>arri</code> 就是需要被升序排序的数组或切片。为了检查某个数组是否已经被排序，可以通过函数 <code v-pre>IntsAreSorted(a []int) bool</code> 来检查，如果返回 <code v-pre>true</code> 则表示已经被排序。</p>
<p>类似的，可以使用函数 <code v-pre>func Float64s(a []float64)</code> 来排序 <code v-pre>float64</code> 的元素，或使用函数 <code v-pre>func Strings(a []string)</code> 排序字符串元素。</p>
<p>想要在数组或切片中搜索一个元素，该数组或切片必须先被排序（因为标准库的搜索算法使用的是二分法）。然后，您就可以使用函数 <code v-pre>func SearchInts(a []int, n int) int</code> 进行搜索，并返回对应结果的索引值。</p>
<p>当然，还可以搜索 <code v-pre>float64</code> 和字符串：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">SearchFloat64s</span><span class="token punctuation">(</span>a <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">float64</span><span class="token punctuation">,</span> x <span class="token builtin">float64</span><span class="token punctuation">)</span> <span class="token builtin">int</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">SearchStrings</span><span class="token punctuation">(</span>a <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">,</span> x <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">int</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>您可以通过查看 <a href="http://golang.org/pkg/sort/" target="_blank" rel="noopener noreferrer">官方文档</a> 来获取更详细的信息。</p>
<p>这就是如何使用 <code v-pre>sort</code> 包的方法，我们会在<RouteLink to="/chapter-2/11.7.html">第 11.7 节</RouteLink> 对它的细节进行深入，并实现一个属于我们自己的版本。</p>
<h2 id="_7-6-7-append-函数常见操作" tabindex="-1"><a class="header-anchor" href="#_7-6-7-append-函数常见操作"><span>7.6.7 append() 函数常见操作</span></a></h2>
<p>我们在<RouteLink to="/chapter-2/07.5.html">第 7.5 节</RouteLink>提到的 <code v-pre>append()</code> 非常有用，它能够用于各种方面的操作：</p>
<ol>
<li>
<p>将切片 <code v-pre>b</code> 的元素追加到切片 <code v-pre>a</code> 之后：<code v-pre>a = append(a, b...)</code></p>
</li>
<li>
<p>复制切片 <code v-pre>a</code> 的元素到新的切片 <code v-pre>b</code> 上：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">b <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span>T<span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token function">copy</span><span class="token punctuation">(</span>b<span class="token punctuation">,</span> a<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>删除位于索引 <code v-pre>i</code> 的元素：<code v-pre>a = append(a[:i], a[i+1:]...)</code></p>
</li>
<li>
<p>切除切片 <code v-pre>a</code> 中从索引 <code v-pre>i</code> 至 <code v-pre>j</code> 位置的元素：<code v-pre>a = append(a[:i], a[j:]...)</code></p>
</li>
<li>
<p>为切片 <code v-pre>a</code> 扩展 <code v-pre>j</code> 个元素长度：<code v-pre>a = append(a, make([]T, j)...)</code></p>
</li>
<li>
<p>在索引 <code v-pre>i</code> 的位置插入元素 <code v-pre>x</code>：<code v-pre>a = append(a[:i], append([]T{x}, a[i:]...)...)</code></p>
</li>
<li>
<p>在索引 <code v-pre>i</code> 的位置插入长度为 <code v-pre>j</code> 的新切片：<code v-pre>a = append(a[:i], append(make([]T, j), a[i:]...)...)</code></p>
</li>
<li>
<p>在索引 <code v-pre>i</code> 的位置插入切片 <code v-pre>b</code> 的所有元素：<code v-pre>a = append(a[:i], append(b, a[i:]...)...)</code></p>
</li>
<li>
<p>取出位于切片 <code v-pre>a</code> 最末尾的元素 <code v-pre>x</code>：<code v-pre>x, a = a[len(a)-1], a[:len(a)-1]</code></p>
</li>
<li>
<p>将元素 <code v-pre>x</code> 追加到切片 <code v-pre>a</code>：<code v-pre>a = append(a, x)</code></p>
</li>
</ol>
<p>因此，您可以使用切片和 <code v-pre>append()</code> 操作来表示任意可变长度的序列。</p>
<p>从数学的角度来看，切片相当于向量，如果需要的话可以定义一个向量作为切片的别名来进行操作。</p>
<p>如果您需要更加完整的方案，可以学习一下 Eleanor McHugh 编写的几个包：<a href="http://github.com/feyeleanor/slices" target="_blank" rel="noopener noreferrer"><code v-pre>slices</code></a>、<a href="http://github.com/feyeleanor/chain" target="_blank" rel="noopener noreferrer"><code v-pre>chain</code></a> 和 <a href="http://github.com/feyeleanor/lists" target="_blank" rel="noopener noreferrer"><code v-pre>lists</code></a>。</p>
<h2 id="_7-6-8-切片和垃圾回收" tabindex="-1"><a class="header-anchor" href="#_7-6-8-切片和垃圾回收"><span>7.6.8 切片和垃圾回收</span></a></h2>
<p>切片的底层指向一个数组，该数组的实际容量可能要大于切片所定义的容量。只有在没有任何切片指向的时候，底层的数组内存才会被释放，这种特性有时会导致程序占用多余的内存。</p>
<p><strong>示例</strong> 函数 <code v-pre>FindDigits()</code> 将一个文件加载到内存，然后搜索其中所有的数字并返回一个切片。</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">var</span> digitRegexp <span class="token operator">=</span> regexp<span class="token punctuation">.</span><span class="token function">MustCompile</span><span class="token punctuation">(</span><span class="token string">"[0-9]+"</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">FindDigits</span><span class="token punctuation">(</span>filename <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span> <span class="token punctuation">{</span></span>
<span class="line">    b<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> ioutil<span class="token punctuation">.</span><span class="token function">ReadFile</span><span class="token punctuation">(</span>filename<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">return</span> digitRegexp<span class="token punctuation">.</span><span class="token function">Find</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码可以顺利运行，但返回的 <code v-pre>[]byte</code> 指向的底层是整个文件的数据。只要该返回的切片不被释放，垃圾回收器就不能释放整个文件所占用的内存。换句话说，一点点有用的数据却占用了整个文件的内存。</p>
<p>想要避免这个问题，可以通过拷贝我们需要的部分到一个新的切片中：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">FindDigits</span><span class="token punctuation">(</span>filename <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span> <span class="token punctuation">{</span></span>
<span class="line">   b<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> ioutil<span class="token punctuation">.</span><span class="token function">ReadFile</span><span class="token punctuation">(</span>filename<span class="token punctuation">)</span></span>
<span class="line">   b <span class="token operator">=</span> digitRegexp<span class="token punctuation">.</span><span class="token function">Find</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span></span>
<span class="line">   c <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">   <span class="token function">copy</span><span class="token punctuation">(</span>c<span class="token punctuation">,</span> b<span class="token punctuation">)</span></span>
<span class="line">   <span class="token keyword">return</span> c</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>事实上，上面这段代码只能找到第一个匹配正则表达式的数字串。要想找到所有的数字，可以尝试下面这段代码：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">FindFileDigits</span><span class="token punctuation">(</span>filename <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span> <span class="token punctuation">{</span></span>
<span class="line">   fileBytes<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> ioutil<span class="token punctuation">.</span><span class="token function">ReadFile</span><span class="token punctuation">(</span>filename<span class="token punctuation">)</span></span>
<span class="line">   b <span class="token operator">:=</span> digitRegexp<span class="token punctuation">.</span><span class="token function">FindAll</span><span class="token punctuation">(</span>fileBytes<span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>fileBytes<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">   c <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span></span>
<span class="line">   <span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> bytes <span class="token operator">:=</span> <span class="token keyword">range</span> b <span class="token punctuation">{</span></span>
<span class="line">      c <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>c<span class="token punctuation">,</span> bytes<span class="token operator">...</span><span class="token punctuation">)</span></span>
<span class="line">   <span class="token punctuation">}</span></span>
<span class="line">   <span class="token keyword">return</span> c</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>练习 7.12</strong> <a href="exercises/chapter_7/split_string.go">split_string.go</a></p>
<p>编写一个函数，要求其接受两个参数，原始字符串 <code v-pre>str</code> 和分割索引 <code v-pre>i</code>，然后返回两个分割后的字符串。</p>
<p><strong>练习 7.13</strong> <a href="exercises/chapter_7/string_split2.go">string_split2.go</a></p>
<p>假设有字符串 <code v-pre>str</code>，那么 <code v-pre>str[len(str)/2:] + str[:len(str)/2]</code> 的结果是什么？</p>
<p><strong>练习 7.14</strong> <a href="exercises/chapter_7/string_reverse.go">string_reverse.go</a></p>
<p>编写一个程序，要求能够反转字符串，即将 <code v-pre>&quot;Google&quot;</code> 转换成 <code v-pre>&quot;elgooG&quot;</code>（提示：使用 <code v-pre>[]byte</code> 类型的切片）。</p>
<p>如果您使用两个切片来实现反转，请再尝试使用一个切片（提示：使用交换法）。</p>
<p>如果您想要反转 Unicode 编码的字符串，请使用 <code v-pre>[]int32</code> 类型的切片。</p>
<p><strong>练习 7.15</strong> <a href="exercises/chapter_7/uniq.go">Q29_uniq.go</a></p>
<p>编写一个程序，要求能够遍历一个字符数组，并将当前字符和前一个字符不相同的字符拷贝至另一个数组。</p>
<p><strong>练习 7.16</strong> <a href="exercises/chapter_7/bubblesort.go">bubblesort.go</a></p>
<p>编写一个程序，使用冒泡排序的方法排序一个包含整数的切片（算法的定义可参考 <a href="http://en.wikipedia.org/wiki/Bubble_sort" target="_blank" rel="noopener noreferrer">维基百科</a>）。</p>
<p><strong>练习 7.17</strong> <a href="exercises/chapter_7/map_function.go">map_function.go</a></p>
<p>在函数式编程语言中，一个 map-function 是指能够接受一个函数原型和一个列表，并使用列表中的值依次执行函数原型，公式为：<code v-pre>map ( F(), (e1,e2, . . . ,en) ) = ( F(e1), F(e2), ... F(en) )</code>。</p>
<p>编写一个函数 <code v-pre>mapFunc</code> 要求接受以下 2 个参数：</p>
<ul>
<li>一个将整数乘以 10 的函数</li>
<li>一个整数列表</li>
</ul>
<p>最后返回保存运行结果的整数列表。</p>
</div></template>


