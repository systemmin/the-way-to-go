<template><div><h1 id="_7-2-切片" tabindex="-1"><a class="header-anchor" href="#_7-2-切片"><span>7.2 切片</span></a></h1>
<h2 id="_7-2-1-概念" tabindex="-1"><a class="header-anchor" href="#_7-2-1-概念"><span>7.2.1 概念</span></a></h2>
<p>切片 (slice) 是对数组一个连续片段的引用（该数组我们称之为相关数组，通常是匿名的），所以切片是一个引用类型（因此更类似于 C/C++ 中的数组类型，或者 Python 中的 list 类型）。这个片段可以是整个数组，或者是由起始和终止索引标识的一些项的子集。需要注意的是，终止索引标识的项不包括在切片内。切片提供了一个相关数组的动态窗口。</p>
<p>切片是可索引的，并且可以由 <code v-pre>len()</code> 函数获取长度。</p>
<p>给定项的切片索引可能比相关数组的相同元素的索引小。和数组不同的是，切片的长度可以在运行时修改，最小为 0， 最大为相关数组的长度：切片是一个 <strong>长度可变的数组</strong>。</p>
<p>切片提供了计算容量的函数 <code v-pre>cap()</code> 可以测量切片最长可以达到多少：它等于切片的长度 + 数组除切片之外的长度。如果 <code v-pre>s</code> 是一个切片，<code v-pre>cap(s)</code> 就是从 <code v-pre>s[0]</code> 到数组末尾的数组长度。切片的长度永远不会超过它的容量，所以对于切片 <code v-pre>s</code> 来说该不等式永远成立：<code v-pre>0 &lt;= len(s) &lt;= cap(s)</code>。</p>
<p>多个切片如果表示同一个数组的片段，它们可以共享数据；因此一个切片和相关数组的其他切片是共享存储的，相反，不同的数组总是代表不同的存储。数组实际上是切片的构建块。</p>
<p><strong>优点</strong> 因为切片是引用，所以它们不需要使用额外的内存并且比使用数组更有效率，所以在 Go 代码中切片比数组更常用。</p>
<p>声明切片的格式是： <code v-pre>var identifier []type</code>（不需要说明长度）。</p>
<p>一个切片在未初始化之前默认为 <code v-pre>nil</code>，长度为 0。</p>
<p>切片的初始化格式是：<code v-pre>var slice1 []type = arr1[start:end]</code>。</p>
<p>这表示 <code v-pre>slice1</code> 是由数组 <code v-pre>arr1</code> 从 <code v-pre>start</code> 索引到 <code v-pre>end-1</code> 索引之间的元素构成的子集（切分数组，<code v-pre>start:end</code> 被称为切片表达式）。所以 <code v-pre>slice1[0]</code> 就等于 <code v-pre>arr1[start]</code>。这可以在 <code v-pre>arr1</code> 被填充前就定义好。</p>
<p>如果某个人写：<code v-pre>var slice1 []type = arr1[:]</code> 那么 <code v-pre>slice1</code> 就等于完整的 <code v-pre>arr1</code> 数组（所以这种表示方式是 <code v-pre>arr1[0:len(arr1)]</code> 的一种缩写）。另外一种表述方式是：<code v-pre>slice1 = &amp;arr1</code>。</p>
<p><code v-pre>arr1[2:]</code> 和 <code v-pre>arr1[2:len(arr1)]</code> 相同，都包含了数组从第三个到最后的所有元素。</p>
<p><code v-pre>arr1[:3]</code> 和 <code v-pre>arr1[0:3]</code> 相同，包含了从第一个到第三个元素（不包括第四个）。</p>
<p>如果你想去掉 <code v-pre>slice1</code> 的最后一个元素，只要 <code v-pre>slice1 = slice1[:len(slice1)-1]</code>。</p>
<p>一个由数字 1、2、3 组成的切片可以这么生成：<code v-pre>s := [3]int{1,2,3}[:]</code>（注：应先用 <code v-pre>s := [3]int{1, 2, 3}</code> 生成数组, 再使用 <code v-pre>s[:]</code> 转成切片）甚至更简单的 <code v-pre>s := []int{1,2,3}</code>。</p>
<p><code v-pre>s2 := s[:]</code> 是用切片组成的切片，拥有相同的元素，但是仍然指向相同的相关数组。</p>
<p>一个切片 <code v-pre>s</code> 可以这样扩展到它的大小上限：<code v-pre>s = s[:cap(s)]</code>，如果再扩大的话就会导致运行时错误（参见第 7.7 节）。</p>
<p>对于每一个切片（包括 <code v-pre>string</code>），以下状态总是成立的：</p>
<pre><code>s == s[:i] + s[i:] // i是一个整数且: 0 &lt;= i &lt;= len(s)
len(s) &lt;= cap(s)
</code></pre>
<p>切片也可以用类似数组的方式初始化：<code v-pre>var x = []int{2, 3, 5, 7, 11}</code>。这样就创建了一个长度为 5 的数组并且创建了一个相关切片。</p>
<p>切片在内存中的组织方式实际上是一个有 3 个域的结构体：指向相关数组的指针，切片长度以及切片容量。下图给出了一个长度为 2，容量为 4 的切片 <code v-pre>y</code>。</p>
<ul>
<li><code v-pre>y[0] = 3</code> 且 <code v-pre>y[1] = 5</code>。</li>
<li>切片 <code v-pre>y[0:4]</code> 由 元素 <code v-pre>3</code>，<code v-pre>5</code>，<code v-pre>7</code> 和 <code v-pre>11</code> 组成。</li>
</ul>
<img src="/images/7.2_fig7.2.png" style="zoom: 50%;" />
<p>示例 7.7 <a href="examples/chapter_7/array_slices.go">array_slices.go</a></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"><span class="token keyword">import</span> <span class="token string">"fmt"</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">var</span> arr1 <span class="token punctuation">[</span><span class="token number">6</span><span class="token punctuation">]</span><span class="token builtin">int</span></span>
<span class="line">	<span class="token keyword">var</span> slice1 <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span> <span class="token operator">=</span> arr1<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">:</span><span class="token number">5</span><span class="token punctuation">]</span> <span class="token comment">// item at index 5 not included!</span></span>
<span class="line"></span>
<span class="line">	<span class="token comment">// load the array with integers: 0,1,2,3,4,5</span></span>
<span class="line">	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token function">len</span><span class="token punctuation">(</span>arr1<span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span></span>
<span class="line">		arr1<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> i</span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">	<span class="token comment">// print the slice</span></span>
<span class="line">	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token function">len</span><span class="token punctuation">(</span>slice1<span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Slice at %d is %d\n"</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> slice1<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"The length of arr1 is %d\n"</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>arr1<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"The length of slice1 is %d\n"</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>slice1<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"The capacity of slice1 is %d\n"</span><span class="token punctuation">,</span> <span class="token function">cap</span><span class="token punctuation">(</span>slice1<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">	<span class="token comment">// grow the slice</span></span>
<span class="line">	slice1 <span class="token operator">=</span> slice1<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">:</span><span class="token number">4</span><span class="token punctuation">]</span></span>
<span class="line">	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token function">len</span><span class="token punctuation">(</span>slice1<span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Slice at %d is %d\n"</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> slice1<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"The length of slice1 is %d\n"</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>slice1<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"The capacity of slice1 is %d\n"</span><span class="token punctuation">,</span> <span class="token function">cap</span><span class="token punctuation">(</span>slice1<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">	<span class="token comment">// grow the slice beyond capacity</span></span>
<span class="line">	<span class="token comment">//slice1 = slice1[0:7 ] // panic: runtime error: slice bound out of range</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p>
<pre><code>Slice at 0 is 2  
Slice at 1 is 3  
Slice at 2 is 4  
The length of arr1 is 6  
The length of slice1 is 3  
The capacity of slice1 is 4  
Slice at 0 is 2  
Slice at 1 is 3  
Slice at 2 is 4  
Slice at 3 is 5  
The length of slice1 is 4  
The capacity of slice1 is 4  
</code></pre>
<p>如果 <code v-pre>s2</code> 是一个切片，你可以将 <code v-pre>s2</code> 向后移动一位 <code v-pre>s2 = s2[1:]</code>，但是末尾没有移动。切片只能向后移动，<code v-pre>s2 = s2[-1:]</code> 会导致编译错误。切片不能被重新分片以获取数组的前一个元素。</p>
<p><strong>注意</strong> 绝对不要用指针指向切片。切片本身已经是一个引用类型，所以它本身就是一个指针！！</p>
<p>问题 7.2： 给定切片 <code v-pre>b:= []byte{'g', 'o', 'l', 'a', 'n', 'g'}</code>，那么 <code v-pre>b[1:4]</code>、<code v-pre>b[:2]</code>、<code v-pre>b[2:]</code> 和 <code v-pre>b[:]</code> 分别是什么？</p>
<h2 id="_7-2-2-将切片传递给函数" tabindex="-1"><a class="header-anchor" href="#_7-2-2-将切片传递给函数"><span>7.2.2 将切片传递给函数</span></a></h2>
<p>如果你有一个函数需要对数组做操作，你可能总是需要把参数声明为切片。当你调用该函数时，把数组分片，创建为一个切片引用并传递给该函数。这里有一个计算数组元素和的方法:</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">sum</span><span class="token punctuation">(</span>a <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span></span>
<span class="line">	s <span class="token operator">:=</span> <span class="token number">0</span></span>
<span class="line">	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token function">len</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span></span>
<span class="line">		s <span class="token operator">+=</span> a<span class="token punctuation">[</span>i<span class="token punctuation">]</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	<span class="token keyword">return</span> s</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">var</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">}</span></span>
<span class="line">	<span class="token function">sum</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token punctuation">]</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-2-3-用-make-创建一个切片" tabindex="-1"><a class="header-anchor" href="#_7-2-3-用-make-创建一个切片"><span>7.2.3 用 make() 创建一个切片</span></a></h2>
<p>当相关数组还没有定义时，我们可以使用 <code v-pre>make()</code> 函数来创建一个切片，同时创建好相关数组：<code v-pre>var slice1 []type = make([]type, len)</code>。</p>
<p>也可以简写为 <code v-pre>slice1 := make([]type, len)</code>，这里 <code v-pre>len</code> 是数组的长度并且也是 <code v-pre>slice</code> 的初始长度。</p>
<p>所以定义 <code v-pre>s2 := make([]int, 10)</code>，那么 <code v-pre>cap(s2) == len(s2) == 10</code>。</p>
<p><code v-pre>make()</code> 接受 2 个参数：元素的类型以及切片的元素个数。</p>
<p>如果你想创建一个 <code v-pre>slice1</code>，它不占用整个数组，而只是占用以 <code v-pre>len</code> 为个数个项，那么只要：<code v-pre>slice1 := make([]type, len, cap)</code>。</p>
<p><code v-pre>make()</code> 的使用方式是：<code v-pre>func make([]T, len, cap)</code>，其中 <code v-pre>cap</code> 是可选参数。</p>
<p>所以下面两种方法可以生成相同的切片:</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token function">new</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">100</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">:</span><span class="token number">50</span><span class="token punctuation">]</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>下图描述了使用 <code v-pre>make()</code> 方法生成的切片的内存结构：</p>
<img src="/images/7.2_fig7.2.1.png" style="zoom:50%;" />
<p>示例 7.8 <a href="examples/chapter_7/make_slice.go">make_slice.go</a></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"><span class="token keyword">import</span> <span class="token string">"fmt"</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">var</span> slice1 <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span> <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token comment">// load the array/slice:</span></span>
<span class="line">	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token function">len</span><span class="token punctuation">(</span>slice1<span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span></span>
<span class="line">		slice1<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">5</span> <span class="token operator">*</span> i</span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">	<span class="token comment">// print the slice:</span></span>
<span class="line">	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token function">len</span><span class="token punctuation">(</span>slice1<span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Slice at %d is %d\n"</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> slice1<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"\nThe length of slice1 is %d\n"</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>slice1<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"The capacity of slice1 is %d\n"</span><span class="token punctuation">,</span> <span class="token function">cap</span><span class="token punctuation">(</span>slice1<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p>
<pre><code>Slice at 0 is 0  
Slice at 1 is 5  
Slice at 2 is 10  
Slice at 3 is 15  
Slice at 4 is 20  
Slice at 5 is 25  
Slice at 6 is 30  
Slice at 7 is 35  
Slice at 8 is 40  
Slice at 9 is 45  

The length of slice1 is 10  
The capacity of slice1 is 10  
</code></pre>
<p>因为字符串是纯粹不可变的字节数组，它们也可以被切分成切片。</p>
<p>练习 7.4： <a href="examples/chapter_7/fibonacci_funcarray.go">fibonacci_funcarray.go</a>: 为练习 7.3 写一个新的版本，主函数调用一个使用序列个数作为参数的函数，该函数返回一个大小为序列个数的 Fibonacci 切片。</p>
<h2 id="_7-2-4-new-和-make-的区别" tabindex="-1"><a class="header-anchor" href="#_7-2-4-new-和-make-的区别"><span>7.2.4 new() 和 make() 的区别</span></a></h2>
<p>看起来二者没有什么区别，都在堆上分配内存，但是它们的行为不同，适用于不同的类型。</p>
<ul>
<li><code v-pre>new(T)</code> 为每个新的类型 <code v-pre>T</code> 分配一片内存，初始化为 <code v-pre>0</code> 并且返回类型为 <code v-pre>*T</code> 的内存地址：这种方法 <strong>返回一个指向类型为 <code v-pre>T</code>，值为 <code v-pre>0</code> 的地址的指针</strong>，它适用于值类型如数组和结构体（参见<RouteLink to="/chapter-2/10.0.html">第 10 章</RouteLink>）；它相当于 <code v-pre>&amp;T{}</code>。</li>
<li><code v-pre>make(T)</code> <strong>返回一个类型为 T 的初始值</strong>，它只适用于 3 种内建的引用类型：切片、<code v-pre>map</code> 和 <code v-pre>channel</code>（参见<RouteLink to="/chapter-2/08.0.html">第 8 章</RouteLink>和<RouteLink to="/chapter-2/13.0.html">第 13 章</RouteLink>）。</li>
</ul>
<p>换言之，<code v-pre>new()</code> 函数分配内存，<code v-pre>make()</code> 函数初始化；下图给出了区别：</p>
<img src="/images/7.2_fig7.3.png" style="zoom:50%;" />
<p>在图 7.3 的第一幅图中：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">var</span> p <span class="token operator">*</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span> <span class="token operator">=</span> <span class="token function">new</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token comment">// *p == nil; with len and cap 0</span></span>
<span class="line">p <span class="token operator">:=</span> <span class="token function">new</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>在第二幅图中， <code v-pre>p := make([]int, 0)</code> ，切片 已经被初始化，但是指向一个空的数组。</p>
<p>以上两种方式实用性都不高。下面的方法：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">var</span> v <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span> <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>或者</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">v <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>这样分配一个有 50 个 <code v-pre>int</code> 值的数组，并且创建了一个长度为 10，容量为 50 的切片 <code v-pre>v</code>，该切片指向数组的前 10 个元素。</p>
<p><strong>问题 7.3</strong> 给定 <code v-pre>s := make([]byte, 5)</code>，<code v-pre>len(s)</code> 和 <code v-pre>cap(s)</code> 分别是多少？<code v-pre>s = s[2:4]</code>，<code v-pre>len(s)</code> 和 <code v-pre>cap(s)</code> 又分别是多少？</p>
<p><strong>问题 7.4</strong> 假设 <code v-pre>s1 := []byte{'p', 'o', 'e', 'm'}</code> 且 <code v-pre>s2 := s1[2:]</code>，<code v-pre>s2</code> 的值是多少？如果我们执行 <code v-pre>s2[1] = 't'</code>，<code v-pre>s1</code> 和 <code v-pre>s2</code> 现在的值又分别是多少？</p>
<p><em>译者注：如何理解 new、make、slice、map、channel 的关系</em></p>
<p><em>1.slice、map 以及 channel 都是 golang 内建的一种引用类型，三者在内存中存在多个组成部分，
需要对内存组成部分初始化后才能使用，而 make 就是对三者进行初始化的一种操作方式</em></p>
<p><em>2. new 获取的是存储指定变量内存地址的一个变量，对于变量内部结构并不会执行相应的初始化操作，
所以 slice、map、channel 需要 make 进行初始化并获取对应的内存地址，而非 new 简单的获取内存地址</em></p>
<h2 id="_7-2-5-多维切片" tabindex="-1"><a class="header-anchor" href="#_7-2-5-多维切片"><span>7.2.5 多维切片</span></a></h2>
<p>和数组一样，切片通常也是一维的，但是也可以由一维组合成高维。通过分片的分片（或者切片的数组），长度可以任意动态变化，所以 Go 语言的多维切片可以任意切分。而且，内层的切片必须单独分配（通过 <code v-pre>make()</code> 函数）。</p>
<h2 id="_7-2-6-bytes-包" tabindex="-1"><a class="header-anchor" href="#_7-2-6-bytes-包"><span>7.2.6 bytes 包</span></a></h2>
<p>类型 <code v-pre>[]byte</code> 的切片十分常见，Go 语言有一个 <code v-pre>bytes</code> 包专门用来提供这种类型的操作方法。</p>
<p><code v-pre>bytes</code> 包和字符串包十分类似（参见<RouteLink to="/chapter-2/04.7.html">第 4.7 节</RouteLink>）。而且它还包含一个十分有用的类型 <code v-pre>Buffer</code>:</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">import</span> <span class="token string">"bytes"</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">type</span> Buffer <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token operator">...</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是一个长度可变的 <code v-pre>bytes</code> 的 buffer，提供 <code v-pre>Read()</code> 和 <code v-pre>Write()</code> 方法，因为读写长度未知的 <code v-pre>bytes</code> 最好使用 <code v-pre>buffer</code>。</p>
<p><code v-pre>Buffer</code> 可以这样定义：<code v-pre>var buffer bytes.Buffer</code>。</p>
<p>或者使用 <code v-pre>new()</code> 获得一个指针：<code v-pre>var r *bytes.Buffer = new(bytes.Buffer)</code>。</p>
<p>或者通过函数：<code v-pre>func NewBuffer(buf []byte) *Buffer</code>，创建一个 <code v-pre>Buffer</code> 对象并且用 <code v-pre>buf</code> 初始化好；<code v-pre>NewBuffer</code> 最好用在从 <code v-pre>buf</code> 读取的时候使用。</p>
<p><strong>通过 buffer 串联字符串</strong></p>
<p>类似于 Java 的 StringBuilder 类。</p>
<p>在下面的代码段中，我们创建一个 <code v-pre>buffer</code>，通过 <code v-pre>buffer.WriteString(s)</code> 方法将字符串 <code v-pre>s</code> 追加到后面，最后再通过 <code v-pre>buffer.String()</code> 方法转换为 <code v-pre>string</code>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">var</span> buffer bytes<span class="token punctuation">.</span>Buffer</span>
<span class="line"><span class="token keyword">for</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">if</span> s<span class="token punctuation">,</span> ok <span class="token operator">:=</span> <span class="token function">getNextString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> ok <span class="token punctuation">{</span> <span class="token comment">//method getNextString() not shown here</span></span>
<span class="line">		buffer<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token keyword">break</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line">fmt<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span>buffer<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">"\n"</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种实现方式比使用 <code v-pre>+=</code> 要更节省内存和 CPU，尤其是要串联的字符串数目特别多的时候。</p>
<p><strong>练习 7.5</strong></p>
<p>给定切片 <code v-pre>sl</code>，将一个 <code v-pre>[]byte</code> 数组追加到 <code v-pre>sl</code> 后面。写一个函数 <code v-pre>Append(slice, data []byte) []byte</code>，该函数在 <code v-pre>sl</code> 不能存储更多数据的时候自动扩容。</p>
<p><strong>练习 7.6</strong></p>
<p>把一个缓存 <code v-pre>buf</code> 分片成两个切片：第一个是前 <code v-pre>n</code> 个 bytes，后一个是剩余的，用一行代码实现。</p>
</div></template>


