<template><div><h1 id="_2-2-go-环境变量" tabindex="-1"><a class="header-anchor" href="#_2-2-go-环境变量"><span>2.2 Go 环境变量</span></a></h1>
<p>Go 开发环境依赖于一些操作系统环境变量，你最好在安装 Go 之前就已经设置好他们。如果你使用的是 Windows 的话，你完全不用进行手动设置，Go 将被默认安装在目录 <code v-pre>c:/go</code> 下。这里列举几个最为重要的环境变量：</p>
<ul>
<li><strong>$GOROOT</strong> 表示 Go 在你的电脑上的安装位置，它的值一般都是 <code v-pre>$HOME/go</code>，当然，你也可以安装在别的地方。</li>
<li><strong>$GOARCH</strong> 表示目标机器的处理器架构，它的值可以是 386、amd64 或 arm。</li>
<li><strong>$GOOS</strong> 表示目标机器的操作系统，它的值可以是 darwin、freebsd、linux 或 windows。</li>
<li><strong>$GOBIN</strong> 表示编译器和链接器的安装位置，默认是 <code v-pre>$GOROOT/bin</code>，如果你使用的是 Go 1.0.3 及以后的版本，一般情况下你可以将它的值设置为空，Go 将会使用前面提到的默认值。</li>
</ul>
<p>目标机器是指你打算运行你的 Go 应用程序的机器。</p>
<p>Go 编译器支持交叉编译，也就是说你可以在一台机器上构建能够在不同操作系统和处理器架构上运行的应用程序，也就是说编写源代码的机器可以和目标机器有完全不同的特性（操作系统与处理器架构）。</p>
<p>为了区分本地机器和目标机器，你可以使用 <code v-pre>$GOHOSTOS</code> 和 <code v-pre>$GOHOSTARCH</code> 设置本地机器的操作系统名称和编译体系结构，这两个变量只有在进行交叉编译的时候才会用到，如果你不进行显示设置，他们的值会和本地机器（<code v-pre>$GOOS</code> 和 <code v-pre>$GOARCH</code>）一样。</p>
<ul>
<li><strong>$GOPATH</strong> 默认采用和 <code v-pre>$GOROOT</code> 一样的值，但从 Go 1.1 版本开始，你必须修改为其它路径。它可以包含多个 Go 语言源码文件、包文件和可执行文件的路径，而这些路径下又必须分别包含三个规定的目录：<code v-pre>src</code>、<code v-pre>pkg</code> 和 <code v-pre>bin</code>，这三个目录分别用于存放源码文件、包文件和可执行文件。</li>
<li><strong>$GOARM</strong> 专门针对基于 arm 架构的处理器，它的值可以是 5 或 6，默认为 6。</li>
<li><strong>$GOMAXPROCS</strong> 用于设置应用程序可使用的处理器个数与核数，详见 <RouteLink to="/chapter-1/14.1.html">第 14.1.3 节</RouteLink>。</li>
</ul>
<p>在接下来的章节中，我们将会讨论如何在 Linux、Mac OS X 和 Windows 上安装 Go 语言。在 FreeBSD 上的安装和 Linux 非常类似。开发团队正在尝试将 Go 语言移植到其它例如 OpenBSD、DragonFlyBSD、NetBSD、Plan 9、Haiku 和 Solaris 操作系统上，你可以在这个页面找到最近的动态：<a href="http://go-lang.cat-v.org/os-ports" target="_blank" rel="noopener noreferrer">Go Porting Efforts</a>。</p>
<h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-1/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-1/02.1.html">平台与架构</RouteLink></li>
<li>下一节：<RouteLink to="/chapter-1/02.3.html">在 Linux 上安装 Go</RouteLink></li>
</ul>
</div></template>


