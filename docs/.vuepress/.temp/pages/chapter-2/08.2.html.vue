<template><div><h1 id="_8-2-测试键值对是否存在及删除元素" tabindex="-1"><a class="header-anchor" href="#_8-2-测试键值对是否存在及删除元素"><span>8.2 测试键值对是否存在及删除元素</span></a></h1>
<p>测试 <code v-pre>map1</code> 中是否存在 <code v-pre>key1</code>：</p>
<p>在例子 8.1 中，我们已经见过可以使用 <code v-pre>val1 = map1[key1]</code> 的方法获取 <code v-pre>key1</code> 对应的值 <code v-pre>val1</code>。如果 <code v-pre>map</code> 中不存在 <code v-pre>key1</code>，<code v-pre>val1</code> 就是一个值类型的空值。</p>
<p>这就会给我们带来困惑了：现在我们没法区分到底是 <code v-pre>key1</code> 不存在还是它对应的 <code v-pre>value</code> 就是空值。</p>
<p>为了解决这个问题，我们可以这么用：<code v-pre>val1, isPresent = map1[key1]</code></p>
<p><code v-pre>isPresent</code> 返回一个 <code v-pre>bool</code> 值：如果 <code v-pre>key1</code> 存在于 <code v-pre>map1</code>，<code v-pre>val1</code> 就是 <code v-pre>key1</code> 对应的 <code v-pre>value</code> 值，并且 <code v-pre>isPresent</code> 为 <code v-pre>true</code>；如果 <code v-pre>key1</code> 不存在，<code v-pre>val1</code> 就是一个空值，并且 <code v-pre>isPresent</code> 会返回 <code v-pre>false</code>。</p>
<p>如果你只是想判断某个 <code v-pre>key</code> 是否存在而不关心它对应的值到底是多少，你可以这么做：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token boolean">_</span><span class="token punctuation">,</span> ok <span class="token operator">:=</span> map1<span class="token punctuation">[</span>key1<span class="token punctuation">]</span> <span class="token comment">// 如果key1存在则ok == true，否则ok为false</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>或者和 <code v-pre>if</code> 混合使用：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> ok <span class="token operator">:=</span> map1<span class="token punctuation">[</span>key1<span class="token punctuation">]</span><span class="token punctuation">;</span> ok <span class="token punctuation">{</span></span>
<span class="line">	<span class="token comment">// ...</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从 <code v-pre>map1</code> 中删除 <code v-pre>key1</code>：</p>
<p>直接 <code v-pre>delete(map1, key1)</code> 就可以。</p>
<p>如果 <code v-pre>key1</code> 不存在，该操作不会产生错误。</p>
<p>示例 8.4 <a href="examples/chapter_8/map_testelement.go">map_testelement.go</a></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"><span class="token keyword">import</span> <span class="token string">"fmt"</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">var</span> value <span class="token builtin">int</span></span>
<span class="line">	<span class="token keyword">var</span> isPresent <span class="token builtin">bool</span></span>
<span class="line"></span>
<span class="line">	map1 <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">)</span></span>
<span class="line">	map1<span class="token punctuation">[</span><span class="token string">"New Delhi"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">55</span></span>
<span class="line">	map1<span class="token punctuation">[</span><span class="token string">"Beijing"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">20</span></span>
<span class="line">	map1<span class="token punctuation">[</span><span class="token string">"Washington"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">25</span></span>
<span class="line">	value<span class="token punctuation">,</span> isPresent <span class="token operator">=</span> map1<span class="token punctuation">[</span><span class="token string">"Beijing"</span><span class="token punctuation">]</span></span>
<span class="line">	<span class="token keyword">if</span> isPresent <span class="token punctuation">{</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"The value of \"Beijing\" in map1 is: %d\n"</span><span class="token punctuation">,</span> value<span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"map1 does not contain Beijing"</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">	value<span class="token punctuation">,</span> isPresent <span class="token operator">=</span> map1<span class="token punctuation">[</span><span class="token string">"Paris"</span><span class="token punctuation">]</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Is \"Paris\" in map1 ?: %t\n"</span><span class="token punctuation">,</span> isPresent<span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Value is: %d\n"</span><span class="token punctuation">,</span> value<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">	<span class="token comment">// delete an item:</span></span>
<span class="line">	<span class="token function">delete</span><span class="token punctuation">(</span>map1<span class="token punctuation">,</span> <span class="token string">"Washington"</span><span class="token punctuation">)</span></span>
<span class="line">	value<span class="token punctuation">,</span> isPresent <span class="token operator">=</span> map1<span class="token punctuation">[</span><span class="token string">"Washington"</span><span class="token punctuation">]</span></span>
<span class="line">	<span class="token keyword">if</span> isPresent <span class="token punctuation">{</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"The value of \"Washington\" in map1 is: %d\n"</span><span class="token punctuation">,</span> value<span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"map1 does not contain Washington"</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出结果：</p>
<pre><code>The value of &quot;Beijing&quot; in map1 is: 20
Is &quot;Paris&quot; in map1 ?: false
Value is: 0
map1 does not contain Washington
</code></pre>
</div></template>


