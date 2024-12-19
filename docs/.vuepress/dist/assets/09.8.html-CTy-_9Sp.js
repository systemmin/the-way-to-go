import{_ as i,c as o,a as l,b as a,f as s,d as e,e as p,r as u,o as c}from"./app-DtITwm2S.js";const r={};function d(k,n){const t=u("RouteLink");return c(),o("div",null,[n[31]||(n[31]=l(`<h1 id="_9-8-自定义包的目录结构、go-install-和-go-test" tabindex="-1"><a class="header-anchor" href="#_9-8-自定义包的目录结构、go-install-和-go-test"><span>9.8 自定义包的目录结构、go install 和 go test</span></a></h1><p>为了示范，我们创建了一个名为 <code>uc</code> 的简单包，它含有一个 <code>UpperCase</code> 函数将字符串的所有字母转换为大写。当然这并不值得创建一个自定义包，同样的功能已被包含在 <code>strings</code> 包里，但是同样的技巧也可以应用在更复杂的包中。</p><h2 id="_9-8-1-自定义包的目录结构" tabindex="-1"><a class="header-anchor" href="#_9-8-1-自定义包的目录结构"><span>9.8.1 自定义包的目录结构</span></a></h2><p>下面的结构给了你一个好的示范（<code>uc</code> 代表通用包名, 名字为粗体的代表目录，斜体代表可执行文件）:</p><pre><code>/home/user/goprograms
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
</code></pre>`,5)),a("p",null,[n[2]||(n[2]=s("将你的项目放在 goprograms 目录下(你可以创建一个环境变量 ")),n[3]||(n[3]=a("code",null,"GOPATH",-1)),n[4]||(n[4]=s("，详见第 ")),e(t,{to:"/chapter-2/02.2.html"},{default:p(()=>n[0]||(n[0]=[s("2.2")])),_:1}),n[5]||(n[5]=s("/")),e(t,{to:"/chapter-2/02.3.html"},{default:p(()=>n[1]||(n[1]=[s("3")])),_:1}),n[6]||(n[6]=s(" 章节：在 ")),n[7]||(n[7]=a("code",null,".profile",-1)),n[8]||(n[8]=s(" 和 ")),n[9]||(n[9]=a("code",null,".bashrc",-1)),n[10]||(n[10]=s(" 文件中添加 ")),n[11]||(n[11]=a("code",null,"export GOPATH=/home/user/goprograms",-1)),n[12]||(n[12]=s(")，而你的项目将作为 ")),n[13]||(n[13]=a("code",null,"src",-1)),n[14]||(n[14]=s(" 的子目录。")),n[15]||(n[15]=a("code",null,"uc",-1)),n[16]||(n[16]=s(" 包中的功能在 uc.go 中实现。"))]),n[32]||(n[32]=l(`<p>示例 9.6 <a href="examples/chapter_9/uc.go">uc.go</a>：</p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line"><span class="token keyword">package</span> uc</span>
<span class="line"><span class="token keyword">import</span> <span class="token string">&quot;strings&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">UpperCase</span><span class="token punctuation">(</span>str <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">return</span> strings<span class="token punctuation">.</span><span class="token function">ToUpper</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2)),a("p",null,[n[18]||(n[18]=s("包通常附带一个或多个测试文件，在这我们创建了一个 uc_test.go 文件，如")),e(t,{to:"/chapter-2/09.8.html"},{default:p(()=>n[17]||(n[17]=[s("第 9.8 节")])),_:1}),n[19]||(n[19]=s("所述。"))]),n[33]||(n[33]=l(`<p>示例 9.7 <a href="examples/chapter_9/test.go">test.go</a></p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line"><span class="token keyword">package</span> uc</span>
<span class="line"><span class="token keyword">import</span> <span class="token string">&quot;testing&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">type</span> ucTest <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">	in<span class="token punctuation">,</span> out <span class="token builtin">string</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">var</span> ucTests <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>ucTest <span class="token punctuation">{</span></span>
<span class="line">	ucTest<span class="token punctuation">{</span><span class="token string">&quot;abc&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;ABC&quot;</span><span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">	ucTest<span class="token punctuation">{</span><span class="token string">&quot;cvo-az&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;CVO-AZ&quot;</span><span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">	ucTest<span class="token punctuation">{</span><span class="token string">&quot;Antwerp&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;ANTWERP&quot;</span><span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">TestUC</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> ut <span class="token operator">:=</span> <span class="token keyword">range</span> ucTests <span class="token punctuation">{</span></span>
<span class="line">		uc <span class="token operator">:=</span> <span class="token function">UpperCase</span><span class="token punctuation">(</span>ut<span class="token punctuation">.</span>in<span class="token punctuation">)</span></span>
<span class="line">		<span class="token keyword">if</span> uc <span class="token operator">!=</span> ut<span class="token punctuation">.</span>out <span class="token punctuation">{</span></span>
<span class="line">			t<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">&quot;UpperCase(%s) = %s, must be %s&quot;</span><span class="token punctuation">,</span> ut<span class="token punctuation">.</span>in<span class="token punctuation">,</span> uc<span class="token punctuation">,</span></span>
<span class="line">			ut<span class="token punctuation">.</span>out<span class="token punctuation">)</span></span>
<span class="line">		<span class="token punctuation">}</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过指令编译并安装包到本地：<code>go install uc</code>, 这会将 uc.a 复制到 pkg/linux_amd64 下面。</p><p>另外，使用 make ，通过以下内容创建一个包的 Makefile 在 src/uc 目录下:</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">include $(GOROOT)/src/Make.inc</span>
<span class="line"></span>
<span class="line">TARG=uc</span>
<span class="line">GOFILES=\\</span>
<span class="line">		uc.go\\</span>
<span class="line"></span>
<span class="line">include $(GOROOT)/src/Make.pkg</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在该目录下的命令行调用: gomake</p><p>这将创建一个 _obj 目录并将包编译生成的存档 uc.a 放在该目录下。</p><p>这个包可以通过 go test 测试。</p><p>创建一个 uc.a 的测试文件在目录下，输出为 <code>PASS</code> 时测试通过。</p>`,9)),a("p",null,[n[21]||(n[21]=s("在")),e(t,{to:"/chapter-2/13.8.html"},{default:p(()=>n[20]||(n[20]=[s("第 13.8 节")])),_:1}),n[22]||(n[22]=s("我们将给出另外一个测试例子并进行深入研究。"))]),a("p",null,[n[24]||(n[24]=s("备注：有可能你当前的用户不具有足够的资格使用 go install（没有权限）。这种情况下，选择 root 用户 su。确保 Go 环境变量和 Go 源码路径也设置给 su，同样也适用你的普通用户（详见")),e(t,{to:"/chapter-2/02.3.html"},{default:p(()=>n[23]||(n[23]=[s("第 2.3 节")])),_:1}),n[25]||(n[25]=s("）。"))]),n[34]||(n[34]=l(`<p>接下来我们创建主程序 ucmain.go:</p><p>示例 9.8 <a href="/examples/chapter_9/ucmain.go">ucmain.go</a>：</p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">&quot;./src/uc&quot;</span></span>
<span class="line">	<span class="token string">&quot;fmt&quot;</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	str1 <span class="token operator">:=</span> <span class="token string">&quot;USING package uc!&quot;</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>uc<span class="token punctuation">.</span><span class="token function">UpperCase</span><span class="token punctuation">(</span>str1<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后在这个目录下输入 <code>go install</code>。</p><p>另外复制 uc.a 到 /home/user/goprograms 目录并创建一个 Makefile 并写入文本：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">include $(GOROOT)/src/Make.inc</span>
<span class="line">TARG=ucmain</span>
<span class="line">GOFILES=\\</span>
<span class="line">	ucmain.go\\</span>
<span class="line"></span>
<span class="line">include $(GOROOT)/src/Make.cmd</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行 gomake 编译 <code>ucmain.go</code> 生成可执行文件 ucmain</p><p>运行 <code>./ucmain</code> 显示: <code>USING PACKAGE UC!</code>。</p><h2 id="_9-8-2-本地安装包" tabindex="-1"><a class="header-anchor" href="#_9-8-2-本地安装包"><span>9.8.2 本地安装包</span></a></h2><p>本地包在用户目录下，使用给出的目录结构，以下命令用来从源码安装本地包：</p><pre><code>go install /home/user/goprograms/src/uc # 编译安装 uc
cd /home/user/goprograms/uc
go install ./uc 	# 编译安装 uc（和之前的指令一样）
cd ..
go install .	# 编译安装 ucmain
</code></pre><p>安装到 <code>$GOPATH</code> 下：</p><p>如果我们想安装的包在系统上的其他 Go 程序中被使用，它一定要安装到 <code>$GOPATH</code> 下。 这样做，在 .profile 和 .bashrc 中设置 <code>export GOPATH=/home/user/goprograms</code>。</p><p>然后执行 <code>go install uc</code> 将会复制包存档到 <code>$GOPATH/pkg/LINUX_AMD64/uc</code>。</p><p>现在，uc 包可以通过 <code>import &quot;uc&quot;</code> 在任何 Go 程序中被引用。</p><h2 id="_9-8-3-依赖系统的代码" tabindex="-1"><a class="header-anchor" href="#_9-8-3-依赖系统的代码"><span>9.8.3 依赖系统的代码</span></a></h2><p>在不同的操作系统上运行的程序以不同的代码实现是非常少见的：绝大多数情况下语言和标准库解决了大部分的可移植性问题。</p><p>你有一个很好的理由去写平台特定的代码，例如汇编语言。这种情况下，按照下面的约定是合理的：</p><pre><code>prog1.go
prog1_linux.go
prog1_darwin.go
prog1_windows.go
</code></pre><p>prog1.go 定义了不同操作系统通用的接口，并将系统特定的代码写到 prog1_os.go 中。 对于 Go 工具你可以指定 <code>prog1_$GOOS.go</code> 或 <code>prog1_$GOARCH.go</code> 或在平台 Makefile 中：<code>prog1_$(GOOS).go\\</code> 或 <code>prog1_$(GOARCH).go\\</code>。</p><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>`,21)),a("ul",null,[a("li",null,[e(t,{to:"/chapter-2/directory.html"},{default:p(()=>n[26]||(n[26]=[s("目录")])),_:1})]),a("li",null,[n[28]||(n[28]=s("上一节：")),e(t,{to:"/chapter-2/09.7.html"},{default:p(()=>n[27]||(n[27]=[s("使用 go install 安装自定义包")])),_:1})]),a("li",null,[n[30]||(n[30]=s("下一节：")),e(t,{to:"/chapter-2/09.9.html"},{default:p(()=>n[29]||(n[29]=[s("通过 Git 打包和安装")])),_:1})])])])}const g=i(r,[["render",d],["__file","09.8.html.vue"]]),v=JSON.parse('{"path":"/chapter-2/09.8.html","title":"9.8 自定义包的目录结构、go install 和 go test","lang":"zh-cn","frontmatter":{},"headers":[{"level":1,"title":"9.8 自定义包的目录结构、go install 和 go test","slug":"_9-8-自定义包的目录结构、go-install-和-go-test","link":"#_9-8-自定义包的目录结构、go-install-和-go-test","children":[{"level":2,"title":"9.8.1 自定义包的目录结构","slug":"_9-8-1-自定义包的目录结构","link":"#_9-8-1-自定义包的目录结构","children":[]},{"level":2,"title":"9.8.2 本地安装包","slug":"_9-8-2-本地安装包","link":"#_9-8-2-本地安装包","children":[]},{"level":2,"title":"9.8.3 依赖系统的代码","slug":"_9-8-3-依赖系统的代码","link":"#_9-8-3-依赖系统的代码","children":[]},{"level":2,"title":"链接","slug":"链接","link":"#链接","children":[]}]}],"git":{},"filePathRelative":"chapter-2/09.8.md"}');export{g as comp,v as data};
