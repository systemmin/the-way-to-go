<template><div><h1 id="_12-12-go-中的密码学" tabindex="-1"><a class="header-anchor" href="#_12-12-go-中的密码学"><span>12.12 Go 中的密码学</span></a></h1>
<p>通过网络传输的数据必须加密，以防止被 hacker（黑客）读取或篡改，并且保证发出的数据和收到的数据检验和一致。
鉴于 Go 母公司的业务，我们毫不惊讶地看到 Go 的标准库为该领域提供了超过 30 个的包：</p>
<ul>
<li><code v-pre>hash</code> 包：实现了 <code v-pre>adler32</code>、<code v-pre>crc32</code>、<code v-pre>crc64</code> 和 <code v-pre>fnv</code> 校验；</li>
<li><code v-pre>crypto</code> 包：实现了其它的 hash 算法，比如 <code v-pre>md4</code>、<code v-pre>md5</code>、<code v-pre>sha1</code> 等。以及完整地实现了 <code v-pre>aes</code>、<code v-pre>blowfish</code>、<code v-pre>rc4</code>、<code v-pre>rsa</code>、<code v-pre>xtea</code> 等加密算法。</li>
</ul>
<p>下面的示例用 <code v-pre>sha1</code> 和 <code v-pre>md5</code> 计算并输出了一些校验值。</p>
<p>示例 12.20 <a href="examples/chapter_12/hash_sha1.go">hash_sha1.go</a>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token comment">// hash_sha1.go</span></span>
<span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"fmt"</span></span>
<span class="line">	<span class="token string">"crypto/sha1"</span></span>
<span class="line">	<span class="token string">"io"</span></span>
<span class="line">	<span class="token string">"log"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	hasher <span class="token operator">:=</span> sha1<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	io<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span>hasher<span class="token punctuation">,</span> <span class="token string">"test"</span><span class="token punctuation">)</span></span>
<span class="line">	b <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Result: %x\n"</span><span class="token punctuation">,</span> hasher<span class="token punctuation">.</span><span class="token function">Sum</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Result: %d\n"</span><span class="token punctuation">,</span> hasher<span class="token punctuation">.</span><span class="token function">Sum</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token comment">//</span></span>
<span class="line">	hasher<span class="token punctuation">.</span><span class="token function">Reset</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	data <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token string">"We shall overcome!"</span><span class="token punctuation">)</span></span>
<span class="line">	n<span class="token punctuation">,</span> err <span class="token operator">:=</span> hasher<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">if</span> n<span class="token operator">!=</span><span class="token function">len</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span> <span class="token operator">||</span> err<span class="token operator">!=</span><span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">		log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Hash write error: %v / %v"</span><span class="token punctuation">,</span> n<span class="token punctuation">,</span> err<span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	checksum <span class="token operator">:=</span> hasher<span class="token punctuation">.</span><span class="token function">Sum</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Result: %x\n"</span><span class="token punctuation">,</span> checksum<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">Result: a94a8fe5ccb19ba61c4c0873d391e987982fbbd3</span>
<span class="line">Result: [169 74 143 229 204 177 155 166 28 76 8 115 211 145 233 135 152 47 187 211]</span>
<span class="line">Result: e2222bfc59850bbb00a722e764a555603bb59b2a</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过调用 <code v-pre>sha1.New()</code> 创建了一个新的 <code v-pre>hash.Hash</code> 对象，用来计算 SHA1 校验值。<code v-pre>Hash</code> 类型实际上是一个接口，它实现了 <code v-pre>io.Writer</code> 接口：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">type</span> Hash <span class="token keyword">interface</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token comment">// Write (via the embedded io.Writer interface) adds more data to the running hash.</span></span>
<span class="line">	<span class="token comment">// It never returns an error.</span></span>
<span class="line">	io<span class="token punctuation">.</span>Writer</span>
<span class="line"></span>
<span class="line">	<span class="token comment">// Sum appends the current hash to b and returns the resulting slice.</span></span>
<span class="line">	<span class="token comment">// It does not change the underlying hash state.</span></span>
<span class="line">	<span class="token function">Sum</span><span class="token punctuation">(</span>b <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">)</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span></span>
<span class="line"></span>
<span class="line">	<span class="token comment">// Reset resets the Hash to its initial state.</span></span>
<span class="line">	<span class="token function">Reset</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">	<span class="token comment">// Size returns the number of bytes Sum will return.</span></span>
<span class="line">	<span class="token function">Size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span></span>
<span class="line"></span>
<span class="line">	<span class="token comment">// BlockSize returns the hash's underlying block size.</span></span>
<span class="line">	<span class="token comment">// The Write method must be able to accept any amount</span></span>
<span class="line">	<span class="token comment">// of data, but it may operate more efficiently if all writes</span></span>
<span class="line">	<span class="token comment">// are a multiple of the block size.</span></span>
<span class="line">	<span class="token function">BlockSize</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过 <code v-pre>io.WriteString</code> 或 <code v-pre>hasher.Write</code> 将给定的 <code v-pre>[]byte</code> 附加到当前的 <code v-pre>hash.Hash</code> 对象中。</p>
<p><strong>练习 12.9</strong>：<a href="exercises/chapter_12/hash_md5.go">hash_md5.go</a>：</p>
<p>在示例 12.20 中检验 md5 算法。</p>
<h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-3/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-3/12.11.html">用 Gob 传输数据</RouteLink></li>
<li>下一章：<RouteLink to="/chapter-3/13.0.html">错误处理与测试</RouteLink></li>
</ul>
</div></template>


