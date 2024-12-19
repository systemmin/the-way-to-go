<template><div><h1 id="_15-7-探索-template-包" tabindex="-1"><a class="header-anchor" href="#_15-7-探索-template-包"><span>15.7 探索 template 包</span></a></h1>
<p>（<code v-pre>template</code> 包的文档可以在 <a href="https://golang.org/pkg/text/template/" target="_blank" rel="noopener noreferrer">https://golang.org/pkg/text/template/</a> 找到。）</p>
<p>在前一章节，我们使用 template 对象把数据结构整合到 HTML 模板中。这项技术确实对网页应用程序非常有用，然而模板是一项更为通用的技术方案：数据驱动的模板被创建出来，以生成文本输出。HTML 仅是其中的一种特定使用案例。</p>
<p>模板通过与数据结构的整合来生成，通常为结构体或其切片。当数据项传递给 <code v-pre>tmpl.Execute()</code> ，它用其中的元素进行替换， 动态地重写某一小段文本。<strong>只有被导出的数据项</strong>才可以被整合进模板中。可以在 <code v-pre>{{</code> 和 <code v-pre>}}</code> 中加入数据求值或控制结构。数据项可以是值或指针，接口隐藏了他们的差异。</p>
<h2 id="_15-7-1-字段替换-fieldname" tabindex="-1"><a class="header-anchor" href="#_15-7-1-字段替换-fieldname"><span>15.7.1 字段替换：<code v-pre>{{.FieldName}}</code></span></a></h2>
<p>要在模板中包含某个字段的内容，使用双花括号括起以点 (<code v-pre>.</code>) 开头的字段名。例如，假设 <code v-pre>Name</code> 是某个结构体的字段，其值要在被模板整合时替换，则在模板中使用文本 <code v-pre>{{.Name}}</code>。当 <code v-pre>Name</code> 是 <code v-pre>map</code> 的键时这么做也是可行的。要创建一个新的 <code v-pre>Template</code> 对象，调用 <code v-pre>template.New()</code>，其字符串参数可以指定模板的名称。正如 <RouteLink to="/chapter-3/15.5.html">15.5 节</RouteLink>出现过的，<code v-pre>Parse()</code> 方法通过解析模板定义字符串，生成模板的内部表示。当使用包含模板定义字符串的文件时，将文件路径传递给 <code v-pre>ParseFiles()</code> 来解析。解析过程如产生错误，这两个函数第二个返回值 <code v-pre>error != nil</code>。最后通过 <code v-pre>Execute()</code> 方法，数据结构中的内容与模板整合，并将结果写入方法的第一个参数中，其类型为 <code v-pre>io.Writer</code>。再一次地，可能会有 <code v-pre>error</code> 返回。以下程序演示了这些步骤，输出通过 <code v-pre>os.Stdout()</code> 被写到控制台。</p>
<p>示例 15.13 <a href="examples/chapter_15/template_field.go">template_field.go</a></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"fmt"</span></span>
<span class="line">	<span class="token string">"os"</span></span>
<span class="line">	<span class="token string">"text/template"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">type</span> Person <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">	Name <span class="token builtin">string</span></span>
<span class="line">	nonExportedAgeField <span class="token builtin">string</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	t <span class="token operator">:=</span> template<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">"hello"</span><span class="token punctuation">)</span></span>
<span class="line">	t<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">=</span> t<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token string">"hello {{.Name}}!"</span><span class="token punctuation">)</span></span>
<span class="line">	p <span class="token operator">:=</span> Person<span class="token punctuation">{</span>Name<span class="token punctuation">:</span> <span class="token string">"Mary"</span><span class="token punctuation">,</span> nonExportedAgeField<span class="token punctuation">:</span> <span class="token string">"31"</span><span class="token punctuation">}</span></span>
<span class="line">	<span class="token keyword">if</span> err <span class="token operator">:=</span> t<span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">,</span> p<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"There was an error:"</span><span class="token punctuation">,</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：<code v-pre>hello Mary!</code></p>
<p>如果数据结构中包含一个未导出的字段，当我们尝试把它整合到类似这样的定义字符串：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">t<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">=</span> t<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token string">"your age is {{.nonExportedAgeField}}!"</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>会产生错误：</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">There was an error: template: nonexported template hello:1: can’t evaluate field nonExportedAgeField in type main.Person.</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>如果只是想简单地把 <code v-pre>Execute()</code> 方法的第二个参数用于替换，使用 <code v-pre>{{.}}</code>。</p>
<p>当在浏览器环境中进行这些步骤，应首先使用 <code v-pre>html</code> 过滤器来过滤内容，例如 <code v-pre>{{html .}}</code>， 或者对 <code v-pre>FieldName</code> 过滤：<code v-pre>{{ .FieldName |html }}</code>。</p>
<p><code v-pre>|html</code> 这部分代码，是请求模板引擎在输出 <code v-pre>FieldName</code> 的结果前把值传递给 html 格式化器，它会执行 HTML 字符转义（例如把 <code v-pre>&gt;</code> 替换为 <code v-pre>&amp;gt;</code>）。这可以避免用户输入数据破坏 HTML 文档结构。</p>
<h2 id="_15-7-2-验证模板格式" tabindex="-1"><a class="header-anchor" href="#_15-7-2-验证模板格式"><span>15.7.2 验证模板格式</span></a></h2>
<p>为了确保模板定义语法是正确的，使用 <code v-pre>Must()</code> 函数处理 <code v-pre>Parse</code> 的返回结果。在下面的例子中 <code v-pre>tOK</code> 是正确的模板， <code v-pre>tErr</code> 验证时发生错误，会导致运行时 panic。</p>
<p>示例 15.14 <a href="examples/chapter_15/template_validation.go">template_validation.go</a></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"text/template"</span></span>
<span class="line">	<span class="token string">"fmt"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	tOk <span class="token operator">:=</span> template<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">"ok"</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token comment">//a valid template, so no panic with Must:</span></span>
<span class="line">	template<span class="token punctuation">.</span><span class="token function">Must</span><span class="token punctuation">(</span>tOk<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token string">"/* and a comment */ some static text: {{ .Name }}"</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"The first one parsed OK."</span><span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"The next one ought to fail."</span><span class="token punctuation">)</span></span>
<span class="line">	tErr <span class="token operator">:=</span> template<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">"error_template"</span><span class="token punctuation">)</span></span>
<span class="line">	template<span class="token punctuation">.</span><span class="token function">Must</span><span class="token punctuation">(</span>tErr<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token string">" some static text {{ .Name }"</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p>
<pre><code>The first one parsed OK.
The next one ought to fail.
panic: template: error_template:1: unexpected &quot;}&quot; in operand
</code></pre>
<p>模板语法出现错误比较少见，可以使用 <RouteLink to="/chapter-3/13.3.html">13.3节</RouteLink> 概括的 <code v-pre>defer/recover</code> 机制来报告并纠正错误。</p>
<p>在代码中常见到这 3 个基本函数被串联使用：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">var</span> strTempl <span class="token operator">=</span> template<span class="token punctuation">.</span><span class="token function">Must</span><span class="token punctuation">(</span>template<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">"TName"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span>strTemplateHTML<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>练习 15.7 <a href="exercises/chapter_15/template_validation_recover.go">template_validation_recover.go</a></p>
<p>在上述示例代码上实现 defer/recover 机制。</p>
<h2 id="_15-7-3-if-else" tabindex="-1"><a class="header-anchor" href="#_15-7-3-if-else"><span>15.7.3 <code v-pre>If-else</code></span></a></h2>
<p>运行 <code v-pre>Execute()</code> 产生的结果来自模板的输出，它包含静态文本，以及被 <code v-pre>{{}}</code> 包裹的称之为<em>管道</em>的文本。例如，运行这段代码（示例 15.15 <a href="examples/chapter_15/pipeline1.go">pipline1.go</a>）：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">t <span class="token operator">:=</span> template<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">"template test"</span><span class="token punctuation">)</span></span>
<span class="line">t <span class="token operator">=</span> template<span class="token punctuation">.</span><span class="token function">Must</span><span class="token punctuation">(</span>t<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token string">"This is just static text. \n{{\"This is pipeline data - because it is evaluated within the double braces.\"}} {{`So is this, but within reverse quotes.`}}\n"</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">t<span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出结果为：</p>
<pre><code>This is just static text.
This is pipeline data—because it is evaluated within the double braces. So is this, but within reverse quotes.
</code></pre>
<p>现在我们可以对管道数据的输出结果用 <code v-pre>if-else-end</code> 设置条件约束：如果管道是空的，类似于：</p>
<div class="language-html line-numbers-mode" data-highlighter="prismjs" data-ext="html" data-title="html"><pre v-pre><code><span class="line">{{if ``}} Will not print. {{end}}</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>那么 <code v-pre>if</code> 条件的求值结果为 <code v-pre>false</code>，不会有输出内容。但如果是这样：</p>
<div class="language-html line-numbers-mode" data-highlighter="prismjs" data-ext="html" data-title="html"><pre v-pre><code><span class="line">{{if `anything`}} Print IF part. {{else}} Print ELSE part.{{end}}</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>会输出 <code v-pre>Print IF part.</code>。以下程序演示了这点：</p>
<p>示例 15.16 <a href="examples/chapter_15/template_ifelse.go">template_ifelse.go</a></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"os"</span></span>
<span class="line">	<span class="token string">"text/template"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	tEmpty <span class="token operator">:=</span> template<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">"template test"</span><span class="token punctuation">)</span></span>
<span class="line">	tEmpty <span class="token operator">=</span> template<span class="token punctuation">.</span><span class="token function">Must</span><span class="token punctuation">(</span>tEmpty<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token string">"Empty pipeline if demo: {{if ``}} Will not print. {{end}}\n"</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">//empty pipeline following if</span></span>
<span class="line">	tEmpty<span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">	tWithValue <span class="token operator">:=</span> template<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">"template test"</span><span class="token punctuation">)</span></span>
<span class="line">	tWithValue <span class="token operator">=</span> template<span class="token punctuation">.</span><span class="token function">Must</span><span class="token punctuation">(</span>tWithValue<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token string">"Non empty pipeline if demo: {{if `anything`}} Will print. {{end}}\n"</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">//non empty pipeline following if condition</span></span>
<span class="line">	tWithValue<span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">	tIfElse <span class="token operator">:=</span> template<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">"template test"</span><span class="token punctuation">)</span></span>
<span class="line">	tIfElse <span class="token operator">=</span> template<span class="token punctuation">.</span><span class="token function">Must</span><span class="token punctuation">(</span>tIfElse<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token string">"if-else demo: {{if `anything`}} Print IF part. {{else}} Print ELSE part.{{end}}\n"</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">//non empty pipeline following if condition</span></span>
<span class="line">	tIfElse<span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p>
<pre><code>Empty pipeline if demo:
Non empty pipeline if demo: Will print.
if-else demo: Print IF part.
</code></pre>
<h2 id="_15-7-4-点号和-with-end" tabindex="-1"><a class="header-anchor" href="#_15-7-4-点号和-with-end"><span>15.7.4 点号和 <code v-pre>with-end</code></span></a></h2>
<p>点号 (<code v-pre>.</code>) 可以在 Go 模板中使用：其值 <code v-pre>{{.}}</code> 被设置为当前管道的值。</p>
<p><code v-pre>with</code> 语句将点号设为管道的值。如果管道是空的，那么不管 <code v-pre>with-end</code> 块之间有什么，都会被忽略。在被嵌套时，点号根据最近的作用域取得值。以下程序演示了这点：</p>
<p>示例 15.17 <a href="examples/chapter_15/template_with_end.go">template_with_end.go</a></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"os"</span></span>
<span class="line">	<span class="token string">"text/template"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	t <span class="token operator">:=</span> template<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">"test"</span><span class="token punctuation">)</span></span>
<span class="line">	t<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">=</span> t<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token string">"{{with `hello`}}{{.}}{{end}}!\n"</span><span class="token punctuation">)</span></span>
<span class="line">	t<span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">	t<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">=</span> t<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token string">"{{with `hello`}}{{.}} {{with `Mary`}}{{.}}{{end}}{{end}}!\n"</span><span class="token punctuation">)</span></span>
<span class="line">	t<span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p>
<pre><code>hello!
hello Mary!
</code></pre>
<h2 id="_15-7-5-模板变量" tabindex="-1"><a class="header-anchor" href="#_15-7-5-模板变量"><span>15.7.5 模板变量 <code v-pre>$</code></span></a></h2>
<p>可以在模板内为管道设置本地变量，变量名以 <code v-pre>$</code> 符号作为前缀。变量名只能包含字母、数字和下划线。以下示例使用了多种形式的有效变量名。</p>
<p>示例 15.18 <a href="examples/chapter_15/template_variables.go">template_variables.go</a></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"os"</span></span>
<span class="line">	<span class="token string">"text/template"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	t <span class="token operator">:=</span> template<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">"test"</span><span class="token punctuation">)</span></span>
<span class="line">	t <span class="token operator">=</span> template<span class="token punctuation">.</span><span class="token function">Must</span><span class="token punctuation">(</span>t<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token string">"{{with $3 := `hello`}}{{$3}}{{end}}!\n"</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">	t<span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">	t <span class="token operator">=</span> template<span class="token punctuation">.</span><span class="token function">Must</span><span class="token punctuation">(</span>t<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token string">"{{with $x3 := `hola`}}{{$x3}}{{end}}!\n"</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">	t<span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">	t <span class="token operator">=</span> template<span class="token punctuation">.</span><span class="token function">Must</span><span class="token punctuation">(</span>t<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token string">"{{with $x_1 := `hey`}}{{$x_1}} {{.}} {{$x_1}}{{end}}!\n"</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">	t<span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p>
<pre><code>hello!
hola!
hey hey hey!
</code></pre>
<h2 id="_15-7-6-range-end" tabindex="-1"><a class="header-anchor" href="#_15-7-6-range-end"><span>15.7.6 <code v-pre>range-end</code></span></a></h2>
<p><code v-pre>range-end</code> 结构格式为：<code v-pre>{{range pipeline}} T1 {{else}} T0 {{end}}</code>。</p>
<p><code v-pre>range</code> 被用于在集合上迭代：管道的值必须是数组、切片或 <code v-pre>map</code>。如果管道的值长度为零，点号的值不受影响，且执行 <code v-pre>T0</code>；否则，点号被设置为数组、切片或 <code v-pre>map</code> 内元素的值，并执行 <code v-pre>T1</code>。</p>
<p>如果模板为：</p>
<div class="language-html line-numbers-mode" data-highlighter="prismjs" data-ext="html" data-title="html"><pre v-pre><code><span class="line">{{range .}}</span>
<span class="line">{{.}}</span>
<span class="line">{{end}}</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那么执行代码：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">s <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">}</span></span>
<span class="line">t<span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">,</span> s<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>会输出：</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">1</span>
<span class="line">2</span>
<span class="line">3</span>
<span class="line">4</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如需更实用的示例，请参考 <RouteLink to="/chapter-3/20.7.html">20.7 节</RouteLink>，来自 App Engine 数据库的数据通过模板来显示：</p>
<div class="language-html line-numbers-mode" data-highlighter="prismjs" data-ext="html" data-title="html"><pre v-pre><code><span class="line">{{range .}}</span>
<span class="line">	{{with .Author}}</span>
<span class="line">		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>b</span><span class="token punctuation">></span></span>{{html .}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>b</span><span class="token punctuation">></span></span> wrote:<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span></span>
<span class="line">	{{else}}</span>
<span class="line">		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>An anonymous person wrote:<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span></span>
<span class="line">	{{end}}</span>
<span class="line">	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>pre</span><span class="token punctuation">></span></span>{{html .Content}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>pre</span><span class="token punctuation">></span></span></span>
<span class="line">	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>pre</span><span class="token punctuation">></span></span>{{html .Date}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>pre</span><span class="token punctuation">></span></span></span>
<span class="line">{{end}}</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里 <code v-pre>range .</code> 在结构体切片上迭代，每次都包含 <code v-pre>Author</code>、<code v-pre>Content</code> 和 <code v-pre>Date</code> 字段。</p>
<h2 id="_15-7-7-模板预定义函数" tabindex="-1"><a class="header-anchor" href="#_15-7-7-模板预定义函数"><span>15.7.7 模板预定义函数</span></a></h2>
<p>也有一些可以在模板代码中使用的预定义函数，例如 <code v-pre>printf()</code> 函数工作方式类似于 <code v-pre>fmt.Sprintf()</code>：</p>
<p>示例 15.19 <a href="examples/chapter_15/predefined_functions.go">predefined_functions.go</a></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"os"</span></span>
<span class="line">	<span class="token string">"text/template"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	t <span class="token operator">:=</span> template<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">"test"</span><span class="token punctuation">)</span></span>
<span class="line">	t <span class="token operator">=</span> template<span class="token punctuation">.</span><span class="token function">Must</span><span class="token punctuation">(</span>t<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token string">"{{with $x := `hello`}}{{printf `%s %s` $x `Mary`}}{{end}}!\n"</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">	t<span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出 <code v-pre>hello Mary!</code>。</p>
<p>预定义函数也在 <RouteLink to="/chapter-3/15.6.html">15.6 节</RouteLink>中使用：<code v-pre>{{ printf &quot;%s&quot; .Body|html}}</code>，否则字节切片 <code v-pre>Body</code> 会作为数字序列打印出来。</p>
<h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-3/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-3/15.6.html">用模板编写网页应用</RouteLink></li>
<li>下一节：<RouteLink to="/chapter-3/15.8.html">精巧的多功能网页服务器</RouteLink></li>
</ul>
</div></template>


