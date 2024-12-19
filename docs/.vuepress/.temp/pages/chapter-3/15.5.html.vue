<template><div><h1 id="_15-5-确保网页应用健壮" tabindex="-1"><a class="header-anchor" href="#_15-5-确保网页应用健壮"><span>15.5 确保网页应用健壮</span></a></h1>
<p>当网页应用的处理函数发生 panic，服务器会简单地终止运行。这可不妙：网页服务器必须是足够健壮的程序，能够承受任何可能的突发问题。</p>
<p>首先能想到的是在每个处理函数中使用 <code v-pre>defer</code>/<code v-pre>recover()</code>，不过这样会产生太多的重复代码。<RouteLink to="/chapter-3/13.5.html">13.5 节</RouteLink>使用闭包的错误处理模式是更优雅的方案。我们把这种机制应用到前一章的简单网页服务器上。实际上，它可以被简单地应用到任何网页服务器程序中。</p>
<p>为增强代码可读性，我们为页面处理函数创建一个类型：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">type</span> HandleFnc <span class="token keyword">func</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>我们的错误处理函数应用了 <RouteLink to="/chapter-3/13.5.html">13.5 节</RouteLink>的模式，变成了以下的 <code v-pre>logPanics()</code> 函数：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">logPanics</span><span class="token punctuation">(</span>function HandleFnc<span class="token punctuation">)</span> HandleFnc <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span>writer http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> request <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">			<span class="token keyword">if</span> x <span class="token operator">:=</span> <span class="token function">recover</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> x <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">				log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"[%v] caught panic: %v"</span><span class="token punctuation">,</span> request<span class="token punctuation">.</span>RemoteAddr<span class="token punctuation">,</span> x<span class="token punctuation">)</span></span>
<span class="line">			<span class="token punctuation">}</span></span>
<span class="line">		<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">		<span class="token function">function</span><span class="token punctuation">(</span>writer<span class="token punctuation">,</span> request<span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们用 <code v-pre>logPanics()</code> 来包装对处理函数的调用：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">"/test1"</span><span class="token punctuation">,</span> <span class="token function">logPanics</span><span class="token punctuation">(</span>SimpleServer<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">"/test2"</span><span class="token punctuation">,</span> <span class="token function">logPanics</span><span class="token punctuation">(</span>FormServer<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>处理函数现在可以恢复 panic 调用，类似 <RouteLink to="/chapter-3/13.5.html">13.5 节</RouteLink>中的错误检测函数。完整代码如下：</p>
<p>示例 15.11 <a href="examples/chapter_15/robust_webserver.go">robust_webserver.go</a></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"io"</span></span>
<span class="line">	<span class="token string">"log"</span></span>
<span class="line">	<span class="token string">"net/http"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> form <span class="token operator">=</span> <span class="token string">`&lt;html>&lt;body>&lt;form action="#" method="post" name="bar"></span>
<span class="line">		&lt;input type="text" name="in"/></span>
<span class="line">		&lt;input type="submit" value="Submit"/></span>
<span class="line">	&lt;/form>&lt;/html>&lt;/body>`</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">type</span> HandleFnc <span class="token keyword">func</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">/* handle a simple get request */</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">SimpleServer</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> request <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	io<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> <span class="token string">"&lt;h1>hello, world&lt;/h1>"</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">/* handle a form, both the GET which displays the form</span>
<span class="line">   and the POST which processes it.*/</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">FormServer</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> request <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	w<span class="token punctuation">.</span><span class="token function">Header</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"Content-Type"</span><span class="token punctuation">,</span> <span class="token string">"text/html"</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">switch</span> request<span class="token punctuation">.</span>Method <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">case</span> <span class="token string">"GET"</span><span class="token punctuation">:</span></span>
<span class="line">		<span class="token comment">/* display the form to the user */</span></span>
<span class="line">		io<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> form<span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">case</span> <span class="token string">"POST"</span><span class="token punctuation">:</span></span>
<span class="line">		<span class="token comment">/* handle the form data, note that ParseForm must</span>
<span class="line">		   be called before we can extract form data*/</span></span>
<span class="line">		<span class="token comment">//request.ParseForm();</span></span>
<span class="line">		<span class="token comment">//io.WriteString(w, request.Form["in"][0])</span></span>
<span class="line">		io<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> request<span class="token punctuation">.</span><span class="token function">FormValue</span><span class="token punctuation">(</span><span class="token string">"in"</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">"/test1"</span><span class="token punctuation">,</span> <span class="token function">logPanics</span><span class="token punctuation">(</span>SimpleServer<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">	http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">"/test2"</span><span class="token punctuation">,</span> <span class="token function">logPanics</span><span class="token punctuation">(</span>FormServer<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">if</span> err <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span><span class="token string">":8088"</span><span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">logPanics</span><span class="token punctuation">(</span>function HandleFnc<span class="token punctuation">)</span> HandleFnc <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span>writer http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> request <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">			<span class="token keyword">if</span> x <span class="token operator">:=</span> <span class="token function">recover</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> x <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">				log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"[%v] caught panic: %v"</span><span class="token punctuation">,</span> request<span class="token punctuation">.</span>RemoteAddr<span class="token punctuation">,</span> x<span class="token punctuation">)</span></span>
<span class="line">			<span class="token punctuation">}</span></span>
<span class="line">		<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">		<span class="token function">function</span><span class="token punctuation">(</span>writer<span class="token punctuation">,</span> request<span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-3/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-3/15.4.html">写一个简单的网页应用</RouteLink></li>
<li>下一节：<RouteLink to="/chapter-3/15.6.html">用模板编写网页应用</RouteLink></li>
</ul>
</div></template>


