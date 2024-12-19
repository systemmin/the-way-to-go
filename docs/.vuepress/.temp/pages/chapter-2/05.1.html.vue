<template><div><h1 id="_5-1-if-else-结构" tabindex="-1"><a class="header-anchor" href="#_5-1-if-else-结构"><span>5.1 if-else 结构</span></a></h1>
<p>if 是用于测试某个条件（布尔型或逻辑型）的语句，如果该条件成立，则会执行 if 后由大括号括起来的代码块，否则就忽略该代码块继续执行后续的代码。</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">if</span> condition <span class="token punctuation">{</span></span>
<span class="line">	<span class="token comment">// do something	</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果存在第二个分支，则可以在上面代码的基础上添加 <code v-pre>else</code> 关键字以及另一代码块，这个代码块中的代码只有在条件不满足时才会执行。<code v-pre>if</code> 和 <code v-pre>else</code> 后的两个代码块是相互独立的分支，只可能执行其中一个。</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">if</span> condition <span class="token punctuation">{</span></span>
<span class="line">	<span class="token comment">// do something	</span></span>
<span class="line"><span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token comment">// do something	</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果存在第三个分支，则可以使用下面这种三个独立分支的形式：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">if</span> condition1 <span class="token punctuation">{</span></span>
<span class="line">	<span class="token comment">// do something	</span></span>
<span class="line"><span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> condition2 <span class="token punctuation">{</span></span>
<span class="line">	<span class="token comment">// do something else	</span></span>
<span class="line"><span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token comment">// catch-all or default</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>else-if 分支的数量是没有限制的，但是为了代码的可读性，还是不要在 <code v-pre>if</code> 后面加入太多的 else-if 结构。如果你必须使用这种形式，则把尽可能先满足的条件放在前面。</p>
<p>即使当代码块之间只有一条语句时，大括号也不可被省略（尽管有些人并不赞成，但这还是符合了软件工程原则的主流做法）。</p>
<p>关键字 <code v-pre>if</code> 和 <code v-pre>else</code> 之后的左大括号 <code v-pre>{</code> 必须和关键字在同一行，如果你使用了 else-if 结构，则前段代码块的右大括号 <code v-pre>}</code> 必须和 else-if 关键字在同一行。这两条规则都是被编译器强制规定的。</p>
<p>非法的 Go 代码:</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">if</span> x<span class="token punctuation">{</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token keyword">else</span> <span class="token punctuation">{</span>	<span class="token comment">// 无效的</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>要注意的是，在你使用 <code v-pre>gofmt</code> 格式化代码之后，每个分支内的代码都会缩进 4 个或 8 个空格，或者是 1 个 tab，并且右大括号与对应的 <code v-pre>if</code> 关键字垂直对齐。</p>
<p>在有些情况下，条件语句两侧的括号是可以被省略的；当条件比较复杂时，则可以使用括号让代码更易读。条件允许是符合条件，需使用 <code v-pre>&amp;&amp;</code>、<code v-pre>||</code> 或 <code v-pre>!</code>，你可以使用括号来提升某个表达式的运算优先级，并提高代码的可读性。</p>
<p>一种可能用到条件语句的场景是测试变量的值，在不同的情况执行不同的语句，不过将在第 5.3 节讲到的 switch 结构会更适合这种情况。</p>
<p>示例 5.1 <a href="examples/chapter_5/booleans.go">booleans.go</a></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"><span class="token keyword">import</span> <span class="token string">"fmt"</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	bool1 <span class="token operator">:=</span> <span class="token boolean">true</span></span>
<span class="line">	<span class="token keyword">if</span> bool1 <span class="token punctuation">{</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"The value is true\n"</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"The value is false\n"</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p>
<pre><code>The value is true
</code></pre>
<p><strong>注意事项</strong> 这里不需要使用 <code v-pre>if bool1 == true</code> 来判断，因为 <code v-pre>bool1</code> 本身已经是一个布尔类型的值。</p>
<p>这种做法一般都用在测试 <code v-pre>true</code> 或者有利条件时，但你也可以使用取反 <code v-pre>!</code> 来判断值的相反结果，如：<code v-pre>if !bool1</code> 或者 <code v-pre>if !(condition)</code>。后者的括号大多数情况下是必须的，如这种情况：<code v-pre>if !(var1 == var2)</code>。</p>
<p>当 if 结构内有 <code v-pre>break</code>、<code v-pre>continue</code>、<code v-pre>goto</code> 或者 <code v-pre>return</code> 语句时，Go 代码的常见写法是省略 <code v-pre>else</code> 部分（另见<RouteLink to="/chapter-2/05.2.html">第 5.2 节</RouteLink>）。无论满足哪个条件都会返回 <code v-pre>x</code> 或者 <code v-pre>y</code> 时，一般使用以下写法：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">if</span> condition <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">return</span> x</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token keyword">return</span> y</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意事项</strong> 不要同时在 if-else 结构的两个分支里都使用 <code v-pre>return</code> 语句，这将导致编译报错 <code v-pre>function ends without a return statement</code>（你可以认为这是一个编译器的 Bug 或者特性）。（ <strong>译者注：该问题已经在 Go 1.1 中被修复或者说改进</strong> ）</p>
<p>这里举一些有用的例子：</p>
<ol>
<li>
<p>判断一个字符串是否为空：</p>
<ul>
<li><code v-pre>if str == &quot;&quot; { ... }</code></li>
<li><code v-pre>if len(str) == 0 {...}</code></li>
</ul>
</li>
<li>
<p>判断运行 Go 程序的操作系统类型，这可以通过常量 <code v-pre>runtime.GOOS</code> 来判断（<RouteLink to="/chapter-2/02.2.html">第 2.2 节</RouteLink>）。</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">if</span> runtime<span class="token punctuation">.</span>GOOS <span class="token operator">==</span> <span class="token string">"windows"</span>	 <span class="token punctuation">{</span></span>
<span class="line">	<span class="token punctuation">.</span>	<span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line"><span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span> <span class="token comment">// Unix-like</span></span>
<span class="line">	<span class="token punctuation">.</span>	<span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码一般被放在 <code v-pre>init()</code> 函数中执行。这儿还有一段示例来演示如何根据操作系统来决定输入结束的提示：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">var</span> prompt <span class="token operator">=</span> <span class="token string">"Enter a digit, e.g. 3 "</span><span class="token operator">+</span> <span class="token string">"or %s to quit."</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">if</span> runtime<span class="token punctuation">.</span>GOOS <span class="token operator">==</span> <span class="token string">"windows"</span> <span class="token punctuation">{</span></span>
<span class="line">		prompt <span class="token operator">=</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span>prompt<span class="token punctuation">,</span> <span class="token string">"Ctrl+Z, Enter"</span><span class="token punctuation">)</span>		</span>
<span class="line">	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span> <span class="token comment">//Unix-like</span></span>
<span class="line">		prompt <span class="token operator">=</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span>prompt<span class="token punctuation">,</span> <span class="token string">"Ctrl+D"</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>函数 <code v-pre>Abs()</code> 用于返回一个整型数字的绝对值:</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">Abs</span><span class="token punctuation">(</span>x <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span></span>
<span class="line"><span class="token keyword">if</span> x <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">return</span> <span class="token operator">-</span>x</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token keyword">return</span> x	</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><code v-pre>isGreater</code> 用于比较两个整型数字的大小:</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">isGreater</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">if</span> x <span class="token operator">></span> y <span class="token punctuation">{</span></span>
<span class="line">		<span class="token keyword">return</span> <span class="token boolean">true</span>	</span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	<span class="token keyword">return</span> <span class="token boolean">false</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<p>在第四种情况中，<code v-pre>if</code> 可以包含一个初始化语句（如：给一个变量赋值）。这种写法具有固定的格式（在初始化语句后方必须加上分号）：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">if</span> initialization<span class="token punctuation">;</span> condition <span class="token punctuation">{</span></span>
<span class="line">	<span class="token comment">// do something</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例如:</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">val <span class="token operator">:=</span> <span class="token number">10</span></span>
<span class="line"><span class="token keyword">if</span> val <span class="token operator">></span> max <span class="token punctuation">{</span></span>
<span class="line">	<span class="token comment">// do something</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你也可以这样写:</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">if</span> val <span class="token operator">:=</span> <span class="token number">10</span><span class="token punctuation">;</span> val <span class="token operator">></span> max <span class="token punctuation">{</span></span>
<span class="line">	<span class="token comment">// do something</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但要注意的是，使用简短方式 <code v-pre>:=</code> 声明的变量的作用域只存在于 <code v-pre>if</code> 结构中（在 <code v-pre>if</code> 结构的大括号之间，如果使用 if-else 结构则在 <code v-pre>else</code> 代码块中变量也会存在）。如果变量在 <code v-pre>if</code> 结构之前就已经存在，那么在 <code v-pre>if</code> 结构中，该变量原来的值会被隐藏。最简单的解决方案就是不要在初始化语句中声明变量（见<RouteLink to="/chapter-2/05.2.html">5.2 节的例 3</RouteLink> 了解更多)。</p>
<p>示例 5.2 <a href="examples/chapter_5/ifelse.go">ifelse.go</a></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token string">"fmt"</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">var</span> first <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">10</span></span>
<span class="line">	<span class="token keyword">var</span> cond <span class="token builtin">int</span></span>
<span class="line"></span>
<span class="line">	<span class="token keyword">if</span> first <span class="token operator">&lt;=</span> <span class="token number">0</span> <span class="token punctuation">{</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"first is less than or equal to 0\n"</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> first <span class="token operator">></span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> first <span class="token operator">&lt;</span> <span class="token number">5</span> <span class="token punctuation">{</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"first is between 0 and 5\n"</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"first is 5 or greater\n"</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	<span class="token keyword">if</span> cond <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span> cond <span class="token operator">></span> <span class="token number">10</span> <span class="token punctuation">{</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"cond is greater than 10\n"</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"cond is not greater than 10\n"</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p>
<pre><code>first is 5 or greater
cond is not greater than 10
</code></pre>
<p>下面的代码片段展示了如何通过在初始化语句中获取函数 <code v-pre>process()</code> 的返回值，并在条件语句中作为判定条件来决定是否执行 <code v-pre>if</code> 结构中的代码：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">if</span> value <span class="token operator">:=</span> <span class="token function">process</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span> value <span class="token operator">></span> max <span class="token punctuation">{</span></span>
<span class="line">	<span class="token operator">...</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


