<template><div><h1 id="_2-3-在-linux-上安装-go" tabindex="-1"><a class="header-anchor" href="#_2-3-在-linux-上安装-go"><span>2.3 在 Linux 上安装 Go</span></a></h1>
<p>如果你能够自己下载并编译 Go 的源代码的话,对你来说是非常有教育意义的，你可以根据这个页面找到安装指南和下载地址：<a href="http://golang.org/doc/install" target="_blank" rel="noopener noreferrer">Download the Go distribution</a>。</p>
<p>我们接下来也会带你一步步地完成安装过程。</p>
<ol>
<li>
<p>设置 Go 环境变量</p>
<p>我们在 Linux 系统下一般通过文件 <code v-pre>$HOME/.bashrc</code> 配置自定义环境变量，根据不同的发行版也可能是文件 <code v-pre>$HOME/.profile</code>，然后使用 gedit 或 vi 来编辑文件内容。</p>
<pre><code> export GOROOT=$HOME/go
</code></pre>
<p>为了确保相关文件在文件系统的任何地方都能被调用，你还需要添加以下内容：</p>
<pre><code> export PATH=$PATH:$GOROOT/bin
</code></pre>
<p>在开发 Go 项目时，你还需要一个环境变量来保存你的工作目录。</p>
<pre><code> export GOPATH=$HOME/Applications/Go
</code></pre>
<p><code v-pre>$GOPATH</code> 可以包含多个工作目录，取决于你的个人情况。如果你设置了多个工作目录，那么当你在之后使用 <code v-pre>go get</code>（远程包安装命令）时远程包将会被安装在第一个目录下。</p>
<p>在完成这些设置后，你需要在终端输入指令 <code v-pre>source .bashrc</code> 以使这些环境变量生效。然后重启终端，输入 <code v-pre>go env</code> 和 <code v-pre>env</code> 来检查环境变量是否设置正确。</p>
</li>
<li>
<p>安装 C 工具</p>
<p>Go 的工具链是用 C 语言编写的，因此在安装 Go 之前你需要先安装相关的 C 工具。如果你使用的是 Ubuntu 的话，你可以在终端输入以下指令（ <strong>译者注：由于网络环境的特殊性，你可能需要将每个工具分开安装</strong> ）。</p>
<pre><code> sudo apt-get install bison ed gawk gcc libc6-dev make
</code></pre>
<p>你可以在其它发行版上使用 RPM 之类的工具。</p>
</li>
<li>
<p>获取 Go 源代码</p>
<p>从 <a href="https://golang.org/dl/" target="_blank" rel="noopener noreferrer">官方页面</a> 或 <a href="http://www.golangtc.com/download" target="_blank" rel="noopener noreferrer">国内镜像</a> 下载 Go 的源码包到你的计算机上，然后将解压后的目录 <code v-pre>go</code> 通过命令移动到 <code v-pre>$GOROOT</code> 所指向的位置。</p>
<pre><code> wget https://storage.googleapis.com/golang/go&lt;VERSION&gt;.src.tar.gz
 tar -zxvf go&lt;VERSION&gt;.src.tar.gz
 sudo mv go $GOROOT
</code></pre>
</li>
<li>
<p>构建 Go</p>
<p>在终端使用以下指令来进行编译工作。</p>
<pre><code> cd $GOROOT/src
 ./all.bash
</code></pre>
<p><strong>编译注意事项</strong></p>
<p>编译时如果出现如下报错：</p>
<p><img src="/images/2.3.allbasherror.png" alt=""></p>
<p>可能是因为 <code v-pre>$GOROOT_BOOTSTRAP</code> 变量没有设置。这个目录在安装 Go 1.5 版本及之后的版本时需要设置。</p>
<p>由于在 1.4 版本后，Go 编译器实现了自举，即通过 1.4 版本来编译安装之后版本的编译器。如果不设置该环境变量的话，会产生这样一个错误 <code v-pre>Set $GOROOT_BOOTSTRAP to a working Go tree &gt;= Go 1.4.</code> 。</p>
<p>设置 <code v-pre>$GOROOT_BOOTSTRAP</code> 变量：</p>
<pre><code> export GOROOT_BOOTSTRAP=$HOME/go1.4
</code></pre>
<p>设置完成后，下载 1.4 版本的源码到该目录：</p>
<pre><code> git clone https://github.com/golang/go.git $HOME/go1.4
 git checkout -b release-branch.go1.4 origin/release-branch.go1.4
