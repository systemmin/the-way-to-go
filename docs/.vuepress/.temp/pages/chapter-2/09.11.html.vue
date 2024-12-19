<template><div><h1 id="_9-11-在-go-程序中使用外部库" tabindex="-1"><a class="header-anchor" href="#_9-11-在-go-程序中使用外部库"><span>9.11 在 Go 程序中使用外部库</span></a></h1>
<p>（本节我们将创建一个 Web 应用和它的 Google App Engine 版本，在第 19 和 21 章分别说明，当你阅读到这些章节时可以再回到这个例子。)</p>
<p>当开始一个新项目或增加新的功能到现有的项目，你可以通过在应用程序中使用已经存在的库来节省开发时间。为了做到这一点，你必须理解库的 API（应用编程接口），那就是：库中有哪些方法可以调用，如何调用。你可能没有这个库的源代码，但作者肯定有记载的 API 以及详细介绍了如何使用它。</p>
<p>作为一个例子，我们将使用谷歌的 API 的 urlshortener 编写一个小程序：你可以尝试一下在 http://goo.gl/ 输入一个像 &quot;http://www.destandaard.be&quot; 这样的 URL，你会看到一个像 &quot;http://goo.gl/O9SUO&quot; 这样更短的 URL 返回，也就是说，在 Twitter 之类的服务中这是非常容易嵌入的。谷歌 urlshortener 服务的文档可以在 &quot;http://code.google.com/apis/urlshortener/&quot; 找到。(<RouteLink to="/chapter-2/19.0.html">第 19 章</RouteLink>，我们将开发自己版本的 urlshortener)。</p>
<p>谷歌将这项技术提供给其他开发者，我们可以在我们自己的应用程序中调用  API （释放到指定的限制）。他们也生成了一个 Go 语言客户端库使调用变得更容易。</p>
<p>备注：谷歌让通过使用 Google API Go 客户端服务的开发者生活变得更简单，Go 客户端程序自动生成于 Google 库的 JSON 描述。更多详情在 <a href="http://code.google.com/p/google-api-go-client/" target="_blank" rel="noopener noreferrer">项目页面</a> 查看。</p>
<p>下载并安装 Go 客户端库:
将通过 go install 实现。但是首先要验证环境变量中是否含有 <code v-pre>GOPATH</code> 变量，因为外部源码将被下载到 <code v-pre>$GOPATH/src</code> 目录下并被安装到 <code v-pre>$GOPATH/PKG/&quot;machine_arch&quot;/</code> 目录下。</p>
<p>我们将通过在终端调用以下命令来安装 API:</p>
<pre><code>go install google.golang.org/api/urlshortener/v1
</code></pre>
<p>go install 将下载源码，编译并安装包</p>
<p>使用 urlshortener 服务的 web 程序:
现在我们可以通过导入并赋予别名来使用已安装的包：</p>
<pre><code>import  &quot;google.golang.org/api/urlshortener/v1&quot;
</code></pre>
<p>现在我们写一个 Web 应用（参见<RouteLink to="/chapter-2/15.4.html">第 15 章 4-8 节</RouteLink>）通过表单实现短地址和长地址的相互转换。我们将使用 <code v-pre>template</code> 包并写三个处理函数：<code v-pre>root()</code> 函数通过执行表单模板来展示表单，<code v-pre>short()</code> 函数将长地址转换为短地址，<code v-pre>long()</code> 函数逆向转换。</p>
<p>要调用 <code v-pre>urlshortener</code> 接口必须先通过 <code v-pre>http</code> 包中的默认客户端创建一个服务实例 <code v-pre>urlshortenerSvc</code>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">urlshortenerSvc<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> urlshortener<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>DefaultClient<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>我们通过调用服务中的 <code v-pre>Url.Insert</code> 中的 <code v-pre>Do</code> 方法传入包含长地址的 <code v-pre>Url</code> 数据结构从而获取短地址：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">url<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> urlshortenerSvc<span class="token punctuation">.</span>Url<span class="token punctuation">.</span><span class="token function">Insert</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>urlshortener<span class="token punctuation">.</span>Url<span class="token punctuation">{</span>LongUrl<span class="token punctuation">:</span> longUrl<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>返回 <code v-pre>url</code> 的 <code v-pre>Id</code> 便是我们需要的短地址。</p>
<p>我们通过调用服务中的 <code v-pre>Url.Get</code> 中的 <code v-pre>Do</code> 方法传入包含短地址的 Url 数据结构从而获取长地址：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">url<span class="token punctuation">,</span> <span class="token builtin">error</span> <span class="token operator">:=</span> urlshortenerSvc<span class="token punctuation">.</span>Url<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span>shwortUrl<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>返回的长地址便是转换前的原始地址。</p>
<p>示例 9.9	<a href="examples/chapter_9/use_urlshortener.go">urlshortener.go</a></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	 <span class="token string">"fmt"</span></span>
<span class="line">	 <span class="token string">"net/http"</span></span>
<span class="line">	 <span class="token string">"text/template"</span></span>
<span class="line"></span>
<span class="line">	 <span class="token string">"google.golang.org/api/urlshortener/v1"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	 http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">,</span> root<span class="token punctuation">)</span></span>
<span class="line">	 http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">"/short"</span><span class="token punctuation">,</span> short<span class="token punctuation">)</span></span>
<span class="line">	 http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">"/long"</span><span class="token punctuation">,</span> long<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">	 http<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span><span class="token string">"localhost:8080"</span><span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token comment">// the template used to show the forms and the results web page to the user</span></span>
<span class="line"><span class="token keyword">var</span> rootHtmlTmpl <span class="token operator">=</span> template<span class="token punctuation">.</span><span class="token function">Must</span><span class="token punctuation">(</span>template<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">"rootHtml"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token string">`</span>
<span class="line">&lt;html>&lt;body></span>
<span class="line">&lt;h1>URL SHORTENER&lt;/h1></span>
<span class="line">{{if .}}{{.}}&lt;br />&lt;br />{{end}}</span>
<span class="line">&lt;form action="/short" type="POST"></span>
<span class="line">Shorten this: &lt;input type="text" name="longUrl" /></span>
<span class="line">&lt;input type="submit" value="Give me the short URL" /></span>
<span class="line">&lt;/form></span>
<span class="line">&lt;br /></span>
<span class="line">&lt;form action="/long" type="POST"></span>
<span class="line">Expand this: http://goo.gl/&lt;input type="text" name="shortUrl" /></span>
<span class="line">&lt;input type="submit" value="Give me the long URL" /></span>
<span class="line">&lt;/form></span>
<span class="line">&lt;/body>&lt;/html></span>
<span class="line">`</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">root</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	rootHtmlTmpl<span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">short</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	 longUrl <span class="token operator">:=</span> r<span class="token punctuation">.</span><span class="token function">FormValue</span><span class="token punctuation">(</span><span class="token string">"longUrl"</span><span class="token punctuation">)</span></span>
<span class="line">	 urlshortenerSvc<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> urlshortener<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>DefaultClient<span class="token punctuation">)</span></span>
<span class="line">	 url<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> urlshortenerSvc<span class="token punctuation">.</span>Url<span class="token punctuation">.</span><span class="token function">Insert</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>urlshortener<span class="token punctuation">.</span>Url<span class="token punctuation">{</span>LongUrl<span class="token punctuation">:</span></span>
<span class="line">	 longUrl<span class="token punctuation">,</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	 rootHtmlTmpl<span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">"Shortened version of %s is : %s"</span><span class="token punctuation">,</span></span>
<span class="line">	 longUrl<span class="token punctuation">,</span> url<span class="token punctuation">.</span>Id<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">long</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	 shortUrl <span class="token operator">:=</span> <span class="token string">"http://goo.gl/"</span> <span class="token operator">+</span> r<span class="token punctuation">.</span><span class="token function">FormValue</span><span class="token punctuation">(</span><span class="token string">"shortUrl"</span><span class="token punctuation">)</span></span>
<span class="line">	 urlshortenerSvc<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> urlshortener<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>DefaultClient<span class="token punctuation">)</span></span>
<span class="line">	 url<span class="token punctuation">,</span> err <span class="token operator">:=</span> urlshortenerSvc<span class="token punctuation">.</span>Url<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span>shortUrl<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	 <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">		 fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"error: %v"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span></span>
<span class="line">		 <span class="token keyword">return</span></span>
<span class="line"></span>
<span class="line">	 <span class="token punctuation">}</span></span>
<span class="line">	 rootHtmlTmpl<span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">"Longer version of %s is : %s"</span><span class="token punctuation">,</span></span>
<span class="line">	 shortUrl<span class="token punctuation">,</span> url<span class="token punctuation">.</span>LongUrl<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行这段代码：</p>
<pre><code>go run urlshortener.go
</code></pre>
<p>通过浏览 <code v-pre>http://localhost:8080/</code> 的页面来测试。</p>
<p>为了代码的简洁我们并没有检测返回的错误状态，但是在真实的生产环境的应用中一定要做检测。</p>
<p>将应用放入 Google App Engine，我们只需要在之前的代码中作出如下改变：</p>
<pre><code>package main -&gt; package urlshort
func main() -&gt; func init()
</code></pre>
<p>创建一个和包同名的目录 <code v-pre>urlshort</code>，并将以下两个安装目录复制到这个目录：</p>
<pre><code>google.golang.org/api/urlshortener
google.golang.org/api/googleapi
</code></pre>
<p>此外还要配置下配置文件 <code v-pre>app.yaml</code>，内容如下：</p>
<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre v-pre><code><span class="line"><span class="token key atrule">application</span><span class="token punctuation">:</span> urlshort</span>
<span class="line"><span class="token key atrule">version</span><span class="token punctuation">:</span> 0<span class="token punctuation">-</span>1<span class="token punctuation">-</span>test</span>
<span class="line"><span class="token key atrule">runtime</span><span class="token punctuation">:</span> go</span>
<span class="line"><span class="token key atrule">api_version</span><span class="token punctuation">:</span> <span class="token number">3</span></span>
<span class="line"><span class="token key atrule">handlers</span><span class="token punctuation">:</span></span>
<span class="line"><span class="token punctuation">-</span> <span class="token key atrule">url</span><span class="token punctuation">:</span> /.*</span>
<span class="line"><span class="token key atrule">script</span><span class="token punctuation">:</span> _go_app</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在你可以到你的项目目录并在终端运行：<code v-pre>dev_appserver.py urlshort</code></p>
<p>在浏览器打开你的 Web应用：http://localhost:8080。</p>
</div></template>


