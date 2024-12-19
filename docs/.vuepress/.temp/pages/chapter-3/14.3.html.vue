<template><div><h1 id="_14-3-协程的同步-关闭通道-测试阻塞的通道" tabindex="-1"><a class="header-anchor" href="#_14-3-协程的同步-关闭通道-测试阻塞的通道"><span>14.3 协程的同步：关闭通道-测试阻塞的通道</span></a></h1>
<p>通道可以被显式的关闭；尽管它们和文件不同：不必每次都关闭。只有在当需要告诉接收者不会再提供新的值的时候，才需要关闭通道。只有发送者需要关闭通道，接收者永远不会需要。</p>
<p>继续看示例 <a href="examples/chapter_14/goroutine2.go">goroutine2.go</a>（示例 14.2）：我们如何在通道的 <code v-pre>sendData()</code> 完成的时候发送一个信号，<code v-pre>getData()</code> 又如何检测到通道是否关闭或阻塞？</p>
<p>第一个可以通过函数 <code v-pre>close(ch)</code> 来完成：这个将通道标记为无法通过发送操作 <code v-pre>&lt;-</code> 接受更多的值；给已经关闭的通道发送或者再次关闭都会导致运行时的 <code v-pre>panic()</code>。在创建一个通道后使用 <code v-pre>defer</code> 语句是个不错的办法（类似这种情况）：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">float64</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">defer</span> <span class="token function">close</span><span class="token punctuation">(</span>ch<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>第二个问题可以使用逗号 ok 模式用来检测通道是否被关闭。</p>
<p>如何来检测可以收到没有被阻塞（或者通道没有被关闭）？</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">v<span class="token punctuation">,</span> ok <span class="token operator">:=</span> <span class="token operator">&lt;-</span>ch   <span class="token comment">// ok is true if v received value</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>通常和 <code v-pre>if</code> 语句一起使用：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">if</span> v<span class="token punctuation">,</span> ok <span class="token operator">:=</span> <span class="token operator">&lt;-</span>ch<span class="token punctuation">;</span> ok <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">process</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者在 <code v-pre>for</code> 循环中接收的时候，当关闭的时候使用 <code v-pre>break</code>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">v<span class="token punctuation">,</span> ok <span class="token operator">:=</span> <span class="token operator">&lt;-</span>ch</span>
<span class="line"><span class="token keyword">if</span> <span class="token operator">!</span>ok <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">break</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token function">process</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>而检测通道当前是否阻塞，需要使用 <code v-pre>select</code>（参见第 <RouteLink to="/chapter-3/14.4.html">14.4</RouteLink> 节）。</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">select</span> <span class="token punctuation">{</span></span>
<span class="line"><span class="token keyword">case</span> v<span class="token punctuation">,</span> ok <span class="token operator">:=</span> <span class="token operator">&lt;-</span>ch<span class="token punctuation">:</span></span>
<span class="line">  <span class="token keyword">if</span> ok <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">process</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span></span>
<span class="line">  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"The channel is closed"</span><span class="token punctuation">)</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token keyword">default</span><span class="token punctuation">:</span></span>
<span class="line">  fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"The channel is blocked"</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在示例程序 14.2 中使用这些可以改进为版本 <a href="examples/chapter_14/goroutine3.go">goroutine3.go</a>，输出相同。</p>
<p>实现非阻塞通道的读取，需要使用 <code v-pre>select</code>（参见第 <RouteLink to="/chapter-3/14.4.html">14.4</RouteLink> 节）。</p>
<p>示例 14.9-<a href="examples/chapter_14/goroutine3.go">goroutine3.go</a>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token string">"fmt"</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">string</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">go</span> <span class="token function">sendData</span><span class="token punctuation">(</span>ch<span class="token punctuation">)</span></span>
<span class="line">	<span class="token function">getData</span><span class="token punctuation">(</span>ch<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">sendData</span><span class="token punctuation">(</span>ch <span class="token keyword">chan</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	ch <span class="token operator">&lt;-</span> <span class="token string">"Washington"</span></span>
<span class="line">	ch <span class="token operator">&lt;-</span> <span class="token string">"Tripoli"</span></span>
<span class="line">	ch <span class="token operator">&lt;-</span> <span class="token string">"London"</span></span>
<span class="line">	ch <span class="token operator">&lt;-</span> <span class="token string">"Beijing"</span></span>
<span class="line">	ch <span class="token operator">&lt;-</span> <span class="token string">"Tokio"</span></span>
<span class="line">	<span class="token function">close</span><span class="token punctuation">(</span>ch<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">getData</span><span class="token punctuation">(</span>ch <span class="token keyword">chan</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">for</span> <span class="token punctuation">{</span></span>
<span class="line">		input<span class="token punctuation">,</span> open <span class="token operator">:=</span> <span class="token operator">&lt;-</span>ch</span>
<span class="line">		<span class="token keyword">if</span> <span class="token operator">!</span>open <span class="token punctuation">{</span></span>
<span class="line">			<span class="token keyword">break</span></span>
<span class="line">		<span class="token punctuation">}</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%s "</span><span class="token punctuation">,</span> input<span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>改变了以下代码：</p>
<ul>
<li>现在只有 <code v-pre>sendData()</code> 是协程，<code v-pre>getData()</code> 和 <code v-pre>main()</code> 在同一个线程中：</li>
</ul>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">go</span> <span class="token function">sendData</span><span class="token punctuation">(</span>ch<span class="token punctuation">)</span></span>
<span class="line"><span class="token function">getData</span><span class="token punctuation">(</span>ch<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>在 <code v-pre>sendData()</code> 函数的最后，关闭了通道：</li>
</ul>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">sendData</span><span class="token punctuation">(</span>ch <span class="token keyword">chan</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	ch <span class="token operator">&lt;-</span> <span class="token string">"Washington"</span></span>
<span class="line">	ch <span class="token operator">&lt;-</span> <span class="token string">"Tripoli"</span></span>
<span class="line">	ch <span class="token operator">&lt;-</span> <span class="token string">"London"</span></span>
<span class="line">	ch <span class="token operator">&lt;-</span> <span class="token string">"Beijing"</span></span>
<span class="line">	ch <span class="token operator">&lt;-</span> <span class="token string">"Tokio"</span></span>
<span class="line">	<span class="token function">close</span><span class="token punctuation">(</span>ch<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>在 <code v-pre>for</code> 循环的 <code v-pre>getData()</code> 中，在每次接收通道的数据之前都使用 <code v-pre>if !open</code> 来检测：</li>
</ul>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">for</span> <span class="token punctuation">{</span></span>
<span class="line">		input<span class="token punctuation">,</span> open <span class="token operator">:=</span> <span class="token operator">&lt;-</span>ch</span>
<span class="line">		<span class="token keyword">if</span> <span class="token operator">!</span>open <span class="token punctuation">{</span></span>
<span class="line">			<span class="token keyword">break</span></span>
<span class="line">		<span class="token punctuation">}</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%s "</span><span class="token punctuation">,</span> input<span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用 for-range 语句来读取通道是更好的办法，因为这会自动检测通道是否关闭：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">for</span> input <span class="token operator">:=</span> <span class="token keyword">range</span> ch <span class="token punctuation">{</span></span>
<span class="line">  	<span class="token function">process</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>阻塞和生产者-消费者模式：</p>
<p>在<RouteLink to="/chapter-3/14.2.html">第 14.2.10 节</RouteLink>的通道迭代器中，两个协程经常是一个阻塞另外一个。如果程序工作在多核心的机器上，大部分时间只用到了一个处理器。可以通过使用带缓冲（缓冲空间大于 0）的通道来改善。比如，缓冲大小为 100，迭代器在阻塞之前，至少可以从容器获得 100 个元素。如果消费者协程在独立的内核运行，就有可能让协程不会出现阻塞。</p>
<p>由于容器中元素的数量通常是已知的，需要让通道有足够的容量放置所有的元素。这样，迭代器就不会阻塞（尽管消费者协程仍然可能阻塞）。然而，这实际上加倍了迭代容器所需要的内存使用量，所以通道的容量需要限制一下最大值。记录运行时间和性能测试可以帮助你找到最小的缓存容量带来最好的性能。</p>
<h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-3/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-3/14.2.html">协程间的信道</RouteLink></li>
<li>下一节：<RouteLink to="/chapter-3/14.4.html">使用 select 切换协程</RouteLink></li>
</ul>
</div></template>


