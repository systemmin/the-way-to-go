<template><div><h1 id="_15-9-用-rpc-实现远程过程调用" tabindex="-1"><a class="header-anchor" href="#_15-9-用-rpc-实现远程过程调用"><span>15.9 用 rpc 实现远程过程调用</span></a></h1>
<p>Go 程序之间可以使用 <code v-pre>net/rpc</code> 包实现相互通信，这是另一种客户端-服务器应用场景。它提供了一种方便的途径，通过网络连接调用远程函数。当然，仅当程序运行在不同机器上时，这项技术才实用。<code v-pre>rpc</code> 包建立在 <code v-pre>gob</code> 包之上（见 <RouteLink to="/chapter-3/12.11.html">12.11 节</RouteLink>），实现了自动编码/解码传输的跨网络方法调用。</p>
<p>服务器端需要注册一个对象实例，与其类型名一起，使之成为一项可见的服务：它允许远程客户端跨越网络或其他 I/O 连接访问此对象已导出的方法。总之就是在网络上暴露类型的方法。</p>
<p><code v-pre>rpc</code> 包使用了 http 和 tcp 协议，以及用于数据传输的 <code v-pre>gob</code> 包。服务器端可以注册多个不同类型的对象（服务），但同一类型的多个对象会产生错误。</p>
<p>我们讨论一个简单的例子：定义一个类型 <code v-pre>Args</code> 及其方法 <code v-pre>Multiply()</code>，完美地置于单独的包中。方法必须返回可能的错误。</p>
<p>示例15.21 <a href="examples/chapter_15/rpc/rpc_objects.go">rpc_objects.go</a></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> rpc_objects</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token string">"net"</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">type</span> Args <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">	N<span class="token punctuation">,</span> M <span class="token builtin">int</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>t <span class="token operator">*</span>Args<span class="token punctuation">)</span> <span class="token function">Multiply</span><span class="token punctuation">(</span>args <span class="token operator">*</span>Args<span class="token punctuation">,</span> reply <span class="token operator">*</span><span class="token builtin">int</span><span class="token punctuation">)</span> net<span class="token punctuation">.</span>Error <span class="token punctuation">{</span></span>
<span class="line">	<span class="token operator">*</span>reply <span class="token operator">=</span> args<span class="token punctuation">.</span>N <span class="token operator">*</span> args<span class="token punctuation">.</span>M</span>
<span class="line">	<span class="token keyword">return</span> <span class="token boolean">nil</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（<strong>译注：Go 当前版本要求此方法返回类型为 <code v-pre>error</code>，以上示例中返回 <code v-pre>net.Error</code> 已无法通过编译，见更新后的 <a href="examples/chapter_15/rpc_updated/rpc_objects/rpc_objects.go">rpc_objects.go</a>。</strong>）</p>
<p>服务器端产生一个 <code v-pre>rpc_objects.Args</code> 类型的对象 <code v-pre>calc</code>，并用 <code v-pre>rpc.Register(object)</code> 注册。调用 <code v-pre>HandleHTTP()</code>，然后用 <code v-pre>net.Listen</code> 在指定的地址上启动监听。也可以按名称来注册对象，例如：<code v-pre>rpc.RegisterName(&quot;Calculator&quot;, calc)</code>。</p>
<p>以协程启动 <code v-pre>http.Serve(listener, nil)</code> 后，会为每一个进入 <code v-pre>listener</code> 的 HTTP 连接创建新的服务线程。我们必须用诸如 <code v-pre>time.Sleep(1000e9)</code> 来使服务器在一段时间内保持运行状态。</p>
<p>示例 15.22 <a href="examples/chapter_15/rpc/rpc_server.go">rpc_server.go</a></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"net/http"</span></span>
<span class="line">	<span class="token string">"log"</span></span>
<span class="line">	<span class="token string">"net"</span></span>
<span class="line">	<span class="token string">"net/rpc"</span></span>
<span class="line">	<span class="token string">"time"</span></span>
<span class="line">	<span class="token string">"./rpc_objects"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	calc <span class="token operator">:=</span> <span class="token function">new</span><span class="token punctuation">(</span>rpc_objects<span class="token punctuation">.</span>Args<span class="token punctuation">)</span></span>
<span class="line">	rpc<span class="token punctuation">.</span><span class="token function">Register</span><span class="token punctuation">(</span>calc<span class="token punctuation">)</span></span>
<span class="line">	rpc<span class="token punctuation">.</span><span class="token function">HandleHTTP</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	listener<span class="token punctuation">,</span> e <span class="token operator">:=</span> net<span class="token punctuation">.</span><span class="token function">Listen</span><span class="token punctuation">(</span><span class="token string">"tcp"</span><span class="token punctuation">,</span> <span class="token string">"localhost:1234"</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">if</span> e <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span><span class="token string">"Starting RPC-server -listen error:"</span><span class="token punctuation">,</span> e<span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	<span class="token keyword">go</span> http<span class="token punctuation">.</span><span class="token function">Serve</span><span class="token punctuation">(</span>listener<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span></span>
<span class="line">	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">1000e9</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p>
<pre><code>Starting Process E:/Go/GoBoek/code_examples/chapter_14/rpc_server.exe ...
** 5 秒后： **
End Process exit status 0
</code></pre>
<p>客户端必须知晓对象类型及其方法的定义。执行 <code v-pre>rpc.DialHTTP()</code> 连接到服务器后，就可以用 <code v-pre>client.Call(&quot;Type.Method&quot;, args, &amp;reply)</code> 调用远程对象的方法。<code v-pre>Type</code> 是远程对象的类型名，<code v-pre>Method</code> 是要调用的方法，<code v-pre>args</code> 是用 <code v-pre>Args</code> 类型初始化的对象，<code v-pre>reply</code> 是一个必须事先声明的变量，方法调用产生的结果将存入其中。</p>
<p>示例 15.23 <a href="examples/chapter_15/rpc/rpc_client.go">rpc_client.go</a></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"fmt"</span></span>
<span class="line">	<span class="token string">"log"</span></span>
<span class="line">	<span class="token string">"net/rpc"</span></span>
<span class="line">	<span class="token string">"./rpc_objects"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> serverAddress <span class="token operator">=</span> <span class="token string">"localhost"</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	client<span class="token punctuation">,</span> err <span class="token operator">:=</span> rpc<span class="token punctuation">.</span><span class="token function">DialHTTP</span><span class="token punctuation">(</span><span class="token string">"tcp"</span><span class="token punctuation">,</span> serverAddress <span class="token operator">+</span> <span class="token string">":1234"</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span><span class="token string">"Error dialing:"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	<span class="token comment">// Synchronous call</span></span>
<span class="line">	args <span class="token operator">:=</span> <span class="token operator">&amp;</span>rpc_objects<span class="token punctuation">.</span>Args<span class="token punctuation">{</span><span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">}</span></span>
<span class="line">	<span class="token keyword">var</span> reply <span class="token builtin">int</span></span>
<span class="line">	err <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">Call</span><span class="token punctuation">(</span><span class="token string">"Args.Multiply"</span><span class="token punctuation">,</span> args<span class="token punctuation">,</span> <span class="token operator">&amp;</span>reply<span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span><span class="token string">"Args error:"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Args: %d * %d = %d"</span><span class="token punctuation">,</span> args<span class="token punctuation">.</span>N<span class="token punctuation">,</span> args<span class="token punctuation">.</span>M<span class="token punctuation">,</span> reply<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>先启动服务器，再运行客户端，然后就能得到如下输出结果：</p>
<pre><code>Starting Process E:/Go/GoBoek/code_examples/chapter_14/rpc_client.exe ...

Args: 7 * 8 = 56
End Process exit status 0
</code></pre>
<p>该远程调用以同步方式进行，它会等待服务器返回结果。也可使用如下方式异步地执行调用：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">call1 <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">Go</span><span class="token punctuation">(</span><span class="token string">"Args.Multiply"</span><span class="token punctuation">,</span> args<span class="token punctuation">,</span> <span class="token operator">&amp;</span>reply<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span></span>
<span class="line">replyCall <span class="token operator">:=</span> <span class="token operator">&lt;-</span> call1<span class="token punctuation">.</span>Done</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果最后一个参数值为 <code v-pre>nil</code> ，调用完成后会创建一个新的通道。</p>
<p>如果你有一个以 root 管理员身份运行的 Go 服务器，想要以不同的用户身份运行某部分代码，Brad Fitz 利用 <code v-pre>rpc</code> 写的 <code v-pre>go-runas</code> 包可以完成任务：<a href="https://github.com/bradfitz/go-runas" target="_blank" rel="noopener noreferrer">https://github.com/bradfitz/go-runas</a>。我们将会在 <RouteLink to="/chapter-3/19.0.html">19 章</RouteLink>看到一个完整的项目，它是一个使用了 <code v-pre>rpc</code> 的应用程序。</p>
<h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-3/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-3/15.8.html">精巧的多功能网页服务器</RouteLink></li>
<li>下一节：<RouteLink to="/chapter-3/15.10.html">基于网络的通道 netchan</RouteLink></li>
</ul>
</div></template>


