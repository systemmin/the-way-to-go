<template><div><h1 id="_6-5-内置函数" tabindex="-1"><a class="header-anchor" href="#_6-5-内置函数"><span>6.5 内置函数</span></a></h1>
<p>Go 语言拥有一些不需要进行导入操作就可以使用的内置函数。它们有时可以针对不同的类型进行操作，例如：<code v-pre>len()</code>、<code v-pre>cap()</code> 和 <code v-pre>append()</code>，或必须用于系统级的操作，例如：<code v-pre>panic()</code>。因此，它们需要直接获得编译器的支持。</p>
<p>以下是一个简单的列表，我们会在后面的章节中对它们进行逐个深入的讲解。</p>
<table>
<thead>
<tr>
<th>名称</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>close()</code></td>
<td>用于管道通信</td>
</tr>
<tr>
<td><code v-pre>len()</code>、<code v-pre>cap()</code></td>
<td><code v-pre>len()</code> 用于返回某个类型的长度或数量（字符串、数组、切片、<code v-pre>map</code> 和管道）；<code v-pre>cap()</code> 是容量的意思，用于返回某个类型的最大容量（只能用于数组、切片和管道，不能用于 <code v-pre>map</code>）</td>
</tr>
<tr>
<td><code v-pre>new()</code>、<code v-pre>make()</code></td>
<td><code v-pre>new()</code> 和 <code v-pre>make()</code> 均是用于分配内存：<code v-pre>new()</code> 用于值类型和用户定义的类型，如自定义结构，<code v-pre>make</code> 用于内置引用类型（切片、<code v-pre>map</code> 和管道）。它们的用法就像是函数，但是将类型作为参数：<code v-pre>new(type)</code>、<code v-pre>make(type)</code>。<code v-pre>new(T)</code> 分配类型 <code v-pre>T</code> 的零值并返回其地址，也就是指向类型 <code v-pre>T</code> 的指针（详见<RouteLink to="/chapter-2/10.1.html">第 10.1 节</RouteLink>）。它也可以被用于基本类型：<code v-pre>v := new(int)</code>。<code v-pre>make(T)</code> 返回类型 <code v-pre>T</code> 的初始化之后的值，因此它比 <code v-pre>new()</code> 进行更多的工作（详见<RouteLink to="/chapter-2/07.2.html">第 7.2.3/4 节</RouteLink>、<RouteLink to="/chapter-2/08.1.html">第 8.1.1 节</RouteLink>和<RouteLink to="/chapter-2/14.2.html">第 14.2.1 节</RouteLink>）。<strong><code v-pre>new()</code> 是一个函数，不要忘记它的括号</strong>。</td>
</tr>
<tr>
<td><code v-pre>copy()</code>、<code v-pre>append()</code></td>
<td>用于复制和连接切片</td>
</tr>
<tr>
<td><code v-pre>panic()</code>、<code v-pre>recover()</code></td>
<td>两者均用于错误处理机制</td>
</tr>
<tr>
<td><code v-pre>print()</code>、<code v-pre>println()</code></td>
<td>底层打印函数（详见<RouteLink to="/chapter-2/04.2.html">第 4.2 节</RouteLink>），在部署环境中建议使用 <code v-pre>fmt</code> 包</td>
</tr>
<tr>
<td><code v-pre>complex()</code>、<code v-pre>real ()</code>、<code v-pre>imag()</code></td>
<td>用于创建和操作复数（详见<RouteLink to="/chapter-2/04.5.html">第 4.5.2.2 节</RouteLink>）</td>
</tr>
</tbody>
</table>
</div></template>


