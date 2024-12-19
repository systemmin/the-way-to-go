<template><div><h1 id="_9-7-使用-go-install-安装自定义包" tabindex="-1"><a class="header-anchor" href="#_9-7-使用-go-install-安装自定义包"><span>9.7 使用 go install 安装自定义包</span></a></h1>
<p>go install 是 Go 中自动包安装工具：如需要将包安装到本地它会从远端仓库下载包：检出、编译和安装一气呵成。</p>
<p>在包安装前的先决条件是要自动处理包自身依赖关系的安装。被依赖的包也会安装到子目录下，但是没有文档和示例：可以到网上浏览。</p>
<p>go install 使用了 GOPATH 变量（详见<RouteLink to="/chapter-2/02.2.html">第 2.2 节</RouteLink>）。</p>
<p>远端包（详见<RouteLink to="/chapter-2/09.5.html">第 9.5 节</RouteLink>）：</p>
<p>假设我们要安装一个有趣的包 <code v-pre>tideland</code>（它包含了许多帮助示例，参见<a href="http://code.google.com/p/tideland-cgl" target="_blank" rel="noopener noreferrer">项目主页</a>）。</p>
<p>因为我们需要创建目录在 Go 安装目录下，所以我们需要使用 root 或者 su 的身份执行命令。</p>
<p>确保 Go 环境变量已经设置在 root 用户下的 <code v-pre>./bashrc</code> 文件中。</p>
<p>使用命令安装：<code v-pre>go install tideland-cgl.googlecode.com/hg</code>。</p>
<p>可执行文件 <code v-pre>hg.a</code> 将被放到 <code v-pre>$GOROOT/pkg/linux_amd64/tideland-cgl.googlecode.com</code> 目录下，源码文件被放置在 <code v-pre>$GOROOT/src/tideland-cgl.googlecode.com/hg</code> 目录下，同样有个 <code v-pre>hg.a</code> 放置在 <code v-pre>_obj</code> 的子目录下。</p>
<p>现在就可以在 go 代码中使用这个包中的功能了，例如使用包名 cgl 导入：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">import</span> cgl <span class="token string">"tideland-cgl.googlecode.com/hg"</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>从 Go1 起 go install 安装 Google Code 的导入路径形式是：<code v-pre>&quot;code.google.com/p/tideland-cgl&quot;</code></p>
<p>升级到新的版本：</p>
<p>更新到新版本的 Go 之后本地安装包的二进制文件将全被删除。如果你想更新，重编译、重安装所有的 go 安装包可以使用：<code v-pre>go install -a</code>。</p>
<p>go 的版本发布的很频繁，所以需要注意发布版本和包的兼容性。go1 之后都是自己编译自己了。</p>
<p>go install 同样可以使用 go install 编译链接并安装本地自己的包（详见<RouteLink to="/chapter-2/09.8.html">第 9.8.2 节</RouteLink>）。</p>
<p>更多信息可以在 <a href="http://golang.org/cmd/go/" target="_blank" rel="noopener noreferrer">官方网站</a> 找到。</p>
</div></template>


