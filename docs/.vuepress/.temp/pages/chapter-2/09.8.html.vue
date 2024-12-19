<template><div><h1 id="_9-8-自定义包的目录结构、go-install-和-go-test" tabindex="-1"><a class="header-anchor" href="#_9-8-自定义包的目录结构、go-install-和-go-test"><span>9.8 自定义包的目录结构、go install 和 go test</span></a></h1>
<p>为了示范，我们创建了一个名为 <code v-pre>uc</code> 的简单包，它含有一个 <code v-pre>UpperCase</code> 函数将字符串的所有字母转换为大写。当然这并不值得创建一个自定义包，同样的功能已被包含在 <code v-pre>strings</code> 包里，但是同样的技巧也可以应用在更复杂的包中。</p>
<h2 id="_9-8-1-自定义包的目录结构" tabindex="-1"><a class="header-anchor" href="#_9-8-1-自定义包的目录结构"><span>9.8.1 自定义包的目录结构</span></a></h2>
<p>下面的结构给了你一个好的示范（<code v-pre>uc</code> 代表通用包名, 名字为粗体的代表目录，斜体代表可执行文件）:</p>
<pre><code>/home/user/goprograms
	ucmain.go	(uc 包主程序)
	Makefile (ucmain 的 makefile)
	ucmain
	src/uc	 (包含 uc 包的 go 源码)
		uc.go
	 	uc_test.go
	 	Makefile (包的 makefile)
	 	uc.a
	 	_obj
			uc.a
		_test
			uc.a
	bin		(包含最终的执行文件)
		ucmain
	pkg/linux_amd64
		uc.a	(包的目标文件)
