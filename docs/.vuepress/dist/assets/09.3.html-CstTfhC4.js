import{_ as p,c as o,a as i,b as a,f as s,d as t,e as l,r as c,o as d}from"./app-DtITwm2S.js";const u={};function r(m,n){const e=c("RouteLink");return d(),o("div",null,[n[14]||(n[14]=i(`<h1 id="_9-3-锁和-sync-包" tabindex="-1"><a class="header-anchor" href="#_9-3-锁和-sync-包"><span>9.3 锁和 sync 包</span></a></h1><p>在一些复杂的程序中，通常通过不同线程执行不同应用来实现程序的并发。当不同线程要使用同一个变量时，经常会出现一个问题：无法预知变量被不同线程修改的顺序！（这通常被称为资源竞争，指不同线程对同一变量使用的竞争）显然这无法让人容忍，那我们该如何解决这个问题呢？</p><p>经典的做法是一次只能让一个线程对共享变量进行操作。当变量被一个线程改变时（临界区），我们为它上锁，直到这个线程执行完成并解锁后，其他线程才能访问它。</p><p>特别是我们之前章节学习的 <code>map</code> 类型是不存在锁的机制来实现这种效果（出于对性能的考虑），所以 map 类型是非线程安全的。当并行访问一个共享的 <code>map</code> 类型的数据，<code>map</code> 数据将会出错。</p><p>在 Go 语言中这种锁的机制是通过 <code>sync</code> 包中 <code>Mutex</code> 来实现的。sync 来源于 &quot;synchronized&quot; 一词，这意味着线程将有序的对同一变量进行访问。</p><p><code>sync.Mutex</code> 是一个互斥锁，它的作用是守护在临界区入口来确保同一时间只能有一个线程进入临界区。</p><p>假设 <code>info</code> 是一个需要上锁的放在共享内存中的变量。通过包含 <code>Mutex</code> 来实现的一个典型例子如下：</p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line"><span class="token keyword">import</span>  <span class="token string">&quot;sync&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">type</span> Info <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">	mu sync<span class="token punctuation">.</span>Mutex</span>
<span class="line">	<span class="token comment">// ... other fields, e.g.: Str string</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果一个函数想要改变这个变量可以这样写:</p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">Update</span><span class="token punctuation">(</span>info <span class="token operator">*</span>Info<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	info<span class="token punctuation">.</span>mu<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token comment">// critical section:</span></span>
<span class="line">    info<span class="token punctuation">.</span>Str <span class="token operator">=</span> <span class="token comment">// new value</span></span>
<span class="line">    <span class="token comment">// end critical section</span></span>
<span class="line">    info<span class="token punctuation">.</span>mu<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>还有一个很有用的例子是通过 <code>Mutex</code> 来实现一个可以上锁的共享缓冲器:</p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line"><span class="token keyword">type</span> SyncedBuffer <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">	lock 	sync<span class="token punctuation">.</span>Mutex</span>
<span class="line">	buffer  bytes<span class="token punctuation">.</span>Buffer</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 <code>sync</code> 包中还有一个 <code>RWMutex</code> 锁：它能通过 <code>RLock()</code> 来允许同一时间多个线程对变量进行读操作，但是只能一个线程进行写操作。如果使用 <code>Lock()</code> 将和普通的 <code>Mutex</code> 作用相同。包中还有一个方便的 <code>Once</code> 类型变量的方法 <code>once.Do(call)</code>，这个方法确保被调用函数只能被调用一次。</p>`,13)),a("p",null,[n[2]||(n[2]=s("相对简单的情况下，通过使用 ")),n[3]||(n[3]=a("code",null,"sync",-1)),n[4]||(n[4]=s(" 包可以解决同一时间只能一个线程访问变量或 ")),n[5]||(n[5]=a("code",null,"map",-1)),n[6]||(n[6]=s(" 类型数据的问题。如果这种方式导致程序明显变慢或者引起其他问题，我们要重新思考来通过 goroutines 和 channels 来解决问题，这是在 Go 语言中所提倡用来实现并发的技术。我们将在")),t(e,{to:"/chapter-2/14.0.html"},{default:l(()=>n[0]||(n[0]=[s("第 14 章")])),_:1}),n[7]||(n[7]=s("对其深入了解，并在")),t(e,{to:"/chapter-2/14.7.html"},{default:l(()=>n[1]||(n[1]=[s("第 14.7 节")])),_:1}),n[8]||(n[8]=s("中对这两种方式进行比较。"))]),n[15]||(n[15]=a("h2",{id:"链接",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#链接"},[a("span",null,"链接")])],-1)),a("ul",null,[a("li",null,[t(e,{to:"/chapter-2/directory.html"},{default:l(()=>n[9]||(n[9]=[s("目录")])),_:1})]),a("li",null,[n[11]||(n[11]=s("上一节：")),t(e,{to:"/chapter-2/09.2.html"},{default:l(()=>n[10]||(n[10]=[s("regexp 包")])),_:1})]),a("li",null,[n[13]||(n[13]=s("下一节：")),t(e,{to:"/chapter-2/09.4.html"},{default:l(()=>n[12]||(n[12]=[s("精密计算和 big 包")])),_:1})])])])}const v=p(u,[["render",r],["__file","09.3.html.vue"]]),f=JSON.parse('{"path":"/chapter-2/09.3.html","title":"9.3 锁和 sync 包","lang":"zh-cn","frontmatter":{},"headers":[{"level":1,"title":"9.3 锁和 sync 包","slug":"_9-3-锁和-sync-包","link":"#_9-3-锁和-sync-包","children":[{"level":2,"title":"链接","slug":"链接","link":"#链接","children":[]}]}],"git":{},"filePathRelative":"chapter-2/09.3.md"}');export{v as comp,f as data};
