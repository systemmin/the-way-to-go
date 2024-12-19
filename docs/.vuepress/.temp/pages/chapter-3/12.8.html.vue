<template><div><h1 id="_12-8-使用接口的实际例子-fmt-fprintf" tabindex="-1"><a class="header-anchor" href="#_12-8-使用接口的实际例子-fmt-fprintf"><span>12.8 使用接口的实际例子：fmt.Fprintf</span></a></h1>
<p>例子程序 <code v-pre>io_interfaces.go</code> 很好的阐述了 <code v-pre>io</code> 包中的接口概念。</p>
<p>示例 12.15 <a href="examples/chapter_12/io_interfaces.go">io_interfaces.go</a>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token comment">// interfaces being used in the GO-package fmt</span></span>
<span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"bufio"</span></span>
<span class="line">	<span class="token string">"fmt"</span></span>
<span class="line">	<span class="token string">"os"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token comment">// unbuffered</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Fprintf</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">,</span> <span class="token string">"%s\n"</span><span class="token punctuation">,</span> <span class="token string">"hello world! - unbuffered"</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token comment">// buffered: os.Stdout implements io.Writer</span></span>
<span class="line">	buf <span class="token operator">:=</span> bufio<span class="token punctuation">.</span><span class="token function">NewWriter</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">)</span></span>
<span class="line">	<span class="token comment">// and now so does buf.</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Fprintf</span><span class="token punctuation">(</span>buf<span class="token punctuation">,</span> <span class="token string">"%s\n"</span><span class="token punctuation">,</span> <span class="token string">"hello world! - buffered"</span><span class="token punctuation">)</span></span>
<span class="line">	buf<span class="token punctuation">.</span><span class="token function">Flush</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">hello world! - unbuffered</span>
<span class="line">hello world! - buffered</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>下面是 <code v-pre>fmt.Fprintf()</code> 函数的实际签名</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">Fprintf</span><span class="token punctuation">(</span>w io<span class="token punctuation">.</span>Writer<span class="token punctuation">,</span> format <span class="token builtin">string</span><span class="token punctuation">,</span> a <span class="token operator">...</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>n <span class="token builtin">int</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>不是写入一个文件，而是写入一个 <code v-pre>io.Writer</code> 接口类型的变量，下面是 <code v-pre>Writer</code> 接口在 <code v-pre>io</code> 包中的定义：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">type</span> Writer <span class="token keyword">interface</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token function">Write</span><span class="token punctuation">(</span>p <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>n <span class="token builtin">int</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>fmt.Fprintf()</code> 依据指定的格式向第一个参数内写入字符串，第一个参数必须实现了 <code v-pre>io.Writer</code> 接口。<code v-pre>Fprintf()</code> 能够写入任何类型，只要其实现了 <code v-pre>Write</code> 方法，包括 <code v-pre>os.Stdout</code>，文件（例如 <code v-pre>os.File</code>），管道，网络连接，通道等等。同样地，也可以使用 <code v-pre>bufio</code> 包中缓冲写入。<code v-pre>bufio</code> 包中定义了 <code v-pre>type Writer struct{...}</code> 。</p>
<p><code v-pre>bufio.Writer</code> 实现了 <code v-pre>Write()</code> 方法：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>b <span class="token operator">*</span>Writer<span class="token punctuation">)</span> <span class="token function">Write</span><span class="token punctuation">(</span>p <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>nn <span class="token builtin">int</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>它还有一个工厂函数：传给它一个 <code v-pre>io.Writer</code> 类型的参数，它会返回一个带缓冲的 <code v-pre>bufio.Writer</code> 类型的 <code v-pre>io.Writer</code> ：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">NewWriter</span><span class="token punctuation">(</span>wr io<span class="token punctuation">.</span>Writer<span class="token punctuation">)</span> <span class="token punctuation">(</span>b <span class="token operator">*</span>Writer<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>适合任何形式的缓冲写入。</p>
<p>在缓冲写入的最后千万不要忘了使用 <code v-pre>Flush()</code>，否则最后的输出不会被写入。</p>
<p>在 <RouteLink to="/chapter-3/15.2.html">15.2</RouteLink>-<RouteLink to="/chapter-3/15.8.html">15.8</RouteLink> 章节，我们将使用 <code v-pre>fmt.Fprint()</code> 函数向 <code v-pre>http.ResponseWriter</code> 写入，其同样实现了 <code v-pre>io.Writer</code> 接口。</p>
<p><strong>练习 12.7</strong>：<a href="exercises/chapter_12/remove_3till5char.go">remove_3till5char.go</a></p>
<p>下面的代码有一个输入文件 <code v-pre>goprogram</code>，然后以每一行为单位读取，从读取的当前行中截取第 3 到第 5 的字节写入另一个文件。然而当你运行这个程序，输出的文件却是个空文件。找出程序逻辑中的 bug，修正它并测试。</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"bufio"</span></span>
<span class="line">	<span class="token string">"fmt"</span></span>
<span class="line">	<span class="token string">"os"</span></span>
<span class="line">	<span class="token string">"io"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	inputFile<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span><span class="token string">"goprogram"</span><span class="token punctuation">)</span></span>
<span class="line">	outputFile<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">OpenFile</span><span class="token punctuation">(</span><span class="token string">"goprogramT"</span><span class="token punctuation">,</span> os<span class="token punctuation">.</span>O_WRONLY<span class="token operator">|</span>os<span class="token punctuation">.</span>O_CREATE<span class="token punctuation">,</span> <span class="token number">0666</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">defer</span> inputFile<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">defer</span> outputFile<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	inputReader <span class="token operator">:=</span> bufio<span class="token punctuation">.</span><span class="token function">NewReader</span><span class="token punctuation">(</span>inputFile<span class="token punctuation">)</span></span>
<span class="line">	outputWriter <span class="token operator">:=</span> bufio<span class="token punctuation">.</span><span class="token function">NewWriter</span><span class="token punctuation">(</span>outputFile<span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">for</span> <span class="token punctuation">{</span></span>
<span class="line">		inputString<span class="token punctuation">,</span> <span class="token boolean">_</span><span class="token punctuation">,</span> readerError <span class="token operator">:=</span> inputReader<span class="token punctuation">.</span><span class="token function">ReadLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">		<span class="token keyword">if</span> readerError <span class="token operator">==</span> io<span class="token punctuation">.</span>EOF <span class="token punctuation">{</span></span>
<span class="line">			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"EOF"</span><span class="token punctuation">)</span></span>
<span class="line">			<span class="token keyword">return</span></span>
<span class="line">		<span class="token punctuation">}</span></span>
<span class="line">		outputString <span class="token operator">:=</span> <span class="token function">string</span><span class="token punctuation">(</span>inputString<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">:</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">"\r\n"</span></span>
<span class="line">		<span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">:=</span> outputWriter<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span>outputString<span class="token punctuation">)</span></span>
<span class="line">		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span></span>
<span class="line">			<span class="token keyword">return</span></span>
<span class="line">		<span class="token punctuation">}</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Conversion done"</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-3/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-3/12.7.html">用 defer 关闭文件</RouteLink></li>
<li>下一节：<RouteLink to="/chapter-3/12.9.html">格式化 JSON 数据</RouteLink></li>
</ul>
</div></template>


