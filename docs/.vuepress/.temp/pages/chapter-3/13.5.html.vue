<template><div><h1 id="_13-5-一种用闭包处理错误的模式" tabindex="-1"><a class="header-anchor" href="#_13-5-一种用闭包处理错误的模式"><span>13.5 一种用闭包处理错误的模式</span></a></h1>
<p>每当函数返回时，我们应该检查是否有错误发生：但是这会导致重复乏味的代码。结合 defer/panic/recover 机制和闭包可以得到一个我们马上要讨论的更加优雅的模式。不过这个模式只有当所有的函数都是同一种签名时可用，这样就有相当大的限制。一个很好的使用它的例子是 web 应用，所有的处理函数都是下面这样：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">handler1</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token operator">...</span> <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>假设所有的函数都有这样的签名：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">f</span><span class="token punctuation">(</span>a type1<span class="token punctuation">,</span> b type2<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>参数的数量和类型是不相关的。</p>
<p>我们给这个类型一个名字：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">fType1 <span class="token operator">=</span> <span class="token keyword">func</span> <span class="token function">f</span><span class="token punctuation">(</span>a type1<span class="token punctuation">,</span> b type2<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>在我们的模式中使用了两个帮助函数：</p>
<p>1）<code v-pre>check()</code>：这是用来检查是否有错误和 panic 发生的函数：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">check</span><span class="token punctuation">(</span>err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span> <span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>2）<code v-pre>errorhandler()</code>：这是一个包装函数。接收一个 <code v-pre>fType1</code> 类型的函数 <code v-pre>fn</code> 并返回一个调用 <code v-pre>fn</code> 的函数。里面就包含有 defer/recover 机制，这在 <RouteLink to="/chapter-3/13.3.html">13.3 节</RouteLink>中有相应描述。</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">errorHandler</span><span class="token punctuation">(</span>fn fType1<span class="token punctuation">)</span> fType1 <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span>a type1<span class="token punctuation">,</span> b type2<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">			<span class="token keyword">if</span> err<span class="token punctuation">,</span> ok <span class="token operator">:=</span> <span class="token function">recover</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token builtin">error</span><span class="token punctuation">)</span><span class="token punctuation">;</span> ok <span class="token punctuation">{</span></span>
<span class="line">				log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"run time panic: %v"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span></span>
<span class="line">			<span class="token punctuation">}</span></span>
<span class="line">		<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">		<span class="token function">fn</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当错误发生时会 recover 并打印在日志中；除了简单的打印，应用也可以用 <code v-pre>template</code> 包（参见 <RouteLink to="/chapter-3/15.7.html">15.7 节</RouteLink>）为用户生成自定义的输出。<code v-pre>check()</code> 函数会在所有的被调函数中调用，像这样：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">f1</span><span class="token punctuation">(</span>a type1<span class="token punctuation">,</span> b type2<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token operator">...</span></span>
<span class="line">	f<span class="token punctuation">,</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">:=</span> <span class="token comment">// call function/method</span></span>
<span class="line">	<span class="token function">check</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span></span>
<span class="line">	t<span class="token punctuation">,</span> err <span class="token operator">:=</span> <span class="token comment">// call function/method</span></span>
<span class="line">	<span class="token function">check</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span></span>
<span class="line">	<span class="token boolean">_</span><span class="token punctuation">,</span> err2 <span class="token operator">:=</span> <span class="token comment">// call function/method</span></span>
<span class="line">	<span class="token function">check</span><span class="token punctuation">(</span>err2<span class="token punctuation">)</span></span>
<span class="line">	<span class="token operator">...</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过这种机制，所有的错误都会被 recover，并且调用函数后的错误检查代码也被简化为调用 <code v-pre>check(err)</code> 即可。在这种模式下，不同的错误处理必须对应不同的函数类型；它们（错误处理）可能被隐藏在错误处理包内部。可选的更加通用的方式是用一个空接口类型的切片作为参数和返回值。</p>
<p>我们会在 <RouteLink to="/chapter-3/15.5.html">15.5 节</RouteLink> 的 web 应用中使用这种模式。</p>
<p><strong>练习 13.1</strong>：<a href="exercises/chapter_13/recover_divbyzero.go">recover_dividebyzero.go</a></p>
<p>用示例 13.3 中的编码模式通过整数除以 0 触发一个运行时 panic。</p>
<p><strong>练习 13.2</strong>：<a href="exercises/chapter_13/panic_defer.go">panic_defer.go</a></p>
<p>阅读下面的完整程序。不要执行它，写出程序的输出结果。然后编译执行并验证你的预想。</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token comment">// panic_defer.go</span></span>
<span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token string">"fmt"</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Returned normally from f."</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token keyword">if</span> r <span class="token operator">:=</span> <span class="token function">recover</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> r <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Recovered in f"</span><span class="token punctuation">,</span> r<span class="token punctuation">)</span></span>
<span class="line">		<span class="token punctuation">}</span></span>
<span class="line">	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Calling g."</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token function">g</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Returned normally from g."</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">g</span><span class="token punctuation">(</span>i <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">if</span> i <span class="token operator">></span> <span class="token number">3</span> <span class="token punctuation">{</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Panicking!"</span><span class="token punctuation">)</span></span>
<span class="line">		<span class="token function">panic</span><span class="token punctuation">(</span>fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">"%v"</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	<span class="token keyword">defer</span> fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Defer in g"</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Printing in g"</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span></span>
<span class="line">	<span class="token function">g</span><span class="token punctuation">(</span>i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">Calling g.</span>
<span class="line">Printing in g 0</span>
<span class="line">Printing in g 1</span>
<span class="line">Printing in g 2</span>
<span class="line">Printing in g 3</span>
<span class="line">Panicking!</span>
<span class="line">Defer in g 3</span>
<span class="line">Defer in g 2</span>
<span class="line">Defer in g 1</span>
<span class="line">Defer in g 0</span>
<span class="line">Recovered in f 4</span>
<span class="line">Returned normally from f.</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>练习 13.3</strong>：<a href="exercises/chapter_13/panic_defer_convint.go">panic_defer_convint.go</a></p>
<p>写一个 <code v-pre>ConvertInt64ToInt()</code> 函数把 <code v-pre>int64</code> 值转换为 <code v-pre>int</code> 值，如果发生错误（提示：参见 <RouteLink to="/chapter-3/04.5.html#4521-%E6%95%B4%E5%9E%8B-int-%E5%92%8C%E6%B5%AE%E7%82%B9%E5%9E%8B-float">4.5.2.1 节</RouteLink>）就 <code v-pre>panic()</code> 。然后在函数 <code v-pre>IntFromInt64</code> 中调用这个函数并 <code v-pre>recover()</code>，返回一个整数和一个错误。请测试这个函数！</p>
<h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-3/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-3/13.4.html">自定义包中的错误处理和 panicking</RouteLink></li>
<li>下一节：<RouteLink to="/chapter-3/13.6.html">启动外部命令和程序</RouteLink></li>
</ul>
</div></template>


