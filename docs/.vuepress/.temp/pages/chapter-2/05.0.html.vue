<template><div><h1 id="_5-0-控制结构" tabindex="-1"><a class="header-anchor" href="#_5-0-控制结构"><span>5.0 控制结构</span></a></h1>
<p>到目前为止，我们看到的 Go 程序都是从 <code v-pre>main()</code> 函数开始执行，然后按顺序执行该函数体中的代码。但我们经常会需要只有在满足一些特定情况时才执行某些代码，也就是说在代码里进行条件判断。针对这种需求，Go 提供了下面这些条件结构和分支结构：</p>
<ul>
<li><code v-pre>if</code>-<code v-pre>else</code> 结构</li>
<li><code v-pre>switch</code> 结构</li>
<li><code v-pre>select</code> 结构，用于 channel 的选择（<RouteLink to="/chapter-2/14.4.html">第 14.4 节</RouteLink>）</li>
</ul>
<p>可以使用迭代或循环结构来重复执行一次或多次某段代码（任务）：</p>
<ul>
<li><code v-pre>for</code> (<code v-pre>range</code>) 结构</li>
</ul>
<p>一些如 <code v-pre>break</code> 和 <code v-pre>continue</code> 这样的关键字可以用于中途改变循环的状态。</p>
<p>此外，你还可以使用 <code v-pre>return</code> 来结束某个函数的执行，或使用 <code v-pre>goto</code> 和标签来调整程序的执行位置。</p>
<p>Go 完全省略了 <code v-pre>if</code>、<code v-pre>switch</code> 和 <code v-pre>for</code> 结构中条件语句两侧的括号，相比 Java、C++ 和 C# 中减少了很多视觉混乱的因素，同时也使你的代码更加简洁。</p>
</div></template>


