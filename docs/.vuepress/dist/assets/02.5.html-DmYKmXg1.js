import{_ as l,c as d,a as i,b as r,d as n,e as a,f as o,r as p,o as s}from"./app-DtITwm2S.js";const c={};function h(f,e){const t=p("RouteLink");return s(),d("div",null,[e[5]||(e[5]=i('<h1 id="_2-5-在-windows-上安装-go" tabindex="-1"><a class="header-anchor" href="#_2-5-在-windows-上安装-go"><span>2.5 在 Windows 上安装 Go</span></a></h1><p>你可以在 <a href="http://golang.org/dl/" target="_blank" rel="noopener noreferrer">下载页面</a> 页面下载到 Windows 系统下的一键安装包。</p><p>前期的 Windows 移植工作由 Hector Chu 完成，但目前的发行版已经由 Joe Poirier 全职维护。</p><p>在完成安装包的安装之后，你只需要配置 <code>$GOPATH</code> 这一个环境变量就可以开始使用 Go 语言进行开发了，其它的环境变量安装包均会进行自动设置。在默认情况下，Go 将会被安装在目录 <code>c:\\go</code> 下，但如果你在安装过程中修改安装目录，则可能需要手动修改所有的环境变量的值。</p><p>如果你想要测试安装，则可以使用指令 <code>go run</code> 运行 <a href="examples/chapter_2/hello_world1.go">hello_world1.go</a>。</p><p>如果发生错误 <code>fatal error: can’t find import: fmt</code> 则说明你的环境变量没有配置正确。</p><p>如果你想要在 Windows 下使用 cgo （调用 C 语言写的代码），则需要安装 <a href="http://sourceforge.net/projects/mingw/files/Automated%20MinGW%20Installer/" target="_blank" rel="noopener noreferrer">MinGW</a>，一般推荐安装 <a href="http://tdm-gcc.tdragon.net/" target="_blank" rel="noopener noreferrer">TDM-GCC</a>。如果你使用的是 64 位操作系统，请务必安装 64 位版本的 MinGW。安装完成进行环境变量等相关配置即可使用。</p><p><strong>在 Windows 下运行在虚拟机里的 Linux 系统上安装 Go</strong>：</p><p>如果你想要在 Windows 下的虚拟机里的 Linux 系统上安装 Go，你可以选择使用虚拟机软件 <a href="http://www.vmware.com" target="_blank" rel="noopener noreferrer">VMware</a>，下载 <a href="http://www.vmware.com/products/player/" target="_blank" rel="noopener noreferrer">VMware player</a>，搜索并下载一个你喜欢的 Linux 发行版镜像，然后安装到虚拟机里，安装 Go 的流程参考第 2.3 节中的内容。</p><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>',10)),r("ul",null,[r("li",null,[n(t,{to:"/chapter-1/directory.html"},{default:a(()=>e[0]||(e[0]=[o("目录")])),_:1})]),r("li",null,[e[2]||(e[2]=o("上一节：")),n(t,{to:"/chapter-1/02.4.html"},{default:a(()=>e[1]||(e[1]=[o("在 Mac OS X 上安装 Go")])),_:1})]),r("li",null,[e[4]||(e[4]=o("下一节：")),n(t,{to:"/chapter-1/02.6.html"},{default:a(()=>e[3]||(e[3]=[o("安装目录清单")])),_:1})])])])}const g=l(c,[["render",h],["__file","02.5.html.vue"]]),m=JSON.parse('{"path":"/chapter-1/02.5.html","title":"2.5 在 Windows 上安装 Go","lang":"zh-cn","frontmatter":{},"headers":[{"level":1,"title":"2.5 在 Windows 上安装 Go","slug":"_2-5-在-windows-上安装-go","link":"#_2-5-在-windows-上安装-go","children":[{"level":2,"title":"链接","slug":"链接","link":"#链接","children":[]}]}],"git":{},"filePathRelative":"chapter-1/02.5.md"}');export{g as comp,m as data};