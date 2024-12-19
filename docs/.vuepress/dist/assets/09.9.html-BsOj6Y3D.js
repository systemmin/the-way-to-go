import{_ as r,c as u,a,b as i,f as e,d as l,e as n,r as d,o as p}from"./app-DtITwm2S.js";const s={};function c(g,t){const o=d("RouteLink");return p(),u("div",null,[t[10]||(t[10]=a('<h1 id="_9-9-通过-git-打包和安装" tabindex="-1"><a class="header-anchor" href="#_9-9-通过-git-打包和安装"><span>9.9 通过 Git 打包和安装</span></a></h1><h2 id="_9-9-1-安装到-github" tabindex="-1"><a class="header-anchor" href="#_9-9-1-安装到-github"><span>9.9.1 安装到 GitHub</span></a></h2><p>以上的方式对于本地包来说是可以的，但是我们如何打包代码到开发者圈子呢？那么我们需要一个云端的源码的版本控制系统，比如著名的 Git。</p><p>在 Linux 和 OS X 的机器上 Git 是默认安装的，在 Windows 上你必须先自行安装，参见 <a href="http://help.github.com/win-set-up-git/" target="_blank" rel="noopener noreferrer">GitHub 帮助页面</a>。</p>',4)),i("p",null,[t[1]||(t[1]=e("这里将通过为")),l(o,{to:"/chapter-2/09.8.html"},{default:n(()=>t[0]||(t[0]=[e("第 9.8 节")])),_:1}),t[2]||(t[2]=e("中的 ")),t[3]||(t[3]=i("code",null,"uc",-1)),t[4]||(t[4]=e(" 包创建一个 git 仓库作为演示"))]),t[11]||(t[11]=a(`<p>进入到 <code>uc</code> 包目录下并创建一个 Git 仓库在里面: <code>git init</code>。</p><p>信息提示: <code>Initialized empty git repository in $PWD/uc</code>。</p><p>每一个 Git 项目都需要一个对包进行描述的 README.md 文件，所以需要打开你的文本编辑器（gedit、notepad 或 LiteIde）并添加一些说明进去。</p><ul><li>添加所有文件到仓库：<code>git add README.md uc.go uc_test.go Makefile</code>。</li><li>标记为第一个版本：<code>git commit -m &quot;initial rivision&quot;</code>。</li></ul><p>现在必须登录 <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub 网站</a>。</p><p>如果您还没有账号，可以去注册一个开源项目的免费帐号。输入正确的帐号密码和有效的邮箱地址并进一步创建用户。然后你将获得一个 Git 命令的列表。本地仓库的操作命令已经完成。一个优秀的系统在你遇到任何问题的时候将 <a href="http://help.github.com/" target="_blank" rel="noopener noreferrer">引导你</a>。</p><p>在云端创建一个新的 uc 仓库;发布的指令为（<code>NNNN</code> 替代用户名）:</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">git remote add origin git@github.com:NNNN/uc.git  </span>
<span class="line">git push -u origin master</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>操作完成后检查 GitHub 上的包页面: <code>http://github.com/NNNN/uc</code>。</p><h2 id="_9-9-2-从-github-安装" tabindex="-1"><a class="header-anchor" href="#_9-9-2-从-github-安装"><span>9.9.2 从 GitHub 安装</span></a></h2><p>如果有人想安装您的远端项目到本地机器，打开终端并执行（<code>NNNN</code> 是你在 GitHub 上的用户名）：<code>go get github.com/NNNN/uc</code>。</p><p>这样现在这台机器上的其他 Go 应用程序也可以通过导入路径：<code>&quot;github.com/NNNN/uc&quot;</code> 代替 <code>&quot;./uc/uc&quot;</code> 来使用。</p><p>也可以将其缩写为：<code>import uc &quot;github.com/NNNN/uc&quot;</code>。</p><p>然后修改 Makefile: 将 <code>TARG=uc</code> 替换为 <code>TARG=github.com/NNNN/uc</code>。</p><p>Gomake（和 go install）将通过 <code>$GOPATH</code> 下的本地版本进行工作。</p><p>网站和版本控制系统的其他的选择(括号中为网站所使用的版本控制系统)：</p><ul><li>BitBucket(hg/Git)</li><li>GitHub(Git)</li><li>Google Code(hg/Git/svn)</li><li>Launchpad(bzr)</li></ul><p>版本控制系统可以选择你熟悉的或者本地使用的代码版本控制。Go 核心代码的仓库是使用 Mercurial(hg) 来控制的，所以它是一个最可能保证你可以得到开发者项目中最好的软件。Git 也很出名，同样也适用。如果你从未使用过版本控制，这些网站有一些很好的帮助并且你可以通过在谷歌搜索 &quot;{name} tutorial&quot;（name为你想要使用的版本控制系统）得到许多很好的教程。</p><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>`,19)),i("ul",null,[i("li",null,[l(o,{to:"/chapter-2/directory.html"},{default:n(()=>t[5]||(t[5]=[e("目录")])),_:1})]),i("li",null,[t[7]||(t[7]=e("上一节：")),l(o,{to:"/chapter-2/09.8.html"},{default:n(()=>t[6]||(t[6]=[e("自定义包的目录结构、go install 和 go test")])),_:1})]),i("li",null,[t[9]||(t[9]=e("下一节：")),l(o,{to:"/chapter-2/09.10.html"},{default:n(()=>t[8]||(t[8]=[e("Go 的外部包和项目")])),_:1})])])])}const m=r(s,[["render",c],["__file","09.9.html.vue"]]),b=JSON.parse('{"path":"/chapter-2/09.9.html","title":"9.9 通过 Git 打包和安装","lang":"zh-cn","frontmatter":{},"headers":[{"level":1,"title":"9.9 通过 Git 打包和安装","slug":"_9-9-通过-git-打包和安装","link":"#_9-9-通过-git-打包和安装","children":[{"level":2,"title":"9.9.1 安装到 GitHub","slug":"_9-9-1-安装到-github","link":"#_9-9-1-安装到-github","children":[]},{"level":2,"title":"9.9.2 从 GitHub 安装","slug":"_9-9-2-从-github-安装","link":"#_9-9-2-从-github-安装","children":[]},{"level":2,"title":"链接","slug":"链接","link":"#链接","children":[]}]}],"git":{},"filePathRelative":"chapter-2/09.9.md"}');export{m as comp,b as data};