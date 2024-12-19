import{_ as p,c as o,a as i,b as a,d as t,e as l,f as s,r as c,o as r}from"./app-DtITwm2S.js";const d={};function u(m,n){const e=c("RouteLink");return r(),o("div",null,[n[5]||(n[5]=i(`<h1 id="_16-1-误用短声明导致变量覆盖" tabindex="-1"><a class="header-anchor" href="#_16-1-误用短声明导致变量覆盖"><span>16.1 误用短声明导致变量覆盖</span></a></h1><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line"><span class="token keyword">var</span> remember <span class="token builtin">bool</span> <span class="token operator">=</span> <span class="token boolean">false</span></span>
<span class="line"><span class="token keyword">if</span> something <span class="token punctuation">{</span></span>
<span class="line">    remember <span class="token operator">:=</span> <span class="token boolean">true</span> <span class="token comment">//错误</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token comment">// 使用remember</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在此代码段中，<code>remember</code> 变量永远不会在 <code>if</code> 语句外面变成 <code>true</code>，如果 <code>something</code> 为 <code>true</code>，由于使用了短声明 <code>:=</code>，<code>if</code> 语句内部的新变量 <code>remember</code> 将覆盖外面的 <code>remember</code> 变量，并且该变量的值为 <code>true</code>，但是在 <code>if</code> 语句外面，变量 <code>remember</code> 的值变成了 <code>false</code>，所以正确的写法应该是：</p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line"><span class="token keyword">if</span> something <span class="token punctuation">{</span></span>
<span class="line">    remember <span class="token operator">=</span> <span class="token boolean">true</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此类错误也容易在 <code>for</code> 循环中出现，尤其当函数返回一个具名变量时难于察觉，例如以下的代码段：</p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">shadow</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	x<span class="token punctuation">,</span> err <span class="token operator">:=</span> <span class="token function">check1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// x 是新创建变量，err 是被赋值</span></span>
<span class="line">	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token keyword">return</span> <span class="token comment">// 正确返回 err</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	<span class="token keyword">if</span> y<span class="token punctuation">,</span> err <span class="token operator">:=</span> <span class="token function">check2</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span> <span class="token comment">// y 和 if 语句中 err 被创建</span></span>
<span class="line">		<span class="token keyword">return</span> <span class="token comment">// if 语句中的 err 覆盖外面的 err，所以错误的返回 nil ！</span></span>
<span class="line">	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>y<span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	<span class="token keyword">return</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>`,7)),a("ul",null,[a("li",null,[t(e,{to:"/chapter-4/directory.html"},{default:l(()=>n[0]||(n[0]=[s("目录")])),_:1})]),a("li",null,[n[2]||(n[2]=s("上一节：")),t(e,{to:"/chapter-4/16.0.html"},{default:l(()=>n[1]||(n[1]=[s("常见的陷阱与错误")])),_:1})]),a("li",null,[n[4]||(n[4]=s("下一节：")),t(e,{to:"/chapter-4/16.2.html"},{default:l(()=>n[3]||(n[3]=[s("误用字符串")])),_:1})])])])}const v=p(d,[["render",u],["__file","16.1.html.vue"]]),b=JSON.parse('{"path":"/chapter-4/16.1.html","title":"16.1 误用短声明导致变量覆盖","lang":"zh-cn","frontmatter":{},"headers":[{"level":1,"title":"16.1 误用短声明导致变量覆盖","slug":"_16-1-误用短声明导致变量覆盖","link":"#_16-1-误用短声明导致变量覆盖","children":[{"level":2,"title":"链接","slug":"链接","link":"#链接","children":[]}]}],"git":{},"filePathRelative":"chapter-4/16.1.md"}');export{v as comp,b as data};