</code></pre>
<p>将你的项目放在 goprograms 目录下(你可以创建一个环境变量 <code v-pre>GOPATH</code>，详见第 <RouteLink to="/chapter-2/02.2.html">2.2</RouteLink>/<RouteLink to="/chapter-2/02.3.html">3</RouteLink> 章节：在 <code v-pre>.profile</code> 和 <code v-pre>.bashrc</code> 文件中添加 <code v-pre>export GOPATH=/home/user/goprograms</code>)，而你的项目将作为 <code v-pre>src</code> 的子目录。<code v-pre>uc</code> 包中的功能在 uc.go 中实现。</p>
<p>示例 9.6 <a href="examples/chapter_9/uc.go">uc.go</a>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> uc</span>
<span class="line"><span class="token keyword">import</span> <span class="token string">"strings"</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">UpperCase</span><span class="token punctuation">(</span>str <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">return</span> strings<span class="token punctuation">.</span><span class="token function">ToUpper</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>包通常附带一个或多个测试文件，在这我们创建了一个 uc_test.go 文件，如<RouteLink to="/chapter-2/09.8.html">第 9.8 节</RouteLink>所述。</p>
<p>示例 9.7 <a href="examples/chapter_9/test.go">test.go</a></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> uc</span>
<span class="line"><span class="token keyword">import</span> <span class="token string">"testing"</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">type</span> ucTest <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">	in<span class="token punctuation">,</span> out <span class="token builtin">string</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">var</span> ucTests <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>ucTest <span class="token punctuation">{</span></span>
<span class="line">	ucTest<span class="token punctuation">{</span><span class="token string">"abc"</span><span class="token punctuation">,</span> <span class="token string">"ABC"</span><span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">	ucTest<span class="token punctuation">{</span><span class="token string">"cvo-az"</span><span class="token punctuation">,</span> <span class="token string">"CVO-AZ"</span><span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">	ucTest<span class="token punctuation">{</span><span class="token string">"Antwerp"</span><span class="token punctuation">,</span> <span class="token string">"ANTWERP"</span><span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">TestUC</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> ut <span class="token operator">:=</span> <span class="token keyword">range</span> ucTests <span class="token punctuation">{</span></span>
<span class="line">		uc <span class="token operator">:=</span> <span class="token function">UpperCase</span><span class="token punctuation">(</span>ut<span class="token punctuation">.</span>in<span class="token punctuation">)</span></span>
<span class="line">		<span class="token keyword">if</span> uc <span class="token operator">!=</span> ut<span class="token punctuation">.</span>out <span class="token punctuation">{</span></span>
<span class="line">			t<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"UpperCase(%s) = %s, must be %s"</span><span class="token punctuation">,</span> ut<span class="token punctuation">.</span>in<span class="token punctuation">,</span> uc<span class="token punctuation">,</span></span>
<span class="line">			ut<span class="token punctuation">.</span>out<span class="token punctuation">)</span></span>
<span class="line">		<span class="token punctuation">}</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过指令编译并安装包到本地：<code v-pre>go install uc</code>, 这会将 uc.a 复制到 pkg/linux_amd64 下面。</p>
<p>另外，使用 make ，通过以下内容创建一个包的 Makefile 在 src/uc 目录下:</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">include $(GOROOT)/src/Make.inc</span>
<span class="line"></span>
<span class="line">TARG=uc</span>
<span class="line">GOFILES=\</span>
<span class="line">		uc.go\</span>
<span class="line"></span>
<span class="line">include $(GOROOT)/src/Make.pkg</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在该目录下的命令行调用: gomake</p>
<p>这将创建一个 _obj 目录并将包编译生成的存档 uc.a 放在该目录下。</p>
<p>这个包可以通过 go test 测试。</p>
<p>创建一个 uc.a 的测试文件在目录下，输出为 <code v-pre>PASS</code> 时测试通过。</p>
<p>在<RouteLink to="/chapter-2/13.8.html">第 13.8 节</RouteLink>我们将给出另外一个测试例子并进行深入研究。</p>
<p>备注：有可能你当前的用户不具有足够的资格使用 go install（没有权限）。这种情况下，选择 root 用户 su。确保 Go 环境变量和 Go 源码路径也设置给 su，同样也适用你的普通用户（详见<RouteLink to="/chapter-2/02.3.html">第 2.3 节</RouteLink>）。</p>
<p>接下来我们创建主程序 ucmain.go:</p>
<p>示例 9.8 <a href="/examples/chapter_9/ucmain.go">ucmain.go</a>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"./src/uc"</span></span>
<span class="line">	<span class="token string">"fmt"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	str1 <span class="token operator">:=</span> <span class="token string">"USING package uc!"</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>uc<span class="token punctuation">.</span><span class="token function">UpperCase</span><span class="token punctuation">(</span>str1<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后在这个目录下输入 <code v-pre>go install</code>。</p>
<p>另外复制 uc.a 到 /home/user/goprograms 目录并创建一个 Makefile 并写入文本：</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">include $(GOROOT)/src/Make.inc</span>
<span class="line">TARG=ucmain</span>
<span class="line">GOFILES=\</span>
<span class="line">	ucmain.go\</span>
<span class="line"></span>
<span class="line">include $(GOROOT)/src/Make.cmd</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行 gomake 编译 <code v-pre>ucmain.go</code> 生成可执行文件 ucmain</p>
<p>运行 <code v-pre>./ucmain</code> 显示: <code v-pre>USING PACKAGE UC!</code>。</p>
<h2 id="_9-8-2-本地安装包" tabindex="-1"><a class="header-anchor" href="#_9-8-2-本地安装包"><span>9.8.2 本地安装包</span></a></h2>
<p>本地包在用户目录下，使用给出的目录结构，以下命令用来从源码安装本地包：</p>
<pre><code>go install /home/user/goprograms/src/uc # 编译安装 uc
cd /home/user/goprograms/uc
go install ./uc 	# 编译安装 uc（和之前的指令一样）
cd ..
go install .	# 编译安装 ucmain
</code></pre>
<p>安装到 <code v-pre>$GOPATH</code> 下：</p>
<p>如果我们想安装的包在系统上的其他 Go 程序中被使用，它一定要安装到 <code v-pre>$GOPATH</code> 下。
这样做，在 .profile 和 .bashrc 中设置 <code v-pre>export GOPATH=/home/user/goprograms</code>。</p>
<p>然后执行 <code v-pre>go install uc</code> 将会复制包存档到 <code v-pre>$GOPATH/pkg/LINUX_AMD64/uc</code>。</p>
<p>现在，uc 包可以通过 <code v-pre>import &quot;uc&quot;</code> 在任何 Go 程序中被引用。</p>
<h2 id="_9-8-3-依赖系统的代码" tabindex="-1"><a class="header-anchor" href="#_9-8-3-依赖系统的代码"><span>9.8.3 依赖系统的代码</span></a></h2>
<p>在不同的操作系统上运行的程序以不同的代码实现是非常少见的：绝大多数情况下语言和标准库解决了大部分的可移植性问题。</p>
<p>你有一个很好的理由去写平台特定的代码，例如汇编语言。这种情况下，按照下面的约定是合理的：</p>
<pre><code>prog1.go
prog1_linux.go
prog1_darwin.go
prog1_windows.go
</code></pre>
<p>prog1.go 定义了不同操作系统通用的接口，并将系统特定的代码写到 prog1_os.go 中。
对于 Go 工具你可以指定 <code v-pre>prog1_$GOOS.go</code> 或 <code v-pre>prog1_$GOARCH.go</code>
或在平台 Makefile 中：<code v-pre>prog1_$(GOOS).go\</code> 或 <code v-pre>prog1_$(GOARCH).go\</code>。</p>
</div></template>


