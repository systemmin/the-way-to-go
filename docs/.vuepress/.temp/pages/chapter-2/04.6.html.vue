<template><div><h1 id="_4-6-字符串" tabindex="-1"><a class="header-anchor" href="#_4-6-字符串"><span>4.6 字符串</span></a></h1>
<p>字符串是 UTF-8 字符的一个序列（当字符为 ASCII 码时则占用 1 个字节，其它字符根据需要占用 2-4 个字节）。UTF-8 是被广泛使用的编码格式，是文本文件的标准编码，其它包括 XML 和 JSON 在内，也都使用该编码。由于该编码对占用字节长度的不定性，Go 中的字符串里面的字符也可能根据需要占用 1 至 4 个字节（示例见<RouteLink to="/chapter-2/04.6.html">第 4.6 节</RouteLink>），这与其它语言如 C++、Java 或者 Python 不同（Java 始终使用 2 个字节）。Go 这样做的好处是不仅减少了内存和硬盘空间占用，同时也不用像其它语言那样需要对使用 UTF-8 字符集的文本进行编码和解码。</p>
<p>字符串是一种值类型，且值不可变，即创建某个文本后你无法再次修改这个文本的内容；更深入地讲，字符串是字节的定长数组。</p>
<p>Go 支持以下 2 种形式的字面值：</p>
<ul>
<li>
<p>解释字符串：</p>
<p>该类字符串使用双引号括起来，其中的相关的转义字符将被替换，这些转义字符包括：</p>
<ul>
<li><code v-pre>\n</code>：换行符</li>
<li><code v-pre>\r</code>：回车符</li>
<li><code v-pre>\t</code>：tab 键</li>
<li><code v-pre>\u</code> 或 <code v-pre>\U</code>：Unicode 字符</li>
<li><code v-pre>\\</code>：反斜杠自身</li>
</ul>
</li>
<li>
<p>非解释字符串：</p>
<p>该类字符串使用反引号括起来，支持换行，例如：</p>
<pre><code>  `This is a raw string \n` 中的 `\n\` 会被原样输出。
</code></pre>
</li>
</ul>
<p>和 C/C++不一样，Go 中的字符串是根据长度限定，而非特殊字符 <code v-pre>\0</code>。</p>
<p><code v-pre>string</code> 类型的零值为长度为零的字符串，即空字符串 <code v-pre>&quot;&quot;</code>。</p>
<p>一般的比较运算符（<code v-pre>==</code>、<code v-pre>!=</code>、<code v-pre>&lt;</code>、<code v-pre>&lt;=</code>、<code v-pre>&gt;=</code>、<code v-pre>&gt;</code>）通过在内存中按字节比较来实现字符串的对比。你可以通过函数 <code v-pre>len()</code> 来获取字符串所占的字节长度，例如：<code v-pre>len(str)</code>。</p>
<p>字符串的内容（纯字节）可以通过标准索引法来获取，在中括号 <code v-pre>[]</code> 内写入索引，索引从 0 开始计数：</p>
<ul>
<li>字符串 <code v-pre>str</code> 的第 1 个字节：<code v-pre>str[0]</code></li>
<li>第 <code v-pre>i</code> 个字节：<code v-pre>str[i - 1]</code></li>
<li>最后 1 个字节：<code v-pre>str[len(str)-1]</code></li>
</ul>
<p>需要注意的是，这种转换方案只对纯 ASCII 码的字符串有效。</p>
<p><strong>注意事项</strong> 获取字符串中某个字节的地址的行为是非法的，例如：<code v-pre>&amp;str[i]</code>。</p>
<p><strong>字符串拼接符 <code v-pre>+</code></strong></p>
<p>两个字符串 <code v-pre>s1</code> 和 <code v-pre>s2</code> 可以通过 <code v-pre>s := s1 + s2</code> 拼接在一起。</p>
<p><code v-pre>s2</code> 追加在 <code v-pre>s1</code> 尾部并生成一个新的字符串 <code v-pre>s</code>。</p>
<p>你可以通过以下方式来对代码中多行的字符串进行拼接：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">str <span class="token operator">:=</span> <span class="token string">"Beginning of the string "</span> <span class="token operator">+</span></span>
<span class="line">	<span class="token string">"second part of the string"</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>由于编译器行尾自动补全分号的缘故，加号 <code v-pre>+</code> 必须放在第一行。</p>
<p>拼接的简写形式 <code v-pre>+=</code> 也可以用于字符串：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">s <span class="token operator">:=</span> <span class="token string">"hel"</span> <span class="token operator">+</span> <span class="token string">"lo,"</span></span>
<span class="line">s <span class="token operator">+=</span> <span class="token string">"world!"</span></span>
<span class="line">fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span> <span class="token comment">//输出 “hello, world!”</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在循环中使用加号 <code v-pre>+</code> 拼接字符串并不是最高效的做法，更好的办法是使用函数 <code v-pre>strings.Join()</code>（<RouteLink to="/chapter-2/04.7.html">第 4.7.10 节</RouteLink>），有没有更好的办法了？有！使用字节缓冲（<code v-pre>bytes.Buffer</code>）拼接更加给力（<RouteLink to="/chapter-2/07.2.html">第 7.2.6 节</RouteLink>）！</p>
<p>在<RouteLink to="/chapter-2/07.0.html">第 7 章</RouteLink>，我们会讲到通过将字符串看作是字节 (<code v-pre>byte</code>) 的切片 (slice) 来实现对其标准索引法的操作。会在<RouteLink to="/chapter-2/05.4.html">第 5.4.1 节</RouteLink> 中讲到的 <code v-pre>for</code> 循环只会根据索引返回字符串中的纯字节，而在<RouteLink to="/chapter-2/05.4.html">第 5.4.4 节</RouteLink>（以及<RouteLink to="/chapter-2/07.6.html">第 7.6.1 节</RouteLink> 的示例）将会展示如何使用 for-range 循环来实现对 Unicode 字符串的迭代操作。在下一节，我们会学习到许多有关字符串操作的函数和方法，同时 <code v-pre>fmt</code> 包中的 <code v-pre>fmt.Sprint(x)</code> 也可以格式化生成并返回你所需要的字符串（<RouteLink to="/chapter-2/04.3.html">第 4.4.3 节</RouteLink>）。</p>
<p><strong>练习 4.6</strong> <a href="exercises/chapter_4/count_characters.go">count_characters.go</a></p>
<p>创建一个用于统计字节和字符 (rune) 的程序，并对字符串 <code v-pre>asSASA ddd dsjkdsjs dk</code> 进行分析，然后再分析 <code v-pre>asSASA ddd dsjkdsjsこん dk</code>，最后解释两者不同的原因（提示：使用 <code v-pre>unicode/utf8</code> 包）。</p>
</div></template>


