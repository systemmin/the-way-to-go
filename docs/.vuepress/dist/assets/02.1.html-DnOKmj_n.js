import{_ as i,c as g,a as p,b as o,f as n,d as t,e,r as d,o as u}from"./app-DtITwm2S.js";const a="/images/2.1.gc.jpg",m={};function G(f,l){const r=d("RouteLink"),s=d("center");return u(),g("div",null,[l[24]||(l[24]=p('<h1 id="_2-1-平台与架构" tabindex="-1"><a class="header-anchor" href="#_2-1-平台与架构"><span>2.1 平台与架构</span></a></h1><p>Go 语言开发团队开发了适用于以下操作系统的编译器：</p><ul><li>Linux</li><li>FreeBSD</li><li>Mac OS X（也称为 Darwin）</li></ul><p>目前有2个版本的编译器：Go 原生编译器 gc 和非原生编译器 gccgo，这两款编译器都是在类 Unix 系统下工作 。其中，gc 版本的编译器已经被移植到 Windows 平台上，并集成在主要发行版中，你也可以通过安装 MinGW 从而在 Windows 平台下使用 gcc 编译器。这两个编译器都是以单通道的形式工作。</p><p>你可以获取以下平台上的 Go 1.4 源码和二进制文件：</p><ul><li>Linux 2.6+：amd64、386 和 arm 架构</li><li>Mac OS X (Snow Leopard + Lion) ：amd64 和 386 架构</li><li>Windows 2000+：amd64 和 386 架构</li></ul>',6)),o("p",null,[l[1]||(l[1]=n("对于非常底层的纯 Go 语言代码或者包而言，在各个操作系统平台上的可移植性是非常强的，只需要将源码拷贝到相应平台上进行编译即可，或者可以使用交叉编译来构建目标平台的应用程序（")),t(r,{to:"/chapter-1/02.2.html"},{default:e(()=>l[0]||(l[0]=[n("第 2.2 节")])),_:1}),l[2]||(l[2]=n("）。但如果你打算使用 cgo 或者类似文件监控系统的软件，就需要根据实际情况进行相应地修改了。"))]),o("ol",null,[o("li",null,[l[4]||(l[4]=o("p",null,"Go 原生编译器 gc：",-1)),l[5]||(l[5]=o("p",null,"主要基于 Ken Thompson 先前在 Plan 9 操作系统上使用的 C 工具链。",-1)),l[6]||(l[6]=o("p",null,[n("Go 语言的编译器和链接器都是使用 C 语言编写并产生本地代码，Go 不存在自我引导之类的功能。因此如果使用一个有不同指令集的编译器来构建 Go 程序，就需要针对操作系统和处理器架构（32 位操作系统或 64 位操作系统）进行区别对待。（ "),o("strong",null,"译者注：Go从1.5版本开始已经实现自举。Go语言的编译器和链接器都是Go语言编写的"),n("）")],-1)),l[7]||(l[7]=o("p",null,"这款编译器使用非分代、无压缩和并行的方式进行编译，它的编译速度要比 gccgo 更快，产生更好的本地代码，但编译后的程序不能够使用 gcc 进行链接。",-1)),l[8]||(l[8]=o("p",null,"编译器目前支持以下基于 Intel 或 AMD 处理器架构的程序构建。",-1)),l[9]||(l[9]=o("p",null,[o("img",{src:a,alt:""})],-1)),t(s,null,{default:e(()=>l[3]||(l[3]=[n("图2.1 gc 编译器支持的处理器架构")])),_:1}),l[10]||(l[10]=p(`<p>当你第一次看到这套命名系统的时候你会觉得很奇葩，不过这些命名都是来自于 Plan 9 项目。</p><pre><code> g = 编译器：将源代码编译为项目代码（程序文本）
 l = 链接器：将项目代码链接到可执行的二进制文件（机器代码）
</code></pre><p>（相关的 C 编译器名称为 6c、8c 和 5c，相关的汇编器名称为 6a、8a 和 5a）</p><p><strong>标记 (Flags)</strong> 是指可以通过命令行设置可选参数来影响编译器或链接器的构建过程或得到一个特殊的目标结果。</p><p>可用的编译器标记如下：</p><pre><code> flags:
 -I 针对包的目录搜索
 -d 打印声明信息
 -e 不限制错误打印的个数
 -f 打印栈结构
 -h 发生错误时进入恐慌（panic）状态
 -o 指定输出文件名 // 详见第3.4节
 -S 打印产生的汇编代码
 -V 打印编译器版本 // 详见第2.3节
 -u 禁止使用 unsafe 包中的代码
 -w 打印归类后的语法解析树
 -x 打印 lex tokens
</code></pre><p>从 Go 1.0.3 版本开始，不再使用 <code>8g</code>，<code>8l</code> 之类的指令进行程序的构建，取而代之的是统一的 <code>go build</code> 和 <code>go install</code> 等命令，而这些指令会自动调用相关的编译器或链接器。</p><p>如果你想获得更深层次的信息，你可以在目录 <a href="https://github.com/golang/go/tree/master/src/cmd" target="_blank" rel="noopener noreferrer"><code>$GOROOT/src/cmd</code></a> 下找到编译器和链接器的源代码。Go 语言本身是由 C 语言开发的，而不是 Go 语言（Go 1.5 开始自举）。词法分析程序是 GNU bison，语法分析程序是名为 <a href="https://github.com/golang/go/blob/master/src%2Fcmd%2Finternal%2Fgc%2Fgo.y" target="_blank" rel="noopener noreferrer"><code>$GOROOT/src/cmd/gc/go.y</code></a> 的 yacc 文件，它会在同一目录输出 <code>y.tab.{c,h}</code> 文件。如果你想知道更多有关构建过程的信息，你可以在 <a href="https://github.com/golang/go/blob/master/src/make.bash" target="_blank" rel="noopener noreferrer"><code>$GOROOT/src/make.bash</code></a> 中找到。</p><p>大部分的目录都包含了名为 <code>doc.go</code> 的文件，这个文件提供了更多详细的信息。</p>`,9))]),l[18]||(l[18]=o("li",null,[o("p",null,"gccgo 编译器："),o("p",null,"一款相对于 gc 而言更加传统的编译器，使用 GCC 作为后端。GCC 是一款非常流行的 GNU 编译器，它能够构建基于众多处理器架构的应用程序。编译速度相对 gc 较慢，但产生的本地代码运行要稍微快一点。它同时也提供一些与 C 语言之间的互操作性。"),o("p",null,"从 Go 1 版本开始，gc 和 gccgo 在编译方面都有等价的功能。")],-1)),o("li",null,[l[14]||(l[14]=o("p",null,"文件扩展名与包 (package)：",-1)),l[15]||(l[15]=o("p",null,[n("Go 语言源文件的扩展名很显然就是 "),o("code",null,".go"),n("。")],-1)),l[16]||(l[16]=o("p",null,[n("C 文件使用后缀名 "),o("code",null,".c"),n("，汇编文件使用后缀名 "),o("code",null,".s"),n("。所有的源代码文件都是通过包 (packages) 来组织。包含可执行代码的包文件在被压缩后使用扩展名 "),o("code",null,".a"),n("（AR 文档）。")],-1)),o("p",null,[l[12]||(l[12]=n("Go 语言的标准库（")),t(r,{to:"/chapter-1/09.1.html"},{default:e(()=>l[11]||(l[11]=[n("第 9.1 节")])),_:1}),l[13]||(l[13]=n("）包文件在被安装后就是使用这种格式的文件。"))]),l[17]||(l[17]=o("p",null,[o("strong",null,"注意"),n(' 当你在创建目录时，文件夹名称永远不应该包含空格，而应该使用下划线 "_" 或者其它一般符号代替。')],-1))])]),l[25]||(l[25]=o("h2",{id:"链接",tabindex:"-1"},[o("a",{class:"header-anchor",href:"#链接"},[o("span",null,"链接")])],-1)),o("ul",null,[o("li",null,[t(r,{to:"/chapter-1/directory.html"},{default:e(()=>l[19]||(l[19]=[n("目录")])),_:1})]),o("li",null,[l[21]||(l[21]=n("上一章：")),t(r,{to:"/chapter-1/01.2.html"},{default:e(()=>l[20]||(l[20]=[n("语言的主要特性与发展的环境和影响因素")])),_:1})]),o("li",null,[l[23]||(l[23]=n("下一节：")),t(r,{to:"/chapter-1/02.2.html"},{default:e(()=>l[22]||(l[22]=[n("Go 环境变量")])),_:1})])])])}const c=i(m,[["render",G],["__file","02.1.html.vue"]]),k=JSON.parse('{"path":"/chapter-1/02.1.html","title":"2.1 平台与架构","lang":"zh-cn","frontmatter":{},"headers":[{"level":1,"title":"2.1 平台与架构","slug":"_2-1-平台与架构","link":"#_2-1-平台与架构","children":[{"level":2,"title":"链接","slug":"链接","link":"#链接","children":[]}]}],"git":{},"filePathRelative":"chapter-1/02.1.md"}');export{c as comp,k as data};
