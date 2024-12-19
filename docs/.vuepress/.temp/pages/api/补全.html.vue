<template><div><h1 id="补全" tabindex="-1"><a class="header-anchor" href="#补全"><span>补全</span></a></h1>
<p>给定一个提示，该模型将返回一个或多个预测的完成，并且还可以返回每个位置的替代标记的概率。</p>
<h2 id="创建补全" tabindex="-1"><a class="header-anchor" href="#创建补全"><span>创建补全</span></a></h2>
<p><code v-pre>POST</code> <code v-pre>https://api.openai.com/v1/completions</code></p>
<p>为提供的提示和参数创建补全</p>
<h3 id="请求正文" tabindex="-1"><a class="header-anchor" href="#请求正文"><span>请求正文</span></a></h3>
<p><strong>model</strong> <code v-pre>String</code> <code v-pre>必填</code></p>
<p>要使用的模型的 ID。您可以使用 <RouteLink to="/api/API.html#%E6%A8%A1%E5%9E%8B%E5%88%97%E8%A1%A8">List models</RouteLink> API 来查看所有可用模型，或查看我们的<a href="/start/%E6%A8%A1%E5%9E%8B">模型</a>概述以了解它们的描述。</p>
<hr>
<p><strong>prompt</strong> <code v-pre>string or array</code> <code v-pre>可选 默认 &lt;|endoftext|&gt;</code></p>
<p>生成补全的提示，编码为字符串、字符串数组、标记数组或标记数组数组。</p>
<p>请注意，&lt;|endoftext|&gt; 是模型在训练期间看到的文档分隔符，因此如果未指定提示，模型将生成新文档的开头。</p>
<hr>
<p><strong>suffix</strong> <code v-pre>string</code> <code v-pre>可选 默认 null</code></p>
<p>插入文本完成后出现的后缀。</p>
<hr>
<p><strong>max_tokens</strong> <code v-pre>integer</code> <code v-pre>可选 默认 16</code></p>
<p>补全时生成的最大<a href="https://platform.openai.com/tokenizer" target="_blank" rel="noopener noreferrer">标记</a>数。</p>
<p>您提示的标记计数加上 <code v-pre>max_tokens</code> 不能超过模型的上下文长度。大多数模型的上下文长度为 2048 个标记（最新模型除外，它支持 4096）。</p>
<hr>
<p><strong>temperature</strong> <code v-pre>number</code> <code v-pre>可选 默认 1</code></p>
<p>使用什么采样<code v-pre>temperature</code>，介于 0 和 2 之间。较高的值（如 0.8）将使输出更加随机，而较低的值（如 0.2）将使输出更加集中和确定。</p>
<p>我们通常建议改变这个或 <code v-pre>top_p</code> 但不是两者都改变。</p>
<hr>
<p><strong>top_p</strong> <code v-pre>number</code>  <code v-pre>可选 默认 1</code></p>
<p>一种替代 <code v-pre>temperature</code> 采样的方法，称为核采样，其中模型考虑具有 <code v-pre>top_p</code> 概率质量的标记的结果。所以 0.1 意味着只考虑构成前 10% 概率质量的标记。</p>
<p>我们通常建议更改此值或 <code v-pre>temperature</code>，但不要同时更改两者。</p>
<hr>
<p><strong>n</strong> <code v-pre>integer</code> <code v-pre>可选 默认 1</code></p>
<p>为每个提示生成多少补全。</p>
<p><strong>注意</strong>：因为这个参数会产生很多补全，它会很快消耗你的标记配额。请谨慎使用并确保您对 <code v-pre>max_tokens</code> 和<code v-pre>stop</code>进行了合理的设置。</p>
<hr>
<p><strong>stream</strong> <code v-pre>boolean</code> <code v-pre>可选 默认 false</code></p>
<p>是否回流部分进度。如果设置，标记将在可用时作为纯数据服务器<a href="https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format" target="_blank" rel="noopener noreferrer">发送事件</a>发送，流数据全部返回后，数据返回:<code v-pre>[NODE]</code> 结束。</p>
<p>说白了就已流的形式返回结果，不再是<code v-pre>JSON</code>格式了</p>
<hr>
<p><strong>logprobs</strong> <code v-pre>integer</code> <code v-pre>可选 默认 null</code></p>
<p>在 <code v-pre>logprobs</code> 上包括对数概率最有可能的标记，以及所选标记。例如，如果 <code v-pre>logprobs</code> 为 5，API 将返回 5 个最有可能的标记的列表。 API 将始终返回采样标记的 <code v-pre>logprob</code>，因此响应中最多可能有<code v-pre>logprobs+1</code> 个元素。</p>
<p><code v-pre>logprobs</code> 的最大值为 5。如果您需要更多，请通过我们的<a href="https://help.openai.com/" target="_blank" rel="noopener noreferrer">帮助中心</a>联系我们并描述您的用例。</p>
<hr>
<p><strong>echo</strong> <code v-pre>boolean</code> <code v-pre>可选 默认 false</code></p>
<p>除了补全之外回显提示</p>
<hr>
<p><strong>stop</strong> <code v-pre>string or array</code>  <code v-pre>可选 默认 null</code></p>
<p>API 将停止生成更多标记的最多 4 个序列。返回的文本将不包含停止序列。</p>
<hr>
<p><strong>presence_penalty</strong> <code v-pre>number</code> <code v-pre>可选 默认 0</code></p>
<p>-2.0 和 2.0 之间的数字。正值会根据到目前为止是否出现在文本中来处罚新标记，从而增加模型谈论新题目的可能性。</p>
<p><a href="#%E5%8F%82%E6%95%B0%E8%AF%A6%E6%83%85">查看有关频率和存在惩罚的更多信息</a>。</p>
<hr>
<p><strong>frequency_penalty</strong> <code v-pre>number</code> <code v-pre>可选 默认 0</code></p>
<p>-2.0 和 2.0 之间的数字。正值会根据新标记在文本中的现有频率对其进行处罚，从而降低模型逐字重复同一行的可能性。</p>
<p><a href="#%E5%8F%82%E6%95%B0%E8%AF%A6%E6%83%85">查看有关频率和存在惩罚的更多信息</a>。</p>
<hr>
<p><strong>best_of</strong> <code v-pre>integer</code> <code v-pre>可选 默认 1</code></p>
<p>在服务器端生成 <code v-pre>best_of</code> 补全并返回“最佳”（每个标记具有最高对数概率的那个）。无法流式传输结果。当与 <code v-pre>n</code> 一起使用时，<code v-pre>best_of</code> 控制候选补全的数量，n 指定返回多少 - <code v-pre>best_of</code> 必须大于 <code v-pre>n</code>。</p>
<p><strong>注意</strong>：因为这个参数会产生很多补全，它会很快消耗你的标记配额。请谨慎使用并确保您对 <code v-pre>max_tokens</code> 和 <code v-pre>stop</code>进行了合理的设置。</p>
<hr>
<p><strong>logit_bias</strong> <code v-pre>map</code> 可选 默认 null</p>
<p>修改指定标记出现在补全中的可能性。</p>
<p>接受一个 json 对象，该对象将令牌（由 GPT 分词器中的令牌 ID 指定）映射到从 -100 到 100 的相关偏差值。您可以使用此<a href="https://platform.openai.com/tokenizer?view=bpe" target="_blank" rel="noopener noreferrer">标记生成器工具</a>（适用于 GPT-2 和 GPT-3）将文本转换为标记 ID。从数学上讲，偏差会在采样之前添加到模型生成的对数中。确切的效果因模型而异，但 -1 和 1 之间的值应该会减少或增加选择的可能性；像 -100 或 100 这样的值应该导致相关标记的禁止或独占选择。</p>
<p>例如，您可以传递 <code v-pre>{&quot;50256&quot;: -100}</code> 以防止生成 &lt;|endoftext|&gt; 标记。</p>
<hr>
<p><strong>user</strong> <code v-pre>string</code> <code v-pre>可选</code></p>
<p>代表您的最终用户的唯一标识符，可以帮助 OpenAI 监控和检测滥用行为。<RouteLink to="/guides/%E5%AE%89%E5%85%A8%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5.html#%E6%9C%80%E7%BB%88%E7%94%A8%E6%88%B7-id">了解更多</RouteLink>。</p>
<hr>
<h3 id="请求示例" tabindex="-1"><a class="header-anchor" href="#请求示例"><span>请求示例</span></a></h3>
<p><strong>curl</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line"><span class="token function">curl</span> https://api.openai.com/v1/completions <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">-H</span> <span class="token string">'Content-Type: application/json'</span> <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">-H</span> <span class="token string">'Authorization: Bearer YOUR_API_KEY'</span> <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">-d</span> <span class="token string">'{</span>
<span class="line">  "model": "text-davinci-003",</span>
<span class="line">  "prompt": "Say this is a test",</span>
<span class="line">  "max_tokens": 7,</span>
<span class="line">  "temperature": 0</span>
<span class="line">}'</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>参数</strong></p>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json" data-title="json"><pre v-pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"model"</span><span class="token operator">:</span> <span class="token string">"text-davinci-003"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"prompt"</span><span class="token operator">:</span> <span class="token string">"Say this is a test"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"max_tokens"</span><span class="token operator">:</span> <span class="token number">7</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"temperature"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"top_p"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"n"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"stream"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"logprobs"</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"stop"</span><span class="token operator">:</span> <span class="token string">"\n"</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>响应结果</strong></p>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json" data-title="json"><pre v-pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"id"</span><span class="token operator">:</span> <span class="token string">"cmpl-uqkvlQyYK7bGYrRHQ0eXlWi7"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"object"</span><span class="token operator">:</span> <span class="token string">"text_completion"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"created"</span><span class="token operator">:</span> <span class="token number">1589478378</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"model"</span><span class="token operator">:</span> <span class="token string">"text-davinci-003"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"choices"</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">"text"</span><span class="token operator">:</span> <span class="token string">"\n\nThis is indeed a test"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"index"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"logprobs"</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"finish_reason"</span><span class="token operator">:</span> <span class="token string">"length"</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"usage"</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">"prompt_tokens"</span><span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"completion_tokens"</span><span class="token operator">:</span> <span class="token number">7</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"total_tokens"</span><span class="token operator">:</span> <span class="token number">12</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


