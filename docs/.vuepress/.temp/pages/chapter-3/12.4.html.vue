<template><div><h1 id="_12-4-从命令行读取参数" tabindex="-1"><a class="header-anchor" href="#_12-4-从命令行读取参数"><span>12.4 从命令行读取参数</span></a></h1>
<h2 id="_12-4-1-os-包" tabindex="-1"><a class="header-anchor" href="#_12-4-1-os-包"><span>12.4.1 os 包</span></a></h2>
<p><code v-pre>os</code> 包中有一个 <code v-pre>string</code> 类型的切片变量 <code v-pre>os.Args</code>，用来处理一些基本的命令行参数，它在程序启动后读取命令行输入的参数。来看下面的打招呼程序：</p>
<p>示例 12.11 <a href="examples/chapter_12/os_args.go">os_args.go</a>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token comment">// os_args.go</span></span>
<span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"fmt"</span></span>
<span class="line">	<span class="token string">"os"</span></span>
<span class="line">	<span class="token string">"strings"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	who <span class="token operator">:=</span> <span class="token string">"Alice "</span></span>
<span class="line">	<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Args<span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">1</span> <span class="token punctuation">{</span></span>
<span class="line">		who <span class="token operator">+=</span> strings<span class="token punctuation">.</span><span class="token function">Join</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Args<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">:</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string">" "</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Good Morning"</span><span class="token punctuation">,</span> who<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们在 IDE 或编辑器中直接运行这个程序输出：<code v-pre>Good Morning Alice</code></p>
<p>我们在命令行运行 <code v-pre>os_args</code> 或 <code v-pre>./os_args</code> 会得到同样的结果。</p>
<p>但是我们在命令行加入参数，像这样：<code v-pre>os_args John Bill Marc Luke</code>，将得到这样的输出：<code v-pre>Good Morning Alice John Bill Marc Luke</code></p>
<p>这个命令行参数会放置在切片 <code v-pre>os.Args[]</code> 中（以空格分隔），从索引 1 开始（<code v-pre>os.Args[0]</code> 放的是程序本身的名字，在本例中是 <code v-pre>os_args</code>）。函数 <code v-pre>strings.Join</code> 以空格为间隔连接这些参数。</p>
<p><strong>练习 12.5</strong>：<a href="exercises/chapter_12/hello_who.go">hello_who.go</a></p>
<p>写一个“Hello World”的变种程序：把人的名字作为程序命令行执行的一个参数，比如： <code v-pre>hello_who Evan Michael Laura</code> 那么会输出 <code v-pre>Hello Evan Michael Laura!</code></p>
<h2 id="_12-4-2-flag-包" tabindex="-1"><a class="header-anchor" href="#_12-4-2-flag-包"><span>12.4.2 flag 包</span></a></h2>
<p><code v-pre>flag</code> 包有一个扩展功能用来解析命令行选项。但是通常被用来替换基本常量，例如，在某些情况下我们希望在命令行给常量一些不一样的值。（参看 <RouteLink to="/chapter-3/19.0.html">19 章</RouteLink>的项目）</p>
<p>在 <code v-pre>flag</code> 包中有一个 <code v-pre>Flag</code> 是被定义成一个含有如下字段的结构体：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">type</span> Flag <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">	Name     <span class="token builtin">string</span> <span class="token comment">// name as it appears on command line</span></span>
<span class="line">	Usage    <span class="token builtin">string</span> <span class="token comment">// help message</span></span>
<span class="line">	Value    Value  <span class="token comment">// value as set</span></span>
<span class="line">	DefValue <span class="token builtin">string</span> <span class="token comment">// default value (as text); for usage message</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面的程序 <a href="examples/chapter_12/echo.go">echo.go</a> 模拟了 Unix 的 echo 功能：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"flag"</span> <span class="token comment">// command line option parser</span></span>
<span class="line">	<span class="token string">"os"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">var</span> NewLine <span class="token operator">=</span> flag<span class="token punctuation">.</span><span class="token function">Bool</span><span class="token punctuation">(</span><span class="token string">"n"</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token string">"print newline"</span><span class="token punctuation">)</span> <span class="token comment">// echo -n flag, of type *bool</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> <span class="token punctuation">(</span></span>
<span class="line">	Space   <span class="token operator">=</span> <span class="token string">" "</span></span>
<span class="line">	Newline <span class="token operator">=</span> <span class="token string">"\n"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	flag<span class="token punctuation">.</span><span class="token function">PrintDefaults</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	flag<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// Scans the arg list and sets up flags</span></span>
<span class="line">	<span class="token keyword">var</span> s <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token string">""</span></span>
<span class="line">	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> flag<span class="token punctuation">.</span><span class="token function">NArg</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token keyword">if</span> i <span class="token operator">></span> <span class="token number">0</span> <span class="token punctuation">{</span></span>
<span class="line">			s <span class="token operator">+=</span> <span class="token string">" "</span></span>
<span class="line">			<span class="token keyword">if</span> <span class="token operator">*</span>NewLine <span class="token punctuation">{</span> <span class="token comment">// -n is parsed, flag becomes true</span></span>
<span class="line">				s <span class="token operator">+=</span> Newline</span>
<span class="line">			<span class="token punctuation">}</span></span>
<span class="line">		<span class="token punctuation">}</span></span>
<span class="line">		s <span class="token operator">+=</span> flag<span class="token punctuation">.</span><span class="token function">Arg</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	os<span class="token punctuation">.</span>Stdout<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>flag.Parse()</code> 扫描参数列表（或者常量列表）并设置 flag, <code v-pre>flag.Arg(i)</code> 表示第 i 个参数。<code v-pre>Parse()</code> 之后 <code v-pre>flag.Arg(i)</code> 全部可用，<code v-pre>flag.Arg(0)</code> 就是第一个真实的 flag，而不是像 <code v-pre>os.Args(0)</code> 放置程序的名字。</p>
<p><code v-pre>flag.Narg()</code> 返回参数的数量。解析后 flag 或常量就可用了。
<code v-pre>flag.Bool()</code> 定义了一个默认值是 <code v-pre>false</code> 的 flag：当在命令行出现了第一个参数（这里是 <code v-pre>'n'</code>），flag 被设置成 <code v-pre>true</code>（<code v-pre>NewLine</code> 是 <code v-pre>*bool</code> 类型）。flag 被解引用到 <code v-pre>*NewLine</code>，所以当值是 <code v-pre>true</code> 时将添加一个 <code v-pre>Newline(&quot;\n&quot;)</code>。</p>
<p><code v-pre>flag.PrintDefaults()</code> 打印 flag 的使用帮助信息，本例中打印的是：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token operator">-</span>n<span class="token operator">=</span><span class="token boolean">false</span><span class="token punctuation">:</span> <span class="token builtin">print</span> newline</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><code v-pre>flag.VisitAll(fn func(*Flag))</code> 是另一个有用的功能：按照字典顺序遍历 flag，并且对每个标签调用 fn （参考 <RouteLink to="/chapter-3/15.8.html">15.8 章</RouteLink>的例子）</p>
<p>当在命令行 (Windows) 中执行：<code v-pre>echo.exe A B C</code>，将输出：<code v-pre>A B C</code>；执行 <code v-pre>echo.exe -n A B C</code>，将输出：</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">A</span>
<span class="line">B</span>
<span class="line">C</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>每个字符的输出都新起一行，每次都在输出的数据前面打印使用帮助信息：<code v-pre>-n=false: print newline</code>。</p>
<p>对于 <code v-pre>flag.Bool</code> 你可以设置布尔型 flag 来测试你的代码，例如定义一个 flag <code v-pre>processedFlag</code>:</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">var</span> processedFlag <span class="token operator">=</span> flag<span class="token punctuation">.</span><span class="token function">Bool</span><span class="token punctuation">(</span><span class="token string">"proc"</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token string">"nothing processed yet"</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>在后面用如下代码来测试：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">if</span> <span class="token operator">*</span>processedFlag <span class="token punctuation">{</span> <span class="token comment">// found flag -proc</span></span>
<span class="line">	r <span class="token operator">=</span> <span class="token function">process</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>要给 flag 定义其它类型，可以使用 <code v-pre>flag.Int()</code>，<code v-pre>flag.Float64()</code>，<code v-pre>flag.String()</code>。</p>
<p>在<RouteLink to="/chapter-3/15.8.html">第 15.8 章</RouteLink>你将找到一个具体的例子。</p>
<h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-3/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-3/12.3.html">文件拷贝</RouteLink></li>
<li>下一节：<RouteLink to="/chapter-3/12.5.html">用 buffer 读取文件</RouteLink></li>
</ul>
</div></template>


