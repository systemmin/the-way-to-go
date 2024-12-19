<template><div><h1 id="_10-7-类型的-string-方法和格式化描述符" tabindex="-1"><a class="header-anchor" href="#_10-7-类型的-string-方法和格式化描述符"><span>10.7 类型的 String() 方法和格式化描述符</span></a></h1>
<p>当定义了一个有很多方法的类型时，十之八九你会使用 <code v-pre>String()</code> 方法来定制类型的字符串形式的输出，换句话说：一种可阅读性和打印性的输出。如果类型定义了 <code v-pre>String()</code> 方法，它会被用在 <code v-pre>fmt.Printf()</code> 中生成默认的输出：等同于使用格式化描述符 <code v-pre>%v</code> 产生的输出。还有 <code v-pre>fmt.Print()</code> 和 <code v-pre>fmt.Println()</code> 也会自动使用 <code v-pre>String()</code> 方法。</p>
<p>我们使用<RouteLink to="/chapter-2/10.4.html">第 10.4 节</RouteLink>中程序的类型来进行测试：</p>
<p>示例 10.22 <a href="examples/chapter_10/method_string.go">method_string.go</a>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"fmt"</span></span>
<span class="line">	<span class="token string">"strconv"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">type</span> TwoInts <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">	a <span class="token builtin">int</span></span>
<span class="line">	b <span class="token builtin">int</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	two1 <span class="token operator">:=</span> <span class="token function">new</span><span class="token punctuation">(</span>TwoInts<span class="token punctuation">)</span></span>
<span class="line">	two1<span class="token punctuation">.</span>a <span class="token operator">=</span> <span class="token number">12</span></span>
<span class="line">	two1<span class="token punctuation">.</span>b <span class="token operator">=</span> <span class="token number">10</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"two1 is: %v\n"</span><span class="token punctuation">,</span> two1<span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"two1 is:"</span><span class="token punctuation">,</span> two1<span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"two1 is: %T\n"</span><span class="token punctuation">,</span> two1<span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"two1 is: %#v\n"</span><span class="token punctuation">,</span> two1<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>tn <span class="token operator">*</span>TwoInts<span class="token punctuation">)</span> <span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">return</span> <span class="token string">"("</span> <span class="token operator">+</span> strconv<span class="token punctuation">.</span><span class="token function">Itoa</span><span class="token punctuation">(</span>tn<span class="token punctuation">.</span>a<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">"/"</span> <span class="token operator">+</span> strconv<span class="token punctuation">.</span><span class="token function">Itoa</span><span class="token punctuation">(</span>tn<span class="token punctuation">.</span>b<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">")"</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p>
<pre><code>two1 is: (12/10)
two1 is: (12/10)
two1 is: *main.TwoInts
two1 is: &amp;main.TwoInts{a:12, b:10}
</code></pre>
<p>当你广泛使用一个自定义类型时，最好为它定义 <code v-pre>String()</code>方法。从上面的例子也可以看到，格式化描述符 <code v-pre>%T</code> 会给出类型的完全规格，<code v-pre>%#v</code> 会给出实例的完整输出，包括它的字段（在程序自动生成 <code v-pre>Go</code> 代码时也很有用）。</p>
<p><strong>备注</strong></p>
<p>不要在 <code v-pre>String()</code> 方法里面调用涉及 <code v-pre>String()</code> 方法的方法，它会导致意料之外的错误，比如下面的例子，它导致了一个无限递归调用（<code v-pre>TT.String()</code> 调用 <code v-pre>fmt.Sprintf</code>，而 <code v-pre>fmt.Sprintf</code> 又会反过来调用 <code v-pre>TT.String()</code>），很快就会导致内存溢出：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">type</span> TT <span class="token builtin">float64</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>t TT<span class="token punctuation">)</span> <span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">"%v"</span><span class="token punctuation">,</span> t<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line">t<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>练习 10.12</strong> <a href="exercises/chapter_10/type_string.go">type_string.go</a></p>
<p>给定结构体类型 <code v-pre>T</code>:</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">type</span> T <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">    a <span class="token builtin">int</span></span>
<span class="line">    b <span class="token builtin">float32</span></span>
<span class="line">    c <span class="token builtin">string</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>值 <code v-pre>t</code>: <code v-pre>t := &amp;T{7, -2.35, &quot;abc\tdef&quot;}</code>。给 T 定义 <code v-pre>String()</code>，使得 <code v-pre>fmt.Printf(&quot;%v\n&quot;, t)</code> 输出：<code v-pre>7 / -2.350000 / &quot;abc\tdef&quot;</code>。</p>
<p><strong>练习 10.13</strong> <a href="exercises/chapter_10/celsius.go">celsius.go</a></p>
<p>为 <code v-pre>float64</code> 定义一个别名类型 <code v-pre>Celsius</code>，并给它定义 <code v-pre>String()</code>，它输出一个十进制数和 °C 表示的温度值。</p>
<p><strong>练习 10.14</strong> <a href="exercises/chapter_10/days.go">days.go</a></p>
<p>为 <code v-pre>int</code> 定义一个别名类型 <code v-pre>Day</code>，定义一个字符串数组它包含一周七天的名字，为类型 <code v-pre>Day</code> 定义 <code v-pre>String()</code> 方法，它输出星期几的名字。使用 <code v-pre>iota</code> 定义一个枚举常量用于表示一周的中每天（MO、TU...）。</p>
<p><strong>练习 10.15</strong> <a href="exercises/chapter_10/timezones.go">timezones.go</a></p>
<p>为 <code v-pre>int</code> 定义别名类型 <code v-pre>TZ</code>，定义一些常量表示时区，比如 UTC，定义一个 <code v-pre>map</code>，它将时区的缩写映射为它的全称，比如：<code v-pre>UTC -&gt; &quot;Universal Greenwich time&quot;</code>。为类型 <code v-pre>TZ</code> 定义 <code v-pre>String()</code> 方法，它输出时区的全称。</p>
<p><strong>练习 10.16</strong> <a href="exercises/chapter_10/stack_arr.go">stack_arr.go</a> / <a href="exercises/chapter_10/stack_struct.go">stack_struct.go</a></p>
<p>实现栈 (stack) 数据结构：</p>
<p><img src="@source/chapter-2/images/10.7_fig.jpg?raw=true" alt=""></p>
<p>它的格子包含数据，比如整数 <code v-pre>i</code>、<code v-pre>j</code>、<code v-pre>k</code> 和 <code v-pre>l</code> 等等，格子从底部（索引 0）至顶部（索引 n）来索引。这个例子中假定 <code v-pre>n = 3</code>，那么一共有 4 个格子。</p>
<p>一个新栈中所有格子的值都是 <code v-pre>0</code>。</p>
<p>将一个新值放到栈的最顶部一个空（包括零）的格子中，这叫做 push。</p>
<p>获取栈的最顶部一个非空（非零）的格子的值，这叫做 pop。
现在可以理解为什么栈是一个后进先出 (LIFO) 的结构了吧。</p>
<p>为栈定义一个 <code v-pre>Stack</code> 类型，并为它定义 <code v-pre>Push</code> 和 <code v-pre>Pop</code> 方法，再为它定义 <code v-pre>String()</code> 方法（用于调试）输出栈的内容，比如：<code v-pre>[0:i] [1:j] [2:k] [3:l]</code>。</p>
<p>1）<a href="exercises/chapter_10/stack_arr.go">stack_arr.go</a>：使用长度为 4 的 int 数组作为底层数据结构。</p>
<p>2） <a href="exercises/chapter_10/stack_struct.go">stack_struct.go</a>：使用包含一个索引和一个 <code v-pre>int</code> 数组的结构体作为底层数据结构，索引表示第一个空闲的位置。</p>
<p>3）使用常量 <code v-pre>LIMIT</code> 代替上面表示元素个数的 4 重新实现上面的 1）和 2），使它们更具有一般性。</p>
</div></template>


