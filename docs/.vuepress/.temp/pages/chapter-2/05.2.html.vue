<template><div><h1 id="_5-2-测试多返回值函数的错误" tabindex="-1"><a class="header-anchor" href="#_5-2-测试多返回值函数的错误"><span>5.2 测试多返回值函数的错误</span></a></h1>
<p>Go 语言的函数经常使用两个返回值来表示执行是否成功：返回某个值以及 <code v-pre>true</code> 表示成功；返回零值（或 <code v-pre>nil</code>）和 <code v-pre>false</code> 表示失败（<RouteLink to="/chapter-2/04.4.html">第 4.4 节</RouteLink>）。当不使用 <code v-pre>true</code> 或 <code v-pre>false</code> 的时候，也可以使用一个 <code v-pre>error</code> 类型的变量来代替作为第二个返回值：成功执行的话，<code v-pre>error</code> 的值为 <code v-pre>nil</code>，否则就会包含相应的错误信息（Go 语言中的错误类型为 <code v-pre>error</code>: <code v-pre>var err error</code>，我们将会在<RouteLink to="/chapter-2/13.0.html">第 13 章</RouteLink> 进行更多地讨论）。这样一来，就很明显需要用一个 <code v-pre>if</code> 语句来测试执行结果；由于其符号的原因，这样的形式又称之为“逗号 ok 模式”(comma, ok pattern)。</p>
<p>在<RouteLink to="/chapter-2/04.7.html">第 4.7 节</RouteLink> 的程序 <a href="examples/chapter_4/string_conversion.go">string_conversion.go</a> 中，函数 <code v-pre>strconv.Atoi()</code> 的作用是将一个字符串转换为一个整数。之前我们忽略了相关的错误检查：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">anInt<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">=</span> strconv<span class="token punctuation">.</span><span class="token function">Atoi</span><span class="token punctuation">(</span>origStr<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>如果 <code v-pre>origStr</code> 不能被转换为整数，<code v-pre>anInt</code> 的值会变成 <code v-pre>0</code> 而 <code v-pre>_</code> 无视了错误，程序会继续运行。</p>
<p>这样做是非常不好的：程序应该在最接近的位置检查所有相关的错误，至少需要暗示用户有错误发生并对函数进行返回，甚至中断程序。</p>
<p>我们在第二个版本中对代码进行了改进：</p>
<p>示例 1：</p>
<p>示例 5.3 <a href="examples/chapter_5/string_conversion2.go">string_conversion2.go</a></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"fmt"</span></span>
<span class="line">	<span class="token string">"strconv"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">var</span> orig <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token string">"ABC"</span></span>
<span class="line">	<span class="token comment">// var an int</span></span>
<span class="line">	<span class="token keyword">var</span> newS <span class="token builtin">string</span></span>
<span class="line">	<span class="token comment">// var err error</span></span>
<span class="line"></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"The size of ints is: %d\n"</span><span class="token punctuation">,</span> strconv<span class="token punctuation">.</span>IntSize<span class="token punctuation">)</span>	  </span>
<span class="line">	<span class="token comment">// anInt, err = strconv.Atoi(origStr)</span></span>
<span class="line">	an<span class="token punctuation">,</span> err <span class="token operator">:=</span> strconv<span class="token punctuation">.</span><span class="token function">Atoi</span><span class="token punctuation">(</span>orig<span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"orig %s is not an integer - exiting with error\n"</span><span class="token punctuation">,</span> orig<span class="token punctuation">)</span></span>
<span class="line">		<span class="token keyword">return</span></span>
<span class="line">	<span class="token punctuation">}</span> </span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"The integer is %d\n"</span><span class="token punctuation">,</span> an<span class="token punctuation">)</span></span>
<span class="line">	an <span class="token operator">=</span> an <span class="token operator">+</span> <span class="token number">5</span></span>
<span class="line">	newS <span class="token operator">=</span> strconv<span class="token punctuation">.</span><span class="token function">Itoa</span><span class="token punctuation">(</span>an<span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"The new string is: %s\n"</span><span class="token punctuation">,</span> newS<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是测试 <code v-pre>err</code> 变量是否包含一个真正的错误（<code v-pre>if err != nil</code>）的习惯用法。如果确实存在错误，则会打印相应的错误信息然后通过 <code v-pre>return</code> 提前结束函数的执行。我们还可以使用携带返回值的 <code v-pre>return</code> 形式，例如 <code v-pre>return err</code>。这样一来，函数的调用者就可以检查函数执行过程中是否存在错误了。</p>
<p><strong>习惯用法</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">value<span class="token punctuation">,</span> err <span class="token operator">:=</span> pack1<span class="token punctuation">.</span><span class="token function">Function1</span><span class="token punctuation">(</span>param1<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"An error occured in pack1.Function1 with parameter %v"</span><span class="token punctuation">,</span> param1<span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">return</span> err</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token comment">// 未发生错误，继续执行：</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于本例的函数调用者属于 <code v-pre>main</code> 函数，所以程序会直接停止运行。</p>
<p>如果我们想要在错误发生的同时终止程序的运行，我们可以使用 <code v-pre>os</code> 包的 <code v-pre>Exit</code> 函数：</p>
<p><strong>习惯用法</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Program stopping with error %v"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span></span>
<span class="line">	os<span class="token punctuation">.</span><span class="token function">Exit</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（此处的退出代码 <code v-pre>1</code> 可以使用外部脚本获取到）</p>
<p>有时候，你会发现这种习惯用法被连续重复地使用在某段代码中。</p>
<p>当没有错误发生时，代码继续运行就是唯一要做的事情，所以 <code v-pre>if</code> 语句块后面不需要使用 <code v-pre>else</code> 分支。</p>
<p>示例 2：我们尝试通过 <code v-pre>os.Open</code> 方法打开一个名为 <code v-pre>name</code> 的只读文件：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">f<span class="token punctuation">,</span> err <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">return</span> err</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token function">doSomething</span><span class="token punctuation">(</span>f<span class="token punctuation">)</span> <span class="token comment">// 当没有错误发生时，文件对象被传入到某个函数中</span></span>
<span class="line">doSomething</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>练习 5.1</strong> 尝试改写 <a href="examples/chapter_5/string_conversion2.go">string_conversion2.go</a> 中的代码，要求使用 <code v-pre>:=</code> 方法来对 <code v-pre>err</code> 进行赋值，哪些地方可以被修改？</p>
<p>示例 3：可以将错误的获取放置在 <code v-pre>if</code> 语句的初始化部分：</p>
<p><strong>习惯用法</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">if</span> err <span class="token operator">:=</span> file<span class="token punctuation">.</span><span class="token function">Chmod</span><span class="token punctuation">(</span><span class="token number">0664</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">return</span> err</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>示例 4：或者将 ok-pattern 的获取放置在 <code v-pre>if</code> 语句的初始化部分，然后进行判断：</p>
<p><strong>习惯用法</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">if</span> value<span class="token punctuation">,</span> ok <span class="token operator">:=</span> <span class="token function">readData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> ok <span class="token punctuation">{</span></span>
<span class="line">…</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意事项</strong></p>
<p>如果您像下面一样，没有为多返回值的函数准备足够的变量来存放结果：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">mySqrt</span><span class="token punctuation">(</span>f <span class="token builtin">float64</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>v <span class="token builtin">float64</span><span class="token punctuation">,</span> ok <span class="token builtin">bool</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">if</span> f <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token punctuation">}</span> <span class="token comment">// error case</span></span>
<span class="line">	<span class="token keyword">return</span> math<span class="token punctuation">.</span><span class="token function">Sqrt</span><span class="token punctuation">(</span>f<span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token boolean">true</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	t <span class="token operator">:=</span> <span class="token function">mySqrt</span><span class="token punctuation">(</span><span class="token number">25.0</span><span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>您会得到一个编译错误：<code v-pre>multiple-value mySqrt() in single-value context</code>。</p>
<p>正确的做法是：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">t<span class="token punctuation">,</span> ok <span class="token operator">:=</span> <span class="token function">mySqrt</span><span class="token punctuation">(</span><span class="token number">25.0</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">if</span> ok <span class="token punctuation">{</span> fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span> <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意事项 2</strong></p>
<p>当您将字符串转换为整数时，且确定转换一定能够成功时，可以将 <code v-pre>Atoi()</code> 函数进行一层忽略错误的封装：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> atoi <span class="token punctuation">(</span>s <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>n <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	n<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">=</span> strconv<span class="token punctuation">.</span><span class="token function">Atoi</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">return</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实际上，<code v-pre>fmt</code> 包（<RouteLink to="/chapter-2/04.4.html">第 4.4.3 节</RouteLink>）最简单的打印函数也有 2 个返回值：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">count<span class="token punctuation">,</span> err <span class="token operator">:=</span> fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span> <span class="token comment">// number of bytes printed, nil or 0, error</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>当打印到控制台时，可以将该函数返回的错误忽略；但当输出到文件流、网络流等具有不确定因素的输出对象时，应该始终检查是否有错误发生（另见<RouteLink to="/chapter-2/06.1.html">练习 6.1b</RouteLink>）。</p>
</div></template>


