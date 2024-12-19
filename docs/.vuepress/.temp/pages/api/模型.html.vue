<template><div><h1 id="楷模" tabindex="-1"><a class="header-anchor" href="#楷模"><span>楷模</span></a></h1>
<p>列出并描述 API 中可用的各种模型。您可以参考<RouteLink to="/start/%E6%A8%A1%E5%9E%8B.html">模型</RouteLink>文档以了解可用的模型以及它们之间的区别。</p>
<h2 id="模型列表" tabindex="-1"><a class="header-anchor" href="#模型列表"><span>模型列表</span></a></h2>
<p><code v-pre>GET</code> <code v-pre>https://api.openai.com/v1/models</code></p>
<p>列出当前可用的模型，并提供有关每个模型的基本信息，例如所有者和可用性。</p>
<p>示例请求：<code v-pre>curl</code></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line"><span class="token function">curl</span> https://api.openai.com/v1/models <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">-H</span> <span class="token string">'Authorization: Bearer YOUR_API_KEY'</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>响应结果：</p>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json" data-title="json"><pre v-pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"data"</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">"id"</span><span class="token operator">:</span> <span class="token string">"model-id-0"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"object"</span><span class="token operator">:</span> <span class="token string">"model"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"owned_by"</span><span class="token operator">:</span> <span class="token string">"organization-owner"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"permission"</span><span class="token operator">:</span> <span class="token punctuation">[</span>...<span class="token punctuation">]</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">"id"</span><span class="token operator">:</span> <span class="token string">"model-id-1"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"object"</span><span class="token operator">:</span> <span class="token string">"model"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"owned_by"</span><span class="token operator">:</span> <span class="token string">"organization-owner"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"permission"</span><span class="token operator">:</span> <span class="token punctuation">[</span>...<span class="token punctuation">]</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">"id"</span><span class="token operator">:</span> <span class="token string">"model-id-2"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"object"</span><span class="token operator">:</span> <span class="token string">"model"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"owned_by"</span><span class="token operator">:</span> <span class="token string">"openai"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"permission"</span><span class="token operator">:</span> <span class="token punctuation">[</span>...<span class="token punctuation">]</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"object"</span><span class="token operator">:</span> <span class="token string">"list"</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="检索模型" tabindex="-1"><a class="header-anchor" href="#检索模型"><span>检索模型</span></a></h2>
<p><code v-pre>GET</code> <code v-pre>https://api.openai.com/v1/models/{model}</code></p>
<p>检索模型实例，提供有关模型的基本信息，例如所有者和权限。</p>
<h3 id="路径参数" tabindex="-1"><a class="header-anchor" href="#路径参数"><span>路径参数</span></a></h3>
<table>
<thead>
<tr>
<th>参数名称</th>
<th>数据类型</th>
<th>必填</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>model</td>
<td>String</td>
<td>是</td>
<td>用于此请求的模型的 ID</td>
</tr>
</tbody>
</table>
<p>示例请求 <code v-pre>curl</code>：<code v-pre>text-davinci-003</code></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line"><span class="token function">curl</span> https://api.openai.com/v1/models/text-davinci-003 <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">-H</span> <span class="token string">'Authorization: Bearer YOUR_API_KEY'</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>响应结果：<code v-pre>text-davinci-003</code></p>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json" data-title="json"><pre v-pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"id"</span><span class="token operator">:</span> <span class="token string">"text-davinci-003"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"object"</span><span class="token operator">:</span> <span class="token string">"model"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"owned_by"</span><span class="token operator">:</span> <span class="token string">"openai"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"permission"</span><span class="token operator">:</span> <span class="token punctuation">[</span>...<span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