</code></pre>
<p>进入 1.4 的文件夹后，进行编译：</p>
<pre><code> cd $HOME/go1.4/src
 ./make.bash
</code></pre>
<p>1.4 编译安装好之后，进入 <code v-pre>$GOROOT</code> 文件夹，真正开始编译安装 Go：</p>
<pre><code> cd $HOME/go/src
 ./all.bash
</code></pre>
<p>在完成编译之后（通常在 1 分钟以内，如果你在 B 型树莓派上编译，一般需要 1 个小时），你会在终端看到如下信息被打印：</p>
<p><img src="/images/2.3.allbash.png" alt=""></p>
 <center>图 2.3 完成编译后在终端打印的信息</center>
<p><strong>注意事项</strong></p>
<p>在测试 <code v-pre>net/http</code> 包时有一个测试会尝试连接 <code v-pre>google.com</code>，你可能会看到如下所示的一个无厘头的错误报告：</p>
<pre><code> ‘make[2]: Leaving directory `/localusr/go/src/pkg/net’
</code></pre>
<p>如果你正在使用一个带有防火墙的机器，我建议你可以在编译过程中暂时关闭防火墙，以避免不必要的错误。</p>
<p>解决这个问题的另一个办法是通过设置环境变量 <code v-pre>$DISABLE_NET_TESTS</code> 来告诉构建工具忽略 <code v-pre>net/http</code> 包的相关测试：</p>
<pre><code> export DISABLE_NET_TESTS=1
</code></pre>
<p>如果你完全不想运行包的测试，你可以直接运行 <code v-pre>./make.bash</code> 来进行单纯的构建过程。</p>
</li>
<li>
<p>测试安装</p>
<p>使用你最喜爱的编辑器来输入以下内容，并保存为文件名 <code v-pre>hello_world1.go</code>。</p>
<p>示例 2.1 <a href="examples/chapter_2/hello_world1.go">hello_world1.go</a></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Hello"</span><span class="token punctuation">,</span> <span class="token string">"world"</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>切换相关目录到下，然后执行指令 <code v-pre>go run hello_world1.go</code>，将会打印信息：<code v-pre>Hello, world</code>。</p>
</li>
<li>
<p>验证安装版本</p>
<p>你可以通过在终端输入指令 <code v-pre>go version</code> 来打印 Go 的版本信息。</p>
<p>如果你想要通过 Go 代码在运行时检测版本，可以通过以下例子实现。</p>
<p>示例 2.2 <a href="examples/chapter_2/version.go">version.go</a></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"fmt"</span></span>
<span class="line">	<span class="token string">"runtime"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%s"</span><span class="token punctuation">,</span> runtime<span class="token punctuation">.</span><span class="token function">Version</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码将会输出 <code v-pre>go1.4.2</code> 或类似字符串。</p>
</li>
<li>
<p>更新版本</p>
<p>你可以在 <a href="http://golang.org/doc/devel/release.html" target="_blank" rel="noopener noreferrer">发布历史</a> 页面查看到最新的稳定版。</p>
<p>当前最新的稳定版 Go 1 系列于 2012 年 3 月 28 日发布。</p>
<p>Go 的源代码有以下三个分支：</p>
<pre><code> - Go release：最新稳定版，实际开发最佳选择
 - Go weekly：包含最近更新的版本，一般每周更新一次
 - Go tip：永远保持最新的版本，相当于内测版
</code></pre>
<p>当你在使用不同的版本时，注意官方博客发布的信息，因为你所查阅的文档可能和你正在使用的版本不相符。</p>
</li>
</ol>
<h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-1/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-1/02.2.html">Go 环境变量</RouteLink></li>
<li>下一节：<RouteLink to="/chapter-1/02.4.html">在 Mac OS X 上安装 Go</RouteLink></li>
</ul>
</div></template>


