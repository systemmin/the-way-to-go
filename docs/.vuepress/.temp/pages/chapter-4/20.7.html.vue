<template><div><h1 id="_20-7-使用数据存储" tabindex="-1"><a class="header-anchor" href="#_20-7-使用数据存储"><span>20.7 使用数据存储</span></a></h1>
<p>我们现在有了一种用 html 窗口来收集用户信息的方法。通常我们希望使这些信息持久化：我们需要一个地方来放置这些信息，并且需要一个方法来取回这些信息。GAE 在这里为我们提供了它的 DataStore 设施：一个非关系型 (non-relational) 数据库，它可以跨网络服务器甚至跨机器持久保存您的数据。事实上，用户的下一个请求很可能是在不同的计算机上运行的不同的网络服务器，但 GAE 的基础设施在一个简单的 API 后面处理了所有的数据分布、复制和负载平衡，你还可以得到一个强大的查询引擎。</p>
<p>我们现在将对我们的例子进行一些扩展，制作一个问候结构，该结构可以包含问候的作者、内容和时间，我们要存储这些内容。这是你要做的第一件事：为你的程序<em>实体</em>（即你的程序所处理的对象）制作一个合适的数据结构，大多数情况下这将是一个 <code v-pre>struct</code>。在运行的程序中，这个结构的内存值将包含来自该实体的 DataStore 的数据。</p>
<p>接下来我们程序的版本如下：</p>
<p>​		(A) <code v-pre>url:/</code>： 检索所有存储的问候语并通过 <code v-pre>template</code> 包显示它们</p>
<p>​		(B) <code v-pre>url:/sign</code>：存储一个新的问候语到数据存储里面</p>
<p>我们现在需要导入 <code v-pre>appengin/datastore</code> 包：</p>
<p><u><a href="examples%5Cchapter_20%5Chelloapp%5Chello%5Chelloworld2_version4.go">Listing 20.5 helloworld2_version4.go:</a></u></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> hello</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"appengine"</span></span>
<span class="line">	<span class="token string">"appengine/datastore"</span></span>
<span class="line">	<span class="token string">"appengine/user"</span></span>
<span class="line">	<span class="token string">"net/http"</span></span>
<span class="line">	<span class="token string">"template"</span></span>
<span class="line">	<span class="token string">"time"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> guestbookTemplateHTML <span class="token operator">=</span> <span class="token string">`</span>
<span class="line">&lt;html></span>
<span class="line">  &lt;body></span>
<span class="line">    {{range .}}</span>
<span class="line">      {{with .Author}}</span>
<span class="line">        &lt;p>&lt;b>{{html .}}&lt;/b> wrote:&lt;/p></span>
<span class="line">      {{else}}</span>
<span class="line">        &lt;p>An anonymous person wrote:&lt;/p></span>
<span class="line">      {{end}}</span>
<span class="line">      &lt;pre>{{html .Content}}&lt;/pre></span>
<span class="line">      &lt;pre>{{html .Date}}&lt;/pre></span>
<span class="line">    {{end}}</span>
<span class="line">    &lt;form action="/sign" method="post"></span>
<span class="line">      &lt;div>&lt;textarea name="content" rows="3" cols="60">&lt;/textarea>&lt;/div></span>
<span class="line">      &lt;div>&lt;input type="submit" value="Sign Guestbook">&lt;/div></span>
<span class="line">    &lt;/form></span>
<span class="line">  &lt;/body></span>
<span class="line">&lt;/html></span>
<span class="line">`</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">var</span> guestbookTemplate <span class="token operator">=</span> template<span class="token punctuation">.</span><span class="token function">Must</span><span class="token punctuation">(</span>template<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">"book"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span>guestbookTemplateHTML<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">type</span> Greeting <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">	Author  <span class="token builtin">string</span></span>
<span class="line">	Content <span class="token builtin">string</span></span>
<span class="line">	Date    datastore<span class="token punctuation">.</span>Time</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">,</span> root<span class="token punctuation">)</span></span>
<span class="line">	http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">"/sign"</span><span class="token punctuation">,</span> sign<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">root</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	c <span class="token operator">:=</span> appengine<span class="token punctuation">.</span><span class="token function">NewContext</span><span class="token punctuation">(</span>r<span class="token punctuation">)</span></span>
<span class="line">	q <span class="token operator">:=</span> datastore<span class="token punctuation">.</span><span class="token function">NewQuery</span><span class="token punctuation">(</span><span class="token string">"Greeting"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Order</span><span class="token punctuation">(</span><span class="token string">"-Date"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Limit</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span></span>
<span class="line">	greetings <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span>Greeting<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">:=</span> q<span class="token punctuation">.</span><span class="token function">GetAll</span><span class="token punctuation">(</span>c<span class="token punctuation">,</span> <span class="token operator">&amp;</span>greetings<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">		http<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> err<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> http<span class="token punctuation">.</span>StatusInternalServerError<span class="token punctuation">)</span></span>
<span class="line">		<span class="token keyword">return</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	<span class="token keyword">if</span> err <span class="token operator">:=</span> guestbookTemplate<span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> greetings<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">		http<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> err<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> http<span class="token punctuation">.</span>StatusInternalServerError<span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">sign</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	c <span class="token operator">:=</span> appengine<span class="token punctuation">.</span><span class="token function">NewContext</span><span class="token punctuation">(</span>r<span class="token punctuation">)</span></span>
<span class="line">	g <span class="token operator">:=</span> Greeting<span class="token punctuation">{</span></span>
<span class="line">		Content<span class="token punctuation">:</span> r<span class="token punctuation">.</span><span class="token function">FormValue</span><span class="token punctuation">(</span><span class="token string">"content"</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">		Date<span class="token punctuation">:</span>    datastore<span class="token punctuation">.</span><span class="token function">SecondsToTime</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span><span class="token function">Seconds</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	<span class="token keyword">if</span> u <span class="token operator">:=</span> user<span class="token punctuation">.</span><span class="token function">Current</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">;</span> u <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">		g<span class="token punctuation">.</span>Author <span class="token operator">=</span> u<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	<span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">:=</span> datastore<span class="token punctuation">.</span><span class="token function">Put</span><span class="token punctuation">(</span>c<span class="token punctuation">,</span> datastore<span class="token punctuation">.</span><span class="token function">NewIncompleteKey</span><span class="token punctuation">(</span>c<span class="token punctuation">,</span> <span class="token string">"Greeting"</span><span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>g<span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">		http<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> err<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> http<span class="token punctuation">.</span>StatusInternalServerError<span class="token punctuation">)</span></span>
<span class="line">		<span class="token keyword">return</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	http<span class="token punctuation">.</span><span class="token function">Redirect</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> r<span class="token punctuation">,</span> <span class="token string">"/"</span><span class="token punctuation">,</span> http<span class="token punctuation">.</span>StatusFound<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>信号处理程序 (B) 从表单和上下文数据中构建了一个问候值 <code v-pre>g</code>，然后用 <code v-pre>datastore.Put()</code> 存储它。DataStore 在内部为数据记录生成自己的唯一 key；为了做到这一点，我们调用 <code v-pre>Put()</code> 函数，将</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">datastore<span class="token punctuation">.</span><span class="token function">NewIncompleteKey</span><span class="token punctuation">(</span>c<span class="token punctuation">,</span> <span class="token string">"Greeting"</span><span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>作为第 2 个参数（这个函数需要实体 <code v-pre>Greeting</code> 的名字）。<code v-pre>Put()</code>  的第 3 个参数 <code v-pre>&amp;g</code> 是一个包含 value 的 <code v-pre>struct</code> （严格来说，此处应为指向这个 <code v-pre>struct</code> 的指针）。</p>
<p><code v-pre>datastore</code> 包提供了一个查询类型，用于查询数据存储并迭代结果。根处理程序正是通过构造一个查询 <code v-pre>q()</code> 来实现的，该查询按照日期降序从DataStore 中请求问候对象，限制为 10 个。</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">q <span class="token operator">:=</span> datastore<span class="token punctuation">.</span><span class="token function">NewQuery</span><span class="token punctuation">(</span><span class="token string">"Greeting"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Order</span><span class="token punctuation">(</span><span class="token string">"-Date"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Limit</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>我们需要一个数据结构来存储我们的查询结果，也就是 <code v-pre>greetings</code>，一个 Greeting 值的切片。我们对 <code v-pre>q.GetAll(c, &amp;greetings)</code> 的调用检索了数据，并将它们存储在我们的切片中；当然，我们会检查可能的错误。</p>
<p>当一切正常时，我们通过与我们的模板合并来显示数据：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">guestbookTemplate<span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> greetings<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>这是由一个 <code v-pre>range</code> 结构执行的（参考 <RouteLink to="/chapter-4/15.7.html">15.7.6 节</RouteLink>）。</p>
<p>再次通过编辑 helloworld2.go 文件进行测试，用 listing 20.5 中的代码替换它；在问候中间的间隙关闭浏览器会话，这样你可以检查它们是否被持久保存。</p>
<p><u>清除开发用服务器的数据存储：</u></p>
<p>开发用 web 服务器使用一个本地版本的数据存储来测试你的应用程序，使用临时文件。只要临时文件存在，数据就会持续存在，除非你要求，否则 Web 服务器不会重置这些文件。如果你想让开发用服务器在启动前擦除其数据存储，请在启动服务器时使用 <code v-pre>--clear_datastore</code> 选项：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line">dev_appserver.py <span class="token parameter variable">--clear_datastore</span> helloapp/</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><u>调试：</u></p>
<p>gdb 调试器可以和 Go 一起使用（见 http://golang.org/doc/debugging_with_gdb.html），你可以将 gdb 附加到一个现有的进程中。因此：像往常一样启动 dev_appserver.py，并访问 <code v-pre>localhost:8080</code> 来启动你的 Go 应用程序。然后执行： <code v-pre>$ ps ax | grep _go_app</code>，找到 _go_app 的 PID 和路径。如果你把 gdb 连接到这个上面，那么你对 dev_appserver 的下一个 HTTP 请求应该会碰到你在代码中设置的任何断点。记住，如果你修改了 Go 的源代码，那么开发应用服务器将重新编译并执行不同的 _go_app。</p>
<h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-4/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-4/20.6.html">处理窗口</RouteLink></li>
<li>下一节：<RouteLink to="/chapter-4/20.8.html">上传到云端</RouteLink></li>
</ul>
</div></template>


