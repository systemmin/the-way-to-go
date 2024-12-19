<template><div><h1 id="_20-4-建造你自己的-hello-world-应用" tabindex="-1"><a class="header-anchor" href="#_20-4-建造你自己的-hello-world-应用"><span>20.4 建造你自己的 Hello world 应用</span></a></h1>
<p>现在让我们建造一个像 <RouteLink to="/chapter-4/20.3.html">20.3 节</RouteLink>中的 demo 一样的应用，但这次我们会探索得更深一些。</p>
<h2 id="_20-4-1-映像结构-map-structure-创造一个简单的-http-handler" tabindex="-1"><a class="header-anchor" href="#_20-4-1-映像结构-map-structure-创造一个简单的-http-handler"><span>20.4.1 映像结构 (map-structure)：创造一个简单的 http-handler</span></a></h2>
<p>创建一个目录，并给它起一个你的应用程序特有的名字，如：helloapp。这个应用程序的所有文件都在这个目录中。在这个目录中再创建一个名为 hello 的目录。这将包含我们的 hello 包的 Go 源代码文件。然后在 hello 目录下，创建一个名为 helloworld2.go 的文件，并赋予其以下内容（事实上与上文中的 demo 应用几乎相同）：</p>
<p><u><a href="examples%5Cchapter_20%5Chelloapp%5Chello%5Chelloworld2_version1.go">Listing 20.2 helloworld2_version1.go</a></u>:</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> hello</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"fmt"</span></span>
<span class="line">	<span class="token string">"net/http"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">,</span> handler<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">handler</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Fprint</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> <span class="token string">"Hello, world!"</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意包的名称：在编写独立的 Go 程序时，我们会把这段代码放在 <code v-pre>package main</code> 中，但 Go GAE Runtime 提供了 <code v-pre>main</code> 包和 HTTP Listener，所以你应该把你的代码放在你选择的包中，此时指的是 hello 包。其次，由于 Go App Engine 应用程序通过 Web 服务器与外部世界进行通信，所以编写这些应用程序非常像编写独立的 Go Web 应用程序（见<RouteLink to="/chapter-4/15.0.html">第 15 章</RouteLink>）。所以我们导入 <code v-pre>http</code> 包，并为我们的应用程序中使用的不同url 模式定义处理函数。我们没有 <code v-pre>main()</code> 函数，所以处理程序的设置必须移到 <code v-pre>init()</code> 函数中去。另外，网络服务器本身的启动是由 GAE 为我们完成的。我们的 Go 包 hello 对任何请求的响应是发送一个包含 &quot;Hello, world!&quot;的消息。</p>
<h2 id="_20-4-2-创建配置文件-app-yaml" tabindex="-1"><a class="header-anchor" href="#_20-4-2-创建配置文件-app-yaml"><span>20.4.2 创建配置文件 app.yaml</span></a></h2>
<p>所有的 GAE 应用程序都需要一个 yaml 配置文件 app.yaml，它包含了 GAE 的应用程序元数据（yaml 是一种文本文件格式，经常用于开源项目，更多信息见 www.yaml.org）。另外，这个文件告诉 App Engine 服务要使用哪个运行时，哪些 URL 应该由我们的 Go 程序处理。你可以从演示程序中复制一个 app.yaml 文件，把它放在映像 helloapp 里面，并删除 favicon.ico 的 handler。</p>
<p>应用程序的映像/文件结构应该如下：</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">helloapp\ 	// map of the GAE application</span>
<span class="line">app.yaml 	// configuration file</span>
<span class="line">hello\ 		// map containing the source files</span>
<span class="line">helloworld2.go</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>只有app.yaml是必须的名字，映像、Go文件和包的名字可以有不同的选择，但按照惯例，它们的名字是一样的或类似的，根映像的后缀是 app。
app.yaml 由 AppEngine 读取和解释，AppEngine 以下时间段内托管和执行你的程序：</p>
<ul>
<li>当您将您的应用程序上传到 AppEngine 以使其被托管。</li>
<li>当它被执行时。</li>
<li>当用户访问它时。</li>
</ul>
<p>它可以包含注释，前面有一个 <code v-pre>#</code>，并包含以下语句：</p>
<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre v-pre><code><span class="line"><span class="token key atrule">application</span><span class="token punctuation">:</span> helloworld</span>
<span class="line"><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token number">1</span></span>
<span class="line"><span class="token key atrule">runtime</span><span class="token punctuation">:</span> go</span>
<span class="line"><span class="token key atrule">api_version</span><span class="token punctuation">:</span> <span class="token number">3</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># routing-table: routing of different urls to different types of handlers</span></span>
<span class="line"><span class="token key atrule">handlers</span><span class="token punctuation">:</span></span>
<span class="line"><span class="token punctuation">-</span> <span class="token key atrule">url</span><span class="token punctuation">:</span> /.*</span>
<span class="line">  <span class="token key atrule">script</span><span class="token punctuation">:</span> _go_app</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>app.yaml 中的 <code v-pre>application: value helloworld</code> 是您的应用程序标识符。这个值在开发过程中可以是任何东西；以后在向 App Engine 注册您的应用程序时，您将选择一个唯一的标识符（在所有 GAE 应用程序中唯一）并更新这个值。</p>
<p><code v-pre>version</code> 表示您的应用程序正在运行的版本：事实上，GAE 可以并行地运行您的应用程序的几个版本，但其中一个必须被指定为默认版本。它可以包含字母数字字符，以及连字符。因此，你可以运行一个测试版本，如T2-31 和一个生产版本 P2-1。</p>
<p><code v-pre>runtime</code> 是编写应用程序的语言（其他允许的值是 Java 和 Python）。如果你在上传应用软件的新版本之前调整它，App Engine 将保留以前的版本，并让你使用管理控制台回退到以前的版本。</p>
<p><code v-pre>api_version</code> 是本 SDK 中使用的 Go API 的版本；它们可能与以前的版本不兼容。你可以在以前的 api_version SDK 中构建你的应用程序的早期版本；如果 GAE 仍然允许，它们可以继续运行，但通常有一个时间限制，而你应该将你的应用程序更新到新的api版本：bin map中的gofix工具可能能够完成大部分所需的更新。</p>
<p><code v-pre>handler</code> 部分是循环表 (routing table)：它告诉 GAE 如何将发送到服务器上的请求映射到代码中。对于每一个传入的请求 url 模式（本地开发时在 http://localhost:8080/ 之后的部分，在云端运行时在 http://appname.appspot.com/ 之后的部分）与 url 后面的正则表达式相匹配。</p>
<p>对于第一个匹配的 url 模式，相应的脚本会被执行。在我们的例子中，每一个路径与正则表达式 <code v-pre>/.*</code> 相匹配的 URL 请求（即：所有 URL）都应该由 Go 程序处理。<code v-pre>_go_app</code> 值是 dev_appserver.py 识别的一个神奇字符串；生产的 App Engine 服务器会忽略它。</p>
<p>如果你看一下演示的 helloworld 应用程序的 app.yaml 文件，你会发现它在处理程序中包含一个初始部分：</p>
<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre v-pre><code><span class="line"><span class="token key atrule">handlers</span><span class="token punctuation">:</span></span>
<span class="line"><span class="token punctuation">-</span> <span class="token key atrule">url</span><span class="token punctuation">:</span> /favicon\.ico</span>
<span class="line">  <span class="token key atrule">static_files</span><span class="token punctuation">:</span> favicon.ico</span>
<span class="line">  <span class="token key atrule">upload</span><span class="token punctuation">:</span> favicon\.ico</span>
<span class="line"><span class="token punctuation">-</span> <span class="token key atrule">url</span><span class="token punctuation">:</span> /.*</span>
<span class="line">  <span class="token key atrule">script</span><span class="token punctuation">:</span> _go_app</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一些文件 (<code v-pre>static_files</code>) ，如图片，不会改变（在这个例子中是图片favicon.ico）。这些文件可以放在不同的 AppEngine 服务器上的一种共同缓存中，使它们能够更快地提供给用户。如果您的应用程序有许多这样的文件，把它们放在一个单独的目录中，按惯例命名为 static。</p>
<p><code v-pre>upload</code> 表示当您部署应用程序时，什么必须上传到云端；例如，如果它包含 images/(*.ico|*.gif|*.jpg)，它将把本地 images 目录内所有这些类型的文件上传到 AppEngine 服务器。</p>
<p>正如我们将看到的，大多数 GAE 应用程序也使用模板文件，这些文件可以存储在根应用程序地图中，或在一个特殊的目录 tmpl 中。</p>
<p>因此，一个 GAE 应用程序的一般结构可能是：</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">yourapp\ 		// map of the GAE application</span>
<span class="line">		app.yaml // configuration file</span>
<span class="line">		yourpackage\ // map containing the source files</span>
<span class="line">			package1.go</span>
<span class="line">			…</span>
<span class="line">		tmpl\ // map containing template files</span>
<span class="line">			root.html</span>
<span class="line">			update.html</span>
<span class="line">			…</span>
<span class="line">		static\ // map containing static files</span>
<span class="line">			yourapp.ico</span>
<span class="line">			…</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与 demo 一样，在控制台窗口中进入包含 helloapp 的映像，并发出如下命令：<code v-pre>dev_appserver.py helloapp</code></p>
<p>或者你可以通过任何一个映像的 console 窗口并且唤醒：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line">dev_appserver.py /path_to_map_helloapp/helloapp</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>在这两种情况下，网络服务器现在都在运行，并监听 8080 端口的请求。通过在你的网络浏览器中访问以下 URL 来测试该应用程序：http://localhost:8080/</p>
<p>你应该看到： Hello, world!</p>
<p>在服务器控制台，出现以下文字：</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">$ dev_appserver.py helloapp</span>
<span class="line">INFO 2011-10-31 08:54:29,021 appengine_rpc.py:159] Server: appengine.google.com</span>
<span class="line">INFO 2011-10-31 08:54:29,025 appcfg.py:463] Checking for updates to the SDK.</span>
<span class="line">INFO 2011-10-31 08:54:29,316 appcfg.py:481] The SDK is up to date.</span>
<span class="line">WARNING 2011-10-31 08:54:29,316 datastore_file_stub.py:512] Could not read datastore</span>
<span class="line">data from /tmp/dev_appserver.datastore</span>
<span class="line">INFO 2011-10-31 08:54:29,317 rdbms_sqlite.py:58] Connecting to SQLite database ‘’</span>
<span class="line">with file ‘/tmp/dev_appserver.rdbms’</span>
<span class="line">INFO 2011-10-31 08:54:29,638 dev_appserver_multiprocess.py:637] Running application</span>
<span class="line">helloworld on port 8080: http://localhost:8080</span>
<span class="line">		&lt;-(A)</span>
<span class="line">INFO 2011-10-31 08:56:13,148 __init__.py:365] building _go_app</span>
<span class="line">		&lt;-(B)</span>
<span class="line">INFO 2011-10-31 08:56:15,073 __init__.py:351] running _go_app</span>
<span class="line">INFO 2011-10-31 08:56:15,188 dev_appserver.py:4143] “GET / HTTP/1.1” 200 -</span>
<span class="line">		&lt;-(C)</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 (A) 处服务器准备好了，在 (B) 处服务器编译并运行 Go 程序，在 (C) 处我们的应用程序的请求进来了，此时 HTML 输出页面被提供到服务器上。</p>
<p>当服务器被终止或尚未启动，而客户端请求网址 http://localhost:8080/，浏览器在FireFox 中会打印出这样的信息：</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">Unable to connect Firefox can’t establish a connection to the server at localhost:8080.</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="_20-4-3-迭代开发" tabindex="-1"><a class="header-anchor" href="#_20-4-3-迭代开发"><span>20.4.3 迭代开发</span></a></h2>
<p>开发应用的服务器会观察你的文件中的变化，当你更新你的源代码时（编辑+保存），它重新编译它们并重新启动你的本地应用；不需要重新启动 dev_appserver.py</p>
<p>现在试试：让 Web 服务器运行，然后编辑 helloworld2.go，将 &quot;Hello, world!&quot; 改为其他内容。重新加载 http://localhost:8080/，就可以看到变化了：这和编写 Rails 或 Django 应用程序一样，都是动态运行的。</p>
<p>要关闭 Web 服务器，确保终端窗口处于活动状态，然后按 Ctrl+C（或适当的用于控制台的 &quot;break &quot;键）：</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">INFO 2011-10-31 08:56:21,420 dev_appserver.py:4143] “GET / HTTP/1.1” 200 -</span>
<span class="line">INFO 2011-10-31 08:57:59,836 __init__.py:365] building _go_app &lt;-(D)</span>
<span class="line">INFO 2011-10-31 08:58:00,365 __init__.py:351] running _go_app</span>
<span class="line">INFO 2011-10-31 08:58:00,480 dev_appserver.py:4143] “GET / HTTP/1.1” 200 -</span>
<span class="line">^CINFO 2011-10-31 08:58:32,769 dev_appserver_main.py:665] Server interrupted by user,</span>
<span class="line">terminating &lt;-(E)</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这可以从上面第一个列表之后的服务器控制台输出中看到：在 (D) 处，apperver 看到 Go 的源代码被改变了，并重新编译；在 (E) 处，服务器被终止了。</p>
<h2 id="_20-4-4-与-goclipse-ide-的集成" tabindex="-1"><a class="header-anchor" href="#_20-4-4-与-goclipse-ide-的集成"><span>20.4.4. 与 GoClipse IDE 的集成</span></a></h2>
<p>a) 窗口/首选项/Go：</p>
<p>将所有内容指向 GAE 的 Go 根目录</p>
<p>b) 运行/外部工具/外部工具配置/选择程序：</p>
<p>​	 制作新的配置：点击 New 按钮。
​		名称：GAE
​		位置：/home/user/google_appengine/dev_appserver.py
​		工作目录：/home/user/workspace/bedilly/src/pkg/helloapp
​		参数： home/user/workspace/bedilly/src/pkg/helloapp
​	应用/运行</p>
<p>通过配置一个外部工具，部署你的应用程序也很容易：http://code.google.com/p/goclipse/wiki/DeployingToGoogleAppEngineFromEclipse</p>
<h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-4/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-4/20.3.html">安装 Go App Engine SDK</RouteLink></li>
<li>下一节：<RouteLink to="/chapter-4/20.5.html">使用用户服务和探索其 API</RouteLink></li>
</ul>
</div></template>


