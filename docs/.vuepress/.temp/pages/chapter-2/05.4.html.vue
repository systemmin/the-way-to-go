<template><div><h1 id="_5-4-for-结构" tabindex="-1"><a class="header-anchor" href="#_5-4-for-结构"><span>5.4 for 结构</span></a></h1>
<p>如果想要重复执行某些语句，Go 语言中您只有 <code v-pre>for</code> 结构可以使用。不要小看它，这个 <code v-pre>for</code> 结构比其它语言中的更为灵活。</p>
<p><strong>注意事项</strong> 其它许多语言中也没有发现和 do-while 完全对等的 <code v-pre>for</code> 结构，可能是因为这种需求并不是那么强烈。</p>
<h2 id="_5-4-1-基于计数器的迭代" tabindex="-1"><a class="header-anchor" href="#_5-4-1-基于计数器的迭代"><span>5.4.1 基于计数器的迭代</span></a></h2>
<p>文件 for1.go 中演示了最简单的基于计数器的迭代，基本形式为：</p>
<pre><code>for 初始化语句; 条件语句; 修饰语句 {}
</code></pre>
<p>示例 5.6 <a href="examples/chapter_5/for1.go">for1.go</a>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token string">"fmt"</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"This is the %d iteration\n"</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p>
<pre><code>This is the 0 iteration
This is the 1 iteration
This is the 2 iteration
This is the 3 iteration
This is the 4 iteration
</code></pre>
<p>由花括号括起来的代码块会被重复执行已知次数，该次数是根据计数器（此例为 <code v-pre>i</code>）决定的。循环开始前，会执行且仅会执行一次初始化语句 <code v-pre>i := 0;</code>；这比在循环之前声明更为简短。紧接着的是条件语句 <code v-pre>i &lt; 5;</code>，在每次循环开始前都会进行判断，一旦判断结果为 <code v-pre>false</code>，则退出循环体。最后一部分为修饰语句 <code v-pre>i++</code>，一般用于增加或减少计数器。</p>
<p>这三部分组成的循环的头部，它们之间使用分号 <code v-pre>;</code> 相隔，但并不需要括号 <code v-pre>()</code> 将它们括起来。例如：<code v-pre>for (i = 0; i &lt; 10; i++) { }</code>，这是无效的代码！</p>
<p>同样的，左花括号 <code v-pre>{</code> 必须和 for 语句在同一行，计数器的生命周期在遇到右花括号 <code v-pre>}</code> 时便终止。一般习惯使用 i、j、z 或 ix 等较短的名称命名计数器。</p>
<p>特别注意，永远不要在循环体内修改计数器，这在任何语言中都是非常差的实践！</p>
<p>您还可以在循环中同时使用多个计数器：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">for</span> i<span class="token punctuation">,</span> j <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">,</span> N<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> j<span class="token punctuation">;</span> i<span class="token punctuation">,</span> j <span class="token operator">=</span> i<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">,</span> j<span class="token operator">-</span><span class="token number">1</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>这得益于 Go 语言具有的平行赋值的特性（可以查看<RouteLink to="/chapter-2/07.0.html">第 7 章</RouteLink> <a href="./examples/chapter_7/string_reverse.go">string_reverse.go</a> 中反转数组的示例）。</p>
<p>您可以将两个 for 循环嵌套起来：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">for</span> i<span class="token operator">:=</span><span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">&lt;</span><span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">for</span> j<span class="token operator">:=</span><span class="token number">0</span><span class="token punctuation">;</span> j<span class="token operator">&lt;</span><span class="token number">10</span><span class="token punctuation">;</span> j<span class="token operator">++</span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token function">println</span><span class="token punctuation">(</span>j<span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果您使用 for 循环迭代一个 Unicode 编码的字符串，会发生什么？</p>
<p>示例 5.7 <a href="examples/chapter_5/for_string.go">for_string.go</a>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token string">"fmt"</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	str <span class="token operator">:=</span> <span class="token string">"Go is a beautiful language!"</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"The length of str is: %d\n"</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">for</span> ix <span class="token operator">:=</span><span class="token number">0</span><span class="token punctuation">;</span> ix <span class="token operator">&lt;</span> <span class="token function">len</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">;</span> ix<span class="token operator">++</span> <span class="token punctuation">{</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Character on position %d is: %c \n"</span><span class="token punctuation">,</span> ix<span class="token punctuation">,</span> str<span class="token punctuation">[</span>ix<span class="token punctuation">]</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	str2 <span class="token operator">:=</span> <span class="token string">"日本語"</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"The length of str2 is: %d\n"</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>str2<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">for</span> ix <span class="token operator">:=</span><span class="token number">0</span><span class="token punctuation">;</span> ix <span class="token operator">&lt;</span> <span class="token function">len</span><span class="token punctuation">(</span>str2<span class="token punctuation">)</span><span class="token punctuation">;</span> ix<span class="token operator">++</span> <span class="token punctuation">{</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Character on position %d is: %c \n"</span><span class="token punctuation">,</span> ix<span class="token punctuation">,</span> str2<span class="token punctuation">[</span>ix<span class="token punctuation">]</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p>
<pre><code>The length of str is: 27
Character on position 0 is: G 
Character on position 1 is: o 
Character on position 2 is:   
Character on position 3 is: i 
Character on position 4 is: s 
Character on position 5 is:   
Character on position 6 is: a 
Character on position 7 is:   
Character on position 8 is: b 
Character on position 9 is: e 
Character on position 10 is: a 
Character on position 11 is: u 
Character on position 12 is: t 
Character on position 13 is: i 
Character on position 14 is: f 
Character on position 15 is: u 
Character on position 16 is: l 
Character on position 17 is:   
Character on position 18 is: l 
Character on position 19 is: a 
Character on position 20 is: n 
Character on position 21 is: g 
Character on position 22 is: u 
Character on position 23 is: a 
Character on position 24 is: g 
Character on position 25 is: e 
Character on position 26 is: ! 
The length of str2 is: 9
Character on position 0 is: æ 
Character on position 1 is:  
Character on position 2 is: ¥ 
Character on position 3 is: æ 
Character on position 4 is:  
Character on position 5 is: ¬ 
Character on position 6 is: è 
Character on position 7 is: ª 
Character on position 8 is:  
</code></pre>
<p>如果我们打印 <code v-pre>str</code> 和 <code v-pre>str2</code> 的长度，会分别得到 <code v-pre>27</code> 和 <code v-pre>9</code>。</p>
<p>由此我们可以发现，ASCII 编码的字符占用 1 个字节，既每个索引都指向不同的字符，而非 ASCII 编码的字符（占有 2 到 4 个字节）不能单纯地使用索引来判断是否为同一个字符。我们会在<RouteLink to="/chapter-2/05.4.html">第 5.4.4 节</RouteLink> 解决这个问题。</p>
<h3 id="练习题" tabindex="-1"><a class="header-anchor" href="#练习题"><span>练习题</span></a></h3>
<p><strong>练习 5.4</strong> <a href="exercises/chapter_5/for_loop.go">for_loop.go</a></p>
<ol>
<li>使用 <code v-pre>for</code> 结构创建一个简单的循环。要求循环 15 次然后使用 <code v-pre>fmt</code> 包来打印计数器的值。</li>
<li>使用 <code v-pre>goto</code> 语句重写循环，要求不能使用 <code v-pre>for</code> 关键字。</li>
</ol>
<p><strong>练习 5.5</strong> <a href="exercises/chapter_5/for_character.go">for_character.go</a></p>
<p>创建一个程序，要求能够打印类似下面的结果（尾行达 25 个字符为止）：</p>
<pre><code>G
GG
GGG
GGGG
GGGGG
GGGGGG
</code></pre>
<ol>
<li>使用 2 层嵌套 for 循环。</li>
<li>仅用 1 层 for 循环以及字符串连接。</li>
</ol>
<p><strong>练习 5.6</strong> <a href="exercises/chapter_5/bitwise_complement.go">bitwise_complement.go</a></p>
<p>使用按位补码从 0 到 10，使用位表达式 <code v-pre>%b</code> 来格式化输出。</p>
<p><strong>练习 5.7</strong> Fizz-Buzz 问题：<a href="exercises/chapter_5/fizzbuzz.go">fizzbuzz.go</a></p>
<p>写一个从 1 打印到 100 的程序，但是每当遇到 3 的倍数时，不打印相应的数字，但打印一次 &quot;Fizz&quot;。遇到 5 的倍数时，打印 <code v-pre>Buzz</code> 而不是相应的数字。对于同时为 3 和 5 的倍数的数，打印 <code v-pre>FizzBuzz</code>（提示：使用 switch 语句）。</p>
<p><strong>练习 5.8</strong> <a href="exercises/chapter_5/rectangle_stars.go">rectangle_stars.go</a></p>
<p>使用 <code v-pre>*</code> 符号打印宽为 20，高为 10 的矩形。</p>
<h2 id="_5-4-2-基于条件判断的迭代" tabindex="-1"><a class="header-anchor" href="#_5-4-2-基于条件判断的迭代"><span>5.4.2 基于条件判断的迭代</span></a></h2>
<p>for 结构的第二种形式是没有头部的条件判断迭代（类似其它语言中的 while 循环），基本形式为：<code v-pre>for 条件语句 {}</code>。</p>
<p>您也可以认为这是没有初始化语句和修饰语句的 for 结构，因此 <code v-pre>;;</code> 便是多余的了。</p>
<p>Listing 5.8 <a href="examples/chapter_5/for2.go">for2.go</a>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token string">"fmt"</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">var</span> i <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">5</span></span>
<span class="line"></span>
<span class="line">	<span class="token keyword">for</span> i <span class="token operator">>=</span> <span class="token number">0</span> <span class="token punctuation">{</span></span>
<span class="line">		i <span class="token operator">=</span> i <span class="token operator">-</span> <span class="token number">1</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"The variable i is now: %d\n"</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p>
<pre><code>The variable i is now: 4
The variable i is now: 3
The variable i is now: 2
The variable i is now: 1
The variable i is now: 0
The variable i is now: -1
</code></pre>
<h2 id="_5-4-3-无限循环" tabindex="-1"><a class="header-anchor" href="#_5-4-3-无限循环"><span>5.4.3 无限循环</span></a></h2>
<p>条件语句是可以被省略的，如 <code v-pre>i:=0; ; i++</code> 或 <code v-pre>for { }</code> 或 <code v-pre>for ;; { }</code>（<code v-pre>;;</code> 会在使用 gofmt 时被移除）：这些循环的本质就是无限循环。最后一个形式也可以被改写为 <code v-pre>for true { }</code>，但一般情况下都会直接写 <code v-pre>for { }</code>。</p>
<p>如果 for 循环的头部没有条件语句，那么就会认为条件永远为 true，因此循环体内必须有相关的条件判断以确保会在某个时刻退出循环。</p>
<p>想要直接退出循环体，可以使用 break 语句（第 5.5 节）或 return 语句直接返回（第 6.1 节）。</p>
<p>但这两者之间有所区别，break 只是退出当前的循环体，而 return 语句提前对函数进行返回，不会执行后续的代码。</p>
<p>无限循环的经典应用是服务器，用于不断等待和接受新的请求。</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">for</span> t<span class="token punctuation">,</span> err <span class="token operator">=</span> p<span class="token punctuation">.</span><span class="token function">Token</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">==</span> <span class="token boolean">nil</span><span class="token punctuation">;</span> t<span class="token punctuation">,</span> err <span class="token operator">=</span> p<span class="token punctuation">.</span><span class="token function">Token</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token operator">...</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-4-4-for-range-结构" tabindex="-1"><a class="header-anchor" href="#_5-4-4-for-range-结构"><span>5.4.4 for-range 结构</span></a></h2>
<p>这是 Go 特有的一种的迭代结构，您会发现它在许多情况下都非常有用。它可以迭代任何一个集合（包括数组和 <code v-pre>map</code>，详见第 <RouteLink to="/chapter-2/07.0.html">7</RouteLink> 和 <RouteLink to="/chapter-2/08.0.html">8</RouteLink> 章）。语法上很类似其它语言中的 foreach 语句，但您依旧可以获得每次迭代所对应的索引。一般形式为：<code v-pre>for ix, val := range coll { }</code>。</p>
<p>要注意的是，<code v-pre>val</code> 始终为集合中对应索引的值拷贝，因此它一般只具有只读性质，对它所做的任何修改都不会影响到集合中原有的值（<strong>译者注：如果 <code v-pre>val</code> 为指针，则会产生指针的拷贝，依旧可以修改集合中的原值</strong>）。一个字符串是 Unicode 编码的字符（或称之为 <code v-pre>rune</code>）集合，因此您也可以用它迭代字符串：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">for</span> pos<span class="token punctuation">,</span> char <span class="token operator">:=</span> <span class="token keyword">range</span> str <span class="token punctuation">{</span></span>
<span class="line"><span class="token operator">...</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>每个 <code v-pre>rune</code> 字符和索引在 for-range 循环中是一一对应的。它能够自动根据 UTF-8 规则识别 Unicode 编码的字符。</p>
<p>示例 5.9 <a href="examples/chapter_5/range_string.go">range_string.go</a>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token string">"fmt"</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	str <span class="token operator">:=</span> <span class="token string">"Go is a beautiful language!"</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"The length of str is: %d\n"</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">for</span> pos<span class="token punctuation">,</span> char <span class="token operator">:=</span> <span class="token keyword">range</span> str <span class="token punctuation">{</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Character on position %d is: %c \n"</span><span class="token punctuation">,</span> pos<span class="token punctuation">,</span> char<span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	str2 <span class="token operator">:=</span> <span class="token string">"Chinese: 日本語"</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"The length of str2 is: %d\n"</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>str2<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">for</span> pos<span class="token punctuation">,</span> char <span class="token operator">:=</span> <span class="token keyword">range</span> str2 <span class="token punctuation">{</span></span>
<span class="line">    	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"character %c starts at byte position %d\n"</span><span class="token punctuation">,</span> char<span class="token punctuation">,</span> pos<span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"index int(rune) rune    char bytes"</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">for</span> index<span class="token punctuation">,</span> <span class="token builtin">rune</span> <span class="token operator">:=</span> <span class="token keyword">range</span> str2 <span class="token punctuation">{</span></span>
<span class="line">    	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%-2d      %d      %U '%c' % X\n"</span><span class="token punctuation">,</span> index<span class="token punctuation">,</span> <span class="token builtin">rune</span><span class="token punctuation">,</span> <span class="token builtin">rune</span><span class="token punctuation">,</span> <span class="token builtin">rune</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token function">string</span><span class="token punctuation">(</span><span class="token builtin">rune</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">The length of str is: 27</span>
<span class="line">Character on position 0 is: G </span>
<span class="line">Character on position 1 is: o </span>
<span class="line">Character on position 2 is:   </span>
<span class="line">Character on position 3 is: i </span>
<span class="line">Character on position 4 is: s </span>
<span class="line">Character on position 5 is:   </span>
<span class="line">Character on position 6 is: a </span>
<span class="line">Character on position 7 is:   </span>
<span class="line">Character on position 8 is: b </span>
<span class="line">Character on position 9 is: e </span>
<span class="line">Character on position 10 is: a </span>
<span class="line">Character on position 11 is: u </span>
<span class="line">Character on position 12 is: t </span>
<span class="line">Character on position 13 is: i </span>
<span class="line">Character on position 14 is: f </span>
<span class="line">Character on position 15 is: u </span>
<span class="line">Character on position 16 is: l </span>
<span class="line">Character on position 17 is:   </span>
<span class="line">Character on position 18 is: l </span>
<span class="line">Character on position 19 is: a </span>
<span class="line">Character on position 20 is: n </span>
<span class="line">Character on position 21 is: g </span>
<span class="line">Character on position 22 is: u </span>
<span class="line">Character on position 23 is: a </span>
<span class="line">Character on position 24 is: g </span>
<span class="line">Character on position 25 is: e </span>
<span class="line">Character on position 26 is: ! </span>
<span class="line"></span>
<span class="line">The length of str2 is: 18</span>
<span class="line">character C starts at byte position 0</span>
<span class="line">character h starts at byte position 1</span>
<span class="line">character i starts at byte position 2</span>
<span class="line">character n starts at byte position 3</span>
<span class="line">character e starts at byte position 4</span>
<span class="line">character s starts at byte position 5</span>
<span class="line">character e starts at byte position 6</span>
<span class="line">character : starts at byte position 7</span>
<span class="line">character   starts at byte position 8</span>
<span class="line">character 日 starts at byte position 9</span>
<span class="line">character 本 starts at byte position 12</span>
<span class="line">character 語 starts at byte position 15</span>
<span class="line"></span>
<span class="line">index int(rune) rune    char bytes</span>
<span class="line">0       67      U+0043 'C' 43</span>
<span class="line">1       104      U+0068 'h' 68</span>
<span class="line">2       105      U+0069 'i' 69</span>
<span class="line">3       110      U+006E 'n' 6E</span>
<span class="line">4       101      U+0065 'e' 65</span>
<span class="line">5       115      U+0073 's' 73</span>
<span class="line">6       101      U+0065 'e' 65</span>
<span class="line">7       58      U+003A ':' 3A</span>
<span class="line">8       32      U+0020 ' ' 20</span>
<span class="line">9       26085      U+65E5 '日' E6 97 A5</span>
<span class="line">12      26412      U+672C '本' E6 9C AC</span>
<span class="line">15      35486      U+8A9E '語' E8 AA 9E</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请将输出结果和 Listing 5.7（<a href="examples/chapter_5/for_string.go">for_string.go</a>）进行对比。</p>
<p>我们可以看到，常用英文字符使用 1 个字节表示，而汉字（<strong>译者注：严格来说，“Chinese: 日本語”的 Chinese 应该是 Japanese</strong>）使用 3 个字符表示。</p>
<p><strong>练习 5.9</strong> 以下程序的输出结果是什么？</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">var</span> v <span class="token builtin">int</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%d "</span><span class="token punctuation">,</span> v<span class="token punctuation">)</span></span>
<span class="line">	v <span class="token operator">=</span> <span class="token number">5</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>问题 5.2：</strong> 请描述以下 for 循环的输出结果：</p>
<ol>
<li></li>
</ol>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Value of i is now:"</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li></li>
</ol>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">3</span><span class="token punctuation">;</span> <span class="token punctuation">{</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Value of i:"</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3">
<li></li>
</ol>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">s <span class="token operator">:=</span> <span class="token string">""</span></span>
<span class="line"><span class="token keyword">for</span> <span class="token punctuation">;</span> s <span class="token operator">!=</span> <span class="token string">"aaaaa"</span><span class="token punctuation">;</span> <span class="token punctuation">{</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Value of s:"</span><span class="token punctuation">,</span> s<span class="token punctuation">)</span></span>
<span class="line">	s <span class="token operator">=</span> s <span class="token operator">+</span> <span class="token string">"a"</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4">
<li></li>
</ol>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">for</span> i<span class="token punctuation">,</span> j<span class="token punctuation">,</span> s <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token string">"a"</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">3</span> <span class="token operator">&amp;&amp;</span> j <span class="token operator">&lt;</span> <span class="token number">100</span> <span class="token operator">&amp;&amp;</span> s <span class="token operator">!=</span> <span class="token string">"aaaaa"</span><span class="token punctuation">;</span> i<span class="token punctuation">,</span> j<span class="token punctuation">,</span></span>
<span class="line">	s <span class="token operator">=</span> i<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">,</span> j<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">,</span> s <span class="token operator">+</span> <span class="token string">"a"</span> <span class="token punctuation">{</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Value of i, j, s:"</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> j<span class="token punctuation">,</span> s<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


