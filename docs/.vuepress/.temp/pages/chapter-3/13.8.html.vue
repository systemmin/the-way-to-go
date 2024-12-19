<template><div><h1 id="_13-8-测试的具体例子" tabindex="-1"><a class="header-anchor" href="#_13-8-测试的具体例子"><span>13.8 测试的具体例子</span></a></h1>
<p>在练习 9.4 中你写了一个叫 <a href="exercises/chapter_9/main_oddeven.go">main_oddeven.go</a> 的程序用来测试前 100 个整数是否是偶数。这个函数属于 <code v-pre>even</code> 包。</p>
<p>下面是一种可能的方案：</p>
<p>示例 13.7 <a href="examples/chapter_13/even/even_main/even_main.go">even_main.go</a>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"fmt"</span></span>
<span class="line">	<span class="token string">"even/even"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">for</span> i<span class="token operator">:=</span><span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">&lt;=</span><span class="token number">100</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Is the integer %d even? %v\n"</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> even<span class="token punctuation">.</span><span class="token function">Even</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面使用了 even.go 中的 <code v-pre>even</code> 包：</p>
<p>示例 13.8 <a href="examples/chapter_13/even/even/even.go">even/even.go</a>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> even</span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">Even</span><span class="token punctuation">(</span>i <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span>		<span class="token comment">// Exported function</span></span>
<span class="line">	<span class="token keyword">return</span> i<span class="token operator">%</span><span class="token number">2</span> <span class="token operator">==</span> <span class="token number">0</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">Odd</span><span class="token punctuation">(</span>i <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span>		<span class="token comment">// Exported function</span></span>
<span class="line">	<span class="token keyword">return</span> i<span class="token operator">%</span><span class="token number">2</span> <span class="token operator">!=</span> <span class="token number">0</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 <code v-pre>even</code> 包的路径下，我们创建一个名为 oddeven_test.go 的测试程序：</p>
<p>示例 13.9 <a href="examples/chapter_13/even/even/oddeven_test.go">even/oddeven_test.go</a>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> even</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token string">"testing"</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">TestEven</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">if</span> <span class="token operator">!</span><span class="token function">Even</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">		t<span class="token punctuation">.</span><span class="token function">Log</span><span class="token punctuation">(</span><span class="token string">" 10 must be even!"</span><span class="token punctuation">)</span></span>
<span class="line">		t<span class="token punctuation">.</span><span class="token function">Fail</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	<span class="token keyword">if</span> <span class="token function">Even</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">		t<span class="token punctuation">.</span><span class="token function">Log</span><span class="token punctuation">(</span><span class="token string">" 7 is not even!"</span><span class="token punctuation">)</span></span>
<span class="line">		t<span class="token punctuation">.</span><span class="token function">Fail</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">TestOdd</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">if</span> <span class="token operator">!</span><span class="token function">Odd</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">		t<span class="token punctuation">.</span><span class="token function">Log</span><span class="token punctuation">(</span><span class="token string">" 11 must be odd!"</span><span class="token punctuation">)</span></span>
<span class="line">		t<span class="token punctuation">.</span><span class="token function">Fail</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	<span class="token keyword">if</span> <span class="token function">Odd</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">		t<span class="token punctuation">.</span><span class="token function">Log</span><span class="token punctuation">(</span><span class="token string">" 10 is not odd!"</span><span class="token punctuation">)</span></span>
<span class="line">		t<span class="token punctuation">.</span><span class="token function">Fail</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于测试需要具体的输入用例且不可能测试到所有的用例（非常像一个无穷的数），所以我们必须对要使用的测试用例思考再三。</p>
<p>至少应该包括：</p>
<ul>
<li>正常的用例</li>
<li>反面的用例（错误的输入，如用负数或字母代替数字，没有输入等）</li>
<li>边界检查用例（如果参数的取值范围是 0 到 1000，检查 0 和 1000 的情况）</li>
</ul>
<p>可以直接执行 go install 安装 <code v-pre>even</code> 或者创建一个 以下内容的 Makefile：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line">include <span class="token variable"><span class="token variable">$(</span>GOROOT<span class="token variable">)</span></span>/src/Make.inc</span>
<span class="line"><span class="token assign-left variable">TARG</span><span class="token operator">=</span>even</span>
<span class="line"><span class="token assign-left variable">GOFILES</span><span class="token operator">=</span><span class="token punctuation">\</span></span>
<span class="line">       even.go<span class="token punctuation">\</span></span>
<span class="line">include <span class="token variable"><span class="token variable">$(</span>GOROOT<span class="token variable">)</span></span>/src/Make.pkg</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后执行 make（或 gomake）命令来构建归档文件 even.a</p>
<p>测试代码不能在 GOFILES 参数中引用，因为我们不希望生成的程序中有测试代码。如果包含了测试代码，go test 会给出错误提示！go test 会生成一个单独的包含测试代码的 <code v-pre>_test</code> 程序。</p>
<p>现在我们可以用命令：<code v-pre>go test</code>（或 <code v-pre>make test</code>）来测试 even 包。</p>
<p>因为示例 13.5 中的测试函数不会调用 t.Log 和 t.Fail，所以会得到一个 <code v-pre>PASS</code> 的结果。在这个简单例子中一切都正常执行。</p>
<p>为了看到失败时的输出，把函数 <code v-pre>TestEven()</code> 改为：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">TestEven</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">if</span> <span class="token function">Even</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">		t<span class="token punctuation">.</span><span class="token function">Log</span><span class="token punctuation">(</span><span class="token string">"Everything OK: 10 is even, just a test to see failed output!"</span><span class="token punctuation">)</span></span>
<span class="line">		t<span class="token punctuation">.</span><span class="token function">Fail</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"> 	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在会调用 t.Log 和 t.Fail，得到的结果如下：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token operator">--</span><span class="token operator">-</span> FAIL<span class="token punctuation">:</span> even<span class="token punctuation">.</span>TestEven <span class="token punctuation">(</span><span class="token number">0.00</span> seconds<span class="token punctuation">)</span></span>
<span class="line">Everything OK<span class="token punctuation">:</span> <span class="token number">10</span> is even<span class="token punctuation">,</span> just a test to see failed output<span class="token operator">!</span></span>
<span class="line">FAIL</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>练习 13.4：</strong><a href="exercises/chapter_13/string_reverse_test.go">string_reverse_test.go</a></p>
<p>为练习 7.14 <a href="exercises/chapter_7/string_reverse.go">string_reverse.go</a> 写一个单元测试。</p>
<p>把 string_reverse 放到自己的包 <code v-pre>strev</code> 中，只包含一个可导出函数 <code v-pre>Reverse()</code>。</p>
<p>实现并测试它。</p>
<h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-3/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-3/13.7.html">Go 中的单元测试和基准测试</RouteLink></li>
<li>下一节：<RouteLink to="/chapter-3/13.9.html">用（测试数据）表驱动测试</RouteLink></li>
</ul>
</div></template>


