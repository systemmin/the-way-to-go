<template><div><h1 id="_9-6-为自定义包使用-godoc" tabindex="-1"><a class="header-anchor" href="#_9-6-为自定义包使用-godoc"><span>9.6 为自定义包使用 godoc</span></a></h1>
<p>godoc 工具（<RouteLink to="/chapter-2/03.6.html">第 3.6 节</RouteLink>）在显示自定义包中的注释也有很好的效果：注释必须以 <code v-pre>//</code> 开始并无空行放在声明（包，类型，函数）前。godoc 会为每个文件生成一系列的网页。</p>
<p>例如：</p>
<ul>
<li>
<p>在 <a href="examples/chapter_9/doc_example">doc_examples</a> 目录下我们有<RouteLink to="/chapter-2/11.7.html">第 11.7 节</RouteLink>中的用来排序的 go 文件，文件中有一些注释（文件需要未编译）</p>
</li>
<li>
<p>命令行下进入目录下并输入命令：</p>
<p><code v-pre>godoc -http=:6060 -goroot=&quot;.&quot;</code></p>
</li>
</ul>
<p>（<code v-pre>.</code> 是指当前目录，<code v-pre>-goroot</code> 参数可以是 <code v-pre>/path/to/my/package1</code> 这样的形式指出 <code v-pre>package1</code> 在你源码中的位置或接受用冒号形式分隔的路径，无根目录的路径为相对于当前目录的相对路径）</p>
<ul>
<li>在浏览器打开地址：http://localhost:6060</li>
</ul>
<p>然后你会看到本地的 godoc 页面（详见<RouteLink to="/chapter-2/03.6.html">第 3.6 节</RouteLink>）从左到右一次显示出目录中的包：</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">doc_example:</span>
<span class="line"></span>
<span class="line">doc_example | Packages | Commands | Specification</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面是链接到源码和所有对象时有序概述（所以是很好的浏览和查找源代码的方式），连同文件/注释：</p>
<p><code v-pre>sort</code> 包</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> Float64sAreSorted</span>
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
<span class="line"><span class="token keyword">import</span> <span class="token string">"doc_example"</span> </span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用通用的接口排序:</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">func Float64sAreSorted[Top]</span>
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
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果你在一个团队中工作，并且源代码树被存储在网络硬盘上，就可以使用 godoc 给所有团队成员连续文档的支持。通过设置 <code v-pre>sync_minutes=n</code>，你甚至可以让它每 <code v-pre>n</code> 分钟自动更新您的文档！</p>
</div></template>


