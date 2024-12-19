<template><div><h1 id="_12-1-读取用户的输入" tabindex="-1"><a class="header-anchor" href="#_12-1-读取用户的输入"><span>12.1 读取用户的输入</span></a></h1>
<p>我们如何读取用户的键盘（控制台）输入呢？从键盘和标准输入 <code v-pre>os.Stdin</code> 读取输入，最简单的办法是使用 <code v-pre>fmt</code> 包提供的 <code v-pre>Scan...</code> 和 <code v-pre>Sscan...</code> 开头的函数。请看以下程序：</p>
<p>示例 12.1 <a href="examples/chapter_12/readinput1.go">readinput1.go</a>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token comment">// 从控制台读取输入:</span></span>
<span class="line"><span class="token keyword">package</span> main</span>
<span class="line"><span class="token keyword">import</span> <span class="token string">"fmt"</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">var</span> <span class="token punctuation">(</span></span>
<span class="line">   firstName<span class="token punctuation">,</span> lastName<span class="token punctuation">,</span> s <span class="token builtin">string</span></span>
<span class="line">   i <span class="token builtin">int</span></span>
<span class="line">   f <span class="token builtin">float32</span></span>
<span class="line">   input <span class="token operator">=</span> <span class="token string">"56.12 / 5212 / Go"</span></span>
<span class="line">   format <span class="token operator">=</span> <span class="token string">"%f / %d / %s"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Please enter your full name: "</span><span class="token punctuation">)</span></span>
<span class="line">   fmt<span class="token punctuation">.</span><span class="token function">Scanln</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>firstName<span class="token punctuation">,</span> <span class="token operator">&amp;</span>lastName<span class="token punctuation">)</span></span>
<span class="line">   <span class="token comment">// fmt.Scanf("%s %s", &amp;firstName, &amp;lastName)</span></span>
<span class="line">   fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Hi %s %s!\n"</span><span class="token punctuation">,</span> firstName<span class="token punctuation">,</span> lastName<span class="token punctuation">)</span> <span class="token comment">// Hi Chris Naegels</span></span>
<span class="line">   fmt<span class="token punctuation">.</span><span class="token function">Sscanf</span><span class="token punctuation">(</span>input<span class="token punctuation">,</span> format<span class="token punctuation">,</span> <span class="token operator">&amp;</span>f<span class="token punctuation">,</span> <span class="token operator">&amp;</span>i<span class="token punctuation">,</span> <span class="token operator">&amp;</span>s<span class="token punctuation">)</span></span>
<span class="line">   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"From the string we read: "</span><span class="token punctuation">,</span> f<span class="token punctuation">,</span> i<span class="token punctuation">,</span> s<span class="token punctuation">)</span></span>
<span class="line">    <span class="token comment">// 输出结果: From the string we read: 56.12 5212 Go</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>Scanln()</code> 扫描来自标准输入的文本，将空格分隔的值依次存放到后续的参数内，直到碰到换行。<code v-pre>Scanf()</code> 与其类似，除了 <code v-pre>Scanf()</code> 的第一个参数用作格式字符串，用来决定如何读取。<code v-pre>Sscan...</code> 和以 <code v-pre>Sscan...</code> 开头的函数则是从字符串读取，除此之外，与 <code v-pre>Scanf()</code> 相同。如果这些函数读取到的结果与您预想的不同，您可以检查成功读入数据的个数和返回的错误。</p>
<p>您也可以使用 <code v-pre>bufio</code> 包提供的缓冲读取器 (buffered reader) 来读取数据，正如以下例子所示：</p>
<p>示例 12.2 <a href="examples/chapter_12/readinput2.go">readinput2.go</a>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">    <span class="token string">"fmt"</span></span>
<span class="line">    <span class="token string">"bufio"</span></span>
<span class="line">    <span class="token string">"os"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">var</span> inputReader <span class="token operator">*</span>bufio<span class="token punctuation">.</span>Reader</span>
<span class="line"><span class="token keyword">var</span> input <span class="token builtin">string</span></span>
<span class="line"><span class="token keyword">var</span> err <span class="token builtin">error</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    inputReader <span class="token operator">=</span> bufio<span class="token punctuation">.</span><span class="token function">NewReader</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdin<span class="token punctuation">)</span></span>
<span class="line">    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Please enter some input: "</span><span class="token punctuation">)</span></span>
<span class="line">    input<span class="token punctuation">,</span> err <span class="token operator">=</span> inputReader<span class="token punctuation">.</span><span class="token function">ReadString</span><span class="token punctuation">(</span><span class="token char">'\n'</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">if</span> err <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">        fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"The input was: %s\n"</span><span class="token punctuation">,</span> input<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>inputReader</code> 是一个指向 <code v-pre>bufio.Reader</code> 的指针。<code v-pre>inputReader := bufio.NewReader(os.Stdin)</code> 这行代码，将会创建一个读取器，并将其与标准输入绑定。</p>
<p><code v-pre>bufio.NewReader()</code> 构造函数的签名为：<code v-pre>func NewReader(rd io.Reader) *Reader</code></p>
<p>该函数的实参可以是满足 <code v-pre>io.Reader</code> 接口的任意对象（任意包含有适当的 <code v-pre>Read()</code> 方法的对象，请参考<RouteLink to="/chapter-3/11.8.html">章节 11.8</RouteLink>），函数返回一个新的带缓冲的 <code v-pre>io.Reader</code> 对象，它将从指定读取器（例如 <code v-pre>os.Stdin</code>）读取内容。</p>
<p>返回的读取器对象提供一个方法 <code v-pre>ReadString(delim byte)</code>，该方法从输入中读取内容，直到碰到 <code v-pre>delim</code> 指定的字符，然后将读取到的内容连同 <code v-pre>delim</code> 字符一起放到缓冲区。</p>
<p><code v-pre>ReadString</code> 返回读取到的字符串，如果碰到错误则返回 <code v-pre>nil</code>。如果它一直读到文件结束，则返回读取到的字符串和 <code v-pre>io.EOF</code>。如果读取过程中没有碰到 <code v-pre>delim</code> 字符，将返回错误 <code v-pre>err != nil</code>。</p>
<p>在上面的例子中，我们会读取键盘输入，直到回车键 (<code v-pre>\n</code>) 被按下。</p>
<p>屏幕是标准输出 <code v-pre>os.Stdout</code>；<code v-pre>os.Stderr</code> 用于显示错误信息，大多数情况下等同于 <code v-pre>os.Stdout</code>。</p>
<p>一般情况下，我们会省略变量声明，而使用 <code v-pre>:=</code>，例如：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">inputReader <span class="token operator">:=</span> bufio<span class="token punctuation">.</span><span class="token function">NewReader</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdin<span class="token punctuation">)</span></span>
<span class="line">input<span class="token punctuation">,</span> err <span class="token operator">:=</span> inputReader<span class="token punctuation">.</span><span class="token function">ReadString</span><span class="token punctuation">(</span><span class="token char">'\n'</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将从现在开始使用这种写法。</p>
<p>第二个例子从键盘读取输入，使用了 <code v-pre>switch</code> 语句：</p>
<p>示例 12.3 <a href="examples/chapter_12/switch_input.go">switch_input.go</a>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">    <span class="token string">"fmt"</span></span>
<span class="line">    <span class="token string">"os"</span></span>
<span class="line">    <span class="token string">"bufio"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    inputReader <span class="token operator">:=</span> bufio<span class="token punctuation">.</span><span class="token function">NewReader</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdin<span class="token punctuation">)</span></span>
<span class="line">    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Please enter your name:"</span><span class="token punctuation">)</span></span>
<span class="line">    input<span class="token punctuation">,</span> err <span class="token operator">:=</span> inputReader<span class="token punctuation">.</span><span class="token function">ReadString</span><span class="token punctuation">(</span><span class="token char">'\n'</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"There were errors reading, exiting program."</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">return</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Your name is %s"</span><span class="token punctuation">,</span> input<span class="token punctuation">)</span></span>
<span class="line">    <span class="token comment">// For Unix: test with delimiter "\n", for Windows: test with "\r\n"</span></span>
<span class="line">    <span class="token keyword">switch</span> input <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">case</span> <span class="token string">"Philip\r\n"</span><span class="token punctuation">:</span>  fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Welcome Philip!"</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">case</span> <span class="token string">"Chris\r\n"</span><span class="token punctuation">:</span>   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Welcome Chris!"</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">case</span> <span class="token string">"Ivo\r\n"</span><span class="token punctuation">:</span>     fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Welcome Ivo!"</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">default</span><span class="token punctuation">:</span> fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"You are not welcome here! Goodbye!"</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// version 2:   </span></span>
<span class="line">    <span class="token keyword">switch</span> input <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">case</span> <span class="token string">"Philip\r\n"</span><span class="token punctuation">:</span>  <span class="token keyword">fallthrough</span></span>
<span class="line">    <span class="token keyword">case</span> <span class="token string">"Ivo\r\n"</span><span class="token punctuation">:</span>     <span class="token keyword">fallthrough</span></span>
<span class="line">    <span class="token keyword">case</span> <span class="token string">"Chris\r\n"</span><span class="token punctuation">:</span>   fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Welcome %s\n"</span><span class="token punctuation">,</span> input<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">default</span><span class="token punctuation">:</span> fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"You are not welcome here! Goodbye!\n"</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// version 3:</span></span>
<span class="line">    <span class="token keyword">switch</span> input <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">case</span> <span class="token string">"Philip\r\n"</span><span class="token punctuation">,</span> <span class="token string">"Ivo\r\n"</span><span class="token punctuation">:</span>   fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Welcome %s\n"</span><span class="token punctuation">,</span> input<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">default</span><span class="token punctuation">:</span> fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"You are not welcome here! Goodbye!\n"</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意：Unix 和 Windows 的行结束符是不同的！</p>
<p><strong>练习</strong></p>
<p><strong>练习 12.1:</strong> <a href="exercises/chapter_12/word_letter_count.go">word_letter_count.go</a></p>
<p>编写一个程序，从键盘读取输入。当用户输入 'S' 的时候表示输入结束，这时程序输出 3 个数字：<br>
i) 输入的字符的个数，包括空格，但不包括 <code v-pre>'\r'</code> 和 <code v-pre>'\n'</code><br>
ii) 输入的单词的个数<br>
iii) 输入的行数</p>
<p><strong>练习 12.2:</strong> <a href="exercises/chapter_12/calculator.go">calculator.go</a></p>
<p>编写一个简单的逆波兰式计算器，它接受用户输入的整型数（最大值 999999）和运算符 +、-、*、/。<br>
输入的格式为：<code v-pre>number1 ENTER number2 ENTER operator ENTER --&gt; 显示结果</code><br>
当用户输入字符 <code v-pre>'q'</code> 时，程序结束。请使用您在<RouteLink to="/chapter-3/11.12.html">练习 11.13</RouteLink> 中开发的 <code v-pre>stack</code> 包。</p>
<h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-3/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-3/12.0.html">读写数据</RouteLink></li>
<li>下一节：<RouteLink to="/chapter-3/12.2.html">文件读写</RouteLink></li>
</ul>
</div></template>


