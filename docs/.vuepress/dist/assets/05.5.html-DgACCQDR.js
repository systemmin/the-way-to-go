import{_ as o,c as i,a as l,b as a,f as s,d as t,e as p,r as c,o as r}from"./app-DtITwm2S.js";const u={};function d(k,n){const e=c("RouteLink");return r(),i("div",null,[n[18]||(n[18]=l(`<h1 id="_5-5-break-与-continue" tabindex="-1"><a class="header-anchor" href="#_5-5-break-与-continue"><span>5.5 break 与 continue</span></a></h1><p>您可以使用 <code>break</code> 语句重写 <a href="examples/chapter_5/for2.go">for2.go</a> 的代码：</p><p>示例 5.10 <a href="examples/chapter_5/for3.go">for3.go</a>：</p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line"><span class="token keyword">for</span> <span class="token punctuation">{</span></span>
<span class="line">	i <span class="token operator">=</span> i <span class="token operator">-</span> <span class="token number">1</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;The variable i is now: %d\\n&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">if</span> i <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token keyword">break</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此每次迭代都会对条件进行检查（<code>i &lt; 0</code>），以此判断是否需要停止循环。如果退出条件满足，则使用 <code>break</code> 语句退出循环。</p>`,5)),a("p",null,[n[1]||(n[1]=s("一个 ")),n[2]||(n[2]=a("code",null,"break",-1)),n[3]||(n[3]=s(" 的作用范围为该语句出现后的最内部的结构，它可以被用于任何形式的 ")),n[4]||(n[4]=a("code",null,"for",-1)),n[5]||(n[5]=s(" 循环（计数器、条件判断等）。但在 ")),n[6]||(n[6]=a("code",null,"switch",-1)),n[7]||(n[7]=s(" 或 ")),n[8]||(n[8]=a("code",null,"select",-1)),n[9]||(n[9]=s(" 语句中（详见")),t(e,{to:"/chapter-2/13.0.html"},{default:p(()=>n[0]||(n[0]=[s("第 13 章")])),_:1}),n[10]||(n[10]=s("），")),n[11]||(n[11]=a("code",null,"break",-1)),n[12]||(n[12]=s(" 语句的作用结果是跳过整个代码块，执行后续的代码。"))]),n[19]||(n[19]=l(`<p>下面的示例中包含了嵌套的循环体（for4.go），<code>break</code> 只会退出最内层的循环：</p><p>示例 5.11 <a href="examples/chapter_5/for4.go">for4.go</a>：</p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">for</span> i<span class="token operator">:=</span><span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">&lt;</span><span class="token number">3</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token keyword">for</span> j<span class="token operator">:=</span><span class="token number">0</span><span class="token punctuation">;</span> j<span class="token operator">&lt;</span><span class="token number">10</span><span class="token punctuation">;</span> j<span class="token operator">++</span> <span class="token punctuation">{</span></span>
<span class="line">			<span class="token keyword">if</span> j<span class="token operator">&gt;</span><span class="token number">5</span> <span class="token punctuation">{</span></span>
<span class="line">			    <span class="token keyword">break</span>   </span>
<span class="line">			<span class="token punctuation">}</span></span>
<span class="line">			<span class="token function">print</span><span class="token punctuation">(</span>j<span class="token punctuation">)</span></span>
<span class="line">		<span class="token punctuation">}</span></span>
<span class="line">		<span class="token function">print</span><span class="token punctuation">(</span><span class="token string">&quot;  &quot;</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p><pre><code>012345 012345 012345
</code></pre><p>关键字 <code>continue</code> 忽略剩余的循环体而直接进入下一次循环的过程，但不是无条件执行下一次循环，执行之前依旧需要满足循环的判断条件。</p><p>示例 5.12 <a href="examples/chapter_5/for5.go">for5.go</a>：</p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token keyword">if</span> i <span class="token operator">==</span> <span class="token number">5</span> <span class="token punctuation">{</span></span>
<span class="line">			<span class="token keyword">continue</span></span>
<span class="line">		<span class="token punctuation">}</span></span>
<span class="line">		<span class="token function">print</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span></span>
<span class="line">		<span class="token function">print</span><span class="token punctuation">(</span><span class="token string">&quot; &quot;</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">0 1 2 3 4 6 7 8 9</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>显然，<code>5</code> 被跳过了。</p><p>另外，关键字 <code>continue</code> 只能被用于 <code>for</code> 循环中。</p><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>`,13)),a("ul",null,[a("li",null,[t(e,{to:"/chapter-2/directory.html"},{default:p(()=>n[13]||(n[13]=[s("目录")])),_:1})]),a("li",null,[n[15]||(n[15]=s("上一节：")),t(e,{to:"/chapter-2/05.4.html"},{default:p(()=>n[14]||(n[14]=[s("for 结构")])),_:1})]),a("li",null,[n[17]||(n[17]=s("下一节：")),t(e,{to:"/chapter-2/05.6.html"},{default:p(()=>n[16]||(n[16]=[s("标签与 goto")])),_:1})])])])}const v=o(u,[["render",d],["__file","05.5.html.vue"]]),b=JSON.parse('{"path":"/chapter-2/05.5.html","title":"5.5 break 与 continue","lang":"zh-cn","frontmatter":{},"headers":[{"level":1,"title":"5.5 break 与 continue","slug":"_5-5-break-与-continue","link":"#_5-5-break-与-continue","children":[{"level":2,"title":"链接","slug":"链接","link":"#链接","children":[]}]}],"git":{},"filePathRelative":"chapter-2/05.5.md"}');export{v as comp,b as data};