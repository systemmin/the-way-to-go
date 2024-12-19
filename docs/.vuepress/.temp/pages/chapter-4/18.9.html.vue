<template><div><h1 id="_18-9-网络和网页应用" tabindex="-1"><a class="header-anchor" href="#_18-9-网络和网页应用"><span>18.9 网络和网页应用</span></a></h1>
<h2 id="_18-9-1-模板" tabindex="-1"><a class="header-anchor" href="#_18-9-1-模板"><span>18.9.1 模板：</span></a></h2>
<p>制作、解析并使模板生效：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">var</span> strTempl <span class="token operator">=</span> template<span class="token punctuation">.</span><span class="token function">Must</span><span class="token punctuation">(</span>template<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">"TName"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span>strTemplateHTML<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>在网页应用中使用 HTML 过滤器过滤 HTML 特殊字符：</p>
<p>使用 <code v-pre>{{html .}}</code> 或者通过一个字段 <code v-pre>FieldName {{ .FieldName |html }}</code></p>
<p>使用缓存模板（参考<RouteLink to="/chapter-4/15.7.html">章节 15.7</RouteLink>）</p>
<h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-4/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-4/18.8.html">协程 (goroutine) 与通道 (channel)</RouteLink></li>
<li>下一节：<RouteLink to="/chapter-4/18.10.html">其他</RouteLink></li>
</ul>
</div></template>


