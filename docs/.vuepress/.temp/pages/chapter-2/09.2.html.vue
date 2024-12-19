<template><div><h1 id="_9-2-regexp-包" tabindex="-1"><a class="header-anchor" href="#_9-2-regexp-包"><span>9.2 regexp 包</span></a></h1>
<p>正则表达式语法和使用的详细信息请参考 <a href="http://en.wikipedia.org/wiki/Regular_expression" target="_blank" rel="noopener noreferrer">维基百科</a>。</p>
<p>在下面的程序里，我们将在字符串中对正则表达式模式 (pattern) 进行匹配。</p>
<p>如果是简单模式，使用 <code v-pre>Match()</code> 方法便可：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">ok<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> regexp<span class="token punctuation">.</span><span class="token function">Match</span><span class="token punctuation">(</span>pat<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span>searchIn<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>变量 <code v-pre>ok</code> 将返回 <code v-pre>true</code> 或者 <code v-pre>false</code>，我们也可以使用 <code v-pre>MatchString()</code>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">ok<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> regexp<span class="token punctuation">.</span><span class="token function">MatchString</span><span class="token punctuation">(</span>pat<span class="token punctuation">,</span> searchIn<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>更多方法中，必须先将正则模式通过 <code v-pre>Compile()</code> 方法返回一个 <code v-pre>Regexp</code> 对象。然后我们将掌握一些匹配，查找，替换相关的功能。</p>
<p>示例 9.2 <a href="examples/chapter_9/pattern.go">pattern.go</a>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"fmt"</span></span>
<span class="line">	<span class="token string">"regexp"</span></span>
<span class="line">	<span class="token string">"strconv"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token comment">//目标字符串</span></span>
<span class="line">	searchIn <span class="token operator">:=</span> <span class="token string">"John: 2578.34 William: 4567.23 Steve: 5632.18"</span></span>
<span class="line">	pat <span class="token operator">:=</span> <span class="token string">"[0-9]+.[0-9]+"</span> <span class="token comment">//正则</span></span>
<span class="line"></span>
<span class="line">	f <span class="token operator">:=</span> <span class="token keyword">func</span><span class="token punctuation">(</span>s <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span></span>
<span class="line">		v<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> strconv<span class="token punctuation">.</span><span class="token function">ParseFloat</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> <span class="token number">32</span><span class="token punctuation">)</span></span>
<span class="line">		<span class="token keyword">return</span> strconv<span class="token punctuation">.</span><span class="token function">FormatFloat</span><span class="token punctuation">(</span>v<span class="token operator">*</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token char">'f'</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">32</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">	<span class="token keyword">if</span> ok<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> regexp<span class="token punctuation">.</span><span class="token function">Match</span><span class="token punctuation">(</span>pat<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span>searchIn<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> ok <span class="token punctuation">{</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Match Found!"</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">	re<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> regexp<span class="token punctuation">.</span><span class="token function">Compile</span><span class="token punctuation">(</span>pat<span class="token punctuation">)</span></span>
<span class="line">	<span class="token comment">//将匹配到的部分替换为"##.#"</span></span>
<span class="line">	str <span class="token operator">:=</span> re<span class="token punctuation">.</span><span class="token function">ReplaceAllString</span><span class="token punctuation">(</span>searchIn<span class="token punctuation">,</span> <span class="token string">"##.#"</span><span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span></span>
<span class="line">	<span class="token comment">//参数为函数时</span></span>
<span class="line">	str2 <span class="token operator">:=</span> re<span class="token punctuation">.</span><span class="token function">ReplaceAllStringFunc</span><span class="token punctuation">(</span>searchIn<span class="token punctuation">,</span> f<span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>str2<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出结果：</p>
<pre><code>Match Found!
John: ##.# William: ##.# Steve: ##.#
John: 5156.68 William: 9134.46 Steve: 11264.36
</code></pre>
<p><code v-pre>Compile()</code> 函数也可能返回一个错误，我们在使用时忽略对错误的判断是因为我们确信自己正则表达式是有效的。当用户输入或从数据中获取正则表达式的时候，我们有必要去检验它的正确性。另外我们也可以使用 <code v-pre>MustCompile()</code> 方法，它可以像 <code v-pre>Compile()</code> 方法一样检验正则的有效性，但是当正则不合法时程序将 <code v-pre>panic()</code>（详情查看<RouteLink to="/chapter-2/13.2.html">第 13.2 节</RouteLink>）。</p>
</div></template>


