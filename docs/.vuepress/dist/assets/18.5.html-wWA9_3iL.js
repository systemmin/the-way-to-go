import{_ as l,c as i,a as o,b as a,d as p,e,f as s,r as c,o as u}from"./app-DtITwm2S.js";const r={};function k(d,n){const t=c("RouteLink");return u(),i("div",null,[n[5]||(n[5]=o(`<h1 id="_18-5-接口" tabindex="-1"><a class="header-anchor" href="#_18-5-接口"><span>18.5 接口</span></a></h1><p>（1）如何检测一个值 <code>v</code> 是否实现了接口 <code>Stringer</code>：</p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line"><span class="token keyword">if</span> v<span class="token punctuation">,</span> ok <span class="token operator">:=</span> v<span class="token punctuation">.</span><span class="token punctuation">(</span>Stringer<span class="token punctuation">)</span><span class="token punctuation">;</span> ok <span class="token punctuation">{</span></span>
<span class="line">    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;implements String(): %s\\n&quot;</span><span class="token punctuation">,</span> v<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（2）如何使用接口实现一个类型分类函数：</p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">classifier</span><span class="token punctuation">(</span>items <span class="token operator">...</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">for</span> i<span class="token punctuation">,</span> x <span class="token operator">:=</span> <span class="token keyword">range</span> items <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">switch</span> x<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token keyword">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">case</span> <span class="token builtin">bool</span><span class="token punctuation">:</span></span>
<span class="line">            fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;param #%d is a bool\\n&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">case</span> <span class="token builtin">float64</span><span class="token punctuation">:</span></span>
<span class="line">            fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;param #%d is a float64\\n&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">case</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token builtin">int64</span><span class="token punctuation">:</span></span>
<span class="line">            fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;param #%d is an int\\n&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">case</span> <span class="token boolean">nil</span><span class="token punctuation">:</span></span>
<span class="line">            fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;param #%d is nil\\n&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">case</span> <span class="token builtin">string</span><span class="token punctuation">:</span></span>
<span class="line">            fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;param #%d is a string\\n&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">default</span><span class="token punctuation">:</span></span>
<span class="line">            fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;param #%d’s type is unknown\\n&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>`,6)),a("ul",null,[a("li",null,[p(t,{to:"/chapter-4/directory.html"},{default:e(()=>n[0]||(n[0]=[s("目录")])),_:1})]),a("li",null,[n[2]||(n[2]=s("上一节：")),p(t,{to:"/chapter-4/18.4.html"},{default:e(()=>n[1]||(n[1]=[s("结构体")])),_:1})]),a("li",null,[n[4]||(n[4]=s("下一节：")),p(t,{to:"/chapter-4/18.6.html"},{default:e(()=>n[3]||(n[3]=[s("函数")])),_:1})])])])}const v=l(r,[["render",k],["__file","18.5.html.vue"]]),f=JSON.parse('{"path":"/chapter-4/18.5.html","title":"18.5 接口","lang":"zh-cn","frontmatter":{},"headers":[{"level":1,"title":"18.5 接口","slug":"_18-5-接口","link":"#_18-5-接口","children":[{"level":2,"title":"链接","slug":"链接","link":"#链接","children":[]}]}],"git":{},"filePathRelative":"chapter-4/18.5.md"}');export{v as comp,f as data};