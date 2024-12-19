<template><div><h1 id="_19-2-短网址项目简介" tabindex="-1"><a class="header-anchor" href="#_19-2-短网址项目简介"><span>19.2 短网址项目简介</span></a></h1>
<p>你肯定知道有些浏览器中的地址（称为 URL）非常长且/或复杂，在网上有一些将他们转换成简短 URL 来使用的服务。我们的项目与此类似：它是具有 2 个功能的 <em>web 服务</em> (web service)：</p>
<h2 id="添加-add" tabindex="-1"><a class="header-anchor" href="#添加-add"><span>添加 (Add)</span></a></h2>
<p>给定一个较长的 URL，会将其转换成较短的版本，例如：</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">http://maps.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;geocode=&amp;q=tokyo&amp;sll=37.0625,-95.677068&amp;sspn=68.684234,65.566406&amp;ie=UTF8&amp;hq=&amp;hnear=Tokyo,+Japan&amp;t=h&amp;z=9</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ul>
<li>(A) 转变为：<code v-pre>http://goto/UrcGq</code></li>
<li>(B) 并保存这对数据</li>
</ul>
<h2 id="重定向-redirect" tabindex="-1"><a class="header-anchor" href="#重定向-redirect"><span>重定向 (Redirect)</span></a></h2>
<p>短网址被请求时，会把用户重定向到原始的长 URL。因此如果你在浏览器输入网址 (B)，会被重定向到页面 (A)。</p>
<h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-4/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-4/19.1.html">简介</RouteLink></li>
<li>下一节：<RouteLink to="/chapter-4/19.3.html">数据结构</RouteLink></li>
</ul>
</div></template>


