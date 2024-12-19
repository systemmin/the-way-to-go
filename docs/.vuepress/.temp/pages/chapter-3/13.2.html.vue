<template><div><h1 id="_13-2-运行时异常和-panic" tabindex="-1"><a class="header-anchor" href="#_13-2-运行时异常和-panic"><span>13.2 运行时异常和 panic</span></a></h1>
<p>当发生像数组下标越界或类型断言失败这样的运行错误时，Go 运行时会触发<em>运行时 panic</em>，伴随着程序的崩溃抛出一个 <code v-pre>runtime.Error</code> 接口类型的值。这个错误值有个 <code v-pre>RuntimeError()</code> 方法用于区别普通错误。</p>
<p><code v-pre>panic()</code> 可以直接从代码初始化：当错误条件（我们所测试的代码）很严苛且不可恢复，程序不能继续运行时，可以使用 <code v-pre>panic()</code> 函数产生一个中止程序的运行时错误。<code v-pre>panic()</code> 接收一个做任意类型的参数，通常是字符串，在程序死亡时被打印出来。Go 运行时负责中止程序并给出调试信息。在示例 13.2 <a href="examples/chapter_13/panic.go">panic.go</a> 中阐明了它的工作方式：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token string">"fmt"</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Starting the program"</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">"A severe error occurred: stopping the program!"</span><span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Ending the program"</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出如下：</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">Starting the program</span>
<span class="line">panic: A severe error occurred: stopping the program!</span>
<span class="line">panic PC=0x4f3038</span>
<span class="line">runtime.panic+0x99 /go/src/pkg/runtime/proc.c:1032</span>
<span class="line">       runtime.panic(0x442938, 0x4f08e8)</span>
<span class="line">main.main+0xa5 E:/Go/GoBoek/code examples/chapter 13/panic.go:8</span>
<span class="line">       main.main()</span>
<span class="line">runtime.mainstart+0xf 386/asm.s:84</span>
<span class="line">       runtime.mainstart()</span>
<span class="line">runtime.goexit /go/src/pkg/runtime/proc.c:148</span>
<span class="line">       runtime.goexit()</span>
<span class="line">---- Error run E:/Go/GoBoek/code examples/chapter 13/panic.exe with code Crashed</span>
<span class="line">---- Program exited with code -1073741783</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一个检查程序是否被已知用户启动的具体例子：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">var</span> user <span class="token operator">=</span> os<span class="token punctuation">.</span><span class="token function">Getenv</span><span class="token punctuation">(</span><span class="token string">"USER"</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">check</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">if</span> user <span class="token operator">==</span> <span class="token string">""</span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">"Unknown user: no value for $USER"</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以在导入包的 <code v-pre>init()</code> 函数中检查这些。</p>
<p>当发生错误必须中止程序时，<code v-pre>panic()</code> 可以用于错误处理模式：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">"ERROR occurred:"</span> <span class="token operator">+</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><u>Go panicking</u>：</p>
<p>在多层嵌套的函数调用中调用 <code v-pre>panic()</code>，可以马上中止当前函数的执行，所有的 <code v-pre>defer</code> 语句都会保证执行并把控制权交还给接收到 panic 的函数调用者。这样向上冒泡直到最顶层，并执行（每层的） <code v-pre>defer</code>，在栈顶处程序崩溃，并在命令行中用传给 <code v-pre>panic()</code> 的值报告错误情况：这个终止过程就是 <em>panicking</em>。</p>
<p>标准库中有许多包含 <code v-pre>Must</code> 前缀的函数，像 <code v-pre>regexp.MustComplie()</code> 和 <code v-pre>template.Must()</code>；当正则表达式或模板中转入的转换字符串导致错误时，这些函数会 <code v-pre>panic()</code>。</p>
<p>不能随意地用 <code v-pre>panic()</code> 中止程序，必须尽力补救错误让程序能继续执行。</p>
<h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-3/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-3/13.1.html">错误处理</RouteLink></li>
<li>下一节：<RouteLink to="/chapter-3/13.3.html">从 panic 中恢复 (recover)</RouteLink></li>
</ul>
</div></template>


