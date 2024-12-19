<template><div><h1 id="_6-1-介绍" tabindex="-1"><a class="header-anchor" href="#_6-1-介绍"><span>6.1 介绍</span></a></h1>
<p>每一个程序都包含很多的函数：函数是基本的代码块。</p>
<p>Go是编译型语言，所以函数编写的顺序是无关紧要的；鉴于可读性的需求，最好把 <code v-pre>main()</code> 函数写在文件的前面，其他函数按照一定逻辑顺序进行编写（例如函数被调用的顺序）。</p>
<p>编写多个函数的主要目的是将一个需要很多行代码的复杂问题分解为一系列简单的任务（那就是函数）来解决。而且，同一个任务（函数）可以被调用多次，有助于代码重用。</p>
<div class="hint-container tip">
<p class="hint-container-title">Tips</p>
<p>事实上，好的程序是非常注意 DRY 原则的，即<strong>不要重复你自己</strong> (Don't Repeat Yourself)，意思是执行特定任务的代码只能在程序里面出现一次。</p>
</div>
<p>当函数执行到代码块最后一行（<code v-pre>}</code> 之前）或者 <code v-pre>return</code> 语句的时候会退出，其中 <code v-pre>return</code> 语句可以带有零个或多个参数；这些参数将作为返回值（参考 <RouteLink to="/chapter-2/06.2.html">第 6.2 节</RouteLink>）供调用者使用。简单的 <code v-pre>return</code> 语句也可以用来结束 <code v-pre>for</code> 死循环，或者结束一个协程 (goroutine)。</p>
<p>Go 里面有三种类型的函数：</p>
<ul>
<li>普通的带有名字的函数</li>
<li>匿名函数或者lambda函数（参考 <RouteLink to="/chapter-2/06.8.html">第 6.8 节</RouteLink>）</li>
<li>方法（Methods，参考 <RouteLink to="/chapter-2/10.6.html">第 10.6 节</RouteLink>）</li>
</ul>
<p>除了 <code v-pre>main()</code>、<code v-pre>init()</code> 函数外，其它所有类型的函数都可以有参数与返回值。函数参数、返回值以及它们的类型被统称为函数签名。</p>
<p>作为提醒，提前介绍一个语法：</p>
<p>这样是不正确的 Go 代码：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">g</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>它必须是这样的：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">g</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>函数被调用的基本格式如下：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">pack1<span class="token punctuation">.</span><span class="token function">Function</span><span class="token punctuation">(</span>arg1<span class="token punctuation">,</span> arg2<span class="token punctuation">,</span> …<span class="token punctuation">,</span> argn<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><code v-pre>Function</code> 是 <code v-pre>pack1</code> 包里面的一个函数，括号里的是被调用函数的实参 (argument)：这些值被传递给被调用函数的<em>形参</em>（parameter，参考<RouteLink to="/chapter-2/06.2.html">第 6.2 节</RouteLink>）。函数被调用的时候，这些实参将被复制（简单而言）然后传递给被调用函数。函数一般是在其他函数里面被调用的，这个其他函数被称为调用函数 (calling function)。函数能多次调用其他函数，这些被调用函数按顺序（简单而言）执行，理论上，函数调用其他函数的次数是无穷的（直到函数调用栈被耗尽）。</p>
<p>一个简单的函数调用其他函数的例子：</p>
<p>示例 6.1 <a href="examples/chapter_6/greeting.go">greeting.go</a></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"In main before calling greeting"</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token function">greeting</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"In main after calling greeting"</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">greeting</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"In greeting: Hi!!!!!"</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码输出：</p>
<pre><code>In main before calling greeting
In greeting: Hi!!!!!
In main after calling greeting
</code></pre>
<p>函数可以将其他函数调用作为它的参数，只要这个被调用函数的返回值个数、返回值类型和返回值的顺序与调用函数所需求的实参是一致的，例如：</p>
<p>假设 <code v-pre>f1</code> 需要 3 个参数 <code v-pre>f1(a, b, c int)</code>，同时 <code v-pre>f2</code> 返回 3 个参数 <code v-pre>f2(a, b int) (int, int, int)</code>，就可以这样调用 <code v-pre>f1</code>：<code v-pre>f1(f2(a, b))</code>。</p>
<p>函数重载 (function overloading) 指的是可以编写多个同名函数，只要它们拥有不同的形参/或者不同的返回值，在 Go 里面函数重载是不被允许的。这将导致一个编译错误：</p>
<pre><code>funcName redeclared in this book, previous declaration at lineno
</code></pre>
<p>Go 语言不支持这项特性的主要原因是函数重载需要进行多余的类型匹配影响性能；没有重载意味着只是一个简单的函数调度。所以你需要给不同的函数使用不同的名字，我们通常会根据函数的特征对函数进行命名（参考 <RouteLink to="/chapter-2/11.12.html">第 11.12.5 节</RouteLink>）。</p>
<p>如果需要申明一个在外部定义的函数，你只需要给出函数名与函数签名，不需要给出函数体：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">flushICache</span><span class="token punctuation">(</span>begin<span class="token punctuation">,</span> end <span class="token builtin">uintptr</span><span class="token punctuation">)</span> <span class="token comment">// implemented externally</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><strong>函数也可以以申明的方式被使用，作为一个函数类型</strong>，就像：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">type</span> binOp <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>在这里，不需要函数体 <code v-pre>{}</code>。</p>
<p>函数是一等值 (first-class value)：它们可以赋值给变量，就像 <code v-pre>add := binOp</code> 一样。</p>
<p>这个变量知道自己指向的函数的签名，所以给它赋一个具有不同签名的函数值是不可能的。</p>
<p>函数值 (functions value) 之间可以相互比较：如果它们引用的是相同的函数或者都是 <code v-pre>nil</code> 的话，则认为它们是相同的函数。函数不能在其它函数里面声明（不能嵌套），不过我们可以通过使用匿名函数（参考 <RouteLink to="/chapter-2/06.8.html">第 6.8 节</RouteLink>）来破除这个限制。</p>
<p><a href="https://go.dev/doc/tutorial/generics" target="_blank" rel="noopener noreferrer">泛型</a></p>
<p><s>目前 Go 没有泛型 (generic) 的概念</s>，也就是说它不支持那种支持多种类型的函数。不过在大部分情况下可以通过接口 (interface)，特别是空接口与类型选择（type switch，参考 <RouteLink to="/chapter-2/11.12.html">第 11.12 节</RouteLink>）与/或者通过使用反射（reflection，参考 <RouteLink to="/chapter-2/06.8.html">第 6.8 节</RouteLink>）来实现相似的功能。使用这些技术将导致代码更为复杂、性能更为低下，所以在非常注意性能的的场合，最好是为每一个类型单独创建一个函数，而且代码可读性更强。</p>
</div></template>


