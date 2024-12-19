import{_ as o,c as p,a as i,b as t,f as a,d as s,e as l,r,o as u}from"./app-DtITwm2S.js";const d={};function c(m,n){const e=r("RouteLink");return u(),p("div",null,[n[8]||(n[8]=i(`<h1 id="_18-9-网络和网页应用" tabindex="-1"><a class="header-anchor" href="#_18-9-网络和网页应用"><span>18.9 网络和网页应用</span></a></h1><h2 id="_18-9-1-模板" tabindex="-1"><a class="header-anchor" href="#_18-9-1-模板"><span>18.9.1 模板：</span></a></h2><p>制作、解析并使模板生效：</p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line"><span class="token keyword">var</span> strTempl <span class="token operator">=</span> template<span class="token punctuation">.</span><span class="token function">Must</span><span class="token punctuation">(</span>template<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">&quot;TName&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span>strTemplateHTML<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>在网页应用中使用 HTML 过滤器过滤 HTML 特殊字符：</p><p>使用 <code>{{html .}}</code> 或者通过一个字段 <code>FieldName {{ .FieldName |html }}</code></p>`,6)),t("p",null,[n[1]||(n[1]=a("使用缓存模板（参考")),s(e,{to:"/chapter-4/15.7.html"},{default:l(()=>n[0]||(n[0]=[a("章节 15.7")])),_:1}),n[2]||(n[2]=a("）"))]),n[9]||(n[9]=t("h2",{id:"链接",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#链接"},[t("span",null,"链接")])],-1)),t("ul",null,[t("li",null,[s(e,{to:"/chapter-4/directory.html"},{default:l(()=>n[3]||(n[3]=[a("目录")])),_:1})]),t("li",null,[n[5]||(n[5]=a("上一节：")),s(e,{to:"/chapter-4/18.8.html"},{default:l(()=>n[4]||(n[4]=[a("协程 (goroutine) 与通道 (channel)")])),_:1})]),t("li",null,[n[7]||(n[7]=a("下一节：")),s(e,{to:"/chapter-4/18.10.html"},{default:l(()=>n[6]||(n[6]=[a("其他")])),_:1})])])])}const k=o(d,[["render",c],["__file","18.9.html.vue"]]),f=JSON.parse('{"path":"/chapter-4/18.9.html","title":"18.9 网络和网页应用","lang":"zh-cn","frontmatter":{},"headers":[{"level":1,"title":"18.9 网络和网页应用","slug":"_18-9-网络和网页应用","link":"#_18-9-网络和网页应用","children":[{"level":2,"title":"18.9.1 模板：","slug":"_18-9-1-模板","link":"#_18-9-1-模板","children":[]},{"level":2,"title":"链接","slug":"链接","link":"#链接","children":[]}]}],"git":{},"filePathRelative":"chapter-4/18.9.md"}');export{k as comp,f as data};