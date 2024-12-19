<template><div><h1 id="_18-11-出于性能考虑的最佳实践和建议" tabindex="-1"><a class="header-anchor" href="#_18-11-出于性能考虑的最佳实践和建议"><span>18.11 出于性能考虑的最佳实践和建议</span></a></h1>
<p>（1）尽可能的使用 <code v-pre>:=</code> 去初始化声明一个变量（在函数内部）；</p>
<p>（2）尽可能的使用字符代替字符串；</p>
<p>（3）尽可能的使用切片代替数组；</p>
<p>（4）尽可能的使用数组和切片代替映射（详见参考文献 15）；</p>
<p>（5）如果只想获取切片中某项值，不需要值的索引，尽可能的使用 <code v-pre>for range</code> 去遍历切片，这比必须查询切片中的每个元素要快一些；</p>
<p>（6）当数组元素是稀疏的（例如有很多 <code v-pre>0</code> 值或者空值 <code v-pre>nil</code>），使用映射会降低内存消耗；</p>
<p>（7）初始化映射时指定其容量；</p>
<p>（8）当定义一个方法时，使用指针类型作为方法的接受者；</p>
<p>（9）在代码中使用常量或者标志提取常量的值；</p>
<p>（10）尽可能在需要分配大量内存时使用缓存；</p>
<p>（11）使用缓存模板（参考<RouteLink to="/chapter-4/15.7.html">章节 15.7</RouteLink>）。</p>
<h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-4/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-4/18.10.html">其他</RouteLink></li>
<li>下一章：<RouteLink to="/chapter-4/19.0.html">构建一个完整的应用程序</RouteLink></li>
</ul>
</div></template>


