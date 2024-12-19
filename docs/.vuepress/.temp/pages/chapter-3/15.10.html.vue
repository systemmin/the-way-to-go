<template><div><h1 id="_15-10-基于网络的通道-netchan" tabindex="-1"><a class="header-anchor" href="#_15-10-基于网络的通道-netchan"><span>15.10 基于网络的通道 netchan</span></a></h1>
<p>备注：Go 团队决定改进并重新打造 <code v-pre>netchan</code> 包的现有版本，它已被移至 <code v-pre>old/netchan</code>。<code v-pre>old/</code> 目录用于存放过时的包代码，它们不会成为 Go 1.x 的一部分。本节仅出于向后兼容性讨论 <code v-pre>netchan</code> 包的概念。</p>
<p>一项和 <code v-pre>rpc</code> 密切相关的技术是基于网络的通道。类似 <RouteLink to="/chapter-3/14.0.html">14 章</RouteLink>所使用的通道都是本地的，它们仅存在于被执行的机器内存空间中。<code v-pre>netchan</code> 包实现了类型安全的网络化通道：它允许一个通道两端出现由网络连接的不同计算机。其实现原理是，在其中一台机器上将传输数据发送到通道中，那么就可以被另一台计算机上同类型的通道接收。一个导出器 (<code v-pre>exporter</code>) 会按名称发布（一组）通道。导入器 (<code v-pre>importer</code>) 连接到导出的机器，并按名称导入这些通道。之后，两台机器就可按通常的方式来使用通道。网络通道不是同步的，它们类似于带缓存的通道。</p>
<p>发送端示例代码如下：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">exp<span class="token punctuation">,</span> err <span class="token operator">:=</span> netchan<span class="token punctuation">.</span><span class="token function">NewExporter</span><span class="token punctuation">(</span><span class="token string">"tcp"</span><span class="token punctuation">,</span> <span class="token string">"netchanserver.mydomain.com:1234"</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">	log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"Error making Exporter: %v"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line">ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> myType<span class="token punctuation">)</span></span>
<span class="line">err <span class="token operator">:=</span> exp<span class="token punctuation">.</span><span class="token function">Export</span><span class="token punctuation">(</span><span class="token string">"sendmyType"</span><span class="token punctuation">,</span> ch<span class="token punctuation">,</span> netchan<span class="token punctuation">.</span>Send<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">	log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"Send Error: %v"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接收端示例代码如下：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">imp<span class="token punctuation">,</span> err <span class="token operator">:=</span> netchan<span class="token punctuation">.</span><span class="token function">NewImporter</span><span class="token punctuation">(</span><span class="token string">"tcp"</span><span class="token punctuation">,</span> <span class="token string">"netchanserver.mydomain.com:1234"</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">	log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"Error making Importer: %v"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line">ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> myType<span class="token punctuation">)</span></span>
<span class="line">err <span class="token operator">=</span> imp<span class="token punctuation">.</span><span class="token function">Import</span><span class="token punctuation">(</span><span class="token string">"sendmyType"</span><span class="token punctuation">,</span> ch<span class="token punctuation">,</span> netchan<span class="token punctuation">.</span>Receive<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">	log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"Receive Error: %v"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-3/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-3/15.9.html">用 rpc 实现远程过程调用</RouteLink></li>
<li>下一节：<RouteLink to="/chapter-3/15.11.html">与 websocket 通信</RouteLink></li>
</ul>
</div></template>


