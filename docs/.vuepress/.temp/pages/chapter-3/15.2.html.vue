<template><div><h1 id="_15-2-一个简单的-web-服务器" tabindex="-1"><a class="header-anchor" href="#_15-2-一个简单的-web-服务器"><span>15.2 一个简单的 web 服务器</span></a></h1>
<p>http 是比 tcp 更高层的协议，它描述了网页服务器如何与客户端浏览器进行通信。Go 提供了 <code v-pre>net/http</code> 包，我们马上就来看下。先从一些简单的示例开始，首先编写一个“Hello world!”网页服务器：<a href="examples/chapter_15/hello_world_webserver.go">查看示例 15.6</a></p>
<p>我们引入了 <code v-pre>http</code> 包并启动了网页服务器，和 <RouteLink to="/chapter-3/15.1.html">15.1 节</RouteLink>的 <code v-pre>net.Listen(&quot;tcp&quot;, &quot;localhost:50000&quot;)</code> 函数的 tcp 服务器是类似的，使用 <code v-pre>http.ListenAndServe(&quot;localhost:8080&quot;, nil)</code> 函数，如果成功会返回空，否则会返回一个错误（地址 <code v-pre>localhost</code> 部分可以省略，<code v-pre>8080</code> 是指定的端口号）。</p>
<p><code v-pre>http.URL</code> 用于表示网页地址，其中字符串属性 <code v-pre>Path</code> 用于保存 url 的路径；<code v-pre>http.Request</code> 描述了客户端请求，内含一个 <code v-pre>URL</code> 字段。</p>
<p>如果 <code v-pre>req</code> 是来自 html 表单的 POST 类型请求，<code v-pre>“var1”</code> 是该表单中一个输入域的名称，那么用户输入的值就可以通过 Go 代码 <code v-pre>req.FormValue(&quot;var1&quot;)</code> 获取到（见 <RouteLink to="/chapter-3/15.4.html">15.4 节</RouteLink>）。还有一种方法是先执行 <code v-pre>request.ParseForm()</code>，然后再获取 <code v-pre>request.Form[&quot;var1&quot;]</code> 的第一个返回参数，就像这样：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">var1<span class="token punctuation">,</span> found <span class="token operator">:=</span> request<span class="token punctuation">.</span>Form<span class="token punctuation">[</span><span class="token string">"var1"</span><span class="token punctuation">]</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>第二个参数 <code v-pre>found</code> 为 <code v-pre>true</code>。如果 <code v-pre>var1</code> 并未出现在表单中，<code v-pre>found</code> 就是 <code v-pre>false</code>。</p>
<p>表单属性实际上是 <code v-pre>map[string][]string</code> 类型。网页服务器发送一个 <code v-pre>http.Response</code> 响应，它是通过 <code v-pre>http.ResponseWriter</code> 对象输出的，后者组装了 HTTP 服务器响应，通过对其写入内容，我们就将数据发送给了 HTTP 客户端。</p>
<p>现在我们仍然要编写程序，以实现服务器必须做的事，即如何处理请求。这是通过 <code v-pre>http.HandleFunc()</code> 函数完成的。在这个例子中，当根路径“/”（url 地址是 <code v-pre>http://localhost:8080</code>）被请求的时候（或者这个服务器上的其他任意地址），<code v-pre>HelloServer()</code> 函数就被执行了。这个函数是 <code v-pre>http.HandlerFunc</code> 类型的，它们通常被命名为 Prefhandler，和某个路径前缀 Pref 匹配。</p>
<p><code v-pre>http.HandleFunc</code> 注册了一个处理函数（这里是 <code v-pre>HelloServer()</code>）来处理对应 <code v-pre>/</code> 的请求。</p>
<p><code v-pre>/</code> 可以被替换为其他更特定的 url，比如 <code v-pre>/create</code>，<code v-pre>/edit</code> 等等；你可以为每一个特定的 url 定义一个单独的处理函数。这个函数需要两个参数：第一个是 <code v-pre>ReponseWriter</code> 类型的 <code v-pre>w</code>；第二个是请求 <code v-pre>req</code>。程序向 <code v-pre>w</code> 写入了 <code v-pre>Hello</code> 和 <code v-pre>r.URL.Path[1:]</code> 组成的字符串：末尾的 <code v-pre>[1:]</code> 表示“创建一个从索引为 1 的字符到结尾的子切片”，用来丢弃路径开头的“/”，<code v-pre>fmt.Fprintf()</code> 函数完成了本次写入（见 <RouteLink to="/chapter-3/12.8.html">12.8 节</RouteLink>）；另一种可行的写法是 <code v-pre>io.WriteString(w, &quot;hello, world!\n&quot;)</code>。</p>
<p>总结：第一个参数是请求的路径，第二个参数是当路径被请求时，需要调用的处理函数的引用。</p>
<p>示例 15.6 <a href="examples/chapter_15/hello_world_webserver.go">hello_world_webserver.go</a>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"fmt"</span></span>
<span class="line">	<span class="token string">"log"</span></span>
<span class="line">	<span class="token string">"net/http"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">HelloServer</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> req <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Inside HelloServer handler"</span><span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Fprintf</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> <span class="token string">"Hello,"</span><span class="token operator">+</span>req<span class="token punctuation">.</span>URL<span class="token punctuation">.</span>Path<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">:</span><span class="token punctuation">]</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">,</span> HelloServer<span class="token punctuation">)</span></span>
<span class="line">	err <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span><span class="token string">"localhost:8080"</span><span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span><span class="token string">"ListenAndServe: "</span><span class="token punctuation">,</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用命令行启动程序，会打开一个命令窗口显示如下文字：</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">Starting Process E:/Go/GoBoek/code_examples/chapter_14/hello_world_webserver.exe...</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>然后打开浏览器并输入 url 地址：<code v-pre>http://localhost:8080/world</code>，浏览器就会出现文字：<code v-pre>Hello, world</code>，网页服务器会响应你在 <code v-pre>:8080/</code> 后边输入的内容。</p>
<p><code v-pre>fmt.Println()</code> 在服务器端控制台打印状态；在每个处理函数被调用时，把请求记录下来也许更为有用。</p>
<p>注：
1）前两行（没有错误处理代码）可以替换成以下写法：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">http<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span><span class="token string">":8080"</span><span class="token punctuation">,</span> http<span class="token punctuation">.</span><span class="token function">HandlerFunc</span><span class="token punctuation">(</span>HelloServer<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>2）<code v-pre>fmt.Fprint()</code> 和 <code v-pre>fmt.Fprintf()</code> 都是可以用来写入 <code v-pre>http.ResponseWriter</code> 的函数（他们实现了 <code v-pre>io.Writer</code>）。</p>
<p>比如我们可以使用</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">fmt<span class="token punctuation">.</span><span class="token function">Fprintf</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> <span class="token string">"&lt;h1>%s&lt;/h1>&lt;div>%s&lt;/div>"</span><span class="token punctuation">,</span> title<span class="token punctuation">,</span> body<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>来构建一个非常简单的网页并插入 <code v-pre>title</code> 和 <code v-pre>body</code> 的值。</p>
<p>如果你需要更多复杂的替换，使用模板包（见 <RouteLink to="/chapter-3/15.7.html">15.7节</RouteLink>）</p>
<p>3）如果你需要使用安全的 https 连接，使用 <code v-pre>http.ListenAndServeTLS()</code> 代替 <code v-pre>http.ListenAndServe()</code></p>
<p>4）除了 <code v-pre>http.HandleFunc(&quot;/&quot;, Hfunc)</code>，其中的 <code v-pre>HFunc</code> 是一个处理函数，签名为：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">HFunc</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> req <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token operator">...</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也可以使用这种方式：<code v-pre>http.Handle(&quot;/&quot;, http.HandlerFunc(HFunc))</code></p>
<p><code v-pre>HandlerFunc</code> 只是定义了上述 <code v-pre>HFunc</code> 签名的别名：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">type</span> HandlerFunc <span class="token keyword">func</span><span class="token punctuation">(</span>ResponseWriter<span class="token punctuation">,</span> <span class="token operator">*</span>Request<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>它是一个可以把普通的函数当做 HTTP 处理器 (<code v-pre>Handler</code>) 的适配器。如果函数 <code v-pre>f</code> 声明得合适，<code v-pre>HandlerFunc(f)</code> 就是一个执行 <code v-pre>f</code> 函数的 <code v-pre>Handler</code> 对象。</p>
<p><code v-pre>http.Handle()</code> 的第二个参数也可以是 <code v-pre>T</code> 类型的对象 <code v-pre>obj</code>：<code v-pre>http.Handle(&quot;/&quot;, obj)</code>。</p>
<p>如果 <code v-pre>T</code> 有 <code v-pre>ServeHTTP()</code> 方法，那就实现了 http 的 <code v-pre>Handler</code> 接口：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>obj <span class="token operator">*</span>Typ<span class="token punctuation">)</span> <span class="token function">ServeHTTP</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> req <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token operator">...</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个用法也在 <RouteLink to="/chapter-3/15.8.html">15.8 节</RouteLink> <code v-pre>Counter</code> 和 <code v-pre>Chan</code> 类型上使用。只要实现了 <code v-pre>http.Handler</code>，<code v-pre>http</code> 包就可以处理任何 HTTP 请求。</p>
<p>练习 15.2：<a href="exercises/chapter_15/webhello2.go">webhello2.go</a></p>
<p>编写一个网页服务器监听端口 9999，有如下处理函数：</p>
<ul>
<li>
<p>当请求 <code v-pre>http://localhost:9999/hello/Name</code> 时，响应：<code v-pre>hello Name</code>（<code v-pre>Name</code> 需是一个合法的姓，比如 Chris 或者 Madeleine）</p>
</li>
<li>
<p>当请求 <code v-pre>http://localhost:9999/shouthello/Name</code> 时，响应：<code v-pre>hello NAME</code></p>
</li>
</ul>
<p>练习 15.3：<a href="exercises/chapter_15/hello_server.go">hello_server.go</a></p>
<p>创建一个空结构 <code v-pre>hello</code> 并为它实现 <code v-pre>http.Handler</code>。运行并测试。</p>
<h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-3/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-3/15.1.html">tcp 服务器</RouteLink></li>
<li>下一节：<RouteLink to="/chapter-3/15.3.html">访问并读取页面数据</RouteLink></li>
</ul>
</div></template>


