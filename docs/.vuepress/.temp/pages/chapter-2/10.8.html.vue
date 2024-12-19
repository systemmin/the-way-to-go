<template><div><h1 id="_10-8-垃圾回收和-setfinalizer" tabindex="-1"><a class="header-anchor" href="#_10-8-垃圾回收和-setfinalizer"><span>10.8 垃圾回收和 SetFinalizer</span></a></h1>
<p>Go 开发者不需要写代码来释放程序中不再使用的变量和结构占用的内存，在 Go 运行时中有一个独立的进程，即垃圾收集器 (GC)，会处理这些事情，它搜索不再使用的变量然后释放它们的内存。可以通过 <code v-pre>runtime</code> 包访问 GC 进程。</p>
<p>通过调用 <code v-pre>runtime.GC()</code> 函数可以显式的触发 GC，但这只在某些罕见的场景下才有用，比如当内存资源不足时调用 <code v-pre>runtime.GC()</code>，它会在此函数执行的点上立即释放一大片内存，此时程序可能会有短时的性能下降（因为 <code v-pre>GC</code> 进程在执行）。</p>
<p>如果想知道当前的内存状态，可以使用：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token comment">// fmt.Printf("%d\n", runtime.MemStats.Alloc/1024)</span></span>
<span class="line"><span class="token comment">// 此处代码在 Go 1.5.1下不再有效，更正为</span></span>
<span class="line"><span class="token keyword">var</span> m runtime<span class="token punctuation">.</span>MemStats</span>
<span class="line">runtime<span class="token punctuation">.</span><span class="token function">ReadMemStats</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>m<span class="token punctuation">)</span></span>
<span class="line">fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%d Kb\n"</span><span class="token punctuation">,</span> m<span class="token punctuation">.</span>Alloc <span class="token operator">/</span> <span class="token number">1024</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的程序会给出已分配内存的总量，单位是 Kb。进一步的测量参考 <a href="http://golang.org/pkg/runtime/#MemStatsType" target="_blank" rel="noopener noreferrer">文档页面</a>。</p>
<p>如果需要在一个对象 <code v-pre>obj</code> 被从内存移除前执行一些特殊操作，比如写到日志文件中，可以通过如下方式调用函数来实现：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">runtime<span class="token punctuation">.</span><span class="token function">SetFinalizer</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>obj <span class="token operator">*</span>typeObj<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><code v-pre>func(obj *typeObj)</code> 需要一个 <code v-pre>typeObj</code> 类型的指针参数 <code v-pre>obj</code>，特殊操作会在它上面执行。<code v-pre>func</code> 也可以是一个匿名函数。</p>
<p>在对象被 GC 进程选中并从内存中移除以前，<code v-pre>SetFinalizer</code> 都不会执行，即使程序正常结束或者发生错误。</p>
<p><strong>练习 10.17</strong> <a href="exercises/chapter_10/main_stack.go">main_stack.go</a></p>
<p>从练习 10.16 开始（它基于结构体实现了一个栈结构），为栈的实现 (<a href="exercises/chapter_10/stack_struct.go">stack_struct.go</a>) 创建一个单独的包 <code v-pre>stack</code>，并从 <code v-pre>main</code> 包 <code v-pre>main.stack.go</code> 中调用它。</p>
</div></template>


