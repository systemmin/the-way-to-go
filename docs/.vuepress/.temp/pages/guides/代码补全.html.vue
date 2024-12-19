<template><div><h1 id="代码补全" tabindex="-1"><a class="header-anchor" href="#代码补全"><span><a href="https://platform.openai.com/docs/guides/code/code-completion-limited-beta" target="_blank" rel="noopener noreferrer">代码补全</a>  <Badge text="Limited beta"/></span></a></h1>
<p>了解如何生成或操作代码</p>
<h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍"><span>介绍</span></a></h2>
<p><RouteLink to="/start/%E6%A8%A1%E5%9E%8B.html#codex">Codex 模型系列</RouteLink>是我们的 GPT-3 系列的后代，该系列已经过自然语言和数十亿行代码的训练。它最擅长 Python，精通 JavaScript、Go、Perl、PHP、Ruby、Swift、TypeScript、SQL，甚至 Shell 等十几种语言。在最初的有限测试期间，Codex 使用是免费的。<a href="https://platform.openai.com/docs/models/codex" target="_blank" rel="noopener noreferrer">了解更多</a>。</p>
<p>您可以将 Codex 用于各种任务，包括：</p>
<ul>
<li>将注释变成代码</li>
<li>在上下文中完成你的下一行或函数</li>
<li>为您带来知识，例如为应用程序查找有用的库或 API 调用</li>
<li>添加评论</li>
<li>重写代码以提高效率</li>
</ul>
<p>要查看 Codex 的运行情况，请查看我们的 <a href="https://platform.openai.com/codex-javascript-sandbox" target="_blank" rel="noopener noreferrer">Codex JavaScript 沙箱</a> 或我们的其他<a href="https://www.youtube.com/playlist?list=PLOXw6I10VTv_FhQbbvYh1FvbiaPf43Ve2" target="_blank" rel="noopener noreferrer">演示视频</a>。</p>
<img src="https://platform.openai.com/sandbox-screenshot.png">
<h2 id="快速开始" tabindex="-1"><a class="header-anchor" href="#快速开始"><span>快速开始</span></a></h2>
<p>下面是一些可以在 Playground 中测试的使用 Codex 的示例。</p>
<p><strong>说“你好”（Python）</strong></p>
<div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py" data-title="py"><pre v-pre><code><span class="line"><span class="token triple-quoted-string string">"""</span>
<span class="line"></span>
<span class="line">询问用户的姓名并说“你好”</span>
<span class="line">"""</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>创建随机名称 (Python)</strong></p>
<div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py" data-title="py"><pre v-pre><code><span class="line"><span class="token triple-quoted-string string">"""</span>
<span class="line">1. 创建名字列表</span>
<span class="line">2. 创建姓氏列表</span>
<span class="line">3. 随机组合成100个全名的列表</span>
<span class="line">"""</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>创建 MySQL 查询 (Python)</strong></p>
<div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py" data-title="py"><pre v-pre><code><span class="line"><span class="token triple-quoted-string string">"""</span>
<span class="line">Table customers，columns = [CustomerId, FirstName, LastName, Company, Address, City, State, Country, PostalCode, Phone, Fax, Email, SupportRepId]</span>
<span class="line">为德克萨斯州所有名为 Jane 的客户创建一个 MySQL 查询</span>
<span class="line">"""</span></span>
<span class="line">query <span class="token operator">=</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>解释代码 (JavaScript)</strong></p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token comment">// 函数 1</span></span>
<span class="line"><span class="token keyword">var</span> fullNames <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">50</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  fullNames<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>names<span class="token punctuation">[</span>Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> names<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">]</span></span>
<span class="line">    <span class="token operator">+</span> <span class="token string">" "</span> <span class="token operator">+</span> lastNames<span class="token punctuation">[</span>Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> lastNames<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 函数 1 是做什么的？</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong><a href="https://platform.openai.com/docs/guides/code/more-examples" target="_blank" rel="noopener noreferrer">更多例子</a></strong></p>
<p>访问我们的<a href="https://platform.openai.com/examples?category=code" target="_blank" rel="noopener noreferrer">示例库</a>，探索更多为 Codex 设计的提示。</p>
<h2 id="最佳实践" tabindex="-1"><a class="header-anchor" href="#最佳实践"><span>最佳实践</span></a></h2>
<p><strong>从注释、数据或代码开始</strong>。您可以在我们的 playground 中尝试使用其中一种 Codex 模型（需要时将样式说明作为注释。）</p>
<p>为了让 Codex 创建有用的完成，考虑程序员执行任务需要哪些信息会很有帮助。这可能只是一个清晰的注释或编写有用函数所需的数据，例如变量名称或函数处理的类。</p>
<div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py" data-title="py"><pre v-pre><code><span class="line"><span class="token comment"># 创建一个名为“nameImporter”的函数来将名字和姓氏添加到数据库中</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>在此示例中，我们告诉 Codex 调用该函数的内容以及它将执行的任务。</p>
<p>这种方法甚至可以扩展到您可以向 Codex 提供注释和数据库模式示例，以使其为各种数据库编写有用的查询请求。</p>
<div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py" data-title="py"><pre v-pre><code><span class="line"><span class="token comment"># Table albums, columns = [AlbumId, Title, ArtistId]</span></span>
<span class="line"><span class="token comment"># Table artists, columns = [ArtistId, Name]</span></span>
<span class="line"><span class="token comment"># Table media_types, columns = [MediaTypeId, Name]</span></span>
<span class="line"><span class="token comment"># Table playlists, columns = [PlaylistId, Name]</span></span>
<span class="line"><span class="token comment"># Table playlist_track, columns = [PlaylistId, TrackId]</span></span>
<span class="line"><span class="token comment"># Table tracks, columns = [TrackId, Name, AlbumId, MediaTypeId, GenreId, Composer, Milliseconds, Bytes, UnitPrice]</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 为 Adele 的所有专辑创建一个查询</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当您向 Codex 显示数据库架构时，它能够对如何格式化查询做出有根据的猜测。</p>
<p><strong>指定语言</strong>。 Codex 了解数十种不同的编程语言。许多人对注释、函数和其他编程语法有相似的约定。通过在注释中指定语言和版本，Codex 能够更好地完成您想要的内容。也就是说，Codex 在风格和语法方面相当灵活。</p>
<div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py" data-title="py"><pre v-pre><code><span class="line"><span class="token comment"># R language</span></span>
<span class="line"><span class="token comment"># 计算点数组之间的平均距离</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py" data-title="py"><pre v-pre><code><span class="line"><span class="token comment"># Python 3</span></span>
<span class="line"><span class="token comment"># 计算点数组之间的平均距离</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>提示 Codex 你想要它做什么。如果您希望 Codex 创建网页，请在您的评论告诉 Codex 下一步应该做什么之后将第一行代码放在 HTML 文档 (<code v-pre>&lt;!DOCTYPE html&gt;</code>) 中。相同的方法适用于从注释创建函数（在注释之后以 <code v-pre>func</code> 或 <code v-pre>def</code> 开头的新行）。</p>
<div class="language-html line-numbers-mode" data-highlighter="prismjs" data-ext="html" data-title="html"><pre v-pre><code><span class="line"><span class="token comment">&lt;!-- 创建一个标题为“Kat Katman attorney at paw”的网页' --></span></span>
<span class="line"><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p><a href="https://platform.openai.com/playground?model=code-davinci-002&amp;prompt=" target="_blank" rel="noopener noreferrer">在 Playground 上打开</a></p>
<p>在我们的评论之后放置 <code v-pre>&lt;!DOCTYPE html&gt;</code> 可以让 Codex 清楚地知道我们想要它做什么。</p>
<div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py" data-title="py"><pre v-pre><code><span class="line"><span class="token comment"># 创建一个数到 100 的函数</span></span>
<span class="line"><span class="token keyword">def</span> counter</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p><a href="https://platform.openai.com/playground?model=code-davinci-002&amp;prompt=%23%20Create%20a%20function%20to%20count%20to%20100%0A%0Adef%20counter" target="_blank" rel="noopener noreferrer">在 Playground 上打开</a></p>
<p>如果我们开始编写函数，Codex 将了解下一步需要做什么。</p>
<p><strong>指定库将帮助 Codex 了解您的需求</strong>。Codex 知道大量的库、API 和模块。通过注释或将它们导入您的代码告诉 Codex 使用哪些，Codex 将根据它们而不是备选方案提出建议。</p>
<div class="language-html line-numbers-mode" data-highlighter="prismjs" data-ext="html" data-title="html"><pre v-pre><code><span class="line"><span class="token comment">&lt;!-- 使用A-Frame 1.2.0版制作3D网站 --></span></span>
<span class="line"><span class="token comment">&lt;!-- https://aframe.io/releases/1.2.0/aframe.min.js --></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p><a href="https://platform.openai.com/playground?model=code-davinci-002&amp;prompt=%3C%21--%20Use%20A-Frame%20version%201.2.0%20to%20create%20a%203D%20website%20--%3E%0A%3C%21--%20https%3A%2F%2Faframe.io%2Freleases%2F1.2.0%2Faframe.min.js%20--%3E" target="_blank" rel="noopener noreferrer">在 Playground 上打开</a></p>
<p>通过指定版本，您可以确保 Codex 使用最新的库。</p>
<p>注意：Codex 可以推荐有用的库和 API，但请始终确保自己进行研究以确保它们对您的应用程序是安全的。</p>
<p><strong>注释风格会影响代码质量</strong>。对于某些语言，注释的风格可以提高输出的质量。例如，在使用 Python 时，在某些情况下使用文档字符串（用三引号引起来的注释）可以提供比使用井号 (#) 符号更高质量的结果。</p>
<div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py" data-title="py"><pre v-pre><code><span class="line"><span class="token triple-quoted-string string">'''</span>
<span class="line">创建一组用户和电子邮件地址</span>
<span class="line">'''</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a href="https://platform.openai.com/playground?model=code-davinci-002&amp;prompt=%22%22%22%0ACreate%20an%20array%20of%20users%20and%20email%20addresses%0A%22%22%22" target="_blank" rel="noopener noreferrer">在 Playground 上打开</a></p>
<p><strong>将注释放在函数内部可能会有所帮助</strong>。推荐的编码标准通常建议将函数的描述放在函数内部。使用这种格式有助于 Codex 更清楚地了解您希望函数执行的操作。</p>
<div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py" data-title="py"><pre v-pre><code><span class="line"><span class="token keyword">def</span> <span class="token function">getUserBalance</span><span class="token punctuation">(</span><span class="token builtin">id</span><span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token triple-quoted-string string">"""</span>
<span class="line">    在数据库“UserData”中查找用户并返回他们当前的账户余额。</span>
<span class="line">    """</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a href="https://platform.openai.com/playground?model=code-davinci-002&amp;prompt=def%20getUserBalance%28id%29%3A%0A%20%20%20%20%22%22%22%0A%20%20%20%20Look%20up%20the%20user%20in%20the%20database%20%E2%80%98UserData%27%20and%20return%20their%20current%20account%20balance.%0A%20%20%20%20%22%22%22" target="_blank" rel="noopener noreferrer">在 Playground 上打开</a></p>
<p><strong>提供示例以获得更精确的结果</strong>。如果您有需要 Codex 使用的特定样式或格式，请在请求的第一部分提供示例或演示，这将有助于 Codex 更准确地满足您的需求。</p>
<div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py" data-title="py"><pre v-pre><code><span class="line"><span class="token triple-quoted-string string">"""</span>
<span class="line">创建随机动物和物种的列表</span>
<span class="line"></span>
<span class="line">"""</span></span>
<span class="line">animals  <span class="token operator">=</span> <span class="token punctuation">[</span> <span class="token punctuation">{</span><span class="token string">"name"</span><span class="token punctuation">:</span> <span class="token string">"Chomper"</span><span class="token punctuation">,</span> <span class="token string">"species"</span><span class="token punctuation">:</span> <span class="token string">"Hamster"</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token string">"name"</span><span class="token punctuation">:</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>较低的温度可提供更精确的结果</strong>。在大多数情况下，将 API 温度设置为 0 或接近于零（例如 0.1 或 0.2）往往会产生更好的结果。与 GPT-3 不同，更高的温度可以提供有用的创造性和随机结果，Codex 的更高温度可能会给你真正随机或不稳定的响应。</p>
<p>如果您需要 Codex 提供不同的潜在结果，请从零开始，然后向上递增 0.1，直到找到合适的变化。</p>
<p><strong>将任务组织成功能</strong>。我们可以通过在注释中尽可能准确地指定函数应该做什么来让 Codex 编写函数。通过编写以下注释，Codex 创建了一个 Javascript 计时器函数，该函数在用户按下按钮时触发：</p>
<p>一个简单的 JavaScript 计时器</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token comment">// 创建一个在 10 秒内创建警报的计时器</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>我们可以使用 Codex 与众所周知的库一起执行常见任务，例如使用 Stripe API 创建客户：</p>
<p>在 Python 中创建 Stripe 客户</p>
<div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py" data-title="py"><pre v-pre><code><span class="line"><span class="token comment"># 从电子邮件地址创建一个 Stripe 客户</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><strong>创建示例数据</strong>。测试应用程序通常需要使用示例数据。因为 Codgen 是一种理解如何理解和编写自然语言的语言模型，所以您可以要求 Codex 创建数据，例如虚构名称、产品和其他变量的数组。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token comment">/* 为旧金山创建一个天气温度数组 */</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>要求 Codex 执行此任务将生成如下表格：</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">var</span> weather <span class="token operator">=</span> <span class="token punctuation">[</span></span>
<span class="line">  <span class="token punctuation">{</span> <span class="token literal-property property">month</span><span class="token operator">:</span> <span class="token string">'January'</span><span class="token punctuation">,</span> <span class="token literal-property property">high</span><span class="token operator">:</span> <span class="token number">58</span><span class="token punctuation">,</span> <span class="token literal-property property">low</span><span class="token operator">:</span> <span class="token number">48</span> <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">{</span> <span class="token literal-property property">month</span><span class="token operator">:</span> <span class="token string">'February'</span><span class="token punctuation">,</span> <span class="token literal-property property">high</span><span class="token operator">:</span> <span class="token number">61</span><span class="token punctuation">,</span> <span class="token literal-property property">low</span><span class="token operator">:</span> <span class="token number">50</span> <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">{</span> <span class="token literal-property property">month</span><span class="token operator">:</span> <span class="token string">'March'</span><span class="token punctuation">,</span> <span class="token literal-property property">high</span><span class="token operator">:</span> <span class="token number">64</span><span class="token punctuation">,</span> <span class="token literal-property property">low</span><span class="token operator">:</span> <span class="token number">53</span> <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">{</span> <span class="token literal-property property">month</span><span class="token operator">:</span> <span class="token string">'April'</span><span class="token punctuation">,</span> <span class="token literal-property property">high</span><span class="token operator">:</span> <span class="token number">67</span><span class="token punctuation">,</span> <span class="token literal-property property">low</span><span class="token operator">:</span> <span class="token number">55</span> <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">{</span> <span class="token literal-property property">month</span><span class="token operator">:</span> <span class="token string">'May'</span><span class="token punctuation">,</span> <span class="token literal-property property">high</span><span class="token operator">:</span> <span class="token number">70</span><span class="token punctuation">,</span> <span class="token literal-property property">low</span><span class="token operator">:</span> <span class="token number">58</span> <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">{</span> <span class="token literal-property property">month</span><span class="token operator">:</span> <span class="token string">'June'</span><span class="token punctuation">,</span> <span class="token literal-property property">high</span><span class="token operator">:</span> <span class="token number">73</span><span class="token punctuation">,</span> <span class="token literal-property property">low</span><span class="token operator">:</span> <span class="token number">61</span> <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">{</span> <span class="token literal-property property">month</span><span class="token operator">:</span> <span class="token string">'July'</span><span class="token punctuation">,</span> <span class="token literal-property property">high</span><span class="token operator">:</span> <span class="token number">76</span><span class="token punctuation">,</span> <span class="token literal-property property">low</span><span class="token operator">:</span> <span class="token number">63</span> <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">{</span> <span class="token literal-property property">month</span><span class="token operator">:</span> <span class="token string">'August'</span><span class="token punctuation">,</span> <span class="token literal-property property">high</span><span class="token operator">:</span> <span class="token number">77</span><span class="token punctuation">,</span> <span class="token literal-property property">low</span><span class="token operator">:</span> <span class="token number">64</span> <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">{</span> <span class="token literal-property property">month</span><span class="token operator">:</span> <span class="token string">'September'</span><span class="token punctuation">,</span> <span class="token literal-property property">high</span><span class="token operator">:</span> <span class="token number">76</span><span class="token punctuation">,</span> <span class="token literal-property property">low</span><span class="token operator">:</span> <span class="token number">63</span> <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">{</span> <span class="token literal-property property">month</span><span class="token operator">:</span> <span class="token string">'October'</span><span class="token punctuation">,</span> <span class="token literal-property property">high</span><span class="token operator">:</span> <span class="token number">73</span><span class="token punctuation">,</span> <span class="token literal-property property">low</span><span class="token operator">:</span> <span class="token number">61</span> <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">{</span> <span class="token literal-property property">month</span><span class="token operator">:</span> <span class="token string">'November'</span><span class="token punctuation">,</span> <span class="token literal-property property">high</span><span class="token operator">:</span> <span class="token number">68</span><span class="token punctuation">,</span> <span class="token literal-property property">low</span><span class="token operator">:</span> <span class="token number">57</span> <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">{</span> <span class="token literal-property property">month</span><span class="token operator">:</span> <span class="token string">'December'</span><span class="token punctuation">,</span> <span class="token literal-property property">high</span><span class="token operator">:</span> <span class="token number">64</span><span class="token punctuation">,</span> <span class="token literal-property property">low</span><span class="token operator">:</span> <span class="token number">54</span> <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>复合函数和小型应用程序</strong>。我们可以向 Codex 提供包含复杂请求的评论，例如创建随机名称生成器或使用用户输入执行任务，如果有足够的标记，Codex 可以生成其余内容。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token comment">/*</span>
<span class="line">创建动物列表</span>
<span class="line">创建城市列表</span>
<span class="line">使用列表来生成关于我在每个城市的动物园看到的故事</span>
<span class="line">*/</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>限制完成大小以获得更精确的结果或更低的延迟</strong>。在 Codex 中请求更长的完成时间可能会导致不准确的答案和重复。通过减少<code v-pre>max_tokens</code>和设置<code v-pre>stop</code>标记来限制查询的大小。例如，添加<code v-pre>\n</code>为<code v-pre>stop</code>序列以将完成限制为一行代码。较小的完成也会导致较少的延迟。</p>
<p><strong>使用流式传输来减少延迟</strong>。大型 Codex 查询可能需要数十秒才能完成。要构建需要较低延迟的应用程序，例如执行自动完成的编码助手，请考虑使用流式处理。在模型完成生成整个完成之前将返回响应。只需要部分完成的应用程序可以通过以编程方式或通过使用创造性的值来切断完成来减少延迟<code v-pre>stop</code>。</p>
<p>用户可以通过从 API 请求多个解决方案并使用返回的第一个响应，将流式处理与复制结合起来以减少延迟。通过设置来做到这一点<code v-pre>n &gt; 1</code>。这种方式会消耗较多的token配额，谨慎使用（比如合理设置<code v-pre>max_tokens</code>和<code v-pre>stop</code>）。</p>
<p><strong>使用 Codex 来解释代码</strong>。Codex 创建和理解代码的能力使我们能够使用它来执行任务，例如解释文件中代码的作用。实现此目的的一种方法是在以“This function”或“This application is”开头的函数之后添加注释。食典委通常将此解释为解释的开始并完成文本的其余部分。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token comment">/* 解释前面的函数在做什么：它</span>
<span class="line"></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><strong>解释 SQL 查询</strong>。在此示例中，我们使用 Codex 以人类可读的格式解释 SQL 查询的作用。</p>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql" data-title="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> <span class="token keyword">DISTINCT</span> department<span class="token punctuation">.</span>name</span>
<span class="line"><span class="token keyword">FROM</span> department</span>
<span class="line"><span class="token keyword">JOIN</span> employee <span class="token keyword">ON</span> department<span class="token punctuation">.</span>id <span class="token operator">=</span> employee<span class="token punctuation">.</span>department_id</span>
<span class="line"><span class="token keyword">JOIN</span> salary_payments <span class="token keyword">ON</span> employee<span class="token punctuation">.</span>id <span class="token operator">=</span> salary_payments<span class="token punctuation">.</span>employee_id</span>
<span class="line"><span class="token keyword">WHERE</span> salary_payments<span class="token punctuation">.</span><span class="token keyword">date</span> <span class="token operator">BETWEEN</span> <span class="token string">'2020-06-01'</span> <span class="token operator">AND</span> <span class="token string">'2020-06-30'</span></span>
<span class="line"><span class="token keyword">GROUP</span> <span class="token keyword">BY</span> department<span class="token punctuation">.</span>name</span>
<span class="line"><span class="token keyword">HAVING</span> <span class="token function">COUNT</span><span class="token punctuation">(</span>employee<span class="token punctuation">.</span>id<span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">10</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token comment">-- 以人类可读的格式解释上述查询</span></span>
<span class="line"><span class="token comment">--</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>编写单元测试</strong>。只需添加注释“单元测试”并启动一个函数，即可在 Python 中创建单元测试。</p>
<div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py" data-title="py"><pre v-pre><code><span class="line"><span class="token comment"># Python 3</span></span>
<span class="line"><span class="token keyword">def</span> <span class="token function">sum_numbers</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token keyword">return</span> a <span class="token operator">+</span> b</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Unit test</span></span>
<span class="line"><span class="token keyword">def</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>检查代码是否有错误</strong>。通过使用示例，您可以向 Codex 展示如何识别代码中的错误。在某些情况下不需要示例，但是展示提供描述的级别和细节可以帮助法典理解要寻找的内容以及如何解释它。（Codex 对错误的检查不应取代用户的仔细审查。）</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token comment">/* 解释为什么前面的函数不起作用。 */</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><strong>使用源数据编写数据库函数</strong>。正如人类程序员会从了解数据库结构和列名中获益一样，Codex 可以使用此数据来帮助您编写准确的查询请求。在此示例中，我们插入数据库的模式并告诉 Codex 要查询数据库的内容。</p>
<div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py" data-title="py"><pre v-pre><code><span class="line"><span class="token comment"># Table albums, columns = [AlbumId, Title, ArtistId]</span></span>
<span class="line"><span class="token comment"># Table artists, columns = [ArtistId, Name]</span></span>
<span class="line"><span class="token comment"># Table media_types, columns = [MediaTypeId, Name]</span></span>
<span class="line"><span class="token comment"># Table playlists, columns = [PlaylistId, Name]</span></span>
<span class="line"><span class="token comment"># Table playlist_track, columns = [PlaylistId, TrackId]</span></span>
<span class="line"><span class="token comment"># Table tracks, columns = [TrackId, Name, AlbumId, MediaTypeId, GenreId, Composer, Milliseconds, Bytes, UnitPrice]</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 为 Adele 的所有专辑创建一个查询</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>语言之间的转换</strong>。您可以让 Codex 从一种语言转换为另一种语言，方法是遵循一种简单的格式，您可以在注释中列出要转换的代码的语言，然后是代码，然后是包含您希望将其翻译成的语言的注释。</p>
<div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py" data-title="py"><pre v-pre><code><span class="line"><span class="token comment"># 将其从 Python 转换为 R</span></span>
<span class="line"><span class="token comment"># Python version</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">[</span> Python code <span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># End</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># R version</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>为库或框架重写代码</strong>。如果您希望 Codex 提高某个功能的效率，您可以为其提供要重写的代码，然后提供有关使用何种格式的说明。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token comment">// 将其重写为 React 组件</span></span>
<span class="line"><span class="token keyword">var</span> input <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">'input'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">input<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">'type'</span><span class="token punctuation">,</span> <span class="token string">'text'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">var</span> button <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">'button'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">button<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> <span class="token string">'Say Hello'</span><span class="token punctuation">;</span></span>
<span class="line">document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>button<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">button<span class="token punctuation">.</span><span class="token function-variable function">onclick</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">var</span> name <span class="token operator">=</span> input<span class="token punctuation">.</span>value<span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">var</span> hello <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">'div'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  hello<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> <span class="token string">'Hello '</span> <span class="token operator">+</span> name<span class="token punctuation">;</span></span>
<span class="line">  document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>hello<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// React version:</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="插入代码" tabindex="-1"><a class="header-anchor" href="#插入代码"><span>插入代码 <Badge text="beta" /></span></a></h2>
<p>补全端点还支持通过提供除<RouteLink to="/api/%E8%A1%A5%E5%85%A8.html#%E5%89%8D%E7%BC%80">前缀提示</RouteLink>之外的<RouteLink to="/api/%E8%A1%A5%E5%85%A8.html#%E5%90%8E%E7%BC%80">后缀提示</RouteLink>来在代码中插入代码。这可用于在函数或文件中间插入补全。</p>
<div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py" data-title="py"><pre v-pre><code><span class="line"><span class="token keyword">def</span> <span class="token function">get_largest_prime_factor</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token keyword">if</span> n <span class="token operator">&lt;</span> <span class="token number">2</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token boolean">False</span></span>
<span class="line">    <span class="token keyword">def</span> <span class="token function">is_prime</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token operator">></span>  <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> n<span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token operator">></span>  <span class="token keyword">if</span> n <span class="token operator">%</span> i <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">:</span> <span class="token operator">></span>  <span class="token keyword">return</span> <span class="token boolean">False</span> <span class="token operator">></span>  <span class="token keyword">return</span> <span class="token boolean">True</span> <span class="token operator">></span>     largest <span class="token operator">=</span> <span class="token number">1</span></span>
<span class="line">    <span class="token keyword">for</span> j <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> n <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token keyword">if</span> n <span class="token operator">%</span> j <span class="token operator">==</span> <span class="token number">0</span> <span class="token keyword">and</span> is_prime<span class="token punctuation">(</span>j<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token keyword">return</span> largest</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过为模型提供额外的上下文，它可以更加可控。然而，这对模型来说是一个更具约束性和挑战性的任务。</p>
<h3 id="最佳实践-1" tabindex="-1"><a class="header-anchor" href="#最佳实践-1"><span>最佳实践</span></a></h3>
<p>插入代码是测试版中的一项新功能，您可能需要修改使用 API 的方式以获得更好的结果。以下是一些最佳实践：</p>
<p><strong>使用 max_tokens &gt; 256</strong>。该模型更擅长插入更长的补全。如果 max_tokens 太小，模型可能会在连接到后缀之前被切断。请注意，即使使用更大的 max_tokens，您也只会根据生成的标记数量付费。</p>
<p><strong>更喜欢 finish_reason == “stop”</strong>。当模型到达自然停止点或用户提供的停止序列时，它会将 finish_reason 设置为“停止”。这表明该模型已设法很好地连接到后缀，并且是完成质量的良好信号。这对于在使用 n &gt; 1 或重采样时在几个完成之间进行选择尤其相关（请参阅下一点）。</p>
<p><strong>重新采样 3-5 次</strong>。虽然几乎所有补全都连接到前缀，但在更困难的情况下，模型可能难以连接后缀。我们发现，在这种情况下，重采样 3 或 5 次（或使用 best_of 和 k=3,5）并选择带有“stop”作为其 finish_reason 的样本可能是一种有效的方法。重采样时，您通常需要更高的温度来增加多样性。</p>
<p>注意：如果所有返回的样本都有 finish_reason == &quot;length&quot;，很可能是 max_tokens 太小，模型在设法自然地连接提示和后缀之前用完了标记。考虑在重采样之前增加 max_tokens。</p>
<h2 id="编辑代码" tabindex="-1"><a class="header-anchor" href="#编辑代码"><span>编辑代码 <Badge text="beta" /></span></a></h2>
<p><a href="/api/%E7%BC%96%E8%BE%91">编辑</a>端点可用于编辑代码，而不仅仅是补全代码。您提供一些代码和如何修改它的说明，<code v-pre>code-davinci-edit-001</code>模型将尝试相应地对其进行编辑。这是重构和调整代码的自然界面。在此初始测试期间，编辑端点的使用是免费的。</p>
<h3 id="例子" tabindex="-1"><a class="header-anchor" href="#例子"><span>例子</span></a></h3>
<h4 id="迭代构建程序" tabindex="-1"><a class="header-anchor" href="#迭代构建程序"><span>迭代构建程序</span></a></h4>
<p>编写代码通常是一个迭代过程，需要一路完善文本。编辑自然而然地不断完善模型的输出，直到最终结果得到完善。在此示例中，我们使用斐波那契作为如何迭代构建代码的示例。</p>
<h4 id="_1-写一个函数" tabindex="-1"><a class="header-anchor" href="#_1-写一个函数"><span>1.写一个函数</span></a></h4>
<p><strong>输入</strong></p>
<CodeDesc ctt="无输入"/><p><strong>指示</strong></p>
<CodeDesc ctt="用python写一个计算斐波那契的函数"/><p><strong>输出</strong></p>
<div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py" data-title="py"><pre v-pre><code><span class="line"><span class="token keyword">def</span> <span class="token function">fibonacci</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">    a <span class="token operator">=</span> <span class="token number">0</span></span>
<span class="line">    b <span class="token operator">=</span> <span class="token number">1</span></span>
<span class="line">    <span class="token keyword">if</span> num <span class="token operator">==</span><span class="token number">1</span><span class="token punctuation">:</span></span>
<span class="line">       <span class="token keyword">print</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">else</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token keyword">print</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">print</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span></span>
<span class="line">        <span class="token comment"># 序列从0,1开始</span></span>
<span class="line">        <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span>num<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">            c <span class="token operator">=</span> a<span class="token operator">+</span>b</span>
<span class="line">            a <span class="token operator">=</span> b</span>
<span class="line">            b <span class="token operator">=</span> c</span>
<span class="line">            <span class="token keyword">print</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">fibonacci<span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-重构它" tabindex="-1"><a class="header-anchor" href="#_2-重构它"><span>2.重构它</span></a></h4>
<p>输入</p>
<div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py" data-title="py"><pre v-pre><code><span class="line"><span class="token keyword">def</span> <span class="token function">fibonacci</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">    a <span class="token operator">=</span> <span class="token number">0</span></span>
<span class="line">    b <span class="token operator">=</span> <span class="token number">1</span></span>
<span class="line">    <span class="token keyword">if</span> num <span class="token operator">==</span><span class="token number">1</span><span class="token punctuation">:</span></span>
<span class="line">       <span class="token keyword">print</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">else</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token keyword">print</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">print</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span></span>
<span class="line">        <span class="token comment"># 序列从0,1开始</span></span>
<span class="line">        <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span>num<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">            c <span class="token operator">=</span> a<span class="token operator">+</span>b</span>
<span class="line">            a <span class="token operator">=</span> b</span>
<span class="line">            b <span class="token operator">=</span> c</span>
<span class="line">            <span class="token keyword">print</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">fibonacci<span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>指示</strong></p>
<CodeDesc ctt="将此函数重构为递归的"/><p><strong>输出</strong></p>
<div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py" data-title="py"><pre v-pre><code><span class="line"><span class="token keyword">def</span> <span class="token function">fib</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token keyword">if</span> num <span class="token operator">&lt;=</span> <span class="token number">1</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token keyword">return</span> num</span>
<span class="line">      <span class="token keyword">else</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token keyword">return</span> fib<span class="token punctuation">(</span>num<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">+</span> fib<span class="token punctuation">(</span>num<span class="token operator">-</span><span class="token number">2</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">print</span><span class="token punctuation">(</span>fib<span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-重命名函数" tabindex="-1"><a class="header-anchor" href="#_3-重命名函数"><span>3.重命名函数</span></a></h4>
<p><strong>输入</strong></p>
<div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py" data-title="py"><pre v-pre><code><span class="line"><span class="token keyword">def</span> <span class="token function">fibonacci</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token keyword">if</span> num <span class="token operator">&lt;=</span> <span class="token number">1</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token keyword">return</span> num</span>
<span class="line">    <span class="token keyword">else</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token keyword">return</span> fib<span class="token punctuation">(</span>num<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">+</span> fib<span class="token punctuation">(</span>num<span class="token operator">-</span><span class="token number">2</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">print</span><span class="token punctuation">(</span>fibonacci<span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>指示</strong></p>
<CodeDesc ctt="将函数重命名为 fib"/><p><strong>输出</strong></p>
<div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py" data-title="py"><pre v-pre><code><span class="line"><span class="token keyword">def</span> <span class="token function">fib</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token keyword">if</span> num <span class="token operator">&lt;=</span> <span class="token number">1</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token keyword">return</span> num</span>
<span class="line">      <span class="token keyword">else</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token keyword">return</span> fib<span class="token punctuation">(</span>num<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">+</span> fib<span class="token punctuation">(</span>num<span class="token operator">-</span><span class="token number">2</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">print</span><span class="token punctuation">(</span>fib<span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-添加文档" tabindex="-1"><a class="header-anchor" href="#_4-添加文档"><span>4.添加文档</span></a></h4>
<p><strong>输入</strong></p>
<div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py" data-title="py"><pre v-pre><code><span class="line"><span class="token keyword">def</span> <span class="token function">fib</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token keyword">if</span> num <span class="token operator">&lt;=</span> <span class="token number">1</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token keyword">return</span> num</span>
<span class="line">    <span class="token keyword">else</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token keyword">return</span> fib<span class="token punctuation">(</span>num<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">+</span> fib<span class="token punctuation">(</span>num<span class="token operator">-</span><span class="token number">2</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">print</span><span class="token punctuation">(</span>fib<span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>指示</strong></p>
<CodeDesc ctt="添加文档"/><p><strong>输出</strong></p>
<div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py" data-title="py"><pre v-pre><code><span class="line"><span class="token keyword">def</span> <span class="token function">fib</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token triple-quoted-string string">""" 打印斐波那契数列中的第 n 个数 """</span></span>
<span class="line">    <span class="token keyword">if</span> num <span class="token operator">&lt;=</span> <span class="token number">1</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token keyword">return</span> num</span>
<span class="line">      <span class="token keyword">else</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token keyword">return</span> fib<span class="token punctuation">(</span>num<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">+</span> fib<span class="token punctuation">(</span>num<span class="token operator">-</span><span class="token number">2</span><span class="token punctuation">)</span></span>
<span class="line">  <span class="token keyword">print</span><span class="token punctuation">(</span>fib<span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="最佳实践-2" tabindex="-1"><a class="header-anchor" href="#最佳实践-2"><span>最佳实践</span></a></h3>
<p>编辑端点仍处于 alpha 阶段，我们建议遵循这些最佳实践。</p>
<ol>
<li>考虑使用空提示！在这种情况下，编辑可以类似于完成使用。</li>
<li>说明尽可能具体。</li>
<li>有时，模型无法找到解决方案并会导致错误。我们建议改写您的说明或输入。</li>
</ol>
</div></template>


