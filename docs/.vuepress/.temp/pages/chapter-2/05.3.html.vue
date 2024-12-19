<template><div><h1 id="_5-3-switch-结构" tabindex="-1"><a class="header-anchor" href="#_5-3-switch-结构"><span>5.3 switch 结构</span></a></h1>
<p>相比较 C 和 Java 等其它语言而言，Go 语言中的 <code v-pre>switch</code> 结构使用上更加灵活。它接受任意形式的表达式：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">switch</span> var1 <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">case</span> val1<span class="token punctuation">:</span></span>
<span class="line">		<span class="token operator">...</span></span>
<span class="line">	<span class="token keyword">case</span> val2<span class="token punctuation">:</span></span>
<span class="line">		<span class="token operator">...</span></span>
<span class="line">	<span class="token keyword">default</span><span class="token punctuation">:</span></span>
<span class="line">		<span class="token operator">...</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>变量 <code v-pre>var1</code> 可以是任何类型，而 <code v-pre>val1</code> 和 <code v-pre>val2</code> 则可以是同类型的任意值。类型不被局限于常量或整数，但必须是相同的类型；或者最终结果为相同类型的表达式。前花括号 <code v-pre>{</code> 必须和 <code v-pre>switch</code> 关键字在同一行。</p>
<p>您可以同时测试多个可能符合条件的值，使用逗号分割它们，例如：<code v-pre>case val1, val2, val3</code>。</p>
<p>每一个 <code v-pre>case</code> 分支都是唯一的，从上至下逐一测试，直到匹配为止。（ Go 语言使用快速的查找算法来测试 <code v-pre>switch</code> 条件与 <code v-pre>case</code> 分支的匹配情况，直到算法匹配到某个 <code v-pre>case</code> 或者进入 <code v-pre>default</code> 条件为止。）</p>
<p>一旦成功地匹配到某个分支，在执行完相应代码后就会退出整个 <code v-pre>switch</code> 代码块，也就是说您不需要特别使用 <code v-pre>break</code> 语句来表示结束。</p>
<p>因此，程序也不会自动地去执行下一个分支的代码。如果在执行完每个分支的代码后，还希望继续执行后续分支的代码，可以使用 <code v-pre>fallthrough</code> 关键字来达到目的。</p>
<p>因此：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">switch</span> i <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">case</span> <span class="token number">0</span><span class="token punctuation">:</span> <span class="token comment">// 空分支，只有当 i == 0 时才会进入分支</span></span>
<span class="line">	<span class="token keyword">case</span> <span class="token number">1</span><span class="token punctuation">:</span></span>
<span class="line">		<span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 当 i == 0 时函数不会被调用</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>并且：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">switch</span> i <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">case</span> <span class="token number">0</span><span class="token punctuation">:</span> <span class="token keyword">fallthrough</span></span>
<span class="line">	<span class="token keyword">case</span> <span class="token number">1</span><span class="token punctuation">:</span></span>
<span class="line">		<span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 当 i == 0 时函数也会被调用</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 <code v-pre>case ...:</code> 语句之后，您不需要使用花括号将多行语句括起来，但您可以在分支中进行任意形式的编码。当代码块只有一行时，可以直接放置在 <code v-pre>case</code> 语句之后。</p>
<p>您同样可以使用 <code v-pre>return</code> 语句来提前结束代码块的执行。当您在 <code v-pre>switch</code> 语句块中使用 <code v-pre>return</code> 语句，并且您的函数是有返回值的，您还需要在 switch 之后添加相应的 <code v-pre>return</code> 语句以确保函数始终会返回。</p>
<p>可选的 <code v-pre>default</code> 分支可以出现在任何顺序，但最好将它放在最后。它的作用类似与 if-else 语句中的 <code v-pre>else</code>，表示不符合任何已给出条件时，执行相关语句。</p>
<p>示例 5.4 <a href="examples/chapter_5/switch1.go">switch1.go</a>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token string">"fmt"</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">var</span> num1 <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">100</span></span>
<span class="line"></span>
<span class="line">	<span class="token keyword">switch</span> num1 <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">case</span> <span class="token number">98</span><span class="token punctuation">,</span> <span class="token number">99</span><span class="token punctuation">:</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"It's equal to 98"</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">case</span> <span class="token number">100</span><span class="token punctuation">:</span> </span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"It's equal to 100"</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">default</span><span class="token punctuation">:</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"It's not equal to 98 or 100"</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p>
<pre><code>It's equal to 100
</code></pre>
<p>在第 12.1 节，我们会使用 <code v-pre>switch</code> 语句判断从键盘输入的字符（详见<RouteLink to="/chapter-2/12.2.html">第 12.2 节</RouteLink> 的 <a href="./examples/chapter_12/switch.go">switch.go</a>）。<code v-pre>switch</code> 语句的第二种形式是不提供任何被判断的值（实际上默认为判断是否为 <code v-pre>true</code>），然后在每个 <code v-pre>case</code> 分支中进行测试不同的条件。当任一分支的测试结果为 <code v-pre>true</code> 时，该分支的代码会被执行。这看起来非常像链式的 if-else 语句，但是在测试条件非常多的情况下，提供了可读性更好的书写方式。</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">switch</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">case</span> condition1<span class="token punctuation">:</span></span>
<span class="line">		<span class="token operator">...</span></span>
<span class="line">	<span class="token keyword">case</span> condition2<span class="token punctuation">:</span></span>
<span class="line">		<span class="token operator">...</span></span>
<span class="line">	<span class="token keyword">default</span><span class="token punctuation">:</span></span>
<span class="line">		<span class="token operator">...</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例如：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">switch</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">case</span> i <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">:</span></span>
<span class="line">		<span class="token function">f1</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">case</span> i <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">:</span></span>
<span class="line">		<span class="token function">f2</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">case</span> i <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">:</span></span>
<span class="line">		<span class="token function">f3</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>任何支持进行相等判断的类型都可以作为测试表达式的条件，包括 <code v-pre>int</code>、<code v-pre>string</code>、指针等。</p>
<p>示例 5.4 <a href="examples/chapter_5/switch2.go">switch2.go</a>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token string">"fmt"</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">var</span> num1 <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">7</span></span>
<span class="line"></span>
<span class="line">	<span class="token keyword">switch</span> <span class="token punctuation">{</span></span>
<span class="line">	    <span class="token keyword">case</span> num1 <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">:</span></span>
<span class="line">		    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Number is negative"</span><span class="token punctuation">)</span></span>
<span class="line">	    <span class="token keyword">case</span> num1 <span class="token operator">></span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> num1 <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">:</span></span>
<span class="line">		    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Number is between 0 and 10"</span><span class="token punctuation">)</span></span>
<span class="line">	    <span class="token keyword">default</span><span class="token punctuation">:</span></span>
<span class="line">		    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Number is 10 or greater"</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p>
<pre><code>Number is between 0 and 10
</code></pre>
<p>switch 语句的第三种形式是包含一个初始化语句：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">switch</span> initialization <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">case</span> val1<span class="token punctuation">:</span></span>
<span class="line">		<span class="token operator">...</span></span>
<span class="line">	<span class="token keyword">case</span> val2<span class="token punctuation">:</span></span>
<span class="line">		<span class="token operator">...</span></span>
<span class="line">	<span class="token keyword">default</span><span class="token punctuation">:</span></span>
<span class="line">		<span class="token operator">...</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种形式可以非常优雅地进行条件判断：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">switch</span> result <span class="token operator">:=</span> <span class="token function">calculate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">case</span> result <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">:</span></span>
<span class="line">		<span class="token operator">...</span></span>
<span class="line">	<span class="token keyword">case</span> result <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">:</span></span>
<span class="line">		<span class="token operator">...</span></span>
<span class="line">	<span class="token keyword">default</span><span class="token punctuation">:</span></span>
<span class="line">		<span class="token comment">// 0</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在下面这个代码片段中，变量 <code v-pre>a</code> 和 <code v-pre>b</code> 被平行初始化，然后作为判断条件：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">switch</span> a<span class="token punctuation">,</span> b <span class="token operator">:=</span> x<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> y<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">case</span> a <span class="token operator">&lt;</span> b<span class="token punctuation">:</span> t <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span></span>
<span class="line">	<span class="token keyword">case</span> a <span class="token operator">==</span> b<span class="token punctuation">:</span> t <span class="token operator">=</span> <span class="token number">0</span></span>
<span class="line">	<span class="token keyword">case</span> a <span class="token operator">></span> b<span class="token punctuation">:</span> t <span class="token operator">=</span> <span class="token number">1</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>switch</code> 语句还可以被用于 type-switch（详见<RouteLink to="/chapter-2/11.4.html">第 11.4 节</RouteLink>）来判断某个 <code v-pre>interface</code> 变量中实际存储的变量类型。</p>
<p><strong>问题 5.1：</strong></p>
<p>请说出下面代码片段输出的结果：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">	k <span class="token operator">:=</span> <span class="token number">6</span></span>
<span class="line">	<span class="token keyword">switch</span> k <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">case</span> <span class="token number">4</span><span class="token punctuation">:</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"was &lt;= 4"</span><span class="token punctuation">)</span></span>
<span class="line">		<span class="token keyword">fallthrough</span></span>
<span class="line">	<span class="token keyword">case</span> <span class="token number">5</span><span class="token punctuation">:</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"was &lt;= 5"</span><span class="token punctuation">)</span></span>
<span class="line">		<span class="token keyword">fallthrough</span></span>
<span class="line">	<span class="token keyword">case</span> <span class="token number">6</span><span class="token punctuation">:</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"was &lt;= 6"</span><span class="token punctuation">)</span></span>
<span class="line">		<span class="token keyword">fallthrough</span></span>
<span class="line">	<span class="token keyword">case</span> <span class="token number">7</span><span class="token punctuation">:</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"was &lt;= 7"</span><span class="token punctuation">)</span></span>
<span class="line">		<span class="token keyword">fallthrough</span></span>
<span class="line">	<span class="token keyword">case</span> <span class="token number">8</span><span class="token punctuation">:</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"was &lt;= 8"</span><span class="token punctuation">)</span></span>
<span class="line">		<span class="token keyword">fallthrough</span></span>
<span class="line">	<span class="token keyword">default</span><span class="token punctuation">:</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"default case"</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>练习 5.2：</strong> <a href="exercises/chapter_5/season.go">season.go</a>：</p>
<p>写一个 <code v-pre>Season()</code> 函数，要求接受一个代表月份的数字，然后返回所代表月份所在季节的名称（不用考虑月份的日期）。</p>
</div></template>


