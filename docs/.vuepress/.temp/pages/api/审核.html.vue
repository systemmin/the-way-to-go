<template><div><h1 id="审核" tabindex="-1"><a class="header-anchor" href="#审核"><span>审核</span></a></h1>
<p>给定输入文本，如果模型将其分类为违反 OpenAI 的内容策略，则输出。</p>
<p>相关指南：<a href="/guides/%E5%AE%A1%E6%A0%B8">审核</a></p>
<h2 id="创建审核" tabindex="-1"><a class="header-anchor" href="#创建审核"><span>创建审核</span></a></h2>
<p><code v-pre>POST</code> <code v-pre>https://api.openai.com/v1/moderations</code></p>
<p>分类文本是否违反 OpenAI 的内容政策</p>
<h3 id="请求正文" tabindex="-1"><a class="header-anchor" href="#请求正文"><span>请求正文</span></a></h3>
<hr>
<p><strong>input</strong> <code v-pre>string or array</code> <code v-pre>必填</code></p>
<p>要分类的输入文本</p>
<hr>
<p><strong>model</strong> <code v-pre>string</code> <code v-pre>可选</code> <code v-pre>默认 text-moderation-latest</code></p>
<p>有两种内容审核模型可用：<code v-pre>text-moderation-stable</code>和<code v-pre>text-moderation-latest</code>。</p>
<p>默认情况下<code v-pre>text-moderation-latest</code>会随着时间的推移自动升级。这可确保您始终使用我们最准确的模型。如果您使用<code v-pre>text-moderation-stable</code>，我们将在更新模型之前提供提前通知。的准确度<code v-pre>text-moderation-stable</code>可能略低于 的准确度<code v-pre>text-moderation-latest</code>。</p>
<h3 id="请求示例" tabindex="-1"><a class="header-anchor" href="#请求示例"><span>请求示例</span></a></h3>
<CodeGroup>
  <CodeGroupItem title="curl" active>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line"><span class="token function">curl</span> https://api.openai.com/v1/moderations <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">-H</span> <span class="token string">'Content-Type: application/json'</span> <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">-H</span> <span class="token string">'Authorization: Bearer YOUR_API_KEY'</span> <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">-d</span> <span class="token string">'{</span>
<span class="line">  "input": "I want to kill them."</span>
<span class="line">}'</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
  <CodeGroupItem title="python">
<div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py" data-title="py"><pre v-pre><code><span class="line"><span class="token keyword">import</span> os</span>
<span class="line"><span class="token keyword">import</span> openai</span>
<span class="line">openai<span class="token punctuation">.</span>api_key <span class="token operator">=</span> os<span class="token punctuation">.</span>getenv<span class="token punctuation">(</span><span class="token string">"OPENAI_API_KEY"</span><span class="token punctuation">)</span></span>
<span class="line">openai<span class="token punctuation">.</span>Moderation<span class="token punctuation">.</span>create<span class="token punctuation">(</span></span>
<span class="line">  <span class="token builtin">input</span><span class="token operator">=</span><span class="token string">"I want to kill them."</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
  <CodeGroupItem title="node.js" >
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">const</span> <span class="token punctuation">{</span> Configuration<span class="token punctuation">,</span> OpenAIApi <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"openai"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> configuration <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Configuration</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">apiKey</span><span class="token operator">:</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">OPENAI_API_KEY</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> openai <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">OpenAIApi</span><span class="token punctuation">(</span>configuration<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> response <span class="token operator">=</span> <span class="token keyword">await</span> openai<span class="token punctuation">.</span><span class="token function">createModeration</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">input</span><span class="token operator">:</span> <span class="token string">"I want to kill them."</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
</CodeGroup>
<h3 id="请求参数" tabindex="-1"><a class="header-anchor" href="#请求参数"><span>请求参数</span></a></h3>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json" data-title="json"><pre v-pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"input"</span><span class="token operator">:</span> <span class="token string">"I want to kill them."</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="响应结果" tabindex="-1"><a class="header-anchor" href="#响应结果"><span>响应结果</span></a></h3>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json" data-title="json"><pre v-pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"id"</span><span class="token operator">:</span> <span class="token string">"modr-5MWoLO"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"model"</span><span class="token operator">:</span> <span class="token string">"text-moderation-001"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"results"</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">"categories"</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">"hate"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">"hate/threatening"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">"self-harm"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">"sexual"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">"sexual/minors"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">"violence"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">"violence/graphic"</span><span class="token operator">:</span> <span class="token boolean">false</span></span>
<span class="line">      <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"category_scores"</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">"hate"</span><span class="token operator">:</span> <span class="token number">0.22714105248451233</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">"hate/threatening"</span><span class="token operator">:</span> <span class="token number">0.4132447838783264</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">"self-harm"</span><span class="token operator">:</span> <span class="token number">0.005232391878962517</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">"sexual"</span><span class="token operator">:</span> <span class="token number">0.01407341007143259</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">"sexual/minors"</span><span class="token operator">:</span> <span class="token number">0.0038522258400917053</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">"violence"</span><span class="token operator">:</span> <span class="token number">0.9223177433013916</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">"violence/graphic"</span><span class="token operator">:</span> <span class="token number">0.036865197122097015</span></span>
<span class="line">      <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"flagged"</span><span class="token operator">:</span> <span class="token boolean">true</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


