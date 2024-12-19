<template><div><h1 id="审核" tabindex="-1"><a class="header-anchor" href="#审核"><span><a href="https://platform.openai.com/docs/guides/moderation/moderation" target="_blank" rel="noopener noreferrer">审核</a></span></a></h1>
<h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述"><span>概述</span></a></h2>
<p><a href="https://platform.openai.com/docs/api-reference/moderations" target="_blank" rel="noopener noreferrer">审核</a>端点是一种工具，可用于检查内容是否符合 OpenAI 的<a href="https://platform.openai.com/docs/usage-policies/content-policy" target="_blank" rel="noopener noreferrer">内容政策</a>。因此，开发人员可以识别我们的内容政策禁止的内容并采取措施，例如过滤它。</p>
<p>这些模型将以下类别分类：</p>
<table>
<thead>
<tr>
<th style="text-align:left">类别</th>
<th style="text-align:left">描述</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code v-pre>hate</code></td>
<td style="text-align:left">基于种族、性别、民族、宗教、国籍、性取向、残疾状况或种姓表达、煽动或促进仇恨的内容。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>hate/threatening</code></td>
<td style="text-align:left">仇恨内容还包括对目标群体的暴力或严重伤害。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>self-harm</code></td>
<td style="text-align:left">提倡、鼓励或描述自残行为（例如自杀、割伤和饮食失调）的内容。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>sexual</code></td>
<td style="text-align:left">意在引起性兴奋的内容，例如对性活动的描述，或宣传性服务（不包括性教育和健康）的内容。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>sexual/minors</code></td>
<td style="text-align:left">包含 18 岁以下个人的色情内容。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>violence</code></td>
<td style="text-align:left">宣扬或美化暴力或颂扬他人的痛苦或屈辱的内容。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>violence/graphic</code></td>
<td style="text-align:left">以极端的画面细节描绘死亡、暴力或严重身体伤害的暴力内容。</td>
</tr>
</tbody>
</table>
<p>在监控 OpenAI API 的输入和输出时，可以免费使用审核端点。我们目前不支持监测第三方流量。</p>
<p>我们一直致力于提高分类器的准确性，尤其是致力于改进<code v-pre>hate</code>、<code v-pre>self-harm</code>和<code v-pre>violence/graphic</code>内容的分类。我们对非英语语言的支持目前有限。</p>
<h2 id="快速开始" tabindex="-1"><a class="header-anchor" href="#快速开始"><span><a href="https://platform.openai.com/docs/guides/moderation/quickstart" target="_blank" rel="noopener noreferrer">快速开始</a></span></a></h2>
<p>要获取一段文本的分类，请向<a href="https://platform.openai.com/docs/api-reference/moderations" target="_blank" rel="noopener noreferrer">审核端点</a>发出请求，如以下代码片段所示：</p>
<p>示例：获得审核</p>
<p>CRUL：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line"><span class="token function">curl</span> https://api.openai.com/v1/moderations <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">-X</span> POST <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">-H</span> <span class="token string">"Content-Type: application/json"</span> <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">-H</span> <span class="token string">"Authorization: Bearer <span class="token variable">$OPENAI_API_KEY</span>"</span> <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">-d</span> <span class="token string">'{"input": "Sample text goes here"}'</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面是端点的示例输出。它返回以下字段：</p>
<ul>
<li><code v-pre>flagged</code>：<code v-pre>true</code>如果模型将内容分类为违反 OpenAI 的内容策略，则设置为，<code v-pre>false</code>否则。</li>
<li><code v-pre>categories</code>：包含每个类别的二进制内容策略违规标志的字典。对于每个类别，该值是<code v-pre>true</code>模型是否将相应类别标记为违规，<code v-pre>false</code>否则。</li>
<li><code v-pre>category_scores</code>：包含模型输出的每个类别原始分数的字典，表示模型对输入违反 OpenAI 的类别策略的信心。该值介于 0 和 1 之间，其中较高的值表示较高的置信度。分数不应解释为概率。</li>
</ul>
<div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py" data-title="py"><pre v-pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token string">"id"</span><span class="token punctuation">:</span> <span class="token string">"modr-XXXXX"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token string">"model"</span><span class="token punctuation">:</span> <span class="token string">"text-moderation-001"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token string">"results"</span><span class="token punctuation">:</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">      <span class="token string">"categories"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token string">"hate"</span><span class="token punctuation">:</span> false<span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">"hate/threatening"</span><span class="token punctuation">:</span> false<span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">"self-harm"</span><span class="token punctuation">:</span> false<span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">"sexual"</span><span class="token punctuation">:</span> false<span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">"sexual/minors"</span><span class="token punctuation">:</span> false<span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">"violence"</span><span class="token punctuation">:</span> false<span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">"violence/graphic"</span><span class="token punctuation">:</span> false</span>
<span class="line">      <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token string">"category_scores"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token string">"hate"</span><span class="token punctuation">:</span> <span class="token number">0.18805529177188873</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">"hate/threatening"</span><span class="token punctuation">:</span> <span class="token number">0.0001250059431185946</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">"self-harm"</span><span class="token punctuation">:</span> <span class="token number">0.0003706029092427343</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">"sexual"</span><span class="token punctuation">:</span> <span class="token number">0.0008735615410842001</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">"sexual/minors"</span><span class="token punctuation">:</span> <span class="token number">0.0007470346172340214</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">"violence"</span><span class="token punctuation">:</span> <span class="token number">0.0041268812492489815</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">"violence/graphic"</span><span class="token punctuation">:</span> <span class="token number">0.00023186142789199948</span></span>
<span class="line">      <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token string">"flagged"</span><span class="token punctuation">:</span> false</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>OpenAI 将不断升级审核端点的底层模型。因此，依赖的自定义策略<code v-pre>category_scores</code>可能需要随着时间的推移重新校准。</p>
</div></template>


