<template><div><h1 id="微调" tabindex="-1"><a class="header-anchor" href="#微调"><span>微调</span></a></h1>
<p>管理微调作业以根据您的特定训练数据定制模型。</p>
<p>相关指南：<a href="/guides/%E5%BE%AE%E8%B0%83">微调模型</a></p>
<h2 id="创建微调" tabindex="-1"><a class="header-anchor" href="#创建微调"><span>创建微调</span></a></h2>
<p><code v-pre>POST</code> <code v-pre>https://api.openai.com/v1/fine-tunes</code></p>
<p>创建一个从给定数据集微调指定模型的作业。</p>
<p>响应包括排队作业的详细信息，包括作业状态和完成后微调模型的名称。</p>
<p><strong><a href="/guides/%E5%BE%AE%E8%B0%83">了解有关微调的更多信息</a></strong></p>
<h3 id="请求正文" tabindex="-1"><a class="header-anchor" href="#请求正文"><span>请求正文</span></a></h3>
<p><strong>training_file</strong>  <code v-pre>string</code> <code v-pre>必填</code></p>
<p>包含训练数据的上传文件的 ID。</p>
<p>有关如何上传文件，请参阅<RouteLink to="/api/%E6%96%87%E4%BB%B6.html#%E4%B8%8A%E4%BC%A0%E6%96%87%E4%BB%B6">上传文件</RouteLink>。</p>
<p>您的数据集必须格式化为 JSONL 文件，其中每个训练示例都是一个带有键“提示”和“完成”的 JSON 对象。此外，您必须上传带有`微调 purpose  的文件。</p>
<p>有关详细信息，请参阅<a href="/guides/%E5%BE%AE%E8%B0%83">微调指南</a>。</p>
<hr>
<p><strong>validation_file</strong>  <code v-pre>string</code> <code v-pre>可选</code></p>
<p>包含验证数据的上传文件的 ID。</p>
<p>如果您提供此文件，该数据将用于在微调期间定期生成验证指标。这些指标可以在<RouteLink to="/guides/%E5%BE%AE%E8%B0%83.html#%E5%88%86%E6%9E%90%E6%82%A8%E7%9A%84%E5%BE%AE%E8%B0%83%E6%A8%A1%E5%9E%8B">微调结果文件中</RouteLink>查看。您的火车和验证数据应该是互斥的。</p>
<p>您的数据集必须格式化为 JSONL 文件，其中每个验证示例都是一个带有键“prompt”和“completion”的 JSON 对象。此外，您必须上传带有<code v-pre>微调</code> purpose  的文件。</p>
<p>有关详细信息，请参阅<a href="/guides/%E5%BE%AE%E8%B0%83">微调指南</a>。</p>
<hr>
<p><strong>model</strong>  <code v-pre>string</code> <code v-pre>可选</code> <code v-pre>默认 null</code></p>
<p>要微调的基本模型的名称。您可以选择“ada”、“babbage”、“curie”、“davinci”或 2022-04-21 之后创建的微调模型之一。要了解有关这些模型的更多信息，请参阅<a href="/start/%E6%A8%A1%E5%9E%8B">模型</a>文档。</p>
<hr>
<p><strong>n_epochs</strong>  <code v-pre>integer</code> <code v-pre>可选</code> <code v-pre>默认 4</code></p>
<p>训练模型的时期数。一个时期指的是训练数据集的一个完整周期。</p>
<hr>
<p><strong>batch_size</strong>  <code v-pre>integer</code> <code v-pre>可选</code> <code v-pre>默认 null</code></p>
<p>用于训练的批量大小。批量大小是用于训练单个前向和后向传递的训练示例数。</p>
<p>默认情况下，批量大小将动态配置为训练集中示例数量的 0.2%，上限为 256 - 通常，我们发现较大的批量大小往往更适合较大的数据集。</p>
<hr>
<p><strong>learning_rate_multiplier</strong>  <code v-pre>number</code> <code v-pre>可选</code> <code v-pre>默认 null</code></p>
<p>用于训练的学习率乘数。微调学习率是用于预训练的原始学习率乘以该值。</p>
<p>默认情况下，学习率乘数是 0.05、0.1 或 0.2，具体取决于最终的 batch_size（较大的学习率往往在较大的批量大小下表现更好）。我们建议使用 0.02 到 0.2 范围内的值进行试验，以查看产生最佳结果的值。</p>
<hr>
<p><strong>prompt_loss_weight</strong>  <code v-pre>number</code> <code v-pre>可选</code> <code v-pre>默认 0.01</code></p>
<p>用于提示令牌损失的权重。这控制了模型尝试学习生成提示的程度（与权重始终为 1.0 的完成相比），并且可以在完成较短时为训练增加稳定效果。</p>
<p>如果提示非常长（相对于完成），则减少此权重以避免过度优先学习提示可能是有意义的。</p>
<hr>
<p><strong>compute_classification_metrics</strong>  <code v-pre>boolean</code> <code v-pre>可选</code> <code v-pre>默认 false</code></p>
<p>如果设置，我们将在每个时期结束时使用验证集计算特定于分类的指标，例如准确性和 F-1 分数。可以在<RouteLink to="/api/(/guides/%E5%BE%AE%E8%B0%83.html#%E5%88%86%E6%9E%90%E6%82%A8%E7%9A%84%E5%BE%AE%E8%B0%83%E6%A8%A1%E5%9E%8B)">结果文件</RouteLink>中查看这些指标。</p>
<p>为了计算分类指标，您必须提供一个 <code v-pre>validation_file</code>. 此外，您必须指定<code v-pre>classification_n_classes</code>多类分类或 <code v-pre>classification_positive_class</code>二元分类。</p>
<hr>
<p><strong>classification_n_classes</strong>  <code v-pre>integer</code> <code v-pre>可选</code> <code v-pre>默认 null</code></p>
<p>分类任务中的类数。</p>
<p>多类分类需要此参数。</p>
<hr>
<p><strong>classification_positive_class</strong>  <code v-pre>string</code> <code v-pre>可选</code> <code v-pre>默认 null</code></p>
<p>二元分类中的正类。</p>
<p>在进行二元分类时，需要此参数来生成精度、召回率和 F1 指标。</p>
<hr>
<p><strong>classification_betas</strong>  <code v-pre>array</code> <code v-pre>可选</code> <code v-pre>默认 null</code></p>
<p>如果提供，我们将计算指定 beta 值的 F-beta 分数。F-beta 分数是 F-1 分数的推广。这仅用于二进制分类。</p>
<p>当 beta 为 1（即 F-1 分数）时，精确率和召回率被赋予相同的权重。Beta 分数越大，召回率越高，精确率越低。Beta 分数越小，精确度越重要，召回率越低。</p>
<hr>
<p><strong>suffix</strong>  <code v-pre>string</code> <code v-pre>可选</code> <code v-pre>默认 null</code></p>
<p>最多 40 个字符的字符串，将添加到您的微调模型名称中。</p>
<p>例如，<code v-pre>suffix</code>“custom-model-name”的 a 会生成类似<code v-pre>ada:ft-your-org:custom-model-name-2022-02-15-04-21-04</code>.</p>
<hr>
<h3 id="请求示例" tabindex="-1"><a class="header-anchor" href="#请求示例"><span>请求示例</span></a></h3>
<CodeGroup>
  <CodeGroupItem title="curl" active>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line"><span class="token function">curl</span> https://api.openai.com/v1/fine-tunes <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">-X</span> POST <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">-H</span> <span class="token string">"Content-Type: application/json"</span> <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">-H</span> <span class="token string">"Authorization: Bearer YOUR_API_KEY"</span> <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">-d</span> <span class="token string">'{</span>
<span class="line">  "training_file": "file-XGinujblHPwGLSztz8cPS8XY"</span>
<span class="line">}'</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
  <CodeGroupItem title="python">
<div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py" data-title="py"><pre v-pre><code><span class="line"><span class="token keyword">import</span> os</span>
<span class="line"><span class="token keyword">import</span> openai</span>
<span class="line">openai<span class="token punctuation">.</span>api_key <span class="token operator">=</span> os<span class="token punctuation">.</span>getenv<span class="token punctuation">(</span><span class="token string">"OPENAI_API_KEY"</span><span class="token punctuation">)</span></span>
<span class="line">openai<span class="token punctuation">.</span>FineTune<span class="token punctuation">.</span>create<span class="token punctuation">(</span>training_file<span class="token operator">=</span><span class="token string">"file-XGinujblHPwGLSztz8cPS8XY"</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
  <CodeGroupItem title="node.js" >
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">const</span> <span class="token punctuation">{</span> Configuration<span class="token punctuation">,</span> OpenAIApi <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"openai"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> configuration <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Configuration</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">apiKey</span><span class="token operator">:</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">OPENAI_API_KEY</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> openai <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">OpenAIApi</span><span class="token punctuation">(</span>configuration<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> response <span class="token operator">=</span> <span class="token keyword">await</span> openai<span class="token punctuation">.</span><span class="token function">createFineTune</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">training_file</span><span class="token operator">:</span> <span class="token string">"file-XGinujblHPwGLSztz8cPS8XY"</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
</CodeGroup>
<h3 id="响应结果" tabindex="-1"><a class="header-anchor" href="#响应结果"><span>响应结果</span></a></h3>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json" data-title="json"><pre v-pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"id"</span><span class="token operator">:</span> <span class="token string">"ft-AF1WoRqd3aJAHsqc9NY7iL8F"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"object"</span><span class="token operator">:</span> <span class="token string">"fine-tune"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"model"</span><span class="token operator">:</span> <span class="token string">"curie"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"created_at"</span><span class="token operator">:</span> <span class="token number">1614807352</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"events"</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">"object"</span><span class="token operator">:</span> <span class="token string">"fine-tune-event"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"created_at"</span><span class="token operator">:</span> <span class="token number">1614807352</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"level"</span><span class="token operator">:</span> <span class="token string">"info"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"message"</span><span class="token operator">:</span> <span class="token string">"Job enqueued. Waiting for jobs ahead to complete. Queue number: 0."</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"fine_tuned_model"</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"hyperparams"</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">"batch_size"</span><span class="token operator">:</span> <span class="token number">4</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"learning_rate_multiplier"</span><span class="token operator">:</span> <span class="token number">0.1</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"n_epochs"</span><span class="token operator">:</span> <span class="token number">4</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"prompt_loss_weight"</span><span class="token operator">:</span> <span class="token number">0.1</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"organization_id"</span><span class="token operator">:</span> <span class="token string">"org-..."</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"result_files"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"status"</span><span class="token operator">:</span> <span class="token string">"pending"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"validation_files"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"training_files"</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">"id"</span><span class="token operator">:</span> <span class="token string">"file-XGinujblHPwGLSztz8cPS8XY"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"object"</span><span class="token operator">:</span> <span class="token string">"file"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"bytes"</span><span class="token operator">:</span> <span class="token number">1547276</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"created_at"</span><span class="token operator">:</span> <span class="token number">1610062281</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"filename"</span><span class="token operator">:</span> <span class="token string">"my-data-train.jsonl"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"purpose"</span><span class="token operator">:</span> <span class="token string">"fine-tune-train"</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"updated_at"</span><span class="token operator">:</span> <span class="token number">1614807352</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="列表微调" tabindex="-1"><a class="header-anchor" href="#列表微调"><span>列表微调</span></a></h2>
<p><code v-pre>GET</code> <code v-pre>https://api.openai.com/v1/fine-tunes</code></p>
<p>列出您的组织的微调工作</p>
<h3 id="请求示例-1" tabindex="-1"><a class="header-anchor" href="#请求示例-1"><span>请求示例</span></a></h3>
<CodeGroup>
  <CodeGroupItem title="curl" active>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line"><span class="token function">curl</span> https://api.openai.com/v1/fine-tunes <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">-H</span> <span class="token string">'Authorization: Bearer YOUR_API_KEY'</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
  <CodeGroupItem title="python">
<div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py" data-title="py"><pre v-pre><code><span class="line"><span class="token keyword">import</span> os</span>
<span class="line"><span class="token keyword">import</span> openai</span>
<span class="line">openai<span class="token punctuation">.</span>api_key <span class="token operator">=</span> os<span class="token punctuation">.</span>getenv<span class="token punctuation">(</span><span class="token string">"OPENAI_API_KEY"</span><span class="token punctuation">)</span></span>
<span class="line">openai<span class="token punctuation">.</span>FineTune<span class="token punctuation">.</span><span class="token builtin">list</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
  <CodeGroupItem title="node.js" >
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">const</span> <span class="token punctuation">{</span> Configuration<span class="token punctuation">,</span> OpenAIApi <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"openai"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> configuration <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Configuration</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">apiKey</span><span class="token operator">:</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">OPENAI_API_KEY</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> openai <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">OpenAIApi</span><span class="token punctuation">(</span>configuration<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> response <span class="token operator">=</span> <span class="token keyword">await</span> openai<span class="token punctuation">.</span><span class="token function">listFineTunes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
</CodeGroup>
<h3 id="响应结果-1" tabindex="-1"><a class="header-anchor" href="#响应结果-1"><span>响应结果</span></a></h3>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json" data-title="json"><pre v-pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"object"</span><span class="token operator">:</span> <span class="token string">"list"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"data"</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">"id"</span><span class="token operator">:</span> <span class="token string">"ft-AF1WoRqd3aJAHsqc9NY7iL8F"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"object"</span><span class="token operator">:</span> <span class="token string">"fine-tune"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"model"</span><span class="token operator">:</span> <span class="token string">"curie"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"created_at"</span><span class="token operator">:</span> <span class="token number">1614807352</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"fine_tuned_model"</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"hyperparams"</span><span class="token operator">:</span> <span class="token punctuation">{</span> ... <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"organization_id"</span><span class="token operator">:</span> <span class="token string">"org-..."</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"result_files"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"status"</span><span class="token operator">:</span> <span class="token string">"pending"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"validation_files"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"training_files"</span><span class="token operator">:</span> <span class="token punctuation">[</span> <span class="token punctuation">{</span> ... <span class="token punctuation">}</span> <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"updated_at"</span><span class="token operator">:</span> <span class="token number">1614807352</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">{</span> ... <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">{</span> ... <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="检索微调" tabindex="-1"><a class="header-anchor" href="#检索微调"><span>检索微调</span></a></h2>
<p><code v-pre>GET</code> <code v-pre>https://api.openai.com/v1/fine-tunes/{fine_tune_id}</code></p>
<p>获取有关微调作业的信息。</p>
<p><strong><a href="/guides/%E5%BE%AE%E8%B0%83">了解有关微调的更多信息</a></strong></p>
<h3 id="路径参数" tabindex="-1"><a class="header-anchor" href="#路径参数"><span>路径参数</span></a></h3>
<p><strong>fine_tune_id</strong> <code v-pre>string</code> <code v-pre>必填</code></p>
<p>微调作业的ID</p>
<hr>
<h3 id="请求示例-2" tabindex="-1"><a class="header-anchor" href="#请求示例-2"><span>请求示例</span></a></h3>
<CodeGroup>
  <CodeGroupItem title="curl" active>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line"><span class="token function">curl</span> https://api.openai.com/v1/fine-tunes/ft-AF1WoRqd3aJAHsqc9NY7iL8F <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">-H</span> <span class="token string">"Authorization: Bearer YOUR_API_KEY"</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
  <CodeGroupItem title="python">
<div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py" data-title="py"><pre v-pre><code><span class="line"><span class="token keyword">import</span> os</span>
<span class="line"><span class="token keyword">import</span> openai</span>
<span class="line">openai<span class="token punctuation">.</span>api_key <span class="token operator">=</span> os<span class="token punctuation">.</span>getenv<span class="token punctuation">(</span><span class="token string">"OPENAI_API_KEY"</span><span class="token punctuation">)</span></span>
<span class="line">openai<span class="token punctuation">.</span>FineTune<span class="token punctuation">.</span>retrieve<span class="token punctuation">(</span><span class="token builtin">id</span><span class="token operator">=</span><span class="token string">"ft-AF1WoRqd3aJAHsqc9NY7iL8F"</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
  <CodeGroupItem title="node.js" >
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">const</span> <span class="token punctuation">{</span> Configuration<span class="token punctuation">,</span> OpenAIApi <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"openai"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> configuration <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Configuration</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">apiKey</span><span class="token operator">:</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">OPENAI_API_KEY</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> openai <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">OpenAIApi</span><span class="token punctuation">(</span>configuration<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> response <span class="token operator">=</span> <span class="token keyword">await</span> openai<span class="token punctuation">.</span><span class="token function">retrieveFineTune</span><span class="token punctuation">(</span><span class="token string">"ft-AF1WoRqd3aJAHsqc9NY7iL8F"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
</CodeGroup>
<h3 id="响应结果-2" tabindex="-1"><a class="header-anchor" href="#响应结果-2"><span>响应结果</span></a></h3>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json" data-title="json"><pre v-pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"id"</span><span class="token operator">:</span> <span class="token string">"ft-AF1WoRqd3aJAHsqc9NY7iL8F"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"object"</span><span class="token operator">:</span> <span class="token string">"fine-tune"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"model"</span><span class="token operator">:</span> <span class="token string">"curie"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"created_at"</span><span class="token operator">:</span> <span class="token number">1614807352</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"events"</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">"object"</span><span class="token operator">:</span> <span class="token string">"fine-tune-event"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"created_at"</span><span class="token operator">:</span> <span class="token number">1614807352</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"level"</span><span class="token operator">:</span> <span class="token string">"info"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"message"</span><span class="token operator">:</span> <span class="token string">"Job enqueued. Waiting for jobs ahead to complete. Queue number: 0."</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">"object"</span><span class="token operator">:</span> <span class="token string">"fine-tune-event"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"created_at"</span><span class="token operator">:</span> <span class="token number">1614807356</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"level"</span><span class="token operator">:</span> <span class="token string">"info"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"message"</span><span class="token operator">:</span> <span class="token string">"Job started."</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">"object"</span><span class="token operator">:</span> <span class="token string">"fine-tune-event"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"created_at"</span><span class="token operator">:</span> <span class="token number">1614807861</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"level"</span><span class="token operator">:</span> <span class="token string">"info"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"message"</span><span class="token operator">:</span> <span class="token string">"Uploaded snapshot: curie:ft-acmeco-2021-03-03-21-44-20."</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">"object"</span><span class="token operator">:</span> <span class="token string">"fine-tune-event"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"created_at"</span><span class="token operator">:</span> <span class="token number">1614807864</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"level"</span><span class="token operator">:</span> <span class="token string">"info"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"message"</span><span class="token operator">:</span> <span class="token string">"Uploaded result files: file-QQm6ZpqdNwAaVC3aSz5sWwLT."</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">"object"</span><span class="token operator">:</span> <span class="token string">"fine-tune-event"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"created_at"</span><span class="token operator">:</span> <span class="token number">1614807864</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"level"</span><span class="token operator">:</span> <span class="token string">"info"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"message"</span><span class="token operator">:</span> <span class="token string">"Job succeeded."</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"fine_tuned_model"</span><span class="token operator">:</span> <span class="token string">"curie:ft-acmeco-2021-03-03-21-44-20"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"hyperparams"</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">"batch_size"</span><span class="token operator">:</span> <span class="token number">4</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"learning_rate_multiplier"</span><span class="token operator">:</span> <span class="token number">0.1</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"n_epochs"</span><span class="token operator">:</span> <span class="token number">4</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"prompt_loss_weight"</span><span class="token operator">:</span> <span class="token number">0.1</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"organization_id"</span><span class="token operator">:</span> <span class="token string">"org-..."</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"result_files"</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">"id"</span><span class="token operator">:</span> <span class="token string">"file-QQm6ZpqdNwAaVC3aSz5sWwLT"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"object"</span><span class="token operator">:</span> <span class="token string">"file"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"bytes"</span><span class="token operator">:</span> <span class="token number">81509</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"created_at"</span><span class="token operator">:</span> <span class="token number">1614807863</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"filename"</span><span class="token operator">:</span> <span class="token string">"compiled_results.csv"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"purpose"</span><span class="token operator">:</span> <span class="token string">"fine-tune-results"</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"status"</span><span class="token operator">:</span> <span class="token string">"succeeded"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"validation_files"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"training_files"</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">"id"</span><span class="token operator">:</span> <span class="token string">"file-XGinujblHPwGLSztz8cPS8XY"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"object"</span><span class="token operator">:</span> <span class="token string">"file"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"bytes"</span><span class="token operator">:</span> <span class="token number">1547276</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"created_at"</span><span class="token operator">:</span> <span class="token number">1610062281</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"filename"</span><span class="token operator">:</span> <span class="token string">"my-data-train.jsonl"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"purpose"</span><span class="token operator">:</span> <span class="token string">"fine-tune-train"</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"updated_at"</span><span class="token operator">:</span> <span class="token number">1614807865</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="取消微调" tabindex="-1"><a class="header-anchor" href="#取消微调"><span>取消微调</span></a></h2>
<p><code v-pre>POST</code> <code v-pre>https://api.openai.com/v1/fine-tunes/{fine_tune_id}/cancel</code></p>
<p>立即取消微调作业。</p>
<h3 id="路径参数-1" tabindex="-1"><a class="header-anchor" href="#路径参数-1"><span>路径参数</span></a></h3>
<p><strong>fine_tune_id</strong> <code v-pre>string</code> <code v-pre>必填</code></p>
<p>要取消的微调作业的 ID</p>
<hr>
<h3 id="请求示例-3" tabindex="-1"><a class="header-anchor" href="#请求示例-3"><span>请求示例</span></a></h3>
<CodeGroup>
  <CodeGroupItem title="curl" active>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line"><span class="token function">curl</span> https://api.openai.com/v1/fine-tunes/ft-AF1WoRqd3aJAHsqc9NY7iL8F/cancel <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">-X</span> POST <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">-H</span> <span class="token string">"Authorization: Bearer YOUR_API_KEY"</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
  <CodeGroupItem title="python">
<div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py" data-title="py"><pre v-pre><code><span class="line"><span class="token keyword">import</span> os</span>
<span class="line"><span class="token keyword">import</span> openai</span>
<span class="line">openai<span class="token punctuation">.</span>api_key <span class="token operator">=</span> os<span class="token punctuation">.</span>getenv<span class="token punctuation">(</span><span class="token string">"OPENAI_API_KEY"</span><span class="token punctuation">)</span></span>
<span class="line">openai<span class="token punctuation">.</span>FineTune<span class="token punctuation">.</span>cancel<span class="token punctuation">(</span><span class="token builtin">id</span><span class="token operator">=</span><span class="token string">"ft-AF1WoRqd3aJAHsqc9NY7iL8F"</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
  <CodeGroupItem title="node.js" >
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">const</span> <span class="token punctuation">{</span> Configuration<span class="token punctuation">,</span> OpenAIApi <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"openai"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> configuration <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Configuration</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">apiKey</span><span class="token operator">:</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">OPENAI_API_KEY</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> openai <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">OpenAIApi</span><span class="token punctuation">(</span>configuration<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> response <span class="token operator">=</span> <span class="token keyword">await</span> openai<span class="token punctuation">.</span><span class="token function">cancelFineTune</span><span class="token punctuation">(</span><span class="token string">"ft-AF1WoRqd3aJAHsqc9NY7iL8F"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
</CodeGroup>
<h3 id="响应结果-3" tabindex="-1"><a class="header-anchor" href="#响应结果-3"><span>响应结果</span></a></h3>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json" data-title="json"><pre v-pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"id"</span><span class="token operator">:</span> <span class="token string">"ft-xhrpBbvVUzYGo8oUO1FY4nI7"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"object"</span><span class="token operator">:</span> <span class="token string">"fine-tune"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"model"</span><span class="token operator">:</span> <span class="token string">"curie"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"created_at"</span><span class="token operator">:</span> <span class="token number">1614807770</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"events"</span><span class="token operator">:</span> <span class="token punctuation">[</span> <span class="token punctuation">{</span> ... <span class="token punctuation">}</span> <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"fine_tuned_model"</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"hyperparams"</span><span class="token operator">:</span> <span class="token punctuation">{</span> ... <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"organization_id"</span><span class="token operator">:</span> <span class="token string">"org-..."</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"result_files"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"status"</span><span class="token operator">:</span> <span class="token string">"cancelled"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"validation_files"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"training_files"</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">"id"</span><span class="token operator">:</span> <span class="token string">"file-XGinujblHPwGLSztz8cPS8XY"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"object"</span><span class="token operator">:</span> <span class="token string">"file"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"bytes"</span><span class="token operator">:</span> <span class="token number">1547276</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"created_at"</span><span class="token operator">:</span> <span class="token number">1610062281</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"filename"</span><span class="token operator">:</span> <span class="token string">"my-data-train.jsonl"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"purpose"</span><span class="token operator">:</span> <span class="token string">"fine-tune-train"</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"updated_at"</span><span class="token operator">:</span> <span class="token number">1614807789</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="列出微调事件" tabindex="-1"><a class="header-anchor" href="#列出微调事件"><span>列出微调事件</span></a></h2>
<p><code v-pre>GET</code> <code v-pre>https://api.openai.com/v1/fine-tunes/{fine_tune_id}/events</code></p>
<p>获取微调作业的细粒度状态更新。</p>
<h3 id="路径参数-2" tabindex="-1"><a class="header-anchor" href="#路径参数-2"><span>路径参数</span></a></h3>
<p><strong>fine_tune_id</strong> <code v-pre>string</code> <code v-pre>必填</code></p>
<p>要为其获取事件的微调作业的 ID。</p>
<hr>
<h3 id="查询参数" tabindex="-1"><a class="header-anchor" href="#查询参数"><span>查询参数</span></a></h3>
<p><strong>stream</strong> <code v-pre>boolean</code> <code v-pre>可选</code> <code v-pre>默认 false</code></p>
<p>是否为微调作业流式传输事件。 如果设置为 true，事件将在可用时作为纯数据<a href="https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format" target="_blank" rel="noopener noreferrer">服务器发送事件</a>发送 。<code v-pre>data: [DONE]</code>当作业完成（成功、取消或失败）时，流将终止并显示一条 消息。</p>
<p>如果设置为 false，则只返回到目前为止生成的事件。</p>
<h3 id="请求示例-4" tabindex="-1"><a class="header-anchor" href="#请求示例-4"><span>请求示例</span></a></h3>
<CodeGroup>
  <CodeGroupItem title="curl" active>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line"><span class="token function">curl</span> https://api.openai.com/v1/fine-tunes/ft-AF1WoRqd3aJAHsqc9NY7iL8F/events <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">-H</span> <span class="token string">"Authorization: Bearer YOUR_API_KEY"</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
  <CodeGroupItem title="python">
<div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py" data-title="py"><pre v-pre><code><span class="line"><span class="token keyword">import</span> os</span>
<span class="line"><span class="token keyword">import</span> openai</span>
<span class="line">openai<span class="token punctuation">.</span>api_key <span class="token operator">=</span> os<span class="token punctuation">.</span>getenv<span class="token punctuation">(</span><span class="token string">"OPENAI_API_KEY"</span><span class="token punctuation">)</span></span>
<span class="line">openai<span class="token punctuation">.</span>FineTune<span class="token punctuation">.</span>list_events<span class="token punctuation">(</span><span class="token builtin">id</span><span class="token operator">=</span><span class="token string">"ft-AF1WoRqd3aJAHsqc9NY7iL8F"</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
  <CodeGroupItem title="node.js" >
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">const</span> <span class="token punctuation">{</span> Configuration<span class="token punctuation">,</span> OpenAIApi <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"openai"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> configuration <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Configuration</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">apiKey</span><span class="token operator">:</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">OPENAI_API_KEY</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> openai <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">OpenAIApi</span><span class="token punctuation">(</span>configuration<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> response <span class="token operator">=</span> <span class="token keyword">await</span> openai<span class="token punctuation">.</span><span class="token function">listFineTuneEvents</span><span class="token punctuation">(</span><span class="token string">"ft-AF1WoRqd3aJAHsqc9NY7iL8F"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
</CodeGroup>
<h3 id="响应结果-4" tabindex="-1"><a class="header-anchor" href="#响应结果-4"><span>响应结果</span></a></h3>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json" data-title="json"><pre v-pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"object"</span><span class="token operator">:</span> <span class="token string">"list"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"data"</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">"object"</span><span class="token operator">:</span> <span class="token string">"fine-tune-event"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"created_at"</span><span class="token operator">:</span> <span class="token number">1614807352</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"level"</span><span class="token operator">:</span> <span class="token string">"info"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"message"</span><span class="token operator">:</span> <span class="token string">"Job enqueued. Waiting for jobs ahead to complete. Queue number: 0."</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">"object"</span><span class="token operator">:</span> <span class="token string">"fine-tune-event"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"created_at"</span><span class="token operator">:</span> <span class="token number">1614807356</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"level"</span><span class="token operator">:</span> <span class="token string">"info"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"message"</span><span class="token operator">:</span> <span class="token string">"Job started."</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">"object"</span><span class="token operator">:</span> <span class="token string">"fine-tune-event"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"created_at"</span><span class="token operator">:</span> <span class="token number">1614807861</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"level"</span><span class="token operator">:</span> <span class="token string">"info"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"message"</span><span class="token operator">:</span> <span class="token string">"Uploaded snapshot: curie:ft-acmeco-2021-03-03-21-44-20."</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">"object"</span><span class="token operator">:</span> <span class="token string">"fine-tune-event"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"created_at"</span><span class="token operator">:</span> <span class="token number">1614807864</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"level"</span><span class="token operator">:</span> <span class="token string">"info"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"message"</span><span class="token operator">:</span> <span class="token string">"Uploaded result files: file-QQm6ZpqdNwAaVC3aSz5sWwLT."</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">"object"</span><span class="token operator">:</span> <span class="token string">"fine-tune-event"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"created_at"</span><span class="token operator">:</span> <span class="token number">1614807864</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"level"</span><span class="token operator">:</span> <span class="token string">"info"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"message"</span><span class="token operator">:</span> <span class="token string">"Job succeeded."</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="删除微调模型" tabindex="-1"><a class="header-anchor" href="#删除微调模型"><span>删除微调模型</span></a></h2>
<p><code v-pre>DELETE</code> <code v-pre>https://api.openai.com/v1/models/{model}</code></p>
<p>删除微调模型。您必须在您的组织中拥有所有者角色。</p>
<h3 id="路径参数-3" tabindex="-1"><a class="header-anchor" href="#路径参数-3"><span>路径参数</span></a></h3>
<p><strong>model</strong> <code v-pre>string</code> <code v-pre>必填</code></p>
<p>要删除的模型</p>
<h3 id="请求示例-5" tabindex="-1"><a class="header-anchor" href="#请求示例-5"><span>请求示例</span></a></h3>
<CodeGroup>
  <CodeGroupItem title="curl" active>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line"><span class="token function">curl</span> https://api.openai.com/v1/models/curie:ft-acmeco-2021-03-03-21-44-20 <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">-X</span> DELETE <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">-H</span> <span class="token string">"Authorization: Bearer YOUR_API_KEY"</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
  <CodeGroupItem title="python">
<div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py" data-title="py"><pre v-pre><code><span class="line"><span class="token keyword">import</span> os</span>
<span class="line"><span class="token keyword">import</span> openai</span>
<span class="line">openai<span class="token punctuation">.</span>api_key <span class="token operator">=</span> os<span class="token punctuation">.</span>getenv<span class="token punctuation">(</span><span class="token string">"OPENAI_API_KEY"</span><span class="token punctuation">)</span></span>
<span class="line">openai<span class="token punctuation">.</span>Model<span class="token punctuation">.</span>delete<span class="token punctuation">(</span><span class="token string">"curie:ft-acmeco-2021-03-03-21-44-20"</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
  <CodeGroupItem title="node.js" >
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">const</span> <span class="token punctuation">{</span> Configuration<span class="token punctuation">,</span> OpenAIApi <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"openai"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> configuration <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Configuration</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">apiKey</span><span class="token operator">:</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">OPENAI_API_KEY</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> openai <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">OpenAIApi</span><span class="token punctuation">(</span>configuration<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> response <span class="token operator">=</span> <span class="token keyword">await</span> openai<span class="token punctuation">.</span><span class="token function">deleteModel</span><span class="token punctuation">(</span><span class="token string">'curie:ft-acmeco-2021-03-03-21-44-20'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
</CodeGroup>
<h3 id="响应结果-5" tabindex="-1"><a class="header-anchor" href="#响应结果-5"><span>响应结果</span></a></h3>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json" data-title="json"><pre v-pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"id"</span><span class="token operator">:</span> <span class="token string">"curie:ft-acmeco-2021-03-03-21-44-20"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"object"</span><span class="token operator">:</span> <span class="token string">"model"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"deleted"</span><span class="token operator">:</span> <span class="token boolean">true</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


