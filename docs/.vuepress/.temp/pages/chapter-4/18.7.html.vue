<template><div><h1 id="_18-7-文件" tabindex="-1"><a class="header-anchor" href="#_18-7-文件"><span>18.7 文件</span></a></h1>
<p>（1）如何打开一个文件并读取：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">file<span class="token punctuation">,</span> err <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span><span class="token string">"input.dat"</span><span class="token punctuation">)</span></span>
<span class="line">  <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"An error occurred on opening the inputfile\n"</span> <span class="token operator">+</span></span>
<span class="line">      <span class="token string">"Does the file exist?\n"</span> <span class="token operator">+</span></span>
<span class="line">      <span class="token string">"Have you got acces to it?\n"</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">return</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  <span class="token keyword">defer</span> file<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">  iReader <span class="token operator">:=</span> bufio<span class="token punctuation">.</span><span class="token function">NewReader</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span></span>
<span class="line">  <span class="token keyword">for</span> <span class="token punctuation">{</span></span>
<span class="line">    str<span class="token punctuation">,</span> err <span class="token operator">:=</span> iReader<span class="token punctuation">.</span><span class="token function">ReadString</span><span class="token punctuation">(</span><span class="token char">'\n'</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">return</span> <span class="token comment">// error or EOF</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"The input was: %s"</span><span class="token punctuation">,</span> str<span class="token punctuation">)</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（2）如何通过切片读写文件：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">cat</span><span class="token punctuation">(</span>f <span class="token operator">*</span>file<span class="token punctuation">.</span>File<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">const</span> NBUF <span class="token operator">=</span> <span class="token number">512</span></span>
<span class="line">  <span class="token keyword">var</span> buf <span class="token punctuation">[</span>NBUF<span class="token punctuation">]</span><span class="token builtin">byte</span></span>
<span class="line">  <span class="token keyword">for</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">switch</span> nr<span class="token punctuation">,</span> er <span class="token operator">:=</span> f<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>buf<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token boolean">true</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">case</span> nr <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">:</span></span>
<span class="line">      fmt<span class="token punctuation">.</span><span class="token function">Fprintf</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stderr<span class="token punctuation">,</span> <span class="token string">"cat: error reading from %s: %s\n"</span><span class="token punctuation">,</span></span>
<span class="line">        f<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> er<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">      os<span class="token punctuation">.</span><span class="token function">Exit</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">case</span> nr <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">:</span> <span class="token comment">// EOF</span></span>
<span class="line">      <span class="token keyword">return</span></span>
<span class="line">    <span class="token keyword">case</span> nr <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token keyword">if</span> nw<span class="token punctuation">,</span> ew <span class="token operator">:=</span> file<span class="token punctuation">.</span>Stdout<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>buf<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">:</span>nr<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> nw <span class="token operator">!=</span> nr <span class="token punctuation">{</span></span>
<span class="line">        fmt<span class="token punctuation">.</span><span class="token function">Fprintf</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stderr<span class="token punctuation">,</span> <span class="token string">"cat: error writing from %s: %s\n"</span><span class="token punctuation">,</span></span>
<span class="line">          f<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> ew<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-4/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-4/18.6.html">函数</RouteLink></li>
<li>下一节：<RouteLink to="/chapter-4/18.8.html">协程 (goroutine) 与通道 (channel)</RouteLink></li>
</ul>
</div></template>


