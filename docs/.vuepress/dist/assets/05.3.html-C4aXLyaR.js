import{_ as i,c as o,a as l,b as a,f as n,d as p,e as t,r as c,o as u}from"./app-DtITwm2S.js";const d={};function r(k,s){const e=c("RouteLink");return u(),o("div",null,[s[26]||(s[26]=l(`<h1 id="_5-3-switch-结构" tabindex="-1"><a class="header-anchor" href="#_5-3-switch-结构"><span>5.3 switch 结构</span></a></h1><p>相比较 C 和 Java 等其它语言而言，Go 语言中的 <code>switch</code> 结构使用上更加灵活。它接受任意形式的表达式：</p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line"><span class="token keyword">switch</span> var1 <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">case</span> val1<span class="token punctuation">:</span></span>
<span class="line">		<span class="token operator">...</span></span>
<span class="line">	<span class="token keyword">case</span> val2<span class="token punctuation">:</span></span>
<span class="line">		<span class="token operator">...</span></span>
<span class="line">	<span class="token keyword">default</span><span class="token punctuation">:</span></span>
<span class="line">		<span class="token operator">...</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>变量 <code>var1</code> 可以是任何类型，而 <code>val1</code> 和 <code>val2</code> 则可以是同类型的任意值。类型不被局限于常量或整数，但必须是相同的类型；或者最终结果为相同类型的表达式。前花括号 <code>{</code> 必须和 <code>switch</code> 关键字在同一行。</p><p>您可以同时测试多个可能符合条件的值，使用逗号分割它们，例如：<code>case val1, val2, val3</code>。</p><p>每一个 <code>case</code> 分支都是唯一的，从上至下逐一测试，直到匹配为止。（ Go 语言使用快速的查找算法来测试 <code>switch</code> 条件与 <code>case</code> 分支的匹配情况，直到算法匹配到某个 <code>case</code> 或者进入 <code>default</code> 条件为止。）</p><p>一旦成功地匹配到某个分支，在执行完相应代码后就会退出整个 <code>switch</code> 代码块，也就是说您不需要特别使用 <code>break</code> 语句来表示结束。</p><p>因此，程序也不会自动地去执行下一个分支的代码。如果在执行完每个分支的代码后，还希望继续执行后续分支的代码，可以使用 <code>fallthrough</code> 关键字来达到目的。</p><p>因此：</p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line"><span class="token keyword">switch</span> i <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">case</span> <span class="token number">0</span><span class="token punctuation">:</span> <span class="token comment">// 空分支，只有当 i == 0 时才会进入分支</span></span>
<span class="line">	<span class="token keyword">case</span> <span class="token number">1</span><span class="token punctuation">:</span></span>
<span class="line">		<span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 当 i == 0 时函数不会被调用</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>并且：</p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line"><span class="token keyword">switch</span> i <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">case</span> <span class="token number">0</span><span class="token punctuation">:</span> <span class="token keyword">fallthrough</span></span>
<span class="line">	<span class="token keyword">case</span> <span class="token number">1</span><span class="token punctuation">:</span></span>
<span class="line">		<span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 当 i == 0 时函数也会被调用</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 <code>case ...:</code> 语句之后，您不需要使用花括号将多行语句括起来，但您可以在分支中进行任意形式的编码。当代码块只有一行时，可以直接放置在 <code>case</code> 语句之后。</p><p>您同样可以使用 <code>return</code> 语句来提前结束代码块的执行。当您在 <code>switch</code> 语句块中使用 <code>return</code> 语句，并且您的函数是有返回值的，您还需要在 switch 之后添加相应的 <code>return</code> 语句以确保函数始终会返回。</p><p>可选的 <code>default</code> 分支可以出现在任何顺序，但最好将它放在最后。它的作用类似与 if-else 语句中的 <code>else</code>，表示不符合任何已给出条件时，执行相关语句。</p><p>示例 5.4 <a href="examples/chapter_5/switch1.go">switch1.go</a>：</p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">var</span> num1 <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">100</span></span>
<span class="line"></span>
<span class="line">	<span class="token keyword">switch</span> num1 <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">case</span> <span class="token number">98</span><span class="token punctuation">,</span> <span class="token number">99</span><span class="token punctuation">:</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;It&#39;s equal to 98&quot;</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">case</span> <span class="token number">100</span><span class="token punctuation">:</span> </span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;It&#39;s equal to 100&quot;</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">default</span><span class="token punctuation">:</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;It&#39;s not equal to 98 or 100&quot;</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p><pre><code>It&#39;s equal to 100
</code></pre>`,19)),a("p",null,[s[1]||(s[1]=n("在第 12.1 节，我们会使用 ")),s[2]||(s[2]=a("code",null,"switch",-1)),s[3]||(s[3]=n(" 语句判断从键盘输入的字符（详见")),p(e,{to:"/chapter-2/12.2.html"},{default:t(()=>s[0]||(s[0]=[n("第 12.2 节")])),_:1}),s[4]||(s[4]=n(" 的 ")),s[5]||(s[5]=a("a",{href:"./examples/chapter_12/switch.go"},"switch.go",-1)),s[6]||(s[6]=n("）。")),s[7]||(s[7]=a("code",null,"switch",-1)),s[8]||(s[8]=n(" 语句的第二种形式是不提供任何被判断的值（实际上默认为判断是否为 ")),s[9]||(s[9]=a("code",null,"true",-1)),s[10]||(s[10]=n("），然后在每个 ")),s[11]||(s[11]=a("code",null,"case",-1)),s[12]||(s[12]=n(" 分支中进行测试不同的条件。当任一分支的测试结果为 ")),s[13]||(s[13]=a("code",null,"true",-1)),s[14]||(s[14]=n(" 时，该分支的代码会被执行。这看起来非常像链式的 if-else 语句，但是在测试条件非常多的情况下，提供了可读性更好的书写方式。"))]),s[27]||(s[27]=l(`<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line"><span class="token keyword">switch</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">case</span> condition1<span class="token punctuation">:</span></span>
<span class="line">		<span class="token operator">...</span></span>
<span class="line">	<span class="token keyword">case</span> condition2<span class="token punctuation">:</span></span>
<span class="line">		<span class="token operator">...</span></span>
<span class="line">	<span class="token keyword">default</span><span class="token punctuation">:</span></span>
<span class="line">		<span class="token operator">...</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例如：</p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line"><span class="token keyword">switch</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">case</span> i <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">:</span></span>
<span class="line">		<span class="token function">f1</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">case</span> i <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">:</span></span>
<span class="line">		<span class="token function">f2</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">case</span> i <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">:</span></span>
<span class="line">		<span class="token function">f3</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>任何支持进行相等判断的类型都可以作为测试表达式的条件，包括 <code>int</code>、<code>string</code>、指针等。</p><p>示例 5.4 <a href="examples/chapter_5/switch2.go">switch2.go</a>：</p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">var</span> num1 <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">7</span></span>
<span class="line"></span>
<span class="line">	<span class="token keyword">switch</span> <span class="token punctuation">{</span></span>
<span class="line">	    <span class="token keyword">case</span> num1 <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">:</span></span>
<span class="line">		    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Number is negative&quot;</span><span class="token punctuation">)</span></span>
<span class="line">	    <span class="token keyword">case</span> num1 <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> num1 <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">:</span></span>
<span class="line">		    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Number is between 0 and 10&quot;</span><span class="token punctuation">)</span></span>
<span class="line">	    <span class="token keyword">default</span><span class="token punctuation">:</span></span>
<span class="line">		    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Number is 10 or greater&quot;</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p><pre><code>Number is between 0 and 10
</code></pre><p>switch 语句的第三种形式是包含一个初始化语句：</p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line"><span class="token keyword">switch</span> initialization <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">case</span> val1<span class="token punctuation">:</span></span>
<span class="line">		<span class="token operator">...</span></span>
<span class="line">	<span class="token keyword">case</span> val2<span class="token punctuation">:</span></span>
<span class="line">		<span class="token operator">...</span></span>
<span class="line">	<span class="token keyword">default</span><span class="token punctuation">:</span></span>
<span class="line">		<span class="token operator">...</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种形式可以非常优雅地进行条件判断：</p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line"><span class="token keyword">switch</span> result <span class="token operator">:=</span> <span class="token function">calculate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">case</span> result <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">:</span></span>
<span class="line">		<span class="token operator">...</span></span>
<span class="line">	<span class="token keyword">case</span> result <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">:</span></span>
<span class="line">		<span class="token operator">...</span></span>
<span class="line">	<span class="token keyword">default</span><span class="token punctuation">:</span></span>
<span class="line">		<span class="token comment">// 0</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在下面这个代码片段中，变量 <code>a</code> 和 <code>b</code> 被平行初始化，然后作为判断条件：</p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line"><span class="token keyword">switch</span> a<span class="token punctuation">,</span> b <span class="token operator">:=</span> x<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> y<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">case</span> a <span class="token operator">&lt;</span> b<span class="token punctuation">:</span> t <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span></span>
<span class="line">	<span class="token keyword">case</span> a <span class="token operator">==</span> b<span class="token punctuation">:</span> t <span class="token operator">=</span> <span class="token number">0</span></span>
<span class="line">	<span class="token keyword">case</span> a <span class="token operator">&gt;</span> b<span class="token punctuation">:</span> t <span class="token operator">=</span> <span class="token number">1</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,14)),a("p",null,[s[16]||(s[16]=a("code",null,"switch",-1)),s[17]||(s[17]=n(" 语句还可以被用于 type-switch（详见")),p(e,{to:"/chapter-2/11.4.html"},{default:t(()=>s[15]||(s[15]=[n("第 11.4 节")])),_:1}),s[18]||(s[18]=n("）来判断某个 ")),s[19]||(s[19]=a("code",null,"interface",-1)),s[20]||(s[20]=n(" 变量中实际存储的变量类型。"))]),s[28]||(s[28]=l(`<p><strong>问题 5.1：</strong></p><p>请说出下面代码片段输出的结果：</p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line">	k <span class="token operator">:=</span> <span class="token number">6</span></span>
<span class="line">	<span class="token keyword">switch</span> k <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">case</span> <span class="token number">4</span><span class="token punctuation">:</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;was &lt;= 4&quot;</span><span class="token punctuation">)</span></span>
<span class="line">		<span class="token keyword">fallthrough</span></span>
<span class="line">	<span class="token keyword">case</span> <span class="token number">5</span><span class="token punctuation">:</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;was &lt;= 5&quot;</span><span class="token punctuation">)</span></span>
<span class="line">		<span class="token keyword">fallthrough</span></span>
<span class="line">	<span class="token keyword">case</span> <span class="token number">6</span><span class="token punctuation">:</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;was &lt;= 6&quot;</span><span class="token punctuation">)</span></span>
<span class="line">		<span class="token keyword">fallthrough</span></span>
<span class="line">	<span class="token keyword">case</span> <span class="token number">7</span><span class="token punctuation">:</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;was &lt;= 7&quot;</span><span class="token punctuation">)</span></span>
<span class="line">		<span class="token keyword">fallthrough</span></span>
<span class="line">	<span class="token keyword">case</span> <span class="token number">8</span><span class="token punctuation">:</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;was &lt;= 8&quot;</span><span class="token punctuation">)</span></span>
<span class="line">		<span class="token keyword">fallthrough</span></span>
<span class="line">	<span class="token keyword">default</span><span class="token punctuation">:</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;default case&quot;</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>练习 5.2：</strong> <a href="exercises/chapter_5/season.go">season.go</a>：</p><p>写一个 <code>Season()</code> 函数，要求接受一个代表月份的数字，然后返回所代表月份所在季节的名称（不用考虑月份的日期）。</p><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>`,6)),a("ul",null,[a("li",null,[p(e,{to:"/chapter-2/directory.html"},{default:t(()=>s[21]||(s[21]=[n("目录")])),_:1})]),a("li",null,[s[23]||(s[23]=n("上一节：")),p(e,{to:"/chapter-2/05.2.html"},{default:t(()=>s[22]||(s[22]=[n("测试多返回值函数的错误")])),_:1})]),a("li",null,[s[25]||(s[25]=n("下一节：")),p(e,{to:"/chapter-2/05.4.html"},{default:t(()=>s[24]||(s[24]=[n("for 结构")])),_:1})])])])}const m=i(d,[["render",r],["__file","05.3.html.vue"]]),b=JSON.parse('{"path":"/chapter-2/05.3.html","title":"5.3 switch 结构","lang":"zh-cn","frontmatter":{},"headers":[{"level":1,"title":"5.3 switch 结构","slug":"_5-3-switch-结构","link":"#_5-3-switch-结构","children":[{"level":2,"title":"链接","slug":"链接","link":"#链接","children":[]}]}],"git":{},"filePathRelative":"chapter-2/05.3.md"}');export{m as comp,b as data};