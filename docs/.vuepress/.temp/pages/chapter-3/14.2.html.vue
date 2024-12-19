<template><div><h1 id="_14-2-协程间的信道" tabindex="-1"><a class="header-anchor" href="#_14-2-协程间的信道"><span>14.2 协程间的信道</span></a></h1>
<h2 id="_14-2-1-概念" tabindex="-1"><a class="header-anchor" href="#_14-2-1-概念"><span>14.2.1 概念</span></a></h2>
<p>在第一个例子中，协程是独立执行的，他们之间没有通信。他们必须通信才会变得更有用：彼此之间发送和接收信息并且协调/同步他们的工作。协程可以使用共享变量来通信，但是很不提倡这样做，因为这种方式给所有的共享内存的多线程都带来了困难。</p>
<p>而 Go 有一种特殊的类型，<em>通道（channel）</em>，就像一个可以用于发送类型化数据的管道，由其负责协程之间的通信，从而避开所有由共享内存导致的陷阱；这种通过通道进行通信的方式保证了同步性。数据在通道中进行传递：<em>在任何给定时间，一个数据被设计为只有一个协程可以对其访问，所以不会发生数据竞争。</em> 数据的所有权（可以读写数据的能力）也因此被传递。</p>
<p>工厂的传送带是个很有用的例子。一个机器（生产者协程）在传送带上放置物品，另外一个机器（消费者协程）拿到物品并打包。</p>
<p>通道服务于通信的两个目的：值的交换，同步的，保证了两个计算（协程）任何时候都是可知状态。</p>
<p><img src="/images/14.2_fig14.1.png" alt=""></p>
<p>通常使用这样的格式来声明通道：<code v-pre>var identifier chan datatype</code></p>
<p>未初始化的通道的值是 <code v-pre>nil</code>。</p>
<p>所以通道只能传输一种类型的数据，比如 <code v-pre>chan int</code> 或者 <code v-pre>chan string</code>，所有的类型都可以用于通道，空接口 <code v-pre>interface{}</code> 也可以，甚至可以（有时非常有用）创建通道的通道。</p>
<p>通道实际上是类型化消息的队列：使数据得以传输。它是先进先出(FIFO) 的结构所以可以保证发送给他们的元素的顺序（有些人知道，通道可以比作 Unix shells 中的双向管道 (two-way pipe) ）。通道也是引用类型，所以我们使用 <code v-pre>make()</code> 函数来给它分配内存。这里先声明了一个字符串通道 ch1，然后创建了它（实例化）：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">var</span> ch1 <span class="token keyword">chan</span> <span class="token builtin">string</span></span>
<span class="line">ch1 <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">string</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>当然可以更短： <code v-pre>ch1 := make(chan string)</code>。</p>
<p>这里我们构建一个 int 通道的通道： <code v-pre>chanOfChans := make(chan chan int)</code>。</p>
<p>或者函数通道：<code v-pre>funcChan := make(chan func())</code>（相关示例请看第 <RouteLink to="/chapter-3/14.17.html">14.17</RouteLink> 节）。</p>
<p>所以通道是第一类对象：可以存储在变量中，作为函数的参数传递，从函数返回以及通过通道发送它们自身。另外它们是类型化的，允许类型检查，比如尝试使用整数通道发送一个指针。</p>
<h2 id="_14-2-2-通信操作符" tabindex="-1"><a class="header-anchor" href="#_14-2-2-通信操作符"><span>14.2.2 通信操作符 &lt;-</span></a></h2>
<p>这个操作符直观的标示了数据的传输：信息按照箭头的方向流动。</p>
<p>流向通道（发送）</p>
<p><code v-pre>ch &lt;- int1</code> 表示：用通道 <code v-pre>ch</code> 发送变量 <code v-pre>int1</code>（双目运算符，中缀 = 发送）</p>
<p>从通道流出（接收），三种方式：</p>
<p><code v-pre>int2 = &lt;- ch</code> 表示：变量 <code v-pre>int2</code> 从通道 ch（一元运算的前缀操作符，前缀 = 接收）接收数据（获取新值）；假设 <code v-pre>int2</code> 已经声明过了，如果没有的话可以写成：<code v-pre>int2 := &lt;- ch</code>。</p>
<p><code v-pre>&lt;- ch</code> 可以单独调用获取通道的（下一个）值，当前值会被丢弃，但是可以用来验证，所以以下代码是合法的：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">if</span> <span class="token operator">&lt;-</span> ch <span class="token operator">!=</span> <span class="token number">1000</span><span class="token punctuation">{</span></span>
<span class="line">	<span class="token operator">...</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同一个操作符 <code v-pre>&lt;-</code> 既用于<strong>发送</strong>也用于<strong>接收</strong>，但 Go 会根据操作对象弄明白该干什么 。虽非强制要求，但为了可读性通道的命名通常以 <code v-pre>ch</code> 开头或者包含 <code v-pre>chan</code> 。通道的发送和接收都是原子操作：它们总是互不干扰地完成。下面的示例展示了通信操作符的使用。</p>
<p>示例 14.2-<a href="examples/chapter_14/goroutine2.go">goroutine2.go</a></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"fmt"</span></span>
<span class="line">	<span class="token string">"time"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">string</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">	<span class="token keyword">go</span> <span class="token function">sendData</span><span class="token punctuation">(</span>ch<span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">go</span> <span class="token function">getData</span><span class="token punctuation">(</span>ch<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">1e9</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">sendData</span><span class="token punctuation">(</span>ch <span class="token keyword">chan</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	ch <span class="token operator">&lt;-</span> <span class="token string">"Washington"</span></span>
<span class="line">	ch <span class="token operator">&lt;-</span> <span class="token string">"Tripoli"</span></span>
<span class="line">	ch <span class="token operator">&lt;-</span> <span class="token string">"London"</span></span>
<span class="line">	ch <span class="token operator">&lt;-</span> <span class="token string">"Beijing"</span></span>
<span class="line">	ch <span class="token operator">&lt;-</span> <span class="token string">"Tokyo"</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">getData</span><span class="token punctuation">(</span>ch <span class="token keyword">chan</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">var</span> input <span class="token builtin">string</span></span>
<span class="line">	<span class="token comment">// time.Sleep(2e9)</span></span>
<span class="line">	<span class="token keyword">for</span> <span class="token punctuation">{</span></span>
<span class="line">		input <span class="token operator">=</span> <span class="token operator">&lt;-</span>ch</span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%s "</span><span class="token punctuation">,</span> input<span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">Washington Tripoli London Beijing tokyo</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><code v-pre>main()</code> 函数中启动了两个协程：<code v-pre>sendData()</code> 通过通道 ch 发送了 5 个字符串，<code v-pre>getData()</code> 按顺序接收它们并打印出来。</p>
<p>如果 2 个协程需要通信，你必须给他们同一个通道作为参数才行。</p>
<p>尝试一下如果注释掉 <code v-pre>time.Sleep(1e9)</code> 会如何。</p>
<p>我们发现协程之间的同步非常重要：</p>
<ul>
<li><code v-pre>main()</code> 等待了 1 秒让两个协程完成，如果不这样，<code v-pre>sendData()</code> 就没有机会输出。</li>
<li><code v-pre>getData()</code> 使用了无限循环：它随着 <code v-pre>sendData()</code> 的发送完成和 <code v-pre>ch</code> 变空也结束了。</li>
<li>如果我们移除一个或所有 <code v-pre>go</code> 关键字，程序无法运行，Go 运行时会抛出 panic：</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">---- Error run E:/Go/Goboek/code examples/chapter 14/goroutine2.exe with code Crashed ---- Program exited with code -2147483645: panic: all goroutines are asleep-deadlock!</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>为什么会这样？运行时 (runtime) 会检查所有的协程（像本例中只有一个）是否在等待着什么东西（可从某个通道读取或者写入某个通道），这意味着程序将无法继续执行。这是死锁 (deadlock) 的一种形式，而运行时 (runtime) 可以为我们检测到这种情况。</p>
<p>注意：不要使用打印状态来表明通道的发送和接收顺序：由于打印状态和通道实际发生读写的时间延迟会导致和真实发生的顺序不同。</p>
<p>练习 14.4：解释一下为什么如果在函数 <code v-pre>getData()</code> 的一开始插入 <code v-pre>time.Sleep(2e9)</code>，不会出现错误但也没有输出呢。</p>
<h2 id="_14-2-3-通道阻塞" tabindex="-1"><a class="header-anchor" href="#_14-2-3-通道阻塞"><span>14.2.3 通道阻塞</span></a></h2>
<p>默认情况下，通信是同步且无缓冲的：在有接受者接收数据之前，发送不会结束。可以想象一个无缓冲的通道在没有空间来保存数据的时候：必须要一个接收者准备好接收通道的数据然后发送者可以直接把数据发送给接收者。所以通道的发送/接收操作在对方准备好之前是阻塞的：</p>
<p>1）对于同一个通道，发送操作（协程或者函数中的），在接收者准备好之前是阻塞的：如果 <code v-pre>ch</code> 中的数据无人接收，就无法再给通道传入其他数据：新的输入无法在通道非空的情况下传入。所以发送操作会等待 <code v-pre>ch</code> 再次变为可用状态：就是通道值被接收时（可以传入变量）。</p>
<p>2）对于同一个通道，接收操作是阻塞的（协程或函数中的），直到发送者可用：如果通道中没有数据，接收者就阻塞了。</p>
<p>尽管这看上去是非常严格的约束，实际在大部分情况下工作的很不错。</p>
<p>程序 <a href="examples/chapter_14/channel_block.go">channel_block.go</a> 验证了以上理论，一个协程在无限循环中给通道发送整数数据。不过因为没有接收者，只输出了一个数字 <code v-pre>0</code>。</p>
<p>示例 14.3-<a href="examples/chapter_14/channel_block.go">channel_block.go</a></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token string">"fmt"</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	ch1 <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">go</span> <span class="token function">pump</span><span class="token punctuation">(</span>ch1<span class="token punctuation">)</span>       <span class="token comment">// pump hangs</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">&lt;-</span>ch1<span class="token punctuation">)</span> <span class="token comment">// prints only 0</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">pump</span><span class="token punctuation">(</span>ch <span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span></span>
<span class="line">		ch <span class="token operator">&lt;-</span> i</span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">0</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><code v-pre>pump()</code> 函数为通道提供数值，也被叫做生产者。</p>
<p>为通道解除阻塞定义了 <code v-pre>suck()</code> 函数来在无限循环中读取通道，参见示例 14.4-<a href="examples/chapter_14/channel_block2.go">channel_block2.go</a>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">suck</span><span class="token punctuation">(</span>ch <span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">for</span> <span class="token punctuation">{</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">&lt;-</span>ch<span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 <code v-pre>main()</code> 中使用协程开始它：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">go</span> <span class="token function">pump</span><span class="token punctuation">(</span>ch1<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">go</span> <span class="token function">suck</span><span class="token punctuation">(</span>ch1<span class="token punctuation">)</span></span>
<span class="line">time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">1e9</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>给程序 1 秒的时间来运行：输出了上万个整数。</p>
<p>练习 14.1：<a href="exercises/chapter_14/channel_block3.go">channel_block3.go</a>：写一个通道证明它的阻塞性，开启一个协程接收通道的数据，持续 15 秒，然后给通道放入一个值。在不同的阶段打印消息并观察输出。</p>
<h2 id="_14-2-4-通过一个-或多个-通道交换数据进行协程同步。" tabindex="-1"><a class="header-anchor" href="#_14-2-4-通过一个-或多个-通道交换数据进行协程同步。"><span>14.2.4 通过一个（或多个）通道交换数据进行协程同步。</span></a></h2>
<p>通信是一种同步形式：通过通道，两个协程在通信（协程会合）中某刻同步交换数据。无缓冲通道成为了多个协程同步的完美工具。</p>
<p>甚至可以在通道两端互相阻塞对方，形成了叫做<strong>死锁</strong>的状态。Go 运行时会检查并 <code v-pre>panic()</code>，停止程序。死锁几乎完全是由糟糕的设计导致的。</p>
<p>无缓冲通道会被阻塞。设计无阻塞的程序可以避免这种情况，或者使用带缓冲的通道。</p>
<p>练习 14.2： <a href="exercises/chapter_14/blocking.go">blocking.go</a></p>
<p>解释为什么下边这个程序会导致 panic：所有的协程都休眠了 - 死锁！</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"fmt"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">f1</span><span class="token punctuation">(</span>in <span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">&lt;-</span>in<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	out <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span></span>
<span class="line">	out <span class="token operator">&lt;-</span> <span class="token number">2</span></span>
<span class="line">	<span class="token keyword">go</span> <span class="token function">f1</span><span class="token punctuation">(</span>out<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_14-2-5-同步通道-使用带缓冲的通道" tabindex="-1"><a class="header-anchor" href="#_14-2-5-同步通道-使用带缓冲的通道"><span>14.2.5 同步通道-使用带缓冲的通道</span></a></h2>
<p>一个无缓冲通道只能包含 1 个元素，有时显得很局限。我们给通道提供了一个缓存，可以在扩展的 <code v-pre>make</code> 命令中设置它的容量，如下：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">buf <span class="token operator">:=</span> <span class="token number">100</span></span>
<span class="line">ch1 <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">string</span><span class="token punctuation">,</span> buf<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>buf</code> 是通道可以同时容纳的元素（这里是 <code v-pre>string</code>）个数</p>
<p>在缓冲满载（缓冲被全部使用）之前，给一个带缓冲的通道发送数据是不会阻塞的，而从通道读取数据也不会阻塞，直到缓冲空了。</p>
<p>缓冲容量和类型无关，所以可以（尽管可能导致危险）给一些通道设置不同的容量，只要他们拥有同样的元素类型。内置的 <code v-pre>cap()</code> 函数可以返回缓冲区的容量。</p>
<p>如果容量大于 0，通道就是异步的了：缓冲满载（发送）或变空（接收）之前通信不会阻塞，元素会按照发送的顺序被接收。如果容量是 0 或者未设置，通信仅在收发双方准备好的情况下才可以成功。</p>
<p>同步：<code v-pre>ch :=make(chan type, value)</code></p>
<ul>
<li><code v-pre>value == 0 -&gt; synchronous</code>, unbuffered （阻塞）</li>
<li><code v-pre>value &gt; 0 -&gt; asynchronous</code>, buffered（非阻塞）取决于 <code v-pre>value</code> 元素</li>
</ul>
<p>若使用通道的缓冲，你的程序会在“请求”激增的时候表现更好：更具弹性，专业术语叫：更具有伸缩性(scalable)。在设计算法时首先考虑使用无缓冲通道，只在不确定的情况下使用缓冲。</p>
<p>练习 14.3：<a href="exercises/chapter_14/channel_buffer.go">channel_buffer.go</a>：给 <a href="exercises/chapter_14/channel_block3.go">channel_block3.go</a> 的通道增加缓冲并观察输出有何不同。</p>
<h2 id="_14-2-6-协程中用通道输出结果" tabindex="-1"><a class="header-anchor" href="#_14-2-6-协程中用通道输出结果"><span>14.2.6 协程中用通道输出结果</span></a></h2>
<p>为了知道计算何时完成，可以通过信道回报。在例子 <code v-pre>go sum(bigArray)</code> 中，要这样写：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">go</span> <span class="token function">sum</span><span class="token punctuation">(</span>bigArray<span class="token punctuation">,</span> ch<span class="token punctuation">)</span> <span class="token comment">// bigArray puts the calculated sum on ch</span></span>
<span class="line"><span class="token comment">// .. do something else for a while</span></span>
<span class="line">sum <span class="token operator">:=</span> <span class="token operator">&lt;-</span> ch <span class="token comment">// wait for, and retrieve the sum</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也可以使用通道来达到同步的目的，这个很有效的用法在传统计算机中称为信号量 (semaphore)。或者换个方式：通过通道发送信号告知处理已经完成（在协程中）。</p>
<p>在其他协程运行时让 <code v-pre>main</code> 程序无限阻塞的通常做法是在 <code v-pre>main()</code> 函数的最后放置一个 <code v-pre>select {}</code>。</p>
<p>也可以使用通道让 <code v-pre>main</code> 程序等待协程完成，就是所谓的信号量模式，我们会在接下来的部分讨论。</p>
<h2 id="_14-2-7-信号量模式" tabindex="-1"><a class="header-anchor" href="#_14-2-7-信号量模式"><span>14.2.7 信号量模式</span></a></h2>
<p>下边的片段阐明：协程通过在通道 <code v-pre>ch</code> 中放置一个值来处理结束的信号。<code v-pre>main()</code> 协程等待 <code v-pre>&lt;-ch</code> 直到从中获取到值。</p>
<p>我们期望从这个通道中获取返回的结果，像这样：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">compute</span><span class="token punctuation">(</span>ch <span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">	ch <span class="token operator">&lt;-</span> <span class="token function">someComputation</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// when it completes, signal on the channel.</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">	ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span> 	<span class="token comment">// allocate a channel.</span></span>
<span class="line">	<span class="token keyword">go</span> <span class="token function">compute</span><span class="token punctuation">(</span>ch<span class="token punctuation">)</span>		<span class="token comment">// start something in a goroutines</span></span>
<span class="line">	<span class="token function">doSomethingElseForAWhile</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	result <span class="token operator">:=</span> <span class="token operator">&lt;-</span> ch</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个信号也可以是其他的，不返回结果，比如下面这个协程中的匿名函数 (lambda) 协程：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">	<span class="token comment">// doSomething</span></span>
<span class="line">	ch <span class="token operator">&lt;-</span> <span class="token number">1</span> <span class="token comment">// Send a signal; value does not matter</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token function">doSomethingElseForAWhile</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token operator">&lt;-</span> ch	<span class="token comment">// Wait for goroutine to finish; discard sent value.</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者等待两个协程完成，每一个都会对切片 <code v-pre>s</code> 的一部分进行排序，片段如下：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">done <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">bool</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token comment">// doSort is a lambda function, so a closure which knows the channel done:</span></span>
<span class="line">doSort <span class="token operator">:=</span> <span class="token keyword">func</span><span class="token punctuation">(</span>s <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">	<span class="token function">sort</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span></span>
<span class="line">	done <span class="token operator">&lt;-</span> <span class="token boolean">true</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line">i <span class="token operator">:=</span> <span class="token function">pivot</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">go</span> <span class="token function">doSort</span><span class="token punctuation">(</span>s<span class="token punctuation">[</span><span class="token punctuation">:</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">go</span> <span class="token function">doSort</span><span class="token punctuation">(</span>s<span class="token punctuation">[</span>i<span class="token punctuation">:</span><span class="token punctuation">]</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token operator">&lt;-</span>done</span>
<span class="line"><span class="token operator">&lt;-</span>done</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下边的代码，用完整的信号量模式对长度为 <code v-pre>N</code> 的 <code v-pre>float64</code> 切片进行了 <code v-pre>N</code> 个 <code v-pre>doSomething()</code> 计算并同时完成，通道 <code v-pre>sem</code> 分配了相同的长度（且包含空接口类型的元素），待所有的计算都完成后，发送信号（通过放入值）。在循环中从通道 <code v-pre>sem</code> 不停的接收数据来等待所有的协程完成。</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">type</span> Empty <span class="token keyword">interface</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="line"><span class="token keyword">var</span> empty Empty</span>
<span class="line"><span class="token operator">...</span></span>
<span class="line">data <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">float64</span><span class="token punctuation">,</span> N<span class="token punctuation">)</span></span>
<span class="line">res <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">float64</span><span class="token punctuation">,</span> N<span class="token punctuation">)</span></span>
<span class="line">sem <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> Empty<span class="token punctuation">,</span> N<span class="token punctuation">)</span></span>
<span class="line"><span class="token operator">...</span></span>
<span class="line"><span class="token keyword">for</span> i<span class="token punctuation">,</span> xi <span class="token operator">:=</span> <span class="token keyword">range</span> data <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">go</span> <span class="token keyword">func</span> <span class="token punctuation">(</span>i <span class="token builtin">int</span><span class="token punctuation">,</span> xi <span class="token builtin">float64</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">		res<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">doSomething</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> xi<span class="token punctuation">)</span></span>
<span class="line">		sem <span class="token operator">&lt;-</span> empty</span>
<span class="line">	<span class="token punctuation">}</span> <span class="token punctuation">(</span>i<span class="token punctuation">,</span> xi<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token comment">// wait for goroutines to finish</span></span>
<span class="line"><span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> N<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span> <span class="token operator">&lt;-</span>sem <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意上述代码中闭合函数的用法：<code v-pre>i</code>、<code v-pre>xi</code> 都是作为参数传入闭合函数的，这一做法使得每个协程（译者注：在其启动时）获得一份 <code v-pre>i</code> 和 <code v-pre>xi</code> 的单独拷贝，从而向闭合函数内部屏蔽了外层循环中的 <code v-pre>i</code> 和 <code v-pre>xi</code> 变量；否则，<code v-pre>for</code> 循环的下一次迭代会更新所有协程中 <code v-pre>i</code> 和 <code v-pre>xi</code> 的值。另一方面，切片 <code v-pre>res</code> 没有传入闭合函数，因为协程不需要 <code v-pre>res</code> 的单独拷贝。切片 <code v-pre>res</code> 也在闭合函数中但并不是参数。</p>
<h2 id="_14-2-8-实现并行的-for-循环" tabindex="-1"><a class="header-anchor" href="#_14-2-8-实现并行的-for-循环"><span>14.2.8 实现并行的 <code v-pre>for</code> 循环</span></a></h2>
<p>在上一部分章节 <RouteLink to="/chapter-3/14.2.html#1427-%E4%BF%A1%E5%8F%B7%E9%87%8F%E6%A8%A1%E5%BC%8F">14.2.7</RouteLink> 的代码片段中：<code v-pre>for</code> 循环的每一个迭代是并行完成的：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">for</span> i<span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> data <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">go</span> <span class="token keyword">func</span> <span class="token punctuation">(</span>i <span class="token builtin">int</span><span class="token punctuation">,</span> v <span class="token builtin">float64</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token function">doSomething</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> v<span class="token punctuation">)</span></span>
<span class="line">		<span class="token operator">...</span></span>
<span class="line">	<span class="token punctuation">}</span> <span class="token punctuation">(</span>i<span class="token punctuation">,</span> v<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 <code v-pre>for</code> 循环中并行计算迭代可能带来很好的性能提升。不过所有的迭代都必须是独立完成的。有些语言比如 Fortress 或者其他并行框架以不同的结构实现了这种方式，在 Go 中用协程实现起来非常容易：</p>
<h2 id="_14-2-9-用带缓冲通道实现一个信号量" tabindex="-1"><a class="header-anchor" href="#_14-2-9-用带缓冲通道实现一个信号量"><span>14.2.9 用带缓冲通道实现一个信号量</span></a></h2>
<p>信号量是实现互斥锁（排外锁）常见的同步机制，限制对资源的访问，解决读写问题，比如没有实现信号量的 <code v-pre>sync</code> 的 Go 包，使用带缓冲的通道可以轻松实现：</p>
<ul>
<li>带缓冲通道的容量和要同步的资源容量相同</li>
<li>通道的长度（当前存放的元素个数）与当前资源被使用的数量相同</li>
<li>容量减去通道的长度就是未处理的资源个数（标准信号量的整数值）</li>
</ul>
<p>不用管通道中存放的是什么，只关注长度；因此我们创建了一个长度可变但容量为 0（字节）的通道：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">type</span> Empty <span class="token keyword">interface</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="line"><span class="token keyword">type</span> semaphore <span class="token keyword">chan</span> Empty</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>将可用资源的数量 <code v-pre>N</code> 来初始化信号量 <code v-pre>semaphore</code>：<code v-pre>sem = make(semaphore, N)</code></p>
<p>然后直接对信号量进行操作：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token comment">// acquire n resources</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>s semaphore<span class="token punctuation">)</span> <span class="token function">P</span><span class="token punctuation">(</span>n <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	e <span class="token operator">:=</span> <span class="token function">new</span><span class="token punctuation">(</span>Empty<span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> n<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span></span>
<span class="line">		s <span class="token operator">&lt;-</span> e</span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// release n resources</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>s semaphore<span class="token punctuation">)</span> <span class="token function">V</span><span class="token punctuation">(</span>n <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">for</span> i<span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> n<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">{</span></span>
<span class="line">		<span class="token operator">&lt;-</span> s</span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以用来实现一个互斥的例子：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token comment">/* mutexes */</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>s semaphore<span class="token punctuation">)</span> <span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	s<span class="token punctuation">.</span><span class="token function">P</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>s semaphore<span class="token punctuation">)</span> <span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">	s<span class="token punctuation">.</span><span class="token function">V</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">/* signal-wait */</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>s semaphore<span class="token punctuation">)</span> <span class="token function">Wait</span><span class="token punctuation">(</span>n <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	s<span class="token punctuation">.</span><span class="token function">P</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>s semaphore<span class="token punctuation">)</span> <span class="token function">Signal</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	s<span class="token punctuation">.</span><span class="token function">V</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>练习 14.5：<a href="exercises/chapter_14/gosum.go">gosum.go</a>：用这种习惯用法写一个程序，开启一个协程来计算 2 个整数的和并等待计算结果并打印出来。</p>
<p>练习 14.6：<a href="exercises/chapter_14/producer_consumer.go">producer_consumer.go</a>：用这种习惯用法写一个程序，有两个协程，第一个提供数字 0，10，20，...，90 并将他们放入通道，第二个协程从通道中读取并打印。<code v-pre>main()</code> 等待两个协程完成后再结束。</p>
<p><strong>习惯用法：通道工厂模式</strong></p>
<p>编程中常见的另外一种模式如下：不将通道作为参数传递给协程，而用函数来生成一个通道并返回（工厂角色）；函数内有个匿名函数被协程调用。</p>
<p>在 <a href="examples/chapter_14/channel_block2.go">channel_block2.go</a> 加入这种模式便有了示例 14.5-<a href="examples/chapter_14/channel_idiom.go">channel_idiom.go</a>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"fmt"</span></span>
<span class="line">	<span class="token string">"time"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	stream <span class="token operator">:=</span> <span class="token function">pump</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">go</span> <span class="token function">suck</span><span class="token punctuation">(</span>stream<span class="token punctuation">)</span></span>
<span class="line">	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">1e9</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">pump</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">chan</span> <span class="token builtin">int</span> <span class="token punctuation">{</span></span>
<span class="line">	ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span></span>
<span class="line">			ch <span class="token operator">&lt;-</span> i</span>
<span class="line">		<span class="token punctuation">}</span></span>
<span class="line">	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">return</span> ch</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">suck</span><span class="token punctuation">(</span>ch <span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">for</span> <span class="token punctuation">{</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">&lt;-</span>ch<span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_14-2-10-给通道使用-for-循环" tabindex="-1"><a class="header-anchor" href="#_14-2-10-给通道使用-for-循环"><span>14.2.10 给通道使用 for 循环</span></a></h2>
<p><code v-pre>for</code> 循环的 <code v-pre>range</code> 语句可以用在通道 <code v-pre>ch</code> 上，便可以从通道中获取值，像这样：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">for</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> ch <span class="token punctuation">{</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"The value is %v\n"</span><span class="token punctuation">,</span> v<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>它从指定通道中读取数据直到通道关闭，才继续执行下边的代码。很明显，另外一个协程必须写入 <code v-pre>ch</code>（不然代码就阻塞在 <code v-pre>for</code> 循环了），而且必须在写入完成后才关闭。<code v-pre>suck()</code> 函数可以这样写，且在协程中调用这个动作，程序变成了这样：</p>
<p>示例 14.6-<a href="examples/chapter_14/channel_idiom2.go">channel_idiom2.go</a>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"fmt"</span></span>
<span class="line">	<span class="token string">"time"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token function">suck</span><span class="token punctuation">(</span><span class="token function">pump</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">1e9</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">pump</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">chan</span> <span class="token builtin">int</span> <span class="token punctuation">{</span></span>
<span class="line">	ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span></span>
<span class="line">			ch <span class="token operator">&lt;-</span> i</span>
<span class="line">		<span class="token punctuation">}</span></span>
<span class="line">	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">return</span> ch</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">suck</span><span class="token punctuation">(</span>ch <span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token keyword">for</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> ch <span class="token punctuation">{</span></span>
<span class="line">			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span></span>
<span class="line">		<span class="token punctuation">}</span></span>
<span class="line">	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>习惯用法：通道迭代器模式</strong></p>
<p>这个模式用到了后边 <RouteLink to="/chapter-3/14.6.html">14.6 章</RouteLink>示例 <a href="exercises/chapter_14/producer_consumer.go">producer_consumer.go</a> 的生产者-消费者模式。通常，需要从包含了地址索引字段 <code v-pre>items</code> 的容器给通道填入元素。为容器的类型定义一个方法 <code v-pre>Iter()</code>，返回一个只读的通道（参见第 <RouteLink to="/chapter-3/14.2.html#14211-%E9%80%9A%E9%81%93%E7%9A%84%E6%96%B9%E5%90%91">14.2.11</RouteLink> 节）<code v-pre>items</code>，如下：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>container<span class="token punctuation">)</span> Iter <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;-</span> <span class="token keyword">chan</span> item <span class="token punctuation">{</span></span>
<span class="line">	ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> item<span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">go</span> <span class="token keyword">func</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token keyword">for</span> i<span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> c<span class="token punctuation">.</span><span class="token function">Len</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">{</span>	<span class="token comment">// or use a for-range loop</span></span>
<span class="line">			ch <span class="token operator">&lt;-</span> c<span class="token punctuation">.</span>items<span class="token punctuation">[</span>i<span class="token punctuation">]</span></span>
<span class="line">		<span class="token punctuation">}</span></span>
<span class="line">	<span class="token punctuation">}</span> <span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">return</span> ch</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在协程里，一个 <code v-pre>for</code> 循环迭代容器 <code v-pre>c</code> 中的元素（对于树或图的算法，这种简单的 <code v-pre>for</code> 循环可以替换为深度优先搜索）。</p>
<p>调用这个方法的代码可以这样迭代容器：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">for</span> x <span class="token operator">:=</span> <span class="token keyword">range</span> container<span class="token punctuation">.</span><span class="token function">Iter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token operator">...</span> <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>其运行在自己启动的协程中，所以上边的迭代用到了一个通道和两个协程（可能运行在不同的线程上）。 这样我们就有了一个典型的生产者-消费者模式。如果在程序结束之前，向通道写值的协程未完成工作，则这个协程不会被垃圾回收；这是设计使然。这种看起来并不符合预期的行为正是由通道这种线程安全的通信方式所导致的。如此一来，一个协程为了写入一个永远无人读取的通道而被挂起就成了一个 bug ，而并非你预想中的那样被悄悄回收掉 (garbage-collected) 了。</p>
<p><strong>习惯用法：生产者消费者模式</strong></p>
<p>假设你有 <code v-pre>Produce()</code> 函数来产生 <code v-pre>Consume()</code> 函数需要的值。它们都可以运行在独立的协程中，生产者在通道中放入给消费者读取的值。整个处理过程可以替换为无限循环：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">for</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token function">Consume</span><span class="token punctuation">(</span><span class="token function">Produce</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_14-2-11-通道的方向" tabindex="-1"><a class="header-anchor" href="#_14-2-11-通道的方向"><span>14.2.11 通道的方向</span></a></h2>
<p>通道类型可以用注解来表示它只发送或者只接收：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">var</span> send_only <span class="token keyword">chan</span><span class="token operator">&lt;-</span> <span class="token builtin">int</span> 		<span class="token comment">// channel can only receive data</span></span>
<span class="line"><span class="token keyword">var</span> recv_only <span class="token operator">&lt;-</span><span class="token keyword">chan</span> <span class="token builtin">int</span>		<span class="token comment">// channel can only send data</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>只接收的通道 (<code v-pre>&lt;-chan T</code>) 无法关闭，因为关闭通道是发送者用来表示不再给通道发送值了，所以对只接收通道是没有意义的。通道创建的时候都是双向的，但也可以分配给有方向的通道变量，就像以下代码：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">var</span> c <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token comment">// bidirectional</span></span>
<span class="line"><span class="token keyword">go</span> <span class="token function">source</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">go</span> <span class="token function">sink</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">source</span><span class="token punctuation">(</span>ch <span class="token keyword">chan</span><span class="token operator">&lt;-</span> <span class="token builtin">int</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">for</span> <span class="token punctuation">{</span> ch <span class="token operator">&lt;-</span> <span class="token number">1</span> <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">sink</span><span class="token punctuation">(</span>ch <span class="token operator">&lt;-</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">for</span> <span class="token punctuation">{</span> <span class="token operator">&lt;-</span>ch <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>习惯用法：管道和选择器模式</strong></p>
<p>更具体的例子还有协程处理它从通道接收的数据并发送给输出通道：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">sendChan <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span></span>
<span class="line">receiveChan <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">string</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">go</span> <span class="token function">processChannel</span><span class="token punctuation">(</span>sendChan<span class="token punctuation">,</span> receiveChan<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">processChannel</span><span class="token punctuation">(</span>in <span class="token operator">&lt;-</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> out <span class="token keyword">chan</span><span class="token operator">&lt;-</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">for</span> inValue <span class="token operator">:=</span> <span class="token keyword">range</span> in <span class="token punctuation">{</span></span>
<span class="line">		result <span class="token operator">:=</span> <span class="token operator">...</span> <span class="token comment">/// processing inValue</span></span>
<span class="line">		out <span class="token operator">&lt;-</span> result</span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过使用方向注解来限制协程对通道的操作。</p>
<p>这里有一个来自 Go 指导的很赞的例子，打印了输出的素数，使用选择器（‘筛’）作为它的算法。每个 prime 都有一个选择器，如下图：</p>
<p><img src="/images/14.2_fig14.2.png" alt=""></p>
<p>版本1：示例 14.7-<a href="examples/chapter_14/sieve1.go">sieve1.go</a></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token comment">// Copyright 2009 The Go Authors. All rights reserved.</span></span>
<span class="line"><span class="token comment">// Use of this source code is governed by a BSD-style</span></span>
<span class="line"><span class="token comment">// license that can be found in the LICENSE file.package main</span></span>
<span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token string">"fmt"</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// Send the sequence 2, 3, 4, ... to channel 'ch'.</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">generate</span><span class="token punctuation">(</span>ch <span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">2</span><span class="token punctuation">;</span> <span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span></span>
<span class="line">		ch <span class="token operator">&lt;-</span> i <span class="token comment">// Send 'i' to channel 'ch'.</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// Copy the values from channel 'in' to channel 'out',</span></span>
<span class="line"><span class="token comment">// removing those divisible by 'prime'.</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">filter</span><span class="token punctuation">(</span>in<span class="token punctuation">,</span> out <span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> prime <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">for</span> <span class="token punctuation">{</span></span>
<span class="line">		i <span class="token operator">:=</span> <span class="token operator">&lt;-</span>in <span class="token comment">// Receive value of new variable 'i' from 'in'.</span></span>
<span class="line">		<span class="token keyword">if</span> i<span class="token operator">%</span>prime <span class="token operator">!=</span> <span class="token number">0</span> <span class="token punctuation">{</span></span>
<span class="line">			out <span class="token operator">&lt;-</span> i <span class="token comment">// Send 'i' to channel 'out'.</span></span>
<span class="line">		<span class="token punctuation">}</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// The prime sieve: Daisy-chain filter processes together.</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token comment">// Create a new channel.</span></span>
<span class="line">	<span class="token keyword">go</span> <span class="token function">generate</span><span class="token punctuation">(</span>ch<span class="token punctuation">)</span>      <span class="token comment">// Start generate() as a goroutine.</span></span>
<span class="line">	<span class="token keyword">for</span> <span class="token punctuation">{</span></span>
<span class="line">		prime <span class="token operator">:=</span> <span class="token operator">&lt;-</span>ch</span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span>prime<span class="token punctuation">,</span> <span class="token string">" "</span><span class="token punctuation">)</span></span>
<span class="line">		ch1 <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span></span>
<span class="line">		<span class="token keyword">go</span> <span class="token function">filter</span><span class="token punctuation">(</span>ch<span class="token punctuation">,</span> ch1<span class="token punctuation">,</span> prime<span class="token punctuation">)</span></span>
<span class="line">		ch <span class="token operator">=</span> ch1</span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>协程 <code v-pre>filter(in, out chan int, prime int)</code> 拷贝整数到输出通道，丢弃掉可以被 <code v-pre>prime</code> 整除的数字。然后每个 <code v-pre>prime</code> 又开启了一个新的协程，生成器和选择器并发请求。</p>
<p>输出：</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">2 3 5 7 11 13 17 19 23 29 31 37 41 43 47 53 59 61 67 71 73 79 83 89 97 101</span>
<span class="line">103 107 109 113 127 131 137 139 149 151 157 163 167 173 179 181 191 193 197 199 211 223</span>
<span class="line">227 229 233 239 241 251 257 263 269 271 277 281 283 293 307 311 313 317 331 337 347 349</span>
<span class="line">353 359 367 373 379 383 389 397 401 409 419 421 431 433 439 443 449 457 461 463 467 479</span>
<span class="line">487 491 499 503 509 521 523 541 547 557 563 569 571 577 587 593 599 601 607 613 617 619</span>
<span class="line">631 641 643 647 653 659 661 673 677 683 691 701 709 719 727 733 739 743 751 757 761 769</span>
<span class="line">773 787 797 809 811 821 823 827 829 839 853 857 859 863 877 881 883 887 907 911 919 929</span>
<span class="line">937 941 947 953 967 971 977 983 991 997 1009 1013...</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第二个版本引入了上边的习惯用法：函数 <code v-pre>sieve()</code>、<code v-pre>generate()</code> 和 <code v-pre>filter()</code> 都是工厂；它们创建通道并返回，而且使用了协程的 lambda 函数。<code v-pre>main()</code> 函数现在短小清晰：它调用 <code v-pre>sieve()</code> 返回了包含素数的通道，然后通过 <code v-pre>fmt.Println(&lt;-primes)</code> 打印出来。</p>
<p>版本2：示例 14.8-<a href="examples/chapter_14/sieve2.go">sieve2.go</a></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token comment">// Copyright 2009 The Go Authors. All rights reserved.</span></span>
<span class="line"><span class="token comment">// Use of this source code is governed by a BSD-style</span></span>
<span class="line"><span class="token comment">// license that can be found in the LICENSE file.</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"fmt"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// Send the sequence 2, 3, 4, ... to returned channel</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">generate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">chan</span> <span class="token builtin">int</span> <span class="token punctuation">{</span></span>
<span class="line">	ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">2</span><span class="token punctuation">;</span> <span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span></span>
<span class="line">			ch <span class="token operator">&lt;-</span> i</span>
<span class="line">		<span class="token punctuation">}</span></span>
<span class="line">	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">return</span> ch</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// Filter out input values divisible by 'prime', send rest to returned channel</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">filter</span><span class="token punctuation">(</span>in <span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> prime <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token keyword">chan</span> <span class="token builtin">int</span> <span class="token punctuation">{</span></span>
<span class="line">	out <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token keyword">for</span> <span class="token punctuation">{</span></span>
<span class="line">			<span class="token keyword">if</span> i <span class="token operator">:=</span> <span class="token operator">&lt;-</span>in<span class="token punctuation">;</span> i<span class="token operator">%</span>prime <span class="token operator">!=</span> <span class="token number">0</span> <span class="token punctuation">{</span></span>
<span class="line">				out <span class="token operator">&lt;-</span> i</span>
<span class="line">			<span class="token punctuation">}</span></span>
<span class="line">		<span class="token punctuation">}</span></span>
<span class="line">	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">return</span> out</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">sieve</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">chan</span> <span class="token builtin">int</span> <span class="token punctuation">{</span></span>
<span class="line">	out <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">		ch <span class="token operator">:=</span> <span class="token function">generate</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">		<span class="token keyword">for</span> <span class="token punctuation">{</span></span>
<span class="line">			prime <span class="token operator">:=</span> <span class="token operator">&lt;-</span>ch</span>
<span class="line">			ch <span class="token operator">=</span> <span class="token function">filter</span><span class="token punctuation">(</span>ch<span class="token punctuation">,</span> prime<span class="token punctuation">)</span></span>
<span class="line">			out <span class="token operator">&lt;-</span> prime</span>
<span class="line">		<span class="token punctuation">}</span></span>
<span class="line">	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">return</span> out</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	primes <span class="token operator">:=</span> <span class="token function">sieve</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">for</span> <span class="token punctuation">{</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">&lt;-</span>primes<span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-3/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-3/14.1.html">并发、并行和协程</RouteLink></li>
<li>下一节：<RouteLink to="/chapter-3/14.3.html">协程同步：关闭通道-测试阻塞的通道</RouteLink></li>
</ul>
</div></template>


