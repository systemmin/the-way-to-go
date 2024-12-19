<template><div><h1 id="嵌入" tabindex="-1"><a class="header-anchor" href="#嵌入"><span>嵌入</span></a></h1>
<p>获取给定输入的矢量表示，机器学习模型和算法可以轻松使用该表示。</p>
<p>相关指南：<a href="/guides/%E5%B5%8C%E5%85%A5">嵌入</a></p>
<h2 id="创建嵌入" tabindex="-1"><a class="header-anchor" href="#创建嵌入"><span>创建嵌入</span></a></h2>
<p><code v-pre>POST</code> <code v-pre>https://api.openai.com/v1/embeddings</code></p>
<p>创建表示输入文本的嵌入向量。</p>
<h3 id="请求正文" tabindex="-1"><a class="header-anchor" href="#请求正文"><span>请求正文</span></a></h3>
<p><strong>model</strong> <code v-pre>string</code> <code v-pre>必填</code></p>
<p>要使用的模型的 ID。您可以使用<RouteLink to="/api/api/%E6%A8%A1%E5%9E%8B.html#%E6%A8%A1%E5%9E%8B%E5%88%97%E8%A1%A8">模型列表</RouteLink> API 来查看所有可用模型，或查看我们的<a href="/start/%E6%A8%A1%E5%9E%8B">模型概述</a>以了解它们的描述。</p>
<hr>
<p><strong>input</strong> <code v-pre>string or array</code> <code v-pre>必填</code></p>
<p>输入文本以获取嵌入，编码为字符串或标记数组。要在单个请求中获取多个输入的嵌入，请传递一个字符串数组或标记数组。每个输入的长度不得超过 8192 个标记。</p>
<hr>
<p><strong>user</strong> <code v-pre>string</code> <code v-pre>可选 </code></p>
<p>代表您的最终用户的唯一标识符，可以帮助 OpenAI 监控和检测滥用行为。<RouteLink to="/guides/%E5%AE%89%E5%85%A8%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5.html#%E6%9C%80%E7%BB%88%E7%94%A8%E6%88%B7-id">了解更多</RouteLink>。</p>
<h3 id="请求示例" tabindex="-1"><a class="header-anchor" href="#请求示例"><span>请求示例</span></a></h3>
<p><strong>curl</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line"><span class="token function">curl</span> https://api.openai.com/v1/embeddings <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">-X</span> POST <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">-H</span> <span class="token string">"Authorization: Bearer YOUR_API_KEY"</span> <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">-H</span> <span class="token string">"Content-Type: application/json"</span> <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">-d</span> <span class="token string">'{"input": "The food was delicious and the waiter...",</span>
<span class="line">       "model": "text-embedding-ada-002"}'</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>参数</strong></p>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json" data-title="json"><pre v-pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"model"</span><span class="token operator">:</span> <span class="token string">"text-embedding-ada-002"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"input"</span><span class="token operator">:</span> <span class="token string">"The food was delicious and the waiter..."</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>响应</strong></p>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json" data-title="json"><pre v-pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"object"</span><span class="token operator">:</span> <span class="token string">"list"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"data"</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">"object"</span><span class="token operator">:</span> <span class="token string">"embedding"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"embedding"</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">        <span class="token number">0.0023064255</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token number">-0.009327292</span><span class="token punctuation">,</span></span>
<span class="line">        .... (<span class="token number">1536</span> floats total for ada<span class="token number">-002</span>)</span>
<span class="line">        <span class="token number">-0.0028842222</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"index"</span><span class="token operator">:</span> <span class="token number">0</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"model"</span><span class="token operator">:</span> <span class="token string">"text-embedding-ada-002"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"usage"</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">"prompt_tokens"</span><span class="token operator">:</span> <span class="token number">8</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"total_tokens"</span><span class="token operator">:</span> <span class="token number">8</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


