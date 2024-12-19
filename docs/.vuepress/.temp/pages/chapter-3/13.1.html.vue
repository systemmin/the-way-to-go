<template><div><h1 id="_13-1-错误处理" tabindex="-1"><a class="header-anchor" href="#_13-1-错误处理"><span>13.1 错误处理</span></a></h1>
<p>Go 有一个预先定义的 error 接口类型</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">type</span> <span class="token builtin">error</span> <span class="token keyword">interface</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>错误值用来表示异常状态；我们可以在 <RouteLink to="/chapter-3/05.2.html">5.2 节</RouteLink>中看到它的标准用法。处理文件操作的例子可以在 <RouteLink to="/chapter-3/12.0.html">12 章</RouteLink>找到；我们将在 <RouteLink to="/chapter-3/15.0.html">15 章</RouteLink>看到网络操作的例子。<code v-pre>errors</code> 包中有一个 <code v-pre>errorString</code> 结构体实现了 <code v-pre>error</code> 接口。当程序处于错误状态时可以用 <code v-pre>os.Exit(1)</code> 来中止运行。</p>
<h2 id="_13-1-1-定义错误" tabindex="-1"><a class="header-anchor" href="#_13-1-1-定义错误"><span>13.1.1 定义错误</span></a></h2>
<p>任何时候当你需要一个新的错误类型，都可以用 <code v-pre>errors</code> 包（必须先 <code v-pre>import</code>）的 <code v-pre>errors.New()</code> 函数接收合适的错误信息来创建，像下面这样：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">err <span class="token operator">:=</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">"math - square root of negative number"</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>在示例 13.1 中你可以看到一个简单的用例：</p>
<p>示例 13.1 <a href="examples/chapter_13/errors.go">errors.go</a>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token comment">// errors.go</span></span>
<span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"errors"</span></span>
<span class="line">	<span class="token string">"fmt"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">var</span> errNotFound <span class="token builtin">error</span> <span class="token operator">=</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">"Not found error"</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"error: %v"</span><span class="token punctuation">,</span> errNotFound<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token comment">// error: Not found error</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以把它用于计算平方根函数的参数测试：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">Sqrt</span><span class="token punctuation">(</span>f <span class="token builtin">float64</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">float64</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">if</span> f <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">,</span> errors<span class="token punctuation">.</span>New <span class="token punctuation">(</span><span class="token string">"math - square root of negative number"</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">   <span class="token comment">// implementation of Sqrt</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你可以像下面这样调用 <code v-pre>Sqrt()</code> 函数：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">if</span> f<span class="token punctuation">,</span> err <span class="token operator">:=</span> <span class="token function">Sqrt</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Error: %s\n"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于 <code v-pre>fmt.Printf</code> 会自动调用 <code v-pre>String()</code> 方法 （参见 <RouteLink to="/chapter-3/10.7.html">10.7 节</RouteLink>），所以错误信息 “<code v-pre>Error: math - square root of negative number</code>” 会打印出来。通常（错误信息）都会有像 <code v-pre>Error:...</code> 这样的前缀，所以你的错误信息不要以大写字母开头（注：英文只有句首单词首字母大写，这里应当是考虑到这一点）。</p>
<p>在大部分情况下自定义错误结构类型很有意义的，可以包含除了（低层级的）错误信息以外的其它有用信息，例如，正在进行的操作（打开文件等），全路径或名字。看下面例子中 <code v-pre>os.Open()</code> 操作触发的 <code v-pre>PathError</code> 错误：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token comment">// PathError records an error and the operation and file path that caused it.</span></span>
<span class="line"><span class="token keyword">type</span> PathError <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">	Op <span class="token builtin">string</span>    <span class="token comment">// "open", "unlink", etc.</span></span>
<span class="line">	Path <span class="token builtin">string</span>  <span class="token comment">// The associated file.</span></span>
<span class="line">	Err <span class="token builtin">error</span>  <span class="token comment">// Returned by the system call.</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>e <span class="token operator">*</span>PathError<span class="token punctuation">)</span> <span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">return</span> e<span class="token punctuation">.</span>Op <span class="token operator">+</span> <span class="token string">" "</span> <span class="token operator">+</span> e<span class="token punctuation">.</span>Path <span class="token operator">+</span> <span class="token string">": "</span><span class="token operator">+</span> e<span class="token punctuation">.</span>Err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果有不同错误条件可能发生，那么对实际的错误使用类型断言或类型判断（type-switch）是很有用的，并且可以根据错误场景做一些补救和恢复操作。</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token comment">//  err != nil</span></span>
<span class="line"><span class="token keyword">if</span> e<span class="token punctuation">,</span> ok <span class="token operator">:=</span> err<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token operator">*</span>os<span class="token punctuation">.</span>PathError<span class="token punctuation">)</span><span class="token punctuation">;</span> ok <span class="token punctuation">{</span></span>
<span class="line">	<span class="token comment">// remedy situation</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">switch</span> err <span class="token operator">:=</span> err<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token keyword">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">case</span> ParseError<span class="token punctuation">:</span></span>
<span class="line">		<span class="token function">PrintParseError</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">case</span> PathError<span class="token punctuation">:</span></span>
<span class="line">		<span class="token function">PrintPathError</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span></span>
<span class="line">	<span class="token operator">...</span></span>
<span class="line">	<span class="token keyword">default</span><span class="token punctuation">:</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Not a special error, just %s\n"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>作为第二个例子考虑用 <code v-pre>json</code> 包的情况。当 <code v-pre>json.Decode()</code> 在解析 JSON 文档发生语法错误时，指定返回一个 <code v-pre>SyntaxError</code> 类型的错误：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">type</span> SyntaxError <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">	msg    <span class="token builtin">string</span> <span class="token comment">// description of error</span></span>
<span class="line"><span class="token comment">// error occurred after reading Offset bytes, from which line and columnnr can be obtained</span></span>
<span class="line">	Offset <span class="token builtin">int64</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>e <span class="token operator">*</span>SyntaxError<span class="token punctuation">)</span> <span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> e<span class="token punctuation">.</span>msg <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在调用代码中你可以像这样用类型断言测试错误是不是上面的类型：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">if</span> serr<span class="token punctuation">,</span> ok <span class="token operator">:=</span> err<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token operator">*</span>json<span class="token punctuation">.</span>SyntaxError<span class="token punctuation">)</span><span class="token punctuation">;</span> ok <span class="token punctuation">{</span></span>
<span class="line">	line<span class="token punctuation">,</span> col <span class="token operator">:=</span> <span class="token function">findLine</span><span class="token punctuation">(</span>f<span class="token punctuation">,</span> serr<span class="token punctuation">.</span>Offset<span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"%s:%d:%d: %v"</span><span class="token punctuation">,</span> f<span class="token punctuation">.</span><span class="token function">Name</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> line<span class="token punctuation">,</span> col<span class="token punctuation">,</span> err<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>包也可以用额外的方法 (methods)定义特定的错误，比如 <code v-pre>net.Error</code>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> net</span>
<span class="line"><span class="token keyword">type</span> Error <span class="token keyword">interface</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token function">Timeout</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">bool</span>   <span class="token comment">// Is the error a timeout?</span></span>
<span class="line">	<span class="token function">Temporary</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token comment">// Is the error temporary?</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 <RouteLink to="/chapter-3/15.1.html">15.1 节</RouteLink> 我们可以看到怎么使用它。</p>
<p>正如你所看到的一样，所有的例子都遵循同一种命名规范：错误类型以 <code v-pre>...Error</code> 结尾，错误变量以 <code v-pre>err...</code> 或 <code v-pre>Err...</code> 开头或者直接叫 <code v-pre>err</code> 或 <code v-pre>Err</code>。</p>
<p><code v-pre>syscall</code> 是低阶外部包，用来提供系统基本调用的原始接口。它们返回封装整数类型错误码的 <code v-pre>syscall.Errno</code>；类型 <code v-pre>syscall.Errno</code> 实现了 <code v-pre>Error</code> 接口。</p>
<p>大部分 <code v-pre>syscall</code> 函数都返回一个结果和可能的错误，比如：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">r<span class="token punctuation">,</span> err <span class="token operator">:=</span> syscall<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> mode<span class="token punctuation">,</span> perm<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>os</code> 包也提供了一套像 <code v-pre>os.EINAL</code> 这样的标准错误，它们基于 <code v-pre>syscall</code> 错误：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">var</span> <span class="token punctuation">(</span></span>
<span class="line">	EPERM		Error <span class="token operator">=</span> <span class="token function">Errno</span><span class="token punctuation">(</span>syscall<span class="token punctuation">.</span>EPERM<span class="token punctuation">)</span></span>
<span class="line">	ENOENT		Error <span class="token operator">=</span> <span class="token function">Errno</span><span class="token punctuation">(</span>syscall<span class="token punctuation">.</span>ENOENT<span class="token punctuation">)</span></span>
<span class="line">	ESRCH		Error <span class="token operator">=</span> <span class="token function">Errno</span><span class="token punctuation">(</span>syscall<span class="token punctuation">.</span>ESRCH<span class="token punctuation">)</span></span>
<span class="line">	EINTR		Error <span class="token operator">=</span> <span class="token function">Errno</span><span class="token punctuation">(</span>syscall<span class="token punctuation">.</span>EINTR<span class="token punctuation">)</span></span>
<span class="line">	EIO			Error <span class="token operator">=</span> <span class="token function">Errno</span><span class="token punctuation">(</span>syscall<span class="token punctuation">.</span>EIO<span class="token punctuation">)</span></span>
<span class="line">	<span class="token operator">...</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_13-1-2-用-fmt-创建错误对象" tabindex="-1"><a class="header-anchor" href="#_13-1-2-用-fmt-创建错误对象"><span>13.1.2 用 fmt 创建错误对象</span></a></h2>
<p>通常你想要返回包含错误参数的更有信息量的字符串，例如：可以用 <code v-pre>fmt.Errorf()</code> 来实现：它和 <code v-pre>fmt.Printf()</code> 完全一样，接收一个或多个格式占位符的格式化字符串和相应数量的占位变量。和打印信息不同的是它用信息生成错误对象。</p>
<p>比如在前面的平方根例子中使用：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">if</span> f <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">,</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"math: square root of negative number %g"</span><span class="token punctuation">,</span> f<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第二个例子：从命令行读取输入时，如果加了 <code v-pre>--help</code> 或 <code v-pre>-h</code> 标志，我们可以用有用的信息产生一个错误：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Args<span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">1</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>os<span class="token punctuation">.</span>Args<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token string">"-h"</span> <span class="token operator">||</span> os<span class="token punctuation">.</span>Args<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token string">"--help"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	err <span class="token operator">=</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"usage: %s infile.txt outfile.txt"</span><span class="token punctuation">,</span> filepath<span class="token punctuation">.</span><span class="token function">Base</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Args<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">return</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-3/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-3/13.0.html">错误处理与测试</RouteLink></li>
<li>下一节：<RouteLink to="/chapter-3/13.2.html">运行时异常和 panic</RouteLink></li>
</ul>
</div></template>


