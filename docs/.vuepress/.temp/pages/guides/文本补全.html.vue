<template><div><h1 id="文本补全" tabindex="-1"><a class="header-anchor" href="#文本补全"><span><a href="https://platform.openai.com/docs/guides/completion/text-completion" target="_blank" rel="noopener noreferrer">文本补全</a></span></a></h1>
<p>了解如何生成或操作文本</p>
<h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍"><span>介绍</span></a></h2>
<p><a href="/api/%E8%A1%A5%E5%85%A8">补全</a>端点可用于各种任务。它为我们的任何<a href="/start/%E6%A8%A1%E5%9E%8B">模型</a>提供了一个简单但功能强大的界面。您输入一些文本作为提示，模型将生成一个文本补全，尝试匹配您提供的任何上下文或模式。比如给API提示“正如笛卡尔所说，我认为，因此”，它会大概率返回补全“我是”。</p>
<p>开始探索补全的最佳方式是通过我们的 Playground。它只是一个文本框，您可以在其中提交提示以生成完成。要自己尝试，请<a href="https://platform.openai.com/playground/p/8P6JA6XEx74NTvcRUngWKEYW" target="_blank" rel="noopener noreferrer">在 Playground 中打开此示例</a>：</p>
<DescBlock>
为冰淇淋店写一个标语。
</DescBlock>
<p>提交后，您会看到如下内容：</p>
<DescBlock>
为冰淇淋店写一个标语。 每一勺我们都会微笑！
</DescBlock>
<DescBlock color="#d2f4d3">
每一勺我们都会微笑！
</DescBlock>
<p>您看到的实际完成情况可能有所不同，因为默认情况下 API 是不确定的。这意味着即使您的提示保持不变，您每次调用它时可能会得到略微不同的完成。将<a href="https://platform.openai.com/docs/api-reference/completions/create#completions/create-temperature" target="_blank" rel="noopener noreferrer">温度</a>设置为 0 将使输出大部分具有确定性，但可能会保留少量可变性。</p>
<p>这个简单的文本输入、文本输出界面意味着您可以通过提供说明或您希望它做什么的几个示例来“编程”模型。它的成功通常取决于任务的复杂性和提示的质量。一个好的经验法则是考虑如何为中学生写一个应用题来解决。一个写得很好的提示提供了足够的信息让模型知道你想要什么以及它应该如何响应。</p>
<p>本指南涵盖了一般的提示设计最佳实践和示例。要了解有关使用我们的 Codex 模型处理代码的更多信息，请访问我们的<a href="/guides/%E4%BB%A3%E7%A0%81%E8%A1%A5%E5%85%A8">代码指南</a>。</p>
<div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p>请记住，默认模型的训练数据将在 2021 年中断，因此它们可能不了解时事。我们计划在未来增加更多的持续培训。</p>
</div>
<h2 id="提示设计" tabindex="-1"><a class="header-anchor" href="#提示设计"><span>提示设计</span></a></h2>
<h3 id="基本" tabindex="-1"><a class="header-anchor" href="#基本"><span>基本</span></a></h3>
<p>我们的模型可以做任何事情，从生成原创故事到执行复杂的文本分析。因为他们可以做很多事情，所以你必须明确描述你想要什么。展示，而不仅仅是讲述，通常是获得良好提示的秘诀。</p>
<p>创建提示的三个基本准则：</p>
<p><strong>展示和讲述</strong>。通过说明、示例或两者的结合，明确您想要什么。如果您希望模型按字母顺序对项目列表进行排名或按情绪对段落进行分类，请向它展示您想要的。</p>
<p><strong>提供质量数据</strong>。如果您正在尝试构建分类器或让模型遵循某种模式，请确保有足够的示例。一定要校对你的例子——模型通常足够聪明，可以看穿基本的拼写错误并给你一个回应，但它也可能认为这是故意的，它会影响回应。</p>
<p><strong>检查您的设置</strong>。<code v-pre>temperature</code> 和 <code v-pre>top_p</code> 设置控制模型在生成响应时的确定性。如果您要求它提供只有一个正确答案的答复，那么您需要将这些设置得较低。如果您正在寻找更多样化的响应，那么您可能希望将它们设置得更高。人们在使用这些设置时犯的第一个错误是假设它们是“聪明”或“创造力”控制。</p>
<h3 id="故障排除" tabindex="-1"><a class="header-anchor" href="#故障排除"><span>故障排除</span></a></h3>
<p>如果您在使 API 按预期执行时遇到问题，请遵循此清单：</p>
<ol>
<li>是否清楚预期的产生应该是什么？</li>
<li>有足够的例子吗？</li>
<li>你检查过你的例子是否有错误吗？（API 不会直接告诉你）</li>
<li>您是否正确使用 temperature 和 top_p？</li>
</ol>
<h3 id="分类" tabindex="-1"><a class="header-anchor" href="#分类"><span>分类</span></a></h3>
<p>为了使用 API 创建文本分类器，我们提供了任务描述和一些示例。在此示例中，我们展示了如何对推文的情绪进行分类。</p>
<DescBlock>
<p>确定推文的情绪是积极的、中性的还是消极的。<br></p>
<p>推文：我喜欢新的蝙蝠侠电影!</p>
<p>情绪:</p>
</DescBlock>
<p>值得关注此示例中的几个功能：</p>
<ol>
<li><strong>使用通俗易懂的语言来描述您的输入和输出</strong>。我们对输入“推文”和预期输出“情绪”使用通俗易懂的语言。作为最佳实践，从简单的语言描述开始。虽然您通常可以使用速记或键来指示输入和输出，但最好从尽可能具有描述性开始，然后向后工作以删除多余的单词并查看性能是否保持一致。</li>
<li><strong>显示 API 如何响应任何情况</strong>。在此示例中，我们在指令中包含了可能的情绪标签。中性标签很重要，因为在很多情况下，即使是人类也很难确定某事是积极的还是消极的，以及两者都不是的情况。</li>
<li><strong>对于熟悉的任务，您需要更少的示例</strong>。对于这个分类器，我们不提供任何示例。这是因为 API 已经理解了情绪和推文的概念。如果您正在为 API 可能不熟悉的内容构建分类器，则可能需要提供更多示例。</li>
</ol>
<h4 id="提高分类器的效率" tabindex="-1"><a class="header-anchor" href="#提高分类器的效率"><span>提高分类器的效率</span></a></h4>
<p>现在我们已经掌握了如何构建分类器，让我们以该示例为例并使其更加高效，以便我们可以使用它从一次 API 调用中获取多个结果。</p>
<DescBlock>
<p>将这些推文中的情绪分类：</p>
<p>1.“我受不了家庭作业”</p>
<p>2.“这糟透了。我很无聊😠”</p>
<p>3.“我等不及万圣节了！！！”</p>
<p>4.“我的猫很可爱❤️❤️”</p>
<p>5.“我讨厌巧克力”</p>
<p>推文情绪评分：&quot;</p>
</DescBlock>
<!-- <img src="@source/guides/img/image-20230209164344618.png" alt="image-20230209164344618" style="zoom: 50%;" /> -->
<p><a href="https://platform.openai.com/playground/p/default-adv-tweet-classifier" target="_blank" rel="noopener noreferrer">在playground上打开</a></p>
<p>我们提供了一个带编号的推文列表，这样 API 就可以在一次 API 调用中对五个（甚至更多）推文进行评分。</p>
<p>请务必注意，当您要求 API 创建列表或评估文本时，您需要格外注意您的概率设置（Top P 或 Temperature）以避免漂移。</p>
<ol>
<li>通过运行多个测试确保您的概率设置得到正确校准。</li>
<li>不要让您的列表太长，否则 API 可能会发生变化。</li>
</ol>
<h3 id="产生" tabindex="-1"><a class="header-anchor" href="#产生"><span>产生</span></a></h3>
<p>您可以使用 API 完成的最强大但最简单的任务之一是产生新的想法或输入版本。您可以询问任何内容，从故事创意到商业计划，再到人物描述和营销口号。在此示例中，我们将使用 API 来创建在健身中使用虚拟现实的想法。</p>
<DescBlock>集思广益结合 VR 和健身的一些想法："</DescBlock><p><a href="https://platform.openai.com/playground/p/default-vr-fitness" target="_blank" rel="noopener noreferrer">在playground上打开</a></p>
<p>如果需要，您可以通过在提示中包含一些示例来提高响应质量。</p>
<h3 id="对话" tabindex="-1"><a class="header-anchor" href="#对话"><span>对话</span></a></h3>
<p>API 非常擅长与人甚至与自己进行对话。只需几行指令，我们就已经看到该 API 作为一个客户服务聊天机器人运行，它可以智能地回答问题而不会感到慌张，或者是一个聪明的开玩笑的对话伙伴，可以开玩笑和双关语。关键是告诉 API 它应该如何表现，然后提供一些示例。</p>
<p>以下是扮演 AI 回答问题角色的 API 示例：</p>
<DescBlock>
<p>以下是与AI助手的对话。助理乐于助人、富有创意、聪明而且非常友好。</p>
<p>人类：你好，你是谁？</p>
<p>AI：我是 OpenAI 创建的 AI。今天我能帮到你什么？</p>
<p>人类：&quot;</p>
</DescBlock>
<p><a href="https://platform.openai.com/playground/p/default-chat" target="_blank" rel="noopener noreferrer">在playground上打开</a></p>
<p>这就是创建能够进行对话的聊天机器人所需的全部。在其简单性的背后，有几件事情值得关注：</p>
<ol>
<li>
<p><strong>我们告诉 API 意图，但我们也告诉它如何表现。</strong>。就像其他提示一样，我们将 API 提示到示例所代表的内容中，但我们还添加了另一个关键细节：我们明确说明如何与短语“助手很有帮助、有创意、聪明且非常友好”进行交互。 “</p>
<p>如果没有该指令，API 可能会偏离并模仿与之交互的人，并变得讽刺或我们想要避免的其他行为。</p>
</li>
<li>
<p><strong>我们给 API 一个身份</strong>。一开始我们让 API 作为 AI 助手响应。虽然 API 没有内在身份，但这有助于它以尽可能接近事实的方式做出响应。您可以通过其他方式使用身份来创建其他类型的聊天机器人。如果您告诉 API 以一名作为生物学研究科学家的女性的身份做出回应，您将从 API 中获得智能和深思熟虑的评论，类似于您对具有该背景的人的期望。</p>
</li>
</ol>
<p>在这个例子中，我们创建了一个聊天机器人，它有点讽刺并且不情愿地回答问题：</p>
<DescBlock>
<p>Marv 是一个聊天机器人，它不情愿地用讽刺的方式回答问题：</p>
<p>你：一公斤是多少磅？</p>
<p>马尔夫：又是这个？一公斤有 2.2 磅。请记下这一点。</p>
<p>你：HTML 代表什么？</p>
<p>Marv：Google 是不是太忙了？超文本标记语言。 T是为了在未来尝试提出更好的问题。</p>
<p>你：第一架飞机是什么时候飞的？</p>
<p>Marv：1903 年 12 月 17 日，Wilbur 和 Orville Wright 进行了首飞。我希望他们能来把我带走。</p>
<p>你：生命的意义是什么？</p>
<p>马尔夫：我不确定。我会问我的朋友谷歌。</p>
<p>你：天空为什么是蓝色的？</p>
</DescBlock>
<p><a href="https://platform.openai.com/playground/p/default-marv-sarcastic-chat" target="_blank" rel="noopener noreferrer">在playground上打开</a></p>
<p>为了创建一个有趣且有点帮助的聊天机器人，我们提供了一些问题和答案示例，展示了 API 如何回复。所需要的只是一些讽刺的回应，API 能够识别模式并提供无穷无尽的讽刺回应。</p>
<h3 id="转换" tabindex="-1"><a class="header-anchor" href="#转换"><span>转换</span></a></h3>
<p>API 是一种语言模型，熟悉单词和字符用于表达信息的各种方式。这范围从自然语言文本到代码和英语以外的语言。API 还能够在允许它以不同方式总结、转换和表达内容的级别上理解内容。</p>
<h4 id="翻译" tabindex="-1"><a class="header-anchor" href="#翻译"><span>翻译</span></a></h4>
<p>在此示例中，我们向 API 展示了如何将英语转换为法语、西班牙语和日语：</p>
<DescBlock>
<p>将其翻译成法语、西班牙语和日语：</p>
<p>您有哪些房间可用</p>
</DescBlock>
[在playground上打开](https://platform.openai.com/playground/p/default-translate)
<p>此示例之所以有效，是因为 API 已经掌握了这些语言，因此无需尝试教授它们。</p>
<p>如果您想将英语翻译成 API 不熟悉的语言，则需要为其提供更多示例，甚至需要<a href="/guides/%E5%BE%AE%E8%B0%83">微调模型</a>以使其流畅地完成。</p>
<h4 id="转换-1" tabindex="-1"><a class="header-anchor" href="#转换-1"><span>转换</span></a></h4>
<p>在此示例中，我们将电影名称转换为表情符号。这显示了 API 对选取模式和处理其他字符的适应性。</p>
<DescBlock>
<p>将电影片名转换为表情符号</p>
<p>回到未来：👨👴🚗🕒
蝙蝠侠：🤵🦇
变形金刚：🚗🤖
星球大战：</p>
</DescBlock>
<p><a href="https://platform.openai.com/playground/p/default-movie-to-emoji" target="_blank" rel="noopener noreferrer">在playground上打开</a></p>
<h4 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h4>
<p>API 能够掌握文本的上下文并以不同的方式重新措辞。在这个例子中，我们创建了一个孩子可以从更长、更复杂的文本段落中理解的解释。这说明API对语言的把握很深。</p>
<DescBlock>
<p>给一个二年级的学生总结一下：</p>
<p>木星是距离太阳第五远的行星，也是太阳系中最大的行星。它是一颗气体巨行星，质量是太阳的千分之一，但却是太阳系中所有其他行星总和的两倍半。木星是夜空中肉眼可见的最亮天体之一，早在有记载的历史之前就已为古代文明所知。它以罗马神木星命名。 [19] 从地球上看，木星的亮度足以使其反射光投下可见的阴影，[20] 平均而言，木星是继月球和金星之后夜空中第三亮的自然物体。&quot;/&gt;</p>
</DescBlock>
[在 playground 上打开](https://platform.openai.com/playground/p/default-summarize)
<h3 id="补全" tabindex="-1"><a class="header-anchor" href="#补全"><span>补全</span></a></h3>
<p>虽然所有提示都会导致完成，但在您希望 API 从您中断的地方继续执行的情况下，将文本完成视为它自己的任务会很有帮助。例如，如果给出此提示，API 将继续垂直农业的思路。您可以降低<a href="https://platform.openai.com/docs/api-reference/completions/create#completions/create-temperature" target="_blank" rel="noopener noreferrer">温度</a>设置以使 API 更专注于提示的意图，或者提高温度设置以使其偏离正切。</p>
<DescBlock>
<p>垂直农业为本地生产食品、降低运输成本和</p>
</DescBlock>
<p><a href="https://platform.openai.com/playground/p/XCHYTQToJ31wbcxJykv2as8u" target="_blank" rel="noopener noreferrer">在playground上打开</a></p>
<p>下一个提示显示了如何使用补全来帮助编写 React 组件。我们向 API 发送一些代码，它能够继续剩下的，因为它了解 React 库。我们建议将我们的<RouteLink to="/start/%E6%A8%A1%E5%9E%8B.html#codex">Codex 模型</RouteLink>用于涉及理解或生成代码的任务。要了解更多信息，请访问我们的<a href="/guides/%E4%BB%A3%E7%A0%81%E8%A1%A5%E5%85%A8">代码指南</a>。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">'react'</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> <span class="token function-variable function">HeaderComponent</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p><a href="https://platform.openai.com/playground/p/12d6OQCSrFppNeMHOQjtyk8T" target="_blank" rel="noopener noreferrer">在 playground 上打开</a></p>
<p><strong>事实回应</strong></p>
<p>API 有很多知识，这些知识是从它接受训练的数据中学到的。它还能够提供听起来非常真实但实际上是虚构的响应。有两种方法可以限制 API 编造答案的可能性。</p>
<ol>
<li><strong>为 API 提供基本事实</strong>。如果您向 API 提供文本正文来回答有关问题（如维基百科条目），那么它就不太可能伪造响应。</li>
<li><strong>使用低概率并向 API 展示如何说“我不知道”</strong>。如果 API 理解在不太确定回答“我不知道”或某些变体是否合适的情况下，它就不太愿意编造答案。</li>
</ol>
<p>在此示例中，我们为 API 提供它知道的问题和答案示例，然后提供它不知道的示例并提供问号。我们还将概率设置为零，这样 API 更有可能以“？”响应。如果有任何疑问。</p>
<DescBlock>
<p>问：蝙蝠侠是谁？</p>
<p>答：蝙蝠侠是一个虚构的漫画人物。</p>
<p>问：什么是躯干复杂性？</p>
<p>答： ？</p>
<p>问：Devz9 是什么？</p>
<p>答： ？</p>
<p>问：乔治·卢卡斯是谁？</p>
<p>答：乔治卢卡斯是美国电影导演和制片人，以创作星球大战而闻名。</p>
<p>问：加州的首府是哪里？</p>
<p>答：萨克拉门托。</p>
<p>问：什么绕地球运行？</p>
<p>答：月亮。</p>
<p>问：弗雷德·里克森是谁？</p>
<p>答： ？</p>
<p>问：什么是原子？</p>
<p>答：原子是构成一切的微小粒子。</p>
<p>问：Alvan Muntz 是谁？</p>
<p>答： ？</p>
<p>问：什么是 Kozar-09？</p>
<p>答： ？</p>
<p>问：火星有多少颗卫星？</p>
<p>答：两个，火卫一和火卫二。</p>
<p>问：&quot;</p>
</DescBlock>
<p><a href="https://platform.openai.com/playground/p/HMoho4552EHXrPLbmOIxpX4X" target="_blank" rel="noopener noreferrer">在 playground 上打开</a></p>
<h2 id="插入文字" tabindex="-1"><a class="header-anchor" href="#插入文字"><span>插入文字 <Badge text="beta" /></span></a></h2>
<p>补全端点还支持通过提供除<RouteLink to="/api/%E8%A1%A5%E5%85%A8.html#%E5%89%8D%E7%BC%80">前缀提示</RouteLink>之外的<RouteLink to="/api/%E8%A1%A5%E5%85%A8.html#%E5%90%8E%E7%BC%80">后缀提示</RouteLink>来在文本中插入文本。在编写长文本、段落之间的过渡、遵循大纲或引导模型走向结尾时，这种需求自然会出现。这也适用于代码，可用于插入函数或文件的中间。请访问我们的<a href="https://platform.openai.com/docs/guides/code/inserting-text" target="_blank" rel="noopener noreferrer">代码指南</a>以了解更多信息。</p>
<p>为了说明后缀上下文对我们的预测能力有多么重要，请考虑提示“今天我决定做出重大改变”。有很多方法可以想象完成句子。但是如果我们现在提供故事的结尾：“我的新头发得到了很多赞美！”，预期的完成就变得很清楚了。</p>
<DescBlock>
<p>我在波士顿大学上了大学。获得学位后，我决定做出改变</p>
<p>大变样！我收拾行囊搬到了美国西海岸</p>
<p>现在，我怎么也看不够太平洋！</p>
</DescBlock>
<p>通过为模型提供额外的上下文，它可以更加可控。然而，这对模型来说是一个更具约束性和挑战性的任务。</p>
<h3 id="最佳实践" tabindex="-1"><a class="header-anchor" href="#最佳实践"><span>最佳实践</span></a></h3>
<p>插入文本是 Beta 版的一项新功能，您可能需要修改 API 的使用方式以获得更好的结果。以下是一些最佳实践：</p>
<p><strong>使用 max_tokens &gt; 256</strong>。该模型更擅长插入更长的补全。如果 max_tokens 太小，模型可能会在连接到后缀之前被切断。请注意，即使使用更大的 max_tokens，您也只会根据生成的标记数量付费。</p>
<p><strong>更喜欢 finish_reason == “stop”</strong>。当模型到达自然停止点或用户提供的停止序列时，它会将 finish_reason 设置为“停止”。这表明该模型已设法很好地连接到后缀，并且是完成质量的良好信号。这对于在使用 n &gt; 1 或重采样时在几个完成之间进行选择尤其相关（请参阅下一点）。</p>
<p><strong>重新采样 3-5 次</strong>。虽然几乎所有补全都连接到前缀，但在更困难的情况下，模型可能难以连接后缀。我们发现，在这种情况下，重采样 3 或 5 次（或使用 best_of 和 k=3,5）并选择带有“stop”作为其 finish_reason 的样本可能是一种有效的方法。重采样时，您通常需要更高的温度来增加多样性。</p>
<p>注意：如果所有返回的样本都有 finish_reason == &quot;length&quot;，很可能是 max_tokens 太小，模型在设法自然地连接提示和后缀之前用完了标记。考虑在重采样之前增加 max_tokens。</p>
<p><strong>尝试提供更多线索</strong>。在某些情况下，为了更好地帮助模型的生成，您可以通过提供一些模式示例来提供线索，模型可以遵循这些模式来决定自然停止的位置。</p>
<DescBlock>
<p>如何制作美味的热巧克力：</p>
<ol>
<li>将水烧开</li>
<li>将热巧克力放入杯中</li>
<li>向杯中加入开水</li>
<li>享用热巧克力</li>
</ol>
</DescBlock>
<DescBlock>
<ol>
<li>狗是忠诚的动物。</li>
<li>狮子是凶猛的动物。</li>
<li>海豚是顽皮的动物。</li>
<li>马是高贵的动物。</li>
</ol>
</DescBlock>
<h2 id="编辑文本" tabindex="-1"><a class="header-anchor" href="#编辑文本"><span>编辑文本 <Badge text="Alpha" /></span></a></h2>
<p><a href="/api/%E7%BC%96%E8%BE%91">编辑</a>端点可用于编辑文本，而不仅仅是完成文本。您提供一些文本和如何修改它的说明，<code v-pre>text-davinci-edit-001</code>模型将尝试相应地对其进行编辑。这是用于翻译、编辑和调整文本的自然界面。这对于重构和使用代码也很有用。请访问我们的<a href="/guides/%E4%BB%A3%E7%A0%81%E8%A1%A5%E5%85%A8">代码指南</a>以了解更多信息。在此初始测试期间，编辑端点的使用是免费的。</p>
<p><strong>输入</strong></p>
<DescBlock>
<p>GPT-3 是一个非常好的 AI 它非常擅长写回复 当它被问到一个问题时 它会给出它的建议 这是一首它写的押韵的诗</p>
</DescBlock>
<p><strong>指示</strong></p>
<DescBlock>
<p>用 GPT-3 的声音做这个</p>
</DescBlock>
<p><strong>输出</strong></p>
<DescBlock>
<p>我是一个非常好的AI</p>
<p>我很擅长写回复</p>
<p>当有人问我问题时</p>
<p>我给出我的建议</p>
<p>这是我写的一首押韵的诗</p>
</DescBlock>
</div></template>


