<template><div><h1 id="引擎" tabindex="-1"><a class="header-anchor" href="#引擎"><span>引擎</span></a></h1>
<div class="hint-container warning">
<p class="hint-container-title">引擎端点已弃用。</p>
<p>请改用他们的替代品 <a href="/api/%E6%A8%A1%E5%9E%8B">Models</a>。<a href="https://help.openai.com/TODO" target="_blank" rel="noopener noreferrer">了解更多</a>。</p>
</div>
<h2 id="列出引擎" tabindex="-1"><a class="header-anchor" href="#列出引擎"><span>列出引擎 <Badge text="弃用" type="warning" /></span></a></h2>
<p><code v-pre>GET</code> <code v-pre>https://api.openai.com/v1/engines</code></p>
<p>列出当前可用（未微调）的模型，并提供有关每个模型的基本信息，例如所有者和可用性。</p>
<h3 id="请求示例" tabindex="-1"><a class="header-anchor" href="#请求示例"><span>请求示例</span></a></h3>
<CodeGroup>
  <CodeGroupItem title="curl" active>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line"><span class="token function">curl</span> https://api.openai.com/v1/engines <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">-H</span> <span class="token string">'Authorization: Bearer YOUR_API_KEY'</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
  <CodeGroupItem title="python">
<div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py" data-title="py"><pre v-pre><code><span class="line"><span class="token keyword">import</span> os</span>
<span class="line"><span class="token keyword">import</span> openai</span>
<span class="line">openai<span class="token punctuation">.</span>api_key <span class="token operator">=</span> os<span class="token punctuation">.</span>getenv<span class="token punctuation">(</span><span class="token string">"OPENAI_API_KEY"</span><span class="token punctuation">)</span></span>
<span class="line">openai<span class="token punctuation">.</span>Engine<span class="token punctuation">.</span><span class="token builtin">list</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
  <CodeGroupItem title="node.js" >
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">const</span> <span class="token punctuation">{</span> Configuration<span class="token punctuation">,</span> OpenAIApi <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"openai"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> configuration <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Configuration</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">apiKey</span><span class="token operator">:</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">OPENAI_API_KEY</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> openai <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">OpenAIApi</span><span class="token punctuation">(</span>configuration<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> response <span class="token operator">=</span> <span class="token keyword">await</span> openai<span class="token punctuation">.</span><span class="token function">listEngines</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
</CodeGroup>
<h3 id="响应结果" tabindex="-1"><a class="header-anchor" href="#响应结果"><span>响应结果</span></a></h3>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json" data-title="json"><pre v-pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"data"</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">"id"</span><span class="token operator">:</span> <span class="token string">"engine-id-0"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"object"</span><span class="token operator">:</span> <span class="token string">"engine"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"owner"</span><span class="token operator">:</span> <span class="token string">"organization-owner"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"ready"</span><span class="token operator">:</span> <span class="token boolean">true</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">"id"</span><span class="token operator">:</span> <span class="token string">"engine-id-2"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"object"</span><span class="token operator">:</span> <span class="token string">"engine"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"owner"</span><span class="token operator">:</span> <span class="token string">"organization-owner"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"ready"</span><span class="token operator">:</span> <span class="token boolean">true</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">"id"</span><span class="token operator">:</span> <span class="token string">"engine-id-3"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"object"</span><span class="token operator">:</span> <span class="token string">"engine"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"owner"</span><span class="token operator">:</span> <span class="token string">"openai"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"ready"</span><span class="token operator">:</span> <span class="token boolean">false</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"object"</span><span class="token operator">:</span> <span class="token string">"list"</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="检索引擎" tabindex="-1"><a class="header-anchor" href="#检索引擎"><span>检索引擎 <Badge text="弃用" type="warning" /></span></a></h2>
<p><code v-pre>GET</code> <code v-pre>https://api.openai.com/v1/engines/{engine_id}</code></p>
<p>检索模型实例，提供有关它的基本信息，例如所有者和可用性。</p>
<h3 id="路径参数" tabindex="-1"><a class="header-anchor" href="#路径参数"><span>路径参数</span></a></h3>
<hr>
<p><strong>engine_id</strong> <code v-pre>string</code> <code v-pre>必填</code></p>
<p>用于此请求的引擎的 ID</p>
<h3 id="请求示例-1" tabindex="-1"><a class="header-anchor" href="#请求示例-1"><span>请求示例</span></a></h3>
<CodeGroup>
  <CodeGroupItem title="curl" active>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line"><span class="token function">curl</span> https://api.openai.com/v1/engines/text-davinci-003 <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">-H</span> <span class="token string">'Authorization: Bearer YOUR_API_KEY'</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
  <CodeGroupItem title="python">
<div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py" data-title="py"><pre v-pre><code><span class="line"><span class="token keyword">import</span> os</span>
<span class="line"><span class="token keyword">import</span> openai</span>
<span class="line">openai<span class="token punctuation">.</span>api_key <span class="token operator">=</span> os<span class="token punctuation">.</span>getenv<span class="token punctuation">(</span><span class="token string">"OPENAI_API_KEY"</span><span class="token punctuation">)</span></span>
<span class="line">openai<span class="token punctuation">.</span>Engine<span class="token punctuation">.</span>retrieve<span class="token punctuation">(</span><span class="token string">"text-davinci-003"</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
  <CodeGroupItem title="node.js" >
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">const</span> <span class="token punctuation">{</span> Configuration<span class="token punctuation">,</span> OpenAIApi <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"openai"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> configuration <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Configuration</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">apiKey</span><span class="token operator">:</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">OPENAI_API_KEY</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> openai <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">OpenAIApi</span><span class="token punctuation">(</span>configuration<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> response <span class="token operator">=</span> <span class="token keyword">await</span> openai<span class="token punctuation">.</span><span class="token function">retrieveEngine</span><span class="token punctuation">(</span><span class="token string">"text-davinci-003"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
</CodeGroup>
<h3 id="响应结果-1" tabindex="-1"><a class="header-anchor" href="#响应结果-1"><span>响应结果</span></a></h3>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json" data-title="json"><pre v-pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"id"</span><span class="token operator">:</span> <span class="token string">"text-davinci-003"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"object"</span><span class="token operator">:</span> <span class="token string">"engine"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"owner"</span><span class="token operator">:</span> <span class="token string">"openai"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"ready"</span><span class="token operator">:</span> <span class="token boolean">true</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


