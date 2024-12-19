<template><div><h1 id="图像" tabindex="-1"><a class="header-anchor" href="#图像"><span>图像</span></a></h1>
<p>给定提示和/或输入图像，模型将生成新图像。</p>
<p>相关指南：<a href="/guides/%E5%9B%BE%E5%83%8F%E7%94%9F%E6%88%90">图像生成</a></p>
<hr>
<h2 id="创建图像" tabindex="-1"><a class="header-anchor" href="#创建图像"><span>创建图像 <Badge text="beta" /></span></a></h2>
<p><code v-pre>POST</code> <code v-pre>https://api.openai.com/v1/images/generations</code></p>
<p>根据提示创建图像。</p>
<h3 id="请求正文" tabindex="-1"><a class="header-anchor" href="#请求正文"><span>请求正文</span></a></h3>
<p><strong>prompt</strong> <code v-pre>string</code> <code v-pre>必填</code></p>
<p>所需图像的文本描述。最大长度为 1000 个字符。</p>
<hr>
<p><strong>n</strong> <code v-pre>integer</code> <code v-pre>可选 默认 1</code></p>
<p>要生成的图像数。必须介于 1 和 10 之间。</p>
<hr>
<p><strong>size</strong> <code v-pre>string</code> <code v-pre>可选 默认 1024x1024</code></p>
<p>生成图像的大小。必须是 <code v-pre>256x256</code>、<code v-pre>512x512</code> 或 <code v-pre>1024x1024</code>之一。</p>
<hr>
<p><strong>response_format</strong> <code v-pre>string</code> <code v-pre>默认 url</code></p>
<p>生成的图像返回的格式。必须是 <code v-pre>url</code> 或 <code v-pre>b64_json</code> 之一。</p>
<hr>
<p><strong>user</strong> <code v-pre>string</code> <code v-pre>可选 </code></p>
<p>代表您的最终用户的唯一标识符，可以帮助 OpenAI 监控和检测滥用行为。<RouteLink to="/guides/%E5%AE%89%E5%85%A8%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5.html#%E6%9C%80%E7%BB%88%E7%94%A8%E6%88%B7-id">了解更多</RouteLink>。</p>
<h3 id="请求示例" tabindex="-1"><a class="header-anchor" href="#请求示例"><span>请求示例</span></a></h3>
<p><strong>curl</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line"><span class="token function">curl</span> https://api.openai.com/v1/images/generations <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">-H</span> <span class="token string">'Content-Type: application/json'</span> <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">-H</span> <span class="token string">'Authorization: Bearer YOUR_API_KEY'</span> <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">-d</span> <span class="token string">'{</span>
<span class="line">  "prompt": "A cute baby sea otter",</span>
<span class="line">  "n": 2,</span>
<span class="line">  "size": "1024x1024"</span>
<span class="line">}'</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>参数</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token string">"prompt"</span><span class="token builtin class-name">:</span> <span class="token string">"A cute baby sea otter"</span>,</span>
<span class="line">  <span class="token string">"n"</span><span class="token builtin class-name">:</span> <span class="token number">2</span>,</span>
<span class="line">  <span class="token string">"size"</span><span class="token builtin class-name">:</span> <span class="token string">"1024x1024"</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>响应结果</strong></p>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json" data-title="json"><pre v-pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"created"</span><span class="token operator">:</span> <span class="token number">1589478378</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"data"</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">"url"</span><span class="token operator">:</span> <span class="token string">"https://..."</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">"url"</span><span class="token operator">:</span> <span class="token string">"https://..."</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="创建图像编辑" tabindex="-1"><a class="header-anchor" href="#创建图像编辑"><span>创建图像编辑 <Badge text="beta" /></span></a></h2>
<p><code v-pre>POST</code> <code v-pre>https://api.openai.com/v1/images/edits</code></p>
<p>在给定原始图像和提示的情况下创建编辑或扩展图像。</p>
<h3 id="请求正文-1" tabindex="-1"><a class="header-anchor" href="#请求正文-1"><span>请求正文</span></a></h3>
<p><strong>image</strong> <code v-pre>string</code> <code v-pre>必填</code></p>
<p>要编辑的图像。必须是有效的 PNG 文件，小于 4MB，并且是方形的。如果未提供遮罩，图像必须具有透明度，将用作遮罩。</p>
<hr>
<p><strong>mask</strong> <code v-pre>string</code> <code v-pre>可选</code></p>
<p>完全透明区域（例如 alpha 为零的区域）的附加图像指示应编辑<code v-pre>图像</code>的位置。必须是有效的 PNG 文件，小于 4MB，并且与<code v-pre>图像</code>具有相同的尺寸。</p>
<hr>
<p><strong>prompt</strong> <code v-pre>string</code> <code v-pre>必填</code></p>
<p>所需图像的文本描述。最大长度为 1000 个字符。</p>
<hr>
<p><strong>n</strong> <code v-pre>integer</code> <code v-pre>可选</code> <code v-pre>默认 1</code></p>
<p>要生成的图像数。必须介于 1 和 10 之间。</p>
<hr>
<p><strong>size</strong> <code v-pre>string</code> <code v-pre>可选</code> <code v-pre>默认 1024x1024</code></p>
<p>生成图像的大小。必须是 <code v-pre>256x256</code>、<code v-pre>512x512</code> 或 <code v-pre>1024x1024</code> 之一。</p>
<hr>
<p><strong>response_format</strong> <code v-pre>string</code> <code v-pre>默认 url</code></p>
<p>生成的图像返回的格式。必须是 <code v-pre>url</code> 或 <code v-pre>b64_json</code> 之一。</p>
<hr>
<p><strong>user</strong> <code v-pre>string</code> <code v-pre>可选 </code></p>
<p>代表您的最终用户的唯一标识符，可以帮助 OpenAI 监控和检测滥用行为。<RouteLink to="/guides/%E5%AE%89%E5%85%A8%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5.html#%E6%9C%80%E7%BB%88%E7%94%A8%E6%88%B7-id">了解更多</RouteLink>。</p>
<h2 id="创建图像变体" tabindex="-1"><a class="header-anchor" href="#创建图像变体"><span>创建图像变体 <Badge text="beta" /></span></a></h2>
<p><code v-pre>POST</code> <code v-pre>https://api.openai.com/v1/images/variations</code></p>
<p>创建给定图像的变体。</p>
<h3 id="请求正文-2" tabindex="-1"><a class="header-anchor" href="#请求正文-2"><span>请求正文</span></a></h3>
<p><strong>image</strong> <code v-pre>string</code> <code v-pre>必填</code></p>
<p>要编辑的图像。必须是有效的 PNG 文件，小于 4MB，并且是方形的。如果未提供遮罩，图像必须具有透明度，将用作遮罩。</p>
<hr>
<p><strong>n</strong> <code v-pre>integer</code> <code v-pre>可选</code> <code v-pre>默认 1</code></p>
<p>要生成的图像数。必须介于 1 和 10 之间。</p>
<hr>
<p><strong>size</strong> <code v-pre>string</code> <code v-pre>可选</code> <code v-pre>默认 1024x1024</code></p>
<p>生成图像的大小。必须是 <code v-pre>256x256</code>、<code v-pre>512x512</code> 或 <code v-pre>1024x1024</code> 之一。</p>
<hr>
<p><strong>response_format</strong> <code v-pre>string</code> <code v-pre>默认 url</code></p>
<p>生成的图像返回的格式。必须是 <code v-pre>url</code> 或 <code v-pre>b64_json</code> 之一。</p>
<hr>
<p><strong>user</strong> <code v-pre>string</code> <code v-pre>可选 </code></p>
<p>代表您的最终用户的唯一标识符，可以帮助 OpenAI 监控和检测滥用行为。<RouteLink to="/guides/%E5%AE%89%E5%85%A8%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5.html#%E6%9C%80%E7%BB%88%E7%94%A8%E6%88%B7-id">了解更多</RouteLink>。</p>
</div></template>


