<template><div><h1 id="_13-7-go-中的单元测试和基准测试" tabindex="-1"><a class="header-anchor" href="#_13-7-go-中的单元测试和基准测试"><span>13.7 Go 中的单元测试和基准测试</span></a></h1>
<p>首先所有的包都应该有一定的必要文档，然后同样重要的是对包的测试。</p>
<p>在第 3 章中提到了 Go 的测试工具 gotest， 我们已经在 <RouteLink to="/chapter-3/09.8.html">9.8 节</RouteLink>中使用过了。这里我们会用更多的例子进行详细说明。</p>
<p>名为 testing 的包被专门用来进行自动化测试，日志和错误报告。并且还包含一些基准测试函数的功能。</p>
<p><u>备注：</u>gotest 是 Unix bash 脚本，所以在 Windows 下你需要配置 MINGW 环境（参见 <RouteLink to="/chapter-3/02.5.html">2.5 节</RouteLink>）；在 Windows 环境下把所有的 pkg/linux_amd64 替换成 pkg/windows。</p>
<p>对一个包做（单元）测试，需要写一些可以频繁（每次更新后）执行的小块测试单元来检查代码的正确性。于是我们必须写一些 Go 源文件来测试代码。测试程序必须属于被测试的包，并且文件名满足这种形式 <code v-pre>*_test.go</code>，所以测试代码和包中的业务代码是分开的。</p>
<p><code v-pre>_test</code> 程序不会被普通的 Go 编译器编译，所以当放应用部署到生产环境时它们不会被部署；只有 gotest 会编译所有的程序：普通程序和测试程序。</p>
<p>测试文件中必须导入 <code v-pre>&quot;testing&quot;</code> 包，并写一些名字以 <code v-pre>TestZzz</code> 打头的全局函数，这里的 <code v-pre>Zzz</code> 是被测试函数的字母描述，如 <code v-pre>TestFmtInterface()</code>，<code v-pre>TestPayEmployees()</code> 等。</p>
<p>测试函数必须有这种形式的头部：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">TestAbcde</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><code v-pre>T</code> 是传给测试函数的结构类型，用来管理测试状态，支持格式化测试日志，如 <code v-pre>t.Log</code>，<code v-pre>t.Error</code>，<code v-pre>t.ErrorF</code> 等。在函数的结尾把输出跟想要的结果对比，如果不等就打印一个错误，成功的测试则直接返回。</p>
<p>用下面这些函数来通知测试失败：</p>
<p>1）<code v-pre>func (t *T) Fail()</code></p>
<pre><code>	标记测试函数为失败，然后继续执行（剩下的测试）。
</code></pre>
<p>2）<code v-pre>func (t *T) FailNow()</code></p>
<pre><code>	标记测试函数为失败并中止执行；文件中别的测试也被略过，继续执行下一个文件。
</code></pre>
<p>3）<code v-pre>func (t *T) Log(args ...interface{})</code></p>
<pre><code>	args 被用默认的格式格式化并打印到错误日志中。
</code></pre>
<p>4）<code v-pre>func (t *T) Fatal(args ...interface{})</code></p>
<pre><code>	结合 先执行 3），然后执行 2）的效果。
</code></pre>
<p>运行 go test 来编译测试程序，并执行程序中所有的 <code v-pre>TestZZZ</code> 函数。如果所有的测试都通过会打印出 <code v-pre>PASS</code>。</p>
<p>gotest 可以接收一个或多个函数程序作为参数，并指定一些选项。</p>
<p>结合 <code v-pre>--chatty</code> 或 <code v-pre>-v</code> 选项，每个执行的测试函数以及测试状态会被打印。</p>
<p>例如：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line">go <span class="token builtin class-name">test</span> fmt_test.go <span class="token parameter variable">--chatty</span></span>
<span class="line"><span class="token operator">==</span><span class="token operator">=</span> RUN fmt.TestFlagParser</span>
<span class="line">--- PASS: fmt.TestFlagParser</span>
<span class="line"><span class="token operator">==</span><span class="token operator">=</span> RUN fmt.TestArrayPrinter</span>
<span class="line">--- PASS: fmt.TestArrayPrinter</span>
<span class="line"><span class="token punctuation">..</span>.</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>testing</code> 包中有一些类型和函数可以用来做简单的基准测试；测试代码中必须包含以 <code v-pre>BenchmarkZzz</code> 打头的函数并接收一个 <code v-pre>*testing.B</code> 类型的参数，比如：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">BenchmarkReverse</span><span class="token punctuation">(</span>b <span class="token operator">*</span>testing<span class="token punctuation">.</span>B<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token operator">...</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>命令 <code v-pre>go test –test.bench=.*</code> 会运行所有的基准测试函数；代码中的函数会被调用 <code v-pre>N</code> 次（<code v-pre>N</code> 是非常大的数，如 <code v-pre>N = 1000000</code>），并展示 <code v-pre>N</code> 的值和函数执行的平均时间，单位为 ns（纳秒，ns/op）。如果是用 <code v-pre>testing.Benchmark()</code> 调用这些函数，直接运行程序即可。</p>
<p>具体可以参见 <RouteLink to="/chapter-3/14.16.html">14.16 节</RouteLink> 中用 goroutines 运行基准测试的例子以及练习 13.4：<a href="exercises/chapter_13/string_reverse_test.go">string_reverse_test.go</a></p>
<h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-3/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-3/13.6.html">启动外部命令和程序</RouteLink></li>
<li>下一节：<RouteLink to="/chapter-3/13.8.html">测试的具体例子</RouteLink></li>
</ul>
</div></template>


