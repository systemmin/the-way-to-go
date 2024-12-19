<template><div><h1 id="_15-12-用-smtp-发送邮件" tabindex="-1"><a class="header-anchor" href="#_15-12-用-smtp-发送邮件"><span>15.12 用 smtp 发送邮件</span></a></h1>
<p><code v-pre>smtp</code> 包实现了用于发送邮件的“简单邮件传输协议”（Simple Mail Transfer Protocol）。它有一个 <code v-pre>Client</code> 类型，代表一个连接到 SMTP 服务器的客户端：</p>
<ul>
<li><code v-pre>Dial()</code> 方法返回一个已连接到 SMTP 服务器的客户端 <code v-pre>Client</code></li>
<li>设置 <code v-pre>Mail</code>（from，即发件人）和 <code v-pre>Rcpt</code>（to，即收件人）</li>
<li><code v-pre>Data()</code> 方法返回一个用于写入数据的 <code v-pre>Writer</code>，这里利用 <code v-pre>buf.WriteTo(wc)</code> 写入</li>
</ul>
<p>示例 15.26 <a href="examples/chapter_15/smtp.go">smtp.go</a></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"bytes"</span></span>
<span class="line">	<span class="token string">"log"</span></span>
<span class="line">	<span class="token string">"net/smtp"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token comment">// Connect to the remote SMTP server.</span></span>
<span class="line">	client<span class="token punctuation">,</span> err <span class="token operator">:=</span> smtp<span class="token punctuation">.</span><span class="token function">Dial</span><span class="token punctuation">(</span><span class="token string">"mail.example.com:25"</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	<span class="token comment">// Set the sender and recipient.</span></span>
<span class="line">	client<span class="token punctuation">.</span><span class="token function">Mail</span><span class="token punctuation">(</span><span class="token string">"sender@example.org"</span><span class="token punctuation">)</span></span>
<span class="line">	client<span class="token punctuation">.</span><span class="token function">Rcpt</span><span class="token punctuation">(</span><span class="token string">"recipient@example.net"</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token comment">// Send the email body.</span></span>
<span class="line">	wc<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">Data</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	<span class="token keyword">defer</span> wc<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	buf <span class="token operator">:=</span> bytes<span class="token punctuation">.</span><span class="token function">NewBufferString</span><span class="token punctuation">(</span><span class="token string">"This is the email body."</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> buf<span class="token punctuation">.</span><span class="token function">WriteTo</span><span class="token punctuation">(</span>wc<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果需要认证，或有多个收件人时，也可以用 <code v-pre>SendMail()</code> 函数发送。它连接到地址为 <code v-pre>addr</code> 的服务器；如果可以，切换到 TLS（“传输层安全”加密和认证协议），并用 PLAIN 机制认证；然后以 <code v-pre>from</code> 作为发件人，<code v-pre>to</code> 作为收件人列表，<code v-pre>msg</code> 作为邮件内容，发出一封邮件：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">SendMail</span><span class="token punctuation">(</span>addr <span class="token builtin">string</span><span class="token punctuation">,</span> a Auth<span class="token punctuation">,</span> from <span class="token builtin">string</span><span class="token punctuation">,</span> to <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">,</span> msg <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">)</span> <span class="token builtin">error</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>示例 15.27 <a href="examples/chapter_15/smtp_auth.go">smtp_auth.go</a></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"log"</span></span>
<span class="line">	<span class="token string">"net/smtp"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token comment">// Set up authentication information.</span></span>
<span class="line">	auth <span class="token operator">:=</span> smtp<span class="token punctuation">.</span><span class="token function">PlainAuth</span><span class="token punctuation">(</span></span>
<span class="line">		<span class="token string">""</span><span class="token punctuation">,</span></span>
<span class="line">		<span class="token string">"user@example.com"</span><span class="token punctuation">,</span></span>
<span class="line">		<span class="token string">"password"</span><span class="token punctuation">,</span></span>
<span class="line">		<span class="token string">"mail.example.com"</span><span class="token punctuation">,</span></span>
<span class="line">	<span class="token punctuation">)</span></span>
<span class="line">	<span class="token comment">// Connect to the server, authenticate, set the sender and recipient,</span></span>
<span class="line">	<span class="token comment">// and send the email all in one step.</span></span>
<span class="line">	err <span class="token operator">:=</span> smtp<span class="token punctuation">.</span><span class="token function">SendMail</span><span class="token punctuation">(</span></span>
<span class="line">		<span class="token string">"mail.example.com:25"</span><span class="token punctuation">,</span></span>
<span class="line">		auth<span class="token punctuation">,</span></span>
<span class="line">		<span class="token string">"sender@example.org"</span><span class="token punctuation">,</span></span>
<span class="line">		<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">"recipient@example.net"</span><span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">		<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token string">"This is the email body."</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">	<span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-3/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-3/15.11.html">与 websocket 通信</RouteLink></li>
<li>下一章：<RouteLink to="/chapter-3/16.0.html">常见的陷阱与错误</RouteLink></li>
</ul>
</div></template>


