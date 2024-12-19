import{_ as p,c as l,b as s,f as a,d as o,e as t,a as c,r as i,o as r}from"./app-DtITwm2S.js";const d={};function u(k,n){const e=i("RouteLink");return r(),l("div",null,[n[10]||(n[10]=s("h1",{id:"_14-6-协程和恢复-recover",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#_14-6-协程和恢复-recover"},[s("span",null,"14.6 协程和恢复 (recover)")])],-1)),s("p",null,[n[1]||(n[1]=a("一个用到 ")),n[2]||(n[2]=s("code",null,"recover()",-1)),n[3]||(n[3]=a(" 的程序（参见")),o(e,{to:"/chapter-3/13.3.html"},{default:t(()=>n[0]||(n[0]=[a("第 13.3 节")])),_:1}),n[4]||(n[4]=a("停掉了服务器内部一个失败的协程而不影响其他协程的工作。"))]),n[11]||(n[11]=c(`<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">server</span><span class="token punctuation">(</span>workChan <span class="token operator">&lt;-</span><span class="token keyword">chan</span> <span class="token operator">*</span>Work<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">for</span> work <span class="token operator">:=</span> <span class="token keyword">range</span> workChan <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">go</span> <span class="token function">safelyDo</span><span class="token punctuation">(</span>work<span class="token punctuation">)</span>   <span class="token comment">// start the goroutine for that work</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">safelyDo</span><span class="token punctuation">(</span>work <span class="token operator">*</span>Work<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">if</span> err <span class="token operator">:=</span> <span class="token function">recover</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">            log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Work failed with %s in %v&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">,</span> work<span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token function">do</span><span class="token punctuation">(</span>work<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上边的代码，如果 <code>do(work)</code> 发生 <code>panic()</code>，错误会被记录且协程会退出并释放，而其他协程不受影响。</p><p>因为 <code>recover()</code> 总是返回 <code>nil</code>，除非直接在 <code>defer</code> 修饰的函数中调用，<code>defer</code> 修饰的代码可以调用那些自身可以使用 <code>panic()</code> 和 <code>recover()</code> 避免失败的库例程（库函数）。举例，<code>safelyDo()</code> 中 <code>defer</code> 修饰的函数可能在调用 <code>recover()</code> 之前就调用了一个 <code>logging()</code> 函数，panicking 状态不会影响 <code>logging()</code> 代码的运行。因为加入了恢复模式，函数 <code>do()</code>（以及它调用的任何东西）可以通过调用 <code>panic()</code> 来摆脱不好的情况。但是恢复是在 panicking 的协程内部的：不能被另外一个协程恢复。</p><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>`,4)),s("ul",null,[s("li",null,[o(e,{to:"/chapter-3/directory.html"},{default:t(()=>n[5]||(n[5]=[a("目录")])),_:1})]),s("li",null,[n[7]||(n[7]=a("上一节：")),o(e,{to:"/chapter-3/14.5.html"},{default:t(()=>n[6]||(n[6]=[a("通道，超时和计时器")])),_:1})]),s("li",null,[n[9]||(n[9]=a("下一节：")),o(e,{to:"/chapter-3/14.7.html"},{default:t(()=>n[8]||(n[8]=[a("对比新旧模型：任务和工作")])),_:1})])])])}const m=p(d,[["render",u],["__file","14.6.html.vue"]]),f=JSON.parse('{"path":"/chapter-3/14.6.html","title":"14.6 协程和恢复 (recover)","lang":"zh-cn","frontmatter":{},"headers":[{"level":1,"title":"14.6 协程和恢复 (recover)","slug":"_14-6-协程和恢复-recover","link":"#_14-6-协程和恢复-recover","children":[{"level":2,"title":"链接","slug":"链接","link":"#链接","children":[]}]}],"git":{},"filePathRelative":"chapter-3/14.6.md"}');export{m as comp,f as data};
