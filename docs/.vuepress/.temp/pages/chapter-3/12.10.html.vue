<template><div><h1 id="_12-10-xml-数据格式" tabindex="-1"><a class="header-anchor" href="#_12-10-xml-数据格式"><span>12.10 XML 数据格式</span></a></h1>
<p>下面是与 <RouteLink to="/chapter-3/12.9.html">12.9 节</RouteLink> JSON 例子等价的 XML 版本：</p>
<div class="language-xml line-numbers-mode" data-highlighter="prismjs" data-ext="xml" data-title="xml"><pre v-pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Person</span><span class="token punctuation">></span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>FirstName</span><span class="token punctuation">></span></span>Laura<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>FirstName</span><span class="token punctuation">></span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>LastName</span><span class="token punctuation">></span></span>Lynn<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>LastName</span><span class="token punctuation">></span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Person</span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如同 <code v-pre>json</code> 包一样，也有 <code v-pre>xml.Marshal()</code> 和 <code v-pre>xml.Unmarshal()</code> 从 XML 中编码和解码数据；但这个更通用，可以从文件中读取和写入（或者任何实现了 <code v-pre>io.Reader</code> 和 <code v-pre>io.Writer</code> 接口的类型）</p>
<p>和 JSON 的方式一样，XML 数据可以序列化为结构，或者从结构反序列化为 XML 数据；这些可以在例子 15.8（<a href="examples/chapter_15/twitter_status.go">twitter_status.go</a>）中看到。</p>
<p><code v-pre>encoding</code>/<code v-pre>xml</code> 包实现了一个简单的 XML 解析器（SAX），用来解析 XML 数据内容。下面的例子说明如何使用解析器：</p>
<p>示例 12.17 <a href="examples/chapter_12/xml.go">xml.go</a>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token comment">// xml.go</span></span>
<span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"encoding/xml"</span></span>
<span class="line">	<span class="token string">"fmt"</span></span>
<span class="line">	<span class="token string">"strings"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">var</span> t<span class="token punctuation">,</span> token xml<span class="token punctuation">.</span>Token</span>
<span class="line"><span class="token keyword">var</span> err <span class="token builtin">error</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	input <span class="token operator">:=</span> <span class="token string">"&lt;Person>&lt;FirstName>Laura&lt;/FirstName>&lt;LastName>Lynn&lt;/LastName>&lt;/Person>"</span></span>
<span class="line">	inputReader <span class="token operator">:=</span> strings<span class="token punctuation">.</span><span class="token function">NewReader</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span></span>
<span class="line">	p <span class="token operator">:=</span> xml<span class="token punctuation">.</span><span class="token function">NewDecoder</span><span class="token punctuation">(</span>inputReader<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">	<span class="token keyword">for</span> t<span class="token punctuation">,</span> err <span class="token operator">=</span> p<span class="token punctuation">.</span><span class="token function">Token</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">==</span> <span class="token boolean">nil</span><span class="token punctuation">;</span> t<span class="token punctuation">,</span> err <span class="token operator">=</span> p<span class="token punctuation">.</span><span class="token function">Token</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token keyword">switch</span> token <span class="token operator">:=</span> t<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token keyword">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token keyword">case</span> xml<span class="token punctuation">.</span>StartElement<span class="token punctuation">:</span></span>
<span class="line">			name <span class="token operator">:=</span> token<span class="token punctuation">.</span>Name<span class="token punctuation">.</span>Local</span>
<span class="line">			fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Token name: %s\n"</span><span class="token punctuation">,</span> name<span class="token punctuation">)</span></span>
<span class="line">			<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> attr <span class="token operator">:=</span> <span class="token keyword">range</span> token<span class="token punctuation">.</span>Attr <span class="token punctuation">{</span></span>
<span class="line">				attrName <span class="token operator">:=</span> attr<span class="token punctuation">.</span>Name<span class="token punctuation">.</span>Local</span>
<span class="line">				attrValue <span class="token operator">:=</span> attr<span class="token punctuation">.</span>Value</span>
<span class="line">				fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"An attribute is: %s %s\n"</span><span class="token punctuation">,</span> attrName<span class="token punctuation">,</span> attrValue<span class="token punctuation">)</span></span>
<span class="line">				<span class="token comment">// ...</span></span>
<span class="line">			<span class="token punctuation">}</span></span>
<span class="line">		<span class="token keyword">case</span> xml<span class="token punctuation">.</span>EndElement<span class="token punctuation">:</span></span>
<span class="line">			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"End of token"</span><span class="token punctuation">)</span></span>
<span class="line">		<span class="token keyword">case</span> xml<span class="token punctuation">.</span>CharData<span class="token punctuation">:</span></span>
<span class="line">			content <span class="token operator">:=</span> <span class="token function">string</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span>token<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">			fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"This is the content: %v\n"</span><span class="token punctuation">,</span> content<span class="token punctuation">)</span></span>
<span class="line">			<span class="token comment">// ...</span></span>
<span class="line">		<span class="token keyword">default</span><span class="token punctuation">:</span></span>
<span class="line">			<span class="token comment">// ...</span></span>
<span class="line">		<span class="token punctuation">}</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">Token name: Person</span>
<span class="line">Token name: FirstName</span>
<span class="line">This is the content: Laura</span>
<span class="line">End of token</span>
<span class="line">Token name: LastName</span>
<span class="line">This is the content: Lynn</span>
<span class="line">End of token</span>
<span class="line">End of token</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>包中定义了若干 XML 标签类型：StartElement，Chardata（这是从开始标签到结束标签之间的实际文本），EndElement，Comment，Directive 或 ProcInst。</p>
<p>包中同样定义了一个结构解析器：<code v-pre>NewParser()</code> 方法持有一个 <code v-pre>io.Reader</code>（这里具体类型是 <code v-pre>strings.NewReader</code>）并生成一个解析器类型的对象。还有一个 <code v-pre>Token()</code> 方法返回输入流里的下一个 XML token。在输入流的结尾处，会返回 (<code v-pre>nil</code>,<code v-pre>io.EOF</code>)</p>
<p>XML 文本被循环处理直到 <code v-pre>Token()</code> 返回一个错误，因为已经到达文件尾部，再没有内容可供处理了。通过一个 type-switch 可以根据一些 XML 标签进一步处理。Chardata 中的内容只是一个 <code v-pre>[]byte</code>，通过字符串转换让其变得可读性强一些。</p>
<h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-3/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-3/12.9.html">Json 数据格式</RouteLink></li>
<li>下一节：<RouteLink to="/chapter-3/12.11.html">用 Gob 传输数据</RouteLink></li>
</ul>
</div></template>


