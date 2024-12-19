import{_ as p,c as t,b as s,f as a,d as e,e as i,a as d,r as o,o as r}from"./app-DtITwm2S.js";const c={};function u(v,n){const l=o("RouteLink");return r(),t("div",null,[n[19]||(n[19]=s("h1",{id:"_9-6-为自定义包使用-godoc",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#_9-6-为自定义包使用-godoc"},[s("span",null,"9.6 为自定义包使用 godoc")])],-1)),s("p",null,[n[1]||(n[1]=a("godoc 工具（")),e(l,{to:"/chapter-2/03.6.html"},{default:i(()=>n[0]||(n[0]=[a("第 3.6 节")])),_:1}),n[2]||(n[2]=a("）在显示自定义包中的注释也有很好的效果：注释必须以 ")),n[3]||(n[3]=s("code",null,"//",-1)),n[4]||(n[4]=a(" 开始并无空行放在声明（包，类型，函数）前。godoc 会为每个文件生成一系列的网页。"))]),n[20]||(n[20]=s("p",null,"例如：",-1)),s("ul",null,[s("li",null,[s("p",null,[n[6]||(n[6]=a("在 ")),n[7]||(n[7]=s("a",{href:"examples/chapter_9/doc_example"},"doc_examples",-1)),n[8]||(n[8]=a(" 目录下我们有")),e(l,{to:"/chapter-2/11.7.html"},{default:i(()=>n[5]||(n[5]=[a("第 11.7 节")])),_:1}),n[9]||(n[9]=a("中的用来排序的 go 文件，文件中有一些注释（文件需要未编译）"))])]),n[10]||(n[10]=s("li",null,[s("p",null,"命令行下进入目录下并输入命令："),s("p",null,[s("code",null,'godoc -http=:6060 -goroot="."')])],-1))]),n[21]||(n[21]=s("p",null,[a("（"),s("code",null,"."),a(" 是指当前目录，"),s("code",null,"-goroot"),a(" 参数可以是 "),s("code",null,"/path/to/my/package1"),a(" 这样的形式指出 "),s("code",null,"package1"),a(" 在你源码中的位置或接受用冒号形式分隔的路径，无根目录的路径为相对于当前目录的相对路径）")],-1)),n[22]||(n[22]=s("ul",null,[s("li",null,"在浏览器打开地址：http://localhost:6060")],-1)),s("p",null,[n[12]||(n[12]=a("然后你会看到本地的 godoc 页面（详见")),e(l,{to:"/chapter-2/03.6.html"},{default:i(()=>n[11]||(n[11]=[a("第 3.6 节")])),_:1}),n[13]||(n[13]=a("）从左到右一次显示出目录中的包："))]),n[23]||(n[23]=d(`<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">doc_example:</span>
<span class="line"></span>
<span class="line">doc_example | Packages | Commands | Specification</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面是链接到源码和所有对象时有序概述（所以是很好的浏览和查找源代码的方式），连同文件/注释：</p><p><code>sort</code> 包</p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line"><span class="token keyword">func</span> Float64sAreSorted</span>
<span class="line"></span>
<span class="line"><span class="token keyword">type</span> IntArray</span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> IntsAreSortedfunc IsSortedfunc Sort</span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>IntArray<span class="token punctuation">)</span> Len</span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> SortFloat64s</span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>IntArray<span class="token punctuation">)</span> Less</span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> SortInts</span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>IntArray<span class="token punctuation">)</span> Swap</span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> SortStrings <span class="token keyword">type</span> Interface</span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> StringsAreSorted <span class="token keyword">type</span> StringArray <span class="token keyword">type</span> Float64Array</span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>StringArray<span class="token punctuation">)</span> Len</span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>Float64Array<span class="token punctuation">)</span> Len</span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>StringArray<span class="token punctuation">)</span> Less</span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>Float64Array<span class="token punctuation">)</span> Less</span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>StringArray<span class="token punctuation">)</span> Swap</span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>Float64Array<span class="token punctuation">)</span> Swap</span>
<span class="line"></span>
<span class="line"><span class="token comment">// Other packages</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token string">&quot;doc_example&quot;</span> </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用通用的接口排序:</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">func Float64sAreSorted[Top]</span>
<span class="line">func Float64sAreSorted(a []float64) bool</span>
<span class="line"></span>
<span class="line">func IntsAreSorted[Top]</span>
<span class="line">func IntsAreSorted(a []int) bool</span>
<span class="line"></span>
<span class="line">func IsSorted[Top]</span>
<span class="line">func IsSorted(data Interface) bool</span>
<span class="line">Test if data is sorted</span>
<span class="line"></span>
<span class="line">func Sort[Top]</span>
<span class="line">func Sort(data Interface)</span>
<span class="line">General sort function</span>
<span class="line"></span>
<span class="line">func SortInts[Top]</span>
<span class="line">func SortInts(a []int)</span>
<span class="line"></span>
<span class="line">Convenience wrappers for common cases: type IntArray[Top]</span>
<span class="line">Convenience types for common cases: IntArray type IntArray []int  </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果你在一个团队中工作，并且源代码树被存储在网络硬盘上，就可以使用 godoc 给所有团队成员连续文档的支持。通过设置 <code>sync_minutes=n</code>，你甚至可以让它每 <code>n</code> 分钟自动更新您的文档！</p><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>`,8)),s("ul",null,[s("li",null,[e(l,{to:"/chapter-2/directory.html"},{default:i(()=>n[14]||(n[14]=[a("目录")])),_:1})]),s("li",null,[n[16]||(n[16]=a("上一节：")),e(l,{to:"/chapter-2/09.5.html"},{default:i(()=>n[15]||(n[15]=[a("自定义包和可见性")])),_:1})]),s("li",null,[n[18]||(n[18]=a("下一节：")),e(l,{to:"/chapter-2/09.7.html"},{default:i(()=>n[17]||(n[17]=[a("使用 go install 安装自定义包")])),_:1})])])])}const b=p(c,[["render",u],["__file","09.6.html.vue"]]),k=JSON.parse('{"path":"/chapter-2/09.6.html","title":"9.6 为自定义包使用 godoc","lang":"zh-cn","frontmatter":{},"headers":[{"level":1,"title":"9.6 为自定义包使用 godoc","slug":"_9-6-为自定义包使用-godoc","link":"#_9-6-为自定义包使用-godoc","children":[{"level":2,"title":"链接","slug":"链接","link":"#链接","children":[]}]}],"git":{},"filePathRelative":"chapter-2/09.6.md"}');export{b as comp,k as data};
