<template><div><h1 id="_15-4-写一个简单的网页应用" tabindex="-1"><a class="header-anchor" href="#_15-4-写一个简单的网页应用"><span>15.4 写一个简单的网页应用</span></a></h1>
<p>下边的程序在端口 <code v-pre>8088</code> 上启动了一个网页服务器；<code v-pre>SimpleServer()</code> 会处理 url/<code v-pre>test1</code> 使它在浏览器输出 <code v-pre>hello world</code>。<code v-pre>FormServer</code> 会处理 url/<code v-pre>test2</code>：如果 url 最初由浏览器请求，那么它是一个 <code v-pre>GET</code> 请求，返回一个 <code v-pre>form</code> 常量，包含了简单的 <code v-pre>input</code> 表单，这个表单里有一个文本框和一个提交按钮。当在文本框输入一些东西并点击提交按钮的时候，会发起一个 POST 请求。<code v-pre>FormServer()</code> 中的代码用到了 <code v-pre>switch</code> 来区分两种情况。请求为 POST 类型时，<code v-pre>name</code> 属性为 <code v-pre>inp</code> 的文本框的内容可以这样获取：<code v-pre>request.FormValue(&quot;inp&quot;)</code>。然后将其写回浏览器页面中。在控制台启动程序，然后到浏览器中打开 url <code v-pre>http://localhost:8088/test2</code> 来测试这个程序：</p>
<p>示例 15.10 <a href="examples/chapter_15/simple_webserver.go">simple_webserver.go</a></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"io"</span></span>
<span class="line">	<span class="token string">"net/http"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> form <span class="token operator">=</span> <span class="token string">`</span>
<span class="line">	&lt;html>&lt;body></span>
<span class="line">		&lt;form action="#" method="post" name="bar"></span>
<span class="line">			&lt;input type="text" name="in" /></span>
<span class="line">			&lt;input type="submit" value="submit"/></span>
<span class="line">		&lt;/form></span>
<span class="line">	&lt;/body>&lt;/html></span>
<span class="line">`</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">/* handle a simple get request */</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">SimpleServer</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> request <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	io<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> <span class="token string">"&lt;h1>hello, world&lt;/h1>"</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">FormServer</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> request <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	w<span class="token punctuation">.</span><span class="token function">Header</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"Content-Type"</span><span class="token punctuation">,</span> <span class="token string">"text/html"</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">switch</span> request<span class="token punctuation">.</span>Method <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">case</span> <span class="token string">"GET"</span><span class="token punctuation">:</span></span>
<span class="line">		<span class="token comment">/* display the form to the user */</span></span>
<span class="line">		io<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> form<span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">case</span> <span class="token string">"POST"</span><span class="token punctuation">:</span></span>
<span class="line">		<span class="token comment">/* handle the form data, note that ParseForm must</span>
<span class="line">		   be called before we can extract form data */</span></span>
<span class="line">		<span class="token comment">//request.ParseForm();</span></span>
<span class="line">		<span class="token comment">//io.WriteString(w, request.Form["in"][0])</span></span>
<span class="line">		io<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> request<span class="token punctuation">.</span><span class="token function">FormValue</span><span class="token punctuation">(</span><span class="token string">"in"</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">"/test1"</span><span class="token punctuation">,</span> SimpleServer<span class="token punctuation">)</span></span>
<span class="line">	http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">"/test2"</span><span class="token punctuation">,</span> FormServer<span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">if</span> err <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span><span class="token string">":8088"</span><span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注：当使用字符串常量表示 html 文本的时候，包含 <code v-pre>&lt;html&gt;&lt;body&gt;...&lt;/body&gt;&lt;/html&gt;</code> 对于让浏览器将它识别为 html 文档非常重要。</p>
<p>更安全的做法是在处理函数中，在写入返回内容之前将头部的 <code v-pre>content-type</code> 设置为 <code v-pre>text/html</code>：<code v-pre>w.Header().Set(&quot;Content-Type&quot;, &quot;text/html&quot;)</code>。</p>
<p><code v-pre>&quot;Content-Type&quot;</code> 会让浏览器认为它可以使用函数 <code v-pre>http.DetectContentType([]byte(form))</code> 来处理收到的数据。</p>
<p>练习 15.6 <a href="exercises/chapter_15/statistics.go">statistics.go</a></p>
<p>编写一个网页程序，可以让用户输入一连串的数字。计算出这些数字的均值和中值，并且打印出来，就像下边这张截图一样：</p>
<img src="/images/15.4_fig15.1.jpg" style="zoom:80%;" />
<h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-3/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-3/15.3.html">访问并读取页面</RouteLink></li>
<li>下一节：<RouteLink to="/chapter-3/15.5.html">确保网页应用健壮</RouteLink></li>
</ul>
</div></template>


