<template><div><h1 id="_12-9-json-数据格式" tabindex="-1"><a class="header-anchor" href="#_12-9-json-数据格式"><span>12.9 JSON 数据格式</span></a></h1>
<p>数据结构要在网络中传输或保存到文件，就必须对其编码和解码；目前存在很多编码格式：JSON，XML，gob，Google 缓冲协议等等。Go 语言支持所有这些编码格式；在后面的章节，我们将讨论前三种格式。</p>
<p>结构可能包含二进制数据，如果将其作为文本打印，那么可读性是很差的。另外结构内部可能包含匿名字段，而不清楚数据的用意。</p>
<p>通过把数据转换成纯文本，使用命名的字段来标注，让其具有可读性。这样的数据格式可以通过网络传输，而且是与平台无关的，任何类型的应用都能够读取和输出，不与操作系统和编程语言的类型相关。</p>
<p>下面是一些术语说明：</p>
<ul>
<li>数据结构 --&gt; 指定格式 = <strong>序列化</strong> 或 <strong>编码</strong>（传输之前）</li>
<li>指定格式 --&gt; 数据结构 = <strong>反序列化</strong> 或 <strong>解码</strong>（传输之后）</li>
</ul>
<p>序列化是在内存中把数据转换成指定格式（数据 -&gt; 字符串），反之亦然（字符串 -&gt; 数据）。</p>
<p>编码也是一样的，只是输出一个数据流（实现了 <code v-pre>io.Writer</code> 接口）；解码是从一个数据流（实现了 <code v-pre>io.Reader</code>）输出到一个数据结构。</p>
<p>我们都比较熟悉 XML 格式(参阅 <RouteLink to="/chapter-3/12.9.html">12.10</RouteLink>)；但有些时候 JSON（JavaScript Object Notation，参阅 <a href="http://json.org" target="_blank" rel="noopener noreferrer">http://json.org</a>）被作为首选，主要是由于其格式上非常简洁。通常 JSON 被用于 web 后端和浏览器之间的通讯，但是在其它场景也同样的有用。</p>
<p>这是一个简短的 JSON 片段：</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token string-property property">"Person"</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token string-property property">"FirstName"</span><span class="token operator">:</span> <span class="token string">"Laura"</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string-property property">"LastName"</span><span class="token operator">:</span> <span class="token string">"Lynn"</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>尽管 XML 被广泛的应用，但是 JSON 更加简洁、轻量（占用更少的内存、磁盘及网络带宽）和更好的可读性，这也使它越来越受欢迎。</p>
<p>Go 语言的 <code v-pre>json</code> 包可以让你在程序中方便的读取和写入 JSON 数据。</p>
<p>我们将在下面的例子里使用 <code v-pre>json</code> 包，并使用练习 10.1 <a href="exercises/chapter_10/vcard.go">vcard.go</a> 中一个简化版本的 <code v-pre>Address</code> 和 <code v-pre>VCard</code> 结构（为了简单起见，我们忽略了很多错误处理，不过在实际应用中你必须要合理的处理这些错误，参阅 <RouteLink to="/chapter-3/13.0.html">13 章</RouteLink>）。</p>
<p>示例 12.16 <a href="examples/chapter_12/json.go">json.go</a>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token comment">// json.go</span></span>
<span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"encoding/json"</span></span>
<span class="line">	<span class="token string">"fmt"</span></span>
<span class="line">	<span class="token string">"log"</span></span>
<span class="line">	<span class="token string">"os"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">type</span> Address <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">	Type    <span class="token builtin">string</span></span>
<span class="line">	City    <span class="token builtin">string</span></span>
<span class="line">	Country <span class="token builtin">string</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">type</span> VCard <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">	FirstName <span class="token builtin">string</span></span>
<span class="line">	LastName  <span class="token builtin">string</span></span>
<span class="line">	Addresses <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span>Address</span>
<span class="line">	Remark    <span class="token builtin">string</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	pa <span class="token operator">:=</span> <span class="token operator">&amp;</span>Address<span class="token punctuation">{</span><span class="token string">"private"</span><span class="token punctuation">,</span> <span class="token string">"Aartselaar"</span><span class="token punctuation">,</span> <span class="token string">"Belgium"</span><span class="token punctuation">}</span></span>
<span class="line">	wa <span class="token operator">:=</span> <span class="token operator">&amp;</span>Address<span class="token punctuation">{</span><span class="token string">"work"</span><span class="token punctuation">,</span> <span class="token string">"Boom"</span><span class="token punctuation">,</span> <span class="token string">"Belgium"</span><span class="token punctuation">}</span></span>
<span class="line">	vc <span class="token operator">:=</span> VCard<span class="token punctuation">{</span><span class="token string">"Jan"</span><span class="token punctuation">,</span> <span class="token string">"Kersschot"</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span>Address<span class="token punctuation">{</span>pa<span class="token punctuation">,</span> wa<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">"none"</span><span class="token punctuation">}</span></span>
<span class="line">	<span class="token comment">// fmt.Printf("%v: \n", vc) // {Jan Kersschot [0x126d2b80 0x126d2be0] none}:</span></span>
<span class="line">	<span class="token comment">// JSON format:</span></span>
<span class="line">	js<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> json<span class="token punctuation">.</span><span class="token function">Marshal</span><span class="token punctuation">(</span>vc<span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"JSON format: %s"</span><span class="token punctuation">,</span> js<span class="token punctuation">)</span></span>
<span class="line">	<span class="token comment">// using an encoder:</span></span>
<span class="line">	file<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">OpenFile</span><span class="token punctuation">(</span><span class="token string">"vcard.json"</span><span class="token punctuation">,</span> os<span class="token punctuation">.</span>O_CREATE<span class="token operator">|</span>os<span class="token punctuation">.</span>O_WRONLY<span class="token punctuation">,</span> <span class="token number">0666</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">defer</span> file<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	enc <span class="token operator">:=</span> json<span class="token punctuation">.</span><span class="token function">NewEncoder</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span></span>
<span class="line">	err <span class="token operator">:=</span> enc<span class="token punctuation">.</span><span class="token function">Encode</span><span class="token punctuation">(</span>vc<span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">		log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Error in encoding json"</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>json.Marshal()</code> 的函数签名是 <code v-pre>func Marshal(v interface{}) ([]byte, error)</code>，下面是数据编码后的 JSON 文本（实际上是一个 <code v-pre>[]byte</code>）：</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token string-property property">"FirstName"</span><span class="token operator">:</span> <span class="token string">"Jan"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token string-property property">"LastName"</span><span class="token operator">:</span> <span class="token string">"Kersschot"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token string-property property">"Addresses"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span></span>
<span class="line">        <span class="token string-property property">"Type"</span><span class="token operator">:</span> <span class="token string">"private"</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string-property property">"City"</span><span class="token operator">:</span> <span class="token string">"Aartselaar"</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string-property property">"Country"</span><span class="token operator">:</span> <span class="token string">"Belgium"</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token string-property property">"Type"</span><span class="token operator">:</span> <span class="token string">"work"</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string-property property">"City"</span><span class="token operator">:</span> <span class="token string">"Boom"</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string-property property">"Country"</span><span class="token operator">:</span> <span class="token string">"Belgium"</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token string-property property">"Remark"</span><span class="token operator">:</span> <span class="token string">"none"</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>出于安全考虑，在 web 应用中最好使用 <code v-pre>json.MarshalforHTML()</code> 函数，其对数据执行 HTML 转码，所以文本可以被安全地嵌在 HTML <code v-pre>&lt;script&gt;</code> 标签中。</p>
<p><code v-pre>json.NewEncoder()</code> 的函数签名是 <code v-pre>func NewEncoder(w io.Writer) *Encoder</code>，返回的 <code v-pre>Encoder</code> 类型的指针可调用方法 <code v-pre>Encode(v interface{})</code>，将数据对象 <code v-pre>v</code> 的 json 编码写入 <code v-pre>io.Writer</code> <code v-pre>w</code> 中。</p>
<p>JSON 与 Go 类型对应如下：</p>
<ul>
<li><code v-pre>bool</code> 对应 JSON 的 boolean</li>
<li><code v-pre>float64</code> 对应 JSON 的 number</li>
<li><code v-pre>string</code> 对应 JSON 的 string</li>
<li><code v-pre>nil</code> 对应 JSON 的 null</li>
</ul>
<p>不是所有的数据都可以编码为 JSON 类型，只有验证通过的数据结构才能被编码：</p>
<ul>
<li>JSON 对象只支持字符串类型的 key；要编码一个 Go <code v-pre>map</code> 类型，<code v-pre>map</code> 必须是 <code v-pre>map[string]T</code>（<code v-pre>T</code> 是 <code v-pre>json</code> 包中支持的任何类型）</li>
<li>Channel，复杂类型和函数类型不能被编码</li>
<li>不支持循环数据结构；它将引起序列化进入一个无限循环</li>
<li>指针可以被编码，实际上是对指针指向的值进行编码（或者指针是 <code v-pre>nil</code>）</li>
</ul>
<h3 id="反序列化" tabindex="-1"><a class="header-anchor" href="#反序列化"><span>反序列化：</span></a></h3>
<p><code v-pre>json.Unmarshal()</code> 的函数签名是 <code v-pre>func Unmarshal(data []byte, v interface{}) error</code> 把 JSON 解码为数据结构。</p>
<p>示例 12.16 中对 <code v-pre>vc</code> 编码后的数据为 <code v-pre>js</code> ，对其解码时，我们首先创建结构 <code v-pre>VCard</code> 用来保存解码的数据：<code v-pre>var v VCard</code> 并调用 <code v-pre>json.Unmarshal(js, &amp;v)</code>，解析 <code v-pre>[]byte</code> 中的 JSON 数据并将结果存入指针 <code v-pre>&amp;v</code> 指向的值。</p>
<p>虽然反射能够让 JSON 字段去尝试匹配目标结构字段；但是只有真正匹配上的字段才会填充数据。字段没有匹配不会报错，而是直接忽略掉。</p>
<p>（练习 15.2b <a href="exercises/chapter_15/twitter_status_json.go">twitter_status_json.go</a> 中用到了 <code v-pre>Unmarshal()</code>）</p>
<h3 id="解码任意的数据" tabindex="-1"><a class="header-anchor" href="#解码任意的数据"><span>解码任意的数据：</span></a></h3>
<p>json 包使用 <code v-pre>map[string]interface{}</code> 和 <code v-pre>[]interface{}</code> 储存任意的 JSON 对象和数组；其可以被反序列化为任何的 JSON blob 存储到接口值中。</p>
<p>来看这个 JSON 数据，被存储在变量 <code v-pre>b</code> 中：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">b <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token string">`{"Name": "Wednesday", "Age": 6, "Parents": ["Gomez", "Morticia"]}`</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>不用理解这个数据的结构，我们可以直接使用 <code v-pre>Unmarshal()</code> 把这个数据编码并保存在接口值中：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">var</span> f <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="line">err <span class="token operator">:=</span> json<span class="token punctuation">.</span><span class="token function">Unmarshal</span><span class="token punctuation">(</span>b<span class="token punctuation">,</span> <span class="token operator">&amp;</span>f<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>f 指向的值是一个 <code v-pre>map</code>，key 是一个字符串，value 是自身存储作为空接口类型的值：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token string">"Name"</span><span class="token punctuation">:</span> <span class="token string">"Wednesday"</span><span class="token punctuation">,</span></span>
<span class="line">	<span class="token string">"Age"</span><span class="token punctuation">:</span>  <span class="token number">6</span><span class="token punctuation">,</span></span>
<span class="line">	<span class="token string">"Parents"</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token string">"Gomez"</span><span class="token punctuation">,</span></span>
<span class="line">		<span class="token string">"Morticia"</span><span class="token punctuation">,</span></span>
<span class="line">	<span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>要访问这个数据，我们可以使用类型断言</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">m <span class="token operator">:=</span> f<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>我们可以通过 for range 语法和 type switch 来访问其实际类型：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">for</span> k<span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> m <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">switch</span> vv <span class="token operator">:=</span> v<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token keyword">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">case</span> <span class="token builtin">string</span><span class="token punctuation">:</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>k<span class="token punctuation">,</span> <span class="token string">"is string"</span><span class="token punctuation">,</span> vv<span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">case</span> <span class="token builtin">int</span><span class="token punctuation">:</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>k<span class="token punctuation">,</span> <span class="token string">"is int"</span><span class="token punctuation">,</span> vv<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">	<span class="token keyword">case</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">:</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>k<span class="token punctuation">,</span> <span class="token string">"is an array:"</span><span class="token punctuation">)</span></span>
<span class="line">		<span class="token keyword">for</span> i<span class="token punctuation">,</span> u <span class="token operator">:=</span> <span class="token keyword">range</span> vv <span class="token punctuation">{</span></span>
<span class="line">			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> u<span class="token punctuation">)</span></span>
<span class="line">		<span class="token punctuation">}</span></span>
<span class="line">	<span class="token keyword">default</span><span class="token punctuation">:</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>k<span class="token punctuation">,</span> <span class="token string">"is of a type I don’t know how to handle"</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过这种方式，你可以处理未知的 JSON 数据，同时可以确保类型安全。</p>
<h3 id="解码数据到结构" tabindex="-1"><a class="header-anchor" href="#解码数据到结构"><span>解码数据到结构</span></a></h3>
<p>如果我们事先知道 JSON 数据，我们可以定义一个适当的结构并对 JSON 数据反序列化。下面的例子中，我们将定义：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">type</span> FamilyMember <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">	Name    <span class="token builtin">string</span></span>
<span class="line">	Age     <span class="token builtin">int</span></span>
<span class="line">	Parents <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>并对其反序列化：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">var</span> m FamilyMember</span>
<span class="line">err <span class="token operator">:=</span> json<span class="token punctuation">.</span><span class="token function">Unmarshal</span><span class="token punctuation">(</span>b<span class="token punctuation">,</span> <span class="token operator">&amp;</span>m<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>程序实际上是分配了一个新的切片。这是一个典型的反序列化引用类型（指针、切片和 <code v-pre>map</code>）的例子。</p>
<h3 id="编码和解码流" tabindex="-1"><a class="header-anchor" href="#编码和解码流"><span>编码和解码流</span></a></h3>
<p><code v-pre>json</code> 包提供 <code v-pre>Decoder</code> 和 <code v-pre>Encoder</code> 类型来支持常用 JSON 数据流读写。<code v-pre>NewDecoder()</code> 和 <code v-pre>NewEncoder()</code> 函数分别封装了 <code v-pre>io.Reader</code> 和 <code v-pre>io.Writer</code> 接口。</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">NewDecoder</span><span class="token punctuation">(</span>r io<span class="token punctuation">.</span>Reader<span class="token punctuation">)</span> <span class="token operator">*</span>Decoder</span>
<span class="line"><span class="token keyword">func</span> <span class="token function">NewEncoder</span><span class="token punctuation">(</span>w io<span class="token punctuation">.</span>Writer<span class="token punctuation">)</span> <span class="token operator">*</span>Encoder</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>要想把 JSON 直接写入文件，可以使用 <code v-pre>json.NewEncoder</code> 初始化文件（或者任何实现 <code v-pre>io.Writer</code> 的类型），并调用 <code v-pre>Encode()</code>；反过来与其对应的是使用 <code v-pre>json.NewDecoder</code> 和 <code v-pre>Decode()</code> 函数：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">NewDecoder</span><span class="token punctuation">(</span>r io<span class="token punctuation">.</span>Reader<span class="token punctuation">)</span> <span class="token operator">*</span>Decoder</span>
<span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>dec <span class="token operator">*</span>Decoder<span class="token punctuation">)</span> <span class="token function">Decode</span><span class="token punctuation">(</span>v <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token builtin">error</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>来看下接口是如何对实现进行抽象的：数据结构可以是任何类型，只要其实现了某种接口，目标或源数据要能够被编码就必须实现 <code v-pre>io.Writer</code> 或 <code v-pre>io.Reader</code> 接口。由于 Go 语言中到处都实现了 Reader 和 Writer，因此 <code v-pre>Encoder</code> 和 <code v-pre>Decoder</code> 可被应用的场景非常广泛，例如读取或写入 HTTP 连接、websockets 或文件。</p>
<h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-3/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-3/12.8.html">使用接口的实际例子:fmt.Fprintf</RouteLink></li>
<li>下一节：<RouteLink to="/chapter-3/12.10.html">XML 数据格式</RouteLink></li>
</ul>
</div></template>


