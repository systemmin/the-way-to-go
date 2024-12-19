<template><div><h1 id="_13-4-自定义包中的错误处理和-panicking" tabindex="-1"><a class="header-anchor" href="#_13-4-自定义包中的错误处理和-panicking"><span>13.4 自定义包中的错误处理和 panicking</span></a></h1>
<p>这是所有自定义包实现者应该遵守的最佳实践：</p>
<p>1）<em>在包内部，总是应该从 panic 中 recover</em>：不允许显式的超出包范围的 <code v-pre>panic()</code></p>
<p>2）<em>向包的调用者返回错误值（而不是 panic）。</em></p>
<p>在包内部，特别是在非导出函数中有很深层次的嵌套调用时，将 panic 转换成 <code v-pre>error</code> 来告诉调用方为何出错，是很实用的（且提高了代码可读性）。</p>
<p>下面的代码则很好地阐述了这一点。我们有一个简单的 <code v-pre>parse</code> 包（示例 13.4）用来把输入的字符串解析为整数切片；这个包有自己特殊的 <code v-pre>ParseError</code>。</p>
<p>当没有东西需要转换或者转换成整数失败时，这个包会 <code v-pre>panic()</code>（在函数 <code v-pre>fields2numbers()</code> 中）。但是可导出的 <code v-pre>Parse()</code> 函数会从 <code v-pre>panic()</code> 中 <code v-pre>recover()</code> 并用所有这些信息返回一个错误给调用者。为了演示这个过程，在 <a href="examples/chapter_13/panic_recover.go">panic_recover.go</a> 中 调用了 <code v-pre>parse</code> 包（示例 13.5）；不可解析的字符串会导致错误并被打印出来。</p>
<p>示例 13.4 <a href="examples/chapter_13/parse/parse.go">parse.go</a>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token comment">// parse.go</span></span>
<span class="line"><span class="token keyword">package</span> parse</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"fmt"</span></span>
<span class="line">	<span class="token string">"strings"</span></span>
<span class="line">	<span class="token string">"strconv"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// A ParseError indicates an error in converting a word into an integer.</span></span>
<span class="line"><span class="token keyword">type</span> ParseError <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">    Index <span class="token builtin">int</span>      <span class="token comment">// The index into the space-separated list of words.</span></span>
<span class="line">    Word  <span class="token builtin">string</span>   <span class="token comment">// The word that generated the parse error.</span></span>
<span class="line">    Err <span class="token builtin">error</span> <span class="token comment">// The raw error that precipitated this error, if any.</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// String returns a human-readable error message.</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>e <span class="token operator">*</span>ParseError<span class="token punctuation">)</span> <span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">"pkg parse: error parsing %q as int"</span><span class="token punctuation">,</span> e<span class="token punctuation">.</span>Word<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// Parse parses the space-separated words in in put as integers.</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">Parse</span><span class="token punctuation">(</span>input <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>numbers <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">if</span> r <span class="token operator">:=</span> <span class="token function">recover</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> r <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">var</span> ok <span class="token builtin">bool</span></span>
<span class="line">            err<span class="token punctuation">,</span> ok <span class="token operator">=</span> r<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token builtin">error</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token keyword">if</span> <span class="token operator">!</span>ok <span class="token punctuation">{</span></span>
<span class="line">                err <span class="token operator">=</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"pkg: %v"</span><span class="token punctuation">,</span> r<span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    fields <span class="token operator">:=</span> strings<span class="token punctuation">.</span><span class="token function">Fields</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span></span>
<span class="line">    numbers <span class="token operator">=</span> <span class="token function">fields2numbers</span><span class="token punctuation">(</span>fields<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">return</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">fields2numbers</span><span class="token punctuation">(</span>fields <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>numbers <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>fields<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">"no words to parse"</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">for</span> idx<span class="token punctuation">,</span> field <span class="token operator">:=</span> <span class="token keyword">range</span> fields <span class="token punctuation">{</span></span>
<span class="line">        num<span class="token punctuation">,</span> err <span class="token operator">:=</span> strconv<span class="token punctuation">.</span><span class="token function">Atoi</span><span class="token punctuation">(</span>field<span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token function">panic</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>ParseError<span class="token punctuation">{</span>idx<span class="token punctuation">,</span> field<span class="token punctuation">,</span> err<span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">        numbers <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>numbers<span class="token punctuation">,</span> num<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">return</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>示例 13.5 <a href="examples/chapter_13/panic_package.go">panic_package.go</a>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token comment">// panic_package.go</span></span>
<span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"fmt"</span></span>
<span class="line">	<span class="token string">"./parse/parse"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">var</span> examples <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span></span>
<span class="line">            <span class="token string">"1 2 3 4 5"</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token string">"100 50 25 12.5 6.25"</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token string">"2 + 2 = 4"</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token string">"1st class"</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token string">""</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> ex <span class="token operator">:=</span> <span class="token keyword">range</span> examples <span class="token punctuation">{</span></span>
<span class="line">        fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Parsing %q:\n  "</span><span class="token punctuation">,</span> ex<span class="token punctuation">)</span></span>
<span class="line">        nums<span class="token punctuation">,</span> err <span class="token operator">:=</span> parse<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span>ex<span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">            fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token comment">// here String() method from ParseError is used</span></span>
<span class="line">            <span class="token keyword">continue</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>nums<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">Parsing "1 2 3 4 5":</span>
<span class="line">  [1 2 3 4 5]</span>
<span class="line">Parsing "100 50 25 12.5 6.25":</span>
<span class="line">  pkg: pkg parse: error parsing "12.5" as int</span>
<span class="line">Parsing "2 + 2 = 4":</span>
<span class="line">  pkg: pkg parse: error parsing "+" as int</span>
<span class="line">Parsing "1st class":</span>
<span class="line">  pkg: pkg parse: error parsing "1st" as int</span>
<span class="line">Parsing "":</span>
<span class="line">  pkg: no words to parse</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-3/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-3/13.3.html">从 panic 中恢复 (recover)</RouteLink></li>
<li>下一节：<RouteLink to="/chapter-3/13.5.html">一种用闭包处理错误的模式</RouteLink></li>
</ul>
</div></template>


