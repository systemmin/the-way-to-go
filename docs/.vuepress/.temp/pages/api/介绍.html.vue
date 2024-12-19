<template><div><h1 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍"><span>介绍</span></a></h1>
<p>您可以通过任何语言的 HTTP 请求、我们的官方 Python 绑定、我们的官方 Node.js 库或<RouteLink to="/start/%E5%BA%93.html#%E7%A4%BE%E5%8C%BA%E5%BA%93">社区维护的库</RouteLink>与 API 交互。</p>
<p>要安装官方 Python 绑定，请运行以下命令：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line">pip <span class="token function">install</span> openai</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>要安装官方 Node.js 库，请在 Node.js 项目目录中运行以下命令：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line"><span class="token function">npm</span> <span class="token function">install</span> openai</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="验证" tabindex="-1"><a class="header-anchor" href="#验证"><span>验证</span></a></h2>
<p>OpenAI API 使用 API 密钥进行身份验证。访问您的<a href="https://platform.openai.com/account/api-keys" target="_blank" rel="noopener noreferrer">API 密钥</a>页面以检索您将在请求中使用的 API 密钥。</p>
<p><strong>请记住，您的 API 密钥是秘密的</strong> ！不要与他人共享或在任何客户端代码（浏览器、应用程序）中公开它。生产请求必须通过您自己的后端服务器进行路由，您的 API 密钥可以从环境变量或密钥管理服务中安全加载。</p>
<p>所有 API 请求都应在<code v-pre>Authorization</code>HTTP 标头中包含您的 API 密钥，如下所示：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line">Authorization: Bearer YOUR_API_KEY</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="请求组织" tabindex="-1"><a class="header-anchor" href="#请求组织"><span>请求组织</span></a></h2>
<p>对于属于多个组织的用户，您可以传递一个标头来指定哪个组织用于 API 请求。来自这些 API 请求的使用将计入指定组织的订阅配额。</p>
<p><code v-pre>curl</code> 命令示例：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line"><span class="token function">curl</span> https://api.openai.com/v1/models <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">-H</span> <span class="token string">'Authorization: Bearer YOUR_API_KEY'</span> <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">-H</span> <span class="token string">'OpenAI-Organization: org-8PbmSSpo3zugMUVpmPwBR8yr'</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>openai</code> Python 包的示例：</p>
<div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py" data-title="py"><pre v-pre><code><span class="line"><span class="token keyword">import</span> os</span>
<span class="line"><span class="token keyword">import</span> openai</span>
<span class="line">openai<span class="token punctuation">.</span>organization <span class="token operator">=</span> <span class="token string">"org-8PbmSSpo3zugMUVpmPwBR8yr"</span></span>
<span class="line">openai<span class="token punctuation">.</span>api_key <span class="token operator">=</span> os<span class="token punctuation">.</span>getenv<span class="token punctuation">(</span><span class="token string">"OPENAI_API_KEY"</span><span class="token punctuation">)</span></span>
<span class="line">openai<span class="token punctuation">.</span>Model<span class="token punctuation">.</span><span class="token builtin">list</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>openai</code> Node.js 包的示例：</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> Configuration<span class="token punctuation">,</span> OpenAIApi <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"openai"</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> configuration <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Configuration</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">organization</span><span class="token operator">:</span> <span class="token string">"org-8PbmSSpo3zugMUVpmPwBR8yr"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">apiKey</span><span class="token operator">:</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">OPENAI_API_KEY</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> openai <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">OpenAIApi</span><span class="token punctuation">(</span>configuration<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> response <span class="token operator">=</span> <span class="token keyword">await</span> openai<span class="token punctuation">.</span><span class="token function">listEngines</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>组织 ID 可以在您的<a href="https://platform.openai.com/account/org-settings" target="_blank" rel="noopener noreferrer">组织设置</a>页面上找到。</p>
<hr>
<h2 id="发出请求" tabindex="-1"><a class="header-anchor" href="#发出请求"><span>发出请求</span></a></h2>
<p>您可以将下面的命令粘贴到您的终端中以运行您的第一个 API 请求。确保替换<code v-pre>YOUR_API_KEY</code>为您的秘密 API 密钥。</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line"><span class="token function">curl</span> https://api.openai.com/v1/completions <span class="token punctuation">\</span></span>
<span class="line"><span class="token parameter variable">-H</span> <span class="token string">"Content-Type: application/json"</span> <span class="token punctuation">\</span></span>
<span class="line"><span class="token parameter variable">-H</span> <span class="token string">"Authorization: Bearer YOUR_API_KEY"</span> <span class="token punctuation">\</span></span>
<span class="line"><span class="token parameter variable">-d</span> <span class="token string">'{"model": "text-davinci-003", "prompt": "Say this is a test", "temperature": 0, "max_tokens": 7}'</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>此请求查询 Davinci 模型以完成以提示“ Say this is a test</em> ”开头的文本。该参数设置了 API 将返回的<a href="https://platform.openai.com/tokenizer" target="_blank" rel="noopener noreferrer">标记数量</a><code v-pre>max_tokens</code>的上限。您应该会收到类似于以下内容的响应：</p>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json" data-title="json"><pre v-pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">"id"</span><span class="token operator">:</span> <span class="token string">"cmpl-GERzeJQ4lvqPk8SkZu4XMIuR"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"object"</span><span class="token operator">:</span> <span class="token string">"text_completion"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"created"</span><span class="token operator">:</span> <span class="token number">1586839808</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"model"</span><span class="token operator">:</span> <span class="token string">"text-davinci:003"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"choices"</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">            <span class="token property">"text"</span><span class="token operator">:</span> <span class="token string">"\n\nThis is indeed a test"</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token property">"index"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token property">"logprobs"</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token property">"finish_reason"</span><span class="token operator">:</span> <span class="token string">"length"</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"usage"</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">"prompt_tokens"</span><span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">"completion_tokens"</span><span class="token operator">:</span> <span class="token number">7</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">"total_tokens"</span><span class="token operator">:</span> <span class="token number">12</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在你已经生成了你的第一个完成。<code v-pre>echo</code> 如果您连接提示和完成文本（如果您将参数设置为 ，API 将为您执行此操作 <code v-pre>true</code> ），则生成的文本为“ <em>Say this is a test. This indeed a test.</em> ”您还可以将<code v-pre>stream</code>参数设置为<code v-pre>true</code>用于 API 流回文本（作为<a href="https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format" target="_blank" rel="noopener noreferrer">仅数据服务器发送的事件</a>）。</p>
</div></template>


