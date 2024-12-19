<template><div><h1 id="版本-4-用-json-持久化存储" tabindex="-1"><a class="header-anchor" href="#版本-4-用-json-持久化存储"><span>版本 4 - 用 JSON 持久化存储</span></a></h1>
<p>第 4 个版本的代码 <em>goto_v4</em> 见 <a href="examples/chapter_19/goto_v4">goto_v4</a>。</p>
<h1 id="_19-7-以-json-格式存储" tabindex="-1"><a class="header-anchor" href="#_19-7-以-json-格式存储"><span>19.7 以 json 格式存储</span></a></h1>
<p>如果你是个敏锐的测试者也许已经注意到了，当 goto 程序启动 2 次，第 2 次启动后能读取短 URL 且完美地工作。然而从第 3 次开始，会得到错误：</p>
<pre><code>Error loading URLStore: extra data in buffer
</code></pre>
<p>这是由于 gob 是基于流的协议，它不支持重新开始。为补救该问题，这里我们使用 json 作为存储协议（见 <RouteLink to="/chapter-4/12.9.html">12.9 节</RouteLink>），它以纯文本形式存储数据，因此也可以被非 Go 语言编写的进程读取。同时也显示了更换一种不同的持久化协议是多么简单，因为与存储打交道的代码被清晰地隔离在 2 个方法中，即 <code v-pre>load()</code> 和 <code v-pre>saveLoop()</code>。</p>
<p>从创建新的空文件 store.json 开始，更改 main.go 中声明文件名变量的那一行：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">var</span> dataFile <span class="token operator">=</span> flag<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token string">"file"</span><span class="token punctuation">,</span> <span class="token string">"store.json"</span><span class="token punctuation">,</span> <span class="token string">"data store file name"</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>在 store.go 中导入 <code v-pre>json</code> 取代 <code v-pre>gob</code>。然后在 <code v-pre>saveLoop()</code> 中唯一需要被修改的行：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">e <span class="token operator">:=</span> gob<span class="token punctuation">.</span><span class="token function">NewEncoder</span><span class="token punctuation">(</span>f<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>更改为：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">e <span class="token operator">:=</span> json<span class="token punctuation">.</span><span class="token function">NewEncoder</span><span class="token punctuation">(</span>f<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>类似的，在 <code v-pre>load</code> 方法中：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">d <span class="token operator">:=</span> gob<span class="token punctuation">.</span><span class="token function">NewDecoder</span><span class="token punctuation">(</span>f<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>修改为：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">d <span class="token operator">:=</span> json<span class="token punctuation">.</span><span class="token function">NewDecoder</span><span class="token punctuation">(</span>f<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>这就是所有要改动的地方！编译，启动并测试，你会发现之前的错误不会再发生了。</p>
<h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-4/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-4/19.6.html">用协程优化性能</RouteLink></li>
<li>下一节：<RouteLink to="/chapter-4/19.8.html">多服务器处理架构</RouteLink></li>
</ul>
</div></template>


