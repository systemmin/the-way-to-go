import{_ as i,c as p,a as o,b as a,d as l,e as t,f as s,r as c,o as d}from"./app-DtITwm2S.js";const u={};function r(k,n){const e=c("RouteLink");return d(),p("div",null,[n[5]||(n[5]=o(`<h1 id="_11-2-接口嵌套接口" tabindex="-1"><a class="header-anchor" href="#_11-2-接口嵌套接口"><span>11.2 接口嵌套接口</span></a></h1><p>一个接口可以包含一个或多个其他的接口，这相当于直接将这些内嵌接口的方法列举在外层接口中一样。</p><p>比如接口 <code>File</code> 包含了 <code>ReadWrite</code> 和 <code>Lock</code> 的所有方法，它还额外有一个 <code>Close()</code> 方法。</p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line"><span class="token keyword">type</span> ReadWrite <span class="token keyword">interface</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">Read</span><span class="token punctuation">(</span>b Buffer<span class="token punctuation">)</span> <span class="token builtin">bool</span></span>
<span class="line">    <span class="token function">Write</span><span class="token punctuation">(</span>b Buffer<span class="token punctuation">)</span> <span class="token builtin">bool</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">type</span> Lock <span class="token keyword">interface</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">type</span> File <span class="token keyword">interface</span> <span class="token punctuation">{</span></span>
<span class="line">    ReadWrite</span>
<span class="line">    Lock</span>
<span class="line">    <span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>`,5)),a("ul",null,[a("li",null,[l(e,{to:"/chapter-2/directory.html"},{default:t(()=>n[0]||(n[0]=[s("目录")])),_:1})]),a("li",null,[n[2]||(n[2]=s("上一节：")),l(e,{to:"/chapter-2/11.1.html"},{default:t(()=>n[1]||(n[1]=[s("接口是什么")])),_:1})]),a("li",null,[n[4]||(n[4]=s("下一节：")),l(e,{to:"/chapter-2/11.3.html"},{default:t(()=>n[3]||(n[3]=[s("如何检测和转换接口变量的类型：类型断言")])),_:1})])])])}const m=i(u,[["render",r],["__file","11.2.html.vue"]]),b=JSON.parse('{"path":"/chapter-2/11.2.html","title":"11.2 接口嵌套接口","lang":"zh-cn","frontmatter":{},"headers":[{"level":1,"title":"11.2 接口嵌套接口","slug":"_11-2-接口嵌套接口","link":"#_11-2-接口嵌套接口","children":[{"level":2,"title":"链接","slug":"链接","link":"#链接","children":[]}]}],"git":{},"filePathRelative":"chapter-2/11.2.md"}');export{m as comp,b as data};
