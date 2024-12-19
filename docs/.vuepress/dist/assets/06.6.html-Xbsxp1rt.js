import{_ as i,c as o,a as l,b as a,f as s,d as e,e as t,r as c,o as u}from"./app-DtITwm2S.js";const r={};function d(k,n){const p=c("RouteLink");return u(),o("div",null,[n[20]||(n[20]=l(`<h1 id="_6-6-递归函数" tabindex="-1"><a class="header-anchor" href="#_6-6-递归函数"><span>6.6 递归函数</span></a></h1><p>当一个函数在其函数体内调用自身，则称之为递归。最经典的例子便是计算斐波那契数列，即前两个数为 1，从第三个数开始每个数均为前两个数之和。</p><p>数列如下所示：</p><pre><code>1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946, …
</code></pre><p>下面的程序可用于生成该数列（示例 6.13 <a href="examples/chapter_6/fibonacci.go">fibonacci.go</a>）：</p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	result <span class="token operator">:=</span> <span class="token number">0</span></span>
<span class="line">	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span></span>
<span class="line">		result <span class="token operator">=</span> <span class="token function">fibonacci</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;fibonacci(%d) is: %d\\n&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> result<span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">fibonacci</span><span class="token punctuation">(</span>n <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>res <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">if</span> n <span class="token operator">&lt;=</span> <span class="token number">1</span> <span class="token punctuation">{</span></span>
<span class="line">		res <span class="token operator">=</span> <span class="token number">1</span></span>
<span class="line">	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">		res <span class="token operator">=</span> <span class="token function">fibonacci</span><span class="token punctuation">(</span>n<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token function">fibonacci</span><span class="token punctuation">(</span>n<span class="token operator">-</span><span class="token number">2</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	<span class="token keyword">return</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">fibonacci(0) is: 1</span>
<span class="line">fibonacci(1) is: 1</span>
<span class="line">fibonacci(2) is: 2</span>
<span class="line">fibonacci(3) is: 3</span>
<span class="line">fibonacci(4) is: 5</span>
<span class="line">fibonacci(5) is: 8</span>
<span class="line">fibonacci(6) is: 13</span>
<span class="line">fibonacci(7) is: 21</span>
<span class="line">fibonacci(8) is: 34</span>
<span class="line">fibonacci(9) is: 55</span>
<span class="line">fibonacci(10) is: 89</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>许多问题都可以使用优雅的递归来解决，比如说著名的快速排序算法。</p>`,9)),a("p",null,[n[2]||(n[2]=s("在使用递归函数时经常会遇到的一个重要问题就是栈溢出：一般出现在大量的递归调用导致的程序栈内存分配耗尽。这个问题可以通过一个名为 ")),n[3]||(n[3]=a("a",{href:"https://zh.wikipedia.org/wiki/%E6%83%B0%E6%80%A7%E6%B1%82%E5%80%BC",target:"_blank",rel:"noopener noreferrer"},"懒惰求值",-1)),n[4]||(n[4]=s(" 的技术解决，在 Go 语言中，我们可以使用管道 (channel) 和 goroutine（详见")),e(p,{to:"/chapter-2/14.8.html"},{default:t(()=>n[0]||(n[0]=[s("第 14.8 节")])),_:1}),n[5]||(n[5]=s("）来实现。")),e(p,{to:"/chapter-2/14.8.html"},{default:t(()=>n[1]||(n[1]=[s("练习 14.12")])),_:1}),n[6]||(n[6]=s(" 也会通过这个方案来优化斐波那契数列的生成问题。"))]),n[21]||(n[21]=l(`<p>Go 语言中也可以使用相互调用的递归函数：多个函数之间相互调用形成闭环。因为 Go 语言编译器的特殊性，这些函数的声明顺序可以是任意的。下面这个简单的例子展示了函数 <code>odd()</code> 和 <code>even()</code> 之间的相互调用（示例 6.14 <a href="examples/chapter_6/mut_recurs.go">mut_recurs.go</a>）：</p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">&quot;fmt&quot;</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%d is even: is %t\\n&quot;</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">,</span> <span class="token function">even</span><span class="token punctuation">(</span><span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 16 is even: is true</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%d is odd: is %t\\n&quot;</span><span class="token punctuation">,</span> <span class="token number">17</span><span class="token punctuation">,</span> <span class="token function">odd</span><span class="token punctuation">(</span><span class="token number">17</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token comment">// 17 is odd: is true</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%d is odd: is %t\\n&quot;</span><span class="token punctuation">,</span> <span class="token number">18</span><span class="token punctuation">,</span> <span class="token function">odd</span><span class="token punctuation">(</span><span class="token number">18</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token comment">// 18 is odd: is false</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">even</span><span class="token punctuation">(</span>nr <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">if</span> nr <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token keyword">return</span> <span class="token boolean">true</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	<span class="token keyword">return</span> <span class="token function">odd</span><span class="token punctuation">(</span><span class="token function">RevSign</span><span class="token punctuation">(</span>nr<span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">odd</span><span class="token punctuation">(</span>nr <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">if</span> nr <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token keyword">return</span> <span class="token boolean">false</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	<span class="token keyword">return</span> <span class="token function">even</span><span class="token punctuation">(</span><span class="token function">RevSign</span><span class="token punctuation">(</span>nr<span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">RevSign</span><span class="token punctuation">(</span>nr <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">if</span> nr <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token keyword">return</span> <span class="token operator">-</span>nr</span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	<span class="token keyword">return</span> nr</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="练习题" tabindex="-1"><a class="header-anchor" href="#练习题"><span>练习题</span></a></h3><p><strong>练习 6.4</strong> <a href="exercises/chapter_6/fibonacci2.go">fibonacci2.go</a></p>`,4)),a("p",null,[n[8]||(n[8]=s("重写本节中生成斐波那契数列的程序并返回两个命名返回值（详见")),e(p,{to:"/chapter-2/06.2.html"},{default:t(()=>n[7]||(n[7]=[s("第 6.2 节")])),_:1}),n[9]||(n[9]=s("），即数列中的位置和对应的值，例如 5 与 4，89 与 10。"))]),n[22]||(n[22]=l('<p><strong>练习 6.5</strong> <a href="exercises/chapter_6/10to1_recursive.go">10to1_recursive.go</a></p><p>使用递归函数从 10 打印到 1。</p><p><strong>练习 6.6</strong> <a href="exercises/chapter_6/factorial.go">factorial.go</a></p><p>实现一个输出前 30 个整数的阶乘的程序。</p><p>n 的阶乘定义为：<code>n! = n * (n-1)!, 0! = 1</code>，因此它非常适合使用递归函数来实现。</p><p>然后，使用命名返回值来实现这个程序的第二个版本。</p><p>特别注意的是，使用 <code>int</code> 类型最多只能计算到 12 的阶乘，因为一般情况下 <code>int</code> 类型的大小为 32 位，继续计算会导致溢出错误。那么，如何才能解决这个问题呢？</p>',7)),a("p",null,[n[11]||(n[11]=s("最好的解决方案就是使用 ")),n[12]||(n[12]=a("code",null,"big",-1)),n[13]||(n[13]=s(" 包（详见")),e(p,{to:"/chapter-2/09.4.html"},{default:t(()=>n[10]||(n[10]=[s("第 9.4 节")])),_:1}),n[14]||(n[14]=s("）。"))]),n[23]||(n[23]=a("h2",{id:"链接",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#链接"},[a("span",null,"链接")])],-1)),a("ul",null,[a("li",null,[e(p,{to:"/chapter-2/directory.html"},{default:t(()=>n[15]||(n[15]=[s("目录")])),_:1})]),a("li",null,[n[17]||(n[17]=s("上一节：")),e(p,{to:"/chapter-2/06.5.html"},{default:t(()=>n[16]||(n[16]=[s("内置函数")])),_:1})]),a("li",null,[n[19]||(n[19]=s("下一节：")),e(p,{to:"/chapter-2/06.7.html"},{default:t(()=>n[18]||(n[18]=[s("将函数作为参数")])),_:1})])])])}const m=i(r,[["render",d],["__file","06.6.html.vue"]]),b=JSON.parse('{"path":"/chapter-2/06.6.html","title":"6.6 递归函数","lang":"zh-cn","frontmatter":{},"headers":[{"level":1,"title":"6.6 递归函数","slug":"_6-6-递归函数","link":"#_6-6-递归函数","children":[{"level":3,"title":"练习题","slug":"练习题","link":"#练习题","children":[]},{"level":2,"title":"链接","slug":"链接","link":"#链接","children":[]}]}],"git":{},"filePathRelative":"chapter-2/06.6.md"}');export{m as comp,b as data};