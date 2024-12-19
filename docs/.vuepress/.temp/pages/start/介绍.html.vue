<template><div><h1 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍"><span><a href="https://platform.openai.com/docs/introduction" target="_blank" rel="noopener noreferrer">介绍</a></span></a></h1>
<h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述"><span>概述</span></a></h2>
<p>OpenAI API 几乎可以应用于任何涉及理解或生成自然语言或代码的任务。我们提供一系列具有不同功率级别的<a href="./%E6%A8%A1%E5%9E%8B">模型</a>，适用于不同的任务，并且能够<a href="../guides/%E5%BE%AE%E8%B0%83">微调</a>您自己的自定义模型。这些模型可用于从内容生成到语义搜索和分类的所有领域。</p>
<h2 id="关键概念" tabindex="-1"><a class="header-anchor" href="#关键概念"><span>关键概念</span></a></h2>
<p>我们建议您完成我们的快速入门教程，以通过实际操作的交互式示例熟悉关键概念。</p>
<h3 id="快速入门教程" tabindex="-1"><a class="header-anchor" href="#快速入门教程"><span>快速入门教程</span></a></h3>
<p>通过构建快速示例应用程序进行学习</p>
<h3 id="提示和补全" tabindex="-1"><a class="header-anchor" href="#提示和补全"><span>提示和补全</span></a></h3>
<p>补全端点位于我们 API 的中心。它为我们的模型提供了一个简单的界面，非常灵活和强大。您输入一些文本作为<strong>提示</strong>，模型将生成一个文本<strong>补全</strong>，尝试匹配您提供的任何上下文或模式。例如，如果您给 API 提示“为一家冰淇淋店写一个标语”，它会返回一个完成，例如“我们为每一勺提供微笑！”</p>
<p><RouteLink to="/guides/%E6%96%87%E6%9C%AC%E8%A1%A5%E5%85%A8.html#%E6%8F%90%E7%A4%BA%E8%AE%BE%E8%AE%A1">设计提示</RouteLink>本质上是您“编程”模型的方式，通常是通过提供一些说明或一些示例。这不同于为单一任务设计的大多数其他 NLP 服务，例如情感分类或命名实体识别。相反，完成端点可用于几乎任何任务，包括内容或代码生成、摘要、扩展、对话、创意写作、风格转换等。</p>
<h3 id="标记" tabindex="-1"><a class="header-anchor" href="#标记"><span>标记</span></a></h3>
<p>我们的模型通过将文本分解为标记来理解和处理文本。标记可以是单词或只是字符块。例如，单词“hamburger”被分解为标记“ham”、“bur”和“ger”，而像“pear”这样的短而常见的单词是一个标记。许多标记以空格开头，例如“hello”和“bye”。</p>
<p>在给定的 API 请求中处理的令牌数量取决于输入和输出的长度。根据粗略的经验法则，对于英文文本，1 个标记大约为 4 个字符或 0.75 个单词。要记住的一个限制是，您的文本提示和生成的完成组合不能超过模型的最大上下文长度（对于大多数模型，这是 2048 个标记，或大约 1500 个单词）。查看我们的分<a href="https://platform.openai.com/tokenizer" target="_blank" rel="noopener noreferrer">词器工具</a>，了解有关文本如何转换为分词的更多信息。</p>
<h3 id="模型" tabindex="-1"><a class="header-anchor" href="#模型"><span>模型</span></a></h3>
<p>API 由一组具有不同功能和价位的模型提供支持。我们的基础 GPT-3 模型称为 Davinci、Curie、Babbage 和 Ada。我们的 Codex 系列是 GPT-3 的后代，已接受自然语言和代码方面的培训。要了解更多信息，请访问我们的<a href="./%E6%A8%A1%E5%9E%8B">模型文档</a>。</p>
<h2 id="下一步" tabindex="-1"><a class="header-anchor" href="#下一步"><span>下一步</span></a></h2>
<ul>
<li>在开始构建应用程序时，请牢记我们的<a href="./%E4%BD%BF%E7%94%A8%E6%94%BF%E7%AD%96">使用政策</a>。</li>
<li>浏览我们的<a href="https://platform.openai.com/examples" target="_blank" rel="noopener noreferrer">示例库</a>以获取灵感。</li>
<li>跳转到我们的指南之一开始构建。</li>
</ul>
<h3 id="指南" tabindex="-1"><a class="header-anchor" href="#指南"><span>指南</span></a></h3>
<div class="hint-container tip">
<p class="hint-container-title">文本补全</p>
<p>📝
<RouteLink to="/guides/%E6%96%87%E6%9C%AC%E8%A1%A5%E5%85%A8.html#%E4%BB%8B%E7%BB%8D">了解如何使用我们的模型生成或编辑文本</RouteLink></p>
</div>
<div class="hint-container tip">
<p class="hint-container-title">代码补全 <Badge text="Limited beta" type="warning"/></p>
<p>📑
<RouteLink to="/guides/%E4%BB%A3%E7%A0%81%E8%A1%A5%E5%85%A8.html#%E4%BB%8B%E7%BB%8D">有限公测了解如何生成、编辑或解释代码</RouteLink></p>
</div>
<div class="hint-container tip">
<p class="hint-container-title">图像生成 <Badge text="Beta" type="warning"/></p>
<p>🎨
<RouteLink to="/guides/%E5%9B%BE%E5%83%8F%E7%94%9F%E6%88%90.html#%E4%BB%8B%E7%BB%8D">了解如何生成或编辑图像</RouteLink></p>
</div>
<div class="hint-container tip">
<p class="hint-container-title">微调</p>
<p>📊
<RouteLink to="/guides/%E5%BE%AE%E8%B0%83.html#%E4%BB%8B%E7%BB%8D">了解如何为您的用例训练模型</RouteLink></p>
</div>
<div class="hint-container tip">
<p class="hint-container-title">嵌入</p>
<p>🌁
<RouteLink to="/guides/%E5%B5%8C%E5%85%A5.html#%E4%BB%8B%E7%BB%8D">了解如何搜素，分类和比较文本</RouteLink></p>
</div>
</div></template>


