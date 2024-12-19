<template><div><h1 id="_20-6-处理窗口" tabindex="-1"><a class="header-anchor" href="#_20-6-处理窗口"><span>20.6 处理窗口</span></a></h1>
<p>正如我们在 <RouteLink to="/chapter-4/15.6.html">15.6</RouteLink>/<RouteLink to="/chapter-4/15.7.html">7</RouteLink> 节中所看到的，<code v-pre>template</code> 包经常被用于 web 应用，所以也可以被用于 GAE 应用。下面的应用程序让用户输入一个文本。首先，一个留言簿表格显示出来（通过 <code v-pre>/</code> 根处理程序），当它被发布时，<code v-pre>sign()</code> 处理程序将这个文本替换到产生的 html 响应中。<code v-pre>sign()</code> 函数通过调用 <code v-pre>r.FormValue</code> 获得窗口数据，并将其传递给 <code v-pre>signTemplate.Execute()</code>，后者将渲染的模板写入 <code v-pre>http.ResponseWriter</code>。</p>
<p>编辑文件 helloworld2.go，用下面的 Go 代码替换它，并试运行：</p>
<p><u><a href="examples%5Cchapter_20%5Chelloapp%5Chello%5Chelloworld2_version3.go">Listing 20.4 helloworld2_version3.go:</a></u></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> hello</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"fmt"</span></span>
<span class="line">	<span class="token string">"net/http"</span></span>
<span class="line">	<span class="token string">"template"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> guestbookForm <span class="token operator">=</span> <span class="token string">`</span>
<span class="line">&lt;html></span>
<span class="line">  &lt;body></span>
<span class="line">    &lt;form action="/sign" method="post"></span>
<span class="line">      &lt;div>&lt;textarea name="content" rows="3" cols="60">&lt;/textarea>&lt;/div></span>
<span class="line">      &lt;div>&lt;input type="submit" value="Sign Guestbook">&lt;/div></span>
<span class="line">    &lt;/form></span>
<span class="line">  &lt;/body></span>
<span class="line">&lt;/html></span>
<span class="line">`</span></span>
<span class="line"><span class="token keyword">const</span> signTemplateHTML <span class="token operator">=</span> <span class="token string">`</span>
<span class="line">&lt;html></span>
<span class="line">  &lt;body></span>
<span class="line">    &lt;p>You wrote:&lt;/p></span>
<span class="line">    &lt;pre>{{html .}}&lt;/pre></span>
<span class="line">  &lt;/body></span>
<span class="line">&lt;/html></span>
<span class="line">`</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">var</span> signTemplate <span class="token operator">=</span> template<span class="token punctuation">.</span><span class="token function">Must</span><span class="token punctuation">(</span>template<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">"sign"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span>signTemplateHTML<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">,</span> root<span class="token punctuation">)</span></span>
<span class="line">	http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">"/sign"</span><span class="token punctuation">,</span> sign<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">root</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	w<span class="token punctuation">.</span><span class="token function">Header</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"Content-Type"</span><span class="token punctuation">,</span> <span class="token string">"text/html"</span><span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Fprint</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> guestbookForm<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">sign</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	w<span class="token punctuation">.</span><span class="token function">Header</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"Content-Type"</span><span class="token punctuation">,</span> <span class="token string">"text/html"</span><span class="token punctuation">)</span></span>
<span class="line">	err <span class="token operator">:=</span> signTemplate<span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> r<span class="token punctuation">.</span><span class="token function">FormValue</span><span class="token punctuation">(</span><span class="token string">"content"</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">		http<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> err<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> http<span class="token punctuation">.</span>StatusInternalServerError<span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-4/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-4/20.5.html">使用用户服务和探索其 API</RouteLink></li>
<li>下一节：<RouteLink to="/chapter-4/20.7.html">使用数据存储</RouteLink></li>
</ul>
</div></template>


