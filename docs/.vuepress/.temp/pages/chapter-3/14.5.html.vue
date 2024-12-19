<template><div><h1 id="_14-5-通道、超时和计时器-ticker" tabindex="-1"><a class="header-anchor" href="#_14-5-通道、超时和计时器-ticker"><span>14.5 通道、超时和计时器（Ticker）</span></a></h1>
<p><code v-pre>time</code> 包中有一些有趣的功能可以和通道组合使用。</p>
<p>其中就包含了 <code v-pre>time.Ticker</code> 结构体，这个对象以指定的时间间隔重复的向通道 <code v-pre>C</code> 发送时间值：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">type</span> Ticker <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">    C <span class="token operator">&lt;-</span><span class="token keyword">chan</span> Time <span class="token comment">// the channel on which the ticks are delivered.</span></span>
<span class="line">    <span class="token comment">// contains filtered or unexported fields</span></span>
<span class="line">    <span class="token operator">...</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>时间间隔的单位是 <code v-pre>ns</code>（纳秒，<code v-pre>int64</code>），在工厂函数 <code v-pre>time.NewTicker</code> 中以 <code v-pre>Duration</code> 类型的参数传入：<code v-pre>func NewTicker(dur) *Ticker</code>。</p>
<p>在协程周期性的执行一些事情（打印状态日志，输出，计算等等）的时候非常有用。</p>
<p>调用 <code v-pre>Stop()</code> 使计时器停止，在 <code v-pre>defer</code> 语句中使用。这些都很好地适应 <code v-pre>select</code> 语句:</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">ticker <span class="token operator">:=</span> time<span class="token punctuation">.</span><span class="token function">NewTicker</span><span class="token punctuation">(</span>updateInterval<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">defer</span> ticker<span class="token punctuation">.</span><span class="token function">Stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token operator">...</span></span>
<span class="line"><span class="token keyword">select</span> <span class="token punctuation">{</span></span>
<span class="line"><span class="token keyword">case</span> u<span class="token operator">:=</span> <span class="token operator">&lt;-</span>ch1<span class="token punctuation">:</span></span>
<span class="line">    <span class="token operator">...</span></span>
<span class="line"><span class="token keyword">case</span> v<span class="token operator">:=</span> <span class="token operator">&lt;-</span>ch2<span class="token punctuation">:</span></span>
<span class="line">    <span class="token operator">...</span></span>
<span class="line"><span class="token keyword">case</span> <span class="token operator">&lt;-</span>ticker<span class="token punctuation">.</span>C<span class="token punctuation">:</span></span>
<span class="line">    <span class="token function">logState</span><span class="token punctuation">(</span>status<span class="token punctuation">)</span> <span class="token comment">// call some logging function logState</span></span>
<span class="line"><span class="token keyword">default</span><span class="token punctuation">:</span> <span class="token comment">// no value ready to be received</span></span>
<span class="line">    <span class="token operator">...</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>time.Tick()</code> 函数声明为 <code v-pre>Tick(d Duration) &lt;-chan Time</code>，当你想返回一个通道而不必关闭它的时候这个函数非常有用：它以 <code v-pre>d</code> 为周期给返回的通道发送时间，<code v-pre>d</code> 是纳秒数。如果需要，像下边的代码一样，可以限制处理频率（函数 <code v-pre>client.Call()</code> 是一个 RPC 调用，这里暂不赘述（参见第 <RouteLink to="/chapter-3/15.9.html">15.9</RouteLink> 节））：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">import</span> <span class="token string">"time"</span></span>
<span class="line"></span>
<span class="line">rate_per_sec <span class="token operator">:=</span> <span class="token number">10</span></span>
<span class="line"><span class="token keyword">var</span> dur Duration <span class="token operator">=</span> <span class="token number">1e9</span> <span class="token operator">/</span> rate_per_sec</span>
<span class="line">chRate <span class="token operator">:=</span> time<span class="token punctuation">.</span><span class="token function">Tick</span><span class="token punctuation">(</span>dur<span class="token punctuation">)</span> <span class="token comment">// a tick every 1/10th of a second</span></span>
<span class="line"><span class="token keyword">for</span> req <span class="token operator">:=</span> <span class="token keyword">range</span> requests <span class="token punctuation">{</span></span>
<span class="line">    <span class="token operator">&lt;-</span> chRate <span class="token comment">// rate limit our Service.Method RPC calls</span></span>
<span class="line">    <span class="token keyword">go</span> client<span class="token punctuation">.</span><span class="token function">Call</span><span class="token punctuation">(</span><span class="token string">"Service.Method"</span><span class="token punctuation">,</span> req<span class="token punctuation">,</span> <span class="token operator">...</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样只会按照指定频率处理请求：<code v-pre>chRate</code> 阻塞了更高的频率。每秒处理的频率可以根据机器负载（和/或）资源的情况而增加或减少。</p>
<p>问题 14.1：扩展上边的代码，思考如何承载周期请求数的暴增（提示：使用带缓冲通道和计时器对象）。</p>
<p>定时器 (<code v-pre>Timer</code>)  结构体看上去和计时器 (<code v-pre>Ticker</code>) 结构体的确很像（构造为 <code v-pre>NewTimer(d Duration)</code>），但是它只发送一次时间，在 <code v-pre>Dration d</code> 之后。</p>
<p>还有 <code v-pre>time.After(d)</code> 函数，声明如下：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">After</span><span class="token punctuation">(</span>d Duration<span class="token punctuation">)</span> <span class="token operator">&lt;-</span><span class="token keyword">chan</span> Time</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>在 <code v-pre>Duration d</code> 之后，当前时间被发到返回的通道；所以它和 <code v-pre>NewTimer(d).C</code> 是等价的；它类似 <code v-pre>Tick()</code>，但是 <code v-pre>After()</code> 只发送一次时间。下边有个很具体的示例，很好的阐明了 <code v-pre>select</code> 中 <code v-pre>default</code> 的作用：</p>
<p>示例 14.11：<a href="examples/chapter_14/timer_goroutine.go">timer_goroutine.go</a>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"fmt"</span></span>
<span class="line">	<span class="token string">"time"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	tick <span class="token operator">:=</span> time<span class="token punctuation">.</span><span class="token function">Tick</span><span class="token punctuation">(</span><span class="token number">1e8</span><span class="token punctuation">)</span></span>
<span class="line">	boom <span class="token operator">:=</span> time<span class="token punctuation">.</span><span class="token function">After</span><span class="token punctuation">(</span><span class="token number">5e8</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">for</span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token keyword">select</span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token keyword">case</span> <span class="token operator">&lt;-</span>tick<span class="token punctuation">:</span></span>
<span class="line">			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"tick."</span><span class="token punctuation">)</span></span>
<span class="line">		<span class="token keyword">case</span> <span class="token operator">&lt;-</span>boom<span class="token punctuation">:</span></span>
<span class="line">			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"BOOM!"</span><span class="token punctuation">)</span></span>
<span class="line">			<span class="token keyword">return</span></span>
<span class="line">		<span class="token keyword">default</span><span class="token punctuation">:</span></span>
<span class="line">			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"    ."</span><span class="token punctuation">)</span></span>
<span class="line">			time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">5e7</span><span class="token punctuation">)</span></span>
<span class="line">		<span class="token punctuation">}</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">    .</span>
<span class="line">    .</span>
<span class="line">tick.</span>
<span class="line">    .</span>
<span class="line">    .</span>
<span class="line">tick.</span>
<span class="line">    .</span>
<span class="line">    .</span>
<span class="line">tick.</span>
<span class="line">    .</span>
<span class="line">    .</span>
<span class="line">tick.</span>
<span class="line">    .</span>
<span class="line">    .</span>
<span class="line">tick.</span>
<span class="line">BOOM!</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>习惯用法：简单超时模式</strong></p>
<p>要从通道 <code v-pre>ch</code> 中接收数据，但是最多等待 1 秒。先创建一个信号通道，然后启动一个 <code v-pre>lambda</code> 协程，协程在给通道发送数据之前是休眠的：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">timeout <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">bool</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">1e9</span><span class="token punctuation">)</span> <span class="token comment">// one second</span></span>
<span class="line">        timeout <span class="token operator">&lt;-</span> <span class="token boolean">true</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后使用 <code v-pre>select</code> 语句接收 <code v-pre>ch</code> 或者 <code v-pre>timeout</code> 的数据：如果 <code v-pre>ch</code> 在 1 秒内没有收到数据，就选择到了 <code v-pre>time</code> 分支并放弃了 <code v-pre>ch</code> 的读取。</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">select</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">case</span> <span class="token operator">&lt;-</span>ch<span class="token punctuation">:</span></span>
<span class="line">        <span class="token comment">// a read from ch has occured</span></span>
<span class="line">    <span class="token keyword">case</span> <span class="token operator">&lt;-</span>timeout<span class="token punctuation">:</span></span>
<span class="line">        <span class="token comment">// the read from ch has timed out</span></span>
<span class="line">        <span class="token keyword">break</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第二种形式：取消耗时很长的同步调用</p>
<p>也可以使用 <code v-pre>time.After()</code> 函数替换 <code v-pre>timeout-channel</code>。可以在 <code v-pre>select</code> 中通过 <code v-pre>time.After()</code> 发送的超时信号来停止协程的执行。以下代码，在 <code v-pre>timeoutNs</code> 纳秒后执行 <code v-pre>select</code> 的 <code v-pre>timeout</code> 分支后，执行 <code v-pre>client.Call</code> 的协程也随之结束，不会给通道 <code v-pre>ch</code> 返回值：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">error</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> ch <span class="token operator">&lt;-</span> client<span class="token punctuation">.</span><span class="token function">Call</span><span class="token punctuation">(</span><span class="token string">"Service.Method"</span><span class="token punctuation">,</span> args<span class="token punctuation">,</span> <span class="token operator">&amp;</span>reply<span class="token punctuation">)</span> <span class="token punctuation">}</span> <span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">select</span> <span class="token punctuation">{</span></span>
<span class="line"><span class="token keyword">case</span> resp <span class="token operator">:=</span> <span class="token operator">&lt;-</span>ch</span>
<span class="line">    <span class="token comment">// use resp and reply</span></span>
<span class="line"><span class="token keyword">case</span> <span class="token operator">&lt;-</span>time<span class="token punctuation">.</span><span class="token function">After</span><span class="token punctuation">(</span>timeoutNs<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token comment">// call timed out</span></span>
<span class="line">    <span class="token keyword">break</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意缓冲大小设置为 <code v-pre>1</code> 是必要的，可以避免协程死锁以及确保超时的通道可以被垃圾回收。此外，需要注意在有多个 <code v-pre>case</code> 符合条件时， <code v-pre>select</code> 对 <code v-pre>case</code> 的选择是伪随机的，如果上面的代码稍作修改如下，则 <code v-pre>select</code> 语句可能不会在定时器超时信号到来时立刻选中 <code v-pre>time.After(timeoutNs)</code> 对应的 <code v-pre>case</code>，因此协程可能不会严格按照定时器设置的时间结束。</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">for</span> <span class="token punctuation">{</span> ch <span class="token operator">&lt;-</span> <span class="token number">1</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span> <span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">L<span class="token punctuation">:</span></span>
<span class="line"><span class="token keyword">for</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">select</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">case</span> <span class="token operator">&lt;-</span>ch<span class="token punctuation">:</span></span>
<span class="line">        <span class="token comment">// do something</span></span>
<span class="line">    <span class="token keyword">case</span> <span class="token operator">&lt;-</span>time<span class="token punctuation">.</span><span class="token function">After</span><span class="token punctuation">(</span>timeoutNs<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token comment">// call timed out</span></span>
<span class="line">        <span class="token keyword">break</span> L</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第三种形式：假设程序从多个复制的数据库同时读取。只需要一个答案，需要接收首先到达的答案，<code v-pre>Query</code> 函数获取数据库的连接切片并请求。并行请求每一个数据库并返回收到的第一个响应：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">Query</span><span class="token punctuation">(</span>conns <span class="token punctuation">[</span><span class="token punctuation">]</span>Conn<span class="token punctuation">,</span> query <span class="token builtin">string</span><span class="token punctuation">)</span> Result <span class="token punctuation">{</span></span>
<span class="line">    ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> Result<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> conn <span class="token operator">:=</span> <span class="token keyword">range</span> conns <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c Conn<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">select</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">case</span> ch <span class="token operator">&lt;-</span> c<span class="token punctuation">.</span><span class="token function">DoQuery</span><span class="token punctuation">(</span>query<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">            <span class="token keyword">default</span><span class="token punctuation">:</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">(</span>conn<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token operator">&lt;-</span> ch</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再次声明，结果通道 <code v-pre>ch</code> 必须是带缓冲的：以保证第一个发送进来的数据有地方可以存放，确保放入的首个数据总会成功，所以第一个到达的值会被获取而与执行的顺序无关。正在执行的协程可以总是可以使用 <code v-pre>runtime.Goexit()</code> 来停止。</p>
<p>在应用中缓存数据：</p>
<p>应用程序中用到了来自数据库（或者常见的数据存储）的数据时，经常会把数据缓存到内存中，因为从数据库中获取数据的操作代价很高；如果数据库中的值不发生变化就没有问题。但是如果值有变化，我们需要一个机制来周期性的从数据库重新读取这些值：缓存的值就不可用（过期）了，而且我们也不希望用户看到陈旧的数据。</p>
<h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-3/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-3/14.4.html">使用select切换协程</RouteLink></li>
<li>下一节：<RouteLink to="/chapter-3/14.6.html">协程和恢复（recover）</RouteLink></li>
</ul>
</div></template>


