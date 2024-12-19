<template><div><h1 id="文件" tabindex="-1"><a class="header-anchor" href="#文件"><span>文件</span></a></h1>
<p>文件用于上传可与<a href="/api/%E5%BE%AE%E8%B0%83">微调</a>等功能一起使用的文档。</p>
<h2 id="文件列表" tabindex="-1"><a class="header-anchor" href="#文件列表"><span>文件列表</span></a></h2>
<p><code v-pre>GET</code> <code v-pre>https://api.openai.com/v1/files</code></p>
<p>返回属于用户组织的文件列表。</p>
<h3 id="请求示例" tabindex="-1"><a class="header-anchor" href="#请求示例"><span>请求示例</span></a></h3>
<CodeGroup>
  <CodeGroupItem title="curl" active>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line"><span class="token function">curl</span> https://api.openai.com/v1/files <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">-H</span> <span class="token string">'Authorization: Bearer YOUR_API_KEY'</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
  <CodeGroupItem title="python">
<div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py" data-title="py"><pre v-pre><code><span class="line"><span class="token keyword">import</span> os</span>
<span class="line"><span class="token keyword">import</span> openai</span>
<span class="line">openai<span class="token punctuation">.</span>api_key <span class="token operator">=</span> os<span class="token punctuation">.</span>getenv<span class="token punctuation">(</span><span class="token string">"OPENAI_API_KEY"</span><span class="token punctuation">)</span></span>
<span class="line">openai<span class="token punctuation">.</span>File<span class="token punctuation">.</span><span class="token builtin">list</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
  <CodeGroupItem title="node.js" >
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">const</span> <span class="token punctuation">{</span> Configuration<span class="token punctuation">,</span> OpenAIApi <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"openai"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> configuration <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Configuration</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">apiKey</span><span class="token operator">:</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">OPENAI_API_KEY</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> openai <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">OpenAIApi</span><span class="token punctuation">(</span>configuration<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> response <span class="token operator">=</span> <span class="token keyword">await</span> openai<span class="token punctuation">.</span><span class="token function">listFiles</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
</CodeGroup>
<h3 id="响应结果" tabindex="-1"><a class="header-anchor" href="#响应结果"><span>响应结果</span></a></h3>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json" data-title="json"><pre v-pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"data"</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">"id"</span><span class="token operator">:</span> <span class="token string">"file-ccdDZrC3iZVNiQVeEA6Z66wf"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"object"</span><span class="token operator">:</span> <span class="token string">"file"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"bytes"</span><span class="token operator">:</span> <span class="token number">175</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"created_at"</span><span class="token operator">:</span> <span class="token number">1613677385</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"filename"</span><span class="token operator">:</span> <span class="token string">"train.jsonl"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"purpose"</span><span class="token operator">:</span> <span class="token string">"search"</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">"id"</span><span class="token operator">:</span> <span class="token string">"file-XjGxS3KTG0uNmNOK362iJua3"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"object"</span><span class="token operator">:</span> <span class="token string">"file"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"bytes"</span><span class="token operator">:</span> <span class="token number">140</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"created_at"</span><span class="token operator">:</span> <span class="token number">1613779121</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"filename"</span><span class="token operator">:</span> <span class="token string">"puppy.jsonl"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"purpose"</span><span class="token operator">:</span> <span class="token string">"search"</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"object"</span><span class="token operator">:</span> <span class="token string">"list"</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="上传文件" tabindex="-1"><a class="header-anchor" href="#上传文件"><span>上传文件</span></a></h2>
<p><code v-pre>POST</code> <code v-pre>https://api.openai.com/v1/files</code></p>
<p>上传包含要跨各种端点/功能使用的文档的文件。目前，一个组织上传的所有文件的大小最大可达 1 GB。如果您需要增加存储限制，请联系我们。</p>
<h3 id="请求正文" tabindex="-1"><a class="header-anchor" href="#请求正文"><span>请求正文</span></a></h3>
<p><strong>file</strong> <code v-pre>string</code> <code v-pre>必填</code></p>
<p>要上传的 <a href="https://jsonlines.readthedocs.io/en/latest/" target="_blank" rel="noopener noreferrer">JSON 行</a>文件的名称。</p>
<p>如果 <code v-pre>purpose</code>置为“微调”，则每一行都是一个 JSON 记录，其中包含代表您的<RouteLink to="/guides/%E5%BE%AE%E8%B0%83.html#%E5%87%86%E5%A4%87%E8%AE%AD%E7%BB%83%E6%95%B0%E6%8D%AE">训练示例</RouteLink>的“提示”和“补全”字段。</p>
<p><strong>purpose</strong> <code v-pre>string</code> <code v-pre>必填</code></p>
<p>上传文件的预期目的。</p>
<p>使用“微调”进行<a href="/api/%E5%BE%AE%E8%B0%83">微调</a>。这使我们能够验证上传文件的格式。</p>
<h3 id="请求示例-1" tabindex="-1"><a class="header-anchor" href="#请求示例-1"><span>请求示例</span></a></h3>
<CodeGroup>
  <CodeGroupItem title="curl" active>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line"><span class="token function">curl</span> https://api.openai.com/v1/files <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">-H</span> <span class="token string">"Authorization: Bearer YOUR_API_KEY"</span> <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">-F</span> <span class="token assign-left variable">purpose</span><span class="token operator">=</span><span class="token string">"fine-tune"</span> <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">-F</span> <span class="token assign-left variable">file</span><span class="token operator">=</span><span class="token string">'@mydata.jsonl'</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
  <CodeGroupItem title="python">
<div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py" data-title="py"><pre v-pre><code><span class="line"><span class="token keyword">import</span> os</span>
<span class="line"><span class="token keyword">import</span> openai</span>
<span class="line">openai<span class="token punctuation">.</span>api_key <span class="token operator">=</span> os<span class="token punctuation">.</span>getenv<span class="token punctuation">(</span><span class="token string">"OPENAI_API_KEY"</span><span class="token punctuation">)</span></span>
<span class="line">openai<span class="token punctuation">.</span>File<span class="token punctuation">.</span>create<span class="token punctuation">(</span></span>
<span class="line">  <span class="token builtin">file</span><span class="token operator">=</span><span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">"mydata.jsonl"</span><span class="token punctuation">,</span> <span class="token string">"rb"</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">  purpose<span class="token operator">=</span><span class="token string">'fine-tune'</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
  <CodeGroupItem title="node.js" >
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"fs"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> <span class="token punctuation">{</span> Configuration<span class="token punctuation">,</span> OpenAIApi <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"openai"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> configuration <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Configuration</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">apiKey</span><span class="token operator">:</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">OPENAI_API_KEY</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> openai <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">OpenAIApi</span><span class="token punctuation">(</span>configuration<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> response <span class="token operator">=</span> <span class="token keyword">await</span> openai<span class="token punctuation">.</span><span class="token function">createFile</span><span class="token punctuation">(</span></span>
<span class="line">  fs<span class="token punctuation">.</span><span class="token function">createReadStream</span><span class="token punctuation">(</span><span class="token string">"mydata.jsonl"</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token string">"fine-tune"</span></span>
<span class="line"><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
</CodeGroup>
<h3 id="响应结果-1" tabindex="-1"><a class="header-anchor" href="#响应结果-1"><span>响应结果</span></a></h3>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json" data-title="json"><pre v-pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"id"</span><span class="token operator">:</span> <span class="token string">"file-XjGxS3KTG0uNmNOK362iJua3"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"object"</span><span class="token operator">:</span> <span class="token string">"file"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"bytes"</span><span class="token operator">:</span> <span class="token number">140</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"created_at"</span><span class="token operator">:</span> <span class="token number">1613779121</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"filename"</span><span class="token operator">:</span> <span class="token string">"mydata.jsonl"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"purpose"</span><span class="token operator">:</span> <span class="token string">"fine-tune"</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="删除文件" tabindex="-1"><a class="header-anchor" href="#删除文件"><span>删除文件</span></a></h2>
<p><code v-pre>DELETE</code> <code v-pre>https://api.openai.com/v1/files/{file_id}</code></p>
<p>删除文件</p>
<h3 id="路径参数" tabindex="-1"><a class="header-anchor" href="#路径参数"><span>路径参数</span></a></h3>
<p>用于此请求的文件的 ID</p>
<h3 id="请求示例-2" tabindex="-1"><a class="header-anchor" href="#请求示例-2"><span>请求示例</span></a></h3>
<CodeGroup>
  <CodeGroupItem title="curl" active>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line"><span class="token function">curl</span> https://api.openai.com/v1/files/file-XjGxS3KTG0uNmNOK362iJua3 <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">-X</span> DELETE <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">-H</span> <span class="token string">'Authorization: Bearer YOUR_API_KEY'</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
  <CodeGroupItem title="python">
<div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py" data-title="py"><pre v-pre><code><span class="line"><span class="token keyword">import</span> os</span>
<span class="line"><span class="token keyword">import</span> openai</span>
<span class="line">openai<span class="token punctuation">.</span>api_key <span class="token operator">=</span> os<span class="token punctuation">.</span>getenv<span class="token punctuation">(</span><span class="token string">"OPENAI_API_KEY"</span><span class="token punctuation">)</span></span>
<span class="line">openai<span class="token punctuation">.</span>File<span class="token punctuation">.</span>delete<span class="token punctuation">(</span><span class="token string">"file-XjGxS3KTG0uNmNOK362iJua3"</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
  <CodeGroupItem title="node.js" >
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">const</span> <span class="token punctuation">{</span> Configuration<span class="token punctuation">,</span> OpenAIApi <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"openai"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> configuration <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Configuration</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">apiKey</span><span class="token operator">:</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">OPENAI_API_KEY</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> openai <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">OpenAIApi</span><span class="token punctuation">(</span>configuration<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> response <span class="token operator">=</span> <span class="token keyword">await</span> openai<span class="token punctuation">.</span><span class="token function">deleteFile</span><span class="token punctuation">(</span><span class="token string">"file-XjGxS3KTG0uNmNOK362iJua3"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
</CodeGroup>
<h3 id="响应结果-2" tabindex="-1"><a class="header-anchor" href="#响应结果-2"><span>响应结果</span></a></h3>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json" data-title="json"><pre v-pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"id"</span><span class="token operator">:</span> <span class="token string">"file-XjGxS3KTG0uNmNOK362iJua3"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"object"</span><span class="token operator">:</span> <span class="token string">"file"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"deleted"</span><span class="token operator">:</span> <span class="token boolean">true</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="检索文件" tabindex="-1"><a class="header-anchor" href="#检索文件"><span>检索文件</span></a></h2>
<p><code v-pre>GET</code> <code v-pre>https://api.openai.com/v1/files/{file_id}</code></p>
<p>返回有关指定文件的信息。</p>
<h3 id="路径参数-1" tabindex="-1"><a class="header-anchor" href="#路径参数-1"><span>路径参数</span></a></h3>
<p>用于此请求的文件的 ID</p>
<h3 id="请求示例-3" tabindex="-1"><a class="header-anchor" href="#请求示例-3"><span>请求示例</span></a></h3>
<CodeGroup>
  <CodeGroupItem title="curl" active>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line"><span class="token function">curl</span> https://api.openai.com/v1/files/file-XjGxS3KTG0uNmNOK362iJua3 <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">-H</span> <span class="token string">'Authorization: Bearer YOUR_API_KEY'</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
  <CodeGroupItem title="python">
<div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py" data-title="py"><pre v-pre><code><span class="line"><span class="token keyword">import</span> os</span>
<span class="line"><span class="token keyword">import</span> openai</span>
<span class="line">openai<span class="token punctuation">.</span>api_key <span class="token operator">=</span> os<span class="token punctuation">.</span>getenv<span class="token punctuation">(</span><span class="token string">"OPENAI_API_KEY"</span><span class="token punctuation">)</span></span>
<span class="line">openai<span class="token punctuation">.</span>File<span class="token punctuation">.</span>retrieve<span class="token punctuation">(</span><span class="token string">"file-XjGxS3KTG0uNmNOK362iJua3"</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
  <CodeGroupItem title="node.js" >
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">const</span> <span class="token punctuation">{</span> Configuration<span class="token punctuation">,</span> OpenAIApi <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"openai"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> configuration <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Configuration</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">apiKey</span><span class="token operator">:</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">OPENAI_API_KEY</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> openai <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">OpenAIApi</span><span class="token punctuation">(</span>configuration<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> response <span class="token operator">=</span> <span class="token keyword">await</span> openai<span class="token punctuation">.</span><span class="token function">retrieveFile</span><span class="token punctuation">(</span><span class="token string">"file-XjGxS3KTG0uNmNOK362iJua3"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
</CodeGroup>
<h3 id="响应结果-3" tabindex="-1"><a class="header-anchor" href="#响应结果-3"><span>响应结果</span></a></h3>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json" data-title="json"><pre v-pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"id"</span><span class="token operator">:</span> <span class="token string">"file-XjGxS3KTG0uNmNOK362iJua3"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"object"</span><span class="token operator">:</span> <span class="token string">"file"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"bytes"</span><span class="token operator">:</span> <span class="token number">140</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"created_at"</span><span class="token operator">:</span> <span class="token number">1613779657</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"filename"</span><span class="token operator">:</span> <span class="token string">"mydata.jsonl"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"purpose"</span><span class="token operator">:</span> <span class="token string">"fine-tune"</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="检索文件内容" tabindex="-1"><a class="header-anchor" href="#检索文件内容"><span>检索文件内容</span></a></h2>
<p><code v-pre>GET</code> <code v-pre>https://api.openai.com/v1/files/{file_id}/content</code></p>
<p>返回指定文件的内容</p>
<h3 id="路径参数-2" tabindex="-1"><a class="header-anchor" href="#路径参数-2"><span>路径参数</span></a></h3>
<p>用于此请求的文件的 ID</p>
<h3 id="请求示例-4" tabindex="-1"><a class="header-anchor" href="#请求示例-4"><span>请求示例</span></a></h3>
<CodeGroup>
  <CodeGroupItem title="curl" active>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line"><span class="token function">curl</span> https://api.openai.com/v1/files/file-XjGxS3KTG0uNmNOK362iJua3/content <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">-H</span> <span class="token string">'Authorization: Bearer YOUR_API_KEY'</span> <span class="token operator">></span> file.jsonl</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
  <CodeGroupItem title="python">
<div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py" data-title="py"><pre v-pre><code><span class="line"><span class="token keyword">import</span> os</span>
<span class="line"><span class="token keyword">import</span> openai</span>
<span class="line">openai<span class="token punctuation">.</span>api_key <span class="token operator">=</span> os<span class="token punctuation">.</span>getenv<span class="token punctuation">(</span><span class="token string">"OPENAI_API_KEY"</span><span class="token punctuation">)</span></span>
<span class="line">content <span class="token operator">=</span> openai<span class="token punctuation">.</span>File<span class="token punctuation">.</span>download<span class="token punctuation">(</span><span class="token string">"file-XjGxS3KTG0uNmNOK362iJua3"</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
  <CodeGroupItem title="node.js" >
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">const</span> <span class="token punctuation">{</span> Configuration<span class="token punctuation">,</span> OpenAIApi <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"openai"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> configuration <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Configuration</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">apiKey</span><span class="token operator">:</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">OPENAI_API_KEY</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> openai <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">OpenAIApi</span><span class="token punctuation">(</span>configuration<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> response <span class="token operator">=</span> <span class="token keyword">await</span> openai<span class="token punctuation">.</span><span class="token function">downloadFile</span><span class="token punctuation">(</span><span class="token string">"file-XjGxS3KTG0uNmNOK362iJua3"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
</CodeGroup></div></template>


