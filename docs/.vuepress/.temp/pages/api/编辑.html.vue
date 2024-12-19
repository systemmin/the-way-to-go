<template><div><h1 id="编辑" tabindex="-1"><a class="header-anchor" href="#编辑"><span>编辑</span></a></h1>
<p>给定提示和指令，模型将返回提示的编辑版本。</p>
<h2 id="创建编辑" tabindex="-1"><a class="header-anchor" href="#创建编辑"><span>创建编辑</span></a></h2>
<p><code v-pre>POST</code>  <code v-pre>https://api.openai.com/v1/edits</code></p>
<h3 id="请求正文" tabindex="-1"><a class="header-anchor" href="#请求正文"><span>请求正文</span></a></h3>
<p><strong>model</strong> <code v-pre>string</code> <code v-pre>必填</code></p>
<p>要使用的模型的 ID。您可以将 <code v-pre>text-davinci-edit-001</code> 或 <code v-pre>code-davinci-edit-001</code> 模型与此端点一起使用。</p>
<hr>
<p><strong>input</strong> <code v-pre>string</code> <code v-pre>可选 默认&quot;&quot;</code></p>
<p>用作编辑起点的输入文本。</p>
<hr>
<p><strong>instruction</strong> <code v-pre>string</code> <code v-pre>必填</code></p>
<p>告诉模型如何编辑提示的指令。</p>
<hr>
<p><strong>n</strong> <code v-pre>integer</code> <code v-pre>可选</code> <code v-pre>默认 1</code></p>
<p>为输入和指令生成多少编辑。</p>
<hr>
<p><strong>temperature</strong> <code v-pre>number</code> <code v-pre>可选 默认 1</code></p>
<p>使用什么采样 <code v-pre>temperature</code>，介于 0 和 2 之间。像 0.8 这样的较高值会使输出更随机，而像 0.2 这样的较低值会使它更加集中和确定。 我们通常建议改变这个或 <code v-pre>top_p</code> 但不是两者都改变。</p>
<hr>
<p><strong>top_p</strong> <code v-pre>number</code> <code v-pre>可选</code> <code v-pre>默认 1</code></p>
<p>一种替代<code v-pre>temperature</code>采样的方法，称为核采样，其中模型考虑具有 <code v-pre>top_p</code> 概率质量的标记的结果。所以 0.1 意味着只考虑构成前 10% 概率质量的标记。</p>
<h3 id="请求示例" tabindex="-1"><a class="header-anchor" href="#请求示例"><span>请求示例</span></a></h3>
<p><strong>curl</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line"><span class="token function">curl</span> https://api.openai.com/v1/edits <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">-H</span> <span class="token string">'Content-Type: application/json'</span> <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">-H</span> <span class="token string">'Authorization: Bearer YOUR_API_KEY'</span> <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">-d</span> <span class="token string">'{</span>
<span class="line">  "model": "text-davinci-edit-001",</span>
<span class="line">  "input": "What day of the wek is it?",</span>
<span class="line">  "instruction": "Fix the spelling mistakes"</span>
<span class="line">}'</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>请求参数</strong></p>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json" data-title="json"><pre v-pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"model"</span><span class="token operator">:</span> <span class="token string">"text-davinci-edit-001"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"input"</span><span class="token operator">:</span> <span class="token string">"What day of the wek is it?"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"instruction"</span><span class="token operator">:</span> <span class="token string">"Fix the spelling mistakes"</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>响应结果</strong></p>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json" data-title="json"><pre v-pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"object"</span><span class="token operator">:</span> <span class="token string">"edit"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"created"</span><span class="token operator">:</span> <span class="token number">1589478378</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"choices"</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">"text"</span><span class="token operator">:</span> <span class="token string">"What day of the week is it?"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"index"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"usage"</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">"prompt_tokens"</span><span class="token operator">:</span> <span class="token number">25</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"completion_tokens"</span><span class="token operator">:</span> <span class="token number">32</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"total_tokens"</span><span class="token operator">:</span> <span class="token number">57</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


