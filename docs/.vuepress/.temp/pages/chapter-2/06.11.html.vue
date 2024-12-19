<template><div><h1 id="_6-11-计算函数执行时间" tabindex="-1"><a class="header-anchor" href="#_6-11-计算函数执行时间"><span>6.11 计算函数执行时间</span></a></h1>
<p>有时候，能够知道一个计算执行消耗的时间是非常有意义的，尤其是在对比和基准测试中。最简单的一个办法就是在计算开始之前设置一个起始时间，再记录计算结束时的结束时间，最后计算它们的差值，就是这个计算所消耗的时间。想要实现这样的做法，可以使用 <code v-pre>time</code> 包中的 <code v-pre>Now()</code> 和 <code v-pre>Sub()</code> 函数：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">start <span class="token operator">:=</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token function">longCalculation</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">end <span class="token operator">:=</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">delta <span class="token operator">:=</span> end<span class="token punctuation">.</span><span class="token function">Sub</span><span class="token punctuation">(</span>start<span class="token punctuation">)</span></span>
<span class="line">fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"longCalculation took this amount of time: %s\n"</span><span class="token punctuation">,</span> delta<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>您可以查看示例 6.20 <a href="examples/chapter_6/fibonacci.go">fibonacci.go</a> 作为实例学习。</p>
<p>如果您对一段代码进行了所谓的优化，请务必对它们之间的效率进行对比再做出最后的判断。在接下来的章节中，我们会学习如何进行有价值的优化操作。</p>
</div></template>


