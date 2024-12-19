import{_ as c,c as l,a as o,b as a,d as e,e as p,f as s,r as i,o as u}from"./app-DtITwm2S.js";const d={};function r(k,n){const t=i("RouteLink");return u(),l("div",null,[n[5]||(n[5]=o(`<h1 id="_11-4-类型判断-type-switch" tabindex="-1"><a class="header-anchor" href="#_11-4-类型判断-type-switch"><span>11.4 类型判断：type-switch</span></a></h1><p>接口变量的类型也可以使用一种特殊形式的 <code>switch</code> 来检测：<strong>type-switch</strong> （下面是示例 11.4 的第二部分）：</p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line"><span class="token keyword">switch</span> t <span class="token operator">:=</span> areaIntf<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token keyword">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"><span class="token keyword">case</span> <span class="token operator">*</span>Square<span class="token punctuation">:</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Type Square %T with value %v\\n&quot;</span><span class="token punctuation">,</span> t<span class="token punctuation">,</span> t<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">case</span> <span class="token operator">*</span>Circle<span class="token punctuation">:</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Type Circle %T with value %v\\n&quot;</span><span class="token punctuation">,</span> t<span class="token punctuation">,</span> t<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">case</span> <span class="token boolean">nil</span><span class="token punctuation">:</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;nil value: nothing to check?\\n&quot;</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">default</span><span class="token punctuation">:</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Unexpected type %T\\n&quot;</span><span class="token punctuation">,</span> t<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p><pre><code>Type Square *main.Square with value &amp;{5}
</code></pre><p>变量 <code>t</code> 得到了 <code>areaIntf</code> 的值和类型，所有 <code>case</code> 语句中列举的类型（<code>nil</code> 除外）都必须实现对应的接口（在上例中即 <code>Shaper</code>），如果被检测类型没有在 <code>case</code> 语句列举的类型中，就会执行 <code>default</code> 语句。</p><p>可以用 <code>type-switch</code> 进行运行时类型分析，但是在 <code>type-switch</code> 不允许有 <code>fallthrough</code> 。</p><p>如果仅仅是测试变量的类型，不用它的值，那么就可以不需要赋值语句，比如：</p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line"><span class="token keyword">switch</span> areaIntf<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token keyword">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"><span class="token keyword">case</span> <span class="token operator">*</span>Square<span class="token punctuation">:</span></span>
<span class="line">	<span class="token comment">// TODO</span></span>
<span class="line"><span class="token keyword">case</span> <span class="token operator">*</span>Circle<span class="token punctuation">:</span></span>
<span class="line">	<span class="token comment">// TODO</span></span>
<span class="line"><span class="token operator">...</span></span>
<span class="line"><span class="token keyword">default</span><span class="token punctuation">:</span></span>
<span class="line">	<span class="token comment">// TODO</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面的代码片段展示了一个类型分类函数，它有一个可变长度参数，可以是任意类型的数组，它会根据数组元素的实际类型执行不同的动作：</p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">classifier</span><span class="token punctuation">(</span>items <span class="token operator">...</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">for</span> i<span class="token punctuation">,</span> x <span class="token operator">:=</span> <span class="token keyword">range</span> items <span class="token punctuation">{</span></span>
<span class="line">		<span class="token keyword">switch</span> x<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token keyword">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token keyword">case</span> <span class="token builtin">bool</span><span class="token punctuation">:</span></span>
<span class="line">			fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Param #%d is a bool\\n&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span></span>
<span class="line">		<span class="token keyword">case</span> <span class="token builtin">float64</span><span class="token punctuation">:</span></span>
<span class="line">			fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Param #%d is a float64\\n&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span></span>
<span class="line">		<span class="token keyword">case</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token builtin">int64</span><span class="token punctuation">:</span></span>
<span class="line">			fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Param #%d is a int\\n&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span></span>
<span class="line">		<span class="token keyword">case</span> <span class="token boolean">nil</span><span class="token punctuation">:</span></span>
<span class="line">			fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Param #%d is a nil\\n&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span></span>
<span class="line">		<span class="token keyword">case</span> <span class="token builtin">string</span><span class="token punctuation">:</span></span>
<span class="line">			fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Param #%d is a string\\n&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span></span>
<span class="line">		<span class="token keyword">default</span><span class="token punctuation">:</span></span>
<span class="line">			fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Param #%d is unknown\\n&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span></span>
<span class="line">		<span class="token punctuation">}</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以这样调用此方法：<code>classifier(13, -14.3, &quot;BELGIUM&quot;, complex(1, 2), nil, false)</code> 。</p><p>在处理来自于外部的、类型未知的数据时，比如解析诸如 JSON 或 XML 编码的数据，类型测试和转换会非常有用。</p><p>在示例 12.17 (<a href="examples/chapter_12/xml.go">xml.go</a>) 中解析 XML 文档时，我们就会用到 <code>type-switch</code>。</p><p><strong>练习 11.4</strong> <a href="exercises/chapter_11/simple_interface2.go">simple_interface2.go</a>：</p><p>接着练习 11.1 中的内容，创建第二个类型 <code>RSimple</code>，它也实现了接口 <code>Simpler</code>，写一个函数 <code>fi()</code>，使它可以区分 <code>Simple</code> 和 <code>RSimple</code> 类型的变量。</p><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>`,17)),a("ul",null,[a("li",null,[e(t,{to:"/chapter-2/directory.html"},{default:p(()=>n[0]||(n[0]=[s("目录")])),_:1})]),a("li",null,[n[2]||(n[2]=s("上一节：")),e(t,{to:"/chapter-2/11.3.html"},{default:p(()=>n[1]||(n[1]=[s("类型断言：如何检测和转换接口变量的类型")])),_:1})]),a("li",null,[n[4]||(n[4]=s("下一节：")),e(t,{to:"/chapter-2/11.5.html"},{default:p(()=>n[3]||(n[3]=[s("测试一个值是否实现了某个接口")])),_:1})])])])}const v=c(d,[["render",r],["__file","11.4.html.vue"]]),f=JSON.parse('{"path":"/chapter-2/11.4.html","title":"11.4 类型判断：type-switch","lang":"zh-cn","frontmatter":{},"headers":[{"level":1,"title":"11.4 类型判断：type-switch","slug":"_11-4-类型判断-type-switch","link":"#_11-4-类型判断-type-switch","children":[{"level":2,"title":"链接","slug":"链接","link":"#链接","children":[]}]}],"git":{},"filePathRelative":"chapter-2/11.4.md"}');export{v as comp,f as data};