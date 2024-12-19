<template><div><h1 id="_4-7-strings-和-strconv-包" tabindex="-1"><a class="header-anchor" href="#_4-7-strings-和-strconv-包"><span>4.7 strings 和 strconv 包</span></a></h1>
<p>作为一种基本数据结构，每种语言都有一些对于字符串的预定义处理函数。Go 中使用 <code v-pre>strings</code> 包来完成对字符串的主要操作。</p>
<h2 id="_4-7-1-前缀和后缀" tabindex="-1"><a class="header-anchor" href="#_4-7-1-前缀和后缀"><span>4.7.1 前缀和后缀</span></a></h2>
<p><code v-pre>HasPrefix()</code> 判断字符串 <code v-pre>s</code> 是否以 <code v-pre>prefix</code> 开头：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">strings<span class="token punctuation">.</span><span class="token function">HasPrefix</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> prefix <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">bool</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><code v-pre>HasSuffix()</code> 判断字符串 <code v-pre>s</code> 是否以 <code v-pre>suffix</code> 结尾：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">strings<span class="token punctuation">.</span><span class="token function">HasSuffix</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> suffix <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">bool</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>示例 4.13 <a href="examples/chapter_4/presuffix.go">presuffix.go</a></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"fmt"</span></span>
<span class="line">	<span class="token string">"strings"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">var</span> str <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token string">"This is an example of a string"</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"T/F? Does the string \"%s\" have prefix %s? "</span><span class="token punctuation">,</span> str<span class="token punctuation">,</span> <span class="token string">"Th"</span><span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%t\n"</span><span class="token punctuation">,</span> strings<span class="token punctuation">.</span><span class="token function">HasPrefix</span><span class="token punctuation">(</span>str<span class="token punctuation">,</span> <span class="token string">"Th"</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p>
<pre><code>T/F? Does the string &quot;This is an example of a string&quot; have prefix Th? true
</code></pre>
<p>这个例子同样演示了转义字符 <code v-pre>\</code> 和格式化字符串的使用。</p>
<h2 id="_4-7-2-字符串包含关系" tabindex="-1"><a class="header-anchor" href="#_4-7-2-字符串包含关系"><span>4.7.2 字符串包含关系</span></a></h2>
<p><code v-pre>Contains()</code> 判断字符串 <code v-pre>s</code> 是否包含 <code v-pre>substr</code>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">strings<span class="token punctuation">.</span><span class="token function">Contains</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> substr <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">bool</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="_4-7-3-判断子字符串或字符在父字符串中出现的位置-索引" tabindex="-1"><a class="header-anchor" href="#_4-7-3-判断子字符串或字符在父字符串中出现的位置-索引"><span>4.7.3 判断子字符串或字符在父字符串中出现的位置（索引）</span></a></h2>
<p><code v-pre>Index()</code> 返回字符串 <code v-pre>str</code> 在字符串 <code v-pre>s</code> 中的索引（<code v-pre>str</code> 的第一个字符的索引），<code v-pre>-1</code> 表示字符串 <code v-pre>s</code> 不包含字符串 <code v-pre>str</code>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">strings<span class="token punctuation">.</span><span class="token function">Index</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> str <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">int</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><code v-pre>LastIndex()</code> 返回字符串 <code v-pre>str</code> 在字符串 <code v-pre>s</code> 中最后出现位置的索引（<code v-pre>str</code> 的第一个字符的索引），<code v-pre>-1</code> 表示字符串 <code v-pre>s</code> 不包含字符串 <code v-pre>str</code>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">strings<span class="token punctuation">.</span><span class="token function">LastIndex</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> str <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">int</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>如果需要查询非 ASCII 编码的字符在父字符串中的位置，建议使用以下函数来对字符进行定位：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">strings<span class="token punctuation">.</span><span class="token function">IndexRune</span><span class="token punctuation">(</span>s <span class="token builtin">string</span><span class="token punctuation">,</span> r <span class="token builtin">rune</span><span class="token punctuation">)</span> <span class="token builtin">int</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><pre><code>注: 原文为 &quot;If ch is a non-ASCII character use strings.IndexRune(s string, ch int) int.&quot;
该方法在最新版本的 Go 中定义为 func IndexRune(s string, r rune) int
实际使用中的第二个参数 rune 可以是 rune 或 int, 例如 strings.IndexRune(&quot;chicken&quot;, 99) 或 strings.IndexRune(&quot;chicken&quot;, rune('k'))
</code></pre>
<p>示例 4.14 <a href="examples/chapter_4/index_in_string.go">index_in_string.go</a></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"fmt"</span></span>
<span class="line">	<span class="token string">"strings"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">var</span> str <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token string">"Hi, I'm Marc, Hi."</span></span>
<span class="line"></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"The position of \"Marc\" is: "</span><span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%d\n"</span><span class="token punctuation">,</span> strings<span class="token punctuation">.</span><span class="token function">Index</span><span class="token punctuation">(</span>str<span class="token punctuation">,</span> <span class="token string">"Marc"</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"The position of the first instance of \"Hi\" is: "</span><span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%d\n"</span><span class="token punctuation">,</span> strings<span class="token punctuation">.</span><span class="token function">Index</span><span class="token punctuation">(</span>str<span class="token punctuation">,</span> <span class="token string">"Hi"</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"The position of the last instance of \"Hi\" is: "</span><span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%d\n"</span><span class="token punctuation">,</span> strings<span class="token punctuation">.</span><span class="token function">LastIndex</span><span class="token punctuation">(</span>str<span class="token punctuation">,</span> <span class="token string">"Hi"</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"The position of \"Burger\" is: "</span><span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%d\n"</span><span class="token punctuation">,</span> strings<span class="token punctuation">.</span><span class="token function">Index</span><span class="token punctuation">(</span>str<span class="token punctuation">,</span> <span class="token string">"Burger"</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p>
<pre><code>The position of &quot;Marc&quot; is: 8
The position of the first instance of &quot;Hi&quot; is: 0
The position of the last instance of &quot;Hi&quot; is: 14
The position of &quot;Burger&quot; is: -1
</code></pre>
<h2 id="_4-7-4-字符串替换" tabindex="-1"><a class="header-anchor" href="#_4-7-4-字符串替换"><span>4.7.4 字符串替换</span></a></h2>
<p><code v-pre>Replace()</code> 用于将字符串 <code v-pre>str</code> 中的前 <code v-pre>n</code> 个字符串 <code v-pre>old</code> 替换为字符串 <code v-pre>new</code>，并返回一个新的字符串，如果 <code v-pre>n = -1</code> 则替换所有字符串 <code v-pre>old</code> 为字符串 <code v-pre>new</code>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">strings<span class="token punctuation">.</span><span class="token function">Replace</span><span class="token punctuation">(</span>str<span class="token punctuation">,</span> old<span class="token punctuation">,</span> <span class="token builtin">new</span> <span class="token builtin">string</span><span class="token punctuation">,</span> n <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">string</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="_4-7-5-统计字符串出现次数" tabindex="-1"><a class="header-anchor" href="#_4-7-5-统计字符串出现次数"><span>4.7.5 统计字符串出现次数</span></a></h2>
<p><code v-pre>Count()</code> 用于计算字符串 <code v-pre>str</code> 在字符串 <code v-pre>s</code> 中出现的非重叠次数：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">strings<span class="token punctuation">.</span><span class="token function">Count</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> str <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">int</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>示例 4.15 <a href="examples/chapter_4/count_substring.go">count_substring.go</a></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"fmt"</span></span>
<span class="line">	<span class="token string">"strings"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">var</span> str <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token string">"Hello, how is it going, Hugo?"</span></span>
<span class="line">	<span class="token keyword">var</span> manyG <span class="token operator">=</span> <span class="token string">"gggggggggg"</span></span>
<span class="line"></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Number of H's in %s is: "</span><span class="token punctuation">,</span> str<span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%d\n"</span><span class="token punctuation">,</span> strings<span class="token punctuation">.</span><span class="token function">Count</span><span class="token punctuation">(</span>str<span class="token punctuation">,</span> <span class="token string">"H"</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Number of double g's in %s is: "</span><span class="token punctuation">,</span> manyG<span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%d\n"</span><span class="token punctuation">,</span> strings<span class="token punctuation">.</span><span class="token function">Count</span><span class="token punctuation">(</span>manyG<span class="token punctuation">,</span> <span class="token string">"gg"</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p>
<pre><code>Number of H's in Hello, how is it going, Hugo? is: 2
Number of double g’s in gggggggggg is: 5
</code></pre>
<h2 id="_4-7-6-重复字符串" tabindex="-1"><a class="header-anchor" href="#_4-7-6-重复字符串"><span>4.7.6 重复字符串</span></a></h2>
<p><code v-pre>Repeat()</code> 用于重复 <code v-pre>count</code> 次字符串 <code v-pre>s</code> 并返回一个新的字符串：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">strings<span class="token punctuation">.</span><span class="token function">Repeat</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> count <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">string</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>示例 4.16 <a href="examples/chapter_4/repeat_string.go">repeat_string.go</a></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"fmt"</span></span>
<span class="line">	<span class="token string">"strings"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">var</span> origS <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token string">"Hi there! "</span></span>
<span class="line">	<span class="token keyword">var</span> newS <span class="token builtin">string</span></span>
<span class="line"></span>
<span class="line">	newS <span class="token operator">=</span> strings<span class="token punctuation">.</span><span class="token function">Repeat</span><span class="token punctuation">(</span>origS<span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"The new repeated string is: %s\n"</span><span class="token punctuation">,</span> newS<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p>
<pre><code>The new repeated string is: Hi there! Hi there! Hi there!
</code></pre>
<h2 id="_4-7-7-修改字符串大小写" tabindex="-1"><a class="header-anchor" href="#_4-7-7-修改字符串大小写"><span>4.7.7 修改字符串大小写</span></a></h2>
<p><code v-pre>ToLower()</code> 将字符串中的 Unicode 字符全部转换为相应的小写字符：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">strings<span class="token punctuation">.</span><span class="token function">ToLower</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span> <span class="token builtin">string</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><code v-pre>ToUpper()</code> 将字符串中的 Unicode 字符全部转换为相应的大写字符：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">strings<span class="token punctuation">.</span><span class="token function">ToUpper</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span> <span class="token builtin">string</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>示例 4.17 <a href="examples/chapter_4/toupper_lower.go">toupper_lower.go</a></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"fmt"</span></span>
<span class="line">	<span class="token string">"strings"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">var</span> orig <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token string">"Hey, how are you George?"</span></span>
<span class="line">	<span class="token keyword">var</span> lower <span class="token builtin">string</span></span>
<span class="line">	<span class="token keyword">var</span> upper <span class="token builtin">string</span></span>
<span class="line"></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"The original string is: %s\n"</span><span class="token punctuation">,</span> orig<span class="token punctuation">)</span></span>
<span class="line">	lower <span class="token operator">=</span> strings<span class="token punctuation">.</span><span class="token function">ToLower</span><span class="token punctuation">(</span>orig<span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"The lowercase string is: %s\n"</span><span class="token punctuation">,</span> lower<span class="token punctuation">)</span></span>
<span class="line">	upper <span class="token operator">=</span> strings<span class="token punctuation">.</span><span class="token function">ToUpper</span><span class="token punctuation">(</span>orig<span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"The uppercase string is: %s\n"</span><span class="token punctuation">,</span> upper<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p>
<pre><code>The original string is: Hey, how are you George?
The lowercase string is: hey, how are you george?
The uppercase string is: HEY, HOW ARE YOU GEORGE?
</code></pre>
<h2 id="_4-7-8-修剪字符串" tabindex="-1"><a class="header-anchor" href="#_4-7-8-修剪字符串"><span>4.7.8 修剪字符串</span></a></h2>
<p>你可以使用 <code v-pre>strings.TrimSpace(s)</code> 来剔除字符串开头和结尾的空白符号；如果你想要剔除指定字符，则可以使用 <code v-pre>strings.Trim(s, &quot;cut&quot;)</code> 来将开头和结尾的 <code v-pre>cut</code> 去除掉。该函数的第二个参数可以包含任何字符，如果你只想剔除开头或者结尾的字符串，则可以使用 <code v-pre>TrimLeft()</code> 或者 <code v-pre>TrimRight()</code> 来实现。</p>
<h2 id="_4-7-9-分割字符串" tabindex="-1"><a class="header-anchor" href="#_4-7-9-分割字符串"><span>4.7.9 分割字符串</span></a></h2>
<p><code v-pre>strings.Fields(s)</code> 将会利用 1 个或多个空白符号来作为动态长度的分隔符将字符串分割成若干小块，并返回一个 slice，如果字符串只包含空白符号，则返回一个长度为 0 的 slice。</p>
<p><code v-pre>strings.Split(s, sep)</code> 用于自定义分割符号来对指定字符串进行分割，同样返回 slice。</p>
<p>因为这 2 个函数都会返回 slice，所以习惯使用 for-range 循环来对其进行处理（第 7.3 节）。</p>
<h2 id="_4-7-10-拼接-slice-到字符串" tabindex="-1"><a class="header-anchor" href="#_4-7-10-拼接-slice-到字符串"><span>4.7.10 拼接 slice 到字符串</span></a></h2>
<p><code v-pre>Join()</code> 用于将元素类型为 string 的 slice 使用分割符号来拼接组成一个字符串：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">strings<span class="token punctuation">.</span><span class="token function">Join</span><span class="token punctuation">(</span>sl <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">,</span> sep <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">string</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>示例 4.18 <a href="examples/chapter_4/strings_splitjoin.go">strings_splitjoin.go</a></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"fmt"</span></span>
<span class="line">	<span class="token string">"strings"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	str <span class="token operator">:=</span> <span class="token string">"The quick brown fox jumps over the lazy dog"</span></span>
<span class="line">	sl <span class="token operator">:=</span> strings<span class="token punctuation">.</span><span class="token function">Fields</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Splitted in slice: %v\n"</span><span class="token punctuation">,</span> sl<span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> val <span class="token operator">:=</span> <span class="token keyword">range</span> sl <span class="token punctuation">{</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%s - "</span><span class="token punctuation">,</span> val<span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	str2 <span class="token operator">:=</span> <span class="token string">"GO1|The ABC of Go|25"</span></span>
<span class="line">	sl2 <span class="token operator">:=</span> strings<span class="token punctuation">.</span><span class="token function">Split</span><span class="token punctuation">(</span>str2<span class="token punctuation">,</span> <span class="token string">"|"</span><span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Splitted in slice: %v\n"</span><span class="token punctuation">,</span> sl2<span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> val <span class="token operator">:=</span> <span class="token keyword">range</span> sl2 <span class="token punctuation">{</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%s - "</span><span class="token punctuation">,</span> val<span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	str3 <span class="token operator">:=</span> strings<span class="token punctuation">.</span><span class="token function">Join</span><span class="token punctuation">(</span>sl2<span class="token punctuation">,</span><span class="token string">";"</span><span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"sl2 joined by ;: %s\n"</span><span class="token punctuation">,</span> str3<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p>
<pre><code>Splitted in slice: [The quick brown fox jumps over the lazy dog]
The - quick - brown - fox - jumps - over - the - lazy - dog -
Splitted in slice: [GO1 The ABC of Go 25]
GO1 - The ABC of Go - 25 -
sl2 joined by ;: GO1;The ABC of Go;25
</code></pre>
<p>其它有关字符串操作的文档请参阅 <a href="http://golang.org/pkg/strings/" target="_blank" rel="noopener noreferrer">官方文档</a>（ <strong>译者注：国内用户可访问 <a href="http://docs.studygolang.com/pkg/strings/" target="_blank" rel="noopener noreferrer">该页面</a></strong> ）。</p>
<h2 id="_4-7-11-从字符串中读取内容" tabindex="-1"><a class="header-anchor" href="#_4-7-11-从字符串中读取内容"><span>4.7.11 从字符串中读取内容</span></a></h2>
<p>函数 <code v-pre>strings.NewReader(str)</code> 用于生成一个 <code v-pre>Reader</code> 并读取字符串中的内容，然后返回指向该 <code v-pre>Reader</code> 的指针，从其它类型读取内容的函数还有：</p>
<ul>
<li><code v-pre>Read()</code> 从 <code v-pre>[]byte</code> 中读取内容。</li>
<li><code v-pre>ReadByte()</code> 和 <code v-pre>ReadRune()</code> 从字符串中读取下一个 <code v-pre>byte</code> 或者 <code v-pre>rune</code>。</li>
</ul>
<h2 id="_4-7-12-字符串与其它类型的转换" tabindex="-1"><a class="header-anchor" href="#_4-7-12-字符串与其它类型的转换"><span>4.7.12 字符串与其它类型的转换</span></a></h2>
<p>与字符串相关的类型转换都是通过 <code v-pre>strconv</code> 包实现的。</p>
<p>该包包含了一些变量用于获取程序运行的操作系统平台下 <code v-pre>int</code> 类型所占的位数，如：<code v-pre>strconv.IntSize</code>。</p>
<p>任何类型 <strong><code v-pre>T</code></strong> 转换为字符串总是成功的。</p>
<p>针对从数字类型转换到字符串，Go 提供了以下函数：</p>
<ul>
<li><code v-pre>strconv.Itoa(i int) string</code> 返回数字 <code v-pre>i</code> 所表示的字符串类型的十进制数。</li>
<li><code v-pre>strconv.FormatFloat(f float64, fmt byte, prec int, bitSize int) string</code> 将 64 位浮点型的数字转换为字符串，其中 <code v-pre>fmt</code> 表示格式（其值可以是 <code v-pre>'b'</code>、<code v-pre>'e'</code>、<code v-pre>'f'</code> 或 <code v-pre>'g'</code>），<code v-pre>prec</code> 表示精度，<code v-pre>bitSize</code> 则使用 32 表示 <code v-pre>float32</code>，用 64 表示 <code v-pre>float64</code>。</li>
</ul>
<p>将字符串转换为其它类型 <strong><code v-pre>tp</code></strong> 并不总是可能的，可能会在运行时抛出错误 <code v-pre>parsing &quot;…&quot;: invalid argument</code>。</p>
<p>针对从字符串类型转换为数字类型，Go 提供了以下函数：</p>
<ul>
<li><code v-pre>strconv.Atoi(s string) (i int, err error)</code> 将字符串转换为 <code v-pre>int</code> 型。</li>
<li><code v-pre>strconv.ParseFloat(s string, bitSize int) (f float64, err error)</code> 将字符串转换为 <code v-pre>float64</code> 型。</li>
</ul>
<p>利用多返回值的特性，这些函数会返回 2 个值，第 1 个是转换后的结果（如果转换成功），第 2 个是可能出现的错误，因此，我们一般使用以下形式来进行从字符串到其它类型的转换：</p>
<pre><code>val, err = strconv.Atoi(s)
</code></pre>
<p>在下面这个示例中，我们忽略可能出现的转换错误：</p>
<p>示例 4.19 <a href="examples/chapter_4/string_conversion.go">string_conversion.go</a></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"fmt"</span></span>
<span class="line">	<span class="token string">"strconv"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">var</span> orig <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token string">"666"</span></span>
<span class="line">	<span class="token keyword">var</span> an <span class="token builtin">int</span></span>
<span class="line">	<span class="token keyword">var</span> newS <span class="token builtin">string</span></span>
<span class="line"></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"The size of ints is: %d\n"</span><span class="token punctuation">,</span> strconv<span class="token punctuation">.</span>IntSize<span class="token punctuation">)</span>	  </span>
<span class="line"></span>
<span class="line">	an<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">=</span> strconv<span class="token punctuation">.</span><span class="token function">Atoi</span><span class="token punctuation">(</span>orig<span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"The integer is: %d\n"</span><span class="token punctuation">,</span> an<span class="token punctuation">)</span> </span>
<span class="line">	an <span class="token operator">=</span> an <span class="token operator">+</span> <span class="token number">5</span></span>
<span class="line">	newS <span class="token operator">=</span> strconv<span class="token punctuation">.</span><span class="token function">Itoa</span><span class="token punctuation">(</span>an<span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"The new string is: %s\n"</span><span class="token punctuation">,</span> newS<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p>
<pre><code>64 位系统：
The size of ints is: 64
32 位系统：
The size of ints is: 32
The integer is: 666
The new string is: 671
</code></pre>
<p>在第 5.1 节，我们将会利用 <code v-pre>if</code> 语句来对可能出现的错误进行分类处理。</p>
<p>更多有关该包的讨论，请参阅 <a href="http://golang.org/pkg/strconv/" target="_blank" rel="noopener noreferrer">官方文档</a>（ <strong>译者注：国内用户可访问 <a href="http://docs.studygolang.com/pkg/strconv/" target="_blank" rel="noopener noreferrer">该页面</a></strong> ）。</p>
</div></template>


