import{_ as s,c as a,b as o,f as t,d as n,e as d,a as r,r as i,o as g}from"./app-DtITwm2S.js";const p={};function u(m,l){const e=i("RouteLink");return g(),a("div",null,[l[14]||(l[14]=o("h1",{id:"_9-7-使用-go-install-安装自定义包",tabindex:"-1"},[o("a",{class:"header-anchor",href:"#_9-7-使用-go-install-安装自定义包"},[o("span",null,"9.7 使用 go install 安装自定义包")])],-1)),l[15]||(l[15]=o("p",null,"go install 是 Go 中自动包安装工具：如需要将包安装到本地它会从远端仓库下载包：检出、编译和安装一气呵成。",-1)),l[16]||(l[16]=o("p",null,"在包安装前的先决条件是要自动处理包自身依赖关系的安装。被依赖的包也会安装到子目录下，但是没有文档和示例：可以到网上浏览。",-1)),o("p",null,[l[1]||(l[1]=t("go install 使用了 GOPATH 变量（详见")),n(e,{to:"/chapter-2/02.2.html"},{default:d(()=>l[0]||(l[0]=[t("第 2.2 节")])),_:1}),l[2]||(l[2]=t("）。"))]),o("p",null,[l[4]||(l[4]=t("远端包（详见")),n(e,{to:"/chapter-2/09.5.html"},{default:d(()=>l[3]||(l[3]=[t("第 9.5 节")])),_:1}),l[5]||(l[5]=t("）："))]),l[17]||(l[17]=r(`<p>假设我们要安装一个有趣的包 <code>tideland</code>（它包含了许多帮助示例，参见<a href="http://code.google.com/p/tideland-cgl" target="_blank" rel="noopener noreferrer">项目主页</a>）。</p><p>因为我们需要创建目录在 Go 安装目录下，所以我们需要使用 root 或者 su 的身份执行命令。</p><p>确保 Go 环境变量已经设置在 root 用户下的 <code>./bashrc</code> 文件中。</p><p>使用命令安装：<code>go install tideland-cgl.googlecode.com/hg</code>。</p><p>可执行文件 <code>hg.a</code> 将被放到 <code>$GOROOT/pkg/linux_amd64/tideland-cgl.googlecode.com</code> 目录下，源码文件被放置在 <code>$GOROOT/src/tideland-cgl.googlecode.com/hg</code> 目录下，同样有个 <code>hg.a</code> 放置在 <code>_obj</code> 的子目录下。</p><p>现在就可以在 go 代码中使用这个包中的功能了，例如使用包名 cgl 导入：</p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line"><span class="token keyword">import</span> cgl <span class="token string">&quot;tideland-cgl.googlecode.com/hg&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>从 Go1 起 go install 安装 Google Code 的导入路径形式是：<code>&quot;code.google.com/p/tideland-cgl&quot;</code></p><p>升级到新的版本：</p><p>更新到新版本的 Go 之后本地安装包的二进制文件将全被删除。如果你想更新，重编译、重安装所有的 go 安装包可以使用：<code>go install -a</code>。</p><p>go 的版本发布的很频繁，所以需要注意发布版本和包的兼容性。go1 之后都是自己编译自己了。</p>`,11)),o("p",null,[l[7]||(l[7]=t("go install 同样可以使用 go install 编译链接并安装本地自己的包（详见")),n(e,{to:"/chapter-2/09.8.html"},{default:d(()=>l[6]||(l[6]=[t("第 9.8.2 节")])),_:1}),l[8]||(l[8]=t("）。"))]),l[18]||(l[18]=o("p",null,[t("更多信息可以在 "),o("a",{href:"http://golang.org/cmd/go/",target:"_blank",rel:"noopener noreferrer"},"官方网站"),t(" 找到。")],-1)),l[19]||(l[19]=o("h2",{id:"链接",tabindex:"-1"},[o("a",{class:"header-anchor",href:"#链接"},[o("span",null,"链接")])],-1)),o("ul",null,[o("li",null,[n(e,{to:"/chapter-2/directory.html"},{default:d(()=>l[9]||(l[9]=[t("目录")])),_:1})]),o("li",null,[l[11]||(l[11]=t("上一节：")),n(e,{to:"/chapter-2/09.6.html"},{default:d(()=>l[10]||(l[10]=[t("为自定义包使用 godoc")])),_:1})]),o("li",null,[l[13]||(l[13]=t("下一节：")),n(e,{to:"/chapter-2/09.8.html"},{default:d(()=>l[12]||(l[12]=[t("自定义包的目录结构、go install 和 go test")])),_:1})])])])}const c=s(p,[["render",u],["__file","09.7.html.vue"]]),k=JSON.parse('{"path":"/chapter-2/09.7.html","title":"9.7 使用 go install 安装自定义包","lang":"zh-cn","frontmatter":{},"headers":[{"level":1,"title":"9.7 使用 go install 安装自定义包","slug":"_9-7-使用-go-install-安装自定义包","link":"#_9-7-使用-go-install-安装自定义包","children":[{"level":2,"title":"链接","slug":"链接","link":"#链接","children":[]}]}],"git":{},"filePathRelative":"chapter-2/09.7.md"}');export{c as comp,k as data};
