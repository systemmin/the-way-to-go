import{_ as l,c as o,a as i,b as s,f as a,d as p,e,r as c,o as u}from"./app-DtITwm2S.js";const r={};function d(k,n){const t=c("RouteLink");return u(),o("div",null,[n[15]||(n[15]=i(`<h1 id="_9-2-regexp-包" tabindex="-1"><a class="header-anchor" href="#_9-2-regexp-包"><span>9.2 regexp 包</span></a></h1><p>正则表达式语法和使用的详细信息请参考 <a href="http://en.wikipedia.org/wiki/Regular_expression" target="_blank" rel="noopener noreferrer">维基百科</a>。</p><p>在下面的程序里，我们将在字符串中对正则表达式模式 (pattern) 进行匹配。</p><p>如果是简单模式，使用 <code>Match()</code> 方法便可：</p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line">ok<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> regexp<span class="token punctuation">.</span><span class="token function">Match</span><span class="token punctuation">(</span>pat<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span>searchIn<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>变量 <code>ok</code> 将返回 <code>true</code> 或者 <code>false</code>，我们也可以使用 <code>MatchString()</code>：</p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line">ok<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> regexp<span class="token punctuation">.</span><span class="token function">MatchString</span><span class="token punctuation">(</span>pat<span class="token punctuation">,</span> searchIn<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>更多方法中，必须先将正则模式通过 <code>Compile()</code> 方法返回一个 <code>Regexp</code> 对象。然后我们将掌握一些匹配，查找，替换相关的功能。</p><p>示例 9.2 <a href="examples/chapter_9/pattern.go">pattern.go</a>：</p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">&quot;fmt&quot;</span></span>
<span class="line">	<span class="token string">&quot;regexp&quot;</span></span>
<span class="line">	<span class="token string">&quot;strconv&quot;</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token comment">//目标字符串</span></span>
<span class="line">	searchIn <span class="token operator">:=</span> <span class="token string">&quot;John: 2578.34 William: 4567.23 Steve: 5632.18&quot;</span></span>
<span class="line">	pat <span class="token operator">:=</span> <span class="token string">&quot;[0-9]+.[0-9]+&quot;</span> <span class="token comment">//正则</span></span>
<span class="line"></span>
<span class="line">	f <span class="token operator">:=</span> <span class="token keyword">func</span><span class="token punctuation">(</span>s <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span></span>
<span class="line">		v<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> strconv<span class="token punctuation">.</span><span class="token function">ParseFloat</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> <span class="token number">32</span><span class="token punctuation">)</span></span>
<span class="line">		<span class="token keyword">return</span> strconv<span class="token punctuation">.</span><span class="token function">FormatFloat</span><span class="token punctuation">(</span>v<span class="token operator">*</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token char">&#39;f&#39;</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">32</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">	<span class="token keyword">if</span> ok<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> regexp<span class="token punctuation">.</span><span class="token function">Match</span><span class="token punctuation">(</span>pat<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span>searchIn<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> ok <span class="token punctuation">{</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Match Found!&quot;</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">	re<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> regexp<span class="token punctuation">.</span><span class="token function">Compile</span><span class="token punctuation">(</span>pat<span class="token punctuation">)</span></span>
<span class="line">	<span class="token comment">//将匹配到的部分替换为&quot;##.#&quot;</span></span>
<span class="line">	str <span class="token operator">:=</span> re<span class="token punctuation">.</span><span class="token function">ReplaceAllString</span><span class="token punctuation">(</span>searchIn<span class="token punctuation">,</span> <span class="token string">&quot;##.#&quot;</span><span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span></span>
<span class="line">	<span class="token comment">//参数为函数时</span></span>
<span class="line">	str2 <span class="token operator">:=</span> re<span class="token punctuation">.</span><span class="token function">ReplaceAllStringFunc</span><span class="token punctuation">(</span>searchIn<span class="token punctuation">,</span> f<span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>str2<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出结果：</p><pre><code>Match Found!
John: ##.# William: ##.# Steve: ##.#
John: 5156.68 William: 9134.46 Steve: 11264.36
</code></pre>`,12)),s("p",null,[n[1]||(n[1]=s("code",null,"Compile()",-1)),n[2]||(n[2]=a(" 函数也可能返回一个错误，我们在使用时忽略对错误的判断是因为我们确信自己正则表达式是有效的。当用户输入或从数据中获取正则表达式的时候，我们有必要去检验它的正确性。另外我们也可以使用 ")),n[3]||(n[3]=s("code",null,"MustCompile()",-1)),n[4]||(n[4]=a(" 方法，它可以像 ")),n[5]||(n[5]=s("code",null,"Compile()",-1)),n[6]||(n[6]=a(" 方法一样检验正则的有效性，但是当正则不合法时程序将 ")),n[7]||(n[7]=s("code",null,"panic()",-1)),n[8]||(n[8]=a("（详情查看")),p(t,{to:"/chapter-2/13.2.html"},{default:e(()=>n[0]||(n[0]=[a("第 13.2 节")])),_:1}),n[9]||(n[9]=a("）。"))]),n[16]||(n[16]=s("h2",{id:"链接",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#链接"},[s("span",null,"链接")])],-1)),s("ul",null,[s("li",null,[p(t,{to:"/chapter-2/directory.html"},{default:e(()=>n[10]||(n[10]=[a("目录")])),_:1})]),s("li",null,[n[12]||(n[12]=a("上一节：")),p(t,{to:"/chapter-2/09.1.html"},{default:e(()=>n[11]||(n[11]=[a("标准库概述")])),_:1})]),s("li",null,[n[14]||(n[14]=a("下一节：")),p(t,{to:"/chapter-2/09.3.html"},{default:e(()=>n[13]||(n[13]=[a("锁和 sync 包")])),_:1})])])])}const v=l(r,[["render",d],["__file","09.2.html.vue"]]),b=JSON.parse('{"path":"/chapter-2/09.2.html","title":"9.2 regexp 包","lang":"zh-cn","frontmatter":{},"headers":[{"level":1,"title":"9.2 regexp 包","slug":"_9-2-regexp-包","link":"#_9-2-regexp-包","children":[{"level":2,"title":"链接","slug":"链接","link":"#链接","children":[]}]}],"git":{},"filePathRelative":"chapter-2/09.2.md"}');export{v as comp,b as data};
