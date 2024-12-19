import{_ as o,c as l,b as s,f as a,d as p,e,a as i,r as c,o as u}from"./app-DtITwm2S.js";const r={};function k(d,n){const t=c("RouteLink");return u(),l("div",null,[n[16]||(n[16]=s("h1",{id:"_15-10-基于网络的通道-netchan",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#_15-10-基于网络的通道-netchan"},[s("span",null,"15.10 基于网络的通道 netchan")])],-1)),n[17]||(n[17]=s("p",null,[a("备注：Go 团队决定改进并重新打造 "),s("code",null,"netchan"),a(" 包的现有版本，它已被移至 "),s("code",null,"old/netchan"),a("。"),s("code",null,"old/"),a(" 目录用于存放过时的包代码，它们不会成为 Go 1.x 的一部分。本节仅出于向后兼容性讨论 "),s("code",null,"netchan"),a(" 包的概念。")],-1)),s("p",null,[n[1]||(n[1]=a("一项和 ")),n[2]||(n[2]=s("code",null,"rpc",-1)),n[3]||(n[3]=a(" 密切相关的技术是基于网络的通道。类似 ")),p(t,{to:"/chapter-3/14.0.html"},{default:e(()=>n[0]||(n[0]=[a("14 章")])),_:1}),n[4]||(n[4]=a("所使用的通道都是本地的，它们仅存在于被执行的机器内存空间中。")),n[5]||(n[5]=s("code",null,"netchan",-1)),n[6]||(n[6]=a(" 包实现了类型安全的网络化通道：它允许一个通道两端出现由网络连接的不同计算机。其实现原理是，在其中一台机器上将传输数据发送到通道中，那么就可以被另一台计算机上同类型的通道接收。一个导出器 (")),n[7]||(n[7]=s("code",null,"exporter",-1)),n[8]||(n[8]=a(") 会按名称发布（一组）通道。导入器 (")),n[9]||(n[9]=s("code",null,"importer",-1)),n[10]||(n[10]=a(") 连接到导出的机器，并按名称导入这些通道。之后，两台机器就可按通常的方式来使用通道。网络通道不是同步的，它们类似于带缓存的通道。"))]),n[18]||(n[18]=i(`<p>发送端示例代码如下：</p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line">exp<span class="token punctuation">,</span> err <span class="token operator">:=</span> netchan<span class="token punctuation">.</span><span class="token function">NewExporter</span><span class="token punctuation">(</span><span class="token string">&quot;tcp&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;netchanserver.mydomain.com:1234&quot;</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">	log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;Error making Exporter: %v&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line">ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> myType<span class="token punctuation">)</span></span>
<span class="line">err <span class="token operator">:=</span> exp<span class="token punctuation">.</span><span class="token function">Export</span><span class="token punctuation">(</span><span class="token string">&quot;sendmyType&quot;</span><span class="token punctuation">,</span> ch<span class="token punctuation">,</span> netchan<span class="token punctuation">.</span>Send<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">	log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;Send Error: %v&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接收端示例代码如下：</p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line">imp<span class="token punctuation">,</span> err <span class="token operator">:=</span> netchan<span class="token punctuation">.</span><span class="token function">NewImporter</span><span class="token punctuation">(</span><span class="token string">&quot;tcp&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;netchanserver.mydomain.com:1234&quot;</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">	log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;Error making Importer: %v&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line">ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> myType<span class="token punctuation">)</span></span>
<span class="line">err <span class="token operator">=</span> imp<span class="token punctuation">.</span><span class="token function">Import</span><span class="token punctuation">(</span><span class="token string">&quot;sendmyType&quot;</span><span class="token punctuation">,</span> ch<span class="token punctuation">,</span> netchan<span class="token punctuation">.</span>Receive<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">	log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;Receive Error: %v&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>`,5)),s("ul",null,[s("li",null,[p(t,{to:"/chapter-3/directory.html"},{default:e(()=>n[11]||(n[11]=[a("目录")])),_:1})]),s("li",null,[n[13]||(n[13]=a("上一节：")),p(t,{to:"/chapter-3/15.9.html"},{default:e(()=>n[12]||(n[12]=[a("用 rpc 实现远程过程调用")])),_:1})]),s("li",null,[n[15]||(n[15]=a("下一节：")),p(t,{to:"/chapter-3/15.11.html"},{default:e(()=>n[14]||(n[14]=[a("与 websocket 通信")])),_:1})])])])}const v=o(r,[["render",k],["__file","15.10.html.vue"]]),g=JSON.parse('{"path":"/chapter-3/15.10.html","title":"15.10 基于网络的通道 netchan","lang":"zh-cn","frontmatter":{},"headers":[{"level":1,"title":"15.10 基于网络的通道 netchan","slug":"_15-10-基于网络的通道-netchan","link":"#_15-10-基于网络的通道-netchan","children":[{"level":2,"title":"链接","slug":"链接","link":"#链接","children":[]}]}],"git":{},"filePathRelative":"chapter-3/15.10.md"}');export{v as comp,g as data};